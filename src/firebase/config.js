// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, Timestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "movie-app-1657d.firebaseapp.com",
  projectId: "movie-app-1657d",
  storageBucket: "movie-app-1657d.appspot.com",
  messagingSenderId: "718319509073",
  appId: "1:718319509073:web:69b222bf79916f7b9ca270",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
