// Dev server launcher used by `npm run serve:11ty`.
//
// Why: when eleventy.config.js changes, Eleventy reloads the config inside the same process,
// and the previous config's build stays reachable. Measured on 2026-11-22: heap after GC went
// 453 MB -> 810 MB on the first config edit, then +18 MB per edit, so a session with many
// config edits ran into the 3 GB memory guard. Ordinary content edits do not grow memory.
//
// What this does: runs the Eleventy dev server as a child process, and when the config (or
// code it loads from lib/) changes, stops that process and starts a fresh one. Memory returns
// to the normal baseline after every restart. Content edits are still handled by Eleventy's
// own fast incremental rebuilds; this only reacts to config and lib/ changes.
//
// Sleep: measured on 2026-11-23, the server died overnight with no edits. When the PC wakes from
// Modern Standby, Eleventy's watcher reports files as changed that nobody touched, and a rebuild
// cut short by the next sleep pushed the process from about 900 MB to over 3 GB (the JS heap stayed
// near 450 MB, so the growth is native memory). The launcher now restarts the server with a fresh
// process after every wake, and brings it back if it stops on its own after running a while.
const { spawn } = require("child_process");
const http = require("http");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const watched = [path.join(root, "eleventy.config.js"), path.join(root, "lib")];

const nodeArgs = [
  "--max-old-space-size=2048",
  "--expose-gc",
  "-r", path.join(__dirname, "dev-memory-guard.cjs"),
  path.join(root, "node_modules", "@11ty", "eleventy", "cmd.cjs"),
  "--serve",
  "--incremental",
  ...process.argv.slice(2),
];

let child = null;
let restarting = false;
let debounce = null;
let startedAt = 0;
const recoveries = []; // times the server was brought back after stopping on its own

function start() {
  startedAt = Date.now();
  child = spawn(process.execPath, nodeArgs, { cwd: root, stdio: "inherit", env: process.env });
  child.on("exit", (code) => {
    if (restarting) return;
    // The server stopped on its own (the memory guard, or a crash). If it had been running a while,
    // bring it back, up to 3 times in 30 minutes. A failure at startup is a real error: exit with it.
    const now = Date.now();
    while (recoveries.length && now - recoveries[0] > 30 * 60000) recoveries.shift();
    if (now - startedAt > 2 * 60000 && recoveries.length < 3) {
      recoveries.push(now);
      console.log(`\n[dev] The dev server stopped (exit code ${code}). Starting a fresh one.\n`);
      start();
      return;
    }
    process.exit(code === null ? 1 : code);
  });
}

function restart(reason, delay = 300) {
  clearTimeout(debounce);
  debounce = setTimeout(() => {
    console.log(`\n[dev] ${reason}: restarting the dev server with a fresh process\n`);
    restarting = true;
    const old = child;
    old.once("exit", () => {
      restarting = false;
      start();
    });
    old.kill();
  }, delay);
}

// Detect sleep: this timer runs every 5 s, so a much longer gap means the computer was asleep.
let lastTick = Date.now();
setInterval(() => {
  const now = Date.now();
  const gap = now - lastTick;
  lastTick = now;
  if (gap > 60000) restart(`The computer was asleep for about ${Math.round(gap / 60000)} min`, 10000);
}, 5000).unref();

// On Windows fs.watch can fire when a file is only read (Eleventy reads lib/ at startup),
// so restart only when a file's modification time really changed.
const mtimes = new Map();
const mtimeOf = (f) => { try { return fs.statSync(f).mtimeMs; } catch (e) { return 0; } };
const remember = (dir) => {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name);
    if (name.isDirectory()) remember(full);
    else mtimes.set(full, mtimeOf(full));
  }
};

for (const target of watched) {
  if (!fs.existsSync(target)) continue;
  const isDir = fs.statSync(target).isDirectory();
  if (isDir) remember(target); else mtimes.set(target, mtimeOf(target));
  fs.watch(target, isDir ? { recursive: true } : {}, (_event, name) => {
    const file = isDir && name ? path.join(target, name) : target;
    const now = mtimeOf(file);
    if (now === mtimes.get(file)) return; // read, not a change
    mtimes.set(file, now);
    restart(`${path.relative(root, file)} changed`);
  });
}

// Review comments (dev only): a tiny server on 127.0.0.1:8095 that stores highlight-and-comment
// notes from assets/js/review-mode.js in review/comments.json (git-ignored). Read them with
// `npm run review:comments`. Lives in this launcher, so it survives Eleventy restarts.
const REVIEW_PORT = 8095;
const reviewDir = path.join(root, "review");
const reviewFile = path.join(reviewDir, "comments.json");
const readComments = () => { try { return JSON.parse(fs.readFileSync(reviewFile, "utf8")); } catch (e) { return []; } };
const writeComments = (list) => {
  fs.mkdirSync(reviewDir, { recursive: true });
  fs.writeFileSync(reviewFile, JSON.stringify(list, null, 2) + "\n");
};
const normUrl = (u) => {
  let p = String(u || "");
  try { p = new URL(p, "http://localhost").pathname; } catch (e) {}
  return p.endsWith("/") || /\.[a-z0-9]+$/i.test(p) ? p : p + "/";
};
const originOk = (o) => !o || /^http:\/\/localhost(:\d+)?$/.test(o);

const reviewServer = http.createServer((req, res) => {
  const origin = req.headers.origin;
  const send = (code, body) => {
    const headers = { "Content-Type": "application/json" };
    if (origin && originOk(origin)) {
      headers["Access-Control-Allow-Origin"] = origin;
      headers["Vary"] = "Origin";
      headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
      headers["Access-Control-Allow-Headers"] = "Content-Type";
    }
    res.writeHead(code, headers);
    res.end(JSON.stringify(body));
  };
  if (!originOk(origin)) return send(403, { error: "origin not allowed" });
  if (req.method === "OPTIONS") return send(204, {});
  const u = new URL(req.url, "http://127.0.0.1");
  const resolve = u.pathname.match(/^\/comments\/([\w-]+)\/resolve$/);

  if (req.method === "GET" && u.pathname === "/comments") {
    let list = readComments();
    const url = u.searchParams.get("url");
    const status = u.searchParams.get("status");
    if (url) list = list.filter((c) => c.url === normUrl(url));
    if (status) list = list.filter((c) => c.status === status);
    return send(200, list);
  }
  if (req.method === "POST" && (u.pathname === "/comments" || resolve)) {
    let raw = "";
    req.on("data", (d) => { raw += d; if (raw.length > 1e6) req.destroy(); });
    req.on("end", () => {
      let data = {};
      try { data = raw ? JSON.parse(raw) : {}; } catch (e) { return send(400, { error: "bad JSON" }); }
      const list = readComments();
      if (resolve) {
        const c = list.find((x) => x.id === resolve[1]);
        if (!c) return send(404, { error: "not found" });
        c.status = "resolved";
        c.resolved = new Date().toISOString();
        writeComments(list);
        return send(200, c);
      }
      if (!data.url || !data.quote || !data.comment) return send(400, { error: "url, quote and comment are required" });
      const str = (v, n) => String(v || "").slice(0, n);
      const c = {
        id: crypto.randomBytes(4).toString("hex"),
        created: new Date().toISOString(),
        status: "open",
        url: normUrl(data.url),
        title: str(data.title, 300),
        quote: str(data.quote, 5000),
        prefix: str(data.prefix, 200),
        suffix: str(data.suffix, 200),
        comment: str(data.comment, 5000),
      };
      list.push(c);
      writeComments(list);
      return send(201, c);
    });
    return;
  }
  send(404, { error: "not found" });
});
reviewServer.on("error", (e) => console.log(`[review] comment server not started: ${e.message}`));
reviewServer.listen(REVIEW_PORT, "127.0.0.1", () => console.log(`[review] comments server on http://127.0.0.1:${REVIEW_PORT} (file: review/comments.json)`));

const stop = () => { if (child) child.kill(); process.exit(0); };
process.on("SIGINT", stop);
process.on("SIGTERM", stop);

start();
