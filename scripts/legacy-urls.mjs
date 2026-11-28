#!/usr/bin/env node
// Keeps every URL the Jekyll site published working after the move to Eleventy.
//
//   node scripts/legacy-urls.mjs [_site]          write redirect pages for old URLs that no
//                                                 longer exist (runs as part of `npm run build`)
//   node scripts/legacy-urls.mjs [_site] --check  fail if any old URL still has no page,
//                                                 file or redirect (runs on deploy)
//
// The old URLs come from scripts/data/jekyll-baseline-urls.txt (the last Jekyll sitemap).
// Missing URLs are resolved in this order:
//   1. scripts/data/legacy-urls-allow.json "redirect" (explicit old -> new)
//   2. /tags/<x>/        -> /tags/?tag=<x>  (tags with < 3 posts no longer get a page;
//                                            the tag view lists their posts)
//   3. .../page-N/       -> the listing's first page, if it exists (pagination changed)
//   4. a renamed page in the same folder whose slug matches once case, apostrophes and
//      hyphens are ignored (e.g. /africa-s-tech.../ -> /africas-tech.../), if exactly one
//   5. scripts/data/legacy-urls-allow.json "gone" (meant to 404, with a reason)
// Anything left is a migration gap: --check exits 1 and lists it.
//
// Why: Jekyll plugins (pagination, archives, redirect_from) produced URLs that nothing in
// Eleventy recreated, and they 404'd silently. This makes that kind of gap fail the deploy.

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const check = args.includes("--check");
const site = args.find((a) => !a.startsWith("--")) || "_site";
const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));

const baseline = fs.readFileSync(path.join(here, "data/jekyll-baseline-urls.txt"), "utf8")
  .split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
const allow = JSON.parse(fs.readFileSync(path.join(here, "data/legacy-urls-allow.json"), "utf8"));

const fileFor = (url) => path.join(site, decodeURIComponent(url).replace(/\/$/, "/index.html"));
const exists = (url) => {
  const f = fileFor(url.split("?")[0]);
  return fs.existsSync(f) || (!url.endsWith("/") && fs.existsSync(path.join(f, "index.html")));
};

// Folder -> { normalised slug -> [urls] } for rule 4, built lazily per folder.
const norm = (s) => s.toLowerCase().replace(/[’'‘​]/g, "").replace(/[^a-z0-9]+/g, "");
const folderIndex = new Map();
function renamedMatch(url) {
  const m = url.match(/^(.*\/)([^/]+)\/$/);
  if (!m) return null;
  const [, parent, slug] = m;
  if (!folderIndex.has(parent)) {
    const dir = path.join(site, parent);
    const idx = new Map();
    if (fs.existsSync(dir)) {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        if (!e.isDirectory() || !fs.existsSync(path.join(dir, e.name, "index.html"))) continue;
        // Skip our own redirect stubs so a stub never points at another stub.
        const html = fs.readFileSync(path.join(dir, e.name, "index.html"), "utf8").slice(0, 400);
        if (html.includes('http-equiv="refresh"')) continue;
        const k = norm(e.name);
        idx.set(k, [...(idx.get(k) || []), `${parent}${e.name}/`]);
      }
    }
    folderIndex.set(parent, idx);
  }
  const hits = folderIndex.get(parent).get(norm(slug)) || [];
  return hits.length === 1 ? hits[0] : null;
}

function resolve(url) {
  if (allow.redirect?.[url]) return { to: allow.redirect[url], rule: "allow-list" };
  const tag = url.match(/^\/tags\/([^/]+)\/$/);
  if (tag) return { to: `/tags/?tag=${tag[1]}`, rule: "small tag" };
  const pg = url.match(/^(.*\/)page-\d+\/$/);
  if (pg && exists(pg[1])) return { to: pg[1], rule: "pagination" };
  const ren = renamedMatch(url);
  if (ren) return { to: ren, rule: "renamed" };
  if (allow.gone?.[url]) return { gone: allow.gone[url] };
  return null;
}

const stub = (to) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Moved</title>
<link rel="canonical" href="https://rdjarbeng.com${to}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${to}">
<script>location.replace(${JSON.stringify(to)} + location.hash);</script>
</head>
<body><p>This page has moved to <a href="${to}">${to}</a>.</p></body>
</html>
`;

const counts = {};
const gaps = [];
let written = 0;
for (const url of baseline) {
  if (exists(url)) continue;
  const r = resolve(url);
  if (!r) { gaps.push(url); continue; }
  if (r.gone) { counts.gone = (counts.gone || 0) + 1; continue; }
  counts[r.rule] = (counts[r.rule] || 0) + 1;
  if (check) { gaps.push(`${url}  (would redirect to ${r.to}; run the build, which writes it)`); continue; }
  if (!url.endsWith("/")) { gaps.push(`${url}  (old file URL; add the file back or list it under "gone")`); continue; }
  const f = fileFor(url);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, stub(r.to));
  written++;
}

const summary = Object.entries(counts).map(([k, v]) => `${v} ${k}`).join(", ") || "none";
if (check) {
  if (gaps.length) {
    console.error(`[legacy-urls] ${gaps.length} old Jekyll URL(s) no longer resolve:`);
    for (const g of gaps.slice(0, 50)) console.error(`  ${g}`);
    if (gaps.length > 50) console.error(`  ... and ${gaps.length - 50} more`);
    console.error(`Fix: recreate the page, or add it to scripts/data/legacy-urls-allow.json ("redirect" or "gone" with a reason).`);
    process.exit(1);
  }
  console.log(`[legacy-urls] all ${baseline.length} old Jekyll URLs resolve.`);
} else {
  console.log(`[legacy-urls] wrote ${written} redirect page(s) (${summary}).`);
  if (gaps.length) {
    console.warn(`[legacy-urls] ${gaps.length} old URL(s) have no target; \`npm run check:legacy-urls\` will fail:`);
    for (const g of gaps.slice(0, 20)) console.warn(`  ${g}`);
  }
}
