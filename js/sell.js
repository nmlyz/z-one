import { db, auth } from "./firebase.js";
import {
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.postItem = async () => {
  const user = auth.currentUser;
  
  if (bulk.checked) {
    await addDoc(collection(db, "items"), {
      seller: user.uid,
      name: bulkName.value,
      price: Number(unitPrice.value),
      quantity: Number(stock.value),
      bulk: true,
      createdAt: serverTimestamp()
    });
  } else {
    await addDoc(collection(db, "items"), {
      seller: user.uid,
      name: name.value,
      price: Number(price.value),
      quantity: Number(quantity.value),
      bulk: false,
      createdAt: serverTimestamp()
    });
  }
  
  alert("出品完了");
  location.href = "index.html";
};