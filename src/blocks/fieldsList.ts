import schema from '../schema';

export default ({ studentName, studentID, timestamp, data }: any) => {
  const values = data.updates_aggregate?.nodes;
  const payload = { studentID, timestamp, studentName };
  return [
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
    ...schema
      .filter(({ integration }) => !integration)
      .map(({ key, label, defaultValue }) => {
        const dbVal = values?.find(({ key: k }) => k === key)?.value;
        const currentValue = dbVal || defaultValue;
        const actionValue = JSON.stringify({ ...payload, key, currentValue });
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
              text: currentValue || `Not set`,
              emoji: true,
            },
            value: actionValue,
            action_id: 'CLICK_UPDATE_VALUE',
          },
        };
      }),
  ];
};
