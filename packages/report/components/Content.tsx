import { Box } from "@chakra-ui/react";
import React from "react";

const Content: any = ({ isFull, ...others }) => {
  if (isFull) return <Box maxW="1200" mx="auto" px={0} {...others} />;
  return (
    <Box
      className={"NOT_isFull"}
      maxW="1200"
      mx="auto"
      w={"95%"}
      px={{ base: 2, md: 0 }}
      {...others}
    />
  );
};

export default Content;
