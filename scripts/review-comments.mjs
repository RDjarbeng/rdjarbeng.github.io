// Prints open review comments as Markdown, or marks one resolved.
//   node scripts/review-comments.mjs                 list open comments
//   node scripts/review-comments.mjs --resolve <id>  mark one resolved
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "review", "comments.json");
const read = () => { try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch { return []; } };
const args = process.argv.slice(2);
const i = args.indexOf("--resolve");

if (i >= 0) {
  const id = args[i + 1];
  const list = read();
  const c = list.find((x) => x.id === id);
  if (!c) { console.error(`No comment with id ${id}`); process.exit(1); }
  c.status = "resolved";
  c.resolved = new Date().toISOString();
  fs.writeFileSync(file, JSON.stringify(list, null, 2) + "\n");
  console.log(`Resolved ${id}`);
} else {
  const open = read().filter((c) => c.status === "open");
  if (!open.length) { console.log("No open comments."); process.exit(0); }
  const byUrl = {};
  for (const c of open) (byUrl[c.url] ||= []).push(c);
  for (const [url, list] of Object.entries(byUrl)) {
    console.log(`## ${list[0].title || url}\n\nPage: ${url}\n`);
    for (const c of list) {
      console.log(`- Quote: "${c.quote}"`);
      console.log(`  Comment: ${c.comment.replace(/\n/g, "\n    ")}`);
      console.log(`  Id: ${c.id}\n`);
    }
  }
}
