require("dotenv").config();
import upsertIntegration from "../../queries/upsertIntegration.graphql";
import slack from "../../clients/slack";

require("dotenv").config();

export type IntegrationResponse = {
  [key: string]: {
    value: string | number | boolean;
    favourite?: boolean;
    sentiment?: "positive" | "caution" | "negative" | "neutral";
  };
};

import database, { getSchema } from "../../clients/apollo";
import getStudent from "../../queries/getStudent.graphql";
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

const getIntegrationData = async ({ service, externalID, group }) => {
  const integrationsDir = "src/services/integrations/sources";
  const integrations = fs.readdirSync(integrationsDir);
  if (!integrations.includes(service) || !externalID) return [];
  // console.log(service, externalID);
  const { default: integration } = require(`./sources/${service}`);
  const integrationData = await integration(externalID, group);
  return integrationData;
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
  let cohortIntegrations = {};
  await Promise.all(
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
                  const integrationData = await getIntegrationData({
                    service: key,
                    externalID,
                    group: undefined,
                  });
                  if (data) {
                    if (!cohortIntegrations[key]) cohortIntegrations[key] = [];
                    cohortIntegrations[key].push({
                      trainee: studentID,
                      data: integrationData,
                    });
                  }
                })
            )),
          ].flat() as any;
          return integrationFields;
        } catch (e) {
          console.error(e);
          return {};
        }
      })
  );

  // Run integrations again but with classmates (for compariston)
  cohortList
    .filter((studentID) => !volunteerList.includes(studentID))
    .map(async (studentID, i) => {
      try {
        await sleep(throttle * i);
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
                if (!externalID) return;
                const finalIntegrationsData = await getIntegrationData({
                  service: key,
                  externalID,
                  group: cohortIntegrations[key].filter(
                    ({ trainee, data }) => data?.length && trainee !== studentID
                  ),
                });
                if (!finalIntegrationsData) return;
                const variables = {
                  team: process.env.TEAM_ID,
                  student: studentID,
                  key,
                  value: JSON.stringify(finalIntegrationsData),
                };
                await database.mutate({
                  mutation: upsertIntegration,
                  variables,
                });
              })
          )),
        ].flat() as any;
        return integrationFields;
      } catch (e) {
        console.error(e);
        return {};
      }
    });
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
