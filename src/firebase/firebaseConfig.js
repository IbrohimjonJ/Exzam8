import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9wm5e7Q1Z7WynszFk0BgMtKxHo06uYfI",
  authDomain: "exzam21.firebaseapp.com",
  projectId: "exzam21",
  storageBucket: "exzam21.appspot.com",
  messagingSenderId: "524407853913",
  appId: "1:524407853913:web:e74fef8ed558b0b360b248",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
