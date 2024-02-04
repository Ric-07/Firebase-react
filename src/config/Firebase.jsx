// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{ getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBN-fKQ-5H3RrrgStyRofY5avHG7jR4yQM",
  authDomain: "fir-pro-9d667.firebaseapp.com",
  projectId: "fir-pro-9d667",
  storageBucket: "fir-pro-9d667.appspot.com",
  messagingSenderId: "391869816351",
  appId: "1:391869816351:web:e0cc7d3ca7968b04baff2a",
  measurementId: "G-J4NPCKNRWJ"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);