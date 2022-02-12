import React from "react";

import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { BookmarkAltIcon, PlayIcon } from "@heroicons/react/solid";
import { GetServerSideProps, GetStaticPaths } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAsync, useAsyncFn, useEffectOnce } from "react-use";

import { CourseIcon } from "~/core/components/CourseIcon";
import { Logo } from "~/core/components/Logo";
import theme from "~/core/util/theme";
import toast from "~/core/util/toast";

import { useBreakpointSpy } from "~/ctrl/providers/breakpointSpy";
import UserDataRepository from "~/ctrl/repositories/userData";
import APIService from "~/ctrl/services/api";
import DatabaseService from "~/ctrl/services/database";
import ErrorHandlingService from "~/ctrl/services/errorHandling";
import UserDataService from "~/ctrl/services/userData";
import useCourseData from "~/ctrl/store/courseData";
import UserDataStore from "~/ctrl/store/userData";
import useUserData from "~/ctrl/store/userData";

import mdxComponents, { inlineCodeStyle } from "~/content/components/mdx";
import { CourseFooter } from "~/course/components/CourseFooter";
import { CourseHero } from "~/course/components/CourseHero";
import { CourseIndexModal } from "~/course/components/CourseIndexModal";
import CourseInfoProps from "~/course/models/CourseInfoProps";

export const getStaticPaths: GetStaticPaths = async () => {
  const courses = await APIService.I.fetchCourses();

  return {
    paths: Object.keys(courses).map(courseId => `/${courseId}`),
    fallback: false,
  };
};

export const getStaticProps: GetServerSideProps = async context => {
  const { courseId } = context.params as any;

  const rawPage = await serialize(await APIService.I.fetchFromGitHub(`${courseId}/README.mdx`));
  const index = await APIService.I.fetchCourseIndex(courseId);
  const course = await DatabaseService.I.getCourse(courseId);

  return {
    props: {
      rawPage,
      index,
      course,
    } as CourseInfoProps,
  };
};

export default function CourseInfo({ rawPage, index, course }: CourseInfoProps) {
  useEffectOnce(() => useCourseData.setState(course, true));

  const { courseId } = useRouter().query as any;

  const {
    isOpen: isCourseIndexModalOpen,
    onOpen: openCourseIndexModal,
    onClose: closeCourseIndexModal,
  } = useDisclosure();

  return (
    <>
      <Head>
        <title>{course.name} by LearnWhileDoing</title>
        <meta name={"theme-color"} content={theme.colors[course.color][500]} />
      </Head>
      <Box w={"100%"} minH={"100%"}>
        <CourseHero course={course} onCourseIndexModalOpen={openCourseIndexModal} />
        <HStack justify={"center"}>
          <Flex justify={"center"} px={8} maxW={"3xl"} w={"full"} py={16}>
            <VStack align={"start"} spacing={5} sx={inlineCodeStyle}>
              <MDXRemote {...rawPage} components={mdxComponents} />
            </VStack>
          </Flex>
        </HStack>
        <CourseFooter />
      </Box>

      <CourseIndexModal index={index} isOpen={isCourseIndexModalOpen} onClose={closeCourseIndexModal} />
    </>
  );
}
