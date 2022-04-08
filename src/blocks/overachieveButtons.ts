export default ({ studentID, timestamp, studentName }: any) => {
  const actionValue = JSON.stringify({ studentID, timestamp });
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
        text: "💬 Concern",
        emoji: true,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `In what way is *${
            studentName || "this trainee"
          }* overachieving?\n\n`,
        },
      ],
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          action_id: "REPORT_STATUS_OVER_TECHNICAL",
          text: {
            type: "plain_text",
            text: "Technically gifted",
            emoji: true,
          },
          value: actionValue,
        },
        {
          type: "button",
          action_id: "REPORT_STATUS_OVER_MOTIVATION",
          text: {
            type: "plain_text",
            text: "Strong drive and motivation",
            emoji: true,
          },
          value: actionValue,
        },
        {
          type: "button",
          action_id: "REPORT_STATUS_OVER_TEAM",
          text: {
            type: "plain_text",
            text: "Great team spirit",
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
