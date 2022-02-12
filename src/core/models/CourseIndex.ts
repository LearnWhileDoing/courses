export interface CoursePage {
  name: string;
  description?: string;
}

export interface CourseChapter {
  name: string;
  content: Record<string, CoursePage>;
}

type CourseIndex = Record<string, CourseChapter>;

export default CourseIndex;
