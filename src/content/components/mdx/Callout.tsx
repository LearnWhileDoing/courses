import React from "react";

import { Box, Flex, HStack } from "@chakra-ui/react";
import { InformationCircleIcon } from "@heroicons/react/solid";

interface CalloutProps {
  warning?: boolean;
}

/**
 * @see https://www.notion.so/learnwhiledoing/Edit-create-a-page-cd2bdc0554eb4f47a0c74fe672e097a0#f336f16b6189427aaa84330e04c1d52b
 *
 * @example
 * <Callout>
 *   Information
 * </Callout>
 * <Callout warning>
 *   Warning
 * </Callout>
 *
 * @param {boolean} warning
 * @param children
 */
export const Callout: React.FC<CalloutProps> = ({ warning, children }) => (
  <Box w={"full"} p={4} bg={warning ? "yellow.50" : "blue.50"} borderRadius={"md"} shadow={"xs"}>
    <Flex>
      <HStack spacing={3} align={"start"}>
        <Box w={5} color={warning ? "yellow.800" : "blue.800"} flexShrink={0} mt={"3px"}>
          <InformationCircleIcon />
        </Box>
        <Box color={warning ? "yellow.800" : "blue.800"}>{children}</Box>
      </HStack>
    </Flex>
  </Box>
);
