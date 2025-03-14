// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPl7cgv8yPUouFGCnsakFJKjd4ZhnbSLY",
  authDomain: "badulake-711f1.firebaseapp.com",
  projectId: "badulake-711f1",
  storageBucket: "badulake-711f1.firebasestorage.app",
  messagingSenderId: "738882709471",
  appId: "1:738882709471:web:a529784bef1d467dc1c66a",
  measurementId: "G-98LZDCQYKB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);