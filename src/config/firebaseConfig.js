import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrZ-JnkOhsxJm_cZSubrakgVy1Xn9FTyI",
  authDomain: "add-to-rides.firebaseapp.com",
  databaseURL: "https://add-to-rides-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "add-to-rides",
  storageBucket: "add-to-rides.firebasestorage.app",
  messagingSenderId: "919014659512",
  appId: "1:919014659512:web:223441cbb44079f452eb4d",
  measurementId: "G-3G9RBVRZH6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);