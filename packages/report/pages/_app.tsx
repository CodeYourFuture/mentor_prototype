import { ApolloProvider } from "@apollo/client";
import { useApollo } from "lib/apolloClient";
import { Provider as NextAuthProvider } from "next-auth/client";
import { AppProps } from "next/app";
import Head from "next/head";
import React, { FC, useEffect } from "react";
import ISession from "types/session";

import { Box, ChakraProvider, Stack, theme } from "@chakra-ui/react";
import Navbar from "components/Navbar";
import Footer, { footerHeight } from "components/Footer";
import { extendTheme } from "@chakra-ui/react";
import NextNProgress from "nextjs-progressbar";
import * as ga from "../lib/ga";
import { useRouter } from "next/router";

const Layout: FC = ({ children }) => {
  // 2. Call `extendTheme` and pass your custom values
  const router = useRouter();
  const theme = extendTheme({
    colors: {
      brand: {
        900: "#040d21",
      },
    },
  });

  theme.styles.global = {
    ...theme.styles.global,
    "body, html": {
      height: "100%",
      minHeight: "100vh",
    },
  };

  useEffect(() => {
    const handleRouteChange = (url) => ga.pageview(url);
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <NextNProgress color="#b0d8eb" height={6} />
      <ChakraProvider theme={theme} cssVarsRoot={undefined}>
        <Stack
          style={{ position: "relative" }}
          height={"100%"}
          minHeight={"100vh"}
        >
          <Navbar />
          <Box p={0} mt={"0px !important"} mb={footerHeight}>
            {children}
          </Box>
          <Footer />
        </Stack>
      </ChakraProvider>
    </>
  );
};

const App = ({ Component, pageProps }: AppProps) => {
  const { session }: { session: ISession } = pageProps;
  const apolloClient = useApollo(pageProps.initialApolloState, session?.token);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Roboto+Slab:wght@200&family=Satisfy&family=VT323&family=Oswald:wght@300;500;600&display=swap"
          rel="stylesheet"
        ></link>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <NextAuthProvider session={session}>
        <ApolloProvider client={apolloClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </NextAuthProvider>
    </>
  );
};

export default App;
