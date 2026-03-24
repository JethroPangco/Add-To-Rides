import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCrZ-JnkOhsxJm_cZSubrakgVy1Xn9FTyI",
  authDomain: "add-to-rides.firebaseapp.com",
  projectId: "add-to-rides",
  storageBucket: "add-to-rides.firebasestorage.app",
  messagingSenderId: "919014659512",
  appId: "1:919014659512:web:223441cbb44079f452eb4d",
  measurementId: "G-3G9RBVRZH6"
};

export const app = initializeApp(firebaseConfig);