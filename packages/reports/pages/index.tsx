import React from "react";
import Head from "next/head";
// import Page from "components/Pages/Dashboard/index";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/client";
import AccessDeniedIndicator from "components/AccessDeniedIndicator";
import ISession from "types/session";
import Home from "components/Pages/Home";
import ClosedComponent from "components/Closed";

interface IProps {
  session: ISession;
}

const IndexPage: NextPage<IProps> = ({ session }) => {
  const hasAccess = true;
  console.log({ session });
  return hasAccess ? (
    <>
      <Head>
        <title>Global Good Lab</title>
      </Head>
      <Home />
    </>
  ) : (
    <ClosedComponent />
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  return {
    props: {
      session,
    },
  };
};

export default IndexPage;
