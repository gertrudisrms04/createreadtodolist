// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp7uaBi1iNsORzS_YCKGCFgjUJjcckWEg",
  authDomain: "to-do-list-efab6.firebaseapp.com",
  projectId: "to-do-list-efab6",
  storageBucket: "to-do-list-efab6.firebasestorage.app",
  messagingSenderId: "771846675606",
  appId: "1:771846675606:web:ef8528973b55a19fa8b6b7",
  measurementId: "G-12WBWMBQED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);