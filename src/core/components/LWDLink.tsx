import React from "react";

import { Box, HStack, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";

import { Logo } from "~/core/components/Logo";

export const LWDLink = ({ color }: { color: string }) => {
  return (
    <LinkBox as={"div"}>
      <HStack
        color={color}
        w={"full"}
        opacity={0.6}
        _hover={{ opacity: 1 }}
        transition={"opacity var(--chakra-transition-duration-normal)"}
      >
        <Box w={8} h={8}>
          {Logo}
        </Box>
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          <LinkOverlay href={"https://app.learnwhiledoing.org"} isExternal>
            LearnWhileDoing
          </LinkOverlay>
        </Text>
      </HStack>
    </LinkBox>
  );
};
