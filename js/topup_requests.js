import { addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { auth, db } from "./firebase.js";

const topupBtn = document.getElementById("topupBtn");

topupBtn.addEventListener("click", async () => {
  const user = auth.currentUser;

  if (!user) {
    alert("Please login first");
    return;
  }

  try {
    await addDoc(collection(db, "topup_requests"), {
      uid: user.uid,
      amount: 100, // تقدر تغيرها لاحقًا
      currency: "USD",
      status: "pending",
      type: "top_up",
      createdAt: serverTimestamp()
    });

    alert("Top-up request sent 🚀");
  } catch (error) {
    console.error(error);
    alert("Error sending request");
  }
});
