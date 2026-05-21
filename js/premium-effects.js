// StyleSphere Premium Effects Engine

document.addEventListener("mousemove", (e) => {
  document.body.style.setProperty("--x", e.clientX + "px");
  document.body.style.setProperty("--y", e.clientY + "px");
});

// GLOBAL 3D EFFECT
document.querySelectorAll(".card, .box, .panel, .stat, .action").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * 10;
    const rotateY = (x / rect.width - 0.5) * -10;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.015)
    `;

    card.style.boxShadow = "0 0 45px rgba(255,215,0,0.32)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.boxShadow = "";
  });
});

// BUTTON GLOW
document.querySelectorAll("button, .btn").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    btn.style.boxShadow = "0 0 25px gold, 0 0 55px rgba(255,215,0,.45)";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.boxShadow = "";
  });
});

// SMOOTH SCROLL
document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href"))
      ?.scrollIntoView({ behavior: "smooth" });
  });
});

// LIVE STATUS DOT
setInterval(() => {
  document.querySelectorAll(".status-dot, .dot").forEach(dot => {
    dot.style.opacity = dot.style.opacity === "0.35" ? "1" : "0.35";
  });
}, 800);

// SIDEBAR ULTRA PREMIUM ENGINE
document.querySelectorAll(".nav a").forEach((item, index) => {
  item.style.position = "relative";
  item.style.overflow = "hidden";
  item.style.transition = "all 0.28s ease";
  item.style.animation = `sidebarEnter 0.55s ease forwards`;
  item.style.animationDelay = `${index * 0.045}s`;

  item.addEventListener("mousemove", e => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    item.style.background =
      `radial-gradient(circle at ${x}px ${y}px,
      rgba(255,215,0,0.72),
      rgba(255,215,0,0.28),
      transparent 78%)`;

    item.style.boxShadow =
      "0 0 28px rgba(255,215,0,.72), inset 0 0 18px rgba(255,255,255,.18)";

    item.style.transform = "translateX(7px) scale(1.025)";
  });

  item.addEventListener("mouseleave", () => {
    if (!item.classList.contains("active")) {
      item.style.background = "";
      item.style.boxShadow = "";
      item.style.transform = "";
    }
  });
});

// INJECT SIDEBAR ANIMATION CSS
const sidebarUltraStyle = document.createElement("style");

sidebarUltraStyle.innerHTML = `
@keyframes sidebarEnter{
  from{
    opacity:0;
    transform:translateX(-18px);
    filter:blur(4px);
  }
  to{
    opacity:1;
    transform:translateX(0);
    filter:blur(0);
  }
}

.nav a.active{
  position:relative;
  animation:activePulse 2s infinite ease-in-out;
}

@keyframes activePulse{
  0%,100%{
    box-shadow:0 0 24px rgba(255,215,0,.55);
    filter:brightness(1);
  }
  50%{
    box-shadow:0 0 42px rgba(255,215,0,.95);
    filter:brightness(1.25);
  }
}

.nav a.active::after{
  content:"";
  position:absolute;
  inset:0;
  background:linear-gradient(120deg, transparent, rgba(255,255,255,.45), transparent);
  animation:activeSweep 2.8s infinite linear;
  pointer-events:none;
}

@keyframes activeSweep{
  from{transform:translateX(-120%)}
  to{transform:translateX(120%)}
}
`;

document.head.appendChild(sidebarUltraStyle);
