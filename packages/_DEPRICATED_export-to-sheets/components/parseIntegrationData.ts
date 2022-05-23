import database from "../../../cyfbot/CYFBot/src/clients/apollo";
import getIntegrationGraphql from "../../../cyfbot/CYFBot/src/queries/getIntegration.graphql";

export default async ({ team, student, key }) => {
  const {
    data: { integrations },
  } = await database.query({
    query: getIntegrationGraphql,
    variables: { studentID: student, teamID: team, key },
    fetchPolicy: "network-only",
  });
  if (!integrations.length) return [];
  const allContributionsData = integrations
    .map(({ value }) => {
      try {
        const json = JSON.parse(value);
        const columns = Object.entries(json).map(([column, value]: any) => {
          return { column: `${column} (${key})`, value: value };
        });
        return columns;
      } catch (e) {
        return [];
      }
    })
    .flat();
  return allContributionsData;
};
