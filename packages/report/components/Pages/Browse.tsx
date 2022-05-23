import { AddIcon } from "@chakra-ui/icons";
import {
  Text,
  Button,
  Heading,
  Stack,
  useBreakpointValue,
  Box,
  Flex,
} from "@chakra-ui/react";
import Content from "components/Content";
import Loader from "components/Loader";
import OrgsList from "components/OrgsList";
import {
  useFetchOrgQuery,
  useFetchOrgsQuery,
  useMyOrgsQuery,
} from "generated-graphql";
import { getSession } from "next-auth/client";
import Link from "next/link";
import React from "react";
import IOrg from "types/org";

const OrgsPageComponent = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { data, error, loading } = useFetchOrgsQuery({});

  if (!data) {
    return <Loader />;
  }

  const orgs = data.orgs || [];
  return (
    <Content isFull={isMobile} py={8}>
      <Stack spacing={8}>
        <Heading textAlign={{ base: "center", md: "left" }}>
          All Organisations
        </Heading>
        {<OrgsList orgs={orgs} loading={loading} />}
        {!orgs.length && (
          <Text pt={6} fontSize={"1.25rem"}>
            Database empty
          </Text>
        )}
      </Stack>
    </Content>
  );
};

export default OrgsPageComponent;
