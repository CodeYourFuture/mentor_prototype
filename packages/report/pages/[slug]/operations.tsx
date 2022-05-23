import React from "react";
import Head from "next/head";
import Page from "components/Pages/Org/Operations";
import { NextPage } from "next";

const OperationsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Operations Page</title>
      </Head>
      <Page />
    </>
  );
};

export default OperationsPage;
