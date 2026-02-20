import { auth, db } from './firebase.js';
import { RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const showStep = (id) => {
    console.log("Showing step:", id); // ログで確認
    document.querySelectorAll('.step').forEach(el => el.style.display = 'none');
    const target = document.getElementById(id);
    if(target) target.style.display = 'block';
};

// 初期化を確実に行う
window.addEventListener('DOMContentLoaded', () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible'
    });

    document.getElementById('btn-to-phone').onclick = () => showStep('step-phone');

    document.getElementById('btn-send-code').onclick = async () => {
        const phone = document.getElementById('phone-number').value;
        if(!phone.startsWith('+')) return alert("電話番号は+81から入力してください");
        
        try {
            window.confirmationResult = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
            showStep('step-code');
        } catch (error) {
            console.error(error);
            alert("SMS送信に失敗しました: " + error.message);
        }
    };
});
