require("dotenv").config();
import slack, { getSlackChannels } from "../../clients/slack";
// import listeners from "../talk-to-bot/listeners";
// import sheets from "./sheets";

require("dotenv").config();

import database, { getSchema } from "../../clients/apollo";
import getStudent from "../talk-to-bot/queries/getStudent.graphql";
import getCheckInReporters from "../talk-to-bot/queries/getCheckInReporters.graphql";
import { json2csvAsync } from "json-2-csv";
import { google } from "googleapis";
import fs from "fs";

// import slack from "../../clients/slack";
// import listeners from "../talk-to-bot/listeners";
// When the user #mention's a channel
// Generate a Google Sheet and email it to them

const throttle = 2000;
let validFiles = [];

const getAllMessages = async ({ client, channelID }) => {
  let allMessages = [];
  const fetchSlice = async ({ next_cursor }) => {
    const response = await client.conversations.history({
      channel: channelID,
      ...(next_cursor ? { cursor: next_cursor } : { limit: 100 }),
    });
    allMessages = [...allMessages, ...response.messages];
    if (response.response_metadata.next_cursor) {
      await fetchSlice({ next_cursor: response.response_metadata.next_cursor });
    }
  };
  await fetchSlice({ next_cursor: false });
  return allMessages;
};

const getAllMembers = async ({ client, channelID }) => {
  let allMembers = [];
  const fetchSlice = async ({ next_cursor }) => {
    const response = await client.conversations.members({
      channel: channelID,
      ...(next_cursor ? { cursor: next_cursor } : { limit: 100 }),
    });
    // const response = await client.conversations.history({
    //   channel: channelID,
    //   ...(next_cursor ? { cursor: next_cursor } : { limit: 100 }),
    // });
    allMembers = [...allMembers, ...response.members];
    if (response.response_metadata.next_cursor) {
      await fetchSlice({ next_cursor: response.response_metadata.next_cursor });
    }
  };
  await fetchSlice({ next_cursor: false });
  return allMembers;
};

const getIntegrationData = async ({ service, externalID }) => {
  const integrationsDir = "src/services/integrations/sources";
  const integrations = fs
    .readdirSync(integrationsDir)
    .map((file) => file.replace(".ts", ""));
  if (!integrations.includes(service) || !externalID) return [];
  const { default: integration } = require(`${integrationsDir}/${service}.ts`);
  const integrationData = (await integration(externalID)).map(
    ({ column, value }) => ({ column: `${service}_${column}`, value })
  );
  return integrationData || [];
};

async function getChannel({ client, channel }) {
  const channelID = channel.id;
  const { channel: cohortInfo } = await client.conversations.info({
    channel: channelID,
  });

  function getNumberOfDays(start) {
    const date1 = new Date(start);
    const date2 = new Date();

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
  }

  // Check bot has access to channel
  await client.conversations.history({ channel: channelID, limit: 1 });
  const schema = await getSchema();
  const cohortList = await getAllMembers({ client, channelID });
  const { members: volunteerList } = await client.conversations.members({
    channel: process.env.ACCESS_CHANNEL_ID,
  });
  //
  // Fetch total number of messages sent in the channel
  const allMessages = await getAllMessages({ client, channelID });

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  //
  // Fetch data for all members of channel (filter out volunteers)

  const cohort = (await Promise.all(
    cohortList
      .filter((studentID) => !volunteerList.includes(studentID))
      .map(async (studentID, i) => {
        try {
          await sleep(throttle * i);
          const { profile } = await client.users.profile.get({
            user: studentID,
          });

          console.log(i, "Processing", profile.real_name);
          const { data } = await database.query({
            query: getStudent,
            variables: { studentID },
            fetchPolicy: "network-only",
          });

          const reporterCounts = data.reporters.nodes.reduce(
            (acc, { reporter }) => ({
              ...acc,
              [reporter]: (acc[reporter] || 0) + 1,
            }),
            {}
          );
          const reporters = [];
          for (const [user] of Object.entries(reporterCounts).sort((a, b) =>
            b[1] > a[1] ? 1 : -1
          )) {
            const { profile } = await client.users.profile.get({ user });
            const reporterName = profile.real_name;
            reporters.push(`${reporterName}`);
          }
          const concern_areas =
            data.concern_areas.nodes
              .filter(({ timestamp }) => getNumberOfDays(timestamp) < 30)
              .map(({ value }) => `${value}`.toLowerCase())
              .join(", ") || "";
          if (!data.quick_ALL.aggregate.count) return null;

          const schemaFields = (
            [
              ...(await Promise.all(
                schema.map(
                  async ({ key, label, default_value, integration }) => {
                    const dbVal = data.updates?.nodes?.find(
                      ({ key: k }) => k === key
                    )?.value;
                    const value = dbVal || default_value || "";
                    if (integration) {
                      return (
                        getIntegrationData({
                          service: key,
                          externalID: value,
                        }) || []
                      );
                    } else {
                      return await [{ column: label, value }];
                    }
                  }
                )
              )),
            ].flat() as any
          ).reduce(
            (acc, { column, value }) => ({ ...acc, [column]: value }),
            {}
          );
          return {
            Trainee: profile.real_name,
            Mentors: reporters.join(", "),
            "Check-ins": data.quick_ALL.aggregate.count,
            Concerns: data.quick_CONCERN.aggregate.count,
            "Recent concerns": concern_areas,
            Overachieving: !data.quick_OVERACHIEVING.aggregate.count
              ? "0%"
              : `${
                  (data.quick_OVERACHIEVING.aggregate.count /
                    data.quick_ALL.aggregate.count) *
                  100
                }%`,
            "Slack Messages": allMessages.filter((m) => m.user === studentID)
              .length,
            ...schemaFields,
            "Student ID": studentID,
          };
        } catch (e) {
          console.error(e);
          return {};
        }
      })
  )) as any;
  //
  // Convert to CSV
  try {
    const csv = await json2csvAsync(cohort.filter(Boolean), {
      emptyFieldValue: "",
    });
    return csv;
  } catch (e) {
    console.error(e);
  }
}

export const sheets = async () => {
  const channels = await getSlackChannels();
  // const bot = await slack.client.bots.info();
  // console.log(channels, process.env.BOT_USER_ID, bot, test);
  for (const channel of channels) {
    const csv = await getChannel({ client: slack.client, channel });

    //
    // Send to google sheets
    const { SHEETS_CLIENT_EMAIL: EMAIL, SHEETS_PRIVATE_KEY: KEY } = process.env;
    const scope = ["https://www.googleapis.com/auth/drive"];
    const JwtClient = new google.auth.JWT(
      EMAIL,
      null,
      KEY.replace(/\\n/g, "\n"),
      scope
    );
    const drive = google.drive({ version: "v3", auth: JwtClient });
    const mimeType = "application/vnd.google-apps.spreadsheet";
    const sheetName = `${channel.name}`;
    const files = await drive.files.list({ q: `name='${sheetName}'` });
    const file = files.data.files[0];
    validFiles.push(file.id);
    if (!file) {
      console.log("Creating sheet");
      await drive.files.create({
        requestBody: { name: sheetName, mimeType },
        media: { mimeType: "text/csv", body: csv },
        fields: "id",
      });
    } else {
      console.log("Updating sheet");
      await drive.files.update({
        fileId: file.id,
        requestBody: { name: sheetName, mimeType },
        media: { mimeType: "text/csv", body: csv },
        fields: "id, webViewLink, webContentLink",
      });
    }

    const url = `https://drive.google.com/file/u/0/d/${file.id}/preview`;
    console.log(url);

    // TODO: add all permissions
    console.log("add permissions");
    await drive.permissions.create({
      requestBody: { role: "reader", type: "user", emailAddress: "i@dom.vin" },
      fileId: file.id,
      fields: "id",
    });

    // TODO: remove all expired permissions
  }

  // TODO: delete all files not in validFiles
};
