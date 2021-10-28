import ApolloClient from 'apollo-boost';
import 'cross-fetch/polyfill';
export default new ApolloClient({
  uri: process.env.HASURA_URI,
  headers: { 'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET },
  fetchOptions: {},
});
