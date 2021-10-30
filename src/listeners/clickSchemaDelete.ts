import database, { getSchema } from '../clients/apollo';
import { refreshSchemaList } from './saveSchemaEdit';
import deleteSchemaField from '../queries/deleteSchemaField.graphql';

// When the user updates a schema field
// save it to the schema table

export default function (slack) {
  slack.action(
    'DELETE_SCHEMA_FIELD',
    async ({ ack, body, view, client }: any) => {
      const metadata = JSON.parse(body.view.private_metadata || {});
      const { timestamp, channelID, schemaKey } = metadata;
      await database.mutate({
        mutation: deleteSchemaField,
        variables: { schemaKey },
      });
      client.views.update({
        view_id: body.view.id,
        view: {
          type: 'modal',
          title: {
            type: 'plain_text',
            text: `Deleted`,
          },
          blocks: [
            {
              type: 'section',
              text: {
                type: 'plain_text',
                text: 'Field Deleted',
                emoji: true,
              },
            },
          ],
        },
      });
      await ack({ response_action: 'clear' });
      await refreshSchemaList({ client, channelID, timestamp });
    }
  );
}
