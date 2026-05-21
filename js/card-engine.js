// StyleSphere Premium Bank Card Engine

document.querySelectorAll(".wallet-card, .member-card, .nfc-card, .bank-card").forEach((card) => {
  card.style.transformStyle = "preserve-3d";
  card.style.transition = "transform .12s ease, box-shadow .25s ease";

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -((y / rect.height) - 0.5) * 16;
    const rotateY = ((x / rect.width) - 0.5) * 16;

    card.style.setProperty("--card-x", x + "px");
    card.style.setProperty("--card-y", y + "px");

    card.style.transform =
      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.025)`;

    card.style.boxShadow =
      "0 0 80px rgba(255,215,0,.55), 0 35px 90px rgba(0,0,0,.55)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";

    card.style.boxShadow =
      "0 0 45px rgba(255,215,0,.35)";
  });
});

// Auto inject bank-card glow CSS
const cardStyle = document.createElement("style");
cardStyle.innerHTML = `
.wallet-card,
.member-card,
.nfc-card,
.bank-card{
  position:relative;
  overflow:hidden;
}

.wallet-card::before,
.member-card::before,
.nfc-card::before,
.bank-card::before{
  content:"";
  position:absolute;
  inset:0;
  background:
    radial-gradient(circle at var(--card-x,50%) var(--card-y,50%),
      rgba(255,255,255,.42),
      transparent 28%),
    linear-gradient(120deg,
      transparent,
      rgba(255,215,0,.18),
      transparent);
  opacity:.75;
  mix-blend-mode:screen;
  pointer-events:none;
}

.wallet-card::after,
.member-card::after,
.nfc-card::after,
.bank-card::after{
  content:"";
  position:absolute;
  inset:-60%;
  background:
    linear-gradient(120deg,
      transparent 35%,
      rgba(255,255,255,.25) 50%,
      transparent 65%);
  animation:bankCardShine 4s linear infinite;
  pointer-events:none;
}

@keyframes bankCardShine{
  from{transform:translateX(-30%) rotate(18deg);}
  to{transform:translateX(30%) rotate(18deg);}
}

.nfc-chip,
.card-chip{
  animation:chipPulse 1.8s infinite;
}

@keyframes chipPulse{
  0%,100%{
    box-shadow:0 0 18px rgba(255,215,0,.55);
    filter:brightness(1);
  }
  50%{
    box-shadow:0 0 35px rgba(255,215,0,.95);
    filter:brightness(1.35);
  }
}

.nfc-wave,
.card-wave{
  animation:nfcWave 1.5s infinite;
}

@keyframes nfcWave{
  0%,100%{opacity:.45;transform:scale(1);}
  50%{opacity:1;transform:scale(1.2);}
}
`;
document.head.appendChild(cardStyle);
