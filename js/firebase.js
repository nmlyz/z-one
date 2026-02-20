import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB5rQRE7l9aHPw7Pf4OddbaMKJnspCy5yc",
  authDomain: "z-one-nmlyz.firebaseapp.com",
  projectId: "z-one-nmlyz",
  storageBucket: "z-one-nmlyz.firebasestorage.app",
  messagingSenderId: "59744487356",
  appId: "1:59744487356:web:d13f3e4762c566e4114db9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
