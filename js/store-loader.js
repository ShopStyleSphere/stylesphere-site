// StyleSphere Global Store Loader

// LOADING SCREEN
const loader = document.createElement("div");

loader.innerHTML = `
<div id="globalLoader">
  <div class="loader-logo">STYLESphere</div>
  <div class="loader-bar"></div>
</div>
`;

document.body.appendChild(loader);

// STYLE
const style = document.createElement("style");
style.innerHTML = `
#globalLoader{
  position:fixed;
  inset:0;
  background:#050505;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  z-index:999999;
  transition:opacity .6s ease;
}

.loader-logo{
  font-size:28px;
  color:gold;
  letter-spacing:2px;
  margin-bottom:20px;
  text-shadow:0 0 20px gold;
}

.loader-bar{
  width:120px;
  height:3px;
  background:linear-gradient(90deg, transparent, gold, transparent);
  animation:loading 1.2s infinite;
}

@keyframes loading{
  0%{transform:translateX(-40px)}
  50%{transform:translateX(40px)}
  100%{transform:translateX(-40px)}
}
`;
document.head.appendChild(style);

// REMOVE LOADER
window.addEventListener("load", () => {
  const el = document.getElementById("globalLoader");
  el.style.opacity = "0";

  setTimeout(() => {
    el.remove();
  }, 600);
});


// GLOBAL PAGE FADE
document.body.style.opacity = "0";
window.addEventListener("load", () => {
  document.body.style.transition = "opacity 0.6s ease";
  document.body.style.opacity = "1";
});


// CLICK EFFECT (Luxury feel)
document.addEventListener("click", (e) => {
  const ripple = document.createElement("span");

  ripple.style.position = "fixed";
  ripple.style.left = e.clientX + "px";
  ripple.style.top = e.clientY + "px";
  ripple.style.width = "10px";
  ripple.style.height = "10px";
  ripple.style.borderRadius = "50%";
  ripple.style.background = "rgba(255,215,0,0.6)";
  ripple.style.pointerEvents = "none";
  ripple.style.zIndex = "999999";

  ripple.style.animation = "rippleEffect 0.6s ease-out";

  document.body.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
});

const rippleStyle = document.createElement("style");
rippleStyle.innerHTML = `
@keyframes rippleEffect{
  from{
    transform:scale(1);
    opacity:1;
  }
  to{
    transform:scale(15);
    opacity:0;
  }
}
`;
document.head.appendChild(rippleStyle);
