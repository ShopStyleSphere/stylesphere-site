import { auth } from "./firebase.js";

auth.onAuthStateChanged((user) => {
  // ❌ Not logged in
  if (!user) {
    window.location.href = "client-login.html";
    return;
  }

  // ❌ Email not verified (only protect private pages)
  const publicPages = [
    "verify-sent.html",
    "client-login.html",
    "register.html"
  ];

  const currentPage = window.location.pathname.split("/").pop();

  if (!user.emailVerified && !publicPages.includes(currentPage)) {
    window.location.href = "verify-sent.html";
    return;
  }

  // ✅ Access granted
});
