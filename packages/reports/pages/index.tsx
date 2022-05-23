import React from "react";
import Head from "next/head";
// import Page from "components/Pages/Dashboard/index";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/client";
import ISession from "types/session";

interface IProps {
  session: ISession;
}

const IndexPage: NextPage<IProps> = ({ session }) => {
  const hasAccess = true;
  return hasAccess ? (
    <>
      <Head>
        <title>Welcome to mentor</title>
      </Head>
      Welcome to mentor
    </>
  ) : (
    <>closed</>
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
