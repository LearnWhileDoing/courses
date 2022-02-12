import CourseIndex from "~/core/models/CourseIndex";

const generateSlugsFromCourseIndex = (index: CourseIndex) =>
  Object.entries(index)
    .map(([chapter, { content }]) => Object.keys(content).map(pageId => `${chapter}/${pageId}`))
    .flat();

export default generateSlugsFromCourseIndex;
