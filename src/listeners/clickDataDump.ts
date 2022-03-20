import fieldModal from "../blocks/fieldModal";
import { getSchema } from "../clients/apollo";

export default function (slack) {
  slack.action("CLICK_DATA_DUMP", async ({ ack, body, client }: any) => {
    console.log("CLICK_DATA_DUMP");
  });
}
