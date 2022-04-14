import { gql } from 'apollo-server-express';

export default gql`
  mutation ADD_RECORD(
    $team: String!
    $student: String!
    $reporter: String!
    $key: String!
    $value: String!
  ) {
    report: insert_updates_one(
      object: {
        team: $team
        student: $student
        reporter: $reporter
        key: $key
        value: $value
      }
    ) {
      uuid
    }
  }
`;
