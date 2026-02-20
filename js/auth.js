import { auth, db } from "./firebase.js";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let confirmationResult;
let mode = "";

function hideSelectButtons() {
  document.getElementById("selectButtons").style.display = "none";
}

function renderPhoneInput() {
  authArea.innerHTML = `
    <input id="phone" placeholder="+81から入力">
    <div id="recaptcha-container"></div>
    <button onclick="sendCode()">認証コードを送信</button>
  `;
  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    'recaptcha-container',
    { size: 'normal' }
  );
}

window.startRegister = () => {
  mode = "register";
  hideSelectButtons();
  renderPhoneInput();
};

window.startLogin = () => {
  mode = "login";
  hideSelectButtons();
  renderPhoneInput();
};

window.sendCode = async () => {
  confirmationResult = await signInWithPhoneNumber(
    auth,
    phone.value,
    window.recaptchaVerifier
  );

  authArea.innerHTML = `
    <input id="code" placeholder="認証コード">
    <button onclick="verifyCode()">確認</button>
  `;
};

window.verifyCode = async () => {
  await confirmationResult.confirm(code.value);

  if (mode === "login") {
    location.href = "index.html";
  }

  if (mode === "register") {
    authArea.innerHTML = `
      <input id="username" placeholder="ユーザー名を決める">
      <button onclick="finishRegister()">登録する</button>
    `;
  }
};

window.finishRegister = async () => {
  const user = auth.currentUser;

  await setDoc(doc(db, "users", user.uid), {
    name: username.value,
    balance: 0,
    rating: 5
  });

  location.href = "index.html";
};