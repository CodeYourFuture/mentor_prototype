import database from "../../../clients/apollo";
import mentionChannel from "./mentionChannel";
import mentionConfig from "./mentionConfig";
import mentionData from "./mentionData";
import mentionStudent from "./mentionStudent";
import upsertIntegrationConfig from "../../../queries/upsertIntegrationConfig.graphql";

// When the user sends a DM to CYFBot.

export default function (slack) {
  const uploadFile = async ({ file, onSuccess }) => {
    if (!file.name.endsWith(".config.json")) return;
    const integration = file.name.replace(".config.json", "");
    const variables = {
      team: process.env.TEAM_ID,
      integration,
      value: file.id,
    };
    await database.mutate({
      mutation: upsertIntegrationConfig,
      variables,
    });
    onSuccess(integration);
    // upload the file id url to the database and respond with success message
  };
  slack.message(async ({ message, say, client, body }: any) => {
    if (!message) return;
    try {
      if (message.files?.length)
        return await uploadFile({
          file: message.files[0],
          onSuccess: async (integrationName) => {
            await client.reactions.add({
              channel: message.channel,
              timestamp: message.ts,
              name: "white_check_mark",
            });
            return say({
              thread_ts: message.ts,
              text:
                "Config updated for `" +
                integrationName +
                "` integration. (Do not delete this message)",
            });
          },
        });
      //
      // Ignore edits and deletes
      const { user: reporterID, ts: timestamp } = message;
      if (["message_changed", "message_deleted"].includes(message.subtype))
        return;
      //
      // Ensure the user has permission
      const accessChannelID = process.env.ACCESS_CHANNEL_ID;
      const { members: volunteerList } = await client.conversations.members({
        channel: accessChannelID,
      });
      const isReporterVolunteer = volunteerList.includes(reporterID);
      if (!isReporterVolunteer) {
        const { channel: cohortInfo } = await client.conversations.info({
          channel: accessChannelID,
        });
        const accessChannelName = cohortInfo.name;
        return say({
          thread_ts: message.ts,
          text: "To use Mentor you must be part of the ${accessChannelName} channel",
        });
      }
      // help & status
      if (message.text === "data")
        return mentionData({ say, timestamp, client });
      if (message.text === "config") return mentionConfig({ say, timestamp });

      //
      // if message is a channel link to data
      if (message.text.startsWith("<#")) {
        const channelID = message.text
          .split("|")[0]
          .split("<#")[1]
          .split(">")[0];
        return await mentionChannel({
          say,
          client,
          channelID,
          timestamp,
        });
      }
      //
      // if the message doesn't start with an @student show the instructions
      let [studentID] = message?.text?.split(/(\s+)/) || [];
      if (!studentID.startsWith("<@")) {
        client.reactions.add({
          channel: message.channel,
          timestamp: message.ts,
          name: "warning",
        });
        return say({
          timestamp: message.ts,
          text: "Mention a `@trainee` to record an update, mention a `#channel` to view a cohort data, or type `data` to view all data",
        });
      }
      //
      // if the message is a student, show the student
      studentID = studentID.replace("<@", "").replace(">", "");
      const isMentionedVolunteer = volunteerList.includes(studentID);
      if (isMentionedVolunteer) {
        const { profile } = await client.users.profile.get({ user: studentID });
        // console.log({ message });
        client.reactions.add({
          channel: message.channel,
          timestamp: message.ts,
          name: "warning",
        });
        return await say({
          text: `${profile.real_name} is not a trainee`,
          thread_ts: message.ts,
        });
      }
      await mentionStudent({ say, client, studentID, timestamp });
    } catch (error) {
      if (error?.data?.error === "not_in_channel") {
        client.reactions.add({
          channel: message.channel,
          timestamp: message.ts,
          name: "warning",
        });
        return say({
          text: `I am not a member of that Slack channel. I can only see channels you add me to.`,
          thread_ts: message.ts,
        });
      }
      say(`Error: ${error?.data?.error || error?.message || "Unknown"}`);
      console.error(error);
    }
  });
}
