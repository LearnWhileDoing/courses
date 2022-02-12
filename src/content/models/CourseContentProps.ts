import { MDXRemoteSerializeResult } from "next-mdx-remote";

import Certificate from "~/core/models/Certificate";
import Course from "~/core/models/Course";
import CourseIndex from "~/core/models/CourseIndex";

export default interface CourseContentProps {
  index: CourseIndex;
  certificates: Record<string, Certificate>;
  rawPage: MDXRemoteSerializeResult;
  course: Course;
}
