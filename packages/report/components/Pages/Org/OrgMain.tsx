import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Image,
  Text,
  useBreakpointValue,
  ButtonGroup,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import Content from "components/Content";
import SDGs from "lib/SDGs";
import { useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { StaticGoogleMap, Marker, Path } from "react-static-google-map";
import { BsPeopleFill, BsCalendar2CheckFill } from "react-icons/bs";
import { FaFlag, FaCheck, FaKey } from "react-icons/fa";
import { AiOutlineLineChart } from "react-icons/ai";
import { useFetchUserQuery } from "generated-graphql";

const MyOrgBar = ({ isAdmin, color, isMobile, companyName }) => {
  const router = useRouter();
  return (
    <Flex
      justifyContent={"flex-end"}
      alignItems={"center"}
      // pr={{ base: 3, md: 0 }}
      mt={3}
      mr={3}
    >
      <ButtonGroup isAttached variant="outline" spacing="6">
        {isAdmin && (
          <Button mr={1} leftIcon={<AiOutlineLineChart />}>
            {isMobile ? "000" : "000 views/month"}
          </Button>
        )}
        <Link href={`/${router?.query.slug}/edit`}>
          <Button
            leftIcon={isAdmin ? <FaKey /> : <EditIcon />}
            _hover={{ color: "black", background: "none" }}
            color="white"
            background={color}
          >
            Edit
          </Button>
        </Link>
      </ButtonGroup>
    </Flex>
  );
};

const Metric = ({ icon, label, value }) => (
  <Flex
    // mb={1}
    flex={1}
    padding={{ base: 1, md: 2 }}
    justifyContent="space-between"
  >
    <Flex flex={1} alignItems={"center"}>
      <Box w={8}>{icon}</Box>
      <Text pl={2}>{label}</Text>
    </Flex>
    <OpsMetric
      background="#ddd"
      justifyContent="center"
      flex={1}
      py={2}
      textAlign="center"
      ml={8}
    >
      {value}
    </OpsMetric>
  </Flex>
);

const Operations = ({ org }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Box width={"100%"} background={"#eee"} px={8} py={16}>
      {org.size && (
        <Metric
          icon={<BsPeopleFill size={30} />}
          label="Team size"
          value={org.size}
        />
      )}

      {org?.founded_at && (
        <Metric
          icon={<FaFlag size={26} />}
          label="Established"
          value={org.founded_at}
        />
      )}
      <Flex justifyContent={"space-between"} pr={3}>
        {org.link_annual_report ? (
          <a href={org.link_annual_report} target="_blank">
            <Button
              marginTop={{ base: 4, md: 8 }}
              variant="outline"
              borderColor={"black"}
              size="sm"
              _hover={{
                backgroundColor: "white",
              }}
              mr={1}
            >
              {isMobile ? `Annual report` : "View annual report"}
            </Button>
          </a>
        ) : (
          <Box></Box>
        )}
        {org.link_website && (
          <a href={org.link_website} target="_blank">
            <Text
              marginTop={{ base: 4, md: 8 }}
              // width={{ base: 140, md: 180 }}
              // variant="outline"
              borderColor={"black"}
              fontSize="lg"
              // color="white"
              // _hover={{
              //   // color: sdg?.color,
              //   backgroundColor: "#000",
              // }}
            >
              {`${org.link_website}  →`.replace(/^https?:\/\//, "")}
            </Text>
          </a>
        )}
      </Flex>
    </Box>
  );
};

const OpsMetric = styled(Box)`
  font-size: 1.1rem;
  font-weight: bold;
`;

const OpsTitle = styled(Box)`
  font-size: 0.9rem;
`;

const OrgPageComponent = ({ org, loading }) => {
  const [session] = useSession();
  const [showMoreDescription, setShowMoreDescription] = React.useState(false);
  const isMyOrg = session?.id === org?.author_id;
  const isMobile = useBreakpointValue({ base: true, md: false });
  const sdgs = Object.values(
    org?.impacts?.reduce((acc, impact) => {
      if (!acc?.[impact.sdg])
        acc[impact.sdg] = {
          sdg: SDGs.find((sdg) => sdg.id === impact.sdg),
          impacts: [],
        };
      acc[impact.sdg].impacts.push(impact);
      return acc;
    }, {})
  ) as any;

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useFetchUserQuery({
    variables: { userEmail: session?.user?.email },
  });

  const sortedSDGS = sdgs.sort((a, b) => {
    const lowestA = Math.min(...a.impacts.map(({ priority }) => priority));
    const lowestB = Math.min(...b.impacts.map(({ priority }) => priority));
    return lowestA - lowestB;
  });

  const showOps = true;
  const topGoalColour = sortedSDGS[0]?.sdg?.color || "#777";
  const sdgBorder = {
    base: `8px solid ${topGoalColour}`,
    md: `16px solid ${topGoalColour}`,
  };

  const SectionHeading = ({ children }) => (
    <Text
      backgroundColor={topGoalColour}
      mt={12}
      color="#fff"
      display="inline-block"
      paddingY={2}
      paddingLeft={3}
      paddingRight={5}
      fontWeight={"bold"}
      fontSize={{ base: "1.2em", md: "1.4em" }}
    >
      {children}
    </Text>
  );
  const screenWidth =
    (typeof window !== "undefined" && window?.innerWidth) || 500;

  const mapWidth = isMobile ? screenWidth / 2 : 760 / 2;
  const mapHeight = isMobile ? 240 : 300;

  const isAdmin = userData?.users?.[0]?.is_user_admin;

  return (
    <>
      <Box textAlign={{ base: "center", md: "left" }} pb={{ base: 0, md: 160 }}>
        <Content isFull>
          <Stack>
            {(isMyOrg || isAdmin) && (
              <MyOrgBar
                isMobile={isMobile}
                color={topGoalColour}
                isAdmin={isAdmin}
                companyName={org.name}
              />
            )}
            <Box maxW={760}>
              <Stack
                px={{ base: 5, md: 0 }}
                mb={10}
                mt={{ base: 12, md: "100px" }}
              >
                <Heading fontWeight={700} size={"2xl"} textAlign={"left"}>
                  {org.name}
                </Heading>
                {org.description && (
                  <Box textAlign={"left"}>
                    <Box
                      fontSize={{ base: 21, md: 24 }}
                      lineHeight={1.3}
                      pt={4}
                    >
                      <Text>{org.description} </Text>

                      {org.long_description && (
                        <Box>
                          <Button
                            variant="ghost"
                            size="sm"
                            mt={3}
                            p={0}
                            onClick={() =>
                              setShowMoreDescription(!showMoreDescription)
                            }
                          >
                            {!showMoreDescription
                              ? `Theory of change →`
                              : `close`}
                          </Button>
                        </Box>
                      )}
                    </Box>
                    {org.long_description && showMoreDescription && (
                      <Box mt={4}>
                        <Text>{org.long_description}</Text>
                      </Box>
                    )}
                  </Box>
                )}
              </Stack>

              <Skeleton isLoaded={!loading}>
                <Flex
                  height={{ base: "220px", md: "280px" }}
                  color={"#777"}
                  background="#aaa"
                >
                  {org.geography && (
                    <Box
                      backgroundColor={`#aadafe`}
                      backgroundSize="cover"
                      backgroundPosition={["center", "center"]}
                      flex={1}
                      overflow={"hidden"}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <StaticGoogleMap
                        size={`${mapWidth}x${mapHeight}`}
                        apiKey="AIzaSyAEsz877McL_8NQD7sRqiz420HjW4XHjIs"
                      >
                        {org.geography
                          ?.split(",")
                          .filter(Boolean)
                          .map((location) => (
                            <Marker
                              key={location}
                              size="normal"
                              location={location.trim()}
                              color={sdgs[0]?.sdg?.color.replace("#", "0x")}
                            />
                          ))}
                      </StaticGoogleMap>
                    </Box>
                  )}
                  <Box
                    backgroundImage={`url(${org.main_image})`}
                    backgroundSize="cover"
                    backgroundPosition={"center center"}
                    minHeight={{ base: 32, md: 28 }}
                    justifyContent="flex-end"
                    width={"100%"}
                    flex={1}
                  />
                </Flex>
                <Box color={"#777"} background={"#ddd"}>
                  {sortedSDGS.map(({ sdg, impacts }: any, i) => {
                    const impactCount = i === 0 ? (isMobile ? 2 : 3) : 1;
                    return (
                      <Box key={`sdg_${sdg.id}`}>
                        <Flex
                          justifyContent="space-between"
                          color="#fff"
                          background={sdg?.color}
                          minHeight={i === 0 ? 180 : 120}
                          borderLeft={sdgBorder}
                          alignItems={
                            i === 0
                              ? isMobile
                                ? "center"
                                : "flex-start"
                              : "center"
                          }
                          py={{ base: 8, md: i === 0 ? 12 : 6 }}
                          px={{ base: 2, md: 4 }}
                          textAlign="left"
                        >
                          <Stack flex={1} ml={2}>
                            <Flex
                              alignItems="center"
                              justifyContent="flex-start"
                            >
                              <Flex
                                width={{ base: "40px", md: "50px" }}
                                padding={1}
                                mr={2}
                              >
                                <Image
                                  src={`/images/sdg_trim/E-WEB-Goal-${sdg?.id}.png`}
                                  width={"100%"}
                                />
                              </Flex>
                              <Text
                                fontFamily="Oswald"
                                fontWeight="600"
                                textTransform="uppercase"
                                textAlign="left"
                                maxWidth={"150px"}
                                opacity={0.5}
                                fontSize={
                                  i === 0
                                    ? { base: "1.3em", md: "1.6em" }
                                    : { base: "1em", md: "1.2em" }
                                }
                                lineHeight={{ base: 1, md: 1.2 }}
                              >
                                {sdg.goal}
                              </Text>
                            </Flex>
                            {i === 0 && (
                              <Box>
                                {!isMobile && (
                                  <Text
                                    mt={{ base: 2, md: 4 }}
                                    opacity={0.6}
                                    fontSize={{ base: "0.9em", md: "1em" }}
                                    fontWeight="600"
                                    pr={4}
                                    maxWidth="300px"
                                  >
                                    {sdg.description}
                                  </Text>
                                )}
                                <Link href={`/${org.slug}/impact`}>
                                  <Button
                                    marginTop={{ base: 4, md: 8 }}
                                    // width={{ base: 140, md: 180 }}
                                    variant="outline"
                                    size="sm"
                                    _hover={{
                                      color: sdg?.color,
                                      backgroundColor: "white",
                                    }}
                                  >
                                    {isMobile
                                      ? `View data →`
                                      : "View impact data"}
                                  </Button>
                                </Link>
                              </Box>
                            )}
                          </Stack>
                          <Stack
                            flex={1}
                            // flexGrow={1}
                            mx={{ base: 3, md: 6 }}
                            pl={{ base: 3, md: 6 }}
                            // width={"50%"}
                          >
                            {[...impacts]
                              .slice(0, impactCount)
                              .map((impact, j) => (
                                <Box
                                  backgroundColor="rgba(0,0,0,0.1)"
                                  textAlign="center"
                                  pt={{ base: 2, md: 3 }}
                                  pb={{ base: 3, md: 5 }}
                                  key={`impact_${impact.id}`}
                                >
                                  {/* {impact.priority} */}
                                  <Text
                                    fontFamily="Oswald"
                                    fontWeight="600"
                                    fontSize={
                                      i === 0 && j === 0
                                        ? { base: "2.5rem", md: "3.2rem" }
                                        : { base: "1.4rem", md: "1.8rem" }
                                    }
                                    lineHeight={{ base: 1.2, md: 1.4 }}
                                  >
                                    {impact.prefix}
                                    {impact.value}
                                    {impact.suffix}
                                  </Text>
                                  <Box px={{ base: 2, md: 8 }}>
                                    <Text
                                      fontSize={
                                        i === 0 && j === 0
                                          ? { base: "1.1rem", md: "1.2rem" }
                                          : { base: "0.8rem", md: "0.9em" }
                                      }
                                      lineHeight={
                                        i === 0 && j === 0
                                          ? { base: "1.4rem", md: "1.3rem" }
                                          : { base: "1rem", md: "1.2rem" }
                                      }
                                    >
                                      {impact.indicator}
                                    </Text>
                                  </Box>
                                </Box>
                              ))}
                          </Stack>
                        </Flex>
                      </Box>
                    );
                  })}
                </Box>
                {showOps && (
                  <Stack
                    alignItems="flex-start"
                    // height={240}
                    // p={4}
                    color={"#777"}
                    background={"#fff"}
                    borderLeft={sdgs.length && sdgBorder}
                    spacing={0}
                  >
                    {/* {sdgs.length && (
                      <SectionHeading>Operations & Financials</SectionHeading>
                    )} */}
                    <Operations org={org} />
                    <Box>{/* )} */}</Box>
                  </Stack>
                )}
              </Skeleton>
            </Box>
          </Stack>
        </Content>
      </Box>
    </>
  );
};

export default OrgPageComponent;
