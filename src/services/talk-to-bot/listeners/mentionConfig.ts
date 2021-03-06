import helpOptions from "../blocks/helpOptions";
import schemaBlocks from "../blocks/schemaList";
import { getSchema } from "../../../clients/apollo";
import slack, { getSlackChannels } from "../../../clients/slack";

// When the user asks for help
// Display the schema list

export default async function ({ say, timestamp }) {
  const schema = await getSchema();
  await say({
    blocks: schemaBlocks({ schema, timestamp: timestamp }),
    text: "",
    thread_ts: timestamp,
  });
}
