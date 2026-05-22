/* StyleSphere Global Sidebar */

(function () {
  const currentPage = window.location.pathname.split("/").pop();

  const menu = [
    ["client-dashboard.html", "fa-gauge", "Dashboard"],
    ["wallet.html", "fa-wallet", "Wallet"],
    ["rewards.html", "fa-gift", "Rewards"],
    ["qr-access.html", "fa-qrcode", "QR Access"],
    ["nfc-card.html", "fa-credit-card", "NFC Card"],
    ["activity.html", "fa-clock-rotate-left", "Activity"],
    ["membership.html", "fa-crown", "Membership"],
    ["vip-levels.html", "fa-ranking-star", "VIP Levels"],
    ["notifications.html", "fa-bell", "Notifications"],
    ["settings.html", "fa-gear", "Settings"],
    ["support.html", "fa-headset", "Support"],
    ["profile.html", "fa-user", "Profile"],
    ["checkout.html", "fa-cart-shopping", "Checkout"],
    ["client-login.html", "fa-right-from-bracket", "Logout"]
  ];

  function getUser() {
    try {
      return JSON.parse(localStorage.getItem("stylesphereUser")) || {};
    } catch {
      return {};
    }
  }

  function saveUser(user) {
    localStorage.setItem("stylesphereUser", JSON.stringify(user));
  }

  function renderImage() {
    const user = getUser();
    const box = document.getElementById("avatarBox");

    if (!box) return;

    if (user.profileImage) {
      box.innerHTML = `<img data-user-image src="${user.profileImage}" alt="Profile">`;
    } else {
      box.innerHTML = `<i class="fa-solid fa-user-tie"></i>`;
    }

    if (window.SS) SS.renderUser();
  }

  function bindImageUpload() {
    const input = document.getElementById("uploadImage");
    const remove = document.getElementById("removeImage");

    if (input) {
      input.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {
          const user = getUser();
          user.profileImage = e.target.result;
          saveUser(user);
          renderImage();
        };

        reader.readAsDataURL(file);
      });
    }

    if (remove) {
      remove.addEventListener("click", function () {
        const user = getUser();
        user.profileImage = "";
        saveUser(user);
        renderImage();
      });
    }
  }

  function createSidebar() {
    const sidebar = document.querySelector(".sidebar");
    if (!sidebar) return;

    sidebar.innerHTML = `
      <div class="profile">

        <label class="avatar upload-avatar" for="uploadImage" id="avatarBox">
          <i class="fa-solid fa-user-tie"></i>
        </label>

        <input type="file" id="uploadImage" accept="image/*" hidden>

        <h3 data-user-name>Your Name</h3>
        <p><span data-user-level>Bronze</span> Member</p>

        <div class="profile-actions">
          <button type="button" onclick="document.getElementById('uploadImage').click()">Change</button>
          <button type="button" id="removeImage">Remove</button>
        </div>
      </div>

      <nav class="nav">
        ${menu.map(item => {
          const active = item[0] === currentPage ? "active" : "";
          return `
            <a class="${active}" href="${item[0]}">
              <i class="fa-solid ${item[1]}"></i>
              ${item[2]}
            </a>
          `;
        }).join("")}
      </nav>
    `;

    renderImage();
    bindImageUpload();
  }

  document.addEventListener("DOMContentLoaded", function () {
    createSidebar();

    if (window.SS) {
      SS.renderUser();
    }
  });
})();
