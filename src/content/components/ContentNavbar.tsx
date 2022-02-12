import React from "react";

import { Box, HStack, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

import CourseIndex from "~/core/models/CourseIndex";

interface ContentNavbarProps {
  prevSlug: string;
  nextSlug: string;
  onNavigate: (string) => void;
  index: CourseIndex;
}

export const ContentNavbar: React.FC<ContentNavbarProps> = ({ prevSlug, nextSlug, onNavigate, index }) => {
  const { chapter, pageId } = useRouter().query as any;

  return (
    <>
      <HStack w={"full"} h={16} flexShrink={0} align={"center"} justify={"space-between"} my={3} spacing={6}>
        <HStack
          as={"button"}
          spacing={1}
          color={prevSlug ? "gray.500" : "gray.300"}
          _hover={prevSlug && { color: "gray.800", cursor: "pointer" }}
          transition={"color .2s"}
          onClick={() => onNavigate(prevSlug)}
          disabled={!prevSlug}
          _disabled={{ cursor: "initial" }}
        >
          <Box w={5}>
            <ChevronLeftIcon />
          </Box>
          <Text fontWeight={"medium"}>Prev</Text>
        </HStack>
        <HStack spacing={1} color={"gray.400"} overflow={"hidden"} visibility={{ base: "hidden", sm: "visible" }}>
          <Text fontWeight={"medium"} transition={"color .2s"} isTruncated>
            {index[chapter].name}
          </Text>
          <Box w={5} flexShrink={0}>
            <ChevronRightIcon />
          </Box>
          <Text fontWeight={"medium"} transition={"color .2s"} isTruncated>
            {index[chapter].content[pageId].name}
          </Text>
        </HStack>
        <HStack
          as={"button"}
          spacing={1}
          color={nextSlug ? "gray.500" : "gray.300"}
          _hover={nextSlug && { color: "gray.800", cursor: "pointer" }}
          transition={"color .2s"}
          onClick={() => onNavigate(nextSlug)}
          disabled={!nextSlug}
          _disabled={{ cursor: "initial" }}
        >
          <Text fontWeight={"medium"}>Next</Text>
          <Box w={5}>
            <ChevronRightIcon />
          </Box>
        </HStack>
      </HStack>
    </>
  );
};
