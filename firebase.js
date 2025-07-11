// firebase.js — без импортов, использует глобальный объект firebase от compat

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
window.ref = (path) => db.ref(path);
window.set = (path, value) => db.ref(path).set(value);
window.get = (path) => db.ref(path).get();
window.child = (ref, subpath) => ref.child(subpath);
