# Richard Djarbeng's Blog

## Overview
A Jekyll-powered personal website and technical blog for Richard Djarbeng — covering Web development, Machine Learning, IoT, and personal adventures.

## Tech Stack
- **Static Site Generator**: Jekyll 4.3.x
- **Package Manager**: Bundler (Ruby gems via `Gemfile`)
- **Templating**: Liquid + HTML
- **Styling**: SCSS (`_sass/`)
- **CMS**: Sveltia CMS (`admin/`)
- **Languages**: Ruby (plugins), Markdown (content), Python (automation scripts)

## Project Structure
- `_posts/` — Technical blog posts
- `_personal/` — Personal stories and adventures
- `_gallery/` — Media gallery items (memes, AI art, videos)
- `_layouts/` / `_includes/` — Liquid templates and partials
- `_plugins/` — Custom Ruby Jekyll plugins
- `_sass/` — SCSS stylesheets
- `assets/` — Images, CSS, JS, PDFs
- `admin/` — Sveltia CMS config and entry point
- `scripts/` — Python/Ruby automation tools
- `_config.yml` — Main Jekyll config
- `_config_dev.yml` — Dev-mode config overlay (faster builds, fewer plugins)

## Running the App
The workflow runs:
```
bundle exec jekyll serve --host 0.0.0.0 --port 5000 --config _config.yml,_config_dev.yml --livereload
```

Gems are installed locally to `vendor/bundle/`.

## Deployment
Configured as a **static** deployment:
- **Build**: `bundle exec jekyll build`
- **Public Dir**: `_site`
