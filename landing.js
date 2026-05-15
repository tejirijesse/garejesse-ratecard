/* Landing — invert wipe, hold-to-enter, clock. Type motion lives in kinetic.js */

// ===== Live Nairobi clock =====
const clock = document.getElementById("clock");
function tickClock() {
  const o = { timeZone: "Africa/Nairobi", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
  if (clock) clock.textContent = new Date().toLocaleTimeString("en-GB", o);
}
tickClock(); setInterval(tickClock, 1000);

// ===== Click anywhere to invert (wipe) =====
const wipe = document.getElementById("wipe");
let wipeBusy = false;
function fireInvert() {
  if (wipeBusy || !wipe) return;
  wipeBusy = true;
  wipe.classList.add("fire");
  setTimeout(() => document.body.classList.toggle("invert"), 275);
  setTimeout(() => { wipe.classList.remove("fire"); wipeBusy = false; }, 600);
}
window.addEventListener("click", (e) => {
  if (e.target.closest("a, button, input, .hold-link, .top-links")) return;
  fireInvert();
});
window.addEventListener("keydown", (e) => {
  const k = e.key.toLowerCase();
  if (k === "i") fireInvert();
  if (k === "r") window.location.href = "rate-card.html";
});

// ===== Hold-to-enter on Rate Card =====
const holdLink = document.getElementById("holdLink");
if (holdLink) {
  let holdTimer = null;
  const start = (e) => {
    e.preventDefault();
    holdLink.classList.add("holding");
    holdTimer = setTimeout(() => { window.location.href = holdLink.getAttribute("href"); }, 850);
  };
  const end = () => {
    holdLink.classList.remove("holding");
    if (holdTimer) { clearTimeout(holdTimer); holdTimer = null; }
  };
  holdLink.addEventListener("mousedown", start);
  holdLink.addEventListener("mouseup", end);
  holdLink.addEventListener("mouseleave", end);
  holdLink.addEventListener("touchstart", start, { passive: false });
  holdLink.addEventListener("touchend", end);
  holdLink.addEventListener("touchcancel", end);
}
