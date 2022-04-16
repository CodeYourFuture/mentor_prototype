import { getChannelSheet } from "../../../clients/sheets";

export default async ({
  studentID,
  timestamp,
  studentName,
  mentors,
  channels,
  client,
}: any) => {
  const actionValue = JSON.stringify({ studentID, timestamp, studentName });
  const mentorBlocks = [];
  const channelBlocks = await Promise.all(
    channels.map(async ({ id, name }) => {
      const actionValue = JSON.stringify({ id, name, timestamp });
      const file = await getChannelSheet({ client, channelID: id });
      return {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${name}`,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: !file?.id ? "⚠️" : "🔍",
            emoji: true,
          },
          url: `https://docs.google.com/spreadsheets/d/${file?.id}/template/preview`,
        },
      };
    })
  );
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Channels",
        emoji: true,
      },
    },
    ...(channelBlocks.length
      ? channelBlocks
      : [
          {
            type: "section",
            text: {
              type: "plain_text",
              text: "No channels found. Invite me to a channel to start tracking it.",
              emoji: true,
            },
          },
        ]),
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Mentors",
        emoji: true,
      },
    },
    // ...(mentorBlocks.length
    //   ? mentorBlocks
    //   : [
    //       {
    //         type: "section",
    //         text: {
    //           type: "plain_text",
    //           text: "No mentors found. Please specify a mentor channel.",
    //           emoji: true,
    //         },
    //       },
    //     ]),
  ];
};
