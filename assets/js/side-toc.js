// Side TOC (posts and homepage): collapse on desktop, drawer on small screens,
// and keep the highlighted entry in view while the page scrolls.
(function () {
  var toc = document.getElementById("side-toc");
  if (!toc) return;

  var body = document.body;
  var desktop = window.matchMedia("(min-width: 1024px)");
  var collapseBtn = toc.querySelector(".side-toc__collapse");
  var closeBtn = toc.querySelector(".side-toc__close");
  var openBtn = document.querySelector(".side-toc-open");
  var backdrop = document.querySelector(".side-toc-backdrop");
  var KEY = "sideTocCollapsed";

  function setCollapsed(collapsed) {
    body.classList.toggle("side-toc-collapsed", collapsed);
    if (collapseBtn) {
      collapseBtn.setAttribute("aria-expanded", String(!collapsed));
      collapseBtn.setAttribute("aria-label", collapsed ? "Expand contents" : "Collapse contents");
    }
    try { localStorage.setItem(KEY, collapsed ? "1" : "0"); } catch (e) { /* storage unavailable */ }
  }

  function openDrawer() {
    body.classList.add("side-toc-open");
    if (backdrop) backdrop.hidden = false;
    if (openBtn) openBtn.setAttribute("aria-expanded", "true");
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer() {
    if (!body.classList.contains("side-toc-open")) return;
    body.classList.remove("side-toc-open");
    if (backdrop) backdrop.hidden = true;
    if (openBtn) { openBtn.setAttribute("aria-expanded", "false"); openBtn.focus(); }
  }

  if (collapseBtn) {
    collapseBtn.setAttribute("aria-expanded", String(!body.classList.contains("side-toc-collapsed")));
    collapseBtn.addEventListener("click", function () {
      setCollapsed(!body.classList.contains("side-toc-collapsed"));
    });
  }
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (openBtn) openBtn.addEventListener("click", openDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDrawer(); });
  toc.addEventListener("click", function (e) {
    if (e.target.closest("a") && !desktop.matches) closeDrawer();
  });
  desktop.addEventListener("change", closeDrawer);

  // Never run into the footers: on desktop the TOC's bottom edge stops where the first
  // footer (the APOD footer or the site footer) begins.
  var footers = document.querySelectorAll(".dynamic-footer, .site-footer");
  var fitting = 0;
  function stopAboveFooter() {
    fitting = 0;
    if (!desktop.matches || !footers.length) { toc.style.bottom = ""; return; }
    var top = Infinity;
    footers.forEach(function (f) { top = Math.min(top, f.getBoundingClientRect().top); });
    toc.style.bottom = Math.max(0, window.innerHeight - top) + "px";
  }
  function queueFit() { if (!fitting) fitting = requestAnimationFrame(stopAboveFooter); }
  window.addEventListener("scroll", queueFit, { passive: true });
  window.addEventListener("resize", queueFit);
  desktop.addEventListener("change", queueFit);
  stopAboveFooter();

  // Keep the active entry visible in long TOCs. The highlight itself is set by
  // toc.js (posts) or the homepage script; this only scrolls the TOC panel.
  var pending = 0;
  new MutationObserver(function () {
    cancelAnimationFrame(pending);
    pending = requestAnimationFrame(function () {
      var active = toc.querySelector("a.active");
      if (!active || body.classList.contains("side-toc-collapsed")) return;
      var a = active.getBoundingClientRect();
      var c = toc.getBoundingClientRect();
      var head = toc.querySelector(".side-toc__head");
      var top = c.top + (head ? head.offsetHeight : 0) + 24;
      if (a.top < top || a.bottom > c.bottom - 24) {
        toc.scrollBy({ top: a.top - top - (c.bottom - top) / 3, behavior: "smooth" });
      }
    });
  }).observe(toc, { subtree: true, attributes: true, attributeFilter: ["class"] });
})();
