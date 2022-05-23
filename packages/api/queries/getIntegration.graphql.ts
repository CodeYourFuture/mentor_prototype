import { gql } from "apollo-server-express";

export default gql`
  query GET_INTEGRATION($studentID: String!, $teamID: String!, $key: String!) {
    integrations(
      where: {
        student: { _eq: $studentID }
        team: { _eq: $teamID }
        key: { _eq: $key }
      }
    ) {
      value
    }
  }
`;
