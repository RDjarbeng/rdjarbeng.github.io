# Workspace Instructions: rdjarbeng.com

This file contains persistent guidelines and quality gates for working on the `rdjarbeng.com` Eleventy blog repository. These rules apply automatically to every conversation and task in this workspace.

---

## 1. Post Creation & Editing Quality Gate (MANDATORY)

Whenever creating or modifying a post in `_posts/`, you **MUST NOT** consider the task complete or present the output to the user until you have run the automated linter and verified it passes:

```bash
node scripts/lint-post.mjs <path-to-post.md>
```

* **Exit Code Requirement:** The command MUST exit with code `0` (Score >= 90 with 0 critical violations).
* **If it fails:** You MUST inspect the flagged lines, fix all violations in the file, and re-run `node scripts/lint-post.mjs` until it prints `✅ PASS`.
* **Verification in Response:** When presenting a completed draft to the user, include the linter status (Score and confirmation that 0 critical violations exist).

---

## 2. Hard Writing & Punctuation Rules

1. **No Em Dashes or En Dashes (ZERO TOLERANCE):**
   * Do NOT use em dashes (`—`) or en dashes (`–`) anywhere in post content.
   * Do NOT use spaced hyphens (` - `) as dash substitutes.
   * Use natural punctuation: commas, periods, colons, semicolons, or parentheses.
2. **Mandatory Cover Image:**
   * Every post MUST have a 16:9 (1280x720) `.jpg` cover image saved to `assets/images/posts/covers/<name>_cover.jpg`.
   * Create the SVG source in `scripts/diagrams/covers/<name>.svg` following the strict thumbnail rules in `.agent/workflows/generate-cover-image.md` (cream `#f4f1e6` background, solid `#141414` text, flat vector primary color illustration, `rdjarbeng.com` watermark).
   * Render to JPG with: `node scripts/diagrams/svg_to_jpg.js scripts/diagrams/covers/<name>.svg assets/images/posts/covers/<name>_cover.jpg`.
   * The cover image MUST be declared in the frontmatter (`image: /assets/images/posts/covers/<name>_cover.jpg` and `image_alt: "..."`).
   * The cover image MUST be embedded in the markdown body immediately after the first paragraph: `![Alt text](/assets/images/posts/covers/<name>_cover.jpg "Title")`.
3. **No Unsourced Specifics:**
   * Never state specific statistics, dates, dollar amounts, or company claims without linking directly to the primary, verified source.
4. **Humanizer & Tone (No AI Slop):**
   * **Sentence Case Headings:** All `##` and `###` headings must use sentence case (e.g., `## Why pre-2025 code has value`, NOT `## Why Pre-2025 Code Has Value`).
   * **No Rule of Three Triplets:** Do not force dramatic three-part clauses (e.g. `X, Y, or Z` with parallel modifiers).
   * **No Copula Avoidance or Buzzwords:** Avoid words like `testament`, `pivotal`, `delve`, `landscape`, `underscores`, `stands as`, `serves as`. Write plain copulas (`is`, `are`) and direct verbs.
   * **No Reader Interrogation:** Do not ask rhetorical questions to the reader (`What do you think?`, `Can you imagine?`). Make confident, declarative statements.
5. **Math Formatting (KaTeX):**
   * Inline math MUST use double dollars (`$$math$$`). Never use single `$` for math (Kramdown/Eleventy will not render single `$`).
   * Plain currency amounts like `$1,000` must be written as normal text without math delimiters.

---

## 3. Workflows Reference

For detailed procedures, refer to:
* `.agent/workflows/create-post.md` (Step-by-step post creation lifecycle)
* `.agent/workflows/generate-cover-image.md` (Cover image design specifications)
* `.agent/workflows/writing-style.md` (Punctuation, KaTeX, and tone rules)
* `.agent/workflows/humanizer.md` (Comprehensive catalog of AI writing tells and how to eliminate them)
* `.agent/instructions/editing_posts.md` (Schema, series, tags, and category rules)

