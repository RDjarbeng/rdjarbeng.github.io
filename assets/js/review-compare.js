// Dev-only compare view for /review/compare/ (see review-compare.liquid). Reads old versions of a
// post from the local server in scripts/dev-serve.cjs (/git/log, /git/show). Not part of a build.
(function () {
  var API = "http://127.0.0.1:8095";
  var file = new URLSearchParams(location.search).get("file") || "";
  var $ = function (id) { return document.getElementById(id); };
  var status = $("cmp-status"), out = $("cmp-out"), fmBox = $("cmp-fm");
  var selL = $("cmp-left"), selR = $("cmp-right");
  var cache = {};
  var MODE_KEY = "review-compare-mode";
  var mode = "side";
  try { mode = localStorage.getItem(MODE_KEY) || "side"; } catch (e) {}
  if (["side", "changes", "full"].indexOf(mode) < 0) mode = "side";

  $("cmp-file").textContent = file;
  if (!file) { status.textContent = "No file given. Open this page from the Compare links on /review/."; return; }
  if (!window.Diff || !window.marked) { status.textContent = "Could not load diff and marked from cdn.jsdelivr.net (offline?)."; return; }

  // Show Liquid tags and HTML as plain text instead of running them
  var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
  marked.use({ renderer: { html: function (h) { return esc(typeof h === "string" ? h : h.text || h.raw || ""); } } });

  function get(path, asText) {
    return fetch(API + path).then(function (r) {
      if (!r.ok) throw new Error(path + " -> " + r.status);
      return asText ? r.text() : r.json();
    });
  }
  function q(rev) { return "file=" + encodeURIComponent(file) + (rev ? "&rev=" + rev : ""); }
  function text(rev) {
    if (cache[rev] != null && rev !== "WORKING") return Promise.resolve(cache[rev]);
    return get("/git/show?" + q(rev), true).then(function (t) { return (cache[rev] = t.replace(/\r\n/g, "\n")); });
  }

  function splitFm(src) {
    var m = src.match(/^---\n([\s\S]*?)\n---\n?/);
    return m ? { fm: m[1], body: src.slice(m[0].length) } : { fm: "", body: src };
  }
  function fmFields(fm) {
    var o = {}, key = null;
    fm.split("\n").forEach(function (line) {
      var m = line.match(/^([A-Za-z_][\w-]*):(.*)$/);
      if (m) { key = m[1]; o[key] = m[2]; } else if (key) o[key] += "\n" + line;
    });
    Object.keys(o).forEach(function (k) { o[k] = o[k].trim(); });
    return o;
  }
  function blocks(body) {
    // blank-line separated blocks; blank lines inside code fences do not split
    var res = [], cur = [], fence = false;
    body.split("\n").forEach(function (line) {
      if (/^\s*(```|~~~)/.test(line)) fence = !fence;
      if (!fence && line.trim() === "") { if (cur.length) { res.push(cur.join("\n")); cur = []; } }
      else cur.push(line);
    });
    if (cur.length) res.push(cur.join("\n"));
    return res;
  }
  var INS_A = "", INS_B = "", DEL_A = "", DEL_B = "";
  function fixMarks(html) {
    return html.split(INS_A).join("<ins>").split(INS_B).join("</ins>").split(DEL_A).join("<del>").split(DEL_B).join("</del>");
  }
  function cell(cls, src) {
    var d = document.createElement("div");
    d.className = "cmp-cell " + (cls || "");
    d.innerHTML = fixMarks(marked.parse(src));
    return d;
  }
  function row(l, r) {
    var d = document.createElement("div");
    d.className = "cmp-row";
    d.appendChild(l || document.createElement("div"));
    if (r !== undefined) d.appendChild(r || document.createElement("div"));
    return d;
  }
  function wordMarked(a, b) {
    return Diff.diffWordsWithSpace(a, b).map(function (p) {
      return p.added ? INS_A + p.value + INS_B : p.removed ? DEL_A + p.value + DEL_B : p.value;
    }).join("");
  }
  function headCell(t) {
    var d = document.createElement("div");
    d.className = "cmp-cell cmp-heads";
    d.textContent = t;
    return d;
  }

  function renderFm(a, b) {
    var fa = fmFields(a), fb = fmFields(b), keys = {};
    Object.keys(fa).concat(Object.keys(fb)).forEach(function (k) { keys[k] = 1; });
    var changed = Object.keys(keys).filter(function (k) { return fa[k] !== fb[k]; });
    fmBox.textContent = "";
    if (!changed.length) return;
    var box = document.createElement("div");
    box.className = "cmp-fm";
    var h = document.createElement("b");
    h.textContent = "Front matter changed: " + changed.join(", ");
    box.appendChild(h);
    var clip = function (s) { s = s == null ? "(none)" : s; return s.length > 200 ? s.slice(0, 200) + "..." : s; };
    changed.forEach(function (k) {
      var p = document.createElement("div");
      var o = document.createElement("code"); o.className = "old"; o.textContent = clip(fa[k]);
      var n = document.createElement("code"); n.className = "new"; n.textContent = clip(fb[k]);
      p.appendChild(document.createTextNode(k + ": "));
      p.appendChild(o); p.appendChild(document.createTextNode(" → ")); p.appendChild(n);
      box.appendChild(p);
    });
    fmBox.appendChild(box);
  }

  function renderSide(a, b) {
    out.appendChild(row(headCell("Left: " + selL.selectedOptions[0].textContent), headCell("Right: " + selR.selectedOptions[0].textContent)));
    Diff.diffArrays(blocks(a), blocks(b)).forEach(function (c) {
      c.value.forEach(function (blk) {
        if (c.removed) out.appendChild(row(cell("cmp-del", blk), null));
        else if (c.added) out.appendChild(row(null, cell("cmp-add", blk)));
        else out.appendChild(row(cell("cmp-same", blk), cell("cmp-same", blk)));
      });
    });
  }

  function renderChanges(a, b) {
    out.classList.add("cmp-single");
    var parts = Diff.diffArrays(blocks(a), blocks(b));
    for (var i = 0; i < parts.length; i++) {
      var c = parts[i];
      if (!c.added && !c.removed) { c.value.forEach(function (blk) { out.appendChild(row(cell("cmp-same", blk))); }); continue; }
      if (c.removed && parts[i + 1] && parts[i + 1].added) {
        var rem = c.value, add = parts[i + 1].value, n = Math.max(rem.length, add.length);
        for (var j = 0; j < n; j++) {
          if (rem[j] != null && add[j] != null) out.appendChild(row(cell("", wordMarked(rem[j], add[j]))));
          else if (rem[j] != null) out.appendChild(row(cell("cmp-del", DEL_A + rem[j] + DEL_B)));
          else out.appendChild(row(cell("cmp-add", INS_A + add[j] + INS_B)));
        }
        i++;
      } else if (c.removed) {
        c.value.forEach(function (blk) { out.appendChild(row(cell("cmp-del", DEL_A + blk + DEL_B))); });
      } else {
        c.value.forEach(function (blk) { out.appendChild(row(cell("cmp-add", INS_A + blk + INS_B))); });
      }
    }
  }

  function postUrl(fm) {
    var f = fmFields(fm), slug = file.replace(/^.*\//, "").replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
    var personal = /^_personal\//.test(file);
    if (f.published === "false") return (personal ? "/drafts/personal/" : "/drafts/") + slug + "/";
    var pl = (f.permalink || "").replace(/^["']|["']$/g, "");
    if (pl) return pl;
    return (personal ? "/personal/" : "/") + slug + "/";
  }

  function render() {
    var lv = selL.value, rv = selR.value;
    Array.prototype.forEach.call(document.querySelectorAll(".cmp-tabs button"), function (b) {
      b.setAttribute("aria-pressed", b.dataset.mode === mode ? "true" : "false");
    });
    out.textContent = ""; out.className = ""; fmBox.textContent = "";
    selL.parentNode.style.display = selR.parentNode.style.display = mode === "full" ? "none" : "";
    Promise.all([text(lv), text(rv)]).then(function (t) {
      status.textContent = "";
      var A = splitFm(t[0]), B = splitFm(t[1]);
      if (mode === "full") {
        var fr = document.createElement("iframe");
        fr.className = "cmp-frame";
        fr.src = postUrl(B.fm);
        out.appendChild(fr);
        status.textContent = "Showing the current rendered post (" + fr.getAttribute("src") + "). Select text to comment.";
        return;
      }
      renderFm(A.fm, B.fm);
      if (t[0] === t[1]) status.textContent = "These two versions are identical.";
      if (mode === "side") renderSide(A.body, B.body); else renderChanges(A.body, B.body);
    }).catch(function (e) { status.textContent = "Could not load: " + e.message + ". Is the comment server on 127.0.0.1:8095 running (npm start)?"; });
  }

  Array.prototype.forEach.call(document.querySelectorAll(".cmp-tabs button"), function (b) {
    b.addEventListener("click", function () {
      mode = b.dataset.mode;
      try { localStorage.setItem(MODE_KEY, mode); } catch (e) {}
      render();
    });
  });
  selL.addEventListener("change", render);
  selR.addEventListener("change", render);

  get("/git/log?" + q()).then(function (l) {
    var opts = [{ v: "WORKING", t: "Working copy (on disk now)" }].concat(l.map(function (c) {
      return { v: c.hash, t: c.date.slice(0, 10) + " " + c.hash + " " + c.subject };
    }));
    [selL, selR].forEach(function (s) {
      opts.forEach(function (o) { var e = document.createElement("option"); e.value = o.v; e.textContent = o.t; s.appendChild(e); });
    });
    selR.value = "WORKING";
    if (!l.length) { selL.value = "WORKING"; return render(); }
    // Default left: the version before the last change. If the disk copy differs from the last
    // commit, the last change is the uncommitted one, so compare against the last commit.
    return Promise.all([text("WORKING"), text(l[0].hash)]).then(function (t) {
      selL.value = t[0] !== t[1] || !l[1] ? l[0].hash : l[1].hash;
      render();
    });
  }).catch(function (e) { status.textContent = "Could not load history: " + e.message + ". Is the comment server on 127.0.0.1:8095 running (npm start)?"; });
})();
