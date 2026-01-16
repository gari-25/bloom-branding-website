import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Lazily initialize Firebase Auth on the client only to avoid server-side initialization
export function getAuthInstance() {
  if (typeof window === "undefined") {
    throw new Error("Firebase Auth can only be used in the browser");
  }

  const app = !getApps().length ? initializeApp(firebaseConfig as any) : getApp();
  return getAuth(app);
}

// Initialize Firestore and Storage
const app = !getApps().length ? initializeApp(firebaseConfig as any) : getApp();
export const db = getFirestore(app);
export const storage = getStorage(app);
