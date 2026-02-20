import { auth, db } from './firebase.js';
import { RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let confirmationResult;

// ステップ切り替え関数
const showStep = (id) => {
    document.querySelectorAll('.step').forEach(el => el.style.display = 'none');
    document.getElementById(id).style.display = 'block';
};

document.getElementById('btn-to-phone').onclick = () => showStep('step-phone');

// Recaptcha初期化
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { 'size': 'invisible' });

document.getElementById('btn-send-code').onclick = async () => {
    const phoneNumber = document.getElementById('phone-number').value;
    confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
    showStep('step-code');
};

document.getElementById('btn-verify-code').onclick = async () => {
    const code = document.getElementById('verification-code').value;
    const result = await confirmationResult.confirm(code);
    const user = result.user;

    // Firestoreにユーザーがいるか確認
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
        location.href = 'index.html';
    } else {
        showStep('step-name');
    }
};

document.getElementById('btn-save-profile').onclick = async () => {
    const name = document.getElementById('user-name').value;
    const user = auth.currentUser;
    await setDoc(doc(db, "users", user.uid), {
        name: name,
        balance: 0,
        uid: user.uid
    });
    location.href = 'index.html';
};
