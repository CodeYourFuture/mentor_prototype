import schema from '../schema';
import quickUpdate from '../blocks/quickUpdate';
import database from '../clients/apollo';
import getStudent from '../queries/getStudent.graphql';

export default async ({ record, say, slackclient, studentName }: any) => {
  const variables = { team: record.team, student: record.student };
  const { data } = await database.query({
    query: getStudent,
    variables,
    fetchPolicy: 'network-only',
  });

  const values = data.updates_aggregate?.nodes;
  const fields = schema
    .filter(({ integration }) => !integration)
    .map(
      ({
        key,
        label,
        area,
        description,
        type,
        integration,
        defaultValue,
        desired,
      }) => {
        // TODO: move into private_metadata
        const currentValue = values?.find(
          ({ key: valueKey }) => valueKey === key
        )?.value;
        const currentOrDefault = currentValue || defaultValue;
        const actionValue = JSON.stringify({
          studentID: record.student,
          timestamp: record.timestamp,
          key,
          studentName,
          currentValue: currentOrDefault,
          data,
        });
        // const actionValue = `${record.student}:${
        //   record.timestamp
        // }:${key}:${studentName}:${currentOrDefault || ''}`;
        const icon = area === 'PD' ? '💛' : '💻';
        return {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `${label}`,
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: currentOrDefault || `Not set`,
              emoji: true,
            },
            value: actionValue,
            action_id: 'INFO_FORM',
          },
        };
      }
    );
  const { student, timestamp } = record;
  const quickUpdateBlocks = quickUpdate({
    record,
    student,
    timestamp,
    studentName,
  });
  const blocks = [
    {
      type: 'divider',
    },
    ...quickUpdateBlocks,
    {
      type: 'divider',
    },
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: 'Student Tracker',
        emoji: true,
      },
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `Please keep this information updated regularly.\n\n`,
        },
      ],
    },
    ...fields,
  ];
  return { blocks, text: '', thread_ts: record.timestamp };
  // await say({ blocks, text: '', thread_ts: record.timestamp });
};
