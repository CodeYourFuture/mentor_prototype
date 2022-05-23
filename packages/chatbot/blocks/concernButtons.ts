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
          text: `What is your concern about *${
            studentName || "this trainee"
          }*?\n\n`,
        },
      ],
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          action_id: "REPORT_STATUS_CONCERN_TECHNICAL",
          text: {
            type: "plain_text",
            text: "Falling behind",
            emoji: true,
          },
          value: actionValue,
        },
        {
          type: "button",
          action_id: "REPORT_STATUS_CONCERN_MOTIVATION",
          text: {
            type: "plain_text",
            text: "Lacks Motivation",
            emoji: true,
          },
          value: actionValue,
        },
        {
          type: "button",
          action_id: "REPORT_STATUS_CONCERN_LANGUAGE",
          text: {
            type: "plain_text",
            text: "Struggling with language",
            emoji: true,
          },
          value: actionValue,
        },
        {
          type: "button",
          action_id: "REPORT_STATUS_CONCERN_PERSONAL",
          text: {
            type: "plain_text",
            text: "Personal/Health issues",
            emoji: true,
          },
          value: actionValue,
        },
        {
          type: "button",
          action_id: "REPORT_STATUS_CONCERN_MISSED_SESSION",
          text: {
            type: "plain_text",
            text: "Missed a session",
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
