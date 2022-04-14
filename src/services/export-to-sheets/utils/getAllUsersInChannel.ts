export default async ({ client, channelID }) => {
  if (!client.conversations) return [];
  let allMembers = [];
  const fetchSlice = async ({ next_cursor }) => {
    const response = await client.conversations.members({
      channel: channelID,
      ...(next_cursor ? { cursor: next_cursor } : { limit: 100 }),
    });
    allMembers = [...allMembers, ...response.members];
    if (response.response_metadata.next_cursor) {
      await fetchSlice({ next_cursor: response.response_metadata.next_cursor });
    }
  };
  await fetchSlice({ next_cursor: false });
  return allMembers;
};
