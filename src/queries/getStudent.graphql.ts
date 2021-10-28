import { gql } from 'apollo-server-express';

export default gql`
  query GET_STUDENT($team: String!, $student: String!) {
    updates_aggregate(
      where: { team: { _eq: $team }, student: { _eq: $student } }
      order_by: { timestamp: desc, key: desc }
      distinct_on: [key]
    ) {
      nodes {
        key
        value
        timestamp
        reporter
      }
    }
  }
`;
