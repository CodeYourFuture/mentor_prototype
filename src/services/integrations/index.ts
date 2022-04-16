require("dotenv").config();
import upsertIntegration from "../../queries/upsertIntegration.graphql";
import getIntegrationConfig from "../../queries/getIntegrationConfig.graphql";
import slack from "../../clients/slack";

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

const throttle = 3000;
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
  const { default: integration } = require(`./sources/${service}`);

  const integrationConfig = await database.mutate({
    mutation: getIntegrationConfig,
    variables: {
      teamID: process.env.TEAM_ID,
      integration: service,
    },
  });
  const configFileID = integrationConfig?.data?.integrations_config[0]?.value;
  const fileinfo = !configFileID
    ? undefined
    : await slack.client.files.info({
        file: configFileID,
      });
  const config = !fileinfo?.content ? {} : JSON.parse(fileinfo.content);
  const integrationData = await integration(config, externalID, group || {});
  if (!integrationData) return {};
  return Object.entries(integrationData).reduce((acc, [key, value]) => {
    acc[key] = { ...(value as any), integration: service };
    return acc;
  }, {});
};

async function getChannel({ client, channel }) {
  const channelID = channel.id;
  console.log(`🚚 #${channel.name}`);

  // Check bot has access to channel
  await client.conversations.history({ channel: channelID, limit: 1 });
  const schema = await getSchema();
  const integrationFields = schema.filter(({ integration }) => !!integration);
  console.log(
    `🔗 Enabled integrations: ${integrationFields
      .map(({ key }) => key)
      .join(", ")}`
  );
  const cohortList = await getAllMembers({ client, channelID });
  const { members: volunteerList } = await client.conversations.members({
    channel: process.env.ACCESS_CHANNEL_ID,
  });

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  //
  // Fetch data for all members of channel (filter out volunteers)
  let cohortIntegrations = {};
  const trainees = cohortList.filter(
    (studentID) => !volunteerList.includes(studentID)
  );
  let i = 0;
  for (const studentID of trainees) {
    try {
      await sleep(throttle * i);
      i++;
      const { profile } = await client.users.profile.get({
        user: studentID,
      });
      console.log("👤 User", profile.real_name);

      const { data } = await database.query({
        query: getStudent,
        variables: { studentID },
        fetchPolicy: "network-only",
      });

      for (const { key } of integrationFields) {
        const externalID = data.updates?.nodes?.find(
          ({ key: k }) => k === key
        )?.value;
        if (!externalID) {
          console.log("No integrations");
          continue;
        }
        console.log("🔗", key, externalID);
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
      }
    } catch (e) {
      console.error(e);
    }
  }
  i = 0;
  for (const studentID of trainees) {
    try {
      const { profile } = await client.users.profile.get({
        user: studentID,
      });
      console.log("👤 Integrations", profile.real_name);
      await sleep(throttle * i);
      i++;
      const { data } = await database.query({
        query: getStudent,
        variables: { studentID },
        fetchPolicy: "network-only",
      });

      for (const { key } of integrationFields) {
        const externalID = data.updates?.nodes?.find(
          ({ key: k }) => k === key
        )?.value;
        if (!externalID) continue;
        console.log("🔗", key, externalID);
        const finalIntegrationsData = await getIntegrationData({
          service: key,
          externalID,
          group: cohortIntegrations[key].filter(
            ({ trainee, data }) => data?.length && trainee !== studentID
          ),
        });
        if (finalIntegrationsData) {
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
        }
      }
    } catch (e) {
      console.error(e);
      return {};
    }
  }
}

export const integrations = async () => {
  const auth = await slack.client.auth.test();
  const { channels } = await slack.client.users.conversations({
    user: auth.user_id,
    types: "public_channel,private_channel",
  });
  console.log({ channels });
  for (const channel of channels.filter(
    (channel) => channel.id !== process.env.ACCESS_CHANNEL_ID
  )) {
    await getChannel({ client: slack.client, channel });
  }
};
