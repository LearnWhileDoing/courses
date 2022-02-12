import create from "zustand";

import Course from "~/core/models/Course";
import UserData from "~/core/models/UserData";

const useCourseData = create<Course | undefined>(() => undefined);

export default useCourseData;
