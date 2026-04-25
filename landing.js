// ===== Split each row's letters into spans for magnetic letters =====
const rows = document.querySelectorAll(".big .row");
rows.forEach(row => {
  const text = row.dataset.text || row.textContent;
  row.textContent = "";
  for (const c of text) {
    const span = document.createElement("span");
    span.className = "ch";
    if (c === " ") {
      span.dataset.space = "1";
      span.textContent = "\u00A0";
    } else if (c === ".") {
      span.textContent = ".";
      span.style.fontStyle = "normal";
      span.style.marginLeft = "-.05em";
    } else {
      span.textContent = c;
    }
    row.appendChild(span);
  }
});

const chars = document.querySelectorAll(".big .ch");

// ===== Magnetic letters: each letter pulled toward cursor based on distance =====
const RADIUS = 220;        // px of influence
const STRENGTH = 28;        // max displacement in px
let raf = null;

function magnetize(e){
  const mx = e.clientX, my = e.clientY;
  if (raf) cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    chars.forEach(c => {
      const r = c.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = mx - cx;
      const dy = my - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < RADIUS) {
        const f = (1 - dist / RADIUS) ** 2;
        c.style.setProperty("--tx", `${(dx / dist) * f * STRENGTH}px`);
        c.style.setProperty("--ty", `${(dy / dist) * f * STRENGTH}px`);
      } else {
        c.style.setProperty("--tx", `0px`);
        c.style.setProperty("--ty", `0px`);
      }
    });
  });
}
window.addEventListener("mousemove", magnetize, { passive: true });
window.addEventListener("mouseleave", () => {
  chars.forEach(c => { c.style.setProperty("--tx","0px"); c.style.setProperty("--ty","0px"); });
});

// ===== Click anywhere to invert (with wipe) =====
const wipe = document.getElementById("wipe");
let wipeBusy = false;
function fireInvert(){
  if (wipeBusy) return;
  wipeBusy = true;
  wipe.classList.add("fire");
  // Flip palette mid-wipe (when overlay covers screen ~ at 50%)
  setTimeout(() => document.body.classList.toggle("invert"), 275);
  setTimeout(() => { wipe.classList.remove("fire"); wipeBusy = false; }, 600);
}
window.addEventListener("click", (e) => {
  // Don't invert if clicking interactive things
  if (e.target.closest("a, button, input, .hold-link")) return;
  fireInvert();
});
window.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "i") fireInvert();
  if (e.key.toLowerCase() === "r") window.location.href = "rate-card.html";
});

// ===== Hold-to-enter on Rate Card link =====
const holdLink = document.getElementById("holdLink");
let holdTimer = null;
function startHold(e){
  e.preventDefault();
  holdLink.classList.add("holding");
  holdTimer = setTimeout(() => {
    window.location.href = holdLink.getAttribute("href");
  }, 850);
}
function endHold(){
  holdLink.classList.remove("holding");
  if (holdTimer) { clearTimeout(holdTimer); holdTimer = null; }
}
holdLink.addEventListener("mousedown", startHold);
holdLink.addEventListener("mouseup", endHold);
holdLink.addEventListener("mouseleave", endHold);
holdLink.addEventListener("touchstart", startHold, { passive: false });
holdLink.addEventListener("touchend", endHold);
holdLink.addEventListener("touchcancel", endHold);
// Allow keyboard activate / quick click as fallback
holdLink.addEventListener("click", (e) => {
  // If they didn't hold long enough, still let them through on a quick click
  if (!holdTimer) return; // hold flow handles it
});

// ===== Live Nairobi clock =====
const clock = document.getElementById("clock");
function tickClock(){
  const opts = { timeZone: "Africa/Nairobi", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
  if (clock) clock.textContent = new Date().toLocaleTimeString("en-GB", opts) + " EAT";
}
tickClock(); setInterval(tickClock, 1000);
