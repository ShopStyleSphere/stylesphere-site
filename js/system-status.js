import { db } from "./firebase.js";
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const systemStatus = document.getElementById("systemStatus");

const systemRef = doc(db, "system", "status");

onSnapshot(systemRef, (snap) => {
  if (!systemStatus) return;

  if (!snap.exists()) {
    systemStatus.innerHTML = "🔴 SYSTEM OFFLINE";
    return;
  }

  const state = snap.data().state || "offline";

  if (state === "online") {
    systemStatus.innerHTML = "🟢 SYSTEM ONLINE";
    systemStatus.className = "status online";
  } else if (state === "issue") {
    systemStatus.innerHTML = "🟡 SYSTEM ISSUE";
    systemStatus.className = "status issue";
  } else {
    systemStatus.innerHTML = "🔴 SYSTEM OFFLINE";
    systemStatus.className = "status offline";
  }
});
