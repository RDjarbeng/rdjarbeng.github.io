#!/usr/bin/env node
// Triage for agent edits to posts. Compares each changed post with its
// version at a git ref and reports links/embeds that were lost, how much the
// post grew, and decorative ASCII boxes that were added. Writes a Markdown
// report listing every lost link with the original line it came from, so an
// editing agent can put it back in context.
//
//   node scripts/check-edits.mjs [files...] [--base=HEAD] [--report=path]
//                                [--json=path] [--fetch]
//
// With no files, checks every post under _posts/ that differs from --base.
// --fetch also requests every newly added URL and flags ones that fail.

import fs from "node:fs";
import { execFileSync } from "node:child_process";

const args = process.argv.slice(2);
const opt = (name, def) => {
  const a = args.find((x) => x.startsWith(`--${name}=`));
  return a ? a.slice(name.length + 3) : def;
};
const base = opt("base", "HEAD");
const reportPath = opt("report", null);
const jsonPath = opt("json", null);
const doFetch = args.includes("--fetch");
let files = args.filter((a) => !a.startsWith("--"));

const git = (...a) => execFileSync("git", a, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });

if (!files.length) {
  files = git("diff", "--name-only", base, "--", "_posts").split("\n").filter(Boolean);
}

// Not real links: placeholders, embed scripts, shortened tweet media, and the
// favicon images Gemini pastes next to each citation.
const IGNORE = [/^example\.com/, /^platform\.twitter\.com\//, /^t\.co\//, /^t\d\.gstatic\.com\/faviconV2/];
// Query parameters that only track where a click came from.
const TRACKING = /^(utm_\w+|s|si|t|ref|ref_src|img_index|feature)$/;

const URL_RE = /https?:\/\/[^\s<>"'`)\]]+/g;

// One key per thing a reader can follow, so the same tweet or video written
// two different ways (bare link vs embed) counts as kept.
function linkKey(raw) {
  let u;
  try {
    u = new URL(raw.replace(/[.,;:!?*_]+$/, "").replace(/\\~/g, "~"));
  } catch {
    return null;
  }
  // https://www.google.com/search?q=<real url> is a bad paste of the real URL.
  if (/(^|\.)google\.\w+$/.test(u.hostname) && u.pathname === "/search") {
    let q = u.searchParams.get("q");
    if (q) {
      q = q.replace(/^httpsD:\/\//i, "https://");
      if (/^https?:\/\//.test(q)) return linkKey(q);
    }
  }
  const host = u.hostname.replace(/^www\.|^m\./, "");
  let m;
  if (host === "youtu.be") return `youtube:${u.pathname.slice(1)}`;
  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    if (u.searchParams.get("v")) return `youtube:${u.searchParams.get("v")}`;
    if ((m = u.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]+)/))) return `youtube:${m[1]}`;
  }
  if ((host === "x.com" || host === "twitter.com") && (m = u.pathname.match(/\/status\/(\d+)/))) {
    return `tweet:${m[1]}`;
  }
  if (host === "instagram.com" && (m = u.pathname.match(/^\/(?:p|reel)\/([\w-]+)/))) {
    return `instagram:${m[1]}`;
  }
  if (host === "tiktok.com" && (m = u.pathname.match(/\/video\/(\d+)/))) return `tiktok:${m[1]}`;
  for (const k of [...u.searchParams.keys()]) if (TRACKING.test(k)) u.searchParams.delete(k);
  u.searchParams.sort();
  const key = host + decodeURIComponentSafe(u.pathname).replace(/\/+$/, "") + (u.search || "");
  return IGNORE.some((re) => re.test(key)) ? null : key;
}

function decodeURIComponentSafe(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

// key -> { url, line } for every link in a post (first occurrence wins).
function links(text) {
  const out = new Map();
  for (const line of text.split("\n")) {
    // "[url](url)" gets matched as one run; split it back into its parts.
    for (const match of line.match(URL_RE) || []) {
      for (const part of match.split("](")) {
        const key = linkKey(part);
        if (key && !out.has(key)) out.set(key, { url: part, line: line.trim() });
      }
    }
  }
  return out;
}

const body = (text) => text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
const words = (text) => (body(text).match(/\S+/g) || []).length;
// Box-drawing characters, or "+----+" / "|  ...  |" style ASCII tables.
const asciiLines = (text) =>
  body(text).split("\n").filter((l) => /[┌┐└┘├┤┬┴┼│─═║]/.test(l) || /^\s*\+[-=+]{6,}\+\s*$/.test(l)).length;

async function urlWorks(url) {
  for (const method of ["HEAD", "GET"]) {
    try {
      const res = await fetch(url, { method, redirect: "follow", signal: AbortSignal.timeout(10000) });
      if (res.ok) return true;
      // Sites that block bots answer 403/429; that's not proof the link is dead.
      if (res.status === 403 || res.status === 429) return null;
    } catch {
      // try GET next, or give up
    }
  }
  return false;
}

const results = [];
for (const file of files) {
  let before = "";
  try {
    before = git("show", `${base}:${file}`);
  } catch {
    // new file: nothing to compare against
  }
  // A writer note (scripts/writer-note.mjs) quotes the original, so its links
  // and words would hide what the post itself lost.
  const after = (fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "")
    .replace(/<!-- WRITER NOTE[\s\S]*?END WRITER NOTE -->/, "");
  const oldLinks = links(before);
  const newLinks = links(after);
  const lost = [...oldLinks].filter(([k]) => !newLinks.has(k)).map(([, v]) => v);
  const added = [...newLinks].filter(([k]) => !oldLinks.has(k)).map(([, v]) => v.url);
  const r = {
    file,
    wordsBefore: words(before),
    wordsAfter: words(after),
    lost,
    added,
    asciiAdded: Math.max(0, asciiLines(after) - asciiLines(before)),
    deadAdded: [],
  };
  if (doFetch) {
    for (const url of added) if ((await urlWorks(url)) === false) r.deadAdded.push(url);
  }
  r.growth = r.wordsBefore ? +(r.wordsAfter / r.wordsBefore).toFixed(1) : null;
  r.flags = [
    // Posts are meant to be expanded, so only shrinking is suspicious.
    r.growth !== null && r.growth < 0.7 && `shrank to ${Math.round(r.growth * 100)}% of its length`,
    r.lost.length && `${r.lost.length} lost link(s)`,
    r.asciiAdded && `${r.asciiAdded} ASCII box line(s) added`,
    r.deadAdded.length && `${r.deadAdded.length} dead new link(s)`,
  ].filter(Boolean);
  results.push(r);
}

results.sort((a, b) => b.lost.length - a.lost.length || b.asciiAdded - a.asciiAdded);

const name = (f) => f.replace(/^_posts\//, "").replace(/\.md$/, "");
console.log("lost  ascii  growth  post");
for (const r of results) {
  const growth = r.growth === null ? "new" : `${r.growth}x`;
  console.log(`${String(r.lost.length).padStart(4)}  ${String(r.asciiAdded).padStart(5)}  ${growth.padStart(6)}  ${name(r.file)}`);
}
const flagged = results.filter((r) => r.flags.length).length;
console.log(`\n${results.length} post(s) checked, ${flagged} flagged.`);

if (reportPath) {
  const md = ["# Edit check", "", `Compared against \`${base}\`.`, ""];
  for (const r of results.filter((x) => x.flags.length)) {
    md.push(`## ${r.file}`, "", `${r.wordsBefore} → ${r.wordsAfter} words. ${r.flags.join(", ")}.`, "");
    if (r.lost.length) {
      md.push("Lost links (put each back where it fits, or say why it should go):", "");
      for (const l of r.lost) md.push(`- ${l.url}`, `  - original line: ${l.line.slice(0, 240)}`);
      md.push("");
    }
    if (r.deadAdded.length) {
      md.push("New links that did not load:", "", ...r.deadAdded.map((u) => `- ${u}`), "");
    }
  }
  fs.writeFileSync(reportPath, md.join("\n"));
  console.log(`Report written to ${reportPath}`);
}
if (jsonPath) {
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
  console.log(`JSON written to ${jsonPath}`);
}
