import apiCache from "../cache/apiCache";
import APIService from "~/ctrl/services/api";

const fetchFromGitHub = async (filename: string): Promise<string> => {
  const cached = apiCache.get(filename);
  if (cached) return cached as string;
  const raw = await fetch(APIService.GITHUB_CONTENT_URL + filename).then(file => file.text());
  apiCache.set(filename, raw);
  return raw;
};

export default fetchFromGitHub;
