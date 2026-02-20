import { db, auth } from './firebase.js';
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

auth.onAuthStateChanged(user => {
    if (user) {
        // リアルタイムで残高を監視
        onSnapshot(doc(db, "users", user.uid), (doc) => {
            document.getElementById('display-balance').innerText = `¥ ${doc.data().balance.toLocaleString()}`;
        });
    } else {
        location.href = 'login.html';
    }
});
