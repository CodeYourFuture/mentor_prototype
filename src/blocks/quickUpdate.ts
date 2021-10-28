export default ({ student, timestamp, studentName }: any) => {
  const actionValue = `${student}:${timestamp}`;
  const blocks = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: 'Quick Update',
        emoji: true,
      },
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `How is *${studentName}* getting on?\n\n`,
        },
      ],
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          action_id: 'REPORT_STATUS_OK',
          text: {
            type: 'plain_text',
            text: '👍 On track',
            emoji: true,
          },
          value: actionValue,
        },
        {
          type: 'button',
          action_id: 'REPORT_STATUS_OVERACHIEVING',
          text: {
            type: 'plain_text',
            text: '✨ Over-achieving',
            emoji: true,
          },
          value: actionValue,
        },
        {
          type: 'button',
          style: 'danger',
          action_id: 'REPORT_STATUS_CONCERN',
          text: {
            type: 'plain_text',
            text: 'Concern',
            emoji: true,
          },
          value: actionValue,
        },
      ],
    },
    {
      type: 'section',
      text: {
        type: 'plain_text',
        text: ' ',
        emoji: true,
      },
    },
  ];
  return blocks;
};
