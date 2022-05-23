import fieldModal from "../blocks/fieldModal";
import schemaModal from "../blocks/schemaModal";
import { getSchema } from "../../../cyfbot/CYFBot/src/clients/apollo";

// When the user clicks a button to edit a value
// open the modal to edit the value.

export default function (slack) {
  slack.action("ADD_SCHEMA_FIELD", async ({ ack, body, client }: any) => {
    await ack();
    const channelID = body.channel.id;
    const timestamp = body.message.ts;
    await client.views.open({
      trigger_id: body.trigger_id,
      view: schemaModal({
        timestamp,
        channelID,
        mode: "add",
      }),
    });
  });
}
