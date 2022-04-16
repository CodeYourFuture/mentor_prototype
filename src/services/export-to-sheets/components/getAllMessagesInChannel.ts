export default async ({ client, channelID }) => {
  let allMessages = [];
  const fetchSlice = async ({ next_cursor }) => {
    const response = await client.conversations.history({
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
