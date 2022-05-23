import { gql } from 'apollo-server-express';

export default gql`
  mutation DELETE_SCHEMA_FIELD($schemaKey: String!) {
    delete_schema_by_pk(key: $schemaKey) {
      key
    }
  }
`;
