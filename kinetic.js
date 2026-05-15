/* ============================================================
   KINETIC — shared typography motion engine (landing + rate card)
   Pure B&W. No color. Type is the show.
   ============================================================ */
(function () {
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Text scramble / decode ---------- */
  const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/()=+*<>_-—".split("");

  function scramble(el, finalText, opts = {}) {
    const dur = opts.duration || 34;            // frames
    const settleStagger = opts.stagger || 1.6;  // frames per char
    if (REDUCED) { el.textContent = finalText; return Promise.resolve(); }
    const chars = [...finalText];
    let frame = 0;
    cancelAnimationFrame(el.__kraf);
    return new Promise(resolve => {
      function tick() {
        let out = "";
        let done = 0;
        for (let i = 0; i < chars.length; i++) {
          const settleAt = dur + i * settleStagger;
          if (chars[i] === " ") { out += " "; done++; continue; }
          if (frame >= settleAt) { out += chars[i]; done++; }
          else if (frame >= settleAt - 14) {
            out += `<span class="kx">${GLYPHS[(Math.random() * GLYPHS.length) | 0]}</span>`;
          } else {
            out += `<span class="kx">${GLYPHS[(Math.random() * GLYPHS.length) | 0]}</span>`;
          }
        }
        el.innerHTML = out;
        frame++;
        if (done === chars.length) { el.textContent = finalText; resolve(); }
        else el.__kraf = requestAnimationFrame(tick);
      }
      tick();
    });
  }

  // Expose for other scripts
  window.kineticScramble = scramble;

  /* Scramble on scroll-into-view for [data-kinetic] */
  const seen = new WeakSet();
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting || seen.has(e.target)) return;
      seen.add(e.target);
      const el = e.target;
      const text = el.dataset.kinetic || el.textContent;
      el.dataset.kinetic = text;
      scramble(el, text, { duration: 22, stagger: 1.3 });
    });
  }, { threshold: 0.35, rootMargin: "0px 0px -8% 0px" });

  function bindKinetic() {
    document.querySelectorAll("[data-kinetic]").forEach(el => {
      if (!el.dataset.kinetic) el.dataset.kinetic = el.textContent.trim();
      io.observe(el);
    });
  }

  /* Hover scramble for [data-kx-hover] */
  function bindHoverScramble() {
    document.querySelectorAll("[data-kx-hover]").forEach(el => {
      const original = el.textContent.trim();
      let busy = false;
      el.addEventListener("mouseenter", () => {
        if (busy) return; busy = true;
        scramble(el, original, { duration: 8, stagger: 0.8 }).then(() => busy = false);
      });
    });
  }

  /* ---------- 2. Scroll-skew (velocity shear) ---------- */
  let lastY = window.scrollY, vel = 0, skewEls = [];
  function refreshSkew() { skewEls = [...document.querySelectorAll("[data-skew]")]; }
  function skewLoop() {
    const y = window.scrollY;
    const dy = y - lastY;
    lastY = y;
    // smooth the velocity
    vel += (dy - vel) * 0.18;
    const s = Math.max(-9, Math.min(9, vel * 0.35));
    for (const el of skewEls) el.style.transform = `skewY(${s.toFixed(2)}deg)`;
    requestAnimationFrame(skewLoop);
  }

  /* ---------- 3. Count-up numbers [data-countup] ---------- */
  const countSeen = new WeakSet();
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting || countSeen.has(e.target)) return;
      countSeen.add(e.target);
      const el = e.target;
      const raw = el.dataset.countup;            // e.g. "12K", "250K+", "Custom"
      const m = raw.match(/^(\d+)(.*)$/);
      if (!m) { el.textContent = raw; return; }
      const target = parseInt(m[1], 10), suffix = m[2];
      const start = performance.now(), DUR = 900;
      function step(now) {
        const t = Math.min(1, (now - start) / DUR);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = raw;
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  function bindCountup() {
    document.querySelectorAll("[data-countup]").forEach(el => countIO.observe(el));
  }

  /* ---------- 4. Letter rise-in for [data-rise] ---------- */
  function splitRise() {
    document.querySelectorAll("[data-rise]").forEach(el => {
      if (el.dataset.split) return;
      el.dataset.split = "1";
      const txt = el.textContent;
      el.textContent = "";
      [...txt].forEach((c, i) => {
        const s = document.createElement("span");
        s.className = "krise";
        s.textContent = c === " " ? " " : c;
        s.style.animationDelay = (i * 0.035) + "s";
        el.appendChild(s);
      });
    });
  }

  /* ---------- boot scramble for [data-boot] (on load, staggered) ---------- */
  function bootScramble() {
    const els = [...document.querySelectorAll("[data-boot]")];
    els.forEach((el, i) => {
      const text = el.dataset.boot || el.textContent.trim();
      el.style.visibility = "visible";
      setTimeout(() => scramble(el, text, { duration: 26, stagger: 1.4 }), 140 + i * 220);
    });
  }

  /* ---------- init ---------- */
  function init() {
    splitRise();
    bootScramble();
    bindKinetic();
    bindHoverScramble();
    bindCountup();
    refreshSkew();
    if (!REDUCED) requestAnimationFrame(skewLoop);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  // Re-scan after dynamic render (rate card injects cards via JS)
  window.kineticRescan = function () { bindKinetic(); bindHoverScramble(); bindCountup(); refreshSkew(); };
})();
