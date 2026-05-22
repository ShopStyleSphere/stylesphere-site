/* StyleSphere Premium Effects — Global Motion Layer */

(function () {
  const SELECTORS = {
    glowItems: ".panel,.box,.stat,.action,.sidebar,.method,.plan,.card,.wallet-card,.member-card,.bank-card,.nfc-card",
    navItems: ".nav a",
    buttons: "button,.btn,.pay-btn,.back-btn",
    statusDots: ".dot,.status-dot,.live-dot"
  };

  function injectStyles() {
    if (document.getElementById("ss-premium-effects-style")) return;

    const style = document.createElement("style");
    style.id = "ss-premium-effects-style";
    style.innerHTML = `
      body{
        --x:50%;
        --y:50%;
      }

      .ss-premium-bg{
        position:fixed;
        inset:0;
        pointer-events:none;
        z-index:-1;
        background:
          radial-gradient(circle at var(--x) var(--y),
            rgba(255,215,0,.18),
            transparent 28%),
          linear-gradient(120deg, transparent, rgba(255,215,0,.055), transparent);
        opacity:.95;
        animation:ssPremiumSweep 8s linear infinite;
      }

      @keyframes ssPremiumSweep{
        from{transform:translateX(-35%)}
        to{transform:translateX(35%)}
      }

      .ss-premium-ready .panel,
      .ss-premium-ready .box,
      .ss-premium-ready .stat,
      .ss-premium-ready .action,
      .ss-premium-ready .sidebar{
        animation:ssPremiumReveal .7s ease both;
      }

      @keyframes ssPremiumReveal{
        from{
          opacity:0;
          transform:translateY(20px);
          filter:blur(8px);
        }
        to{
          opacity:1;
          transform:translateY(0);
          filter:blur(0);
        }
      }

      .ss-light-target{
        position:relative;
        overflow:hidden;
        isolation:isolate;
      }

      .ss-light-target::before{
        content:"";
        position:absolute;
        inset:0;
        z-index:-1;
        background:
          radial-gradient(circle at var(--fx,50%) var(--fy,50%),
          rgba(255,215,0,.20),
          transparent 42%);
        opacity:0;
        transition:opacity .22s ease;
        pointer-events:none;
      }

      .ss-light-target:hover::before{
        opacity:1;
      }

      .ss-light-target::after{
        content:"";
        position:absolute;
        inset:0;
        background:linear-gradient(120deg, transparent, rgba(255,255,255,.18), transparent);
        transform:translateX(-120%);
        transition:transform .75s ease;
        pointer-events:none;
        z-index:2;
      }

      .ss-light-target:hover::after{
        transform:translateX(120%);
      }

      .nav a{
        position:relative;
        overflow:hidden;
        isolation:isolate;
      }

      .nav a::after{
        content:"";
        position:absolute;
        inset:0;
        background:linear-gradient(120deg, transparent, rgba(255,255,255,.38), transparent);
        transform:translateX(-130%);
        transition:.65s;
        pointer-events:none;
      }

      .nav a:hover::after,
      .nav a.active::after{
        transform:translateX(130%);
      }

      .nav a.active{
        animation:ssActiveBreath 2.2s infinite ease-in-out;
      }

      @keyframes ssActiveBreath{
        0%,100%{filter:brightness(1)}
        50%{filter:brightness(1.22)}
      }

      .ss-click-flash{
        position:fixed;
        width:10px;
        height:10px;
        border-radius:50%;
        background:rgba(255,215,0,.75);
        box-shadow:0 0 25px rgba(255,215,0,.85);
        pointer-events:none;
        z-index:999999;
        animation:ssClickFlash .65s ease-out forwards;
      }

      @keyframes ssClickFlash{
        from{opacity:1;transform:translate(-50%,-50%) scale(1)}
        to{opacity:0;transform:translate(-50%,-50%) scale(18)}
      }

      .ss-premium-button{
        transition:transform .25s ease, filter .25s ease, box-shadow .25s ease;
      }

      .ss-premium-button:hover{
        transform:translateY(-2px);
        filter:brightness(1.15);
        box-shadow:0 0 34px rgba(255,215,0,.60)!important;
      }

      .ss-status-live{
        animation:ssStatusPulse 1.35s infinite ease-in-out;
      }

      @keyframes ssStatusPulse{
        0%,100%{
          opacity:1;
          transform:scale(1);
          box-shadow:0 0 16px rgba(0,255,157,.8);
        }
        50%{
          opacity:.48;
          transform:scale(.75);
          box-shadow:0 0 8px rgba(0,255,157,.45);
        }
      }

      .ss-progress-shine{
        position:relative;
        overflow:hidden;
      }

      .ss-progress-shine::after{
        content:"";
        position:absolute;
        top:0;
        left:-100%;
        width:100%;
        height:100%;
        background:linear-gradient(90deg, transparent, rgba(255,255,255,.65), transparent);
        animation:ssProgressMove 2s infinite;
      }

      @keyframes ssProgressMove{
        to{left:100%}
      }
    `;

    document.head.appendChild(style);
  }

  function createBackgroundLayer() {
    if (document.querySelector(".ss-premium-bg")) return;

    const bg = document.createElement("div");
    bg.className = "ss-premium-bg";
    document.body.prepend(bg);
  }

  function mouseTracker() {
    document.addEventListener("mousemove", e => {
      document.body.style.setProperty("--x", e.clientX + "px");
      document.body.style.setProperty("--y", e.clientY + "px");
      document.body.style.setProperty("--ss-x", e.clientX + "px");
      document.body.style.setProperty("--ss-y", e.clientY + "px");
    });
  }

  function bindLightTargets() {
    document.querySelectorAll(SELECTORS.glowItems).forEach(el => {
      if (el.dataset.premiumLight === "true") return;
      el.dataset.premiumLight = "true";
      el.classList.add("ss-light-target");

      el.addEventListener("mousemove", e => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        el.style.setProperty("--fx", x + "px");
        el.style.setProperty("--fy", y + "px");
      });
    });
  }

  function bindNav() {
    document.querySelectorAll(SELECTORS.navItems).forEach((item, index) => {
      if (item.dataset.premiumNav === "true") return;
      item.dataset.premiumNav = "true";

      item.style.transition = "transform .28s ease, box-shadow .28s ease, background .28s ease";
      item.style.animationDelay = `${index * 0.035}s`;

      item.addEventListener("mousemove", e => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        item.style.background =
          `radial-gradient(circle at ${x}px ${y}px,
          rgba(255,215,0,.66),
          rgba(255,215,0,.24),
          transparent 78%)`;

        item.style.boxShadow =
          "0 0 30px rgba(255,215,0,.62), inset 0 0 18px rgba(255,255,255,.18)";

        item.style.transform = "translateX(7px) scale(1.022)";
      });

      item.addEventListener("mouseleave", () => {
        if (!item.classList.contains("active")) {
          item.style.background = "";
          item.style.boxShadow = "";
          item.style.transform = "";
        }
      });
    });
  }

  function bindButtons() {
    document.querySelectorAll(SELECTORS.buttons).forEach(btn => {
      if (btn.dataset.premiumButton === "true") return;
      btn.dataset.premiumButton = "true";
      btn.classList.add("ss-premium-button");
    });
  }

  function bindDots() {
    document.querySelectorAll(SELECTORS.statusDots).forEach(dot => {
      if (dot.dataset.statusReady === "true") return;
      dot.dataset.statusReady = "true";
      dot.classList.add("ss-status-live");
    });
  }

  function bindProgress() {
    document.querySelectorAll(".progress span,[data-progress-bar]").forEach(bar => {
      if (bar.dataset.progressReady === "true") return;
      bar.dataset.progressReady = "true";
      bar.classList.add("ss-progress-shine");
    });
  }

  function clickFlash() {
    document.addEventListener("click", e => {
      const flash = document.createElement("span");
      flash.className = "ss-click-flash";
      flash.style.left = e.clientX + "px";
      flash.style.top = e.clientY + "px";

      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 700);
    });
  }

  function applyRevealDelays() {
    document.querySelectorAll(".panel,.box,.stat,.action").forEach((el, i) => {
      el.style.animationDelay = `${Math.min(i * 0.045, 0.45)}s`;
    });
  }

  function refresh() {
    document.body.classList.add("ss-premium-ready");

    bindLightTargets();
    bindNav();
    bindButtons();
    bindDots();
    bindProgress();
    applyRevealDelays();
  }

  window.StyleSpherePremiumEffects = {
    refresh
  };

  document.addEventListener("DOMContentLoaded", () => {
    injectStyles();
    createBackgroundLayer();
    mouseTracker();
    clickFlash();
    refresh();
  });

  setInterval(refresh, 2500);
})();
