import React from "react";

import { Flex } from "@chakra-ui/react";

import { LWDLink } from "~/core/components/LWDLink";

export const CourseFooter = () => {
  return (
    <Flex justify={"center"} w={"full"} bg={"gray.100"} borderTop={"1px solid"} borderColor={"gray.200"} p={8}>
      <LWDLink color={"gray.400"} />
    </Flex>
  );
};
