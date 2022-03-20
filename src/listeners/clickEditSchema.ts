import fieldModal from "../blocks/fieldModal";
import schemaModal from "../blocks/schemaModal";
import { getSchema } from "../clients/apollo";

// When the user clicks a button to edit a value
// open the modal to edit the value.

export default function (slack) {
  slack.action("CLICK_EDIT_SCHEMA", async ({ ack, body, client }: any) => {
    const { key } = JSON.parse(body.actions?.[0]?.value);
    const schema = await getSchema();
    const schemaItem = schema.find((item) => item.key === key);
    await ack();
    const channelID = body.channel.id;
    const timestamp = body.message.ts;
    await client.views.open({
      trigger_id: body.trigger_id,
      view: schemaModal({
        schemaKey: key,
        schemaItem,
        timestamp,
        channelID,
        mode: "edit",
      }),
    });
  });
}
