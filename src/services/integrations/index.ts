require("dotenv").config();
import slack from "../../clients/slack";
var cron = require("node-cron");

require("dotenv").config();

import database, { getSchema } from "../../clients/apollo";
import getStudent from "../talk-to-bot/queries/getStudent.graphql";
import fs from "fs";

const throttle = 2000;
const getAllMembers = async ({ client, channelID }) => {
  let allMembers = [];
  const fetchSlice = async ({ next_cursor }) => {
    const response = await client.conversations.members({
      channel: channelID,
      ...(next_cursor ? { cursor: next_cursor } : { limit: 100 }),
    });
    allMembers = [...allMembers, ...response.members];
    if (response.response_metadata.next_cursor) {
      await fetchSlice({ next_cursor: response.response_metadata.next_cursor });
    }
  };
  await fetchSlice({ next_cursor: false });
  return allMembers;
};

const getIntegrationData = async ({ service, externalID }) => {
  const integrationsDir = "./src/integrations";
  const integrations = fs
    .readdirSync(integrationsDir)
    .map((file) => file.replace(".ts", ""));
  if (!integrations.includes(service) || !externalID) return [];
  const { default: integration } = require(`./integrations/${service}.ts`);
  const integrationData = (await integration(externalID)).map(
    ({ column, value }) => ({ column: `${service}_${column}`, value })
  );
  return integrationData || [];
};

async function getChannel({ client, channel }) {
  const channelID = channel.id;

  // Check bot has access to channel
  await client.conversations.history({ channel: channelID, limit: 1 });
  const schema = await getSchema();
  const cohortList = await getAllMembers({ client, channelID });
  const { members: volunteerList } = await client.conversations.members({
    channel: process.env.ACCESS_CHANNEL_ID,
  });
  //

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  //
  // Fetch data for all members of channel (filter out volunteers)

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

        const integrationFields = [
          ...(await Promise.all(
            schema
              .filter(({ integration }) => !!integration)
              .map(async ({ key }) => {
                const dbVal = data.updates?.nodes?.find(
                  ({ key: k }) => k === key
                )?.value;
                const externalID = dbVal || "";
                return getIntegrationData({ service: key, externalID }) || [];
              })
          )),
        ].flat() as any;
        return integrationFields;
      } catch (e) {
        console.error(e);
        return {};
      }
    });
  // TODO; do post analysis per cohort (cohort variable)
  // TODO: save to db
}

export const integrations = async () => {
  const auth = await slack.client.auth.test();
  const { channels } = await slack.client.users.conversations({
    user: auth.user_id,
  });
  for (const channel of channels.filter(
    (channel) => channel.id !== process.env.ACCESS_CHANNEL_ID
  )) {
    await getChannel({ client: slack.client, channel });
  }
};
