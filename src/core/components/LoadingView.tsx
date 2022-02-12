import React from "react";

import { CircularProgress, Text, VStack } from "@chakra-ui/react";

export const LoadingView: React.FC<{ desc?: string; bg?: string; color?: string; size?: number }> = ({
  desc,
  bg = "gray.100",
  color = "indigo.500",
  size = 20,
}) => (
  <VStack bg={bg} h={"100%"} w={"100%"} align={"center"} justify={"center"} spacing={8}>
    <CircularProgress isIndeterminate color={color} trackColor={"gray.100"} size={size} />
    {desc && (
      <Text color={"gray.400"} fontSize={"lg"} fontWeight={"medium"}>
        {desc}
      </Text>
    )}
  </VStack>
);
