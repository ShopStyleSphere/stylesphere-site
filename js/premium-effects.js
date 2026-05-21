// GLOBAL MOUSE LIGHT EFFECT
document.addEventListener("mousemove", (e) => {
  document.body.style.setProperty("--x", e.clientX + "px");
  document.body.style.setProperty("--y", e.clientY + "px");
});

// CARD 3D EFFECT
document.querySelectorAll(".card, .box, .panel").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * 15;
    const rotateY = (x / rect.width - 0.5) * -15;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.02)
    `;

    card.style.boxShadow = "0 20px 60px rgba(255,215,0,0.3)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    card.style.boxShadow = "0 0 20px rgba(255,215,0,0.15)";
  });
});

// GLOW BUTTON EFFECT
document.querySelectorAll("button, .btn").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    btn.style.boxShadow = "0 0 20px gold, 0 0 40px gold";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.boxShadow = "none";
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
  const dot = document.querySelector(".status-dot");
  if (dot) {
    dot.style.opacity = dot.style.opacity == "0.3" ? "1" : "0.3";
  }
}, 800);
