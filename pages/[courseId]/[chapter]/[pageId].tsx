import React, { useEffect } from "react";

import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import withShiki from "@stefanprobst/remark-shiki";
import { GetServerSideProps, GetStaticPaths } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAsync, useEffectOnce } from "react-use";

import { mapOf } from "~/core/util/expressions/mapOf";

import { CourseIndexProvider } from "~/ctrl/providers/courseIndex";
import UserDataRepository from "~/ctrl/repositories/userData";
import APIService from "~/ctrl/services/api";
import DatabaseService from "~/ctrl/services/database";
import useCourseData from "~/ctrl/store/courseData";
import UserDataStore from "~/ctrl/store/userData";
import useUserData from "~/ctrl/store/userData";

import { CompletedCourseDialog } from "~/content/components/CompletedCourseDialog";
import { ContentNavbar } from "~/content/components/ContentNavbar";
import { CourseIndexDisplay } from "~/content/components/CourseIndexDisplay";
import { PageNavbar } from "~/content/components/PageNavbar";
import { Pagination } from "~/content/components/Pagination";
import mdxComponents from "~/content/components/mdx";
import generateSlugsFromCourseIndex from "~/content/helpers/generateSlugsFromCourseIndex";
import getNavigationPages from "~/content/helpers/getNavigationPages";
import CourseContentProps from "~/content/models/CourseContentProps";
import { PageContent } from "~/content/templates/PageContent";

export const getStaticPaths: GetStaticPaths = async () => {
  const courses = await APIService.I.fetchCourses();

  return {
    paths: await Promise.all(
      Object.keys(courses).map(async courseId => {
        console.log(courseId);
        return Object.entries(await APIService.I.fetchCourseIndex(courseId)).map(([chapter, { content }]) =>
          Object.keys(content).map(pageId => ({
            params: {
              courseId,
              chapter,
              pageId,
            },
          }))
        );
      })
    ).then(paths => paths.flat().flat()),
    fallback: false,
  };
};

export const getStaticProps: GetServerSideProps = async context => {
  const { courseId, chapter, pageId } = context.params as any;

  const index = await APIService.I.fetchCourseIndex(courseId);
  const certificates = await APIService.I.fetchCourseCertificates(courseId);

  const shiki = await import("shiki");

  const rawPage = await serialize(await APIService.I.fetchFromGitHub(`${courseId}/${chapter}/${pageId}.mdx`), {
    mdxOptions: {
      remarkPlugins: [[withShiki, { theme: await shiki.loadTheme("../../src/core/vendor/code-theme.json") }]],
    },
  });
  const course = await DatabaseService.I.getCourse(courseId);

  return {
    props: {
      index,
      certificates,
      rawPage,
      course,
    } as CourseContentProps,
  };
};

export default function CourseContent({ index, rawPage, course }: CourseContentProps) {
  useEffectOnce(() => useCourseData.setState(course, true));

  const router = useRouter();
  const { courseId, chapter, pageId } = router.query as any,
    slug = `${chapter}/${pageId}`;

  const { loading: isDBLoading } = useAsync(() => UserDataRepository.I.dbReady, []);

  const courseProgress = useUserData(store => store.current[courseId]);

  useAsync(async () => {
    if (!isDBLoading && !courseProgress) {
      await router.push("/" + courseId);
    }
  });

  const pages = generateSlugsFromCourseIndex(index);
  const { nextPage, prevPage } = getNavigationPages(slug, pages, index);

  /**
   * Check for earned certificates!
   */
  //getEarnedCertificates(certificates, userData?.current[courseId] || []);

  const {
    isOpen: isCompletedCourseDialogOpen,
    onOpen: openCompletedCourseDialog,
    onClose: closeCompletedCourseDialog,
  } = useDisclosure();

  /**
   * Check for course completion
   */
  useEffect(() => {
    if (isDBLoading) return;

    const allCourseSlugs = generateSlugsFromCourseIndex(index);
    const completedCourseSlugs = mapOf(
      ...Object.entries(courseProgress)
        .map(([chapterId, chapter]) =>
          mapOf(
            ...Object.entries(chapter).map(
              ([pageId, pageProgress]) => [`${chapterId}/${pageId}`, pageProgress] as [string, number]
            )
          )
        )
        .map(value => Object.entries(value))
        .flat()
        .filter(v => v[1] >= 3)
    );

    const hasCompletedAllPages =
      allCourseSlugs.every(v => Object.keys(completedCourseSlugs).includes(v)) &&
      Object.keys(completedCourseSlugs).every(v => allCourseSlugs.includes(v));

    if (hasCompletedAllPages) openCompletedCourseDialog();
  }, [courseProgress?.[chapter]?.[pageId]]);

  async function onNavigate(slug: string) {
    await router.push(`/${courseId}/${slug}`);
  }

  return (
    <CourseIndexProvider index={index}>
      <Head>
        <title>{`${course.name}: ${index[chapter].content[pageId].name} | LearnWhileDoing`}</title>
        <link rel={"icon"} href={`${APIService.GITHUB_CONTENT_URL}${courseId}/THUMBNAIL.png`} />
      </Head>
      {!isDBLoading && courseProgress && (
        <>
          <PageNavbar course={course} />
          <Flex w={"100%"} minH={"100%"}>
            <CourseIndexDisplay index={index} />
            <Box minH={"full"} w={"full"} bg={"white"} flex={1} pt={20}>
              <Flex ml={{ base: 0, md: 80 }} justify={"center"}>
                <Box w={"100%"} maxW={{ base: "3xl", lg: "4xl" }} flex={1} px={{ base: 8, lg: 16 }} pb={12}>
                  <ContentNavbar
                    index={index}
                    prevSlug={prevPage?.slug}
                    nextSlug={nextPage?.slug}
                    onNavigate={onNavigate}
                  />
                  <Flex flexDirection={"column"}>
                    <PageContent {...index[chapter].content[pageId]}>
                      <MDXRemote {...rawPage} components={mdxComponents} />
                    </PageContent>
                  </Flex>
                  <Pagination prev={prevPage} next={nextPage} color={course.color + ".500"} onNavigate={onNavigate} />
                </Box>
              </Flex>
            </Box>
          </Flex>
          <CompletedCourseDialog isOpen={isCompletedCourseDialogOpen} onClose={closeCompletedCourseDialog} />
        </>
      )}
    </CourseIndexProvider>
  );
}
