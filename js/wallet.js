import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { auth, db } from "./firebase.js";

const balanceEl = document.getElementById("walletBalance");

auth.onAuthStateChanged((user) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);

  onSnapshot(userRef, (snap) => {
    if (!snap.exists()) return;

    const data = snap.data();
    balanceEl.innerText = `$${data.wallet || 0}`;
  });
});
