import {
  Box,
  Flex,
  Stack,
  useBreakpointValue,
  Text,
  Skeleton,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Link from "next/link";
import IOrg from "types/org";
import Loader from "./Loader";
import { StaticGoogleMap, Marker, Path } from "react-static-google-map";
import SDGs from "lib/SDGs";
// import OrgCard from "./OrgCard";

const OrgCard = ({ org, loading }: { org: IOrg; loading?: boolean }) => {
  const main_impact = org.impacts?.[0];
  const main_impact_sdg = SDGs.find(({ id }) => main_impact?.sdg === id);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const screenWidth =
    (typeof window !== "undefined" && window?.innerWidth) || 500;

  const mapWidth = isMobile ? Math.round(screenWidth / 3) : 150;
  const mapHeight = isMobile ? 100 : 120;

  return (
    <Skeleton isLoaded={!loading} height={"100%"}>
      <Stack
        // backgroundColor={main_impact_sdg?.color}
        borderTop={{ base: `1px solid ${main_impact_sdg?.color}`, md: "none" }}
        marginBottom={{ base: 4, md: 0 }}
        textAlign="center"
        // color="white"
        spacing={0}
        height="100%"
      >
        <Flex alignItems="center" justifyContent="flex-start">
          <Flex
            width={{ base: "30px", md: "40px" }}
            // marginLeft={{ base: 1.5, md: 2 }}
            backgroundColor={main_impact_sdg?.color || "#ddd"}
            height={"100%"}
            alignItems="center"
            justifyContent="center"
          >
            <Box padding={{ base: 1, md: 2 }}>
              {main_impact_sdg?.id ? (
                <Image
                  src={`/images/sdg_trim/E-WEB-Goal-${main_impact_sdg?.id}.png`}
                />
              ) : (
                <Text
                  color="#aaa"
                  fontWeight={"bold"}
                  fontSize="lg"
                  lineHeight={"1rem"}
                >
                  ?
                </Text>
              )}
            </Box>
          </Flex>
          <Text fontSize="md" fontWeight={"700"} padding={2} paddingTop={3}>
            {org.name}
          </Text>
        </Flex>
        <Flex background="#aaa">
          {/* {org?.geography && (
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
                    color={main_impact_sdg?.color.replace("#", "0x") as any}
                  />
                ))}
            </StaticGoogleMap>
          )} */}
          <Box
            backgroundImage={`url(${org.main_image})`}
            backgroundSize="cover"
            backgroundPosition={"center center"}
            minHeight={{ base: 32, md: 28 }}
            justifyContent="flex-end"
            width={"100%"}
            flex={2}
          />
        </Flex>
        <Flex
          // textAlign="center"
          p={4}
          color="white"
          key={`impact_${main_impact?.id}`}
          justifyContent="space-between"
          height="100%"
          backgroundColor={main_impact_sdg?.color || "#ddd"}
          alignItems="center"
        >
          {main_impact ? (
            <>
              <Text
                fontFamily="Oswald"
                fontWeight="600"
                fontSize={{ base: "1.4rem", md: "1.8rem" }}
                lineHeight={{ base: "1.6rem", md: "2rem" }}
                marginRight={3}
                borderRight={"1px solid rgba(255,255,255,0.9)"}
                paddingRight={3}
              >
                {main_impact?.prefix}
                {main_impact?.value}
                {main_impact?.suffix}
              </Text>
              <Text
                flexGrow="1"
                fontSize={{ base: "0.9em", md: "1em" }}
                lineHeight={{ base: 1.1, md: 1.3 }}
                textAlign="left"
              >
                {main_impact?.indicator}
              </Text>
            </>
          ) : (
            <Text
              flexGrow="1"
              fontSize={{ base: "0.9em", md: "1em" }}
              lineHeight={{ base: 1.1, md: 1.3 }}
              textAlign="center"
              color="#777"
            >
              No impact data
            </Text>
          )}
        </Flex>
      </Stack>
    </Skeleton>
  );
};

type ListProps = {
  orgs: any;
  loading?: boolean;
  after?: any;
};

const OrgsList = ({ orgs, loading, after }: ListProps) => {
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const [submitting, setSubmitting] = React.useState<IOrg | undefined>();
  if (!columns) return null;
  return (
    <Grid
      templateColumns={`repeat(${columns}, 1fr)`}
      autoRows={"1fr"}
      gap={{ base: 0, md: 4 }}
    >
      {orgs?.map((org: IOrg, index: number) => {
        const main_impact = org.impacts?.[0];
        const main_impact_sdg = SDGs.find(({ id }) => main_impact?.sdg === id);
        return (
          <Skeleton key={org.slug} isLoaded={!loading}>
            <GridItem
              key={org.slug}
              rowSpan={1}
              colSpan={1}
              height={"100%"}
              borderBottom={{ base: "8px solid #eee", md: "none" }}
            >
              <Link key={index} href={`/${org.slug}`}>
                <Box
                  onClick={() => setSubmitting(org)}
                  height={"100%"}
                  width={"100%"}
                  cursor={"pointer"}
                >
                  <OrgCard org={org} loading={loading} />
                </Box>
              </Link>
            </GridItem>
          </Skeleton>
        );
      })}
      {after}
    </Grid>
  );
};

export default OrgsList;
