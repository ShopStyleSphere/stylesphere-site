import { doc, onSnapshot, updateDoc, increment, serverTimestamp } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import { auth, db } from "./firebase.js";

const balanceEl = document.getElementById("walletBalance");

function money(v) {
  return "$" + Number(v || 0).toFixed(2);
}

auth.onAuthStateChanged((user) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);

  onSnapshot(userRef, (snap) => {
    if (!snap.exists()) return;

    const data = snap.data();
    if (balanceEl) {
      balanceEl.innerText = money(data.wallet || 0);
    }

    document.querySelectorAll("[data-wallet-balance]").forEach((el) => {
      el.innerText = money(data.wallet || 0);
    });
  });
});

window.StyleSphereWallet = {
  async topUp(amount) {
    const user = auth.currentUser;
    if (!user) return { ok: false, message: "Login required" };

    amount = Number(amount || 0);
    if (amount <= 0) return { ok: false, message: "Invalid amount" };

    const userRef = doc(db, "users", user.uid);

    await updateDoc(userRef, {
      wallet: increment(amount),
      updatedAt: serverTimestamp()
    });

    return { ok: true, message: "Wallet topped up" };
  },

  async withdraw(amount) {
    const user = auth.currentUser;
    if (!user) return { ok: false, message: "Login required" };

    amount = Number(amount || 0);
    if (amount <= 0) return { ok: false, message: "Invalid amount" };

    const userRef = doc(db, "users", user.uid);

    await updateDoc(userRef, {
      wallet: increment(-amount),
      updatedAt: serverTimestamp()
    });

    return { ok: true, message: "Withdrawal requested" };
  },

  async sendGift(amount, recipient = "Guest") {
    const user = auth.currentUser;
    if (!user) return { ok: false, message: "Login required" };

    amount = Number(amount || 0);
    if (amount <= 0) return { ok: false, message: "Invalid amount" };

    const userRef = doc(db, "users", user.uid);

    await updateDoc(userRef, {
      wallet: increment(-amount),
      updatedAt: serverTimestamp()
    });

    return { ok: true, message: "Gift sent to " + recipient };
  }
};
