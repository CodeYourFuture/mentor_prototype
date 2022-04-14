import { gql } from "apollo-server-express";

export default gql`
  query GET_STUDENT($studentID: String!) {
    reporters: updates_aggregate(
      where: { student: { _eq: $studentID }, key: { _eq: "achievement" } }
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
        key
        value
        timestamp
        reporter
      }
    }
    quick_ALL: updates_aggregate(
      where: { student: { _eq: $studentID }, key: { _eq: "achievement" } }
    ) {
      aggregate {
        count
      }
    }
    quick_OVERACHIEVING: updates_aggregate(
      where: {
        student: { _eq: $studentID }
        key: { _eq: "achievement" }
        value: { _eq: "OVERACHIEVING" }
      }
    ) {
      aggregate {
        count
      }
    }
    quick_CONCERN: updates_aggregate(
      where: {
        student: { _eq: $studentID }
        key: { _eq: "achievement" }
        value: { _eq: "CONCERN" }
      }
    ) {
      aggregate {
        count
      }
    }
    concern_areas: updates_aggregate(
      where: { student: { _eq: $studentID }, key: { _eq: "concern" } }
    ) {
      nodes {
        value
        timestamp
      }
    }
  }
`;
