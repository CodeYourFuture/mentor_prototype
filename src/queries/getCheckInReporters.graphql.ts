import { gql } from 'apollo-server-express';

export default gql`
  query GET_CHECKIN_REPORTERS($studentID: String!) {
    updates: updates_aggregate(
      where: { student: { _eq: $studentID }, key: { _eq: "achievement" } }
    ) {
      nodes {
        reporter
      }
    }
  }
`;
