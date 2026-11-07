#!/usr/bin/env node
// Puts the author's original draft at the top of an edited post, inside an
// HTML comment, so the point the post was meant to make is not lost while the
// expanded version is reviewed. The comment never shows on the page, and the
// build warns if a published post still has one.
//
//   node scripts/writer-note.mjs <posts...> [--base=HEAD]   add the note
//   node scripts/writer-note.mjs <posts...> --remove        take it out again
//   node scripts/writer-note.mjs --changed [--max-words=200]
//       add the note to every unpublished post that differs from --base and
//       whose original body was shorter than --max-words
//
// The original comes from the post as it was at --base. Posts that already
// have a note are left alone.

import fs from "node:fs";
import { execFileSync } from "node:child_process";

const START = "<!-- WRITER NOTE";
const END = "END WRITER NOTE -->";

const args = process.argv.slice(2);
const base = (args.find((a) => a.startsWith("--base=")) || "--base=HEAD").slice(7);
const remove = args.includes("--remove");
const changed = args.includes("--changed");
const maxWords = Number((args.find((a) => a.startsWith("--max-words=")) || "=200").split("=")[1]);
let files = args.filter((a) => !a.startsWith("--"));

const FRONT = /^(---\r?\n[\s\S]*?\r?\n---\r?\n)([\s\S]*)$/;
const NOTE = /<!-- WRITER NOTE[\s\S]*?END WRITER NOTE -->\r?\n*/;
const git = (...a) => execFileSync("git", a, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });

if (changed) {
  files = git("diff", "--name-only", base, "--", "_posts").split("\n").filter((file) => {
    if (!file || !fs.existsSync(file)) return false;
    if (/^published:\s*true\s*$/m.test(fs.readFileSync(file, "utf8"))) return false;
    let original;
    try {
      original = git("show", `${base}:${file}`);
    } catch {
      return false;
    }
    const [, , body] = original.match(FRONT) || [, "", original];
    const words = (body.match(/\S+/g) || []).length;
    return words > 0 && words < maxWords;
  });
}

if (!files.length) {
  if (changed) process.exit(0);
  console.error("Usage: node scripts/writer-note.mjs <posts...> [--base=HEAD] [--remove] | --changed [--max-words=200]");
  process.exit(2);
}

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const nl = text.includes("\r\n") ? "\r\n" : "\n";
  const [, front, body] = text.match(FRONT) || [, "", text];

  if (remove) {
    if (!NOTE.test(body)) continue;
    fs.writeFileSync(file, front + body.replace(NOTE, ""));
    console.log(`removed  ${file}`);
    continue;
  }
  if (body.includes(START)) {
    console.log(`has note ${file}`);
    continue;
  }

  let original;
  try {
    original = git("show", `${base}:${file}`);
  } catch {
    console.log(`no original at ${base}: ${file}`);
    continue;
  }
  const [, , origBody] = original.match(FRONT) || [, "", original];
  // A "-->" inside the draft would end the comment early.
  const kept = origBody.trim().replace(/-->/g, "-- >").replace(/<!--/g, "< !--");
  if (!kept) {
    console.log(`empty original: ${file}`);
    continue;
  }
  const note = [
    `${START} (for the writer only, remove before publishing)`,
    "Original draft, kept so you remember where this post was going:",
    "",
    kept,
    "",
    END,
    "",
    "",
  ].join("\n").replace(/\r?\n/g, nl);
  fs.writeFileSync(file, front + note + body.replace(/^\s+/, ""));
  console.log(`added    ${file}`);
}
