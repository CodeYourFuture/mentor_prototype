import { gql } from 'apollo-server-express';

export default gql`
  query GET_SCHEMA {
    schema {
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
