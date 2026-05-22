/* StyleSphere VIP Card Levels — Clean Luxury System */

(function () {
  const VIP_LEVELS = [
    { id:1, name:"Bronze", points:0, accent:"#8b4513", glow:"rgba(205,127,50,.28)", card:"#120905" },
    { id:2, name:"Bronze Plus", points:500, accent:"#b87333", glow:"rgba(205,127,50,.32)", card:"#160b05" },
    { id:3, name:"Silver", points:1000, accent:"#c0c0c0", glow:"rgba(220,220,220,.24)", card:"#101214" },
    { id:4, name:"Silver Plus", points:2000, accent:"#e5e5e5", glow:"rgba(240,240,240,.28)", card:"#111417" },
    { id:5, name:"Gold", points:3000, accent:"#d4af37", glow:"rgba(255,215,0,.30)", card:"#151104" },
    { id:6, name:"Gold Plus", points:4500, accent:"#ffd700", glow:"rgba(255,215,0,.34)", card:"#171204" },
    { id:7, name:"Premium", points:6000, accent:"#00e5ff", glow:"rgba(0,229,255,.26)", card:"#061316" },
    { id:8, name:"Elite", points:8000, accent:"#00ff9d", glow:"rgba(0,255,157,.26)", card:"#06140d" },
    { id:9, name:"VIP", points:10000, accent:"#3b82ff", glow:"rgba(59,130,255,.28)", card:"#050b18" },
    { id:10, name:"Platinum", points:12000, accent:"#dce6f0", glow:"rgba(220,230,240,.28)", card:"#11161a" },
    { id:11, name:"Diamond Elite", points:15000, accent:"#ffffff", glow:"rgba(255,255,255,.30)", card:"#101216" },
    { id:12, name:"Royal Infinity", points:17000, accent:"#f7d84a", glow:"rgba(247,216,74,.34)", card:"#151305" },
    { id:13, name:"Black VIP", points:20000, accent:"#f7d84a", glow:"rgba(255,215,0,.28)", card:"#050505" },
    { id:14, name:"Crown Elite", points:25000, accent:"#ffcc33", glow:"rgba(255,204,51,.36)", card:"#181204" },
    { id:15, name:"Global Legend", points:30000, accent:"#6ea8ff", glow:"rgba(29,78,216,.30)", card:"#050b18" },
    { id:16, name:"Imperial Elite", points:35000, accent:"#b68cff", glow:"rgba(124,58,237,.32)", card:"#0d0718" },
    { id:17, name:"Royal Diamond", points:40000, accent:"#f8fafc", glow:"rgba(248,250,252,.34)", card:"#101216" },
    { id:18, name:"Infinity Black", points:50000, accent:"#f7d84a", glow:"rgba(255,215,0,.40)", card:"#030303" }
  ];

  function getCurrentLevel(points) {
    points = Number(points || 0);
    return VIP_LEVELS.slice().reverse().find(l => points >= l.points) || VIP_LEVELS[0];
  }

  function applyVipCard() {
    if (!window.SS) return;

    const user = SS.getUser();
    const level = getCurrentLevel(user.points);

    user.level = level.name;
    user.levelNumber = level.id;
    user.membership = level.name;
    SS.saveUser(user);

    document.querySelectorAll("[data-vip-card], .member-card").forEach(card => {
      card.style.background = `
        linear-gradient(120deg, rgba(255,255,255,.10), transparent 32%),
        linear-gradient(135deg, #050505 0%, ${level.card} 45%, #050505 100%)
      `;

      card.style.boxShadow = `
        0 0 22px ${level.glow},
        0 28px 70px rgba(0,0,0,.58),
        inset 0 0 22px rgba(255,255,255,.045)
      `;

      card.style.border = `1px solid ${level.glow}`;
      card.style.color = "#ffffff";
      card.style.setProperty("--vip-accent", level.accent);
      card.style.setProperty("--vip-glow", level.glow);
    });

    document.querySelectorAll("[data-card-level]").forEach(el => {
      el.textContent = level.name;
      el.style.color = "#ffffff";
      el.style.textShadow = `0 0 10px ${level.glow}`;
    });

    document.querySelectorAll("[data-card-level-number]").forEach(el => {
      el.textContent = level.id;
    });

    document.querySelectorAll(".card-brand").forEach(el => {
      el.style.color = level.accent;
      el.style.textShadow = `0 0 8px ${level.glow}`;
    });

    document.querySelectorAll(".nfc-chip,[data-card-chip]").forEach(chip => {
      chip.style.background = `
        linear-gradient(135deg, #f8f3d2 0%, ${level.accent} 48%, #7c5f08 100%)
      `;
      chip.style.boxShadow = `
        inset 0 0 7px rgba(0,0,0,.45),
        0 0 12px ${level.glow}
      `;
    });

    if (window.SS && typeof SS.renderUser === "function") {
      SS.renderUser();
    }
  }

  window.StyleSphereVIPLevels = {
    levels: VIP_LEVELS,
    refresh: applyVipCard
  };

  document.addEventListener("DOMContentLoaded", applyVipCard);
  setInterval(applyVipCard, 2000);
})();
