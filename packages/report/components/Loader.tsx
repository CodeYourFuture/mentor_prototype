import React, { FC } from "react";
import { Box, CircularProgress, Flex, Stack, Text } from "@chakra-ui/react";

interface Props {
  message?: string;
  thickness?: number;
}

const Loader: FC<Props> = ({ message, thickness = 0.15 }) => {
  return (
    <Stack
      zIndex={99}
      pos={"absolute"}
      h="100vh"
      top={0}
      left={0}
      w="100vw"
      textAlign="center"
      background={"brand.900"}
      alignItems="center"
      justifyContent={"center"}
      position={"fixed"}
    >
      <CircularProgress
        isIndeterminate
        size={"60px"}
        thickness={15}
        ringColor={"brand.900"}
      />
      {message?.length && (
        <Text
          fontFamily={"Montserrat"}
          opacity={0.5}
          color={"white"}
          fontSize={32}
          fontWeight={800}
          textTransform={"uppercase"}
        >
          {message}
        </Text>
      )}
    </Stack>
  );
};

export default Loader;
