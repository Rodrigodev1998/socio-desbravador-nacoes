import {app} from "./firebase";

import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(app);

const loginByEmailPassword = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

export { auth, loginByEmailPassword };