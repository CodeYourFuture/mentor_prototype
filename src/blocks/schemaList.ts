export default ({ schema, timestamp }) => {
  return [
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
  ];
};
