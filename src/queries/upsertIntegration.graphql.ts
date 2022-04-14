import { gql } from "apollo-server-express";

export default gql`
  mutation UPSERT_INTEGRATION(
    $team: String!
    $student: String!
    $key: String!
    $value: String!
  ) {
    insert_integrations_one(
      object: { team: $team, student: $student, key: $key, value: $value }
      on_conflict: {
        constraint: integrations_team_student_key_key
        update_columns: [value, timestamp]
      }
    ) {
      uuid
      timestamp
    }
  }
`;
