require("dotenv").config();
import upsertIntegration from "../../packages/api/queries/upsertIntegration.graphql";
import getIntegrationConfig from "../../packages/api/queries/getIntegrationConfig.graphql";
import slack, { accessChannelID } from "../../clients/slack";

export type IntegrationResponse = {
  [key: string]: {
    value: string | number | boolean;
    favourite?: boolean;
    sentiment?: "positive" | "caution" | "negative" | "neutral";
  };
};

import database, { getSchema } from "../../clients/apollo";
import getStudent from "../../packages/api/queries/getStudent.graphql";
import fs from "fs";
import getTraineesInTeamGraphql from "../../packages/api/queries/getTraineesInTeam.graphql";
import { sleep } from "../../CONFIG";

const THROTTLE = 2000;

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
  const integrationsDir = "src/services/integrations/sources";
  const integrations = fs.readdirSync(integrationsDir);
  if (!integrations.includes(service) || !externalID) return [];
  const integration = require(`./sources/${service}`).fetchData;

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
  const integrationData = await integration(config, externalID);
  if (!integrationData) return {};
  return Object.entries(integrationData).reduce((acc, [key, value]) => {
    acc[key] = { ...(value as any), integration: service };
    return acc;
  }, {});
};

const processIntegrationData = async ({
  service,
  externalID,
  fetchedData,
  group,
}) => {
  const integrationsDir = "src/services/integrations/sources";
  const integrations = fs.readdirSync(integrationsDir);
  if (!integrations.includes(service) || !externalID) return [];
  const integration = require(`./sources/${service}`).processData;
  const integrationData = await integration(fetchedData, group || {});
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
    channel: await accessChannelID(),
  });

  //
  // Fetch data for all members of channel (filter out volunteers)
  let cohortIntegrations = {};

  const traineesInTeam = await database.query({
    query: getTraineesInTeamGraphql,
    variables: { teamID: process.env.TEAM_ID },
    fetchPolicy: "network-only",
  });
  const listOfTrainees = traineesInTeam.data.updates.map(
    ({ student }) => student
  );
  const trainees = cohortList.filter(
    (studentID) =>
      !volunteerList.includes(studentID) && listOfTrainees.includes(studentID)
  );
  for (const studentID of trainees) {
    try {
      await sleep(THROTTLE);
      const { data } = await database.query({
        query: getStudent,
        variables: { studentID },
        fetchPolicy: "network-only",
      });

      for (const { key } of integrationFields) {
        const externalID = data.updates?.nodes?.find(
          ({ key: k }) => k === key
        )?.value;
        externalID && console.log(key, externalID);
        if (!externalID) continue;
        const integrationData = await getIntegrationData({
          service: key,
          externalID,
        });
        if (!cohortIntegrations[key]) cohortIntegrations[key] = [];
        cohortIntegrations[key].push({
          trainee: studentID,
          data: integrationData,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  console.log("⏳ Process Integrations");
  for (const studentID of trainees) {
    try {
      await sleep(THROTTLE);
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
        const fetchedData = cohortIntegrations[key].find(
          ({ trainee, data }) => data && trainee === studentID
        ).data;
        if (!fetchedData) continue;
        const others = cohortIntegrations[key]
          .filter(({ trainee, data }) => data && trainee !== studentID)
          .map(({ data }) => data);
        const finalIntegrationsData = await processIntegrationData({
          service: key,
          externalID,
          fetchedData,
          group: others,
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
  console.log("✨ Integrations Processed");
}

export const integrations = async () => {
  const auth = await slack.client.auth.test();
  const { channels } = await slack.client.users.conversations({
    user: auth.user_id,
    types: "public_channel,private_channel",
  });
  for (const channel of channels.filter(
    (channel) => channel.name !== process.env.ACCESS_CHANNEL_NAME
  )) {
    await getChannel({ client: slack.client, channel });
  }
};
