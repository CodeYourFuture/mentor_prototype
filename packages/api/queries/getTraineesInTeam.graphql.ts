import { gql } from "apollo-server-express";

export default gql`
  query GET_TRAINEES_IN_TEAM($teamID: String!) {
    updates(distinct_on: student, where: { team: { _eq: $teamID } }) {
      student
    }
  }
`;
