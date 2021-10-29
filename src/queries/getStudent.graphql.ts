import { gql } from 'apollo-server-express';

export default gql`
  query GET_STUDENT($studentID: String!) {
    updates_aggregate(
      where: { student: { _eq: $studentID } }
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
