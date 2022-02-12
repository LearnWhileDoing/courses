import toast from "~/core/util/toast";

import UserDataRepository from "~/ctrl/repositories/userData";
import FirebaseStore from "~/ctrl/store/firebase";
import UserStore from "~/ctrl/store/user";

namespace AuthService {
  export const authWithGoogle = () =>
    FirebaseStore.app.value.auth().signInWithRedirect(new FirebaseStore.firebase.value.auth.GoogleAuthProvider());

  export const signOut = () => FirebaseStore.app.value.auth().signOut();

  export const handleRedirectAuth = async () => {
    try {
      const redirectResult = await FirebaseStore.app.value.auth().getRedirectResult();
      if (redirectResult.user) {
        const { user, additionalUserInfo } = redirectResult;
        if (additionalUserInfo.isNewUser) await UserDataRepository.createUserDoc(user.uid);
      }
    } catch (e) {
      toast({
        title: "Unable to login",
        description: (e as Error).message,
        status: "warning",
        isClosable: true,
      });
    }
  };

  export const listenToAuthChanges: () => void = () =>
    FirebaseStore.app.value.auth().onAuthStateChanged(async user => UserStore.id$.next(user?.uid || null));
}

export default AuthService;
