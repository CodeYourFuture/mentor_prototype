import fieldModal from "../blocks/fieldModal";
import { getSchema } from "../../../clients/apollo";

export default function (slack) {
  slack.action("CLICK_DATA_DUMP", async ({ ack, body, client }: any) => {
    const { key } = JSON.parse(body.actions?.[0]?.value);
    const schema = await getSchema();
    const schemaItem = schema.find((item) => item.key === key);
    await ack();
    const channelID = body.channel.id;
    const timestamp = body.message.ts;
    // await client.views.open({
    //   trigger_id: body.trigger_id,
    //   view: schemaModal({
    //     schemaKey: key,
    //     schemaItem,
    //     timestamp,
    //     channelID,
    //     mode: "edit",
    //   }),
    // });
  });
}
