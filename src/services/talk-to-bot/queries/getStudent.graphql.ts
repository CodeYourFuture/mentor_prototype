import { gql } from "apollo-server-express";

export default gql`
  query GET_STUDENT($studentID: String!) {
    reporters: updates_aggregate(
      where: { student: { _eq: $studentID }, key: { _eq: "achievement" } }
      distinct_on: reporter
    ) {
      nodes {
        reporter
      }
    }
    updates: updates_aggregate(
      where: { student: { _eq: $studentID }, key: { _neq: "achievement" } }
      order_by: { timestamp: desc, key: desc }
      distinct_on: [key]
    ) {
      nodes {
        reporter
      }
    }
    quick_ALL: updates_aggregate(
      where: { student: { _eq: $studentID }, key: { _eq: "achievement" } }
    ) {
      nodes {
        reporter
      }
    }
    quick_OVERACHIEVING: updates_aggregate(
      where: {
        student: { _eq: $studentID }
        key: { _eq: "achievement" }
        value: { _eq: "OVERACHIEVING" }
      }
    ) {
      nodes {
        reporter
      }
    }
    quick_CONCERN: updates_aggregate(
      where: {
        student: { _eq: $studentID }
        key: { _eq: "achievement" }
        value: { _eq: "CONCERN" }
      }
    ) {
      nodes {
        reporter
      }
    }
    concern_areas: updates_aggregate(
      where: { student: { _eq: $studentID }, key: { _eq: "concern" } }
    ) {
      nodes {
        reporter
      }
    }
  }
`;
