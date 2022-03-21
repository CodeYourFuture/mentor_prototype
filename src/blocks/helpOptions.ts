export default ({ studentID, timestamp, studentName }: any) => {
  const actionValue = JSON.stringify({ studentID, timestamp, studentName });
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Help",
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "plain_text",
        text: "Configure CYFBot:",
        emoji: true,
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          action_id: "CLICK_SHOW_SCHEMA",
          text: {
            type: "plain_text",
            text: "Add/Edit questions",
            emoji: true,
          },
          value: actionValue,
        },
        // {
        //   type: "button",
        //   action_id: "CLICK_DATA_DUMP",
        //   text: {
        //     type: "plain_text",
        //     text: "Export Data",
        //     emoji: true,
        //   },
        //   value: actionValue,
        // },
      ],
    },
    {
      type: "section",
      text: {
        type: "plain_text",
        text: " ",
        emoji: true,
      },
    },
  ];
};
