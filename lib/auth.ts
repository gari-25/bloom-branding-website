import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuthInstance } from "./firebase";

export const login = async (email: string, password: string) => {
  const auth = getAuthInstance();
  return signInWithEmailAndPassword(auth, email, password);
};
