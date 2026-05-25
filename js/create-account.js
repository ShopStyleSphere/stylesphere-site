/* StyleSphere Create Account System */

import {
  auth,
  db,
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "./firebase.js";

import { createWallet } from "./wallet.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

/* =========================
   Create Account
========================= */

export async function registerUser(name, email, password) {
  try {
    // 1️⃣ إنشاء حساب Firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // 2️⃣ إنشاء بيانات المستخدم في Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: name,
      email: email,
      points: 0,
      level: "Bronze",
      createdAt: serverTimestamp()
    });

    // 3️⃣ إنشاء محفظة 🔥
    await createWallet(user.uid);

    // 4️⃣ إرسال تحقق البريد
    await sendEmailVerification(user);

    return {
      ok: true,
      message: "Account created successfully. Please verify your email."
    };

  } catch (error) {
    return {
      ok: false,
      message: error.message
    };
  }
}

/* =========================
   Form Handler
========================= */

window.handleRegister = async function () {
  const name = document.getElementById("name")?.value;
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  const result = await registerUser(name, email, password);

  if (result.ok) {
    alert(result.message);
    window.location.href = "client-dashboard.html";
  } else {
    alert(result.message);
  }
};
