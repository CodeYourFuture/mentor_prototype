import ApolloClient from "apollo-boost";
import "cross-fetch/polyfill";
import getSchemaQuery from "../packages/api/queries/getSchema.graphql";

const database = new ApolloClient({
  uri: process.env.HASURA_URI,
  headers: { "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET },
  fetchOptions: {},
});

export const getSchema = async () => {
  const fetchPolicy = "network-only";
  const { data } = await database.query({ query: getSchemaQuery, fetchPolicy });
  return data.schema;
};

export default database;
