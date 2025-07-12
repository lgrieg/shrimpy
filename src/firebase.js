// firebase.js — без импортов, использует глобальный объект firebase от compat
import { initializeApp } from 'firebase/app';
import { getFirebase, ref, set, get, child } from 'firebase/database';
import dotenv from 'dotenv';
dotenv.config();
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "shrimpy-710e2.firebaseapp.com",
  projectId: "shrimpy-710e2",
  databaseURL: "https://shrimpy-710e2-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "shrimpy-710e2.firebasestorage.app",
  messagingSenderId: "896165241896",
  appId: "1:896165241896:web:ded0978006c6227958011d"
};

const app = initializeApp(firebaseConfig);
const db = getFirebase(app);

window.db = db;
window.ref = (path) => db.ref(path);
window.set = (path, value) => db.ref(path).set(value);
window.get = (path) => db.ref(path).get();
window.child = (ref, subpath) => ref.child(subpath);