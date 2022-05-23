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
      (channel) => channel.name !== process.env.ACCESS_CHANNEL_NAME
    ) || []
  );
};

export const accessChannelID = async () => {
  const bot = await slack.client.auth.test();
  const { channels } = await slack.client.users.conversations({
    user: `${bot.user_id}`,
    types: "public_channel,private_channel",
  });
  const id = channels.find(
    (channel) => process.env.ACCESS_CHANNEL_NAME === channel.name
  )?.id;
  if (!id) throw new Error("No access channel found");
  return id;
};

export const getUsersInChannel = async ({ channelID }) => {
  if (!slack.client.conversations) return [];
  let allMembers = [];
  const fetchSlice = async ({ next_cursor }) => {
    const response = await slack.client.conversations.members({
      channel: channelID,
      ...(next_cursor ? { cursor: next_cursor } : { limit: 100 }),
    });
    allMembers = [...allMembers, ...response.members];
    if (response.response_metadata.next_cursor) {
      await fetchSlice({
        next_cursor: response.response_metadata.next_cursor,
      });
    }
  };
  await fetchSlice({ next_cursor: false });
  return allMembers;
};

export const getMessagesInChannel = async ({ channelID }) => {
  let allMessages = [];
  const fetchSlice = async ({ next_cursor }) => {
    const response = await slack.client.conversations.history({
      channel: channelID,
      ...(next_cursor ? { cursor: next_cursor } : { limit: 100 }),
    });
    allMessages = [...allMessages, ...response.messages];
    if (response.response_metadata.next_cursor) {
      await fetchSlice({ next_cursor: response.response_metadata.next_cursor });
    }
  };
  await fetchSlice({ next_cursor: false });
  return allMessages;
};
