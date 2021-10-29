export default ({ studentID, timestamp, studentName }: any) => {
  const actionValue = `${studentID}:${timestamp}`;
  return [
    {
      type: 'section',
      text: {
        type: 'plain_text',
        text: ' ',
        emoji: true,
      },
    },
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: 'Check-in',
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
};
