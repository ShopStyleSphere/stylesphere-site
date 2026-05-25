import { auth } from "./firebase.js";

auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "client-login.html";
    return;
  }

  if (!user.emailVerified) {
    window.location.href = "verify-sent.html";
    return;
  }
});
