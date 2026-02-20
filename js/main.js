import { db, auth } from './firebase.js';
import { collection, query, orderBy, getDocs, doc, setDoc, deleteDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const grid = document.getElementById('item-grid');

// 時間経過の計算
function timeAgo(date) {
    const seconds = Math.floor((new Date() - date.toDate()) / 1000);
    let interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + "時間前";
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + "分前";
    return "たった今";
}

async function loadItems() {
    const q = query(collection(db, "items"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    grid.innerHTML = "";
    querySnapshot.forEach((docSnap) => {
        const item = docSnap.data();
        const card = document.createElement('div');
        card.className = "item-card";
        const priceDisplay = item.type === 'normal' ? `¥${item.price}` : `単価¥${item.unitPrice}`;
        
        card.innerHTML = `
            <div onclick="location.href='item.html?id=${docSnap.id}'">
                <h3>${item.name}</h3>
                <p class="price">${priceDisplay}</p>
                <small>${timeAgo(item.createdAt)}</small>
            </div>
            <button class="like-btn" data-id="${docSnap.id}">♡</button>
        `;
        grid.appendChild(card);
    });
}

loadItems();
