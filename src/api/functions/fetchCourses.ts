import yaml from "js-yaml";

import cachedOrElse from "~/api/cache/cachedOrElse";

import Course from "~/core/models/Course";

import fetchFromGitHub from "./fetchFromGitHub";

const fetchCourses = async () =>
  await cachedOrElse(
    "courses",
    async () => yaml.load(await fetchFromGitHub("COURSES.yaml")) as Record<string, Omit<Course, "certificates">>
  );

export default fetchCourses;
