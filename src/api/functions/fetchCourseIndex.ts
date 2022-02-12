import yaml from "js-yaml";

import cachedOrElse from "~/api/cache/cachedOrElse";

import CourseIndex from "~/core/models/CourseIndex";

import fetchFromGitHub from "./fetchFromGitHub";

const fetchCourseIndex = async (id: string) =>
  await cachedOrElse(
    "index#" + id,
    async () => (yaml.load(await fetchFromGitHub(id + "/INDEX.yaml")) || {}) as CourseIndex
  );

export default fetchCourseIndex;
