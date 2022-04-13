import mentionChannel from "./mentionChannel";
import mentionConfig from "./mentionConfig";
import mentionData from "./mentionData";
import mentionStudent from "./mentionStudent";

// When the user sends a DM to CYFBot.

export default function (slack) {
  slack.message(async ({ message, say, client, body }: any) => {
    try {
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
        return await say(
          `To use CYFbot you must be part of the ${accessChannelName} channel`
        );
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
      if (!studentID.startsWith("<@"))
        return say(
          '@mention a trainee to record an update, #mention a channel to view data or type "data" or "config" for more options'
        );
      //
      // if the message is a student, show the student
      studentID = studentID.replace("<@", "").replace(">", "");
      const isMentionedVolunteer = volunteerList.includes(studentID);
      if (isMentionedVolunteer) {
        const { profile } = await client.users.profile.get({ user: studentID });
        return await say(`${profile.real_name} is not a trainee`);
      }
      await mentionStudent({ say, client, studentID, timestamp });
    } catch (error) {
      if (error?.data?.error === "not_in_channel") {
        return say(
          `I am not a member of that Slack channel. I can only see channels you add me to.`
        );
      }
      say(`Error: ${error?.data?.error || error?.message || "Unknown"}`);
      console.error(error);
    }
  });
}
