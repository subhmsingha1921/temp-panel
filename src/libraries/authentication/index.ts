import { signInWithEmailAndPassword, signOut, User } from "firebase/auth";

import { auth } from "../firebase";

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return "success";
  } catch (err: any) {
    console.error(err);
    alert(err.message);
    return "failed";
  }
};

export const logoutFromFirebase = async (user: User) => {
  if (!user) {
    return;
  }
  try {
    await signOut(auth);
    return "success";
  } catch (err: any) {
    console.log(err);
    alert(err.message);
    return "failed";
  }
};
