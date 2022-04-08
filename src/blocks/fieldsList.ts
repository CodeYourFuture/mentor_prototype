export default ({ studentName, studentID, timestamp, data, schema }: any) => {
  const values = data.updates?.nodes;
  const payload = { studentID, timestamp, studentName };
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Tracker",
        emoji: true,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `Please keep this information up to date.\n\n`,
        },
      ],
    },
    ...schema
      // .filter(({ integration }) => !integration)
      .map(({ key, label, default_value }) => {
        const dbVal = values?.find(({ key: k }) => k === key)?.value;
        const currentValue = dbVal || default_value;
        const actionValue = JSON.stringify({ ...payload, key, currentValue });
        return {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `${label}`,
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: currentValue || `Not set`,
              emoji: true,
            },
            value: actionValue,
            action_id: "CLICK_UPDATE_VALUE",
          },
        };
      }),
  ];
};
