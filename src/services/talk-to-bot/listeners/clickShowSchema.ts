import fieldModal from "../blocks/fieldModal";
import { getSchema } from "../../../clients/apollo";
import helpOptions from "../blocks/helpOptions";
import schemaBlocks from "../blocks/schemaList";

// When the user clicks a button to edit a value
// open the modal to edit the value.

export default function (slack) {
  slack.action("CLICK_SHOW_SCHEMA", async ({ ack, body, client, say }: any) => {
    try {
      await ack();
      const schema = await getSchema();
      // console.log(body);
      // const metadata = JSON.parse(body.actions.value || {});
      // const { timestamp, channelID, schemaKey } = metadata;
      // console.log({ timestamp, channelID, schemaKey });
      await client.chat.delete({
        channel: body.channel.id,
        ts: body.message.ts,
      });
      await say({
        blocks: schemaBlocks({ schema, timestamp: body.message.thread_ts }),
        text: "",
        thread_ts: body.message.thread_ts,
      });
    } catch (error) {
      console.error(error);
    }
  });
}
