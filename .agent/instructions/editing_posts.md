# Instructions for Editing Posts

When editing or creating posts (blog posts, personal posts, etc.), adhere to the following strict guidelines to ensure compatibility with Jekyll and the SveltiaCMS configuration.

## 1. Image URLs
*   **Root-Relative Paths Only**: All image paths in the Front Matter (e.g., `image: ...`) **MUST** start with a forward slash `/`.
    *   **CORRECT**: `/assets/images/my-image.png`
    *   **INCORRECT**: `assets/images/my-image.png`
    *   **INCORRECT**: `../assets/images/my-image.png`
*   **Reasoning**: The CMS `public_folder` configuration expects absolute paths from the site root.
*   **Flat Structure Only (CRITICAL)**: Do NOT use a nested structure for images (e.g., do not use `image: \n  path: ... \n  alt: ...`). You **MUST** use the flat structure: `image: <path>` and `image_alt: <alt>`.

## 2. Title Formatting
*   **YAML Parsing & Colons**: The colon character `:` is a reserved key-value separator in YAML.
*   **Rule**: If your title contains a colon, you **MUST** enclose the entire title in double quotes within the Front Matter.
    *   **CORRECT**: `title: "The Internet: A Magic Number"`
    *   **INCORRECT**: `title: The Internet: A Magic Number` (This causes a Parse Error)
    *   **Acceptable**: `title: The Internet - A Magic Number` (Using a dash instead of a colon avoids the issue entirely)

## 3. Front Matter Structure
Refer to `admin/config.yml` for the definitive schema, but ensure standard posts structure typically includes:
```yaml
---
date: YYYY-MM-DD HH:MM:SS
published: true
author: "Richard"
category: Category1
tags:
  - Tag1
  - Tag2
title: "Your Post Title"
image: /assets/images/cover.png
image_alt: "Description of cover image"
description: "A short summary for SEO"
layout: post
card_items:
  - name: "Concept Name"
    badge_1: "Topic"
    description: "Explanation of the concept or term."
    url: "https://example.com" # Optional
    link_text: "Learn More" # Optional
---

```

## 4. Optional Fields: Series and Key Points
All three fields are optional. Posts without them render exactly as before, so never add them to old posts unless asked.

*   **`series`** puts a post into a multi-part series. The value **MUST** exactly match the `series_name` of a file in `_series/` (the CMS shows it as a dropdown). To start a new series, first create `_series/<slug>.md` with `series_name` and `description`.
*   **`series_part`** is a whole number (1, 2, 3...). If omitted, parts are ordered by date. Do not give two posts the same part number.
*   **`key_points`** is a plain list of two to four short strings shown in a box at the top of the post. Plain text only: no Markdown, no HTML. Quote each item, because they often contain colons.

```yaml
series: "Self-Driving, Explained"
series_part: 1
key_points:
  - "Levels 0 to 2 only assist; the person behind the wheel is still the driver."
  - "The real dividing line is between Level 2 and Level 3."
```

What the site does with them:
*   A series box at the top of the post lists every part. Unpublished parts show as "Coming soon" (titles are not revealed). A "Next in this series" link appears at the end once the next part is published.
*   Each series gets a page at `/series/<slug>/`, and all series are listed at `/series/`.
*   A post naming an unknown series only prints a `[series]` warning during the build and renders without the box. Check the build output for `[series]` warnings after editing these fields.

## 5. Categories
*   **Existing Categories**: Use the categories defined in the `_category_info` directory (e.g., `ai`, `air-quality`, `computer-vision`, `education`, `energy`, `entrepreneurship`, `environment`, `finance`, `gis`, `help`, `iot`, `it`, `news`, `open-source`, `research`, `satellite`, `security`, `software-development`, `software-engineering`, `technology`, `ui`, `web`) unless you absolutely need to create a new one.
*   **Capitalization (CRITICAL)**: You MUST capitalize the first letter of the category in the front matter (e.g., use `Technology` instead of `technology`).
*   **Creating New Categories**: You MUST notify the user if you want to create a new category that doesn't fit into the existing ones.

## 6. Content Quality & Depth
*   **Informative and Comprehensive**: Posts MUST be highly informative and comprehensive. Do NOT write lazy, surface-level content or short few-sentence summaries. Every post should be at least three (3) well-developed paragraphs.
*   **Context for Links and Embeds**: Do NOT just drop links or media (like tweets or videos) into a post without explanation. You MUST provide significant context for users so they understand what they are looking at and why it is relevant before they click.
*   **Investigate Links**: If source links are provided, you MUST fetch and read their content (using available tools) and synthesize the information into the post rather than lazily repeating the link.
