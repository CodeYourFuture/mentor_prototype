import { AddIcon } from "@chakra-ui/icons";
import {
  Text,
  Button,
  Heading,
  Stack,
  useBreakpointValue,
  Box,
  Image,
  Flex,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import Content from "components/Content";
import React from "react";

const copy2 = [
  {
    type: "title",
    text: "Our Vision",
  },
  {
    type: "paragraph",
    text: "We're building a transparent and accountable architecture for good.",
  },
  {
    type: "paragraph",
    text: "We want to attract more philanthropic capital through authentication and verification of impact. Join us inproviding more transparency to stakeholders and embedding the voice of the world’s most in need.",
  },

  {
    type: "paragraph",
    text: "PPS stands for Philanthropic Performance Statement and is a digital snapshot statement, similar to a financial statement, but applicable to charitable entities, and expandable into more detailed information covering organizational/legal information, impact measurement data, financial metrics and trends, as well as governance data, with the aim of providing a holistic, meaningful, balanced and yet succinct view of a non-profit’s performance .",
  },
  {
    type: "paragraph",
    text: "The PPS is derived from PS 48626, a Code of Practice for Non-Profits developed by Philanthropy Age and Insaan Group, with guidance from the British Standards Institute, and in consultation with a global Steering Group, composed of donors, practitioners, regulators and academics. The Code lays out the conceptual foundation on which PPS stands.",
  },
  {
    type: "paragraph",
    text: "The Innovation: A Free Tool Connecting Philanthropists/Donors, Non-profits and Global Development Indicators",
  },
  {
    type: "paragraph",
    text: "The PPS tool is free for all non-profit/charitable entity users (regardless of size) and philanthropists (regardless of donation size), so there is no conflict of interest by having particular entities engaged in compensating the same organizations that provide ratings. No pay-to-play interference.",
  },
  {
    type: "paragraph",
    text: "The giver or philanthropist is actively engaged in seeing relevant, meaningful, visually attractive data of interest based on his/her values and/or interests or preferences.",
  },
  {
    type: "paragraph",
    text: "The non-profit agencies are themselves defining their goals, and key performance indicators and results, thereby aligning their own metrics, with their mission, values and theory of change, further enhancing their own systems of reporting, internal performance tracking and learning within their context of operation.",
  },
  {
    type: "paragraph",
    text: "The impact data is linked by the organizations to common metrics such as UN Sustainable Development Goals (SDGs), with potential for collaborative aggregation and systematic analysis of compounded impact in the philanthropic space.",
  },
  {
    type: "title",
    text: "The problem we are solving",
  },
  {
    type: "paragraph",
    text: "There is simply no philanthropic performance statement or comprehensive, efficient, snapshot-like tool in the current philanthropic market to guide giving, and in particular intelligent or impactful giving, in the context of a rising number of donors globally, and particularly younger generations (Generations X, Y and Z).",
  },
  {
    type: "paragraph",
    text: "Information about non-profits or charitable entities, generally found on charitable rating sites, is:",
  },
  {
    type: "list",
    items: [
      "Heavily biased towards basic legal requirements and disclosures – and rarely covers overall performance",
      "Tends to over-simplify and de-contextualize financial metrics – thereby giving an erroneous rating of noon-profits, and encouraging the reporting of, and over-scrutiny of questionable data on actual overheads;",
      "Tends to over-simplify overall philanthropic performance with grades or star systems – which generally only apply to larger non-profits (leaving some 70% of non-profits out);",
      "Requires a fee from non-profits and or users of information/donors to access deeper, impact-driven data – inherently creating a conflict of interest through this pay-to-play model;",
      "Generally, leaves end-users / beneficiaries out of the performance systems;",
      "Generally, have not reconciled qualitative and quantitative data;",
      "The current systems do not aggregate impact data or use standardized indicators (such as SDGs) to improve the alignment, coherence, and overall performance of the philanthropic ecosystem;",
      "Ease of search, donor preference matching, link to valid Big Data (for better decision-making) and ways to immediately multiply impact are non-existent. The customization of relevant information and knowledge for higher philanthropic performance does not exist in philanthropy, as it does in other industries such as retail or news.",
    ],
  },
  {
    type: "paragraph",
    text: "We can do better. We must do better.",
  },
];

const OrgsPageComponent = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <>
      <Flex
        alignItems={"flex-end"}
        background="#E6F2F4"
        // height={{ base: "50vh", md: "calc(100vh - 64px)" }}
      >
        <Content isFull={isMobile}>
          <Flex
            justifyContent={"center"}
            overflow="hidden"
            alignItems={"flex-end"}
          >
            {/* <Image
              maxHeight={"100%"}
              maxWidth={"100%"}
              src="images/pps.png"
              mb={-1}
            /> */}
          </Flex>
        </Content>
      </Flex>
      <Flex
        background="linear-gradient(180deg, rgba(6,13,32,1) 0%, rgba(0,0,0,1) 100%)"
        color="#fff"
        py={{ base: 16, md: 128 }}
      >
        <Content isFull={isMobile}>
          <Flex justifyContent={"center"} px={{ base: 12, md: 0 }}>
            <Box maxW={680}>
              {copy2.map(({ type, text, items }) => {
                if (type === "list") {
                  return (
                    <UnorderedList>
                      {items.map((item) => (
                        <ListItem
                          fontFamily={"Roboto Slab"}
                          fontSize={"xl"}
                          fontWeight={500}
                          mt={5}
                        >
                          {item}
                        </ListItem>
                      ))}
                    </UnorderedList>
                  );
                }
                if (type === "title") {
                  return (
                    <Heading
                      fontFamily="Oswald"
                      mt={16}
                      mb={2}
                      fontSize={{ base: "3xl", md: "3xl" }}
                    >
                      {text}
                    </Heading>
                  );
                }
                if (type === "paragraph") {
                  return (
                    <Text
                      fontFamily={"Roboto Slab"}
                      fontSize={"xl"}
                      fontWeight={500}
                      mt={5}
                      // textAlign="justify"
                    >
                      {text}
                    </Text>
                  );
                }
              })}
            </Box>
          </Flex>
        </Content>
      </Flex>
    </>
  );
};

export default OrgsPageComponent;
