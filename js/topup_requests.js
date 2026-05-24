import {
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import { auth, db } from "./firebase.js";

const topupBtn = document.getElementById("topupBtn");
const amountInput = document.getElementById("amountInput");

if (topupBtn) {
  topupBtn.addEventListener("click", async () => {
    const user = auth.currentUser;

    if (!user) {
      window.location.href = "client-login.html";
      return;
    }

    const amount = Number(amountInput?.value || 0);

    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      await addDoc(collection(db, "topup_requests"), {
        uid: user.uid,
        amount: amount,
        currency: "USD",
        status: "pending",
        type: "top_up",
        source: "client_dashboard",
        createdAt: serverTimestamp()
      });

      alert("Top-up request submitted successfully.");
      if (amountInput) amountInput.value = "";

    } catch (error) {
      console.error(error);
      alert("Unable to submit top-up request.");
    }
  });
}
