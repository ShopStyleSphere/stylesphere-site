/* StyleSphere VIP Card Levels */

(function () {
  const VIP_LEVELS = [
    { id:1, name:"Bronze", points:0, color:"#8b4513", glow:"rgba(205,127,50,.45)" },
    { id:2, name:"Bronze Plus", points:500, color:"#b87333", glow:"rgba(205,127,50,.55)" },
    { id:3, name:"Silver", points:1000, color:"#c0c0c0", glow:"rgba(220,220,220,.45)" },
    { id:4, name:"Silver Plus", points:2000, color:"#e5e5e5", glow:"rgba(240,240,240,.55)" },
    { id:5, name:"Gold", points:3000, color:"#d4af37", glow:"rgba(255,215,0,.55)" },
    { id:6, name:"Gold Plus", points:4500, color:"#ffd700", glow:"rgba(255,215,0,.7)" },
    { id:7, name:"Premium", points:6000, color:"#00e5ff", glow:"rgba(0,229,255,.55)" },
    { id:8, name:"Elite", points:8000, color:"#00ff9d", glow:"rgba(0,255,157,.55)" },
    { id:9, name:"VIP", points:10000, color:"#3b82ff", glow:"rgba(59,130,255,.55)" },
    { id:10, name:"Platinum", points:12000, color:"#dce6f0", glow:"rgba(220,230,240,.6)" },
    { id:11, name:"Diamond Elite", points:15000, color:"#ffffff", glow:"rgba(255,255,255,.7)" },
    { id:12, name:"Royal Infinity", points:17000, color:"#f7d84a", glow:"rgba(247,216,74,.7)" },
    { id:13, name:"Black VIP", points:20000, color:"#111111", glow:"rgba(255,255,255,.35)" },
    { id:14, name:"Crown Elite", points:25000, color:"#ffcc33", glow:"rgba(255,204,51,.75)" },
    { id:15, name:"Global Legend", points:30000, color:"#1d4ed8", glow:"rgba(29,78,216,.65)" },
    { id:16, name:"Imperial Elite", points:35000, color:"#7c3aed", glow:"rgba(124,58,237,.7)" },
    { id:17, name:"Royal Diamond", points:40000, color:"#f8fafc", glow:"rgba(248,250,252,.75)" },
    { id:18, name:"Infinity Black", points:50000, color:"#050505", glow:"rgba(255,215,0,.85)" }
  ];

  function getCurrentLevel(points){
    points = Number(points || 0);
    return VIP_LEVELS.slice().reverse().find(l => points >= l.points) || VIP_LEVELS[0];
  }

  function applyVipCard(){
    if (!window.SS) return;

    const user = SS.getUser();
    const level = getCurrentLevel(user.points);

    user.level = level.name;
    user.levelNumber = level.id;
    user.membership = level.name;
    SS.saveUser(user);
    SS.renderUser();

    document.querySelectorAll("[data-vip-card], .member-card").forEach(card => {
      card.style.background = `
        linear-gradient(135deg,
        #050505 0%,
        #111 38%,
        ${level.color} 100%)
      `;

      card.style.boxShadow = `
        0 0 28px ${level.glow},
        0 30px 70px rgba(0,0,0,.55)
      `;

      card.style.border = `1px solid ${level.glow}`;
    });

    document.querySelectorAll("[data-card-level]").forEach(el => {
      el.textContent = level.name;
    });

    document.querySelectorAll("[data-card-level-number]").forEach(el => {
      el.textContent = level.id;
    });
  }

  window.StyleSphereVIPLevels = {
    levels: VIP_LEVELS,
    refresh: applyVipCard
  };

  document.addEventListener("DOMContentLoaded", applyVipCard);
  setInterval(applyVipCard, 2000);
})();
