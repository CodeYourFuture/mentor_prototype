require("dotenv").config();
import database from "../../../clients/apollo";
import slack from "../../../clients/slack";
import getStudent from "../../../queries/getStudent.graphql";
import parseIntegration from "./parseIntegrationData";

function getNumberOfDays(start) {
  const date1 = new Date(start);
  const date2 = new Date();
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = date2.getTime() - date1.getTime();
  return Math.round(diffInTime / oneDay);
}

export default async ({ studentID, allMessages, schema }) => {
  if (!studentID) return null;
  try {
    const { profile } = await slack.client.users.profile.get({
      user: studentID,
    });
    const { data } = await database.query({
      query: getStudent,
      variables: { studentID },
      fetchPolicy: "network-only",
    });
    if (!data.quick_ALL.aggregate.count) return null;
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
      const { profile } = await slack.client.users.profile.get({ user });
      const reporterName = profile.real_name;
      reporters.push(`${reporterName}`);
    }
    const concern_areas =
      data.concern_areas.nodes
        .filter(({ timestamp }) => getNumberOfDays(timestamp) < 30)
        .map(({ value }) => `${value}`.toLowerCase())
        .join(", ") || "";

    const schemaFields = (
      [
        ...(await Promise.all(
          schema.map(async ({ key, label, default_value, integration }) => {
            const dbVal = data.updates?.nodes?.find(
              ({ key: k }) => k === key
            )?.value;
            const value = dbVal || default_value || "";
            if (integration && dbVal) {
              return (
                [
                  { column: label, value: { value, integration: key } },
                  ...(await parseIntegration({
                    team: process.env.TEAM_ID,
                    student: studentID,
                    key,
                  })),
                ] || []
              );
            } else {
              return await [
                {
                  column: label,
                  value: { value, integration: integration ? key : false },
                },
              ];
            }
          })
        )),
      ].flat() as any
    ).reduce((acc, { column, value }) => ({ ...acc, [column]: value }), {});
    console.log("👤", profile.real_name);
    const percentOver = Math.round(
      (data.quick_OVERACHIEVING.aggregate.count /
        data.quick_ALL.aggregate.count) *
        100
    );
    return {
      Trainee: { value: profile.real_name },
      Mentors: { value: reporters.join(", ") },
      "Check-ins": { value: data.quick_ALL.aggregate.count },
      Concerns: {
        value: data.quick_CONCERN.aggregate.count,
      },
      "Recent concerns": {
        value: concern_areas,
        sentiment: concern_areas?.length ? "caution" : "neutral",
      },
      Overachieving: !data.quick_OVERACHIEVING.aggregate.count
        ? { value: "0%" }
        : percentOver > 10
        ? {
            sentiment: "positive",
            value: `${percentOver}%`,
          }
        : {
            sentiment: "neutral",
            value: `${percentOver}%`,
          },
      "Slack Messages": {
        value: allMessages.filter((m) => m.user === studentID).length,
      },
      ...schemaFields,
    };
  } catch (e) {
    console.error(e);
    return {};
  }
};
