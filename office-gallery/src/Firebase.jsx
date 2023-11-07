// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCq00sNLhxwJ9h5UnANAB9mqYFvrOmUONE",
  authDomain: "office-gallery-30878.firebaseapp.com",
  projectId: "office-gallery-30878",
  storageBucket: "office-gallery-30878.appspot.com",
  messagingSenderId: "1049673418131",
  appId: "1:1049673418131:web:f4032cb57af90ac7f49466",
  measurementId: "G-3CSN8FEKPR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize firebase storage
export const storage = getStorage(app);
//Authentication using google
export const provider = new GoogleAuthProvider();
//Initialize firestore
export const db = getFirestore(app);















//project-1049673418131