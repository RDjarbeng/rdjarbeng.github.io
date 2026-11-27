#!/usr/bin/env node
// Record which posts a Claude session is working on, for the /review/ page (dev only).
//   node scripts/review-set.mjs <set-id> "<title>" <file.md> [more.md...]   add files to a set
//   node scripts/review-set.mjs <set-id> --clear                             delete a set
// Sets live in review/sets/<set-id>.json (git-ignored).
import fs from "node:fs";
import path from "node:path";

const [id, ...rest] = process.argv.slice(2);
if (!id) { console.log("usage: review-set.mjs <set-id> \"<title>\" <files...> | --clear"); process.exit(1); }
const dir = path.join(process.cwd(), "review", "sets");
const file = path.join(dir, `${id.replace(/[^a-z0-9-]/gi, "-")}.json`);
if (rest[0] === "--clear") { fs.rmSync(file, { force: true }); console.log(`cleared ${id}`); process.exit(0); }
fs.mkdirSync(dir, { recursive: true });
const set = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : { title: id, files: [] };
const files = rest.filter((a) => a.endsWith(".md"));
const title = rest.find((a) => !a.endsWith(".md"));
if (title) set.title = title;
for (const raw of files) { const f = raw.split(String.fromCharCode(92)).join("/"); if (!set.files.includes(f)) set.files.push(f); }
set.updated = new Date().toISOString();
fs.writeFileSync(file, JSON.stringify(set, null, 1) + "\n");
console.log(`${id}: ${set.files.length} files`);
