#!/usr/bin/env node
// Fails the build when a paginated listing renders everything on one page.
// Catches the failure where a listing loses its pager data (as the video hubs
// did when the Jekyll pagination plugin was removed): the template then falls
// back to "all items" and nothing else errors.
//
// For every built page under the listing sections below it checks that
//   1. it renders at most MAX_CARDS listing cards, and
//   2. if a page-2/ exists beside it, both it and page-2/ have a pager.
//
//   node scripts/check-pagination.mjs [siteDir=_site]

import fs from "node:fs";
import path from "node:path";

const siteDir = path.resolve(process.argv[2] || "_site");
const SECTIONS = ["posts", "personal", "gallery"];
const MAX_CARDS = 48;
// Listing cards in the main grid (rails and featured rows use other classes).
const CARD = /class="(?:video-masonry-item|yt-card|post-card|gallery-item)[\s"]/g;
const PAGER = /class="paginator"/;
// Pages meant to show a whole set at once: the gallery and memes walls, and
// playlist collections. Category pages with subfolders render as one
// dashboard and say so by hiding the pager (NESTED below).
const ALLOW_MANY = [/^\/gallery\/$/, /^\/gallery\/memes\/$/, /^\/gallery\/videos\/collections\//];
const NESTED = /\.pagination-wrapper, \.paginator \{ display: none/;
// Redirect pages (old Jekyll page-N/ URLs, written by scripts/legacy-urls.mjs) are not listings.
const REDIRECT = /http-equiv="refresh"/;

if (!fs.existsSync(siteDir)) {
  console.error(`[pagination] ${siteDir} does not exist. Build the site first.`);
  process.exit(2);
}

const problems = [];
let checked = 0;

function visit(dir, url) {
  const index = path.join(dir, "index.html");
  const html = fs.existsSync(index) ? fs.readFileSync(index, "utf8").replace(/<!--[\s\S]*?-->/g, "") : "";
  if (html && !REDIRECT.test(html.slice(0, 600))) {
    checked++;
    const cards = (html.match(CARD) || []).length;
    const allowed = ALLOW_MANY.some((re) => re.test(url)) || NESTED.test(html);
    if (cards > MAX_CARDS && !allowed) {
      problems.push(`${url} renders ${cards} cards (max ${MAX_CARDS}); its pager data is probably missing`);
    }
    const next = path.join(dir, "page-2", "index.html");
    if (fs.existsSync(next) && !REDIRECT.test(fs.readFileSync(next, "utf8").slice(0, 600))) {
      if (!PAGER.test(html)) problems.push(`${url} has a page-2/ but no pager`);
      if (!PAGER.test(fs.readFileSync(next, "utf8"))) problems.push(`${url}page-2/ has no pager`);
    }
  }
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) visit(path.join(dir, e.name), `${url}${e.name}/`);
  }
}

for (const s of SECTIONS) {
  const dir = path.join(siteDir, s);
  if (fs.existsSync(dir)) visit(dir, `/${s}/`);
}

if (problems.length) {
  console.error(`[pagination] ${problems.length} problem(s) in ${checked} listing pages:`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`[pagination] OK: ${checked} pages under /${SECTIONS.join("/, /")}/ checked.`);
