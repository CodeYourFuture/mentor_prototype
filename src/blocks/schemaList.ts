export default ({ schema, timestamp }) => {
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: ` `,
      },
      accessory: {
        type: 'button',
        text: {
          type: 'plain_text',
          text: '🔎 Database',
          emoji: true,
        },
        url: 'https://cloud.hasura.io/project/6a8e17b2-2ea7-446b-bba0-0d7e32b372ae/console',
      },
    },
    { type: 'divider' },
    {
      type: 'section',
      text: {
        type: 'plain_text',
        text: "Schema settings. Please don't change these unless you know what you're doing 😅",
        emoji: true,
      },
    },
    ...schema.map(({ key, label, integration }) => {
      const actionValue = JSON.stringify({ key, timestamp });
      return {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `${label}${integration ? ' 🔗' : ''}`,
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Edit',
            emoji: true,
          },
          value: actionValue,
          action_id: 'CLICK_EDIT_SCHEMA',
        },
      };
    }),
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          action_id: 'ADD_SCHEMA_FIELD',
          text: {
            type: 'plain_text',
            text: '➕ Add Question',
            emoji: true,
          },
        },
      ],
    },
  ];
};
