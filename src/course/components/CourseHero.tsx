import React from "react";

import { Badge, Box, Button, Flex, Heading, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { BookmarkAltIcon, PlayIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useAsync, useAsyncFn } from "react-use";

import { CourseIcon } from "~/core/components/CourseIcon";
import { LWDLink } from "~/core/components/LWDLink";
import Course from "~/core/models/Course";
import theme from "~/core/util/theme";
import toast from "~/core/util/toast";

import { useBreakpointSpy } from "~/ctrl/providers/breakpointSpy";
import UserDataRepository from "~/ctrl/repositories/userData";
import ErrorHandlingService from "~/ctrl/services/errorHandling";
import UserDataService from "~/ctrl/services/userData";
import useUserData from "~/ctrl/store/userData";

export const CourseHero = ({
  course,
  onCourseIndexModalOpen,
}: {
  course: Course;
  onCourseIndexModalOpen: () => void;
}) => {
  const { courseId } = useRouter().query as any;

  const { loading: isDBLoading } = useAsync(() => UserDataRepository.I.dbReady, []);

  const courseProgress = useUserData(store => store.current[courseId]);

  const [startCourseState, startCourse] = useAsyncFn(async () => {
    try {
      await UserDataService.I.startCourse(courseId);
      toast({
        title: `Successfully started course`,
        status: "success",
        isClosable: true,
      });
      onCourseIndexModalOpen();
    } catch (e) {
      ErrorHandlingService.I.notifyUserOfError(e, "Error starting course");
    }
  });

  const { sm: isLargerThanSM } = useBreakpointSpy();

  return (
    <VStack
      bg={theme.colors[course.color][500]}
      color={"white"}
      align={"center"}
      justify={"center"}
      pb={{ base: 8, lg: 16 }}
      spacing={0}
      shadow={"md"}
    >
      <Flex justify={"center"} w={"full"} p={8} mb={6}>
        <LWDLink color={"white"} />
      </Flex>
      <VStack px={8} maxW={"3xl"} w={"full"} align={"center"} spacing={8}>
        <Stack
          direction={{ base: "column", sm: "row" }}
          align={{ base: "unset", sm: "center" }}
          spacing={{ base: 8, sm: 4 }}
        >
          <HStack spacing={8}>
            <Box flexShrink={0}>
              <Box p={2} bg={"white"} borderRadius={"md"} shadow={"xs"}>
                <CourseIcon courseId={courseId} size={16} />
              </Box>
            </Box>
            {!isLargerThanSM && (
              <Badge colorScheme={course.isProject ? "amber" : "teal"} fontSize="0.8em">
                {course.isProject ? "PROJECT COURSE" : "BASIC MODULE"}
              </Badge>
            )}
          </HStack>
          <VStack align={"start"}>
            {isLargerThanSM && (
              <Badge colorScheme={course.isProject ? "amber" : "teal"} fontSize="0.8em">
                {course.isProject ? "PROJECT COURSE" : "BASIC MODULE"}
              </Badge>
            )}
            <Heading as={"h1"} fontSize={"4xl"}>
              {course.name}
            </Heading>
          </VStack>
        </Stack>
        <Text fontSize={"xl"} textAlign={{ base: "left", sm: "center" }} maxW={"3xl"} px={{ md: 8 }}>
          {course.subtitle}
        </Text>
        <Box w={"full"}>
          <Button
            colorScheme={"whiteAlpha"}
            shadow={"xs"}
            flexShrink={0}
            leftIcon={
              <Box w={6} h={6}>
                {courseProgress ? <BookmarkAltIcon /> : <PlayIcon />}
              </Box>
            }
            w={"full"}
            onClick={courseProgress ? onCourseIndexModalOpen : startCourse}
            isLoading={startCourseState.loading || isDBLoading}
          >
            {courseProgress ? "Open Course Index" : "Start Course"}
          </Button>
        </Box>
      </VStack>
    </VStack>
  );
};
