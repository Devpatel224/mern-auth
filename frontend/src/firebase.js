// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-1bab0.firebaseapp.com",
  projectId: "mern-auth-1bab0",
  storageBucket: "mern-auth-1bab0.firebasestorage.app",
  messagingSenderId: "1047739964034",
  appId: "1:1047739964034:web:e7721cfd466f63dc31f29b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);