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
2. **Mandatory Cover Image & Palette System:**
   * Every post MUST have a 16:9 (1280x720) `.jpg` cover image saved to `assets/images/posts/covers/<name>_cover.jpg`.
   * Create the SVG source in `scripts/diagrams/covers/<name>.svg` following the strict thumbnail rules in `.agent/workflows/generate-cover-image.md` (cream `#f4f1e6` background, solid `#141414` text, exact 3-color palette limit, `rdjarbeng.com` watermark).
   * **The 6 Curated Site Palettes (Strict Groups - Pick ONE per asset, max 3 colors):**
     1. **Muted Primaries (Warm Editorial):** Terracotta `#b84d43`, Slate Ink `#2d4763`, Ochre Gold `#cfa14a`
     2. **Muted Botanical (Environment/Organic):** Deep Pine `#1b3b2b`, Sage Moss `#3d634e`, Sand Champagne `#cbb87b`
     3. **Muted Risograph (Cultural/Indie):** Aubergine Plum `#38233f`, Dusty Lavender `#6d597a`, Curry Mustard `#d99b26`
     4. **Stripe Modernist (Developer/Modern):** Stripe Navy `#0a2540`, Blurple `#635bff`, Soft Coral `#ff705a`
     5. **IBM Carbon (Technical/Precision):** Carbon Gray 100 `#121619`, Carbon Blue 60 `#0f62fe`, Teal 50 `#009d9a`
     6. **Google M3 Tonal (Accessible/Systems):** Royal Blue `#1a73e8`, Brick Red `#b3261e`, Warm Amber `#f59e0b`
   * **Universal Black & White Rule:** Black (`#141414`) and White (`#ffffff` / cream `#f4f1e6`) are universal foundation colors. An all black-and-white cover, diagram, or chart is always acceptable. Using black or white alongside a chosen 3-color palette (for outlines, fills, or contrast) is also permitted and does not count against the 3-color palette limit.
   * **Strict Palette Guardrail:** Pick exactly ONE named group per cover, diagram, chart, or UI element and stick with it. Never mix colors across groups. **If you need more colors for a complex chart or SVG, NEVER invent or add new colors; you MUST stop and alert Richard.**
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
   * Inline math uses single dollars (`$math$`). Use `$$` only for display maths on its own line; `$$math$$` inside a sentence renders as raw text.
   * Plain currency amounts like `$1,000` must be written as normal text without math delimiters.
6. **SVG Diagrams, Charts & Watermark:**
   * Every SVG diagram created in `assets/images/diagrams/` MUST include the `rdjarbeng.com` watermark at the bottom right (`text-anchor="end"`, `fill="#57514a"`, font-size `18px`, bold).
   * All diagram text MUST be >= 18px and pass `node scripts/diagrams/render.js <file.svg>`.
   * Diagrams, figures, and charts MUST use one of the 6 Curated Site Palettes (max 3 colors per figure). Do not invent outside colors; alert Richard if additional categorical series colors are needed.

---

## 3. Workflows Reference

For detailed procedures, refer to:
* `.agent/workflows/create-post.md` (Step-by-step post creation lifecycle)
* `.agent/workflows/generate-cover-image.md` (Cover image design specifications)
* `.agent/workflows/writing-style.md` (Punctuation, KaTeX, and tone rules)
* `.agent/workflows/humanizer.md` (Comprehensive catalog of AI writing tells and how to eliminate them)
* `.agent/instructions/editing_posts.md` (Schema, series, tags, and category rules)

