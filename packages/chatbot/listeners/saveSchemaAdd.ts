import database, { getSchema } from "../../../clients/apollo";
import addSchemaField from "../../api/queries/addSchemaField.graphql";
import { getValuesFromForm, refreshSchemaList } from "./saveSchemaEdit";

// When the user updates a schema field
// save it to the schema table

export default function (slack) {
  slack.view(
    "SAVE_SCHEMA_ADD",
    async ({ ack, body, view, say, client }: any) => {
      const metadata = JSON.parse(body.view.private_metadata || {});
      const { timestamp, channelID, schemaKey } = metadata;
      const updatedValues = await getValuesFromForm({ body, schemaKey });
      await database.mutate({
        mutation: addSchemaField,
        variables: updatedValues,
      });
      await ack();
      await refreshSchemaList({ client, channelID, timestamp });
    }
  );
}
