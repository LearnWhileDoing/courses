import PageProgress from "~/ctrl/util/PageProgress";

export default interface UserData {
  current: { [k: string]: Record<string, PageProgress> };
  completed: {
    certificates: string[];
    challenges: string[];
    pages: string[];
    quizzes: string[];
    quizzesCorrect: string[];
  };
}
