import fieldModal from "../blocks/fieldModal";
import { getSchema } from "../../../clients/apollo";
// import sheets from "../../export-to-sheets";

// When the user clicks a button to edit a value
// open the modal to edit the value.

export default function (slack) {
  slack.action("EXPORT_DATA", async ({ ack, body, client }: any) => {
    await ack();
    // await sheets();
  });
}
