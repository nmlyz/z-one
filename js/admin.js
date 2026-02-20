import { db, auth } from './firebase.js';
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const ADMIN_UID = "ここにあなたのUIDを入れる"; 

document.getElementById('update-btn').onclick = async () => {
    if (auth.currentUser.uid !== ADMIN_UID) return alert("権限がありません");

    const uid = document.getElementById('target-uid').value;
    const amount = Number(document.getElementById('add-amount').value);

    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        const newBalance = (userDoc.data().balance || 0) + amount;
        await updateDoc(userRef, { balance: newBalance });
        alert("更新完了！現在の残高: " + newBalance);
    } else {
        alert("ユーザーが見つかりません");
    }
};
