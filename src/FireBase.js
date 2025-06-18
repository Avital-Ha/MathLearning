// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqFtzPVtSrrfrZf1FzV-IEUhzG3tYEeUA",
  authDomain: "math-learning-97bc1.firebaseapp.com",
projectId: "math-learning-97bc1",
  storageBucket: "math-learning-97bc1.appspot.com",
  messagingSenderId: "151822558447",
  appId: "1:151822558447:web:8ab36a31c83062e245e71a",
  measurementId: "G-SPJVC62M41"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
