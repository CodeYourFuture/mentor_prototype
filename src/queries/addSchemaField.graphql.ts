import { gql } from 'apollo-server-express';

export default gql`
  mutation ADD_SCHEMA(
    $key: String!
    $default_value: String
    $description: String
    $area: String
    $integration: Boolean
    $label: String
    $type: String
  ) {
    insert_schema_one(
      object: {
        key: $key
        description: $description
        default_value: $default_value
        area: $area
        integration: $integration
        label: $label
        type: $type
      }
    ) {
      key
    }
  }
`;
