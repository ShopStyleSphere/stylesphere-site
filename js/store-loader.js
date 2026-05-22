/* StyleSphere Store Loader — Global App Experience */

(function () {
  const CONFIG = {
    minLoadingTime: 650,
    brandName: "STYLESphere",
    loaderText: "GLOBAL SYSTEM INITIALIZING",
    sessionKey: "ssStoreSessionId"
  };

  const startTime = Date.now();

  function createSession() {
    let session = sessionStorage.getItem(CONFIG.sessionKey);

    if (!session) {
      session = "SS-" + Date.now().toString(36).toUpperCase();
      sessionStorage.setItem(CONFIG.sessionKey, session);
    }

    document.documentElement.setAttribute("data-session", session);
  }

  function injectStyles() {
    if (document.getElementById("ss-store-loader-style")) return;

    const style = document.createElement("style");
    style.id = "ss-store-loader-style";

    style.innerHTML = `
      #ssStoreLoader{
        position:fixed;
        inset:0;
        z-index:9999999;
        display:flex;
        align-items:center;
        justify-content:center;
        background:
          radial-gradient(circle at center, rgba(255,215,0,.16), transparent 34%),
          linear-gradient(135deg,#020302,#071007,#020302);
        transition:opacity .55s ease, visibility .55s ease;
      }

      #ssStoreLoader.hide{
        opacity:0;
        visibility:hidden;
      }

      .ss-loader-card{
        width:min(420px,90vw);
        padding:34px;
        border-radius:28px;
        text-align:center;
        color:#fff;
        background:rgba(5,8,5,.82);
        border:1px solid rgba(255,215,0,.62);
        box-shadow:
          0 0 55px rgba(255,215,0,.32),
          inset 0 0 30px rgba(255,215,0,.08);
        backdrop-filter:blur(18px);
        position:relative;
        overflow:hidden;
      }

      .ss-loader-card::before{
        content:"";
        position:absolute;
        inset:-80%;
        background:linear-gradient(120deg, transparent, rgba(255,255,255,.22), transparent);
        animation:ssLoaderSweep 2.2s linear infinite;
      }

      @keyframes ssLoaderSweep{
        from{transform:translateX(-40%) rotate(18deg)}
        to{transform:translateX(40%) rotate(18deg)}
      }

      .ss-loader-logo{
        position:relative;
        z-index:2;
        font-size:32px;
        font-weight:950;
        letter-spacing:3px;
        color:#f7d84a;
        text-shadow:0 0 28px rgba(255,215,0,.8);
        margin-bottom:12px;
      }

      .ss-loader-text{
        position:relative;
        z-index:2;
        font-size:12px;
        letter-spacing:2px;
        color:#dce7dc;
        font-weight:900;
        margin-bottom:24px;
      }

      .ss-loader-bar{
        position:relative;
        z-index:2;
        height:6px;
        border-radius:999px;
        background:rgba(255,255,255,.12);
        overflow:hidden;
        border:1px solid rgba(255,215,0,.32);
      }

      .ss-loader-bar span{
        display:block;
        height:100%;
        width:38%;
        border-radius:999px;
        background:linear-gradient(90deg,#886b00,#fff3a3,#d4af37);
        box-shadow:0 0 26px rgba(255,215,0,.75);
        animation:ssLoaderBar 1.15s infinite ease-in-out;
      }

      @keyframes ssLoaderBar{
        0%{transform:translateX(-100%)}
        50%{transform:translateX(120%)}
        100%{transform:translateX(260%)}
      }

      .ss-loader-footer{
        position:relative;
        z-index:2;
        margin-top:18px;
        font-size:11px;
        color:rgba(255,255,255,.65);
        letter-spacing:1px;
      }

      body.ss-page-loading{
        overflow:hidden;
      }

      body.ss-page-ready{
        animation:ssPageReady .55s ease both;
      }

      @keyframes ssPageReady{
        from{opacity:.65;filter:blur(4px)}
        to{opacity:1;filter:blur(0)}
      }

      .ss-page-transition{
        position:fixed;
        inset:0;
        z-index:9999998;
        pointer-events:none;
        background:linear-gradient(135deg, rgba(0,0,0,.0), rgba(255,215,0,.18), rgba(0,0,0,.0));
        opacity:0;
        transition:.35s ease;
      }

      .ss-page-transition.show{
        opacity:1;
      }
    `;

    document.head.appendChild(style);
  }

  function createLoader() {
    if (document.getElementById("ssStoreLoader")) return;

    document.body.classList.add("ss-page-loading");

    const loader = document.createElement("div");
    loader.id = "ssStoreLoader";

    loader.innerHTML = `
      <div class="ss-loader-card">
        <div class="ss-loader-logo">Ⓢ ${CONFIG.brandName}</div>
        <div class="ss-loader-text">${CONFIG.loaderText}</div>
        <div class="ss-loader-bar"><span></span></div>
        <div class="ss-loader-footer">SECURE GLOBAL INTERFACE</div>
      </div>
    `;

    document.body.appendChild(loader);

    const transition = document.createElement("div");
    transition.className = "ss-page-transition";
    document.body.appendChild(transition);
  }

  function hideLoader() {
    const loader = document.getElementById("ssStoreLoader");
    if (!loader) return;

    const elapsed = Date.now() - startTime;
    const delay = Math.max(0, CONFIG.minLoadingTime - elapsed);

    setTimeout(() => {
      loader.classList.add("hide");
      document.body.classList.remove("ss-page-loading");
      document.body.classList.add("ss-page-ready");

      setTimeout(() => loader.remove(), 650);
    }, delay);
  }

  function bindPageLinks() {
    document.querySelectorAll("a[href]").forEach(link => {
      const href = link.getAttribute("href");

      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        link.target === "_blank"
      ) {
        return;
      }

      link.addEventListener("click", e => {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

        e.preventDefault();

        const transition = document.querySelector(".ss-page-transition");
        if (transition) transition.classList.add("show");

        setTimeout(() => {
          window.location.href = href;
        }, 180);
      });
    });
  }

  function clickRipple() {
    document.addEventListener("click", e => {
      const ripple = document.createElement("span");

      ripple.style.position = "fixed";
      ripple.style.left = e.clientX + "px";
      ripple.style.top = e.clientY + "px";
      ripple.style.width = "10px";
      ripple.style.height = "10px";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255,215,0,.65)";
      ripple.style.boxShadow = "0 0 28px rgba(255,215,0,.80)";
      ripple.style.pointerEvents = "none";
      ripple.style.zIndex = "9999999";
      ripple.style.animation = "ssStoreRipple .65s ease-out forwards";

      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });

    if (!document.getElementById("ss-store-ripple-style")) {
      const style = document.createElement("style");
      style.id = "ss-store-ripple-style";
      style.innerHTML = `
        @keyframes ssStoreRipple{
          from{opacity:1;transform:translate(-50%,-50%) scale(1)}
          to{opacity:0;transform:translate(-50%,-50%) scale(18)}
        }
      `;
      document.head.appendChild(style);
    }
  }

  function refreshEngines() {
    setTimeout(() => {
      window.StyleSpherePremiumEffects?.refresh?.();
      window.StyleSphereUI?.refresh?.();
      window.StyleSphereCardEngine?.refresh?.();
      window.SS?.renderUser?.();
    }, 80);
  }

  window.StyleSphereStoreLoader = {
    refresh: refreshEngines,
    hide: hideLoader
  };

  document.addEventListener("DOMContentLoaded", () => {
    createSession();
    injectStyles();
    createLoader();
    bindPageLinks();
    clickRipple();
    refreshEngines();
  });

  window.addEventListener("load", () => {
    refreshEngines();
    hideLoader();
  });
})();
