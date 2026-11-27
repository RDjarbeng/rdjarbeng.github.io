// Dev-only review overlay. Loaded only under `eleventy --serve` (see the devReview flag in
// eleventy.config.js). Select text in a post, press Comment, and the note is saved by the
// comment server in scripts/dev-serve.cjs to review/comments.json.
(function () {
  var API = "http://127.0.0.1:8095";
  var path = location.pathname;
  var isReviewPage = path.indexOf("/review/") === 0;
  var scope = document.querySelector(".post-content") || document.querySelector(".personal-container");

  var css = [
    ".rv-badge{position:fixed;right:0;bottom:0;z-index:99999;background:#222;color:#fff;font:13px/1 system-ui,sans-serif;padding:8px 12px;text-decoration:none;border:1px solid #000}",
    ".rv-badge:hover{background:#000;color:#fff}",
    "mark.rv-hl{background:#ffe96b;color:inherit;cursor:pointer;padding:0}",
    ".rv-btn,.rv-box button{font:13px system-ui,sans-serif;border:1px solid #222;background:#fff;color:#222;padding:5px 10px;cursor:pointer;border-radius:0}",
    ".rv-btn{position:absolute;z-index:99998}",
    ".rv-btn:hover,.rv-box button:hover{background:#222;color:#fff}",
    ".rv-box{position:absolute;z-index:99999;width:280px;background:#fff;color:#222;border:1px solid #222;padding:8px;font:13px/1.4 system-ui,sans-serif;box-shadow:2px 2px 0 rgba(0,0,0,.25)}",
    ".rv-box textarea{display:block;width:100%;box-sizing:border-box;height:80px;margin:0 0 6px;font:13px/1.4 system-ui,sans-serif;border:1px solid #888;border-radius:0;padding:4px;resize:vertical}",
    ".rv-box .rv-quote{color:#666;margin:0 0 6px;border-left:3px solid #ffe96b;padding-left:6px;max-height:60px;overflow:hidden}",
    ".rv-box .rv-time{color:#888;font-size:12px;margin:0 0 6px}",
    ".rv-box button+button{margin-left:6px}"
  ].join("\n");
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  function call(method, url, body) {
    return fetch(API + url, {
      method: method,
      headers: body ? { "Content-Type": "application/json" } : {},
      body: body ? JSON.stringify(body) : undefined
    }).then(function (r) { return r.json(); });
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  // Badge (every page)
  var badge = el("a", "rv-badge", "Review: ...");
  badge.href = "/review/";
  document.body.appendChild(badge);
  function refreshBadge() {
    call("GET", "/comments?status=open").then(function (list) {
      badge.textContent = "Review: " + list.length + " open";
    }).catch(function () { badge.textContent = "Review: server off"; });
  }
  refreshBadge();

  if (isReviewPage) { renderReviewPage(); return; }
  if (!scope) return;

  // Flattened text of the post, used for both selection and highlighting.
  function textNodes() {
    var out = [];
    var w = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p || /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/.test(p.nodeName)) return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest(".rv-box,.rv-btn")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = w.nextNode())) out.push(n);
    return out;
  }
  function offsetOf(nodes, container, offset) {
    var pos = 0, i, probe;
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i] === container) return pos + offset;
      pos += nodes[i].nodeValue.length;
    }
    // container is an element: count the text before its child at `offset`
    probe = container.childNodes[offset];
    pos = 0;
    for (i = 0; i < nodes.length; i++) {
      if (probe && (probe === nodes[i] || probe.contains(nodes[i]) ||
          (probe.compareDocumentPosition(nodes[i]) & Node.DOCUMENT_POSITION_FOLLOWING))) return pos;
      pos += nodes[i].nodeValue.length;
    }
    return pos;
  }

  var btn = null, box = null;
  function closeUi() {
    if (btn) { btn.remove(); btn = null; }
    if (box) { box.remove(); box = null; }
  }

  document.addEventListener("mouseup", function (ev) {
    if (ev.target.closest && ev.target.closest(".rv-box,.rv-btn")) return;
    setTimeout(function () {
      var sel = window.getSelection();
      if (!sel || sel.isCollapsed || !sel.rangeCount) { if (btn) { btn.remove(); btn = null; } return; }
      var range = sel.getRangeAt(0);
      if (!scope.contains(range.commonAncestorContainer)) return;
      var nodes = textNodes();
      var flat = nodes.map(function (n) { return n.nodeValue; }).join("");
      var s = offsetOf(nodes, range.startContainer, range.startOffset);
      var e = offsetOf(nodes, range.endContainer, range.endOffset);
      var quote = flat.slice(s, e).replace(/\s+/g, " ").trim();
      if (!quote) return;
      var data = {
        quote: quote,
        prefix: flat.slice(Math.max(0, s - 30), s),
        suffix: flat.slice(e, e + 30)
      };
      var rect = range.getBoundingClientRect();
      if (btn) btn.remove();
      btn = el("button", "rv-btn", "Comment");
      btn.type = "button";
      btn.style.left = window.scrollX + rect.right + 4 + "px";
      btn.style.top = window.scrollY + rect.bottom + 4 + "px";
      btn.addEventListener("mousedown", function (e2) { e2.preventDefault(); });
      // stopPropagation: otherwise the document "click outside closes the box" handler closes it at once
      btn.addEventListener("click", function (e3) { e3.stopPropagation(); openBox(data, rect); });
      document.body.appendChild(btn);
    }, 10);
  });

  function placeBox(b, rect) {
    var left = Math.min(window.scrollX + rect.left, window.scrollX + document.documentElement.clientWidth - 300);
    b.style.left = Math.max(8, left) + "px";
    b.style.top = window.scrollY + rect.bottom + 8 + "px";
  }

  function openBox(data, rect) {
    closeUi();
    box = el("div", "rv-box");
    box.appendChild(el("p", "rv-quote", data.quote.length > 140 ? data.quote.slice(0, 140) + "..." : data.quote));
    var ta = el("textarea");
    ta.placeholder = "Comment";
    box.appendChild(ta);
    var save = el("button", null, "Save"); save.type = "button";
    var cancel = el("button", null, "Cancel"); cancel.type = "button";
    var msg = el("span"); msg.style.cssText = "color:#a00;margin-left:8px";
    box.appendChild(save); box.appendChild(cancel); box.appendChild(msg);
    cancel.addEventListener("click", closeUi);
    save.addEventListener("click", function () {
      var text = ta.value.trim();
      if (!text) return;
      call("POST", "/comments", {
        url: path, title: document.title, quote: data.quote,
        prefix: data.prefix, suffix: data.suffix, comment: text
      }).then(function (c) {
        if (c.error) throw new Error(c.error);
        closeUi();
        window.getSelection().removeAllRanges();
        highlight(c);
        refreshBadge();
      }).catch(function (err) { msg.textContent = "Not saved: " + err.message; });
    });
    placeBox(box, rect);
    document.body.appendChild(box);
    ta.focus();
  }

  // Highlighting saved comments
  function findQuote(flat, c) {
    var q = c.quote;
    var i = flat.indexOf((c.prefix || "") + q + (c.suffix || ""));
    if (i >= 0) return i + (c.prefix || "").length;
    var j = -1, best = -1, from = 0;
    while ((j = flat.indexOf(q, from)) >= 0) {
      if (best < 0) best = j;
      if (c.prefix && flat.slice(Math.max(0, j - c.prefix.length), j) === c.prefix) return j;
      from = j + 1;
    }
    if (best >= 0) return best;
    // the quote was whitespace-normalised on save: match ignoring runs of whitespace
    var pattern = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/ /g, "\\s+");
    var m = new RegExp(pattern).exec(flat);
    return m ? { start: m.index, len: m[0].length } : -1;
  }

  function highlight(c) {
    var nodes = textNodes();
    var flat = nodes.map(function (n) { return n.nodeValue; }).join("");
    var hit = findQuote(flat, c);
    if (hit === -1) return false;
    var start = typeof hit === "number" ? hit : hit.start;
    var end = start + (typeof hit === "number" ? c.quote.length : hit.len);
    var pos = 0, marks = [];
    nodes.forEach(function (n) {
      var len = n.nodeValue.length, ns = pos, ne = pos + len;
      pos = ne;
      var a = Math.max(start, ns), b = Math.min(end, ne);
      if (a >= b) return;
      var r = document.createRange();
      r.setStart(n, a - ns); r.setEnd(n, b - ns);
      var mk = el("mark", "rv-hl");
      mk.dataset.rvId = c.id;
      r.surroundContents(mk);
      marks.push(mk);
    });
    marks.forEach(function (mk) {
      mk.addEventListener("click", function (e) { e.stopPropagation(); showComment(c, mk); });
    });
    return true;
  }

  function showComment(c, mk) {
    closeUi();
    box = el("div", "rv-box");
    box.appendChild(el("p", "rv-time", new Date(c.created).toLocaleString()));
    var body = el("p", null, c.comment);
    body.style.whiteSpace = "pre-wrap";
    box.appendChild(body);
    var res = el("button", null, "Resolve"); res.type = "button";
    var close = el("button", null, "Close"); close.type = "button";
    box.appendChild(res); box.appendChild(close);
    close.addEventListener("click", closeUi);
    res.addEventListener("click", function () {
      call("POST", "/comments/" + c.id + "/resolve").then(function () {
        document.querySelectorAll('mark[data-rv-id="' + c.id + '"]').forEach(function (m) {
          var parent = m.parentNode;
          while (m.firstChild) parent.insertBefore(m.firstChild, m);
          parent.removeChild(m);
        });
        scope.normalize();
        closeUi();
        refreshBadge();
      });
    });
    placeBox(box, mk.getBoundingClientRect());
    document.body.appendChild(box);
  }
  document.addEventListener("click", function (e) {
    if (box && !(e.target.closest && e.target.closest(".rv-box"))) { box.remove(); box = null; }
  });

  call("GET", "/comments?status=open&url=" + encodeURIComponent(path)).then(function (list) {
    list.forEach(highlight);
  }).catch(function () {});

  // The /review/ page: open comments grouped by page
  function renderReviewPage() {
    var holder = document.getElementById("review-comments");
    if (!holder) return;
    call("GET", "/comments?status=open").then(function (list) {
      holder.textContent = "";
      if (!list.length) { holder.appendChild(el("p", null, "No open comments.")); return; }
      var groups = {};
      list.forEach(function (c) { (groups[c.url] = groups[c.url] || []).push(c); });
      Object.keys(groups).forEach(function (u) {
        var h = el("h3");
        var a = el("a", null, groups[u][0].title || u);
        a.href = u;
        h.appendChild(a);
        holder.appendChild(h);
        var table = el("table", "review-table");
        groups[u].forEach(function (c) {
          var tr = el("tr");
          var q = el("td", null, c.quote.length > 160 ? c.quote.slice(0, 160) + "..." : c.quote);
          q.style.cssText = "background:#fff8c4;width:40%";
          var m = el("td", null, c.comment);
          m.style.whiteSpace = "pre-wrap";
          var id = el("td", null, c.id);
          id.style.cssText = "font-family:monospace;color:#888";
          tr.appendChild(q); tr.appendChild(m); tr.appendChild(id);
          table.appendChild(tr);
        });
        holder.appendChild(table);
      });
    }).catch(function () {
      holder.textContent = "Comment server is not running on 127.0.0.1:8095 (start it with npm start).";
    });
  }
})();
