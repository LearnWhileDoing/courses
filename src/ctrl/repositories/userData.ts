import { IDBPDatabase, openDB } from "idb";

import DBSchema from "~/core/models/DBSchema";

import useUserData from "~/ctrl/store/userData";

class UserDataRepository {
  private static _instance: UserDataRepository;

  static get I() {
    if (!this._instance) this._instance = new UserDataRepository();
    return this._instance;
  }

  db: IDBPDatabase<DBSchema>;

  private _dbReadyResolve;
  dbReady = new Promise(resolve => {
    this._dbReadyResolve = resolve;
  });

  async init() {
    this.db = await openDB<DBSchema>("LWD-Courses", 1, {
      upgrade(db) {
        db.createObjectStore("current");
        db.createObjectStore("completed");
      },
    });

    const tx_completed = this.db.transaction("completed", "readwrite");

    const certificates = await tx_completed.store.get("certificates");
    if (!certificates) await tx_completed.store.put([], "certificates");

    const challenges = await tx_completed.store.get("challenges");
    if (!challenges) await tx_completed.store.put([], "challenges");

    const pages = await tx_completed.store.get("pages");
    if (!pages) await tx_completed.store.put([], "pages");

    const quizzes = await tx_completed.store.get("quizzes");
    if (!quizzes) await tx_completed.store.put([], "quizzes");

    const quizzesCorrect = await tx_completed.store.get("quizzesCorrect");
    if (!quizzesCorrect) await tx_completed.store.put([], "quizzesCorrect");

    await tx_completed.done;

    const current = {};
    const currentKeys = await this.db.getAllKeys("current");
    const currentVals = await this.db.getAll("current");
    for (const i in currentKeys) {
      current[currentKeys[i]] = currentVals[i];
    }

    useUserData.setState(
      {
        current,
        completed: {
          certificates,
          challenges,
          pages,
          quizzes,
          quizzesCorrect,
        },
      },
      true
    );

    this._dbReadyResolve();
  }
}

export default UserDataRepository;
