import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  useBreakpointValue,
  Text,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import { useCountOrgsQuery } from "generated-graphql";
import Link from "next/link";
import React, { useEffect } from "react";
import Content from "./Content";

const OrgsCountComponent = () => {
  const { data, error, loading } = useCountOrgsQuery({ pollInterval: 10000 });
  const total = data?.orgs_aggregate.aggregate.count;
  return (
    <Skeleton isLoaded={!loading && !!data}>
      <Box
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        display="flex"
        alignItems="center"
        background={{ base: "#000", md: "transparent" }}
        height={24}
        color={"white"}
      >
        <Content>
          {/* <Link href={"/browse"}> */}
          <Flex
            // cursor={"pointer"}
            justifyContent={{ base: "center", md: "left" }}
            _hover={{ color: "white !important" }}
            alignItems="center"
          >
            <Text
              fontSize={{ base: 44, md: 58 }}
              fontFamily={"VT323"}
              paddingRight={2}
            >
              {`${total}`.padStart(3, "0")}
            </Text>{" "}
            <Heading
              color={"rgba(255,255,255,1)"}
              fontWeight={800}
              fontSize={{ base: 26, md: 32 }}
            >
              organisations
              {/* <ChevronRightIcon /> */}
            </Heading>
          </Flex>
          {/* </Link> */}
        </Content>
      </Box>
    </Skeleton>
  );
};

export default OrgsCountComponent;
