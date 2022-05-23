import React from "react";
import Head from "next/head";
// import Page from "components/Pages/Dashboard/index";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/client";
import AccessDeniedIndicator from "components/AccessDeniedIndicator";
import ISession from "types/session";
import Impact from "components/Pages/Org/Impact";
import { initializeApollo } from "lib/apolloClient";
import { FetchOrgDocument } from "generated-graphql";
import { useRouter } from "next/router";

interface IProps {
  session: ISession;
  org: any;
  loading: boolean;
}

const OrgImpactPage: NextPage<IProps> = ({ org, loading }) => {
  return (
    <>
      <Head>
        <title>{org?.name || "org"}</title>
      </Head>
      <Impact org={org} loading={loading} />
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

export default OrgImpactPage;
