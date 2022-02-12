import create from "zustand";

import UserData from "~/core/models/UserData";

const useUserData = create<UserData>(() => ({
  current: {},
  completed: {
    certificates: [],
    challenges: [],
    pages: [],
    quizzes: [],
    quizzesCorrect: [],
  },
}));

export default useUserData;
