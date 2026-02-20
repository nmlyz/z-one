import { db } from "./firebase.js";
import { doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.charge = async () => {
  await updateDoc(doc(db, "users", uid.value), {
    balance: increment(Number(amount.value))
  });
  alert("完了");
};