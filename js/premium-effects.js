/* StyleSphere Premium Effects */

document.addEventListener("mousemove", (e) => {
  document.body.style.setProperty("--x", e.clientX + "px");
  document.body.style.setProperty("--y", e.clientY + "px");
});

/* Card 3D Mouse Effect */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".vip-card, .member-card, .wallet-card, .panel, .stat, .box").forEach(card => {
    card.addEventListener("mousemove", function(e){
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * -10;
      const rotateY = ((x / rect.width) - 0.5) * 10;

      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    });

    card.addEventListener("mouseenter", () => {
      card.style.boxShadow =
        "0 0 45px rgba(247,216,74,.35), 0 0 90px rgba(255,215,0,.18)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      card.style.boxShadow = "";
    });
  });

  /* Sidebar Hover Light */
  document.querySelectorAll(".nav a").forEach(item => {
    item.style.transition = "background .2s ease, transform .2s ease, box-shadow .2s ease";

    item.addEventListener("mousemove", e => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      item.style.background =
        `radial-gradient(circle at ${x}px ${y}px,
        rgba(247,216,74,.30),
        rgba(247,216,74,.10),
        transparent 70%)`;

      item.style.transform = "translateX(4px)";
    });

    item.addEventListener("mouseleave", () => {
      if (!item.classList.contains("active")) {
        item.style.background = "";
        item.style.transform = "";
      }
    });
  });

  /* Button Glow */
  document.querySelectorAll("button, .btn").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      btn.style.boxShadow = "0 0 22px rgba(247,216,74,.45)";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.boxShadow = "";
    });
  });
});
