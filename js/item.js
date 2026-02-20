import { db, auth } from './firebase.js';
import { doc, getDoc, runTransaction, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const itemId = params.get('id');

async function loadItem() {
    if (!itemId) return;
    const itemDoc = await getDoc(doc(db, "items", itemId));
    const item = itemDoc.data();
    const detail = document.getElementById('item-detail');

    const price = item.type === 'normal' ? item.price : item.unitPrice;

    detail.innerHTML = `
        <h2>${item.name}</h2>
        <p class="price">¥${price}${item.type === 'bulk' ? ' (単価)' : ''}</p>
        <p>出品者ID: ${item.sellerId}</p>
        <hr>
        <button id="buy-btn">購入する (残高決済)</button>
    `;

    document.getElementById('buy-btn').onclick = () => purchase(item, price);
}

async function purchase(item, price) {
    const user = auth.currentUser;
    if (!user) return alert("ログインが必要です");
    if (user.uid === item.sellerId) return alert("自分の商品は購入できません");

    try {
        await runTransaction(db, async (transaction) => {
            const buyerRef = doc(db, "users", user.uid);
            const sellerRef = doc(db, "users", item.sellerId);
            const itemRef = doc(db, "items", itemId);

            const buyerDoc = await transaction.get(buyerRef);
            if (buyerDoc.data().balance < price) {
                throw "残高が足りません。管理人のDMへ！";
            }

            // 手数料計算
            const fee = Math.floor(price * 0.1);
            const proceeds = price - fee;

            // 残高移動
            transaction.update(buyerRef, { balance: buyerDoc.data().balance - price });
            const sellerDoc = await transaction.get(sellerRef);
            transaction.update(sellerRef, { balance: (sellerDoc.data().balance || 0) + proceeds });

            // 商品ステータス更新
            transaction.update(itemRef, { status: 'sold', buyerId: user.uid });
        });
        alert("購入完了しました！");
        location.href = 'index.html';
    } catch (e) {
        alert(e);
    }
}
loadItem();
