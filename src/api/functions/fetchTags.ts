import yaml from "js-yaml";

import cachedOrElse from "~/api/cache/cachedOrElse";

import fetchFromGitHub from "./fetchFromGitHub";

const fetchTags = async () =>
  await cachedOrElse("tags", async () => yaml.load(await fetchFromGitHub("TAGS.yaml")) as Record<string, string>);

export default fetchTags;
