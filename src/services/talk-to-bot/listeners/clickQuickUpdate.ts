import addRecord from "../queries/addRecord.graphql";
import database from "../../../clients/apollo";
import concernButtons from "../blocks/concernButtons";

// When the user taps one of the quick update buttons
// save in the database and respond with an emoji reaction

const REACTION_MAP = {
  OK: { emoji: "+1" },
  OVERACHIEVING: { emoji: "sparkles" },
  CONCERN: {
    emoji: "exclamation",
    options: ["Technical ability", "Personal issues", "Motivation", "Teamwork"],
  },
};

export default function (slack) {
  ["OK", "OVERACHIEVING", "CONCERN"].forEach(async (status) => {
    await slack.action(
      `REPORT_STATUS_${status}`,
      async ({ ack, body, say, client }: any) => {
        await ack();
        console.log("clicked", status);
        const { studentID, timestamp } =
          JSON.parse(body.actions?.[0]?.value) || {};
        client.chat.delete({
          channel: body.channel.id,
          ts: body.message.ts,
        });
        client.reactions.add({
          channel: body.channel.id,
          timestamp: timestamp,
          name: REACTION_MAP[status].emoji,
        });
        database.mutate({
          mutation: addRecord,
          variables: {
            team: body.team.id,
            student: studentID,
            reporter: body.user.id,
            key: "achievement",
            value: status,
          },
        });
        if (status === "CONCERN") {
          const profile = await client.users.profile.get({ user: studentID });
          const studentName = profile.profile.display_name;
          const params = {
            studentID: studentID,
            timestamp: timestamp,
            studentName,
          };
          const blocks = concernButtons(params);
          await say({ blocks, text: "", thread_ts: timestamp });
        }
      }
    );
  });

  //  When the user taps one of the concern buttons
  ["TECHNICAL", "MOTIVATION", "LANGUAGE", "PERSONAL"].forEach(
    async (status) => {
      await slack.action(
        `REPORT_STATUS_CONCERN_${status}`,
        async ({ ack, body, say, client }: any) => {
          try {
            await ack();
            const { studentID, timestamp } =
              JSON.parse(body.actions?.[0]?.value || {}) || {};
            await client.chat.delete({
              channel: body.channel.id,
              ts: body.message.ts,
            });
            await client.reactions.add({
              channel: body.channel.id,
              timestamp: timestamp,
              name: "speech_balloon",
            });
            await database.mutate({
              mutation: addRecord,
              variables: {
                team: body.team.id,
                student: studentID,
                reporter: body.user.id,
                key: "concern",
                value: status,
              },
            });
          } catch (error) {
            console.error(error);
          }
        }
      );
    }
  );
}
