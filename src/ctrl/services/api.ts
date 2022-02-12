import { default as _fetchCourseCertificates } from "~/api/functions/fetchCourseCertificates";
import { default as _fetchCourseIndex } from "~/api/functions/fetchCourseIndex";
import { default as _fetchCourses } from "~/api/functions/fetchCourses";
import { default as _fetchFromGitHub } from "~/api/functions/fetchFromGitHub";
import { default as _fetchTags } from "~/api/functions/fetchTags";

import Certificate from "~/core/models/Certificate";
import Course from "~/core/models/Course";
import CourseIndex from "~/core/models/CourseIndex";

class APIService {
  private static _instance: APIService;

  static get I() {
    if (!this._instance) this._instance = new APIService();
    return this._instance;
  }

  static GITHUB_CONTENT_URL = process.env.NEXT_PUBLIC_GITHUB_CONTENT_URL; // "https://raw.githubusercontent.com/LearnWhileDoing/content/main/"

  _fetch = async <T>(path: string) => fetch("/api/" + path).then(v => v.json() as unknown as T);

  fetchFromGitHub = (filename: string) =>
    process.browser ? this._fetch<string>(`fromGitHub?filename=` + filename) : _fetchFromGitHub(filename);

  fetchCourses = () =>
    process.browser ? this._fetch<Record<string, Omit<Course, "certificates">>>(`courses`) : _fetchCourses();

  fetchTags = () => (process.browser ? this._fetch<Record<string, string>>(`tags`) : _fetchTags());

  fetchCourseCertificates = (id: string) =>
    process.browser
      ? this._fetch<Record<string, Certificate>>(`courseCertificates?id=` + id)
      : _fetchCourseCertificates(id);

  fetchCourseIndex = (id: string) =>
    process.browser ? this._fetch<CourseIndex>(`courseIndex?id=` + id) : _fetchCourseIndex(id);
}

export default APIService;
