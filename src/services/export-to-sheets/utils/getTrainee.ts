require("dotenv").config();
import database from "../../../clients/apollo";
import getStudent from "../../talk-to-bot/queries/getStudent.graphql";
import parseIntegration from "./parseIntegrationData";

function getNumberOfDays(start) {
  const date1 = new Date(start);
  const date2 = new Date();
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = date2.getTime() - date1.getTime();
  return Math.round(diffInTime / oneDay);
}

export default async ({ studentID, client, allMessages, schema }) => {
  try {
    const { profile } = await client.users.profile.get({
      user: studentID,
    });
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
          schema.map(async ({ key, label, default_value, integration }) => {
            const dbVal = data.updates?.nodes?.find(
              ({ key: k }) => k === key
            )?.value;
            const value = dbVal || default_value || "";
            if (integration) {
              return (
                parseIntegration({
                  key,
                  label,
                  value,
                }) || []
              );
            } else {
              return await [{ column: label, value }];
            }
          })
        )),
      ].flat() as any
    ).reduce((acc, { column, value }) => ({ ...acc, [column]: value }), {});
    console.log("👤", profile.real_name);
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
      "Slack Messages": allMessages.filter((m) => m.user === studentID).length,
      ...schemaFields,
      "Student ID": studentID,
    };
  } catch (e) {
    console.error(e);
    return {};
  }
};
