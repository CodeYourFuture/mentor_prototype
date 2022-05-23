import {
  Box,
  Link as _Link,
  Image,
  Text,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { NextComponentType } from "next";
import { useSession } from "next-auth/client";
import React from "react";
import { useRouter } from "next/router";

export const footerHeight = { base: "33vh", md: "300px" };
const Footer: NextComponentType = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box pt={footerHeight} mt={"0 !important"}>
      <Box
        as={"footer"}
        px={3}
        pos="absolute"
        background={"brand.900"}
        bottom={0}
        width={"100%"}
      >
        <Flex
          alignItems={{ base: "center", md: "flex-end" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          mx={2}
          maxWidth={1200}
          m="0 auto"
          height={footerHeight}
          fontSize={13}
          pb={{ base: 0, md: 8 }}
        >
          <Image
            src="/images/logo.png"
            alt="PPS"
            height={"22px"}
            // width={"28px"}
            pl={"8px"}
            mr={2}
          />
          <Text color={"rgb(140, 140, 172)"}>
            {!isMobile ? <>Developed with 💜 by </> : "Made with 💜 by "}
            <a
              href="https://insaangroup.org"
              style={{ textDecoration: "underline" }}
              target="_blank"
            >
              Insaan
            </a>
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;
