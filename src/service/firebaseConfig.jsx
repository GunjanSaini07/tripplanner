// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth"; 


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTSOXvS01j2IMbRFd3dBv3ciDT5EgFTT0",
  authDomain: "travelmate-89a86.firebaseapp.com",
  projectId: "travelmate-89a86",
  storageBucket: "travelmate-89a86.appspot.com",
  messagingSenderId: "407300320109",
  appId: "1:407300320109:web:b14ab274a5de1aede48864",
  measurementId: "G-RK65BGT1TJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const auth = getAuth(app);