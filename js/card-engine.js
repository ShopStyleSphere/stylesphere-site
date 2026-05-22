/* StyleSphere Card Engine — Global Bank Card System */

(function () {
  const levelThemes = {
    18: { name: "Infinity Black", gradient: "linear-gradient(135deg,#020202,#101010,#d4af37)", glow: "rgba(255,215,0,.75)" },
    17: { name: "Royal Diamond", gradient: "linear-gradient(135deg,#050505,#222,#cfd6df)", glow: "rgba(220,235,255,.65)" },
    16: { name: "Imperial Elite", gradient: "linear-gradient(135deg,#090014,#2b0050,#d4af37)", glow: "rgba(178,90,255,.65)" },
    15: { name: "Global Legend", gradient: "linear-gradient(135deg,#02050c,#061b3a,#d4af37)", glow: "rgba(80,150,255,.65)" },
    14: { name: "Crown Elite", gradient: "linear-gradient(135deg,#1b1200,#7a5a00,#ffd86b)", glow: "rgba(255,215,0,.70)" },
    13: { name: "Black VIP", gradient: "linear-gradient(135deg,#000,#111,#333)", glow: "rgba(255,255,255,.45)" },
    12: { name: "Royal Infinity", gradient: "linear-gradient(135deg,#050505,#152218,#d6bd54)", glow: "rgba(255,215,0,.65)" },
    11: { name: "Diamond Elite", gradient: "linear-gradient(135deg,#111,#555,#f2f2f2)", glow: "rgba(240,240,240,.60)" },
    10: { name: "Platinum", gradient: "linear-gradient(135deg,#0e1114,#59636d,#d8e0e8)", glow: "rgba(210,225,240,.55)" },
    9: { name: "VIP", gradient: "linear-gradient(135deg,#02040a,#071d4d,#d4af37)", glow: "rgba(60,120,255,.55)" },
    8: { name: "Elite", gradient: "linear-gradient(135deg,#001a0b,#075c28,#d4af37)", glow: "rgba(0,255,120,.55)" },
    7: { name: "Premium", gradient: "linear-gradient(135deg,#001c1d,#087a7d,#d4af37)", glow: "rgba(0,230,255,.50)" },
    6: { name: "Gold Plus", gradient: "linear-gradient(135deg,#191000,#8d6900,#ffd86b)", glow: "rgba(255,215,0,.58)" },
    5: { name: "Gold", gradient: "linear-gradient(135deg,#130d00,#6d5000,#d4af37)", glow: "rgba(255,215,0,.50)" },
    4: { name: "Silver Plus", gradient: "linear-gradient(135deg,#111,#777,#d8d8d8)", glow: "rgba(210,210,210,.45)" },
    3: { name: "Silver", gradient: "linear-gradient(135deg,#111,#555,#aaa)", glow: "rgba(180,180,180,.42)" },
    2: { name: "Bronze Plus", gradient: "linear-gradient(135deg,#160900,#6b3519,#c88446)", glow: "rgba(205,127,50,.45)" },
    1: { name: "Bronze", gradient: "linear-gradient(135deg,#120700,#4a2410,#8b4513)", glow: "rgba(205,127,50,.35)" }
  };

  function getUser() {
    if (window.SS && typeof SS.getUser === "function") return SS.getUser();
    return {
      name: "Guest User",
      level: "Bronze",
      levelNumber: 1,
      points: 0,
      nfcStatus: "Not Requested"
    };
  }

  function getTheme(levelNumber) {
    return levelThemes[levelNumber] || levelThemes[1];
  }

  function injectStyles() {
    if (document.getElementById("ss-card-engine-style")) return;

    const style = document.createElement("style");
    style.id = "ss-card-engine-style";
    style.innerHTML = `
      .member-card,
      .wallet-card,
      .bank-card,
      .nfc-card,
      [data-vip-card]{
        position:relative;
        overflow:hidden;
        transform-style:preserve-3d;
        will-change:transform, box-shadow, background;
        transition:transform .16s ease, box-shadow .25s ease, filter .25s ease;
      }

      .member-card::before,
      .wallet-card::before,
      .bank-card::before,
      .nfc-card::before,
      [data-vip-card]::before{
        content:"";
        position:absolute;
        inset:0;
        background:
          radial-gradient(circle at var(--card-x,50%) var(--card-y,50%),
          rgba(255,255,255,.45),
          rgba(255,215,0,.18) 18%,
          transparent 42%);
        opacity:.75;
        mix-blend-mode:screen;
        pointer-events:none;
        z-index:5;
      }

      .member-card::after,
      .wallet-card::after,
      .bank-card::after,
      .nfc-card::after,
      [data-vip-card]::after{
        content:"";
        position:absolute;
        inset:-70%;
        background:linear-gradient(120deg,
          transparent 35%,
          rgba(255,255,255,.35) 50%,
          transparent 65%);
        transform:translateX(-40%) rotate(18deg);
        animation:ssCardSweep 4s linear infinite;
        pointer-events:none;
        z-index:6;
      }

      @keyframes ssCardSweep{
        from{transform:translateX(-45%) rotate(18deg)}
        to{transform:translateX(45%) rotate(18deg)}
      }

      .nfc-chip,
      .card-chip,
      [data-card-chip]{
        position:relative;
        animation:ssChipPulse 1.8s infinite ease-in-out;
      }

      @keyframes ssChipPulse{
        0%,100%{filter:brightness(1);box-shadow:0 0 18px rgba(255,215,0,.45)}
        50%{filter:brightness(1.35);box-shadow:0 0 38px rgba(255,215,0,.95)}
      }

      .card-level,
      [data-card-level]{
        text-transform:uppercase;
      }

      .ss-level-badge{
        display:inline-flex;
        align-items:center;
        gap:8px;
        padding:8px 12px;
        border-radius:999px;
        border:1px solid rgba(255,215,0,.5);
        background:rgba(0,0,0,.35);
        color:#fff;
        font-weight:900;
        letter-spacing:.8px;
        box-shadow:0 0 20px rgba(255,215,0,.28);
      }

      .ss-nfc-waves{
        position:absolute;
        right:22px;
        top:22px;
        display:flex;
        gap:4px;
        z-index:8;
        pointer-events:none;
      }

      .ss-nfc-waves span{
        width:5px;
        border-radius:10px;
        background:#00ff9d;
        box-shadow:0 0 15px #00ff9d;
        animation:ssWave 1s infinite ease-in-out;
      }

      .ss-nfc-waves span:nth-child(1){height:10px;animation-delay:.05s}
      .ss-nfc-waves span:nth-child(2){height:16px;animation-delay:.15s}
      .ss-nfc-waves span:nth-child(3){height:22px;animation-delay:.25s}
      .ss-nfc-waves span:nth-child(4){height:28px;animation-delay:.35s}

      @keyframes ssWave{
        0%,100%{opacity:.35;transform:scaleY(.65)}
        50%{opacity:1;transform:scaleY(1.05)}
      }
    `;
    document.head.appendChild(style);
  }

  function applyTheme(card, user) {
    const theme = getTheme(user.levelNumber);

    card.style.background = theme.gradient;
    card.style.boxShadow = `0 0 55px ${theme.glow}, 0 35px 90px rgba(0,0,0,.55)`;
    card.style.borderColor = theme.glow;

    card.querySelectorAll("[data-card-level]").forEach(el => {
      el.textContent = user.level || theme.name;
    });

    card.querySelectorAll("[data-card-level-number]").forEach(el => {
      el.textContent = user.levelNumber || 1;
    });

    card.querySelectorAll("[data-card-name]").forEach(el => {
      el.textContent = user.name || "Guest User";
    });

    card.querySelectorAll("[data-card-points]").forEach(el => {
      el.textContent = Number(user.points || 0).toLocaleString();
    });

    card.querySelectorAll("[data-card-nfc]").forEach(el => {
      el.textContent = user.nfcStatus || "Not Requested";
    });
  }

  function ensureNfcWaves(card) {
    if (card.querySelector(".ss-nfc-waves")) return;

    const waves = document.createElement("div");
    waves.className = "ss-nfc-waves";
    waves.innerHTML = "<span></span><span></span><span></span><span></span>";
    card.appendChild(waves);
  }

  function bind3D(card) {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = -((y / rect.height) - 0.5) * 18;
      const rotateY = ((x / rect.width) - 0.5) * 18;

      card.style.setProperty("--card-x", x + "px");
      card.style.setProperty("--card-y", y + "px");

      card.style.transform = `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.025)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
  }

  function renderCards() {
    injectStyles();

    const user = getUser();
    const cards = document.querySelectorAll(
      ".member-card, .wallet-card, .bank-card, .nfc-card, [data-vip-card]"
    );

    cards.forEach(card => {
      if (card.dataset.cardEngineReady === "true") {
        applyTheme(card, user);
        return;
      }

      card.dataset.cardEngineReady = "true";
      applyTheme(card, user);
      ensureNfcWaves(card);
      bind3D(card);
    });
  }

  window.StyleSphereCardEngine = {
    levels: levelThemes,
    render: renderCards,
    refresh: renderCards,
    getTheme
  };

  document.addEventListener("DOMContentLoaded", renderCards);
  window.addEventListener("storage", renderCards);

  setInterval(renderCards, 2500);
})();
