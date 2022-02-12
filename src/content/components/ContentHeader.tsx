import React from "react";

import { Box, Heading, Stack, Text } from "@chakra-ui/react";

import { PageProgressDropdown } from "./PageProgress/PageProgressDropdown";

interface ContentHeaderProps {
  title: string;
  desc: string;
}

export const ContentHeader: React.FC<ContentHeaderProps> = ({ title, desc }) => {
  return (
    <Stack
      direction={{ base: "column", sm: "row", md: "column", xl: "row" }}
      align={"center"}
      pb={6}
      borderBottomWidth={"1px"}
      borderBottomColor={"gray.200"}
      mb={6}
      spacing={4}
    >
      <Box flex={1} w={"full"}>
        <Heading as={"h1"} fontSize={{ base: "3xl", sm: "4xl" }} fontWeight={"extrabold"} mb={-2} color={"black"}>
          {title}
        </Heading>
        {desc && (
          <Text mt={4} fontSize={"lg"} color={"gray.500"}>
            {desc}
          </Text>
        )}
      </Box>
      <Box flexShrink={0} my={2}>
        <PageProgressDropdown />
      </Box>
    </Stack>
  );
};
