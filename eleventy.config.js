const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItKatex = require("./scripts/markdown-it-katex.js");
const pluginTOC = require("eleventy-plugin-toc");
const siteData = require("./_data/site.js");
const fs = require("fs");
const path = require("path");

function slugify(str) {
  if (!str) return "";
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleize(input) {
  if (!input) return "";
  const smallWords = new Set(["a", "an", "the", "at", "by", "for", "in", "of", "on", "to", "up", "and", "as", "but", "if", "or", "nor"]);
  const romanNumerals = new Set(["ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii"]);
  const words = input.toString().split(/(\s+)/);
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (/^\s+$/.test(word)) continue;
    if (romanNumerals.has(word.toLowerCase())) {
      words[i] = word.toUpperCase();
      continue;
    }
    if (/[A-Z]/.test(word.slice(1))) continue;
    const isFirst = i === 0;
    const isLast = i === words.length - 1;
    const isSmall = smallWords.has(word.toLowerCase());
    if (isFirst || isLast || !isSmall) {
      words[i] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    } else {
      words[i] = word.toLowerCase();
    }
  }
  return words.join("");
}

module.exports = function(eleventyConfig) {
  // 1. Markdown configuration
  const mdLib = markdownIt({
    html: true,
    breaks: false,
    linkify: true,
  })
    .use(markdownItAnchor, {
      level: [2, 3, 4],
      permalink: false,
      slugify: slugify,
    })
    .use(markdownItKatex);

  eleventyConfig.setLibrary("md", mdLib);

  // 2. Plugins
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h2", "h3", "h4"],
    wrapper: "ul",
    wrapperClass: "section-nav",
    ul: true,
  });

  // 3. Liquid configuration & include_cached support
  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
    strictFilters: false,
    jekyllInclude: true,
  });

  eleventyConfig.addLiquidTag("include_cached", function(liquidEngine) {
    return liquidEngine.tags["include"];
  });

  // 4. Custom Liquid Tags
  eleventyConfig.addLiquidTag("post_url", function() {
    return {
      parse(token) {
        this.slug = token.args;
      },
      render() {
        let s = (this.slug || "").trim().replace(/^['"]|['"]$/g, "");
        s = s.replace(/^\d{4}-\d{2}-\d{2}-/, "");
        return `/${s}/`;
      },
    };
  });

  eleventyConfig.addLiquidTag("feed_meta", function() {
    return {
      parse() {},
      render() {
        return `<link type="application/atom+xml" rel="alternate" href="https://rdjarbeng.com/feed.xml" title="${siteData.title}" />`;
      },
    };
  });

  eleventyConfig.addLiquidTag("seo", function() {
    return {
      parse() {},
      render(ctx) {
        const page = ctx.environments.page || {};
        const title = page.title
          ? `${page.title} - ${siteData.title}`
          : siteData.title;
        const desc = (page.description || siteData.description || "").replace(/"/g, "&quot;");
        const canonical = page.url ? `https://rdjarbeng.com${page.url}` : "https://rdjarbeng.com/";
        const img = page.image || page.thumbnail || siteData.logo;
        const imgUrl = img ? (img.startsWith("http") ? img : `https://rdjarbeng.com${img.startsWith("/") ? "" : "/"}${img}`) : "";

        const twitterHandle = siteData.twitter ? siteData.twitter.username || "DjarbengRichard" : "DjarbengRichard";
        const twitterCard = siteData.twitter ? siteData.twitter.card || "summary_large_image" : "summary_large_image";

        return `
<!-- SEO & Social Meta Tags -->
<title>${title}</title>
<meta name="generator" content="Eleventy 3.1.6" />
<meta name="description" content="${desc}" />
<link rel="canonical" href="${canonical}" />

<!-- OpenGraph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:url" content="${canonical}" />
<meta property="og:site_name" content="${siteData.title}" />
<meta property="og:locale" content="${siteData.lang || "en"}" />
${imgUrl ? `<meta property="og:image" content="${imgUrl}" />\n<meta property="og:image:alt" content="${title}" />` : ""}

<!-- Twitter / X Cards -->
<meta name="twitter:card" content="${twitterCard}" />
<meta name="twitter:site" content="@${twitterHandle}" />
<meta name="twitter:creator" content="@${twitterHandle}" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${desc}" />
${imgUrl ? `<meta name="twitter:image" content="${imgUrl}" />\n<meta name="twitter:image:alt" content="${title}" />` : ""}
`;
      },
    };
  });

  eleventyConfig.addLiquidTag("toc", function() {
    return {
      parse() {},
      render(ctx) {
        const content = ctx.environments.content || "";
        if (!content) return "";
        // Match headings h2-h4
        const headingRegex = /<h([2-4])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h\1>/gi;
        const entries = [];
        let match;
        while ((match = headingRegex.exec(content)) !== null) {
          const level = parseInt(match[1], 10);
          const id = match[2];
          const text = match[3].replace(/<[^>]+>/g, "").trim();
          entries.push({ level, id, text });
        }
        if (entries.length === 0) return "";

        let html = '<ul id="toc" class="section-nav">\n';
        for (const e of entries) {
          html += `  <li class="toc-entry toc-h${e.level}"><a href="#${e.id}">${e.text}</a></li>\n`;
        }
        html += "</ul>";
        return html;
      },
    };
  });

  // 5. Custom Filters
  eleventyConfig.addFilter("relative_url", (url) => url || "");
  eleventyConfig.addFilter("absolute_url", (url) => {
    if (!url) return "https://rdjarbeng.com";
    if (url.startsWith("http")) return url;
    return `https://rdjarbeng.com${url.startsWith("/") ? "" : "/"}${url}`;
  });
  eleventyConfig.addFilter("jsonify", (val) => JSON.stringify(val));
  eleventyConfig.addFilter("slugify", slugify);
  eleventyConfig.addFilter("titleize", titleize);
  eleventyConfig.addFilter("number_of_words", (str) =>
    str ? str.toString().trim().split(/\s+/).length : 0
  );
  eleventyConfig.addFilter("strip_newlines", (str) =>
    str ? str.toString().replace(/[\r\n]+/g, " ") : ""
  );
  eleventyConfig.addFilter("strip_html", (str) =>
    str ? str.toString().replace(/<[^>]+>/g, "") : ""
  );
  eleventyConfig.addFilter("markdownify", (str) =>
    str ? mdLib.render(str.toString()) : ""
  );
  eleventyConfig.addFilter("sample", (arr, n = 1) => {
    if (!Array.isArray(arr) || arr.length === 0) return n === 1 ? null : [];
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return n === 1 ? shuffled[0] : shuffled.slice(0, n);
  });
  eleventyConfig.addFilter("where", (arr, key, val) => {
    if (!Array.isArray(arr)) return [];
    return arr.filter((item) => {
      const v = item && item.data ? item.data[key] : item ? item[key] : undefined;
      if (val === undefined) return !!v;
      if (v === val) return true;
      if (typeof v === "string" && typeof val === "string" && v.toLowerCase() === val.toLowerCase()) return true;
      return false;
    });
  });
  eleventyConfig.addFilter("getPrevPost", function(currentUrl, collection) {
    const list = Array.isArray(collection) ? collection : siteData.posts;
    const cleanUrl = (currentUrl || "").replace(/\/+$/, "") + "/";
    const idx = list.findIndex(p => ((p && p.url) || "").replace(/\/+$/, "") + "/" === cleanUrl);
    if (idx !== -1 && idx + 1 < list.length) {
      return list[idx + 1];
    }
    return null;
  });
  eleventyConfig.addFilter("getNextPost", function(currentUrl, collection) {
    const list = Array.isArray(collection) ? collection : siteData.posts;
    const cleanUrl = (currentUrl || "").replace(/\/+$/, "") + "/";
    const idx = list.findIndex(p => ((p && p.url) || "").replace(/\/+$/, "") + "/" === cleanUrl);
    if (idx !== -1 && idx - 1 >= 0) {
      return list[idx - 1];
    }
    return null;
  });
  const expCache = new Map();
  eleventyConfig.addFilter("where_exp", function(arr, keyOrItem, exp) {
    if (!Array.isArray(arr) || arr.length === 0) return [];
    if (!exp) return arr;
    const cacheKey = `${keyOrItem}:${exp}`;
    let fn = expCache.get(cacheKey);
    if (!fn) {
      try {
        const jsExp = exp
          .replace(/\bnil\b/g, "null")
          .replace(/\band\b/g, "&&")
          .replace(/\bor\b/g, "||");
        fn = new Function(keyOrItem, "page", `try { with(${keyOrItem}) { return Boolean(${jsExp}); } } catch(e) { return false; }`);
        expCache.set(cacheKey, fn);
      } catch (e) {
        return [];
      }
    }
    const page = (this && this.context && this.context.environments)
      ? this.context.environments.page
      : (this && this.page) ? this.page : {};
    return arr.filter((item) => {
      const target = item && item.data ? { ...item.data, url: item.url, date: item.date } : item;
      return fn(target, page);
    });
  });

  // 6. Passthrough copies
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("documents");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("image-sitemap.xml");
  eleventyConfig.addPassthroughCopy("llms.txt");
  eleventyConfig.addPassthroughCopy("google611ac759df8b329b.html");
  eleventyConfig.addPassthroughCopy("c1a71520d5504c3b932e5cce4931df21.txt");

  // 7. Ignores
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("TODO*.md");
  eleventyConfig.ignores.add("index_old.md");
  eleventyConfig.ignores.add("posts.md.bak");
  eleventyConfig.ignores.add("crawls_from_web/**");
  eleventyConfig.ignores.add("misc_files_plans/**");
  eleventyConfig.ignores.add("vendor/**");
  eleventyConfig.ignores.add("scripts/**");
  eleventyConfig.ignores.add(".bundle/**");
  eleventyConfig.ignores.add(".ruby-lsp/**");
  eleventyConfig.ignores.add("node_modules/**");
  eleventyConfig.ignores.add("_sass/**");
  eleventyConfig.ignores.add(".agent/**");
  eleventyConfig.ignores.add(".agents/**");
  eleventyConfig.ignores.add("_site/**");

  // 8. Collections & Site Bridge
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("_posts/**/*.md")
      .filter((p) => p.data.published !== false)
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("personal", (collectionApi) => {
    return collectionApi.getFilteredByGlob("_personal/**/*.md")
      .filter((p) => p.data.published !== false)
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("gallery", (collectionApi) => {
    return collectionApi.getFilteredByGlob("_gallery/**/*.md")
      .filter((p) => p.data.published !== false)
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("searchable", (collectionApi) => {
    const posts = collectionApi.getFilteredByGlob("_posts/**/*.md").filter((p) => p.data.published !== false);
    const personal = collectionApi.getFilteredByGlob("_personal/**/*.md").filter((p) => p.data.published !== false);
    const gallery = collectionApi.getFilteredByGlob("_gallery/**/*.md").filter((p) => p.data.published !== false);
    return [...posts, ...personal, ...gallery].sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("authors", (collectionApi) => {
    const authors = collectionApi.getFilteredByGlob("_authors/**/*.md");
    siteData.authors = authors.map((a) => ({ ...a.data, url: a.url }));
    return authors;
  });

  eleventyConfig.addCollection("video_collections", (collectionApi) => {
    const vids = collectionApi.getFilteredByGlob("_video_collections/**/*.md");
    siteData.video_collections = vids;
    return vids;
  });

  eleventyConfig.addCollection("books", (collectionApi) => {
    const books = collectionApi.getFilteredByGlob("_books/**/*.md");
    siteData.books = books;
    return books;
  });

  eleventyConfig.addCollection("gallery_categories", (collectionApi) => {
    const cats = collectionApi.getFilteredByGlob("_gallery_categories/**/*.md");
    siteData.gallery_categories = cats.map((c) => ({ ...c.data, url: c.url }));
    return cats;
  });

  eleventyConfig.addCollection("category_info", (collectionApi) => {
    const info = collectionApi.getFilteredByGlob("_category_info/**/*.md");
    siteData.category_info = info.map((c) => ({ ...c.data, url: c.url }));
    return info;
  });

  // Categories & Tags maps
  eleventyConfig.addCollection("categoriesList", (collectionApi) => {
    const posts = collectionApi.getFilteredByGlob("_posts/**/*.md")
      .filter((p) => p.data.published !== false)
      .sort((a, b) => b.date - a.date);
    const slugMap = new Map();
    for (const post of posts) {
      const cat = post.data.category;
      if (!cat) continue;
      const s = slugify(cat);
      if (!s) continue;
      if (!slugMap.has(s)) {
        slugMap.set(s, { slug: s, displayName: cat.toString().trim(), posts: [] });
      }
      const entry = slugMap.get(s);
      if (!entry.posts.includes(post)) {
        entry.posts.push(post);
      }
    }
    siteData.categories = {};
    for (const [s, entry] of slugMap.entries()) {
      siteData.categories[entry.displayName] = entry.posts;
      siteData.categories[s] = entry.posts;
    }
    return Array.from(slugMap.values()).sort((a, b) => a.slug.localeCompare(b.slug));
  });

  eleventyConfig.addCollection("tagsList", (collectionApi) => {
    const posts = collectionApi.getFilteredByGlob("_posts/**/*.md")
      .filter((p) => p.data.published !== false)
      .sort((a, b) => b.date - a.date);
    const slugMap = new Map();
    for (const post of posts) {
      const tags = post.data.tags;
      if (Array.isArray(tags)) {
        for (let rawTag of tags) {
          if (!rawTag) continue;
          const s = slugify(rawTag);
          if (!s) continue;
          if (!slugMap.has(s)) {
            slugMap.set(s, { slug: s, displayName: rawTag.toString().trim(), posts: [] });
          }
          const entry = slugMap.get(s);
          if (!entry.posts.includes(post)) {
            entry.posts.push(post);
          }
        }
      }
    }
    siteData.tags = {};
    for (const [s, entry] of slugMap.entries()) {
      siteData.tags[entry.displayName] = entry.posts;
      siteData.tags[s] = entry.posts;
    }
    return Array.from(slugMap.values()).sort((a, b) => a.slug.localeCompare(b.slug));
  });

  // 9. Post build event (cover-images.txt generation)
  eleventyConfig.on("eleventy.after", async ({ dir }) => {
    const coverImages = new Set();
    const allDocs = [
      ...(siteData.posts || []),
      ...(siteData.personal || []),
      ...(siteData.gallery || []),
    ];
    for (const doc of allDocs) {
      const img = doc.image || (doc.data && doc.data.image);
      const thumb = doc.thumbnail || (doc.data && doc.data.thumbnail);
      if (img && typeof img === "string") {
        coverImages.add(img.replace(/^\//, ""));
      }
      if (thumb && typeof thumb === "string") {
        coverImages.add(thumb.replace(/^\//, ""));
      }
    }
    const outputPath = path.join(dir.output, "cover-images.txt");
    fs.writeFileSync(outputPath, Array.from(coverImages).join("\n") + "\n");
    console.log(`[Cover Images] Wrote ${coverImages.size} image paths to cover-images.txt`);
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["html", "liquid", "md", "markdown"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
  };
};
