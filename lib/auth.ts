import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// SIGN UP
export const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// LOGIN
export const logIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// LOGOUT
export const logOut = () => {
  return signOut(auth);
};