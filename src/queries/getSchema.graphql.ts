import { gql } from 'apollo-server-express';

export default gql`
  query GET_SCHEMA {
    schema(order_by: { label: asc }) {
      area
      default_value
      description
      integration
      key
      label
      type
      uuid
    }
  }
`;
