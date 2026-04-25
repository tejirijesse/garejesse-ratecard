// ===== Live Nairobi clock =====
const clock = document.getElementById("clock");
function tickClock() {
  const opts = { timeZone: "Africa/Nairobi", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
  if (clock) clock.textContent = new Date().toLocaleTimeString("en-GB", opts);
}
tickClock(); setInterval(tickClock, 1000);

// ===== Signal counter (clicks) =====
let signals = 0;
const hits = document.getElementById("hits");
function fmt(n){return String(n).padStart(3,"0");}
window.addEventListener("click", (e) => {
  if (e.target.closest("a, button, input, kbd, .pill, .cta, .roster-row")) return;
  signals++;
  if (hits) {
    hits.textContent = fmt(signals);
    hits.style.color = "var(--hot)";
    setTimeout(() => hits.style.color = "", 220);
  }
  // ripple
  const dot = document.createElement("span");
  dot.style.cssText = `position:fixed;top:${e.clientY}px;left:${e.clientX}px;width:8px;height:8px;border-radius:50%;background:var(--hot);transform:translate(-50%,-50%);pointer-events:none;z-index:9000;animation:sig 1.2s var(--ease) forwards`;
  document.body.appendChild(dot);
  setTimeout(() => dot.remove(), 1200);
});
const sigStyle = document.createElement("style");
sigStyle.textContent = `@keyframes sig{0%{transform:translate(-50%,-50%) scale(1);opacity:1}100%{transform:translate(-50%,-50%) scale(10);opacity:0}}`;
document.head.appendChild(sigStyle);

// ===== Camera cursor =====
const cur = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
window.addEventListener("mousemove", (e) => {
  mx = e.clientX; my = e.clientY;
  if (cur) cur.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
});
function tick() {
  rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
  if (ring) ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
  requestAnimationFrame(tick);
}
tick();
document.body.addEventListener("mouseover", (e) => {
  if (e.target.closest("[data-hover], a, button, .pill, .cta, .roster-row")) {
    ring?.classList.add("hover"); cur?.classList.add("hover");
  }
});
document.body.addEventListener("mouseout", (e) => {
  if (e.target.closest("[data-hover], a, button, .pill, .cta, .roster-row")) {
    ring?.classList.remove("hover"); cur?.classList.remove("hover");
  }
});

// ===== Keyboard shortcuts =====
window.addEventListener("keydown", (e) => {
  const k = e.key.toLowerCase();
  if (k === "r") window.location.href = "rate-card.html";
  if (k === "i") document.body.classList.toggle("invert");
});

// ===== Subtle parallax on jersey 26 =====
const jersey = document.querySelector(".jersey");
if (jersey) {
  window.addEventListener("mousemove", (e) => {
    const dx = (e.clientX / innerWidth - 0.5) * 24;
    const dy = (e.clientY / innerHeight - 0.5) * 18;
    jersey.style.transform = `translate(${dx}px, ${dy}px)`;
  }, { passive: true });
}
