import React from "react";

import { Box, HStack, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

import PageProgress from "~/ctrl/util/PageProgress";

const _LinkBubble = {
  h: "8px",
  w: "8px",
  borderRadius: "50%",
  transform: "translateX(-3px)",
  top: "18px",
  left: "0",
  zIndex: 99,
  pos: "absolute",
  transition: "background .1s",
};

const PageProgressColors = {
  [PageProgress.READING]: { line: "blue.500", text: "blue.500" },
  [PageProgress.PRACTICING]: { line: "amber.600", text: "amber.600" },
  [PageProgress.COMPLETE]: { line: "green.500", text: "green.600" },
  [PageProgress.SKIPPED]: { line: "teal.500", text: "teal.600" },
  [PageProgress.IGNORED]: { line: "purple.500", text: "yellow.500" },
};

interface CourseIndexModalLinkProps {
  href: string;
  isFirst: boolean;
  isLast: boolean;
  title: string;
  description: string;
  progress?: PageProgress;
}

export const CourseIndexModalLink: React.FC<CourseIndexModalLinkProps> = ({
  href,
  isFirst,
  isLast,
  title,
  description,
  progress,
}) => (
  <NextLink href={href} passHref>
    <HStack
      as={Link}
      px={4}
      align={"stretch"}
      w={"full"}
      borderRadius={"md"}
      overflow={"hidden"}
      transition={"background .1s"}
      _hover={{ bg: "gray.100", textDecoration: "none" }}
      className={"link"}
    >
      <Box pos={"relative"} mr={2}>
        <Box
          bg={PageProgressColors[progress]?.line || "gray.200"}
          sx={{
            ..._LinkBubble,
            ".link:hover &": {
              bg: PageProgressColors[progress]?.line || "gray.500",
            },
          }}
        />
        {!(isFirst && isLast) && (
          <Box
            h={isLast ? "43px" : "full"}
            w={"2px"}
            transform={isFirst ? "translateY(22px)" : isLast ? "translateY(-22px)" : ""}
            transition={"background .1s"}
            bg={PageProgressColors[progress]?.line || "gray.200"}
            sx={{
              ".link:hover &": {
                bg: PageProgressColors[progress]?.line || "gray.500",
              },
            }}
          />
        )}
      </Box>
      <Box py={2}>
        <Text
          transition={"color .1s"}
          fontSize={"lg"}
          fontWeight={"semibold"}
          color={PageProgressColors[progress]?.text || "gray.800"}
          sx={{
            ".link:hover &": {
              color: PageProgressColors[progress]?.text || "gray.900",
            },
          }}
        >
          {title}
        </Text>
        <Text
          transition={"color .1s"}
          fontWeight={"medium"}
          color={PageProgressColors[progress]?.text || "gray.600"}
          sx={{
            ".link:hover &": {
              color: PageProgressColors[progress]?.text || "gray.700",
            },
          }}
        >
          {description}
        </Text>
      </Box>
    </HStack>
  </NextLink>
);
