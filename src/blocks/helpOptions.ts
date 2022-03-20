export default ({ studentID, timestamp, studentName }: any) => {
  const actionValue = `${studentID}:${timestamp}`;
  return [
    {
      type: "section",
      text: {
        type: "plain_text",
        text: " ",
        emoji: true,
      },
    },
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Help",
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
            text: "Edit Schema",
            emoji: true,
          },
          value: actionValue,
        },
        {
          type: "button",
          action_id: "CLICK_DATA_DUMP",
          text: {
            type: "plain_text",
            text: "Export Data",
            emoji: true,
          },
          value: actionValue,
        },
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
