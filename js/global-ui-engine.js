/* StyleSphere Global UI Engine — Real Premium Interface */

(function () {
  const CONFIG = {
    gold: "rgba(255,215,0,.72)",
    softGold: "rgba(255,215,0,.22)",
    green: "rgba(0,255,157,.75)",
    glass: "rgba(5,8,5,.72)"
  };

  function injectStyles() {
    if (document.getElementById("ss-global-ui-style")) return;

    const style = document.createElement("style");
    style.id = "ss-global-ui-style";
    style.innerHTML = `
      html{scroll-behavior:smooth}

      body{
        --ss-x:50%;
        --ss-y:50%;
      }

      body::selection{
        background:#f7d84a;
        color:#050505;
      }

      .ss-ui-ready .panel,
      .ss-ui-ready .box,
      .ss-ui-ready .stat,
      .ss-ui-ready .action,
      .ss-ui-ready .sidebar{
        animation:ssReveal .65s ease both;
      }

      @keyframes ssReveal{
        from{opacity:0;transform:translateY(18px);filter:blur(6px)}
        to{opacity:1;transform:translateY(0);filter:blur(0)}
      }

      .nav a{
        position:relative;
        overflow:hidden;
        isolation:isolate;
        will-change:transform, background, box-shadow;
      }

      .nav a::before{
        content:"";
        position:absolute;
        inset:0;
        background:
          radial-gradient(circle at var(--nav-x,50%) var(--nav-y,50%),
          rgba(255,255,255,.45),
          rgba(255,215,0,.35) 18%,
          transparent 55%);
        opacity:0;
        transition:opacity .25s ease;
        z-index:-1;
      }

      .nav a:hover::before,
      .nav a.active::before{
        opacity:1;
      }

      .nav a.active{
        box-shadow:0 0 28px rgba(255,215,0,.58), inset 0 0 18px rgba(255,255,255,.20);
        animation:ssActivePulse 2s infinite ease-in-out;
      }

      @keyframes ssActivePulse{
        0%,100%{filter:brightness(1)}
        50%{filter:brightness(1.22)}
      }

      .ss-click-ripple{
        position:fixed;
        width:12px;
        height:12px;
        border-radius:50%;
        pointer-events:none;
        z-index:999999;
        background:rgba(255,215,0,.65);
        box-shadow:0 0 25px rgba(255,215,0,.75);
        animation:ssRipple .65s ease-out forwards;
      }

      @keyframes ssRipple{
        from{opacity:1;transform:translate(-50%,-50%) scale(1)}
        to{opacity:0;transform:translate(-50%,-50%) scale(18)}
      }

      .ss-focus{
        outline:2px solid rgba(255,215,0,.75)!important;
        outline-offset:3px;
      }

      .status,
      .status-pill,
      [data-status-pill]{
        position:relative;
        overflow:hidden;
      }

      .status::after,
      .status-pill::after,
      [data-status-pill]::after{
        content:"";
        position:absolute;
        inset:0;
        background:linear-gradient(120deg,transparent,rgba(255,255,255,.25),transparent);
        animation:ssSweep 3s infinite linear;
        pointer-events:none;
      }

      @keyframes ssSweep{
        from{transform:translateX(-120%)}
        to{transform:translateX(120%)}
      }

      .dot,
      .status-dot{
        animation:ssDotLive 1.25s infinite ease-in-out;
      }

      @keyframes ssDotLive{
        0%,100%{opacity:1;transform:scale(1);box-shadow:0 0 18px #00ff9d}
        50%{opacity:.45;transform:scale(.72);box-shadow:0 0 7px #00ff9d}
      }

      .ss-toast{
        position:fixed;
        right:24px;
        bottom:24px;
        z-index:999999;
        padding:14px 18px;
        border-radius:16px;
        color:#fff;
        background:rgba(5,8,5,.88);
        border:1px solid rgba(255,215,0,.58);
        box-shadow:0 0 35px rgba(255,215,0,.30);
        backdrop-filter:blur(14px);
        font-weight:800;
        transform:translateY(20px);
        opacity:0;
        transition:.35s ease;
      }

      .ss-toast.show{
        transform:translateY(0);
        opacity:1;
      }
    `;

    document.head.appendChild(style);
  }

  function setMouseVars() {
    document.addEventListener("mousemove", e => {
      document.body.style.setProperty("--ss-x", e.clientX + "px");
      document.body.style.setProperty("--ss-y", e.clientY + "px");
      document.body.style.setProperty("--x", e.clientX + "px");
      document.body.style.setProperty("--y", e.clientY + "px");
    });
  }

  function bindSidebar() {
    document.querySelectorAll(".nav a").forEach((item, index) => {
      item.style.transition = "transform .25s ease, box-shadow .25s ease, background .25s ease";
      item.style.animationDelay = `${index * 0.035}s`;

      item.addEventListener("mousemove", e => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        item.style.setProperty("--nav-x", x + "px");
        item.style.setProperty("--nav-y", y + "px");
        item.style.transform = "translateX(6px) scale(1.018)";
        item.style.boxShadow = "0 0 28px rgba(255,215,0,.55)";
      });

      item.addEventListener("mouseleave", () => {
        if (!item.classList.contains("active")) {
          item.style.transform = "";
          item.style.boxShadow = "";
        }
      });
    });
  }

  function bindPanels() {
    document.querySelectorAll(".panel,.box,.stat,.action").forEach(card => {
      if (card.dataset.uiReady === "true") return;
      card.dataset.uiReady = "true";

      card.style.transition = "transform .25s ease, box-shadow .25s ease, border-color .25s ease";

      card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.backgroundImage =
          `radial-gradient(circle at ${x}px ${y}px, rgba(255,215,0,.16), transparent 42%)`;

        card.style.boxShadow =
          "0 0 42px rgba(255,215,0,.34), inset 0 0 22px rgba(255,255,255,.07)";

        card.style.transform = "translateY(-4px)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.backgroundImage = "";
        card.style.boxShadow = "";
        card.style.transform = "";
      });
    });
  }

  function bindButtons() {
    document.querySelectorAll("button,.btn,.action").forEach(btn => {
      if (btn.dataset.buttonReady === "true") return;
      btn.dataset.buttonReady = "true";

      btn.addEventListener("mouseenter", () => {
        btn.style.boxShadow = "0 0 32px rgba(255,215,0,.62)";
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.boxShadow = "";
      });
    });
  }

  function clickRipple() {
    document.addEventListener("click", e => {
      const ripple = document.createElement("span");
      ripple.className = "ss-click-ripple";
      ripple.style.left = e.clientX + "px";
      ripple.style.top = e.clientY + "px";

      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  }

  function focusSystem() {
    document.addEventListener("focusin", e => {
      if (e.target.matches("a,button,input,select,textarea")) {
        e.target.classList.add("ss-focus");
      }
    });

    document.addEventListener("focusout", e => {
      e.target.classList.remove("ss-focus");
    });
  }

  function toast(message = "Done") {
    const old = document.querySelector(".ss-toast");
    if (old) old.remove();

    const el = document.createElement("div");
    el.className = "ss-toast";
    el.textContent = message;

    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));

    setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => el.remove(), 400);
    }, 2600);
  }

  function enhancePage() {
    document.body.classList.add("ss-ui-ready");
    bindSidebar();
    bindPanels();
    bindButtons();
  }

  window.StyleSphereUI = {
    refresh: enhancePage,
    toast
  };

  document.addEventListener("DOMContentLoaded", () => {
    injectStyles();
    setMouseVars();
    clickRipple();
    focusSystem();
    enhancePage();
  });

  setInterval(enhancePage, 2500);
})();
