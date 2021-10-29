import schemaBlocks from '../blocks/schemaList';
import { getSchema } from '../clients/apollo';

// When the user asks for help
// Display the schema list

export default async function ({ say, timestamp }) {
  const schema = await getSchema();
  await say({
    blocks: schemaBlocks({ schema, timestamp }),
    text: '',
    thread_ts: timestamp,
  });
}
