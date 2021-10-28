require('dotenv').config();
import slack from './clients/slack';
import { mainMenu } from './actions';
import gotQuickUpdate from './actions/gotQuickUpdate';
import { modal } from './actions/updateModal';
import schema from './schema';
import addRecord from './queries/addRecord.graphql';
import database from './clients/apollo';

// Listen for messages
slack.message(async ({ message, say, client }: any) => {
  if (['message_changed', 'message_deleted'].includes(message.subtype)) return;
  const { team, user: reporter, ts: timestamp } = message;
  const [studentID, ...rest] = message?.text?.split(/(\s+)/) || [];

  // if the user doesn't have permission, request permission
  const users = await client.users.list({ limit: 1000, workspace: team });
  const isAdminOrOwner = users.members.find(
    (user) => user.id === reporter && (user.is_owner || user.is_admin)
  );
  if (!isAdminOrOwner) {
    const instructions =
      'You do not have permission to do this. At the moment this feature is limited to workspace owners and admins.';
    return await say(instructions);
  }
  // if the message doesn't start with an @student show the instructions
  if (!studentID.startsWith('<@')) {
    const instructions = '@mention a student to record an update';
    return await say(instructions);
  }

  // trigger workflow
  const student = studentID.replace('<@', '').replace('>', '');
  const report = rest.join('').trim();
  if (!report) {
    const studentProfile = await client.users.profile.get({
      user: student,
    });
    const mainMenuInfo = await mainMenu({
      record: { team, student, reporter, report: 'test', timestamp },
      say,
      slackclient: client,
      studentName: studentProfile.profile.display_name,
    });

    await say(mainMenuInfo);
  }
});

// ['QUICK_CHECKIN', 'INFO_FORM'].forEach(async (message_type) => {
slack.action('INFO_FORM', async ({ ack, body, say, client }: any) => {
  await ack();
  const { studentID, timestamp, key, studentName, currentValue, data } =
    JSON.parse(body.actions?.[0]?.value);
  const schemaItem = schema.find((item) => item.key === key);
  const responseTimestamp = body.message.ts;
  const channelID = body.channel.id;
  await client.views.open({
    trigger_id: body.trigger_id,
    view: modal({
      studentID,
      timestamp: responseTimestamp,
      schemaItem,
      currentValue,
      studentName,
      channelID,
      data,
    }),
  });
});

slack.view('SUBMIT_MODAL', async ({ ack, body, view, say, client }: any) => {
  const value = body.view.state.values.view.input.value;
  const metadata = JSON.parse(body.view.private_metadata || {});
  const { schemaItem, studentID, studentName, timestamp, channelID } = metadata;
  const reporter = body.user.id;
  const key = schemaItem.key;
  const team = body.team.id;
  const variables = { team, student: studentID, reporter, key, value };
  await database.mutate({ mutation: addRecord, variables });
  await ack();
  const mainMenuInfo = await mainMenu({
    record: { team, student: studentID, reporter, timestamp },
    say,
    slackclient: client,
    studentName,
  });
  await client.chat.update({
    channel: channelID,
    ts: timestamp,
    text: '',
    as_user: true,
    blocks: mainMenuInfo.blocks,
  });
});

// Listen for interactivity
['OK', 'OVERACHIEVING', 'CONCERN'].forEach(async (status) => {
  await slack.action(
    `REPORT_STATUS_${status}`,
    async ({ ack, body, say, client }: any) => {
      await ack();
      const [studentID, initialTimestamp] =
        body.actions?.[0]?.value?.split(':');
      await gotQuickUpdate({
        studentID,
        initialTimestamp,
        status,
        body,
        slackclient: client,
        say,
      });
    }
  );
});

(async () => {
  const PORT = Number(process.env.PORT) || 5000;
  console.log({ PORT });
  await slack.start(PORT);
  console.log('⚡️ StudentBot is listening!');
})();
