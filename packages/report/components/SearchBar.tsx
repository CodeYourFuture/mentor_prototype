import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  InputGroup,
  InputLeftElement,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useSearchOrgsLazyQuery } from "generated-graphql";
import React, { useEffect } from "react";
import { AsyncSelect } from "chakra-react-select";
import router, { useRouter } from "next/router";
import Loader from "components/Loader";
import SDGs from "lib/SDGs";

export const SearchBar = ({
  value,
  onChange,
  mini,
  onFocus,
  onBlur,
  isSearchFocusMobile,
}: any) => {
  const [searchOrgs] = useSearchOrgsLazyQuery({ fetchPolicy: "network-only" });
  const [inputValue, setInputValue] = React.useState(`${value}`);
  const [isSelected, setIsSelected] = React.useState<any>();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const router = useRouter();
  useEffect(() => setIsSelected(false), [value]);
  // useEffect(() => onBlur(), []);

  const getAsyncOptions = async (inputValue) => {
    const { data, error } = await searchOrgs({
      variables: { q: `%${inputValue}%` },
    });
    if (error) return await [];
    return await [
      {
        label: `Search for "${inputValue}"`,
        value: "@search",
      },
      ...data?.orgs?.map((org) => ({
        label: org.name,
        value: { slug: org.slug, sdg: org.impacts?.[0]?.sdg },
      })),
    ];
  };

  const formatOptionLabel = ({ value, label }) => {
    const sdg = SDGs.find((sdg) => sdg.id === value.sdg);
    return (
      <Flex>
        <Flex
          width={
            mini ? { base: "20px", md: "30px" } : { base: "30px", md: "40px" }
          }
          // marginLeft={{ base: 1.5, md: 2 }}
          backgroundColor={sdg?.color || "gray.50"}
          height={"100%"}
          alignItems="center"
          justifyContent="center"
        >
          <Box padding={{ base: 1, md: 2 }}>
            {!sdg?.id ? (
              <SearchIcon color="gray.300" />
            ) : (
              <Image src={`/images/sdg_trim/E-WEB-Goal-${sdg?.id}.png`} />
            )}
          </Box>
        </Flex>
        <Flex alignItems={"center"} ml={mini ? 2 : 3}>
          {label}
        </Flex>
      </Flex>
    );
  };

  // if (isSelected)
  //   return (
  //     <Loader
  //       message={
  //         isSelected?.value === "@search" ? "Searching" : isSelected?.label
  //       }
  //     />
  //   );

  return (
    <InputGroup
      alignSelf={{ base: "center", md: "left" }}
      maxW={{ base: 400, md: 800 }}
      margin={{ base: "auto", md: 0 }}
    >
      {/* {!mini && ( */}
      <InputLeftElement
        pointerEvents="none"
        top={mini ? -1 : 1}
        paddingLeft={mini ? 2 : 0}
        children={<SearchIcon color="gray.300" />}
      />
      {/* )} */}
      <AsyncSelect
        formatOptionLabel={formatOptionLabel}
        instanceId={mini ? "nav" : "splash"}
        inputValue={value}
        tagVariant={mini ? "solid" : "outline"}
        onChange={(option) => {
          setIsSelected(option);
          if (option.value === "@search") {
            router.push(`/search?q=${value}`);
          } else {
            router.push(`/${option.value.slug}`);
          }
        }}
        onInputChange={(inputValue) => {
          setInputValue(inputValue);
          onChange(inputValue);
        }}
        loadOptions={(inputValue) => {
          onChange(inputValue);
          return getAsyncOptions(inputValue);
        }}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        chakraStyles={{
          input: (provided) => ({
            width: "100%",
            background: "none",
            marginLeft: mini ? 2 : "16px",
            outline: "none",
            type: "search",
            enterKeyHint: "search",
            role: "search",
          }),
          inputContainer: (provided) => ({
            width: "100%",
            maxW: "440px",
            marginLeft: mini ? 2 : 0,
          }),
          container: (provided) => ({
            width: "100%",
            maxWidth: 440,
            marginLeft: mini ? 2 : 0,
            border: mini ? "0px solid rgba(0,0,0,0) !important" : "auto",
            background: mini ? "rgb(67, 58, 87) !important" : "auto",
          }),
          placeholder: (provided) => ({
            ...provided,
            marginLeft: mini ? 4 : "1.5rem",
          }),
          menu: (provided) => ({
            ...provided,
            width: "100%",
            maxW: "440px",
            color: "black",
            display: !value?.length ? "none" : "block",
          }),
        }}
        size={mini ? "sm" : "lg"}
        placeholder={
          mini || (isMobile && isSearchFocusMobile)
            ? "Search charity or org"
            : "Search charity or org"
        }
        // autoFocus={!mini && !isMobile}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </InputGroup>
  );
};

export default SearchBar;
