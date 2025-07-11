// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPEX9utX9Bqj3lcvZsOdJnprc3BBtXvcA",
  authDomain: "shrimpy-710e2.firebaseapp.com",
  projectId: "shrimpy-710e2",
  databaseURL: "https://shrimpy-710e2-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "shrimpy-710e2.firebasestorage.app",
  messagingSenderId: "896165241896",
  appId: "1:896165241896:web:ded0978006c6227958011d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.db = db;
window.ref = ref;
window.set = set;
window.get = get;
window.child = child;