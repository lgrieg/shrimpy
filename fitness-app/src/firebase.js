// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPEX9utX9Bqj3lcvZsOdJnprc3BBtXvcA",
  authDomain: "shrimpy-710e2.firebaseapp.com",
  projectId: "shrimpy-710e2",
  storageBucket: "shrimpy-710e2.firebasestorage.app",
  messagingSenderId: "896165241896",
  appId: "1:896165241896:web:ded0978006c6227958011d",
  measurementId: "G-DK6XKTJ9LT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export { db, ref, set, get, child };