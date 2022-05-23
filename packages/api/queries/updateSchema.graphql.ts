import { gql } from 'apollo-server-express';

export default gql`
  mutation UPDATE_SCHEMA(
    $key: String!
    $default_value: String
    $description: String
    $area: String
    $integration: Boolean
    $label: String
    $type: String
  ) {
    update_schema_by_pk(
      pk_columns: { key: $key }
      _set: {
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
