import { BehaviorSubject } from "rxjs";

import Course from "~/core/models/Course";
import Database from "~/core/models/Database";
import { mapOf } from "~/core/util/expressions/mapOf";

import APIService from "~/ctrl/services/api";

class DatabaseService {
  private static _instance: DatabaseService;

  static get I() {
    if (!this._instance) this._instance = new DatabaseService();
    return this._instance;
  }

  database: Database;

  async getCourse(id: string) {
    const rawCourses = Object.entries(await APIService.I.fetchCourses()).map(async ([courseId, course]) => [
        courseId,
        { ...course, certificates: await APIService.I.fetchCourseCertificates(courseId) },
      ]),
      courses = mapOf(...((await Promise.all(rawCourses)) as [string, Course][]));

    return courses[id];
  }
}

export default DatabaseService;
