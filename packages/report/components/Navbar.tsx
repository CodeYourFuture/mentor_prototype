import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Link as _Link,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  MenuDivider,
  Text,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { NextComponentType } from "next";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import SearchBar from "components/SearchBar";
import { FcGoogle } from "react-icons/fc";

export const AddOrgButton = (additionalProps) => {
  return (
    <Button
      background={"none"}
      variant="outline"
      paddingY={1}
      _hover={{ bg: "#555" }}
      _active={{ bg: "#555" }}
      color="#fff"
      children={additionalProps.short ? "Add org" : "Add your organisation"}
      {...additionalProps}
    />
  );
};

const Navbar: NextComponentType = () => {
  const [session] = useSession();
  const router = useRouter();
  const { q } = router.query;
  const [query, setQuery] = React.useState(q);
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => setQuery(router.query.q), [router]);

  const signInOrUp = (e) => {
    e.preventDefault();
    signIn({ callbackUrl: "/orgs" });
  };

  const signInButtonNode = () => {
    if (session)
      return (
        <Link href="/orgs/add">
          <AddOrgButton
            short
            display={{
              base: router.pathname === "/" ? "inline-block" : "none",
              md: "none",
            }}
          />
        </Link>
      );
    return (
      <Box>
        <Button
          background={"none"}
          _hover={{ bg: "none" }}
          _active={{ bg: "none" }}
          color="#fff"
          onClick={signInOrUp}
          children="Sign In"
        />
        <AddOrgButton
          short={isMobile}
          display={{
            base: router.pathname === "/" ? "inline-block" : "none",
            md: "inline-block",
          }}
          onClick={signInOrUp}
        />
      </Box>
    );
  };

  return (
    <Box>
      <Box p={3} shadow="sm" pos="relative" background={"brand.900"}>
        <Box mx={2} maxWidth={1200} m="0 auto">
          <Stack
            isInline
            spacing={4}
            align="center"
            justifyContent="space-between"
            w="full"
            alignItems="center"
          >
            <Flex>
              <Stack isInline spacing={4} align="center" fontWeight="semibold">
                <Link href="/">
                  <Flex cursor="pointer">
                    <Image
                      src="/images/hand.png"
                      alt="PPS"
                      height={"27px"}
                      width={"38px"}
                      pl={"8px"}
                    />
                    {router.pathname === "/" && !isMobile && (
                      <Text
                        fontFamily="Oswald"
                        fontWeight="300"
                        fontSize={{ base: "1.1rem", md: "1.2rem" }}
                        color="#fff"
                        marginLeft={1.5}
                        marginRight={1}
                        // marginTop={{ base: -0.5, md: -0.5 }}
                        opacity={0.9}
                      >
                        GLOBAL GOOD LAB
                      </Text>
                    )}
                  </Flex>
                </Link>
              </Stack>
              <Box
                width={260}
                display={{
                  base: "none",
                  md: router.pathname !== "/" ? "block" : "none",
                }}
                color="white"
              >
                <SearchBar
                  mini
                  value={query}
                  onChange={(value) => setQuery(value)}
                  onSubmit={() => router.push(`/search?q=${query}`)}
                />
              </Box>
            </Flex>
            <Box>
              <Stack isInline spacing={4} align="center">
                {signInButtonNode()}
                <Menu>
                  {session && (
                    <MenuButton
                      background={"none"}
                      _hover={{ bg: "#333" }}
                      _active={{ bg: "#333" }}
                      as={Button}
                      pl={"10px"}
                      pr={"0px"}
                      rightIcon={
                        <ChevronDownIcon
                          transform={"translateX(-6px)"}
                          color="#fff"
                        />
                      }
                    >
                      <Image
                        height="32px"
                        borderRadius="100%"
                        src={session?.user?.image}
                        alt="avatar"
                      />
                    </MenuButton>
                  )}
                  <MenuList zIndex={2}>
                    <Link href="/orgs">
                      <MenuItem fontWeight="bold">
                        <FcGoogle style={{ marginRight: 4 }} />
                        {session?.user?.name}
                      </MenuItem>
                    </Link>
                    {/* <MenuDivider /> */}
                    <Link href="/orgs/add">
                      <MenuItem>Add Organisation</MenuItem>
                    </Link>
                    <Link href="/orgs">
                      <MenuItem>Your Organisations</MenuItem>
                    </Link>
                    <MenuDivider />
                    <MenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        signOut({ callbackUrl: "/" });
                      }}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
