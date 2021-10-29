import addRecord from '../queries/addRecord.graphql';
import database from '../clients/apollo';

const REACTION_MAP = {
  OK: '+1',
  OVERACHIEVING: 'sparkles',
  CONCERN: 'exclamation',
};

export default function (slack) {
  ['OK', 'OVERACHIEVING', 'CONCERN'].forEach(async (status) => {
    await slack.action(
      `REPORT_STATUS_${status}`,
      async ({ ack, body, say, client }: any) => {
        await ack();
        const [studentID, initialTimestamp] =
          body.actions?.[0]?.value?.split(':');
        client.chat.delete({
          channel: body.channel.id,
          ts: body.message.ts,
        });
        client.reactions.add({
          channel: body.channel.id,
          timestamp: initialTimestamp,
          name: REACTION_MAP[status],
        });
        database.mutate({
          mutation: addRecord,
          variables: {
            team: body.team.id,
            student: studentID,
            reporter: body.user.id,
            key: 'achievement',
            value: status,
          },
        });
      }
    );
  });
}
