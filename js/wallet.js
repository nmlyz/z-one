import { db, auth } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

auth.onAuthStateChanged(async user => {
  const snap = await getDoc(doc(db, "users", user.uid));
  document.getElementById("balance").innerText = snap.data().balance;
});