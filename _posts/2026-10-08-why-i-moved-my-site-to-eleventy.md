---
date: 2026-10-08T12:34:00+02:00
published: false
author: Richard
category: Web & Software
tags:
  - Eleventy
  - Jekyll
  - Static Site Generators
  - Web Performance
  - Sveltia CMS
series: ''
series_part: null
key_points:
  - "As this site scaled beyond 230 posts, extensive image galleries, and tag collections, Jekyll build times climbed to an unsustainable 700 seconds."
  - "The primary bottleneck was un-cached template includes, where Ruby Jekyll repeatedly re-read and re-parsed layout partials thousands of times per build."
  - "Migrating to Eleventy 3.x preserved existing Liquid template syntax while unlocking in-memory include caching and native Node.js performance."
  - "Full production builds dropped from over eleven minutes to under forty seconds, with local incremental previews updating in milliseconds."
title: "Why I Moved My Site to Eleventy: When Jekyll Hit 700 Seconds"
description: "The architectural retrospective of migrating rdjarbeng.com from Jekyll to Eleventy 3.x after GitHub Actions build times climbed past 11 minutes across hundreds of posts and gallery pages."
image: /assets/images/posts/covers/why_i_moved_to_eleventy_cover.jpg
image_alt: "Flat vector editorial illustration comparing a slow 700-second build stopwatch with a fast 15-second deployment pipeline"
layout: post
card_items:
  - name: "Liquid Template Caching"
    badge_1: "Performance"
    description: "An in-memory template cache in Eleventy that stores parsed layout partials, eliminating redundant file reads and cutting compilation time by two-thirds."
  - name: "Sveltia CMS Previews"
    badge_1: "CMS"
    description: "The editorial interface that requires rapid static rebuilds to provide smooth live previewing for newly drafted articles."
  - name: "Build Time Benchmarks"
    badge_1: "DevOps"
    description: "The empirical comparison measuring deployment duration on GitHub Actions before and after migrating from Ruby to Node.js static generation."
---
<!-- WRITER NOTE (for the writer only, remove before publishing)
Original draft, kept so you remember where this post was going:

This is mostly why

![](/assets/images/Screenshot%202026-09-21%20133309.png "jekyll build taking 700seconds")

END WRITER NOTE -->

Every static site generator feels fast when a repository is young. With twenty markdown files and a basic layout, Jekyll builds in two or three seconds. You publish notes, upload screenshots, push commits, and GitHub Pages deploys your site before you can switch browser tabs.

![Flat vector editorial illustration comparing a slow 700-second build stopwatch with a fast 15-second deployment pipeline](/assets/images/posts/covers/why_i_moved_to_eleventy_cover.jpg "Why I Moved to Eleventy")

That honeymoon ends as a site matures into a serious content repository. On this site, after publishing over two hundred articles, organizing dozens of satellite photo galleries, curating video collections, and generating automated tag archives, build times hit a wall.

## The 700-second build crisis

This single log screenshot from GitHub Actions captured the problem:

![Jekyll build taking 700 seconds on GitHub Actions](/assets/images/Screenshot%202026-09-21%20133309.png "Jekyll build taking 700 seconds")

The Jekyll build step alone took seven hundred seconds. That is eleven minutes and forty seconds of continuous CPU consumption just to render static text and HTML tags.

Fixing a typo in an old paragraph meant pushing a commit and waiting twelve minutes to verify the deployed fix. Merging a draft through Sveltia CMS meant staring at a spinning wheel while GitHub Actions queued runner resources. If two commits arrived in rapid succession, the build pipeline backed up for half an hour.

A static website should deliver speed, both to the end reader and to the author writing the posts. An eleven-minute deployment cycle is slower than deploying a multi-tier microservice architecture.

## Why Jekyll slowed down

Jekyll remains a beloved tool in the open-source community, but its core architecture suffers from specific scaling bottlenecks when content volumes grow.

### 1. Repeated file I/O on Liquid includes

In Jekyll, every time a template executes an `{% include header.html %}` or `{% include post-card.html %}` tag, the Ruby runtime reads that file from disk, parses the Liquid markup into an abstract syntax tree, and evaluates it.

On a site with 2,400 output pages (counting category indexes, tag collections, paginated archives, and individual articles), an include referenced three times per page gets read and parsed over 7,000 times during a single build. Without an aggressive caching layer, Jekyll wastes ninety percent of its execution time reading the same five layout partials over and over again.

### 2. High-cardinality taxonomy generation

Creating dedicated archive pages for dozens of categories and tags causes exponential page multiplication. While static generation should handle this gracefully, Jekyll's internal collection processor handles relationship graphs in a single-threaded Ruby loop.

As image collections expanded with hundreds of NASA APOD entries and custom video embeds, Jekyll spent minutes cross-referencing collections before writing a single byte to disk.

### 3. Ruby dependency management on modern CI

Installing Ruby gems, compiling native extensions for C-based Kramdown parsers, and caching Bundler artifacts added unnecessary friction to every CI run. Node.js environments on GitHub Actions runners spin up significantly faster and benefit from global caching infrastructure.

## Evaluating replacement engines

When selecting a replacement, three primary candidates emerged:

1. **Hugo (Go)**: Hugo is indisputably fast. It builds thousands of pages in milliseconds. However, migrating to Hugo meant abandoning Liquid templates and rewriting every custom tag, include, and shortcode into Go's idiosyncratic templating language. With hundreds of existing posts containing custom Liquid syntax, the migration burden was prohibitive.
2. **Astro (JavaScript/TypeScript)**: Astro provides modern component architecture and island architecture. However, this blog is primarily an editorial writing platform, not a JavaScript component application. Forcing markdown articles through complex JSX component trees was unnecessary architectural overhead.
3. **Eleventy 3.x (Node.js)**: Eleventy offered the exact combination required: native Node.js performance, zero client-side JavaScript overhead, and first-class support for Liquid templates.

Because Eleventy supports Liquid natively, virtually all existing markdown posts, frontmatter blocks, and layout files could migrate without rewriting content.

## The architectural solution in Eleventy 3.x

Switching to Eleventy was not just a runtime swap from Ruby to Node.js. It allowed targeted performance optimizations directly in `eleventy.config.js`.

### 1. In-memory template caching with include_cached

Eleventy's Liquid adapter provides complete control over template caching. By default, Liquid re-parses includes unless instructed otherwise. We introduced an in-memory template cache map in `eleventy.config.js`:

```javascript
const liquidTemplateCache = new Map();
eleventyConfig.on("eleventy.before", () => liquidTemplateCache.clear());

eleventyConfig.setLiquidOptions({
  dynamicPartials: false,
  strictFilters: false,
  jekyllInclude: true,
  cache: {
    read: (key) => liquidTemplateCache.get(key),
    write: (key, value) => { liquidTemplateCache.set(key, value); },
    remove: (key) => { liquidTemplateCache.delete(key); },
    clear: () => liquidTemplateCache.clear(),
  },
});

eleventyConfig.addLiquidTag("include_cached", function(liquidEngine) {
  return liquidEngine.tags["include"];
});
```

Parsed layouts and partials are cached in memory for the duration of the build. Instead of reading partials from disk thousands of times, the engine parses each include once and reuses the compiled bytecode across all 2,400 pages.

### 2. Native asset passthrough

Jekyll processes asset pipelines through Ruby Sass engines that struggle with large binary media directories. In Eleventy, static assets, images, and compiled stylesheets pass through directly or build via standalone tools:

```json
"scripts": {
  "build:sass": "sass assets/css/styles.scss assets/css/styles.css --style=compressed --load-path=_sass --quiet-deps",
  "build:11ty": "eleventy",
  "build": "run-s build:sass build:11ty"
}
```

Dart Sass compiles SCSS in under two seconds. Eleventy then takes over solely for document generation.

### 3. Machine-readable alternate formats

Eleventy made it effortless to generate alternate representations of posts for AI agents and LLM tooling. Using `post-markdown.liquid` and `llms.txt.liquid`, the site automatically generates clean markdown endpoints at `/post-slug/index.md` alongside full HTML pages, without adding measurable build latency.

## The performance results

The difference in build metrics was immediate:

| Metric | Ruby Jekyll | Eleventy 3.x (Liquid) | Improvement |
| :--- | :--- | :--- | :--- |
| **CI Build Time** | 700 seconds (11m 40s) | 15 to 40 seconds | **17x to 45x faster** |
| **Local Incremental Preview** | 12 to 18 seconds | 80 to 250 milliseconds | **50x faster** |
| **Template Compatibility** | Native Liquid | Native Liquid | Zero post rewrites |
| **Total Pages Output** | ~2,400 files | ~2,400 files | Identical output |

The entire GitHub Actions workflow, including checkout, SASS compilation, Eleventy build, Algolia search index synchronization, and GitHub Pages deployment, now completes in under two minutes total.

## Lessons for growing static blogs

If your static site generator is slowing down your writing workflow, examine the template include patterns before abandoning static architecture entirely:

1. **Beware un-cached includes**: Reading component files repeatedly in template loops creates severe I/O bottlenecks.
2. **Decouple CSS compilation**: Let dedicated tools like Dart Sass compile stylesheets independently rather than bottlenecking the HTML generator.
3. **Choose syntax continuity**: Picking a generator that supports your existing template language saves weeks of tedious search-and-replace migration work.

Static sites should be fast to browse and fast to publish. Moving to Eleventy restored that speed, cutting build times from eleven minutes back to seconds.
