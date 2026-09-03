---
date: 2026-09-03T14:29:00+02:00
published: true
author: Richard
category: Web
tags:
  - Blog
  - Eleventy
  - JavaScript
title: Building a Modern Blog with Eleventy 3.x (Liquid Edition)
image: /assets/images/posts/covers/eleventy_3_liquid_blog_cover.jpg
image_alt: Building a Modern Blog with Eleventy 3.x Liquid Edition cover image
layout: post
card_items:
  - name: Eleventy Official Site
    description: Official documentation and guides for Eleventy (11ty) static site generator.
    badge_1: Documentation
    badge_2: Eleventy
    url: https://www.11ty.dev/
    link_text: Visit 11ty.dev
  - name: Liquid Template Engine
    description: Official reference for Liquid markup language used throughout this guide.
    badge_1: Documentation
    badge_2: Templates
    url: https://shopify.github.io/liquid/
    link_text: View Liquid Docs
  - name: Pagefind Search
    description: Fast, zero-config static search library used for client-side search.
    badge_1: Search
    badge_2: Tool
    url: https://pagefind.app/
    link_text: Visit Pagefind
---

{% raw %}
This is a complete, hands-on guide to building a real blog with [Eleventy](https://www.11ty.dev/) (also called 11ty), a static site generator: a tool that takes plain files, Markdown posts, HTML templates, some data, and turns them into a finished set of HTML pages you can host anywhere. There's no database and no server-side code running once it's built, just files, which makes the result fast and simple to deploy.

![Building a Modern Blog with Eleventy 3.x](/assets/images/posts/covers/eleventy_3_liquid_blog_cover.jpg "Building a Modern Blog with Eleventy 3.x")

By the end of this tutorial you'll have an actual working blog, built in two parts.

**Part 1** gets you a complete, working site:

- A homepage and an about page
- A blog section with working post URLs
- A navigation menu
- Images
- Tag/category pages

**Part 2** is a menu of optional add-ons you can pick from afterward, or skip entirely:

- An RSS feed
- A sitemap
- On-site search
- SEO tags (including JSON-LD)
- A couple of smaller extras

Every command and every file is explained as it comes up, so you're not just copy-pasting, you'll know what each piece is doing and why it's there. It uses **Liquid** as the template language throughout (more on what that means once we get there), and matches Eleventy **3.1.6**, the current stable release.

Here's the full project structure you'll have by the end of Part 2, for reference. Part 1 alone only needs a subset of this, we'll point out what's optional as we go:

```plain
my-blog/
├── eleventy.config.js
├── package.json
└── src/
    ├── _data/
    │   └── site.json
    ├── _includes/
    │   ├── layouts/
    │   │   ├── base.liquid
    │   │   ├── post.liquid
    │   │   └── gallery.liquid
    │   └── partials/
    │       └── jsonld.liquid
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    ├── images/
    │   └── ...
    ├── posts/
    │   ├── posts.11tydata.js
    │   ├── my-first-post.md
    │   └── a-second-post.md
    ├── gallery/
    │   ├── gallery.json
    │   └── sunset-hike.md
    ├── index.liquid
    ├── about.liquid
    ├── blog.liquid
    ├── tags.liquid
    ├── gallery.liquid
    └── sitemap.liquid
```

***

# Part 1: Build the Blog

## 1. Prerequisites

You need **Node.js** installed. This is the piece of software that lets JavaScript run outside of a browser, and it's what Eleventy itself is built with. Grab the current LTS version from [nodejs.org](https://nodejs.org/) if you don't have it, or check the [Installing JavaScript](https://www.11ty.dev/docs/javascript-runtime/) docs for supported versions. A recent LTS (20.19 or newer) keeps things simplest for this tutorial.

You'll also need a **terminal** and a **code editor**.

- The terminal (also called a command line or shell) is a text-based way to talk to your computer, instead of clicking icons, you type commands. On macOS it's the app called Terminal, on Windows it's PowerShell or Command Prompt, and on Linux it's usually just called Terminal too.
- A code editor is where you'll write and edit files like `eleventy.config.js` and your blog posts. [VS Code](https://code.visualstudio.com/) is free and the most common choice, and it happens to have a terminal built into it (View → Terminal), so you can do both from one window if you'd rather not juggle two apps.

You don't need either open yet, we'll say explicitly when to switch between them as we go.

***

## 2. Project Setup

**Step 1: Pick a spot on your computer, and open a terminal there.**

Decide where this project will live, somewhere like your Desktop or Documents folder is fine. Open your terminal, and use `cd` (short for "change directory") to navigate there. For example, if you want the project inside your Documents folder:

```bash
cd Documents
```

**Step 2: Create the project folder and move into it.**

```bash
mkdir my-blog
cd my-blog
```

- `mkdir my-blog` creates a new, empty folder called `my-blog` inside wherever your terminal currently is.
- `cd my-blog` moves your terminal _into_ that folder, so any command you run next happens inside it, not next to it. (You'll sometimes see these combined as `mkdir my-blog && cd my-blog`, the `&&` just means "and then run the next command.")

Everything from here on assumes your terminal is sitting inside `my-blog`. This folder is what we mean by the "project root" whenever it comes up later.

**Step 3: Turn this folder into an npm project.**

```bash
npm init -y
```

`npm` (Node Package Manager) is the tool that installs and manages JavaScript packages, like Eleventy itself. This command creates a file called **`package.json`** in your project folder. Think of `package.json` as your project's ID card and packing list: it records the project's name, which packages it depends on, and any shortcut commands (called "scripts") you want to be able to run. You didn't have this file a second ago, `npm init` just generated it. The `-y` flag tells npm to accept all the default answers instead of asking you a series of setup questions.

**Step 4: Install Eleventy.**

```bash
npm install --save-dev @11ty/eleventy
```

This downloads Eleventy and puts it inside a new folder called `node_modules` (npm creates this automatically, don't edit anything inside it, and don't worry about its contents). It also adds a line to the `package.json` you just created, under a `"devDependencies"` section, recording that your project needs Eleventy. "Dev dependency" just means a tool you need while _building_ the site, as opposed to something the finished, deployed website needs to run. You'll also notice a new `package-lock.json` file appear; npm manages that one for you automatically too, you never need to edit it by hand.

At this point, if you open the `my-blog` folder in your file explorer or in VS Code, you'll see: `package.json`, `package-lock.json`, and `node_modules/`. Nothing else yet, we haven't told Eleventy anything about our site.

**Step 5: Switch to your code editor, and create `eleventy.config.js` yourself.**

Unlike `package.json`, this file does _not_ get created for you, you write it by hand. Open the `my-blog` folder in your code editor, create a new file at the top level (the project root) named exactly `eleventy.config.js`, and put this inside it:

```js
module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
```

Eleventy automatically looks for a file with this exact name when it runs, so naming matters here. What this particular config says: look for your source files in a folder called `src` (which doesn't exist yet either, you'll create it as you add pages), and write the finished, built website out to a folder called `_site`. The `includes` and `data` lines tell Eleventy where, _inside_ `src`, to find your layout/partial files and your global data files respectively, we'll create both of those folders shortly.

**Step 6: Add shortcut commands to `package.json`.**

Open `package.json` in your editor. You'll see a `"scripts"` section that npm generated with a placeholder in it; replace it with:

```json
{
  "scripts": {
    "start": "npx @11ty/eleventy --serve",
    "build": "npx @11ty/eleventy"
  }
}
```

These are just nicknames for longer commands. `npx @11ty/eleventy` runs the copy of Eleventy that lives in your `node_modules` folder (rather than requiring you to type out that whole path). The `--serve` flag additionally starts a local preview server and rebuilds the site automatically whenever you save a file. Because these are named `"start"` and `"build"` inside the `"scripts"` section, you get to type the short version from your terminal: `npm start` or `npm run build`.

**When to actually run it:** you won't have any pages yet, so there's nothing to preview. Once you've created your first page in the next section, switch back to your terminal (still inside `my-blog`) and run:

```bash
npm start
```

Leave that running, and open `http://localhost:8080/` in your browser. Every time you save a file in your editor, this will rebuild the site and refresh automatically. Come back to the terminal only when you need to install a new package or stop the server (Ctrl+C).

***

## 3. Global Site Data

Just like `eleventy.config.js`, this next file is one you create yourself, Eleventy doesn't generate it. In your editor, inside your `src` folder (create `src` now if you haven't yet), create a folder called `_data`, and inside that, a file called `site.json`:

```json
{
  "title": "My Blog",
  "description": "Thoughts on code and coffee.",
  "url": "https://example.com",
  "author": "Your Name"
}
```

Here's the mechanism: back in `eleventy.config.js`, we set `data: "_data"`, which tells Eleventy "look inside `src/_data/` for global data files." Eleventy then takes every file it finds in there and makes it available in _every_ template automatically, using the filename (minus the extension) as the variable name. Since this file is called `site.json`, everything inside it becomes reachable as `site.title`, `site.description`, `site.url`, and `site.author` in any page or layout you write, no importing required. Adding a second file, say `nav.json`, would similarly become available as `nav.*`.

Docs: [Global Data Files](https://www.11ty.dev/docs/data-global/)

***

## A Note on File Types: HTML, Liquid, and Markdown

Before writing your first page, it's worth clearing up something that trips a lot of people up: which file extension goes where, and whether they're interchangeable.

**`.liquid` and `.html` are effectively the same thing here.** Eleventy pre-processes plain `.html` files using the Liquid engine by default, the same engine that processes `.liquid` files. That means every `{{ }}` and `{% %}` tag you'll see in this tutorial would work identically if you renamed `base.liquid` to `base.html`. We use the `.liquid` extension throughout mainly for clarity, so it's visually obvious at a glance that a file contains template logic and front matter, not because Eleventy requires it.

**`.md` (Markdown) files are different, and more capable than they look.** They still get front matter and Liquid tags processed, exactly like a `.liquid` file, but the _body_ content additionally gets run through a Markdown-to-HTML converter. That's why a post's body can be written as `## A heading` or `**bold text**` and come out as proper `<h2>` and `<strong>` tags. You can also drop raw HTML directly into a Markdown file when you need something Markdown syntax doesn't cover (an embedded `<iframe>`, for instance), it passes through untouched.

**So, can you mix and match?**

- _Markdown file as a layout?_ Technically Eleventy will let you, but it's not practical. A layout needs to contain a full page skeleton (`<html>`, `<head>`, meta tags, `{{ content }}`, `<body>`, and so on), and Markdown's shorthand syntax doesn't have equivalents for most of that, you'd just end up writing raw HTML inside a `.md` file anyway. Keep layouts as `.liquid` or `.html`.
- _HTML file as a post?_ This one genuinely works fine. Since `.html` files get the same Liquid + front matter processing as `.liquid` files, you could write a post as `my-post.html` instead of `my-post.md`. The tradeoff: you lose Markdown's shorthand, no automatic paragraph wrapping, no `#` headings, you'd be writing every `<p>` and `<h2>` tag by hand. That's why long-form prose content (posts, gallery captions) uses `.md` in this tutorial, and structural, markup-heavy files (layouts, index pages) use `.liquid`. It's a convenience choice, not a hard rule.

***

## 4. Your First Pages

`src/index.liquid`:

The block between the two `---` lines below is called **front matter**, a small chunk of YAML (a simple, indentation-based data format) that sets metadata for this specific page: its title, which layout wraps it, and so on. Everything after the closing `---` is the page's actual visible content.

```liquid
---
title: Home
layout: layouts/base.liquid
eleventyNavigation:
  key: Home
  order: 1
---
<h1>Welcome to my blog</h1>
<p>This is the home page.</p>
```

`src/about.liquid`:

```liquid
---
title: About
layout: layouts/base.liquid
eleventyNavigation:
  key: About
  order: 3
---
<h1>About</h1>
<p>A bit about who writes this blog.</p>
```

***

## 5. Layouts

`src/_includes/layouts/base.liquid`:

```liquid
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ title }} - {{ site.title }}</title>
  <meta name="description" content="{{ description | default: site.description }}">
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <header>
    <a href="/" class="site-title">{{ site.title }}</a>
    <nav>
      {{ collections.all | eleventyNavigation | eleventyNavigationToHtml }}
    </nav>
  </header>
  <main>
    {{ content }}
  </main>
  <footer>
    <p>&copy; {{ "now" | date: "%Y" }} {{ site.title }}</p>
  </footer>
  <script src="/js/main.js" defer></script>
</body>
</html>
```

`src/_includes/layouts/post.liquid` (a layout that itself uses `base.liquid`):

```liquid
---
layout: layouts/base.liquid
---
<article>
  <h1>{{ title }}</h1>
  <time datetime="{{ date | date: '%Y-%m-%d' }}">{{ date | date: '%B %d, %Y' }}</time>

  {{ content }}

  {% if tags %}
  <ul class="post-tags">
    {% for t in tags %}
      {% unless t == "posts" %}
      <li><a href="/tags/{{ t | slugify }}/">{{ t }}</a></li>
      {% endunless %}
    {% endfor %}
  </ul>
  {% endif %}
</article>
```

Docs: [Layouts](https://www.11ty.dev/docs/layouts/), [Liquid](https://www.11ty.dev/docs/languages/liquid/)

***

## 6. Navigation

```bash
npm install --save-dev @11ty/eleventy-navigation
```

Add it to `eleventy.config.js`:

```js
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
```

Any page can join the menu with an `eleventyNavigation` block in front matter (we already added this to `index.liquid` and `about.liquid` above). The `base.liquid` layout renders the whole tree in one line:

```liquid
{{ collections.all | eleventyNavigation | eleventyNavigationToHtml }}
```

Docs: [Navigation plugin](https://www.11ty.dev/docs/plugins/navigation/)

***

## 7. CSS, JS, and Static Assets

It's easy to assume that once you write `<link rel="stylesheet" href="/css/style.css">` in your HTML, you're done, the browser knows where the file is, so surely it just works. That link tag, though, only tells the _browser_ where to fetch the file from once your page loads; it doesn't tell _Eleventy_ to put that file there in the first place.

Here's the actual mental model: when Eleventy builds your site, it walks through everything in `src/`, and for each file, it asks "is this one of my recognized template types (`.liquid`, `.md`, and so on)?" If yes, it processes that file and writes the result into `_site/`. If no, and you haven't said anything else about it, Eleventy just ignores it entirely, it never gets copied anywhere. A plain `.css` or `.js` file isn't a template Eleventy knows how to process, so left alone, it simply never makes it into `_site/`. Your `<link>` tag would end up pointing at a URL that returns a 404, both in your local preview and once deployed, because nothing ever created that file in the output folder.

**Passthrough copy is the fix**: it tells Eleventy "don't process this, just copy it into the output folder as-is." Add these lines to `eleventy.config.js`:

```js
eleventyConfig.addPassthroughCopy("src/css");
eleventyConfig.addPassthroughCopy("src/js");
eleventyConfig.addPassthroughCopy("src/images");
```

`src/css/style.css` (a small starting point):

```css
:root {
  color-scheme: light dark;
  --max-width: 42rem;
}

body {
  margin: 0 auto;
  padding: 2rem 1rem;
  max-width: var(--max-width);
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}

nav ul {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
}
```

`src/js/main.js` can stay empty for now, just wired up for later.

**Optional: Sass.** Eleventy doesn't compile Sass by default, but you can register `.scss` as a first-class template language:

```bash
npm install sass
```

```js
const sass = require("sass");
const path = require("node:path");

eleventyConfig.addTemplateFormats("scss");
eleventyConfig.addExtension("scss", {
  outputFileExtension: "css",
  compile: function (inputContent, inputPath) {
    let parsed = path.parse(inputPath);
    if (parsed.name.startsWith("_")) return; // skip partials like _variables.scss

    let result = sass.compileString(inputContent, {
      loadPaths: [parsed.dir || ".", this.config.dir.includes],
    });

    return () => result.css;
  },
});
```

Docs: [Copy Files to Output](https://www.11ty.dev/docs/copy/), [Sass](https://www.11ty.dev/docs/languages/sass/)

***

## 8. Blog Posts & Collections

A **collection** is Eleventy's word for a group of related pages you can loop over as a list, in our case, every blog post. You build one by giving a group of files a shared tag; Eleventy automatically gathers everything sharing that tag into `collections.<tagname>`, sorted by date by default. Give a file `tags: ["posts"]`, and it joins `collections.posts` automatically, no extra registration needed.

One more term worth defining before we go further: a **permalink** is simply the final web address (URL) a page will live at once your site is built, for example `https://yoursite.com/blog/my-first-post/`. By default, Eleventy works this out automatically from where a file sits inside your `src` folder (a file at `src/posts/my-first-post.md` would normally become `/posts/my-first-post/`). You can override that default and hand Eleventy an exact URL pattern to use instead, that's what the `permalink` field you'll see below does: it tells every post in this folder to use `/blog/...` instead of the automatic `/posts/...`.

Now, the setup. Create `src/posts/posts.11tydata.js`, a **directory data file**, a small settings file that automatically applies to every file inside its own folder, through something Eleventy calls the [Data Cascade](https://www.11ty.dev/docs/data-cascade/) (settings can be defined at different levels, global, folder, or individual page, and more specific settings override broader ones). We're using a `.js` file here instead of `.json` so it can carry more advanced logic later on:

```js
module.exports = {
  layout: "layouts/post.liquid",
  tags: ["posts"],
  permalink: "/blog/{{ page.fileSlug }}/",
};
```

Change that `permalink` pattern once, here, and every post in the folder updates, no per-file edits needed. The `tags` value merges with whatever tags an individual post adds (Eleventy treats `tags` as a special, mergeable key across the cascade), so posts can add their own category tags without losing `posts`.

`src/posts/my-first-post.md`:

```markdown
---
title: My First Post
date: 2026-01-15
description: Kicking off the blog with a short introduction.
tags:
  - eleventy
  - javascript
---
This is the body of my first post, written in Markdown. Front matter and
Liquid tags both work inside `.md` files by default.
```

`src/posts/a-second-post.md`:

```markdown
---
title: A Second Post
date: 2026-01-22
description: A follow-up post to test collections and pagination.
tags:
  - eleventy
---
Some more content here.
```

`src/blog.liquid` (a simple listing for now, paginated version comes in the next section):

```liquid
---
title: Blog
layout: layouts/base.liquid
eleventyNavigation:
  key: Blog
  order: 2
---
<h1>Blog</h1>
<ul>
  {% for post in collections.posts reversed %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    <time datetime="{{ post.date | date: '%Y-%m-%d' }}">{{ post.date | date: '%B %d, %Y' }}</time>
  </li>
  {% endfor %}
</ul>
```

Docs: [Collections](https://www.11ty.dev/docs/collections/), [Content Dates](https://www.11ty.dev/docs/dates/)

***

## 9. Post Pages: Custom URLs, Prev/Next, and Pagination

You already saw the custom permalink pattern in the previous section, the `permalink` field in `posts.11tydata.js`. Every post in `src/posts/` picks it up automatically.

**Previous/Next links**, added inside `post.liquid`:

```liquid
{% assign nextPost = collections.posts | getNextCollectionItem: page %}
{% assign prevPost = collections.posts | getPreviousCollectionItem: page %}

<nav class="post-nav">
  {% if prevPost %}<a href="{{ prevPost.url }}">&larr; {{ prevPost.data.title }}</a>{% endif %}
  {% if nextPost %}<a href="{{ nextPost.url }}">{{ nextPost.data.title }} &rarr;</a>{% endif %}
</nav>
```

**Pagination**, meaning splitting a long list of posts across several pages instead of one giant page, replacing the simple listing in `blog.liquid` with a paginated one (10 posts per page):

```liquid
---
title: Blog
layout: layouts/base.liquid
eleventyNavigation:
  key: Blog
  order: 2
pagination:
  data: collections.posts
  size: 10
  reverse: true
  alias: pagePosts
---
<h1>Blog</h1>
<ul>
  {% for post in pagePosts %}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
  {% endfor %}
</ul>

<nav class="pager">
  {% if pagination.href.previous %}<a href="{{ pagination.href.previous }}">Newer posts</a>{% endif %}
  {% if pagination.href.next %}<a href="{{ pagination.href.next }}">Older posts</a>{% endif %}
</nav>
```

Left without a custom `permalink` of its own, Eleventy paginates using this template's own path automatically: `/blog/`, `/blog/1/`, `/blog/2/`, and so on.

Docs: [Permalinks](https://www.11ty.dev/docs/permalinks/), [Pagination](https://www.11ty.dev/docs/pagination/), [`get*CollectionItem` filters](https://www.11ty.dev/docs/filters/collection-items/)

***

## 10. Images

```bash
npm install --save-dev @11ty/eleventy-img
```

We're going to wrap this plugin in a **shortcode**, a small reusable snippet you can call by name inside a template, similar to a function, that outputs a chunk of HTML. Instead of hand-writing a large, multi-size `<picture>` element every time you place an image, you define the logic once here, then just write `{% image ... %}` wherever you need it.

Add the shortcode in `eleventy.config.js`:

```js
const Image = require("@11ty/eleventy-img");

eleventyConfig.addAsyncShortcode(
  "image",
  async function (src, alt, sizes = "100vw") {
    if (!alt) {
      throw new Error(`Missing \`alt\` text for image: ${src}`);
    }

    return Image(src, {
      widths: [400, 800, 1200],
      formats: ["avif", "webp", "jpeg"],
      outputDir: "./_site/images/",
      urlPath: "/images/",
      returnType: "html",
      htmlOptions: {
        imgAttributes: {
          alt,
          sizes,
          loading: "lazy",
          decoding: "async",
        },
      },
    });
  }
);
```

Use it in Markdown or Liquid:

```liquid
{% image "./src/images/hero.jpg", "A sunrise over the mountains" %}
```

Note: Liquid shortcodes only accept positional arguments (values passed in order, not named options), so if you want to override `widths` or `formats` per call, add more positional parameters to the shortcode function rather than passing an options object.

Docs: [Image plugin](https://www.11ty.dev/docs/plugins/image/), [Shortcodes](https://www.11ty.dev/docs/shortcodes/)

***

## 11. Categories & Tags

Generate a de-duplicated tag list as its own collection:

```js
eleventyConfig.addCollection("tagList", function (collectionApi) {
  const tagSet = new Set();
  collectionApi.getAll().forEach((item) => {
    (item.data.tags || []).forEach((tag) => tagSet.add(tag));
  });

  // Structural tags that shouldn't show up as browsable categories
  ["posts", "gallery", "all", "nav"].forEach((tag) => tagSet.delete(tag));

  return [...tagSet];
});
```

`src/tags.liquid`, one page per tag via pagination over that collection:

```liquid
---
layout: layouts/base.liquid
pagination:
  data: collections.tagList
  size: 1
  alias: tag
permalink: "/tags/{{ tag | slugify }}/"
---
<h1>Posts tagged &ldquo;{{ tag }}&rdquo;</h1>
<ul>
  {% for post in collections.posts %}
    {% if post.data.tags contains tag %}
    <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
```

Update the `<title>` line in `base.liquid` so it falls back to the tag name on pages, like this one, that don't set an explicit `title`:

```liquid
<title>{{ title | default: tag }} - {{ site.title }}</title>
```

Each post already links out to its own tags via the tag list added to `post.liquid` back in Section 5.

Docs: [Collections](https://www.11ty.dev/docs/collections/), [Pagination](https://www.11ty.dev/docs/pagination/), [`slugify`](https://www.11ty.dev/docs/filters/slugify/)

***

## Checkpoint: You Have a Working Blog

At this point, you have a fully working blog: a homepage, an about page, a navigation menu, a blog section with posts, custom URLs, next/previous links, a paginated listing, images, and tag/category pages. **If that's everything you need, a simple, working blog with posts and a couple of static pages, you can stop right here.** Part 2 below is a menu of optional add-ons; none of it is required for a complete, working site.

If you do want to put this online now rather than adding anything else first, skip ahead to the Deployment section near the end of Part 2, everything else there is optional and skippable.

Here's the complete `eleventy.config.js` as it stands at this checkpoint, useful to double check your own file against:

```js
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");

  eleventyConfig.addAsyncShortcode(
    "image",
    async function (src, alt, sizes = "100vw") {
      if (!alt) {
        throw new Error(`Missing \`alt\` text for image: ${src}`);
      }
      return Image(src, {
        widths: [400, 800, 1200],
        formats: ["avif", "webp", "jpeg"],
        outputDir: "./_site/images/",
        urlPath: "/images/",
        returnType: "html",
        htmlOptions: {
          imgAttributes: { alt, sizes, loading: "lazy", decoding: "async" },
        },
      });
    }
  );

  eleventyConfig.addCollection("tagList", function (collectionApi) {
    const tagSet = new Set();
    collectionApi.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });
    // "gallery" isn't used yet, it's reserved for Part 2's gallery collection
    ["posts", "gallery", "all", "nav"].forEach((tag) => tagSet.delete(tag));
    return [...tagSet];
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
```

***

# Part 2: Optional Enhancements

Part 1 gives you a fully functional, production-ready static blog. Part 2 is an optional menu of features you can add to tailor the site to your needs. Every section below is self-contained: pick the features that fit your workflow, implement them in any order, and skip whatever you don't need.

***

## 1. A Separate Content Type: Gallery Collection

Same mechanism as posts, different folder and a different `tags` value, which makes it a fully separate collection.

`src/gallery/gallery.json`:

```json
{
  "layout": "layouts/gallery.liquid",
  "tags": ["gallery"],
  "permalink": "/gallery/{{ page.fileSlug }}/"
}
```

`src/_includes/layouts/gallery.liquid`:

```liquid
---
layout: layouts/base.liquid
---
<article>
  <h1>{{ title }}</h1>
  {% image image, title %}
  {{ content }}
</article>
```

`src/gallery/sunset-hike.md`:

```markdown
---
title: Sunset at Half Dome
date: 2026-02-01
image: ./src/images/gallery/sunset-hike.jpg
---
A short caption about the hike and the view.
```

`src/gallery.liquid` (index page, sitting as a sibling _file_ next to the `gallery/` _folder_, which is fine since they're different filesystem entries):

```liquid
---
title: Gallery
layout: layouts/base.liquid
eleventyNavigation:
  key: Gallery
  order: 4
---
<h1>Gallery</h1>
<ul class="gallery-grid">
  {% for item in collections.gallery reversed %}
  <li>
    <a href="{{ item.url }}"><h2>{{ item.data.title }}</h2></a>
  </li>
  {% endfor %}
</ul>
```

Because these files are tagged `gallery` instead of `posts`, they live in `collections.gallery`, entirely separate from `collections.posts`, your RSS feed, and your blog index, unless you explicitly pull them in. This same pattern works for any other content type you want to add later (notes, projects, recipes).

Docs: [Collections](https://www.11ty.dev/docs/collections/), [Template & Directory Data Files](https://www.11ty.dev/docs/data-template-dir/)

***

## 2. Computed Data & Drafts

**Computed data** lets you calculate a value with a small JavaScript function instead of hardcoding it, so it can depend on other data (like whether a post is marked as a draft) and gets recalculated correctly every time the site builds.

Now that `posts.11tydata.js` is a JS file, level it up to support draft posts that don't get built:

```js
module.exports = {
  layout: "layouts/post.liquid",
  tags: ["posts"],
  eleventyComputed: {
    permalink: (data) => {
      if (data.draft) {
        return false; // false means "don't build this page"
      }
      return `/blog/${data.page.fileSlug}/`;
    },
  },
};
```

Add `draft: true` to any post's front matter and it stops appearing in the built site (and consequently in collections, RSS, sitemap, everywhere) without deleting the file.

Docs: [Computed Data](https://www.11ty.dev/docs/data-computed/), [Data Cascade](https://www.11ty.dev/docs/data-cascade/)

***

## 3. RSS Feed

An **RSS** (or **Atom**) feed is a standardized file, not meant for a person to read directly, that feed-reader apps (Feedly, NetNewsWire, many podcast apps, and so on) can subscribe to. Whenever you publish something new, anyone subscribed finds out automatically, without needing to revisit your site to check.

Eleventy 3's RSS plugin has a Virtual Template mode: a few lines of config, no hand-written feed file.

```bash
npm install @11ty/eleventy-plugin-rss
```

```js
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

eleventyConfig.addPlugin(feedPlugin, {
  type: "atom", // or "rss", "json"
  outputPath: "/feed.xml",
  collection: {
    name: "posts", // iterates collections.posts
    limit: 10, // 0 means no limit
  },
  metadata: {
    language: "en",
    title: "My Blog",
    subtitle: "Thoughts on code and coffee.",
    base: "https://example.com/",
    author: {
      name: "Your Name",
    },
  },
});
```

This alone produces a working `/feed.xml`, Eleventy generates and renders the feed for you behind the scenes, no template file to write or maintain yourself.

Once it's in place, link to it from `base.liquid` so browsers and feed readers can discover it, and add a visible link in the footer too:

```liquid
<link rel="alternate" type="application/atom+xml" href="/feed.xml" title="{{ site.title }}">
```

```liquid
<p>&copy; {{ "now" | date: "%Y" }} {{ site.title }}. <a href="/feed.xml">RSS</a></p>
```

If you need full control over the markup instead, the docs also cover a Manual Template method where you hand-author the XML yourself: [RSS plugin docs](https://www.11ty.dev/docs/plugins/rss/).

***

## 4. XML Sitemap

An **XML sitemap** is a single file listing every page on your site along with its own address. Search engines like Google read this file so they reliably know about, and can properly index, every page on your site, especially useful for pages that aren't well linked to from anywhere else.

No official Eleventy plugin here. A hand-rolled template is a handful of lines:

`src/sitemap.liquid`:

```liquid
---
permalink: /sitemap.xml
eleventyExcludeFromCollections: true
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  {% for entry in collections.all %}
  <url>
    <loc>{{ site.url }}{{ entry.url }}</loc>
    {% if entry.date %}<lastmod>{{ entry.date | date: "%Y-%m-%d" }}</lastmod>{% endif %}
  </url>
  {% endfor %}
</urlset>
```

`collections.all` already excludes anything marked `eleventyExcludeFromCollections: true` (like this sitemap page itself, and the RSS feed), so no extra filtering is needed. Validate the output against the [sitemap protocol](https://www.sitemaps.org/protocol.html) once it's live.

***

## 5. Client-Side Search with Pagefind

Pagefind indexes your already-built `_site/` output after the fact, no server required.

```bash
npm install --save-dev pagefind
```

Update the build script in `package.json` to index after building:

```json
{
  "scripts": {
    "start": "npx @11ty/eleventy --serve",
    "build": "npx @11ty/eleventy && npx pagefind --site _site"
  }
}
```

Add the search UI to a page (or globally in `base.liquid`):

```html
<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-ui.js"></script>
<div id="search"></div>
<script>
  window.addEventListener("DOMContentLoaded", () => {
    new PagefindUI({ element: "#search" });
  });
</script>
```

Caveat worth knowing: the `/pagefind/` folder is only generated by the `pagefind` step after a full `npm run build`, so search won't work while running the plain `npm start` dev server, only against a built site.

***

## 6. Related Posts

A small custom filter that scores posts by shared tags:

```js
eleventyConfig.addFilter("relatedPosts", function (posts, currentUrl, currentTags, limit) {
  limit = limit || 3;
  const tagSet = new Set((currentTags || []).filter((t) => t !== "posts"));

  return posts
    .filter((post) => post.url !== currentUrl)
    .map((post) => {
      const shared = (post.data.tags || []).filter((t) => tagSet.has(t));
      return { post, score: shared.length };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.post);
});
```

In `post.liquid`, right after the tags list:

```liquid
{% assign related = collections.posts | relatedPosts: page.url, tags, 3 %}
{% if related.size > 0 %}
<aside>
  <h2>Related posts</h2>
  <ul>
    {% for post in related %}
    <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
    {% endfor %}
  </ul>
</aside>
{% endif %}
```

Note this passes `page.url` and the post's own `tags` (both available directly inside the template) rather than trying to reconstruct a "current post" object, since Liquid's `page` variable only carries page metadata, not front matter data.

***

## 7. SEO & JSON-LD

**SEO** stands for **Search Engine Optimization**, the general practice of structuring your site so search engines can understand and rank it well.

`eleventy-plugin-seo` handles the common, well-understood parts: the `<title>` tag, meta description, canonical URL, and two metadata formats that control how your page looks when someone shares its link on social media or in a chat app (the preview image, title, and description shown in the card), called **Open Graph** and **Twitter Card**. This is the same territory `jekyll-seo-tag` covers, minus one thing:

```bash
npm install eleventy-plugin-seo
```

```js
const pluginSEO = require("eleventy-plugin-seo");

eleventyConfig.addPlugin(pluginSEO, require("./src/_data/site.json"));
```

Add this right before `</head>` in `base.liquid`:

```liquid
{% seo %}
```

**JSON-LD** is the piece this plugin doesn't cover. The name stands for "JSON for Linking Data": it's a small block of structured data, written in JSON, that you embed in a page but that's invisible to human visitors. Search engines read it to understand exactly what kind of content a page is (a blog post, a recipe, an event), who wrote it, and when it was published. Doing this well can make a page show up in search results with extra detail, an author name or publish date, instead of just a plain link. The `"@context": "https://schema.org"` line you'll see below points at [schema.org](https://schema.org/), the shared vocabulary search engines agreed on for these type and field names (like `"BlogPosting"` or `"datePublished"`).

No widely used Eleventy plugin generates this, so it's worth a tiny custom include. First, register a `jsonify` filter, since Liquid doesn't ship one:

```js
eleventyConfig.addFilter("jsonify", (value) => JSON.stringify(value));
```

`src/_includes/partials/jsonld.liquid`:

```liquid
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": {{ title | jsonify }},
  "datePublished": "{{ date | date: '%Y-%m-%dT%H:%M:%S%z' }}",
  "author": {
    "@type": "Person",
    "name": {{ site.author | jsonify }}
  },
  "url": "{{ site.url }}{{ page.url }}"
}
</script>
```

Include it in `post.liquid`:

```liquid
{% include "partials/jsonld.liquid" %}
```

Docs: [Filters](https://www.11ty.dev/docs/filters/)

***

## 8. Syntax Highlighting (Optional, for Dev-Focused Blogs)

```bash
npm install --save-dev @11ty/eleventy-plugin-syntaxhighlight
```

```js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
eleventyConfig.addPlugin(syntaxHighlight);
```

Fenced code blocks in Markdown posts get zero-JS highlighting automatically. Add a Prism theme stylesheet to `src/css/` to style the output.

Docs: [Syntax Highlighting plugin](https://www.11ty.dev/docs/plugins/syntaxhighlight/)

***

## 9. Deployment

Pick a host, point its build command at `npm run build`, and its publish directory at `_site`. That's the whole story for Netlify, Vercel, GitHub Pages, and Cloudflare Pages alike; specifics differ mainly in where you set those two values.

Docs: [Deployment & Hosting](https://www.11ty.dev/docs/deployment/)

***

## The Full `eleventy.config.js`

Everything from both parts, assembled into one file:

```js
// --- Part 1 ---
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const Image = require("@11ty/eleventy-img");

// --- Part 2 ---
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");
const pluginSEO = require("eleventy-plugin-seo");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  // Plugins (Part 1)
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Plugins (Part 2)
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginSEO, require("./src/_data/site.json"));

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: { name: "posts", limit: 10 },
    metadata: {
      language: "en",
      title: "My Blog",
      subtitle: "Thoughts on code and coffee.",
      base: "https://example.com/",
      author: { name: "Your Name" },
    },
  });

  // Passthrough copy (Part 1)
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");

  // Images (Part 1)
  eleventyConfig.addAsyncShortcode(
    "image",
    async function (src, alt, sizes = "100vw") {
      if (!alt) throw new Error(`Missing \`alt\` text for image: ${src}`);
      return Image(src, {
        widths: [400, 800, 1200],
        formats: ["avif", "webp", "jpeg"],
        outputDir: "./_site/images/",
        urlPath: "/images/",
        returnType: "html",
        htmlOptions: {
          imgAttributes: { alt, sizes, loading: "lazy", decoding: "async" },
        },
      });
    }
  );

  // Collections (Part 1)
  eleventyConfig.addCollection("tagList", function (collectionApi) {
    const tagSet = new Set();
    collectionApi.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });
    ["posts", "gallery", "all", "nav"].forEach((tag) => tagSet.delete(tag));
    return [...tagSet];
  });

  // Filters (Part 2)
  eleventyConfig.addFilter("jsonify", (value) => JSON.stringify(value));

  eleventyConfig.addFilter("relatedPosts", function (posts, currentUrl, currentTags, limit) {
    limit = limit || 3;
    const tagSet = new Set((currentTags || []).filter((t) => t !== "posts"));
    return posts
      .filter((post) => post.url !== currentUrl)
      .map((post) => {
        const shared = (post.data.tags || []).filter((t) => tagSet.has(t));
        return { post, score: shared.length };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((entry) => entry.post);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
```

***

## Wrap-Up

Part 1 gets you a real, working blog. Part 2 is a pick-list on top of it, add the pieces that matter to you and skip the rest, nothing in Part 2 depends on anything else in Part 2 except the final consolidated config file above, which assumes you added all of it.

***

## Appendix: A Note on Nunjucks

Everything in this tutorial uses Liquid, and you never need to write a line of Nunjucks to follow it. That said, you'll likely run into the name if you go poking around Eleventy's ecosystem: Nunjucks is another template language Eleventy supports, and a few plugins use it internally for their own default output, most relevantly, the RSS plugin's Virtual Template method from Part 2 renders its feed using Nunjucks behind the scenes. You never see or touch that template yourself, so it doesn't affect anything here. If you ever want template features Liquid doesn't have (named/keyword arguments in shortcodes, reusable macros), Nunjucks is the natural next thing to look at, but it's outside the scope of this tutorial.
{% endraw %}
