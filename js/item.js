import { db, auth } from "./firebase.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const params = new URLSearchParams(location.search);
const id = params.get("id");

const snap = await getDoc(doc(db, "items", id));
document.getElementById("item").innerHTML = `
<b>${snap.data().name}</b><br>
価格:${snap.data().price}
`;

window.like = async () => {
  const uid = auth.currentUser.uid;
  await setDoc(doc(db, "likes", uid + "_" + id), {
    uid,
    itemId: id
  });
  alert("いいね済");
};