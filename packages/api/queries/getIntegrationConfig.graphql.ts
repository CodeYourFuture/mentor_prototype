import { gql } from "apollo-server-express";

export default gql`
  query GET_INTEGRATION_CONFIG($teamID: String!, $integration: String!) {
    integrations_config(
      where: { team: { _eq: $teamID }, integration: { _eq: $integration } }
    ) {
      value
    }
  }
`;
