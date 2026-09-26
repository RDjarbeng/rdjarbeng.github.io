---
date: 2026-09-26T16:13:00+02:00
published: true
author: Richard
category: Web
tags:
  - Web
title: Sveltia CMS is feature complete. Time to switch from Decap CMS
image: ''
image_alt: ''
layout: post
card_items: []
---

If you're running a site on Decap CMS (formerly Netlify CMS), I want to introduce you to [Sveltia CMS](https://github.com/sveltia/sveltia-cms), an open-source replacement built by [Kyoshino](https://github.com/kyoshino). I contribute to the project, and I also use it in production: a few of the sites I build get handed off to non-technical clients who need to create, edit, and publish content without touching code. Sveltia is what makes that handoff work.

The project just hit a real milestone, so it's worth explaining what it is and why it might matter to you.

## What's a CMS, quickly

A content management system lets someone update a website's content, text, images, pages, through forms and an editor, without writing code or touching the underlying files. If you've used WordPress to write a blog post, you've used a CMS. Sveltia (like Decap and Netlify CMS before it) is a Git-based CMS: content lives as files in a Git repository, but the person editing it just sees a normal interface.

## Why it exists

Netlify CMS was a popular open-source Git-based CMS until it was abandoned. It got revived as Decap CMS under new maintainers, but development stalled and long-standing issues sat untouched for years.

Sveltia CMS started with two goals: match Netlify/Decap CMS closely enough that switching is easy, and fix as many of the issues that piled up on Netlify/Decap CMS as possible.

## Goal one is done

Every Netlify/Decap CMS feature now exists in Sveltia CMS, except for a handful left out on purpose because they're deprecated or no longer make sense. The last pieces, editorial workflow, open authoring, deploy previews, and nested collections, shipped over the past few weeks. Volunteer translators have also localized the interface into more than 25 languages.

## Should you switch

Sveltia's showcase lists over 530 sites using it, and more than 160 of those migrated from Netlify or Decap CMS. In most cases it works as a drop-in replacement, and it's faster, more secure, and more reliable than what it replaces.

## What's next

With compatibility settled, the focus moves to the second goal: clearing the backlog. So far, 335+ reported Netlify/Decap CMS issues (765+ counting duplicates) have been solved in Sveltia. The targets from here:

- v1.0: 350 issues resolved (800 with duplicates)
- Long-term: 450 issues resolved (1,000 with duplicates)

## It's growing

Sveltia CMS now gets more weekly npm downloads than Decap CMS:

![Sveltia CMS weekly npm downloads surpassing Decap CMS](https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/rmi0i9czu4xzvlm548kn.png)

## How to help

Sveltia CMS is free and maintained mostly by one person. If it's saving you or your clients time, consider [sponsoring it on GitHub](https://github.com/sponsors/kyoshino). If you can't sponsor, reporting issues, starring the repo, or just telling other developers about it goes a long way.

---

*Original announcement: [github.com/sveltia/sveltia-cms/discussions/957](https://github.com/sveltia/sveltia-cms/discussions/957)*
