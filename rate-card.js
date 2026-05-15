/* Rate card — studio offers are static HTML. Only the scroll-progress bar needs JS. */
(function () {
  var sp = document.getElementById("scrollProg");
  if (!sp) return;
  window.addEventListener("scroll", function () {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    sp.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  }, { passive: true });
})();
