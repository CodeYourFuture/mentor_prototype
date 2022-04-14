require("dotenv").config();
import { App } from "@slack/bolt";
const slack = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});
export default slack;

export const getSlackChannels = async ({ userID }) => {
  const { channels } = await slack.client.users.conversations({
    user: userID,
    types: "public_channel,private_channel",
  });
  return (
    channels.filter(
      (channel) => channel.id !== process.env.ACCESS_CHANNEL_ID
    ) || []
  );
};
