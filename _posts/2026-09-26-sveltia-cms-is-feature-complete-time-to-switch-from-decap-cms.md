---
date: 2026-09-26T16:13:00+02:00
published: true
author: Richard
category: Web
tags:
  - Web
  - CMS
  - Open Source
  - Jamstack
  - Developer Tools
title: Sveltia CMS is feature complete. Time to switch from Decap CMS
image: /assets/images/posts/covers/sveltia-cms-feature-complete.jpg
image_alt: Illustration depicting migration from Netlify CMS and Decap CMS to Sveltia CMS
layout: post
card_items:
  - name: Sveltia CMS Repository
    alt: Sveltia CMS GitHub
    badge_1: Open Source
    badge_2: GitHub
    description: Lightweight, Git-based headless CMS built as a modern, high-speed replacement for Netlify CMS and Decap CMS.
    url: https://github.com/sveltia/sveltia-cms
    link_text: View on GitHub
  - name: Sveltia Official Documentation
    alt: Sveltia CMS Documentation
    badge_1: Documentation
    badge_2: Setup Guide
    description: Complete configuration schemas, backend authenticators, field widgets, and framework migration guides.
    url: https://sveltiacms.app
    link_text: Read Documentation
  - name: Migration Discussion
    alt: Feature Complete Announcement
    badge_1: Community
    badge_2: Milestone
    description: Milestone breakdown detailing the final feature implementations, closed upstream issues, and roadmap goals.
    url: https://github.com/sveltia/sveltia-cms/discussions/957
    link_text: Read Announcement
---

If you run a static site on Decap CMS (formerly Netlify CMS), [Sveltia CMS](https://github.com/sveltia/sveltia-cms) created by [Kyoshino](https://github.com/kyoshino) has reached a decisive milestone. 


 Several projects I maintain are handed over to non-technical editors who must create, edit, and publish content without touching Markdown syntax or terminal commands. Sveltia makes that handoff seamless.

![Illustration depicting migration from Netlify CMS and Decap CMS to Sveltia CMS](/assets/images/posts/covers/sveltia-cms-feature-complete.jpg)

The project has achieved complete feature parity with Decap CMS, resolving the open bugs and architectural stagnation that plagued the Netlify CMS ecosystem for years.

## What's a CMS, quickly

A content management system lets someone update a website's content, text, images, pages, through forms and an editor, without writing code or touching the underlying files. If you've used WordPress to write a blog post, you've used a CMS. Sveltia (like Decap and Netlify CMS before it) is a Git-based CMS: content lives as files in a Git repository, but the person editing it just sees a normal interface such as when posting to social media.
For example here is a screenshot of myself adding this post you are reading now to my website:

![Editing post about sveltiacms being complete in sveltiacms by rdjarbeng](https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/94zy66rskd3zg3urdu3b.png)


## The role of Git-based content management

A content management system allows editors to update page copy, media files, and taxonomy tags through structured forms without touching raw code or repository files. Traditional solutions like WordPress rely on a dynamic backend paired with an external database such as MySQL.

Git-based content management takes a different path. Your Markdown files, YAML data, and media assets stay inside your Git repository alongside your application code. When an editor logs into the CMS, the client-side single-page application commits changes directly to GitHub, GitLab, or Gitea over REST or GraphQL APIs. 

Decap CMS pioneered this model under Netlify. Yet development ground to a near-total halt after Netlify transferred ownership. Outstanding bug reports accumulated without resolution, bundle sizes grew unwieldy, and modern Git platform features remained unsupported.

## Why Sveltia CMS started

Sveltia CMS emerged with two distinct objectives:

1. Replicate the Netlify and Decap CMS configuration API accurately so existing sites can transition without rewriting schemas.
2. Resolve the deep backlog of upstream bugs, race conditions, memory leaks, and missing conveniences that Decap left unaddressed.

The first objective is officially complete.

Every essential Decap capability is implemented and active in Sveltia CMS. The remaining omitted items are deprecated routines or legacy Netlify quirks that no longer fit modern web standards.

The final structural milestones shipped over the past few weeks:

- **Editorial Workflow**: Draft, in-review, and ready states map directly to pull requests and branches, enabling full editorial review pipelines.
- **Open Authoring**: External contributors can submit content proposals via automated fork pull requests without needing write permissions to the upstream repository.
- **Deploy Previews**: Direct integration with CI status checks from Cloudflare Pages, Vercel, Netlify, and GitHub Actions shows live preview URLs right in the entry pane.
- **Nested Collections**: Complete support for arbitrary tree hierarchies, subdirectories, and nested routing in static site generators.
- **Internationalization (i18n)**: Field-level and file-level translation modes paired with full UI localization into more than 25 languages contributed by the community.

## Architectural advantages over Decap CMS

Sveltia CMS is not a simple fork or reskin of Decap CMS. It is a ground-up rewrite using Svelte and modern browser web standards. This rewrite provides immediate technical benefits:

### Performance and bundle weight

Decap CMS relies on older React versions, heavy Redux state trees, and legacy Immutable.js data structures. Its minified bundle exceeds 3 MB of JavaScript over the wire, resulting in noticeable parse lag on slower connections and mobile devices.

Sveltia CMS ships as a single compiled bundle that clocks in around 400 KB gzipped. The interface loads instantaneously, handles large collections containing thousands of Markdown files without UI freezing, and renders complex nested object forms smoothly.

### Native modern authentication

Decap CMS required third-party OAuth proxies or specialized Netlify Identity setups. Sveltia CMS supports native GitHub personal access tokens, Git credential workflows, and seamless Cloudflare Workers or serverless OAuth authenticators that run on free tiers.

### Rich asset handling

Uploading images in Decap frequently triggered repository bloat because assets were committed raw without optimization. Sveltia integrates on-the-fly client-side image transformations, letting you define automatic WebP conversions, quality presets, and custom dimension constraints directly inside your field options.

## How to migrate in two minutes

Because Sveltia CMS was designed as an in-place alternative, migrating an existing Decap CMS installation takes minimal effort.

### 1. Update the admin HTML wrapper

Open your admin entry point (`admin/index.html` in Jekyll or your static output directory). Replace the Decap CMS script tag with the Sveltia CMS CDN bundle:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Content Manager</title>
  </head>
  <body>
    <!-- Sveltia CMS Bundle -->
    <script src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"></script>
  </body>
</html>
```

Ensure you remove any external stylesheet tags targeting `netlify-cms.css` or `decap-cms.css`. Sveltia encapsulates its styles within the component bundle.

### 2. Validate your existing config

Sveltia CMS reads your existing `admin/config.yml` directly. To enable instant IDE validation and schema hinting, ensure the schema declaration is present at the top of `admin/config.yml`:

```yaml
# yaml-language-server: $schema=https://unpkg.com/@sveltia/cms/schema/sveltia-cms.json

backend:
  name: github
  repo: your-username/your-repo
  branch: main

media_folder: "assets/images"
public_folder: "/assets/images"

collections:
  - name: "posts"
    label: "Posts"
    folder: "_posts"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Publish Date", name: "date", widget: "datetime" }
      - { label: "Body", name: "body", widget: "markdown" }
```

Your existing collection structure, field widgets (string, markdown, list, object, relation, datetime, image), and filter rules will parse immediately.

## Adoption and adoption trajectory

Over 530 production sites currently feature in the official Sveltia showcase. More than 160 of those repositories migrated directly from Netlify or Decap CMS.

Adoption has accelerated beyond the upstream codebase. Weekly downloads on npm regularly surpass Decap CMS:

![Sveltia CMS weekly npm downloads surpassing Decap CMS](https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/rmi0i9czu4xzvlm548kn.png)

Developers running Astro, Hugo, Eleventy, Next.js, and Jekyll are replacing legacy CMS scripts with Sveltia to cut maintenance overhead and deliver faster editing experiences to their teams.

## Tackling the upstream backlog

With full Decap feature parity reached, project maintainer Kyoshino has directed engineering focus entirely to the second goal: systematically fixing Decap and Netlify CMS issues.

To date, Sveltia has resolved 335 reported Netlify/Decap issues, which amounts to over 765 unique tickets once upstream duplicates and related bug variations are factored in. The roadmap targets:

- **Version 1.0 Milestone**: 350 upstream issues solved (800 including duplicates).
- **Long-term Scope**: 450 upstream issues solved (1,000 including duplicates), alongside dedicated multi-repository support and offline Git synchronization.

## Supporting the project

Sveltia CMS is open-source software under the MIT license, driven primarily by one dedicated maintainer with contributions from the community. If you build sites for paying clients or rely on Sveltia to manage corporate blogs, consider [sponsoring Kyoshino on GitHub](https://github.com/sponsors/kyoshino). 

For teams transitioning from Decap CMS, filing issue reports, contributing localizations, or sharing migration feedback helps solidify the Git-based CMS ecosystem for everyone.

*Original milestone announcement: [github.com/sveltia/sveltia-cms/discussions/957](https://github.com/sveltia/sveltia-cms/discussions/957)*

**Disclaimer:** I contribute to the Sveltia CMS project on Github in seen and unseen ways so naturally, I am extremely excited about its progress.