import yaml from "js-yaml";

import cachedOrElse from "~/api/cache/cachedOrElse";

import Certificate from "~/core/models/Certificate";

import APIService from "~/ctrl/services/api";

/**
 * Finds the certificates from a course.
 */
const fetchCourseCertificates = async (id: string) =>
  await cachedOrElse(
    "certificates#" + id,
    async () =>
      (yaml.load(await APIService.I.fetchFromGitHub(id + "/CERTIFICATES.yaml")) || {}) as Record<string, Certificate>
  );

export default fetchCourseCertificates;
