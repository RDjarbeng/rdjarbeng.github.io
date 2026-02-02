# Instructions for Editing Posts

When editing or creating posts (blog posts, personal posts, etc.), adhere to the following strict guidelines to ensure compatibility with Jekyll and the SveltiaCMS configuration.

## 1. Image URLs
*   **Root-Relative Paths Only**: All image paths in the Front Matter (e.g., `image: ...`) **MUST** start with a forward slash `/`.
    *   **CORRECT**: `/assets/images/my-image.png`
    *   **INCORRECT**: `assets/images/my-image.png`
    *   **INCORRECT**: `../assets/images/my-image.png`
*   **Reasoning**: The CMS `public_folder` configuration expects absolute paths from the site root.

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
layout: post
title: "Your Post Title"
date: YYYY-MM-DD HH:MM:SS
image: /assets/images/cover.png
image_alt: "Description of cover image"
description: "A short summary for SEO"
tags: [Tag1, Tag2]
categories: [Category1]
published: true
---
```
