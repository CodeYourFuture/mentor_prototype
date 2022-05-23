import {
  Box,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import Content from "components/Content";
import { useSearchOrgsQuery } from "generated-graphql";
import OrgsList from "components/OrgsList";

const SearchPageComponent = () => {
  const router = useRouter();
  const { q } = router.query;
  const { data, error, loading } = useSearchOrgsQuery({
    variables: { q: `%${q}%` },
  });
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Content isFull={isMobile}>
      <Stack mt={12}>
        <Stack fontFamily={"Montserrat"} fontWeight={600}>
          {data?.orgs.length > 0 && (
            <Box mb={8}>
              <Heading textAlign={{ base: "center", md: "left" }}>
                {data?.orgs.length || 0} results
              </Heading>
            </Box>
          )}
          {!data?.orgs.length && <NoResults query={q} />}
        </Stack>
      </Stack>
      {<OrgsList orgs={data?.orgs} loading={loading} />}
    </Content>
  );
};

const NoResults = ({ query }) => {
  return (
    <>
      <Text pt={6} fontSize={{ base: "1.25rem", md: "1.5rem" }}>
        No results for <strong>{query}</strong>
      </Text>
      <Box pt={6}>
        <Text pb={2}>Suggestions:</Text>
        <List>
          <ListItem>• Make sure all words are spelled correctly</ListItem>
          <ListItem>• Try different keywords</ListItem>
          <ListItem>• Try more general keywords</ListItem>
        </List>
      </Box>
    </>
  );
};

export default SearchPageComponent;
