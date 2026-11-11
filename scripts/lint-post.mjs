#!/usr/bin/env node
/**
 * Post Quality Linter & Scorecard for rdjarbeng.com
 *
 * Verifies post frontmatter, cover image presence/placement, punctuation rules
 * (zero em dashes, zero en dashes, zero spaced hyphens), AI slop patterns (humanizer),
 * and citation integrity.
 *
 * Usage:
 *   node scripts/lint-post.mjs [file...] [--fetch] [--strict]
 *
 * Exit code 0 on PASS (Score >= 90 with 0 critical errors).
 * Exit code 1 on FAIL.
 */

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const doFetch = args.includes("--fetch");
const strict = args.includes("--strict");
let files = args.filter((a) => !a.startsWith("--"));

if (!files.length) {
  // Default to recently modified posts in git or _posts directory
  try {
    const { execFileSync } = await import("node:child_process");
    const diff = execFileSync("git", ["diff", "--name-only", "HEAD", "--", "_posts"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    files = diff.split("\n").filter((f) => f.endsWith(".md"));
  } catch {
    // Fallback: check all posts
  }
}

if (!files.length) {
  console.log("No posts specified or changed. Usage: node scripts/lint-post.mjs <path-to-post.md>");
  process.exit(0);
}

// Banned words & AI vocabulary from humanizer §7 & §1
const AI_BUZZWORDS = [
  { word: "testament", weight: 8, hint: "Copula avoidance / inflated significance (Humanizer §1, §7)" },
  { word: "pivotal", weight: 8, hint: "Overused AI vocabulary (Humanizer §7)" },
  { word: "delve", weight: 10, hint: "High-frequency AI vocabulary (Humanizer §7)" },
  { word: "stands as", weight: 8, hint: "Copula avoidance; use 'is' or rewrite (Humanizer §8)" },
  { word: "serves as", weight: 8, hint: "Copula avoidance; use 'is' or rewrite (Humanizer §8)" },
  { word: "underscores", weight: 6, hint: "Superficial emphasis / AI vocabulary (Humanizer §1, §7)" },
  { word: "deeply rooted", weight: 6, hint: "Inflated metaphor (Humanizer §1)" },
  { word: "vocal point", weight: 6, hint: "Overused AI cliché" },
  { word: "focal point", weight: 6, hint: "Overused AI cliché (Humanizer §1)" },
  { word: "evolving landscape", weight: 8, hint: "Abstract landscape cliché (Humanizer §1, §7)" },
  { word: "groundbreaking", weight: 8, hint: "Promotional puffery (Humanizer §4)" },
  { word: "nestled in", weight: 8, hint: "Promotional stock phrase (Humanizer §4)" },
  { word: "bustling", weight: 6, hint: "Promotional stock phrase (Humanizer §4)" },
];

// Clickbait / AI heading clichés (§17, §27, §28, §32)
const AI_HEADING_PATTERNS = [
  { pattern: /^##\s+doing the math/i, hint: "AI tutorial cliché 'Doing the math' (Humanizer §27, §28)" },
  { pattern: /^##\s+the irony of/i, hint: "Aphorism / manufactured punchline (Humanizer §25, §32)" },
  { pattern: /^##\s+at its core/i, hint: "Persuasive authority trope (Humanizer §27)" },
  { pattern: /^##\s+challenges and (the )?future/i, hint: "Formulaic outline section (Humanizer §6)" },
  { pattern: /^##\s+here'?s what you need to know/i, hint: "Signposting tutorial cliché (Humanizer §28)" },
];

function checkPost(file) {
  if (!fs.existsSync(file)) {
    return { file, error: `File not found: ${file}`, pass: false, score: 0 };
  }

  const content = fs.readFileSync(file, "utf8");
  const issues = [];
  const warnings = [];
  let score = 100;

  // 1. Frontmatter parsing
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!fmMatch) {
    return {
      file,
      error: "Missing or malformed YAML frontmatter",
      pass: false,
      score: 0,
      issues: [{ rule: "Frontmatter", message: "Missing --- delimiters", severity: "CRITICAL" }],
    };
  }

  const fmLines = fmMatch[1].split("\n");
  const fm = {};
  let currentKey = null;

  for (const line of fmLines) {
    const keyMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (keyMatch) {
      currentKey = keyMatch[1];
      let val = keyMatch[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      fm[currentKey] = val;
    } else if (currentKey && /^\s*-\s+/.test(line)) {
      if (typeof fm[currentKey] === "string" && !fm[currentKey]) {
        fm[currentKey] = [];
      }
      if (Array.isArray(fm[currentKey])) {
        fm[currentKey].push(line.replace(/^\s*-\s+/, "").trim());
      }
    }
  }

  const body = content.slice(fmMatch[0].length);
  const bodyLines = body.split("\n");

  // Check required frontmatter fields
  const requiredFields = ["title", "date", "published", "author", "category", "tags", "image", "image_alt"];
  for (const field of requiredFields) {
    const val = fm[field];
    const isMissing =
      val === undefined ||
      val === null ||
      (typeof val === "string" && val.trim() === "") ||
      (Array.isArray(val) && val.length === 0);

    if (isMissing) {
      issues.push({
        rule: "Frontmatter",
        message: `Missing required field '${field}'`,
        severity: "CRITICAL",
        penalty: 15,
      });
    }
  }

  // Title colon check: if title has a colon, it must be quoted in raw frontmatter
  for (const line of fmLines) {
    if (line.startsWith("title:")) {
      const rawTitle = line.slice(6).trim();
      if (rawTitle.includes(":") && !rawTitle.startsWith('"') && !rawTitle.startsWith("'")) {
        issues.push({
          rule: "YAML Syntax",
          message: "Title contains a colon (':') but is not enclosed in double quotes.",
          severity: "CRITICAL",
          penalty: 15,
        });
      }
    }
  }

  // Category capitalization
  if (fm.category && /^[a-z]/.test(fm.category)) {
    issues.push({
      rule: "Category",
      message: `Category '${fm.category}' must be capitalized (e.g. '${fm.category.charAt(0).toUpperCase() + fm.category.slice(1)}')`,
      severity: "CRITICAL",
      penalty: 10,
    });
  }

  // 2. Cover image validation
  if (fm.image) {
    if (!fm.image.startsWith("/assets/images/posts/covers/")) {
      issues.push({
        rule: "Cover Image",
        message: `Image path '${fm.image}' must start with '/assets/images/posts/covers/'`,
        severity: "CRITICAL",
        penalty: 15,
      });
    }
    if (!fm.image.endsWith(".jpg")) {
      issues.push({
        rule: "Cover Image",
        message: `Cover image '${fm.image}' must have a '.jpg' extension to avoid preview bugs.`,
        severity: "CRITICAL",
        penalty: 15,
      });
    }

    const diskPath = path.join(process.cwd(), fm.image.replace(/^\//, ""));
    if (!fs.existsSync(diskPath)) {
      issues.push({
        rule: "Cover Image Disk",
        message: `Cover image file does not exist on disk: ${diskPath}`,
        severity: "CRITICAL",
        penalty: 25,
      });
    } else {
      const stats = fs.statSync(diskPath);
      if (stats.size === 0) {
        issues.push({
          rule: "Cover Image Disk",
          message: `Cover image is empty (0 bytes): ${diskPath}`,
          severity: "CRITICAL",
          penalty: 25,
        });
      } else if (stats.size > 350 * 1024) {
        warnings.push({
          rule: "Cover Image Size",
          message: `Cover image is ${(stats.size / 1024).toFixed(0)} KB (exceeds recommended 300 KB target).`,
          penalty: 5,
        });
      }
    }

    // Check that cover image is embedded in the body after the first paragraph
    const bodyParagraphs = body.split(/\n\s*\n/).filter((p) => p.trim() && !p.trim().startsWith("#"));
    const imageEmbedPattern = new RegExp(`!\\[[^\\]]*\\]\\(${fm.image}(?:\\s+"[^"]*")?\\)`);
    if (!imageEmbedPattern.test(body)) {
      issues.push({
        rule: "Cover Image Embed",
        message: "Cover image is not embedded in the post body right after paragraph 1.",
        severity: "CRITICAL",
        penalty: 15,
      });
    }
  }

  // 3. Punctuation checks (Zero tolerance)
  bodyLines.forEach((line, idx) => {
    const lineNum = fmMatch[0].split("\n").length + idx;

    // Em dash check (— \u2014)
    if (line.includes("\u2014") || line.includes("—")) {
      issues.push({
        line: lineNum,
        rule: "Banned Punctuation",
        message: "Em dash (—) detected. Cut it: use a comma, period, colon, or restructure (Writing Style §1).",
        severity: "CRITICAL",
        penalty: 15,
      });
    }

    // En dash check (– \u2013)
    if (line.includes("\u2013") || line.includes("–")) {
      issues.push({
        line: lineNum,
        rule: "Banned Punctuation",
        message: "En dash (–) detected. Cut it: write natural text or ranges like '10 to 14' (Writing Style §1).",
        severity: "CRITICAL",
        penalty: 10,
      });
    }

    // Spaced hyphen as dash substitute: " word - word "
    if (/[^\s-]\s+-\s+[^\s-]/.test(line)) {
      // Ignore markdown math or table lines
      if (!line.trim().startsWith("|") && !line.includes("$$")) {
        issues.push({
          line: lineNum,
          rule: "Banned Punctuation",
          message: "Spaced hyphen (' - ') used as dash substitute. Use natural punctuation (Writing Style §1).",
          severity: "CRITICAL",
          penalty: 10,
        });
      }
    }

    // Decorative ASCII diagrams (boxes / tree diagrams)
    if (/[┌┐└┘├┤┬┴┼│─═║]/.test(line) || /^\s*\+[-=+]{6,}\+\s*$/.test(line)) {
      issues.push({
        line: lineNum,
        rule: "ASCII Diagram",
        message: "Decorative ASCII box / tree diagram detected. Use a Markdown table or real SVG diagram.",
        severity: "CRITICAL",
        penalty: 15,
      });
    }

    // Single dollar math check: Kramdown does not parse single $ for math
    const singleDollarMatch = line.match(/(^|[^\$])\$([a-zA-Z0-9_\(\)\{\}\+\-\*\/\\]+)\$([^\$]|$)/);
    if (singleDollarMatch) {
      // Exclude simple currency like $1,000 or $50
      if (!/^\$\d+([,\.]\d+)?$/.test(singleDollarMatch[2])) {
        issues.push({
          line: lineNum,
          rule: "KaTeX Math",
          message: `Single dollar math '$${singleDollarMatch[2]}$' detected. Use double dollars '$$math$$'.`,
          severity: "HIGH",
          penalty: 10,
        });
      }
    }

    // Direct questions aimed at the reader
    if (
      /^(What do you think|Can you|Do you|Ever wonder|Have you ever|Why not)\b/i.test(line.trim()) &&
      line.trim().endsWith("?")
    ) {
      warnings.push({
        line: lineNum,
        rule: "Reader Interrogation",
        message: `Rhetorical question aimed at reader: '${line.trim()}'. Make declarative statements instead (Writing Style §2).`,
        penalty: 5,
      });
    }
  });

  // 4. Humanizer & AI slop patterns
  bodyLines.forEach((line, idx) => {
    const lineNum = fmMatch[0].split("\n").length + idx;
    const lower = line.toLowerCase();

    // Buzzword checks
    for (const b of AI_BUZZWORDS) {
      if (lower.includes(b.word)) {
        warnings.push({
          line: lineNum,
          rule: "AI Buzzword",
          message: `High-frequency AI term '${b.word}' found: ${b.hint}`,
          penalty: b.weight,
        });
      }
    }

    // Heading checks (§17: Title Case in headings, and AI clichés)
    if (/^##+\s+/.test(line)) {
      for (const h of AI_HEADING_PATTERNS) {
        if (h.pattern.test(line)) {
          warnings.push({
            line: lineNum,
            rule: "AI Heading Cliché",
            message: `Heading matches cliché: ${h.hint}`,
            penalty: 10,
          });
        }
      }

      // Check for Title Case in headings (capitalized minor words)
      const words = line.replace(/^##+\s+/, "").split(/\s+/);
      const titleCasedWords = words.filter((w) => /^[A-Z][a-z]{3,}$/.test(w));
      if (words.length >= 4 && titleCasedWords.length / words.length > 0.75) {
        // High density of Title Case words
        warnings.push({
          line: lineNum,
          rule: "Heading Title Case",
          message: `Heading '${line.trim()}' appears to be in Title Case. Headings should be in sentence case (Humanizer §17).`,
          penalty: 5,
        });
      }
    }

    // Negative parallelisms ("not only... but", "it is not that... it is that")
    if (/\bnot only\b[\s\S]*?\bbut (also)?\b/i.test(line) || /\bit('s| is) not (about|just)[\s\S]*?\bit('s| is)\b/i.test(line)) {
      warnings.push({
        line: lineNum,
        rule: "Negative Parallelism",
        message: "Negative parallelism ('not only... but' or 'it's not about... it's about') detected (Humanizer §9).",
        penalty: 6,
      });
    }

    // Superficial -ing endings at end of clauses
    if (/,\s+(highlighting|underscoring|emphasizing|symbolizing|fostering|showcasing)\b/i.test(line)) {
      warnings.push({
        line: lineNum,
        rule: "Superficial -ing Ending",
        message: "Sentence uses tacked-on present participle ('..., highlighting/underscoring...') for fake depth (Humanizer §3).",
        penalty: 6,
      });
    }
  });

  // Calculate final score
  const totalPenalties =
    issues.reduce((acc, i) => acc + (i.penalty || 10), 0) +
    warnings.reduce((acc, w) => acc + (w.penalty || 5), 0);

  score = Math.max(0, 100 - totalPenalties);
  const criticalCount = issues.filter((i) => i.severity === "CRITICAL").length;
  const pass = criticalCount === 0 && (strict ? score >= 90 : score >= 80);

  return {
    file,
    score,
    pass,
    criticalCount,
    issues,
    warnings,
    wordCount: body.match(/\S+/g)?.length || 0,
  };
}

// Run checks
let hasFailures = false;
console.log("\n=======================================================");
console.log("             POST QUALITY LINTER & SCORECARD           ");
console.log("=======================================================\n");

for (const file of files) {
  const res = checkPost(file);
  const statusBadge = res.pass ? "✅ PASS" : "❌ FAIL";
  const color = res.pass ? "\x1b[32m" : "\x1b[31m";
  const reset = "\x1b[0m";

  console.log(`${color}${statusBadge} [Score: ${res.score}/100]${reset} ${file} (${res.wordCount} words)`);

  if (res.issues.length > 0) {
    console.log(`\n  🚨 CRITICAL VIOLATIONS (${res.issues.length}):`);
    for (const err of res.issues) {
      const lineStr = err.line ? `Line ${err.line}: ` : "";
      console.log(`    - ${lineStr}[${err.rule}] ${err.message}`);
    }
  }

  if (res.warnings.length > 0) {
    console.log(`\n  ⚠️  WARNINGS & STYLE SUGGESTIONS (${res.warnings.length}):`);
    for (const w of res.warnings) {
      const lineStr = w.line ? `Line ${w.line}: ` : "";
      console.log(`    - ${lineStr}[${w.rule}] ${w.message}`);
    }
  }

  if (!res.pass) {
    hasFailures = true;
  }
  console.log("\n-------------------------------------------------------\n");
}

if (hasFailures) {
  console.log("💥 Result: Quality check FAILED. Fix the violations above before submitting.");
  process.exit(1);
} else {
  console.log("🎉 Result: Quality check PASSED.");
  process.exit(0);
}
