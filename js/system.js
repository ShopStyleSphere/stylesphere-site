/* StyleSphere Global System */

const SS = {
  keys: {
    user: "stylesphereUser",
    logged: "stylesphereLoggedIn",
    activity: "stylesphereActivity",
    payments: "stylespherePayments"
  },

  defaultUser() {
    return {
      id: "USR-" + Date.now(),
      name: "MOHAMMED GHALEB",
      email: "member@stylesphere.com",
      level: "Royal Infinity",
      points: 12450,
      wallet: 240,
      rewards: 8,
      profileImage: "",
      qrId: "QR-SS-2026-8842",
      nfcStatus: "Active",
      status: "Active",
      emailVerified: true,
      currency: "USD",
      createdAt: new Date().toISOString()
    };
  },

  getUser() {
    let user = JSON.parse(localStorage.getItem(this.keys.user) || "null");
    if (!user) {
      user = this.defaultUser();
      this.saveUser(user);
    }

    if (user.profileImage === undefined) user.profileImage = "";

    return user;
  },

  saveUser(user) {
    localStorage.setItem(this.keys.user, JSON.stringify(user));
  },

  updateProfileImage(imageBase64) {
    const user = this.getUser();
    user.profileImage = imageBase64;
    this.saveUser(user);
    this.renderUser();
  },

  getProfileImage() {
    return this.getUser().profileImage || "";
  },

  isLoggedIn() {
    return localStorage.getItem(this.keys.logged) === "true";
  },

  login(email, password) {
    if (!email || !password) {
      return { ok: false, message: "Enter email and password" };
    }

    const user = this.getUser();
    user.email = email;
    user.lastLogin = new Date().toISOString();

    this.saveUser(user);
    localStorage.setItem(this.keys.logged, "true");
    this.addActivity("Security", "Client login", "Verified");

    return { ok: true, user };
  },

  logout() {
    localStorage.setItem(this.keys.logged, "false");
    this.addActivity("Security", "Client logout", "Completed");
    window.location.href = "client-login.html";
  },

  verifyEmail() {
    const user = this.getUser();
    user.emailVerified = true;
    user.status = "Active";
    this.saveUser(user);
    this.addActivity("Account", "Email verified", "Active");
  },

  addPoints(amount, reason = "Points added") {
    const user = this.getUser();
    user.points = Number(user.points || 0) + Number(amount);
    user.level = this.calculateLevel(user.points);
    this.saveUser(user);
    this.addActivity("Rewards", reason, "+" + amount + " pts");
    return user;
  },

  redeemPoints(amount, rewardName = "Reward redeemed") {
    const user = this.getUser();

    if (user.points < amount) {
      return { ok: false, message: "Not enough points" };
    }

    user.points -= amount;
    user.rewards = Number(user.rewards || 0) + 1;
    user.level = this.calculateLevel(user.points);

    this.saveUser(user);
    this.addActivity("Rewards", rewardName, "-" + amount + " pts");

    return { ok: true, user };
  },

  topUpWallet(amount) {
    const user = this.getUser();
    user.wallet = Number(user.wallet || 0) + Number(amount);
    this.saveUser(user);
    this.addActivity("Wallet", "Wallet top-up", "+$" + Number(amount).toFixed(2));
    return user;
  },

  withdrawWallet(amount) {
    const user = this.getUser();

    if (user.wallet < amount) {
      return { ok: false, message: "Insufficient wallet balance" };
    }

    user.wallet -= Number(amount);
    this.saveUser(user);
    this.addActivity("Wallet", "Withdrawal request", "-$" + Number(amount).toFixed(2));

    return { ok: true, user };
  },

  sendGift(amount, recipient) {
    const user = this.getUser();

    if (user.wallet < amount) {
      return { ok: false, message: "Insufficient wallet balance" };
    }

    user.wallet -= Number(amount);
    this.saveUser(user);
    this.addActivity("Wallet", "Gift sent to " + recipient, "-$" + Number(amount).toFixed(2));

    return { ok: true, user };
  },

  requestNFC() {
    const user = this.getUser();
    user.nfcStatus = "Pending";
    this.saveUser(user);
    this.addActivity("NFC Card", "Physical NFC card requested", "Pending");
    return user;
  },

  activateNFC() {
    const user = this.getUser();
    user.nfcStatus = "Active";
    this.saveUser(user);
    this.addActivity("NFC Card", "NFC card activated", "Active");
    return user;
  },

  refreshQR() {
    const user = this.getUser();
    user.qrId = "QR-SS-" + Date.now();
    this.saveUser(user);
    this.addActivity("QR Access", "QR token refreshed", "Active");
    return user.qrId;
  },

  pay(plan, amount, method = "Card") {
    const payment = {
      id: "PAY-" + Date.now(),
      plan,
      amount,
      method,
      status: "Paid",
      date: new Date().toISOString()
    };

    const payments = JSON.parse(localStorage.getItem(this.keys.payments) || "[]");
    payments.unshift(payment);
    localStorage.setItem(this.keys.payments, JSON.stringify(payments));

    const user = this.getUser();
    user.membership = plan;
    user.status = "Active";
    user.points = Number(user.points || 0) + 500;
    user.level = this.calculateLevel(user.points);

    this.saveUser(user);
    this.addActivity("Payment", plan, "$" + Number(amount).toFixed(2));

    return payment;
  },

  calculateLevel(points) {
    points = Number(points || 0);

    if (points >= 15000) return "Imperial Infinity";
    if (points >= 10000) return "Royal Infinity";
    if (points >= 5000) return "Royal";
    if (points >= 2500) return "Elite";
    if (points >= 1000) return "Gold";
    if (points >= 300) return "Silver";
    return "Bronze";
  },

  addActivity(type, title, status) {
    const activity = JSON.parse(localStorage.getItem(this.keys.activity) || "[]");

    activity.unshift({
      id: "ACT-" + Date.now(),
      type,
      title,
      status,
      date: new Date().toISOString()
    });

    localStorage.setItem(this.keys.activity, JSON.stringify(activity.slice(0, 100)));
  },

  getActivity() {
    return JSON.parse(localStorage.getItem(this.keys.activity) || "[]");
  },

  protectPage() {
    if (!this.isLoggedIn()) {
      window.location.href = "client-login.html";
    }
  },

  formatMoney(amount) {
    const user = this.getUser();
    const currency = user.currency || "USD";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency
    }).format(Number(amount || 0));
  },

  renderUser() {
    const user = this.getUser();

    document.querySelectorAll("[data-user-name]").forEach(el => el.textContent = user.name);
    document.querySelectorAll("[data-user-email]").forEach(el => el.textContent = user.email);
    document.querySelectorAll("[data-user-level]").forEach(el => el.textContent = user.level);
    document.querySelectorAll("[data-user-points]").forEach(el => el.textContent = Number(user.points || 0).toLocaleString());
    document.querySelectorAll("[data-user-wallet]").forEach(el => el.textContent = this.formatMoney(user.wallet || 0));
    document.querySelectorAll("[data-user-rewards]").forEach(el => el.textContent = user.rewards || 0);
    document.querySelectorAll("[data-user-qr]").forEach(el => el.textContent = user.qrId);
    document.querySelectorAll("[data-user-nfc]").forEach(el => el.textContent = user.nfcStatus);

    document.querySelectorAll("[data-user-image]").forEach(el => {
      if (user.profileImage) {
        el.src = user.profileImage;
      }
    });
  }
};

window.StyleSphereSystem = SS;
window.SS = SS;

document.addEventListener("mousemove", (e) => {
  document.body.style.setProperty("--x", e.clientX + "px");
  document.body.style.setProperty("--y", e.clientY + "px");
});

document.addEventListener("DOMContentLoaded", () => {
  SS.renderUser();

  const img = document.getElementById("profileImage");
  const upload = document.getElementById("uploadImage");

  if (img && upload) {
    img.addEventListener("click", () => upload.click());

    upload.addEventListener("change", function () {
      const file = this.files[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = function (e) {
        SS.updateProfileImage(e.target.result);
      };

      reader.readAsDataURL(file);
    });
  }
});
