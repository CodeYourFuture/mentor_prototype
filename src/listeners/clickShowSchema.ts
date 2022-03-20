import fieldModal from "../blocks/fieldModal";
import { getSchema } from "../clients/apollo";
import helpOptions from "../blocks/helpOptions";
import schemaBlocks from "../blocks/schemaList";

// When the user clicks a button to edit a value
// open the modal to edit the value.

export default function ({ say, timestamp, action }) {
  action("CLICK_SHOW_SCHEMA", async ({ ack, body, client }: any) => {
    try {
      await ack();
      const schema = await getSchema();
      await say({
        blocks: schemaBlocks({ schema, timestamp }),
        text: "",
        thread_ts: timestamp,
      });
    } catch (error) {
      console.error(error);
    }
  });
}
