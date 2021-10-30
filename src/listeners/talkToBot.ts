import mentionChannel from './mentionChannel';
import mentionHelp from './mentionHelp';
import mentionStudent from './mentionStudent';

// When the user sends a DM to CYFBot.

export default function (slack) {
  slack.message(async ({ message, say, client }: any) => {
    try {
      //
      // Ignore edits and deletes
      const { user: reporterID, ts: timestamp } = message;
      if (['message_changed', 'message_deleted'].includes(message.subtype))
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
      // if message is help, return help message
      if (message.text === 'help') return mentionHelp({ say, timestamp });

      //
      // if message is a channel link to data
      if (message.text.startsWith('<#')) {
        const channelID = message.text
          .split('|')[0]
          .split('<#')[1]
          .split('>')[0];
        return await mentionChannel({ say, client, channelID, reporterID });
      }
      //
      // if the message doesn't start with an @student show the instructions
      let [studentID] = message?.text?.split(/(\s+)/) || [];
      if (!studentID.startsWith('<@'))
        return say(
          '@mention a student to record an update, #mention a channel to view all students or type "help" for more options'
        );
      //
      // if the message is a student, show the student
      studentID = studentID.replace('<@', '').replace('>', '');
      const isMentionedVolunteer = volunteerList.includes(studentID);
      if (isMentionedVolunteer) {
        const { profile } = await client.users.profile.get({ user: studentID });
        return await say(`${profile.real_name} is not a student`);
      }
      await mentionStudent({ say, client, studentID, timestamp });
    } catch (error) {
      if (error.data.error === 'not_in_channel') {
        return say(
          `I am not in that Slack channel. To add me, just post a message in the channel mentioning @CYFBot`
        );
      }
      say(`Error: ${error.data.error}`);
      // console.log('hi');
      // console.error(error.data.error);
    }
  });
}
