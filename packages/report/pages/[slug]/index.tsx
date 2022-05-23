import React from "react";
import Head from "next/head";
// import Page from "components/Pages/Dashboard/index";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/client";
import AccessDeniedIndicator from "components/AccessDeniedIndicator";
import ISession from "types/session";
import Org from "components/Pages/Org/OrgMain";
import { initializeApollo } from "lib/apolloClient";
import { FetchOrgDocument } from "generated-graphql";
import { useRouter } from "next/router";

interface IProps {
  session: ISession;
  org: any;
  loading: boolean;
}

const OrgPage: NextPage<IProps> = ({ org, loading }) => {
  return (
    <>
      <Head>
        <title>{org?.name || "org"} | Global Good Lab</title>
      </Head>
      <Org org={org} loading={loading} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  const apolloClient = initializeApollo({}, session?.token);
  const { data, loading } = await apolloClient.query({
    query: FetchOrgDocument,
    variables: {
      slug: query.slug,
    },
  });
  const [org] = data?.orgs || [];
  return { props: { session, org, loading } };
};

export default OrgPage;
