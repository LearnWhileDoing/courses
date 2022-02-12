import React from "react";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { ArrowSmLeftIcon, CodeIcon, DotsVerticalIcon, HomeIcon, QuestionMarkCircleIcon } from "@heroicons/react/solid";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { CourseIcon } from "~/core/components/CourseIcon";
import Course from "~/core/models/Course";

import { useBreakpointSpy } from "~/ctrl/providers/breakpointSpy";
import DatabaseService from "~/ctrl/services/database";

export const PageNavbar = ({ course }: { course: Course }) => {
  const { courseId } = useRouter().query as any;

  const { sm: isLargerThanSM } = useBreakpointSpy();

  return (
    <Flex
      as={"nav"}
      w={"full"}
      justify={"space-between"}
      align={"center"}
      h={20}
      px={8}
      bg={course.color + ".500"}
      shadow={"lg"}
      pos={"fixed"}
      top={0}
      left={0}
      zIndex={99}
    >
      <HStack spacing={4} overflow={{ base: "hidden", sm: "visible" }}>
        {isLargerThanSM && (
          <NextLink href={"/" + courseId} passHref>
            <IconButton
              as={"a"}
              aria-label={"Return"}
              colorScheme={course.color}
              icon={
                <Box w={"full"} p={1}>
                  <HomeIcon />
                </Box>
              }
              mr={4}
            />
          </NextLink>
        )}
        <Box p={2} bg={"gray.50"} borderRadius={"md"} shadow={"xs"} flexShrink={0}>
          <CourseIcon courseId={courseId} size={10} />
        </Box>
        <Box color={"gray.50"} align={"start"} w={"full"} overflow={"hidden"}>
          <Text fontSize={"xl"} fontWeight={"semibold"} mb={-1} isTruncated>
            {course.name}
          </Text>
          <Text>by LearnWhileDoing</Text>
        </Box>
      </HStack>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label={"Menu"}
          colorScheme={course.color}
          icon={
            <Box w={"full"} h={"full"} p={1}>
              <DotsVerticalIcon />
            </Box>
          }
        />
        <MenuList>
          <a href={course.getHelpURL}>
            <MenuItem
              icon={
                <Box w={6}>
                  <QuestionMarkCircleIcon />
                </Box>
              }
              isDisabled={!course.getHelpURL}
            >
              Get help
            </MenuItem>
          </a>
          <a href={course.projectFilesURL}>
            <MenuItem
              icon={
                <Box w={6}>
                  <CodeIcon />
                </Box>
              }
              isDisabled={!course.projectFilesURL}
            >
              View project files
            </MenuItem>
          </a>
        </MenuList>
      </Menu>
    </Flex>
  );
};
