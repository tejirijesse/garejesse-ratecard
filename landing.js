// ===== Split words into chars and stagger reveal =====
document.querySelectorAll("[data-split]").forEach((el, idx) => {
  const text = el.textContent;
  el.textContent = "";
  [...text].forEach((ch, i) => {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = ch === " " ? "\u00A0" : ch;
    span.style.animationDelay = `${0.05 * i + 0.4 * idx}s`;
    el.appendChild(span);
  });
});

// ===== Rotor (rotating disciplines) =====
const words = document.querySelectorAll(".rotor-word");
let idx = 0;
setInterval(() => {
  const cur = words[idx];
  const next = words[(idx + 1) % words.length];
  cur.classList.remove("is-active");
  cur.classList.add("is-leaving");
  next.classList.add("is-active");
  setTimeout(() => cur.classList.remove("is-leaving"), 800);
  idx = (idx + 1) % words.length;
}, 2400);

// ===== Live clock (Nairobi time) =====
const clock = document.getElementById("clock");
function tickClock() {
  const opts = { timeZone: "Africa/Nairobi", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
  clock.textContent = new Date().toLocaleTimeString("en-GB", opts) + " EAT";
}
tickClock();
setInterval(tickClock, 1000);

// ===== Camera cursor =====
const cur = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
const lamp = document.getElementById("lamp");
let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, lx = mx, ly = my;

window.addEventListener("mousemove", (e) => {
  mx = e.clientX; my = e.clientY;
  cur.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
});
function tick() {
  rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
  ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
  lx += (mx - lx) * 0.08; ly += (my - ly) * 0.08;
  lamp.style.transform = `translate(${lx}px, ${ly}px) translate(-50%, -50%)`;
  requestAnimationFrame(tick);
}
tick();

document.body.addEventListener("mouseover", (e) => {
  if (e.target.closest("[data-hover], a, button")) {
    ring.classList.add("hover"); cur.classList.add("hover");
  }
});
document.body.addEventListener("mouseout", (e) => {
  if (e.target.closest("[data-hover], a, button")) {
    ring.classList.remove("hover"); cur.classList.remove("hover");
  }
});

// ===== Subtle parallax on the abstract SVG =====
const abstract = document.querySelector(".abstract");
window.addEventListener("mousemove", (e) => {
  const dx = (e.clientX / innerWidth - 0.5) * 14;
  const dy = (e.clientY / innerHeight - 0.5) * 10;
  abstract.style.transform = `translate(${dx}px, ${dy}px)`;
}, { passive: true });

// ===== Konami-style: press R to skip to rate card =====
window.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "r") window.location.href = "rate-card.html";
});
