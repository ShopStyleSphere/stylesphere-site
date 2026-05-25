/* StyleSphere Wallet System
   Real Firebase Wallet Core
   Collection: wallets
*/

import { auth, db } from "./firebase.js";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
  onSnapshot,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/* =========================
   Helpers
========================= */

function validAmount(amount) {
  amount = Number(amount);
  return !isNaN(amount) && amount > 0;
}

function walletRef(uid) {
  return doc(db, "wallets", uid);
}

async function addWalletTransaction(uid, type, amount, note = "") {
  await addDoc(collection(db, "walletTransactions"), {
    uid,
    type,
    amount: Number(amount),
    note,
    currency: "USD",
    createdAt: serverTimestamp()
  });
}

/* =========================
   Create Wallet
========================= */

export async function createWallet(uid) {
  if (!uid) throw new Error("User ID is required");

  const ref = walletRef(uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      uid,
      balance: 0,
      currency: "USD",
      status: "active",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }

  return true;
}

/* =========================
   Get Wallet
========================= */

export async function getWallet(uid) {
  if (!uid) throw new Error("User ID is required");

  const ref = walletRef(uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await createWallet(uid);
    return {
      uid,
      balance: 0,
      currency: "USD",
      status: "active"
    };
  }

  return snap.data();
}

/* =========================
   Top Up Wallet
========================= */

export async function topUpWallet(uid, amount, note = "Wallet top up") {
  if (!uid) throw new Error("User ID is required");
  if (!validAmount(amount)) throw new Error("Invalid amount");

  await createWallet(uid);

  const ref = walletRef(uid);

  await updateDoc(ref, {
    balance: increment(Number(amount)),
    updatedAt: serverTimestamp()
  });

  await addWalletTransaction(uid, "top_up", amount, note);

  return {
    ok: true,
    message: "Wallet topped up successfully"
  };
}

/* =========================
   Deduct Wallet
========================= */

export async function deductWallet(uid, amount, note = "Wallet deduction") {
  if (!uid) throw new Error("User ID is required");
  if (!validAmount(amount)) throw new Error("Invalid amount");

  const wallet = await getWallet(uid);

  if (Number(wallet.balance || 0) < Number(amount)) {
    throw new Error("Insufficient wallet balance");
  }

  const ref = walletRef(uid);

  await updateDoc(ref, {
    balance: increment(-Number(amount)),
    updatedAt: serverTimestamp()
  });

  await addWalletTransaction(uid, "deduct", amount, note);

  return {
    ok: true,
    message: "Amount deducted successfully"
  };
}

/* =========================
   Send Gift / Transfer
========================= */

export async function transferWallet(fromUid, toUid, amount, note = "Wallet transfer") {
  if (!fromUid || !toUid) throw new Error("Sender and receiver are required");
  if (fromUid === toUid) throw new Error("Cannot transfer to same user");
  if (!validAmount(amount)) throw new Error("Invalid amount");

  await deductWallet(fromUid, amount, "Transfer sent");
  await topUpWallet(toUid, amount, "Transfer received");

  await addWalletTransaction(fromUid, "transfer_sent", amount, note);
  await addWalletTransaction(toUid, "transfer_received", amount, note);

  return {
    ok: true,
    message: "Transfer completed successfully"
  };
}

/* =========================
   Live Wallet Balance
========================= */

export function listenWallet(uid, callback) {
  if (!uid) return;

  const ref = walletRef(uid);

  return onSnapshot(ref, async (snap) => {
    if (!snap.exists()) {
      await createWallet(uid);
      callback({
        balance: 0,
        currency: "USD",
        status: "active"
      });
      return;
    }

    callback(snap.data());
  });
}

/* =========================
   Page Auto Render
========================= */

function money(value, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(Number(value || 0));
}

auth.onAuthStateChanged(async (user) => {
  if (!user) return;

  await createWallet(user.uid);

  listenWallet(user.uid, (wallet) => {
    const balance = wallet.balance || 0;
    const currency = wallet.currency || "USD";

    const mainBalance = document.getElementById("walletBalance");
    if (mainBalance) {
      mainBalance.innerText = money(balance, currency);
    }

    document.querySelectorAll("[data-wallet-balance]").forEach((el) => {
      el.innerText = money(balance, currency);
    });
  });
});

/* =========================
   Global Buttons Support
========================= */

window.StyleSphereWallet = {
  async topUp(amount) {
    const user = auth.currentUser;
    if (!user) return { ok: false, message: "Login required" };

    return await topUpWallet(user.uid, amount);
  },

  async deduct(amount) {
    const user = auth.currentUser;
    if (!user) return { ok: false, message: "Login required" };

    return await deductWallet(user.uid, amount);
  },

  async get() {
    const user = auth.currentUser;
    if (!user) return null;

    return await getWallet(user.uid);
  }
};
