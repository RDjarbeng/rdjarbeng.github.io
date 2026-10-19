#!/usr/bin/env node
// Fails the build when a page links to an internal URL that the build did
// not produce. Checks href/src attributes that start with "/" in every
// built .html file. External links are not checked (too slow and flaky for
// every deploy).
//
//   node scripts/check-links.mjs [siteDir=_site] [--max-report=50]

import fs from "node:fs";
import path from "node:path";

const siteDir = path.resolve(process.argv.find((a, i) => i > 1 && !a.startsWith("--")) || "_site");
const maxReport = Number((process.argv.find((a) => a.startsWith("--max-report=")) || "=50").split("=")[1]);

// Paths served by the host or added after the build, not files in _site.
const IGNORE = [/^\/cdn-cgi\//, /^\/admin\//, /^\/\//];

const ATTR = /\b(?:href|src)\s*=\s*"(\/[^"]*)"/g;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function exists(urlPath) {
  let p;
  try {
    p = decodeURIComponent(urlPath);
  } catch {
    p = urlPath;
  }
  const local = path.join(siteDir, p);
  if (p.endsWith("/")) return fs.existsSync(path.join(local, "index.html"));
  return fs.existsSync(local) ||
    fs.existsSync(path.join(local, "index.html")) ||
    fs.existsSync(local + ".html");
}

if (!fs.existsSync(siteDir)) {
  console.error(`[links] ${siteDir} does not exist. Build the site first.`);
  process.exit(2);
}

const broken = new Map(); // url -> Set of pages linking to it
let checked = 0;
const cache = new Map();

for (const file of walk(siteDir)) {
  const html = fs.readFileSync(file, "utf8").replace(/<!--[\s\S]*?-->/g, "");
  const page = "/" + path.relative(siteDir, file).split(path.sep).join("/").replace(/index\.html$/, "");
  for (const [, raw] of html.matchAll(ATTR)) {
    if (raw.includes("${") || raw.includes("{{")) continue; // JS or template strings
    const url = raw.split("#")[0].split("?")[0];
    if (!url || IGNORE.some((re) => re.test(url))) continue;
    checked++;
    let ok = cache.get(url);
    if (ok === undefined) cache.set(url, (ok = exists(url)));
    if (!ok) {
      if (!broken.has(url)) broken.set(url, new Set());
      broken.get(url).add(page);
    }
  }
}

if (broken.size === 0) {
  console.log(`[links] OK: ${checked} internal links checked, none broken.`);
  process.exit(0);
}

const sorted = [...broken.entries()].sort((a, b) => b[1].size - a[1].size);
console.error(`[links] ${broken.size} broken internal URLs (${checked} links checked):`);
for (const [url, pages] of sorted.slice(0, maxReport)) {
  const from = [...pages];
  console.error(`  ${url}  <- ${from.length} page(s), e.g. ${from.slice(0, 2).join(", ")}`);
}
if (sorted.length > maxReport) console.error(`  ...and ${sorted.length - maxReport} more`);
process.exit(1);
