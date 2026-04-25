// Shared camera cursor — works on home + rate-card pages.
// Auto-skips on touch devices.
(function () {
  if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;
  if (window.innerWidth <= 768) return;

  const cur = document.getElementById("cursor");
  const ring = document.getElementById("cursorRing");
  if (!cur || !ring) return;

  let mx = -100, my = -100, rx = mx, ry = my, ready = false;

  function onMove(e) {
    mx = e.clientX;
    my = e.clientY;
    if (!ready) {
      rx = mx; ry = my; ready = true;
    }
    cur.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  }

  function tick() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  }
  tick();

  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("mouseleave", () => { cur.style.opacity = 0; ring.style.opacity = 0; });
  window.addEventListener("mouseenter", () => { cur.style.opacity = 1; ring.style.opacity = ""; });

  const HOVER_SEL = "[data-hover], a, button, .pill, .cta, .roster-row, .card, .bundle, .addon, .retainer, .glance-tile, .term, .basket-item, .basket-remove, .cur-trigger, .cur-menu li, .nav-links a, .scroll-cue, .hero-title .line, .section-title, .foot-title span, em";

  document.body.addEventListener("mouseover", (e) => {
    if (e.target.closest(HOVER_SEL)) {
      cur.classList.add("hover");
      ring.classList.add("hover");
    }
  });
  document.body.addEventListener("mouseout", (e) => {
    if (e.target.closest(HOVER_SEL)) {
      cur.classList.remove("hover");
      ring.classList.remove("hover");
    }
  });

  // Shutter-pulse on click
  window.addEventListener("click", () => {
    cur.classList.add("click");
    setTimeout(() => cur.classList.remove("click"), 180);
  });
})();
