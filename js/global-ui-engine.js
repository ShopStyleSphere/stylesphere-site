// StyleSphere Global UI Engine

document.addEventListener("mousemove", (e) => {
  document.body.style.setProperty("--x", e.clientX + "px");
  document.body.style.setProperty("--y", e.clientY + "px");
});

// Premium 3D cards
document.querySelectorAll(".wallet-card, .member-card, .panel, .box, .stat, .action").forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const rx = -((y / r.height) - 0.5) * 10;
    const ry = ((x / r.width) - 0.5) * 10;

    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    el.style.boxShadow = "0 0 55px rgba(255,215,0,.35)";
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    el.style.boxShadow = "";
  });
});

// Live pulse for status dots
setInterval(() => {
  document.querySelectorAll(".dot, .status-dot").forEach(dot => {
    dot.style.opacity = dot.style.opacity === "0.35" ? "1" : "0.35";
  });
}, 700);

// Smooth reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".panel, .box, .stat, .action").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(18px)";
  el.style.transition = "opacity .6s ease, transform .6s ease, box-shadow .3s ease";
  observer.observe(el);
});

// Button energy effect
document.querySelectorAll(".btn, button, .action").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    btn.style.filter = "brightness(1.18)";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.filter = "brightness(1)";
  });
});
