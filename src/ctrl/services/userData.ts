import UserDataRepository from "~/ctrl/repositories/userData";
import useUserData from "~/ctrl/store/userData";
import PageProgress from "~/ctrl/util/PageProgress";

class UserDataService {
  private static _instance: UserDataService;

  static get I() {
    if (!this._instance) this._instance = new UserDataService();
    return this._instance;
  }

  startCourse = async (courseId: string) => {
    await UserDataRepository.I.db.put("current", {}, courseId);
    useUserData.setState(
      state => ({
        ...state,
        current: {
          ...state.current,
          [courseId]: {},
        },
      }),
      true
    );
  };

  updatePage = async (courseId: string, slug: string, progress: PageProgress) => {
    const tx_current = UserDataRepository.I.db.transaction("current", "readwrite");
    const courseProgress = await tx_current.store.get(courseId);
    await tx_current.store.put(
      {
        ...courseProgress,
        [slug]: progress,
      },
      courseId
    );
    await tx_current.done;

    const tx_completed = UserDataRepository.I.db.transaction("completed", "readwrite");
    let completedPages = await tx_completed.store.get("pages");
    completedPages = [...completedPages, progress === PageProgress.COMPLETE && `${courseId}/${slug}`].filter(
      (value: any, index: number, arr: any[]) => arr.indexOf(value) === index && !!value
    );
    await tx_completed.store.put(completedPages, "pages");
    await tx_completed.done;

    useUserData.setState(
      state => ({
        ...state,
        current: {
          ...state.current,
          [courseId]: {
            ...state.current[courseId],
            [slug]: progress,
          },
        },
        completed: {
          ...state.completed,
          pages: completedPages,
        },
      }),
      true
    );
  };

  completeQuiz = async (courseId: string, slug: string, correct: boolean) => {
    const tx_completed = UserDataRepository.I.db.transaction("completed", "readwrite");
    let completedQuizzes = await tx_completed.store.get("quizzes");

    if (!completedQuizzes.includes(`${courseId}/${slug}`)) {
      completedQuizzes = [...completedQuizzes, `${courseId}/${slug}`].filter(
        (value: any, index: number, arr: any[]) => arr.indexOf(value) === index
      );
      await tx_completed.store.put(completedQuizzes, "quizzes");

      let completedQuizzesCorrect = await tx_completed.store.get("quizzesCorrect");
      completedQuizzesCorrect = [...completedQuizzesCorrect, correct && `${courseId}/${slug}`].filter(
        (value: any, index: number, arr: any[]) => arr.indexOf(value) === index && !!value
      );
      await tx_completed.store.put(completedQuizzesCorrect, "quizzes");

      await tx_completed.done;

      useUserData.setState(
        state => ({
          ...state,
          completed: {
            ...state.completed,
            quizzes: completedQuizzes,
            quizzesCorrect: completedQuizzesCorrect,
          },
        }),
        true
      );
    } else await tx_completed.done;
  };

  async completeChallenge(courseId: string, slug: string) {
    const tx_completed = UserDataRepository.I.db.transaction("completed", "readwrite");
    let completedChallenges = await tx_completed.store.get("challenges");

    if (!completedChallenges.includes(`${courseId}/${slug}`)) {
      completedChallenges = [...completedChallenges, `${courseId}/${slug}`].filter(
        (value: any, index: number, arr: any[]) => arr.indexOf(value) === index
      );
      await tx_completed.store.put(completedChallenges, "challenges");
    }

    await tx_completed.done;

    useUserData.setState(
      state => ({
        ...state,
        completed: {
          ...state.completed,
          challenges: completedChallenges,
        },
      }),
      true
    );
  }

  async earnCertificate(courseId: string, slug: string) {
    const tx_completed = UserDataRepository.I.db.transaction("completed", "readwrite");
    let completedCertificates = await tx_completed.store.get("certificates");

    if (!completedCertificates.includes(`${courseId}/${slug}`)) {
      completedCertificates = [...completedCertificates, `${courseId}/${slug}`];
      await tx_completed.store.put(completedCertificates, "certificates");

      await tx_completed.done;

      useUserData.setState(
        state => ({
          ...state,
          completed: {
            ...state.completed,
            certificates: completedCertificates,
          },
        }),
        true
      );
    } else await tx_completed.done;

    return !completedCertificates.includes(`${courseId}/${slug}`);
  }
}

export default UserDataService;
