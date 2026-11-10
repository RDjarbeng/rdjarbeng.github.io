// Version history of every post, read from git, for the opt-in /journey/
// pages. Only runs under `npm run start:journey`; every other build gets an
// empty list and the journey/ templates are ignored (see eleventy.config.js).
//
// Every committed version of each post is kept, plus the uncommitted working
// copy if there is one. Milestones (starred in the version pickers) are the
// first version, every version whose length changed by a quarter or more since
// the last milestone, the last commit, and the working copy.
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const markdownIt = require("markdown-it");
const markdownItKatex = require("../scripts/markdown-it-katex.js");

// Same options and math plugin as the site's own Markdown setup.
const md = markdownIt({ html: true, breaks: false, linkify: true }).use(markdownItKatex);
const NOTE = /<!-- WRITER NOTE[\s\S]*?END WRITER NOTE -->\s*/;
const MILESTONE_CHANGE = 0.25;

const git = (args, input) =>
  execFileSync("git", args, { input, maxBuffer: 512 << 20, stdio: ["pipe", "pipe", "ignore"] });

// Reads many blobs with one `git cat-file --batch` call.
function readBlobs(shas) {
  const out = new Map();
  if (!shas.length) return out;
  const buf = git(["cat-file", "--batch"], shas.join("\n") + "\n");
  let pos = 0;
  while (pos < buf.length) {
    const eol = buf.indexOf(10, pos);
    const [sha, type, size] = buf.toString("utf8", pos, eol).split(" ");
    if (type === "missing") {
      pos = eol + 1;
      continue;
    }
    const start = eol + 1;
    out.set(sha, buf.toString("utf8", start, start + Number(size)));
    pos = start + Number(size) + 1;
  }
  return out;
}

function describe(text) {
  let parsed;
  try {
    parsed = matter(text.replace(NOTE, ""));
  } catch {
    parsed = { data: {}, content: text };
  }
  const body = parsed.content.replace(NOTE, "");
  return {
    title: String(parsed.data.title || ""),
    published: parsed.data.published !== false,
    words: (body.match(/\S+/g) || []).length,
    body,
  };
}

function render(body) {
  try {
    return md.render(body);
  } catch {
    return `<pre>${body.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c])}</pre>`;
  }
}

module.exports = function () {
  if (process.env.npm_lifecycle_event !== "serve:11ty:journey") return { posts: [] };

  // Newest first. Each commit: "\0<sha>\t<date>\t<subject>" then raw lines
  // ":<mode> <mode> <old blob> <new blob> <status>\t<path>[\t<new path>]".
  const log = git(["log", "--format=%x00%H%x09%cI%x09%s", "--raw", "--no-abbrev", "-M", "--diff-filter=AMR", "--", "_posts"]).toString("utf8");
  const history = new Map(); // current path -> versions, newest first
  const renamedTo = new Map(); // older path -> current path
  const current = (p) => renamedTo.get(p) || p;

  for (const chunk of log.split("\0").slice(1)) {
    const [head, ...lines] = chunk.split("\n");
    const [commit, date, ...subject] = head.split("\t");
    for (const line of lines) {
      if (!line.startsWith(":")) continue;
      const [meta, ...paths] = line.split("\t");
      const [, , , blob, status] = meta.split(" ");
      const file = current(paths[paths.length - 1]);
      if (status.startsWith("R")) renamedTo.set(paths[0], file);
      if (!file.endsWith(".md")) continue;
      if (!history.has(file)) history.set(file, []);
      history.get(file).push({ commit: commit.slice(0, 8), date: date.slice(0, 10), subject: subject.join("\t"), blob });
    }
  }

  const blobs = readBlobs([...new Set([...history.values()].flat().map((v) => v.blob))]);
  const posts = [];

  for (const [file, newestFirst] of history) {
    if (!fs.existsSync(file)) continue; // deleted post
    const oldestFirst = [...newestFirst].reverse();
    const versions = oldestFirst.map((v) => ({ ...v, ...describe(blobs.get(v.blob) || "") }));
    const working = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
    if (working !== (blobs.get(newestFirst[0].blob) || "").replace(/\r\n/g, "\n")) {
      versions.push({ commit: "", date: "now", subject: "Uncommitted changes", ...describe(working), uncommitted: true });
    }

    let kept = null;
    versions.forEach((v, i) => {
      const last = i === versions.length - 1;
      const lastCommit = i === versions.length - (versions[versions.length - 1].uncommitted ? 2 : 1);
      const changed = kept && Math.abs(v.words - kept.words) >= MILESTONE_CHANGE * Math.max(kept.words, 1);
      v.milestone = i === 0 || last || lastCommit || Boolean(changed);
      if (v.milestone) kept = v;
    });

    const choices = versions.map((v, i) => ({
      id: i,
      label: `${v.milestone ? "★ " : ""}${v.date}${v.uncommitted ? "" : ` · ${v.commit}`} · ${v.words} words${v.uncommitted ? " · uncommitted" : ""}`,
      subject: v.subject,
      title: v.title,
      html: render(v.body),
    }));
    const first = versions[0];
    const now = versions[versions.length - 1];

    posts.push({
      file,
      absPath: path.resolve(file).replace(/\\/g, "/"),
      slug: path.basename(file, ".md"),
      title: now.title || path.basename(file, ".md"),
      published: now.published,
      uncommitted: Boolean(now.uncommitted),
      firstDate: first.date,
      lastDate: now.uncommitted ? versions[versions.length - 2].date : now.date,
      firstWords: first.words,
      nowWords: now.words,
      count: versions.length,
      versions: choices,
    });
  }

  posts.sort((a, b) => b.uncommitted - a.uncommitted || (a.lastDate < b.lastDate ? 1 : -1));
  return { posts };
};
