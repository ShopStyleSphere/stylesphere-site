/* StyleSphere Global System — VIP Membership Core */

const SS = {
  keys: {
    user: "stylesphereUser",
    logged: "stylesphereLoggedIn",
    activity: "stylesphereActivity",
    payments: "stylespherePayments"
  },

  levels: [
    { level: 18, name: "Infinity Black", points: 50000 },
    { level: 17, name: "Royal Diamond", points: 40000 },
    { level: 16, name: "Imperial Elite", points: 35000 },
    { level: 15, name: "Global Legend", points: 30000 },
    { level: 14, name: "Crown Elite", points: 25000 },
    { level: 13, name: "Black VIP", points: 20000 },
    { level: 12, name: "Royal Infinity", points: 17000 },
    { level: 11, name: "Diamond Elite", points: 15000 },
    { level: 10, name: "Platinum", points: 12000 },
    { level: 9, name: "VIP", points: 10000 },
    { level: 8, name: "Elite", points: 8000 },
    { level: 7, name: "Premium", points: 6000 },
    { level: 6, name: "Gold Plus", points: 4500 },
    { level: 5, name: "Gold", points: 3000 },
    { level: 4, name: "Silver Plus", points: 2000 },
    { level: 3, name: "Silver", points: 1000 },
    { level: 2, name: "Bronze Plus", points: 500 },
    { level: 1, name: "Bronze", points: 0 }
  ],

  defaultUser() {
    return {
      id: "USR-" + Date.now(),
      name: "Your Name",
      email: "user@stylesphere.com",
      level: "Bronze",
      levelNumber: 1,
      points: 0,
      wallet: 0,
      rewards: 0,
      profileImage: "",
      qrId: "QR-SS-" + Date.now(),
      nfcStatus: "Not Requested",
      status: "Active",
      emailVerified: false,
      currency: "USD",
      membership: "Bronze",
      createdAt: new Date().toISOString()
    };
  },

  getUser() {
    let user = JSON.parse(localStorage.getItem(this.keys.user) || "null");

    if (!user) user = this.defaultUser();

    if (!user.name) user.name = "Your Name";
    if (!user.email) user.email = "user@stylesphere.com";
    if (user.profileImage === undefined) user.profileImage = "";
    if (user.points === undefined) user.points = 0;
    if (user.wallet === undefined) user.wallet = 0;
    if (user.rewards === undefined) user.rewards = 0;
    if (!user.nfcStatus) user.nfcStatus = "Not Requested";
    if (!user.status) user.status = "Active";
    if (!user.currency) user.currency = "USD";
    if (!user.qrId) user.qrId = "QR-SS-" + Date.now();

    const level = this.calculateLevel(user.points);
    user.level = level.name;
    user.levelNumber = level.level;
    user.membership = level.name;

    this.saveUser(user);
    return user;
  },

  saveUser(user) {
    localStorage.setItem(this.keys.user, JSON.stringify(user));
    return user;
  },

  updateUser(data = {}) {
    const user = this.getUser();
    Object.assign(user, data);

    const level = this.calculateLevel(user.points);
    user.level = level.name;
    user.levelNumber = level.level;
    user.membership = level.name;

    this.saveUser(user);
    this.renderUser();
    return user;
  },

  calculateLevel(points) {
    points = Number(points || 0);
    return this.levels.find(l => points >= l.points) || this.levels[this.levels.length - 1];
  },

  getNextLevel(points) {
    points = Number(points || 0);

    const current = this.calculateLevel(points);
    const levelsAsc = this.levels.slice().reverse();
    const next = levelsAsc.find(l => l.points > points);

    let progress = 100;
    let needed = 0;

    if (next) {
      const previous = current.points || 0;
      const range = next.points - previous;
      const earned = points - previous;
      progress = range > 0 ? Math.round((earned / range) * 100) : 100;
      progress = Math.max(0, Math.min(100, progress));
      needed = Math.max(0, next.points - points);
    }

    return { current, next, progress, needed };
  },

  addPoints(amount, reason = "Points added") {
    const user = this.getUser();
    amount = Number(amount || 0);

    user.points = Number(user.points || 0) + amount;

    const level = this.calculateLevel(user.points);
    user.level = level.name;
    user.levelNumber = level.level;
    user.membership = level.name;

    this.saveUser(user);
    this.addActivity("Rewards", reason, "+" + amount + " pts");
    this.renderUser();

    return user;
  },

  redeemPoints(amount, rewardName = "Reward redeemed") {
    const user = this.getUser();
    amount = Number(amount || 0);

    if (Number(user.points || 0) < amount) {
      return { ok: false, message: "Not enough points" };
    }

    user.points -= amount;
    user.rewards = Number(user.rewards || 0) + 1;

    const level = this.calculateLevel(user.points);
    user.level = level.name;
    user.levelNumber = level.level;
    user.membership = level.name;

    this.saveUser(user);
    this.addActivity("Rewards", rewardName, "-" + amount + " pts");
    this.renderUser();

    return { ok: true, user };
  },


  requestNFC() {
    const user = this.getUser();
    user.nfcStatus = "Pending";

    this.saveUser(user);
    this.addActivity("NFC Card", "Physical NFC card requested", "Pending");
    this.renderUser();

    return user;
  },

  activateNFC() {
    const user = this.getUser();
    user.nfcStatus = "Active";

    this.saveUser(user);
    this.addActivity("NFC Card", "NFC card activated", "Active");
    this.renderUser();

    return user;
  },

  refreshQR() {
    const user = this.getUser();
    user.qrId = "QR-SS-" + Date.now();

    this.saveUser(user);
    this.addActivity("QR Access", "QR token refreshed", "Active");
    this.renderUser();

    return user.qrId;
  },

  pay(plan, amount, method = "Card") {
    amount = Number(amount || 0);

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
    user.status = "Active";
    user.points = Number(user.points || 0) + 500;

    const level = this.calculateLevel(user.points);
    user.level = level.name;
    user.levelNumber = level.level;
    user.membership = level.name;

    this.saveUser(user);
    this.addActivity("Payment", plan, "$" + amount.toFixed(2));
    this.renderUser();

    return payment;
  },

  updateProfileImage(imageBase64) {
    const user = this.getUser();
    user.profileImage = imageBase64;
    this.saveUser(user);
    this.renderUser();
  },

  removeProfileImage() {
    const user = this.getUser();
    user.profileImage = "";
    this.saveUser(user);

    document.querySelectorAll("[data-user-image]").forEach(img => {
      img.src = "https://via.placeholder.com/120";
    });

    this.renderUser();
  },

  handleImageUpload() {
    const upload = document.getElementById("uploadImage");
    const removeBtn = document.getElementById("removeImage");

    if (upload && upload.dataset.ready !== "true") {
      upload.dataset.ready = "true";

      upload.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = e => {
          SS.updateProfileImage(e.target.result);
          window.StyleSphereUI?.toast?.("Profile photo updated");
        };

        reader.readAsDataURL(file);
      });
    }

    if (removeBtn && removeBtn.dataset.ready !== "true") {
      removeBtn.dataset.ready = "true";

      removeBtn.addEventListener("click", () => {
        SS.removeProfileImage();
        window.StyleSphereUI?.toast?.("Profile photo removed");
      });
    }
  },

  login(email, password, name = "") {
    if (!email || !password) {
      return { ok: false, message: "Enter email and password" };
    }

    const user = this.getUser();
    user.email = email;
    if (name) user.name = name;
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

  isLoggedIn() {
    return localStorage.getItem(this.keys.logged) === "true";
  },

  protectPage() {
    if (!this.isLoggedIn()) {
      window.location.href = "client-login.html";
    }
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

  getPayments() {
    return JSON.parse(localStorage.getItem(this.keys.payments) || "[]");
  },

  formatMoney(amount) {
    const user = this.getUser();

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: user.currency || "USD"
    }).format(Number(amount || 0));
  },

  renderUser() {
    const user = this.getUser();
    const levelData = this.getNextLevel(user.points);

    document.querySelectorAll("[data-user-name]").forEach(el => el.textContent = user.name);
    document.querySelectorAll("[data-user-email]").forEach(el => el.textContent = user.email);
    document.querySelectorAll("[data-user-level]").forEach(el => el.textContent = user.level);
    document.querySelectorAll("[data-user-level-number]").forEach(el => el.textContent = user.levelNumber);
    document.querySelectorAll("[data-user-points]").forEach(el => el.textContent = Number(user.points || 0).toLocaleString());
    document.querySelectorAll("[data-user-wallet]").forEach(el => el.textContent = this.formatMoney(user.wallet || 0));
    document.querySelectorAll("[data-user-rewards]").forEach(el => el.textContent = user.rewards || 0);
    document.querySelectorAll("[data-user-qr]").forEach(el => el.textContent = user.qrId);
    document.querySelectorAll("[data-user-nfc]").forEach(el => el.textContent = user.nfcStatus);
    document.querySelectorAll("[data-user-status]").forEach(el => el.textContent = user.status);
    document.querySelectorAll("[data-user-membership]").forEach(el => el.textContent = user.membership);

    document.querySelectorAll("[data-next-level]").forEach(el => {
      el.textContent = levelData.next ? levelData.next.name : "Max Level";
    });

    document.querySelectorAll("[data-progress]").forEach(el => {
      el.textContent = levelData.progress + "%";
    });

    document.querySelectorAll("[data-progress-bar]").forEach(el => {
      el.style.width = levelData.progress + "%";
    });

    document.querySelectorAll("[data-needed-points]").forEach(el => {
      el.textContent = levelData.needed.toLocaleString();
    });

    document.querySelectorAll("[data-user-image]").forEach(img => {
      img.src = user.profileImage || "https://via.placeholder.com/120";
    });
  }
};

window.SS = SS;
window.StyleSphereSystem = SS;

document.addEventListener("mousemove", e => {
  document.body.style.setProperty("--x", e.clientX + "px");
  document.body.style.setProperty("--y", e.clientY + "px");
});

document.addEventListener("DOMContentLoaded", () => {
  SS.renderUser();
  SS.handleImageUpload();
});
