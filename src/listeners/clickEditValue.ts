import fieldModal from '../blocks/fieldModal';
import schema from '../schema';

// When the user clicks a button to edit a value
// open the modal to edit the value.

export default function (slack) {
  slack.action('CLICK_UPDATE_VALUE', async ({ ack, body, client }: any) => {
    await ack();
    const { studentID, timestamp, key, studentName, currentValue, data } =
      JSON.parse(body.actions?.[0]?.value);
    const schemaItem = schema.find((item) => item.key === key);
    const responseTimestamp = body.message.ts;
    const channelID = body.channel.id;
    await client.views.open({
      trigger_id: body.trigger_id,
      view: fieldModal({
        studentID,
        timestamp: responseTimestamp,
        schemaItem,
        currentValue,
        studentName,
        channelID,
        data,
      }),
    });
  });
}
