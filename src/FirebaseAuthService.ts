import { app } from "./FirebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  User
} from "firebase/auth";

const auth = getAuth(app);

const registerUser = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

const loginUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = async () => {
  return await signOut(auth);
};

const sendPasswordReset = async (email: string) => {
  return await sendPasswordResetEmail(auth, email);
};

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  return await signInWithPopup(auth, provider);
};

const subscribeToAuthChanges = (handleAuthChange: (user: User | null) => void) => {
  return auth.onAuthStateChanged((user) => handleAuthChange(user));
};

const getUser = () => {
  return auth.currentUser;
};

const FirebaseAuthService = {
  registerUser,
  loginUser,
  logoutUser,
  sendPasswordReset,
  loginWithGoogle,
  subscribeToAuthChanges,
  getUser,
};

export default FirebaseAuthService;