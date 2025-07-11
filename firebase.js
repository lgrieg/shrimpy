// Import the functions you need from the SDKs you need

//import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { initializeApp } from 'firebase/app';
//import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getDatabase, ref, set, get, child } from 'firebase/database';
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

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

window.db = db;
window.ref = firebase.database().ref;
window.set = (path, value) => firebase.database().ref(path).set(value);
window.get = (path) => firebase.database().ref(path).get();
window.child = (path) => firebase.database().ref(path).child;