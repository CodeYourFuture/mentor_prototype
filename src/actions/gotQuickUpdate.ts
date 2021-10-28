import client from '../clients/apollo';
import addRecord from '../queries/addRecord.graphql';

const REACTION_MAP = {
  OK: '+1',
  OVERACHIEVING: 'sparkles',
  CONCERN: 'exclamation',
};

export default async ({
  studentID,
  initialTimestamp,
  status,
  slackclient,
  body,
  say,
}: any) => {
  slackclient.chat.delete({
    channel: body.channel.id,
    ts: body.message.ts,
  });
  slackclient.reactions.add({
    channel: body.channel.id,
    timestamp: initialTimestamp,
    name: REACTION_MAP[status],
  });
  client.mutate({
    mutation: addRecord,
    variables: {
      team: body.team.id,
      student: studentID,
      reporter: body.user.id,
      key: 'achievement',
      value: status,
    },
  });
  // const blocks = [
  //   {
  //     type: 'context',
  //     elements: [
  //       {
  //         type: 'plain_text',
  //         text: `Thanks. If you have any additional updates type them below and I will make a note 📝.`,
  //       },
  //     ],
  //   },
  // ];

  // await say({ blocks, text: '', thread_ts: initialTimestamp });
};
