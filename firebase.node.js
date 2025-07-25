// firebase.node.js
import dotenv from 'dotenv';
dotenv.config();
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child } from 'firebase/database';

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
const db = getDatabase(app);

export { db, ref, set, get, child };
