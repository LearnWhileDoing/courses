import { MDXRemoteSerializeResult } from "next-mdx-remote";

import Course from "~/core/models/Course";
import CourseIndex from "~/core/models/CourseIndex";

export default interface CourseInfoProps {
  rawPage: MDXRemoteSerializeResult;
  index: CourseIndex;
  course: Course;
}
