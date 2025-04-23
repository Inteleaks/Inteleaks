// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCDfP5EvMuxiwJhULTRVIsBIUl_vJeswpk",
  authDomain: "osint-trac.firebaseapp.com",
  projectId: "osint-trac",
  storageBucket: "osint-trac.firebasestorage.app",
  messagingSenderId: "895443802691",
  appId: "1:895443802691:web:d0454f435a647719cfd2f6",
  measurementId: "G-NVQLE3ZDNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services you'll use
export const auth = getAuth(app);
export const db = getFirestore(app);
