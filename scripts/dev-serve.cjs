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

const stop = () => { if (child) child.kill(); process.exit(0); };
process.on("SIGINT", stop);
process.on("SIGTERM", stop);

start();
