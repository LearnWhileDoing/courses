import Course from "./Course";

export type CourseList = Record<string, Course>;

export default interface Database {
  tags: Record<string, string>;
  basicModules: CourseList;
  projects: CourseList;
  allCourses: CourseList;
}
