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
import { FaFlag, FaCheck } from "react-icons/fa";
import { useFetchUserQuery } from "generated-graphql";

const MyOrgBar = ({ isAdmin }) => {
  const router = useRouter();
  return (
    <Flex
      justifyContent={"flex-end"}
      alignItems={"center"}
      pr={{ base: 3, md: 0 }}
    >
      <Link href={`/${router?.query.slug}/edit`}>
        <Button leftIcon={<EditIcon />} colorScheme="gray" w="120px" mt={3}>
          {isAdmin ? "Admin" : `Update`}
        </Button>
      </Link>
    </Flex>
  );
};

const OpsMetric = styled(Box)`
  font-size: 1.1rem;
  font-weight: bold;
`;

const OpsTitle = styled(Box)`
  font-size: 0.9rem;
`;

const OrgImpactPageComponent = ({ org, loading }) => {
  const [session] = useSession();
  const [showMoreDescription, setShowMoreDescription] = React.useState(false);
  const isMyOrg = session?.id === org?.author_id;
  const isMobile = useBreakpointValue({ base: true, md: false });
  const router = useRouter();
  // const sdgs = Object.values(
  //   org?.impacts?.reduce((acc, impact) => {
  //     if (!acc?.[impact.sdg])
  //       acc[impact.sdg] = {
  //         sdg: SDGs.find((sdg) => sdg.id === impact.sdg),
  //         impacts: [],
  //       };
  //     acc[impact.sdg].impacts.push(impact);
  //     return acc;
  //   }, {})
  // );

  // const topGoalColour = sdgs[0]?.sdg?.color || "#777";
  // const sdgBorder = {
  //   base: `8px solid ${topGoalColour}`,
  //   md: `16px solid ${topGoalColour}`,
  // };
  const screenWidth =
    (typeof window !== "undefined" && window?.innerWidth) || 500;

  const mapWidth = isMobile ? screenWidth / 2 : 760 / 2;
  const mapHeight = isMobile ? 240 : 300;

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
  );

  // const isAdmin = userData?.users?.[0]?.is_user_admin;

  return (
    <>
      <Box textAlign={{ base: "center", md: "left" }} pb={{ base: 0, md: 160 }}>
        <Content isFull>
          <Stack>
            <Box maxW={760}>
              <Stack
                px={{ base: 5, md: 0 }}
                mb={3}
                mt={{ base: 12, md: "100px" }}
              >
                <Button
                  maxW={{ base: "auto", md: "200px" }}
                  mb={{ base: 5, md: 8 }}
                  onClick={() => {
                    router.push(`/${org?.slug}`);
                  }}
                >
                  ← Back to report
                </Button>
                <Heading fontWeight={700} size={"lg"} textAlign={"left"}>
                  {org.name} Impact
                </Heading>
              </Stack>

              <Skeleton isLoaded={!loading}>
                <Box>
                  {sdgs.map(({ sdg, impacts }: any, i) => {
                    const impactCount = i === 0 ? 3 : 1;
                    // const sdg = SDGs.find((sdg) => sdg.id === impact.sdg);
                    return (
                      <Stack
                        key={`sdg_${sdg.id}`}
                        mb={2}
                        py={6}
                        color={"#fff"}
                        background={sdg?.color}
                      >
                        <Flex
                          alignItems="center"
                          justifyContent="flex-start"
                          mt={3}
                          px={6}
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
                            // px={6}
                            // maxWidth={"150px"}
                            fontSize={
                              // i === 0
                              //   ?
                              { base: "1.3em", md: "1.6em" }
                              // : { base: "1em", md: "1.2em" }
                            }
                            lineHeight={{ base: 1, md: 1.2 }}
                          >
                            {sdg.goal}
                          </Text>
                        </Flex>
                        <Text
                          opacity={0.8}
                          px={6}
                          textAlign="left"
                          fontSize={"lg"}
                          pb={3}
                        >
                          {sdg.description}
                        </Text>
                        {[...impacts].map((impact) => (
                          <Box px={{ base: 0, md: 6 }}>
                            <Box
                              backgroundColor="rgba(0,0,0,0.1)"
                              textAlign="left"
                              p={7}
                              key={`impact_${impact.id}`}
                            >
                              <Text
                                fontFamily="Oswald"
                                fontWeight="600"
                                fontSize={{ base: "1.4em", md: "1.8em" }}
                                lineHeight={{ base: 1.2, md: 1.4 }}
                              >
                                {impact.value}
                              </Text>
                              <Text fontSize="medium" opacity={0.7}>
                                {impact.indicator}
                              </Text>
                              <Text fontSize="small" mt={3}>
                                {impact.context || "No context provided"}
                              </Text>
                            </Box>
                          </Box>
                        ))}
                        {/* //     <Flex
                    //       justifyContent="space-between"
                    //       color="#fff"
                    //       background={sdg?.color}
                    //       minHeight={i === 0 ? 180 : 120}
                    //       borderLeft={sdgBorder}
                    //       alignItems="center"
                    //       py={{ base: 8, md: i === 0 ? 12 : 6 }}
                    //       px={{ base: 1, md: 4 }}
                    //       textAlign="left"
                    //     >
                    //       <Stack flex={1} ml={2}>
                    //         <Flex
                    //           alignItems="center"
                    //           justifyContent="flex-start"
                    //         >
                    //           <Flex
                    //             width={{ base: "40px", md: "50px" }}
                    //             padding={1}
                    //             mr={2}
                    //           >
                    //             <Image
                    //               src={`/images/sdg_trim/E-WEB-Goal-${sdg?.id}.png`}
                    //               width={"100%"}
                    //             />
                    //           </Flex>
                    //           <Text
                    //             fontFamily="Oswald"
                    //             fontWeight="600"
                    //             textTransform="uppercase"
                    //             textAlign="left"
                    //             maxWidth={"150px"}
                    //             fontSize={
                    //               i === 0
                    //                 ? { base: "1.3em", md: "1.6em" }
                    //                 : { base: "1em", md: "1.2em" }
                    //             }
                    //             lineHeight={{ base: 1, md: 1.2 }}
                    //           >
                    //             {sdg.goal}
                    //           </Text>
                    //         </Flex>
                    //         {i === 0 && (
                    //           <Box>
                    //             <Text opacity={0.8} pr={4} maxWidth="300px">
                    //               {sdg.description}
                    //             </Text>
                    //             <Link href={`/${org.slug}/impact`}>
                    //               <Button
                    //                 marginTop={{ base: 2, md: 4 }}
                    //                 width={{ base: 150, md: 200 }}
                    //                 variant="outline"
                    //               >
                    //                 {isMobile
                    //                   ? `View data →`
                    //                   : "View impact data →"}
                    //               </Button>
                    //             </Link>
                    //           </Box>
                    //         )}
                    //       </Stack>
                    //       <Stack
                    //         flex={1}
                    //         // flexGrow={1}
                    //         mx={{ base: 3, md: 6 }}
                    //         pl={{ base: 3, md: 6 }}
                    //         // width={"50%"}
                    //       >
                    //         {[...impacts]
                    //           .slice(0, impactCount)
                    //           .map((impact) => (
                    //             <Box
                    //               backgroundColor="rgba(0,0,0,0.1)"
                    //               textAlign="center"
                    //               py={2}
                    //               key={`impact_${impact.id}`}
                    //             >
                    //               <Text
                    //                 fontFamily="Oswald"
                    //                 fontWeight="600"
                    //                 fontSize={{ base: "1.4em", md: "1.8em" }}
                    //                 lineHeight={{ base: 1.2, md: 1.4 }}
                    //               >
                    //                 {impact.value}
                    //               </Text>
                    //               <Text
                    //                 fontSize={{ base: "0.8em", md: "0.9em" }}
                    //               >
                    //                 {impact.indicator}
                    //               </Text>
                    //             </Box>
                    //           ))}
                    //       </Stack>
                    //     </Flex> */}
                      </Stack>
                    );
                  })}
                </Box>
              </Skeleton>
            </Box>
          </Stack>
        </Content>
      </Box>
    </>
  );
};

export default OrgImpactPageComponent;
