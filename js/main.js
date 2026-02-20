import { db } from "./firebase.js";
import { collection, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const q = query(collection(db, "items"), orderBy("createdAt", "desc"));
const snap = await getDocs(q);

snap.forEach(docSnap => {
  const d = docSnap.data();
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <b>${d.name}</b><br>
    ${d.price}円<br>
    <span class="like">♥</span>
    <a href="item.html?id=${docSnap.id}">詳細</a>
  `;
  items.appendChild(div);
});