---
date: 2025-10-15T14:02:00
published: false
author: Richard
categories:
  - Help
tags:
  - Help
  - Jekyll
title: How to Add Noindex Meta Tags to Jekyll-Archives Generated Pages
layout: post
---
If you're using Jekyll with the `jekyll-archives` plugin to generate tag and category pages, you might notice that these pages can dominate your search engine results. Because tag and category pages often contain many links, search engines may prioritize them over your homepage and actual content. Using noindex tags allows search engines to still crawl these pages (following the links to your content) without ranking them in search results, ensuring your homepage and posts appear first.

## The Problem

When `jekyll-archives` generates tag pages (like `/tags/apps/`) and category pages dynamically, simply adding `noindex: true` to the front matter of your layout file (`_layouts/tag.html`) doesn't work. This is because the plugin generates pages dynamically and doesn't inherit front matter from the layout file itself.

## The Solution

The key is understanding that jekyll-archives creates pages with specific types: `tag` and `category`. You need to configure defaults in your `_config.yml` to target these specific page types.

### Step 1: Configure Defaults in `_config.yml`

Add these default configurations to your `_config.yml` file:

```yaml
defaults:
  - scope:
      path: ""
      type: "tag"
    values:
      noindex: true
  - scope:
      path: ""
      type: "category"
    values:
      noindex: true
```

This tells Jekyll that all pages of type `tag` and `category` should have `noindex: true` set automatically. Note that we're not setting `sitemap: false` because we still want these pages in the sitemap for search engines to discover and crawl—we just don't want them to rank in search results.

### Step 2: Update Your head.html

Make sure your `head.html` includes a check for the noindex variable:

```html
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  {% if page.noindex %}
    <meta name="robots" content="noindex, follow">
  {% endif %}
  
  {%- seo -%}
  
  <!-- Rest of your head content -->
</head>
```

### Step 3: Rebuild Your Site

1. Stop your Jekyll server if it's running
2. Delete the `_site` folder to clear any cached files
3. Run `jekyll serve` or `jekyll build` again
4. Check the generated HTML for your tag/category pages

## Verification

To verify it's working:

1. Navigate to a tag page like `/tags/apps/`
2. View the page source
3. Look for `<meta name="robots" content="noindex, follow">` in the `<head>` section

You can also add temporary debug comments to see what page type Jekyll recognizes:

```html
<!-- DEBUG: Page type: {{ page.type }} -->
```

## Why This Works

The jekyll-archives plugin assigns a `type` attribute to the pages it generates:
- Tag pages get `type: "tag"`
- Category pages get `type: "category"`

By using Jekyll's defaults system with the correct type scope, you can apply front matter values to all dynamically generated archive pages without modifying the plugin itself.

## Additional Tips

### Verify in Google Search Console

After deploying your changes, use Google Search Console's URL Inspection tool to verify that the noindex tag is being recognized properly.

## Complete Example Configuration

Here's a complete example of the relevant sections in `_config.yml`:

```yaml
plugins:
  - jekyll-archives
  - jekyll-sitemap
  - jekyll-seo-tag

jekyll-archives:
  enabled:
    - categories
    - tags
  layouts:
    category: category
    tag: tag
  permalinks:
    category: /categories/:name/
    tag: /tags/:name/

defaults:
  - scope:
      path: ""
      type: "tag"
    values:
      noindex: true
  - scope:
      path: ""
      type: "category"
    values:
      noindex: true
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
  - scope:
      path: ""
    values:
      layout: "default"

```

## Why This Matters

Tag and category pages serve an important function—they help users navigate your content and allow search engines to discover all your posts. However, because these pages often contain numerous links and are frequently updated, search engines may see them as more important than your homepage or individual posts. This can result in search results showing `/tags/apps/` or `/categories/technology/` before your actual homepage or quality content.

By using `noindex, follow`, you tell search engines:
- **noindex**: Don't show this page in search results
- **follow**: But DO follow all the links on this page to discover my actual content

This way, search engines can still find and index all your posts through the tag/category pages, but they won't rank the archive pages themselves.

## Conclusion

The trick to adding noindex tags to jekyll-archives generated pages is understanding that these pages have specific type identifiers (`tag` and `category`) that you can target using Jekyll's defaults system. By configuring these defaults in `_config.yml`, you ensure that all dynamically generated archive pages automatically include the noindex meta tag without needing custom plugins or complex workarounds.

This approach keeps your tag and category pages accessible to search engines for crawling purposes (so they can discover your content), while preventing them from outranking your homepage and actual posts in search results. It's clean, maintainable, and works seamlessly with the jekyll-archives plugin's existing functionality.
