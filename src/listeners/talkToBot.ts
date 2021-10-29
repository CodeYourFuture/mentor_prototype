import mentionChannel from './mentionChannel';
import mentionStudent from './mentionStudent';

export default function (slack) {
  slack.message(async ({ message, say, client }: any) => {
    //
    // if the user doesn't have permission, request permission
    const { user: reporterID, ts: timestamp } = message;
    if (['message_changed', 'message_deleted'].includes(message.subtype))
      return;
    //
    // if the user doesn't have permission, request permission
    const { members: volunteerList } = await client.conversations.members({
      channel: process.env.ACCESS_CHANNEL_ID,
    });
    const isReporterVolunteer = volunteerList.includes(reporterID);
    if (!isReporterVolunteer)
      return await say('You do not have permission to do this.');
    //
    // if message is a channel link to data
    if (message.text.startsWith('<#')) {
      const channelID = message.text.split('|')[0].split('<#')[1].split('>')[0];
      return mentionChannel({ say, client, channelID, reporterID });
    }
    //
    // if the message doesn't start with an @student show the instructions
    let [studentID] = message?.text?.split(/(\s+)/) || [];
    if (!studentID.startsWith('<@'))
      return say('@mention a student to record an update');
    //
    // if the message is a student, show the student
    studentID = studentID.replace('<@', '').replace('>', '');
    const isMentionedVolunteer = volunteerList.includes(studentID);
    if (isMentionedVolunteer) {
      const { profile } = await client.users.profile.get({ user: studentID });
      return await say(`${profile.real_name} is not a student`);
    }
    mentionStudent({ say, client, studentID, timestamp });
  });
}
