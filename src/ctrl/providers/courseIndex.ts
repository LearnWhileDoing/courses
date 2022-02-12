import constate from "constate";

import CourseIndex from "~/core/models/CourseIndex";

export const [CourseIndexProvider, useCourseIndex] = constate(({ index }: { index: CourseIndex }) => index);
