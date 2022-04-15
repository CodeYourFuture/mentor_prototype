import { getChannelSheet } from "../../../clients/sheets";
import slack, { getSlackChannels } from "../../../clients/slack";

export default async ({ studentID, timestamp, slackClient }: any) => {
  const actionValue = JSON.stringify({ studentID, timestamp });

  const bot = await slack.client.auth.test();
  const botChannels = await getSlackChannels({ userID: bot.user_id });
  const userChannels = await getSlackChannels({ userID: studentID });
  const channels = botChannels.filter((botChannel) =>
    userChannels.map(({ name }) => name).includes(botChannel.name)
  );
  // console.log({ slackClient });

  const channelBlocks = await Promise.all(
    channels.map(async ({ id, name }) => {
      const file = await getChannelSheet({
        client: slackClient,
        channelID: id,
      });
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
          url: `https://drive.google.com/file/u/0/d/${file?.id}/template/preview`,
        },
      };
    })
  );
  if (!channelBlocks.length) return [];
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: channelBlocks.length === 1 ? "Channel" : "Channels",
        emoji: true,
      },
    },
    ...channelBlocks,
    { type: "divider" },
  ];
};
