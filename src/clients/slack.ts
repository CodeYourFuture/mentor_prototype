require("dotenv").config();
import { App } from "@slack/bolt";
const slack = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});
export default slack;

export const getSlackChannels = async () => {
  const auth = await slack.client.auth.test();
  const { channels } = await slack.client.users.conversations({
    user: auth.user_id,
    types: "public_channel,private_channel",
  });
  return (
    channels.filter(
      (channel) => channel.id !== process.env.ACCESS_CHANNEL_ID
    ) || []
  );
};
