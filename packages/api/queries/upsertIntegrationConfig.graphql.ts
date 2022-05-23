import { gql } from "apollo-server-express";

export default gql`
  mutation UPSERT_INTEGRATION_CONFIG(
    $team: String!
    $integration: String!
    $value: String!
  ) {
    insert_integrations_config_one(
      object: { team: $team, integration: $integration, value: $value }
      on_conflict: {
        constraint: integrations_config_team_integration_key
        update_columns: [value]
      }
    ) {
      uuid
    }
  }
`;
