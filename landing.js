// ===== Glitch text: copy text into data-text attribute for ::before/::after =====
document.querySelectorAll("[data-glitch]").forEach(el => {
  el.dataset.text = el.innerText.trim();
});

// ===== Live Nairobi clock =====
const clock = document.getElementById("clock");
function tickClock() {
  const opts = { timeZone: "Africa/Nairobi", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
  clock.textContent = new Date().toLocaleTimeString("en-GB", opts);
}
tickClock(); setInterval(tickClock, 1000);

// ===== Signal counter (clicks) =====
let signals = 0;
const hits = document.getElementById("hits");
function fmt(n){return String(n).padStart(3,"0") + " SIGNALS";}
window.addEventListener("click", (e) => {
  if (e.target.closest("a, button, [data-drag], input, kbd")) return;
  signals++;
  hits.textContent = fmt(signals);
  // brief flash
  hits.style.color = "var(--hot)";
  setTimeout(()=> hits.style.color = "", 220);
  // drop a tiny dot at click point
  const dot = document.createElement("span");
  dot.className = "signal-dot";
  dot.style.cssText = `position:fixed;top:${e.clientY}px;left:${e.clientX}px;width:6px;height:6px;border-radius:50%;background:var(--hot);transform:translate(-50%,-50%);pointer-events:none;z-index:9000;animation:sig 1.4s var(--ease) forwards`;
  document.body.appendChild(dot);
  setTimeout(()=>dot.remove(), 1400);
});
const sigStyle = document.createElement("style");
sigStyle.textContent = `@keyframes sig{0%{transform:translate(-50%,-50%) scale(1);opacity:1}100%{transform:translate(-50%,-50%) scale(8);opacity:0}}`;
document.head.appendChild(sigStyle);

// ===== Camera cursor =====
const cur = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
window.addEventListener("mousemove", (e) => {
  mx = e.clientX; my = e.clientY;
  cur.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
});
function tick() {
  rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
  ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
  requestAnimationFrame(tick);
}
tick();
document.body.addEventListener("mouseover", (e) => {
  if (e.target.closest("[data-hover], a, button, .enter, .idx li, [data-drag], [data-glitch]")) {
    ring.classList.add("hover"); cur.classList.add("hover");
  }
});
document.body.addEventListener("mouseout", (e) => {
  if (e.target.closest("[data-hover], a, button, .enter, .idx li, [data-drag], [data-glitch]")) {
    ring.classList.remove("hover"); cur.classList.remove("hover");
  }
});

// ===== Drag the manifesto card =====
const drag = document.querySelector("[data-drag]");
let dragging = false, ox = 0, oy = 0, tx = 0, ty = 0;
if (drag) {
  drag.addEventListener("mousedown", (e) => {
    dragging = true;
    drag.classList.add("dragging");
    const r = drag.getBoundingClientRect();
    ox = e.clientX - (r.left + tx);
    oy = e.clientY - (r.top + ty);
    document.body.style.userSelect = "none";
  });
  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    const r = drag.getBoundingClientRect();
    tx = e.clientX - ox - (r.left + tx) + tx;
    ty = e.clientY - oy - (r.top + ty) + ty;
    drag.style.transform = `translate(${tx}px, ${ty}px) rotate(${(tx / 60).toFixed(2)}deg)`;
  });
  window.addEventListener("mouseup", () => {
    if (!dragging) return;
    dragging = false;
    drag.classList.remove("dragging");
    document.body.style.userSelect = "";
  });
  // Touch fallback
  drag.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    dragging = true;
    drag.classList.add("dragging");
    const r = drag.getBoundingClientRect();
    ox = t.clientX - (r.left + tx);
    oy = t.clientY - (r.top + ty);
  }, { passive: true });
  window.addEventListener("touchmove", (e) => {
    if (!dragging) return;
    const t = e.touches[0];
    const r = drag.getBoundingClientRect();
    tx = t.clientX - ox - (r.left + tx) + tx;
    ty = t.clientY - oy - (r.top + ty) + ty;
    drag.style.transform = `translate(${tx}px, ${ty}px) rotate(${(tx / 60).toFixed(2)}deg)`;
  }, { passive: true });
  window.addEventListener("touchend", () => {
    dragging = false;
    drag.classList.remove("dragging");
  });
}

// ===== Keyboard shortcuts =====
window.addEventListener("keydown", (e) => {
  const k = e.key.toLowerCase();
  if (k === "r") window.location.href = "rate-card.html";
  if (k === "i") document.body.classList.toggle("invert");
  if (e.key === "Tab") {
    e.preventDefault();
    shuffleMega();
  }
});

// ===== Shuffle: nudge the mega rows to a new asymmetric layout =====
function shuffleMega() {
  const rows = document.querySelectorAll(".mega-row");
  rows.forEach((r) => {
    const tx = (Math.random() * 14 - 7).toFixed(1);
    const sign = Math.random() > 0.5 ? "" : "-";
    const align = Math.random() > 0.5 ? "flex-start" : "flex-end";
    r.style.transition = "margin .6s var(--ease), transform .6s var(--ease)";
    r.style.alignSelf = align;
    r.style.marginLeft = align === "flex-start" ? `${sign}${tx}vw` : "";
    r.style.marginRight = align === "flex-end" ? `${sign}${tx}vw` : "";
    r.style.transform = `translateX(${(Math.random() * 20 - 10).toFixed(1)}px)`;
  });
  setTimeout(() => rows.forEach(r => r.style.transform = ""), 700);
}
