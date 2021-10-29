import database, { getSchema } from '../clients/apollo';
import updateSchema from '../queries/updateSchema.graphql';
import schemaList from '../blocks/schemaList';

// When the user updates a schema field
// save it to the schema table

export default function (slack) {
  slack.view(
    'SAVE_SCHEMA_EDIT',
    async ({ ack, body, view, say, client }: any) => {
      const metadata = JSON.parse(body.view.private_metadata || {});
      const { timestamp, channelID, schemaKey } = metadata;
      const updatedValues = Object.entries(body.view.state.values).reduce(
        (acc, [column, value]) => ({
          ...acc,
          [column]: (value as any).value.value,
        }),
        { key: schemaKey }
      ) as any;
      updatedValues.integration = updatedValues.integration === 'true';
      await database.mutate({
        mutation: updateSchema,
        variables: updatedValues,
      });
      await ack();
      const schema = await getSchema();
      await client.chat.update({
        channel: channelID,
        ts: timestamp,
        as_user: true,
        blocks: schemaList({ schema, timestamp }),
      });
    }
  );
}
