import React from "react";
import Head from "next/head";
import Page from "components/Pages/About";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/client";
import AccessDeniedIndicator from "components/AccessDeniedIndicator";
import ISession from "types/session";
import Landing from "components/Pages/Home";
import ClosedComponent from "components/Closed";

interface IProps {
  session: ISession;
}

const SearchPage: NextPage<IProps> = ({ session }) => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Page />
    </>
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

export default SearchPage;
