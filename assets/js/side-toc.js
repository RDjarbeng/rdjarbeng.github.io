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
      var collapsing = !body.classList.contains("side-toc-collapsed");
      setCollapsed(collapsing);
      // Collapsing with the pointer over the panel: close it now instead of leaving the
      // hover peek open, and let hover open it again once the pointer has left.
      if (collapsing) body.classList.add("side-toc-nopeek");
    });
    toc.addEventListener("mouseleave", function () { body.classList.remove("side-toc-nopeek"); });
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

  // Collapsed rail: marks for sections before the current one fill in, and when a
  // subsection is active its parent section's mark shows as current. Only changed
  // classes are written, so the observer below settles after one pass.
  function markProgress(active) {
    var links = toc.querySelectorAll("li.toc-h2 > a, li.toc-h3 > a, li.toc-h4 > a");
    var idx = Array.prototype.indexOf.call(links, active);
    var current = null;
    for (var i = 0; i <= idx; i++) {
      if (links[i].parentNode.classList.contains("toc-h2")) current = links[i];
    }
    for (var j = 0; j < links.length; j++) {
      var a = links[j];
      if (!a.parentNode.classList.contains("toc-h2")) continue;
      var passed = idx >= 0 && j < idx && a !== current;
      if (a.classList.contains("toc-passed") !== passed) a.classList.toggle("toc-passed", passed);
      var isCurrent = a === current && a !== active;
      if (a.classList.contains("toc-current") !== isCurrent) a.classList.toggle("toc-current", isCurrent);
    }
  }

  // Keep the active entry visible in long TOCs. The highlight itself is set by
  // toc.js (posts) or the homepage script; this only scrolls the TOC panel.
  var pending = 0;
  new MutationObserver(function () {
    cancelAnimationFrame(pending);
    pending = requestAnimationFrame(function () {
      var active = toc.querySelector("a.active");
      markProgress(active);
      // Phone: show the current section on the floating Contents button
      var current = openBtn && openBtn.querySelector(".side-toc-open__current");
      if (current) current.textContent = active ? active.textContent.trim() : "";
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
