import { db, auth } from './firebase.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById('sell-form');
const typeSelect = document.getElementById('sell-type');

typeSelect.onchange = () => {
    const isBulk = typeSelect.value === 'bulk';
    document.getElementById('normal-fields').style.display = isBulk ? 'none' : 'block';
    document.getElementById('bulk-fields').style.display = isBulk ? 'block' : 'none';
};

form.onsubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return alert("ログインしてください");

    const type = typeSelect.value;
    const baseData = {
        name: document.getElementById('item-name').value,
        sellerId: auth.currentUser.uid,
        type: type,
        createdAt: serverTimestamp(),
        feeRate: 0.1 // 10%
    };

    if (type === 'normal') {
        baseData.price = Number(document.getElementById('price').value);
        baseData.quantity = Number(document.getElementById('quantity').value);
    } else {
        baseData.unitPrice = Number(document.getElementById('unit-price').value);
        baseData.stock = Number(document.getElementById('stock').value);
    }

    await addDoc(collection(db, "items"), baseData);
    alert("出品しました！");
    location.href = 'index.html';
};
