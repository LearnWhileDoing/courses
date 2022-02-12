import React from "react";

import { Box, Divider, Flex, HStack, Text } from "@chakra-ui/react";
import {
  BanIcon,
  BookOpenIcon,
  ChevronDoubleRightIcon,
  ClipboardCheckIcon,
  PencilAltIcon,
  XIcon,
} from "@heroicons/react/solid";

import { useBreakpointSpy } from "~/ctrl/providers/breakpointSpy";
import PageProgress from "~/ctrl/util/PageProgress";

import { PageProgressDropdown } from "./PageProgressDropdown";

export const PageProgressDisplay: React.FC = () => {
  const { sm: isSM } = useBreakpointSpy();

  return (
    <>
      <Box w={"full"}>
        <Divider my={6} color={"gray.200"} />
      </Box>
      <Flex py={4} justify={"center"} mb={6}>
        <HStack spacing={4}>
          {isSM && (
            <Text fontSize={"xl"} fontWeight={500}>
              Page Progress:
            </Text>
          )}
          <PageProgressDropdown />
        </HStack>
      </Flex>
    </>
  );
};
