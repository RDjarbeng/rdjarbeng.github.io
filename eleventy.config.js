const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItKatex = require("./scripts/markdown-it-katex.js");
const pluginTOC = require("eleventy-plugin-toc");
const siteData = require("./_data/site.js");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

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
  // Parsed includes/layouts are cached for the length of one build (Eleventy leaves Liquid's
  // cache off, so every {% include %} was re-read from disk and re-parsed: ~3x slower builds).
  // Emptied before each build so `--serve` still picks up edits to _includes and _layouts.
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
        const env = ctx.environments || {};
        const page = env.page || {};
        const url = page.url || "";
        
        // Find matching post/document in siteData to retrieve precomputed title, excerpt, and image
        const siteDoc = url ? (
          (siteData.posts || []).find((p) => p.url === url) ||
          (siteData.personal || []).find((p) => p.url === url) ||
          (siteData.gallery || []).find((p) => p.url === url) ||
          (siteData.video_collections || []).find((p) => p.url === url)
        ) : null;

        const rawTitle = env.title || page.title || (siteDoc && siteDoc.title) || "";
        const title = rawTitle
          ? `${rawTitle} - ${siteData.title}`
          : siteData.title;

        let pageDesc = env.description || page.description || env.head_description;
        if (!pageDesc && siteDoc && siteDoc.description) {
          pageDesc = siteDoc.description;
        }
        if (!pageDesc && siteDoc && siteDoc.clean_excerpt) {
          pageDesc = siteDoc.clean_excerpt;
        }
        if (!pageDesc) {
          pageDesc = env.excerpt || page.excerpt || siteData.description || "";
        }
        const desc = pageDesc.replace(/"/g, "&quot;");
        const canonical = url ? `https://rdjarbeng.com${url}` : "https://rdjarbeng.com/";
        const img = env.image || page.image || (siteDoc && (siteDoc.image || siteDoc.thumbnail)) || env.thumbnail || page.thumbnail || env.vid_thumbnail || siteData.logo;
        const imgUrl = img ? (img.startsWith("http") ? img : `https://rdjarbeng.com${img.startsWith("/") ? "" : "/"}${img}`) : "";

        // Structured data (schema.org JSON-LD). Replaces what jekyll-seo-tag generated before the
        // Eleventy migration: BlogPosting + breadcrumbs on posts, Person on the about page.
        const SITE = "https://rdjarbeng.com";
        const isPost = Boolean(siteDoc) && (siteData.posts || []).includes(siteDoc);
        const isPersonal = Boolean(siteDoc) && (siteData.personal || []).includes(siteDoc);
        const authorPerson = {
          "@type": "Person",
          name: (siteData.author && siteData.author.name) || "Richard Djarbeng",
          url: `${SITE}/about/`,
          sameAs: (siteData.social && siteData.social.links) || [],
        };
        const graph = [];
        if (isPost || isPersonal) {
          const section = isPost ? { name: "Posts", url: `${SITE}/posts/` } : { name: "Personal", url: `${SITE}/personal/` };
          const info = siteDoc.author_info || {};
          const author = info.is_guest
            ? { "@type": "Person", name: info.display_name, ...(info.url ? { url: SITE + info.url } : {}) }
            : authorPerson;
          const posting = {
            "@type": "BlogPosting",
            "@id": `${canonical}#article`,
            headline: rawTitle,
            description: pageDesc,
            url: canonical,
            mainEntityOfPage: canonical,
            datePublished: siteDoc.iso_date,
            dateModified: env.last_modified_at ? new Date(env.last_modified_at).toISOString() : siteDoc.iso_date,
            author,
            publisher: authorPerson,
            inLanguage: siteData.lang || "en",
          };
          if (imgUrl) posting.image = imgUrl;
          if ((siteDoc.categories || []).length) posting.articleSection = siteDoc.categories;
          if ((siteDoc.tags || []).length) posting.keywords = siteDoc.tags.join(", ");
          const series = (siteData.series || []).find((sr) => sr.parts.some((part) => part.url === url));
          if (series) {
            posting.position = series.parts.findIndex((part) => part.url === url) + 1;
            posting.isPartOf = { "@type": "CreativeWorkSeries", name: series.name, url: SITE + series.url };
          }
          graph.push(posting, {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: section.name, item: section.url },
              { "@type": "ListItem", position: 3, name: rawTitle, item: canonical },
            ],
          });
        } else if (siteDoc && (siteData.gallery || []).includes(siteDoc)) {
          // Gallery item: VideoObject for videos (eligible for video results), ImageObject otherwise
          const isoDate = new Date(siteDoc.date || Date.now()).toISOString();
          if (siteDoc.type === "video" && imgUrl) {
            const video = {
              "@type": "VideoObject",
              "@id": `${canonical}#video`,
              name: rawTitle,
              description: pageDesc || rawTitle,
              thumbnailUrl: [imgUrl],
              uploadDate: isoDate,
              url: canonical,
            };
            const yt = String(siteDoc.youtube_id || "").match(/(?:youtu\.be\/|v=|embed\/|shorts\/)?([A-Za-z0-9_-]{11})(?:[?&#].*)?$/);
            if (siteDoc.platform === "youtube" && yt) {
              video.embedUrl = `https://www.youtube.com/embed/${yt[1]}`;
              video.contentUrl = `https://www.youtube.com/watch?v=${yt[1]}`;
            }
            graph.push(video);
          } else if (imgUrl) {
            graph.push({
              "@type": "ImageObject",
              "@id": `${canonical}#image`,
              name: rawTitle,
              description: pageDesc || rawTitle,
              contentUrl: imgUrl,
              url: canonical,
              uploadDate: isoDate,
            });
          }
          const crumbs = [
            { name: "Home", item: `${SITE}/` },
            { name: "Gallery", item: `${SITE}/gallery/` },
          ];
          const galleryCat = (siteData.gallery_categories || []).find((c) =>
            c.slug && siteDoc.category && c.slug === slugify(siteDoc.category));
          if (galleryCat) crumbs.push({ name: galleryCat.title, item: SITE + galleryCat.url });
          crumbs.push({ name: rawTitle, item: canonical });
          graph.push({
            "@type": "BreadcrumbList",
            itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, ...c })),
          });
        } else if (url === "/about/") {
          graph.push({ ...authorPerson, url: canonical, image: `${SITE}${siteData.logo || ""}` });
        } else {
          // Listing pages: the archives, video collections and series pages
          const parents = [
            [/^\/series\/[^/]+\/$/, "Series", "/series/"],
            [/^\/categories\/[^/]+\/$/, "Categories", "/categories/"],
            [/^\/tags\/[^/]+\/$/, "Tags", "/tags/"],
            [/^\/gallery\/videos\/[^/]+\/$/, "Videos", "/videos/"],
            [/^\/gallery\/[^/]+\/$/, "Gallery", "/gallery/"],
          ];
          const isListing = /^\/(gallery|videos|youtube|posts|personal|series|categories|tags)\//.test(url) ||
            (siteData.video_collections || []).some((v) => v.url === url);
          if (isListing) {
            graph.push({
              "@type": "CollectionPage",
              "@id": `${canonical}#page`,
              name: rawTitle || siteData.title,
              description: pageDesc,
              url: canonical,
              isPartOf: { "@type": "WebSite", name: siteData.title, url: `${SITE}/` },
            });
            const parent = parents.find(([re]) => re.test(url));
            if (parent && rawTitle) {
              graph.push({
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
                  { "@type": "ListItem", position: 2, name: parent[1], item: SITE + parent[2] },
                  { "@type": "ListItem", position: 3, name: rawTitle, item: canonical },
                ],
              });
            }
          }
        }
        const jsonLd = graph.length
          ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c")}</script>`
          : "";
        const articleMeta = (isPost || isPersonal)
          ? `<meta property="article:published_time" content="${siteDoc.iso_date}" />` +
            (siteDoc.categories || []).map((c) => `\n<meta property="article:section" content="${String(c).replace(/"/g, "&quot;")}" />`).join("")
          : "";

        const twitterHandle = siteData.twitter ? siteData.twitter.username || "DjarbengRichard" : "DjarbengRichard";
        const twitterCard = siteData.twitter ? siteData.twitter.card || "summary_large_image" : "summary_large_image";

        return `
<!-- SEO & Social Meta Tags -->
<title>${title}</title>
<meta name="generator" content="Eleventy 3.1.6" />
<meta name="description" content="${desc}" />
<link rel="canonical" href="${canonical}" />

<!-- OpenGraph / Facebook -->
<meta property="og:type" content="${isPost || isPersonal ? "article" : "website"}" />
${articleMeta}
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
${jsonLd}
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
  eleventyConfig.addFilter("sort", (input, prop) => {
    if (!input) return [];
    if (Array.isArray(input)) {
      const arr = [...input];
      if (prop) {
        return arr.sort((a, b) => {
          let valA = a && a.data && a.data[prop] !== undefined ? a.data[prop] : a ? a[prop] : undefined;
          let valB = b && b.data && b.data[prop] !== undefined ? b.data[prop] : b ? b[prop] : undefined;
          // Front matter dates arrive as Date when unquoted and as strings when
          // quoted; compare them as timestamps so the two kinds sort together.
          if (prop === "date") {
            const toTime = (v) => (v instanceof Date ? v.getTime() : v == null ? v : Date.parse(v));
            valA = toTime(valA);
            valB = toTime(valB);
            if (Number.isNaN(valA)) valA = undefined;
            if (Number.isNaN(valB)) valB = undefined;
          }
          if (valA instanceof Date) valA = valA.getTime();
          if (valB instanceof Date) valB = valB.getTime();
          if (valA === valB) return 0;
          if (valA === undefined || valA === null) return 1;
          if (valB === undefined || valB === null) return -1;
          if (typeof valA === "string" && typeof valB === "string") return valA.localeCompare(valB);
          return valA > valB ? 1 : -1;
        });
      }
      return arr.sort((a, b) => {
        if (a === b) return 0;
        if (a === undefined || a === null) return 1;
        if (b === undefined || b === null) return -1;
        if (typeof a === "string" && typeof b === "string") return a.localeCompare(b);
        return a > b ? 1 : -1;
      });
    }
    if (typeof input === "object") {
      return Object.entries(input).sort((a, b) => a[0].localeCompare(b[0]));
    }
    return [input];
  });
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
  // Series box data for one post: {name, url, number, total, parts[], next, prev}, or null
  eleventyConfig.addFilter("seriesNav", (seriesList, seriesName, inputPath) => {
    if (!seriesName || !Array.isArray(seriesList)) return null;
    const s = seriesList.find((x) => x.name.toLowerCase() === seriesName.toString().trim().toLowerCase());
    if (!s) return null;
    const here = path.resolve(inputPath || "");
    const idx = s.parts.findIndex((p) => p.inputPath === here);
    if (idx === -1) return null;
    const parts = s.parts.map((p, i) => ({ ...p, current: i === idx }));
    const next = parts.slice(idx + 1).find((p) => p.card) || null;
    const prev = parts.slice(0, idx).reverse().find((p) => p.card) || null;
    return { name: s.name, url: s.url, number: idx + 1, total: parts.length, parts, next, prev };
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

    // Fast-path known hot expressions across templates
    if (exp === "item.title != item_title" || exp === "item.title != page.title") {
      // LiquidJS's context.get takes a path array; a plain string silently
      // returns undefined, which let pages recommend themselves.
      const lookup = (path) => {
        try { return this.context.get(path); } catch (e) { return undefined; }
      };
      let avoid = "";
      let avoidUrl = "";
      if (this && this.context && typeof this.context.get === "function") {
        avoid = lookup(["item_title"]) || lookup(["page", "title"]) || lookup(["title"]) || "";
        avoidUrl = lookup(["page", "url"]) || "";
      }
      return arr.filter((item) => {
        if (!item) return false;
        if (avoidUrl && item.url === avoidUrl) return false;
        return (item.title || (item.data && item.data.title)) !== avoid;
      });
    }
    if (exp === "b.known_for != nil and b.known_for != ''") {
      return arr.filter((b) => b && (b.known_for || (b.data && b.data.known_for)));
    }
    if (exp === "p.image != nil and p.image != ''") {
      return arr.filter((p) => p && (p.image || (p.data && p.data.image)));
    }
    if (exp === "item.type == 'video'") {
      return arr.filter((item) => item && (item.type || (item.data && item.data.type)) === "video");
    }
    if (exp === "item.type != 'video'") {
      return arr.filter((item) => item && (item.type || (item.data && item.data.type)) !== "video");
    }
    if (exp === "item.author != nil and item.author != '' and item.author != 'Richard' and item.author != 'richard'") {
      return arr.filter((item) => {
        const author = item && (item.author || (item.data && item.data.author));
        return author && author !== "Richard" && author !== "richard";
      });
    }

    const cacheKey = `${keyOrItem}:${exp}`;
    let fn = expCache.get(cacheKey);
    if (!fn) {
      try {
        const jsExp = exp
          .replace(/\bnil\b/g, "null")
          .replace(/\band\b/g, "&&")
          .replace(/\bor\b/g, "||");
        fn = new Function(keyOrItem, "page", "context", `try { with(context || {}) { with(${keyOrItem} || {}) { return Boolean(${jsExp}); } } } catch(e) { return false; }`);
        expCache.set(cacheKey, fn);
      } catch (e) {
        return [];
      }
    }
    let ctx = {};
    if (this && this.context) {
      if (typeof this.context.getAll === "function") {
        ctx = this.context.getAll();
      } else {
        const scopes = this.context.scopes || [];
        for (const s of scopes) {
          Object.assign(ctx, s);
        }
      }
    }
    const page = ctx.page || ((this && this.page) ? this.page : {});
    return arr.filter((item) => {
      const target = item && item.data ? { ...item.data, url: item.url, date: item.date } : item;
      return fn(target, page, ctx);
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
  eleventyConfig.ignores.add(".replit");
  eleventyConfig.ignores.add(".replit/**");
  eleventyConfig.ignores.add("replit.md");
  eleventyConfig.ignores.add(".github/**");
  eleventyConfig.ignores.add(".vscode/**");
  eleventyConfig.ignores.add(".jekyll-cache/**");
  eleventyConfig.ignores.add(".sass-cache/**");
  eleventyConfig.ignores.add("_plugins/**");
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
  eleventyConfig.ignores.add("*.rb");
  eleventyConfig.ignores.add("Gemfile*");
  eleventyConfig.ignores.add("_config*.yml");
  eleventyConfig.ignores.add("*.log");
  eleventyConfig.ignores.add("build_logs_final.txt");
  eleventyConfig.ignores.add("dropdownlists.txt");
  eleventyConfig.ignores.add("kroki_urls.txt");
  eleventyConfig.ignores.add("yt_card_styles.txt");
  eleventyConfig.ignores.add("lighthouse.json");
  eleventyConfig.ignores.add("*.png");

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
    siteData.video_collections = vids.map((v) => ({
      ...v.data,
      slug: v.fileSlug,
      url: v.url
    }));
    return vids;
  });

  eleventyConfig.addCollection("books", (collectionApi) => {
    const books = collectionApi.getFilteredByGlob("_books/**/*.md");
    siteData.books = books.map((b) => ({
      ...b.data,
      slug: b.fileSlug,
      url: b.url
    }));
    return books;
  });

  eleventyConfig.addCollection("book_categories", (collectionApi) => {
    const cats = collectionApi.getFilteredByGlob("_book_categories/**/*.md");
    siteData.book_categories = cats.map((c) => ({
      ...c.data,
      slug: c.fileSlug,
      url: c.url
    })).sort((a, b) => (a.weight || 0) - (b.weight || 0));
    return cats;
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

  // Series: each file in _series/ defines one; posts opt in with `series` (the series_name)
  // and an optional `series_part`. Drafts are read from disk so they can show as "coming soon".
  // Problems only warn: a post with an unknown series simply renders without the series box.
  eleventyConfig.addCollection("seriesList", (collectionApi) => {
    const byName = new Map();
    for (const def of collectionApi.getFilteredByGlob("_series/**/*.md")) {
      const name = (def.data.series_name || "").toString().trim();
      if (!name) {
        console.warn(`[series] ${def.inputPath} has no series_name; skipped.`);
        continue;
      }
      byName.set(name.toLowerCase(), {
        slug: def.fileSlug,
        name,
        description: def.data.description || "",
        coverImage: def.data.image || "",
        url: `/series/${def.fileSlug}/`,
        parts: [],
      });
    }

    const live = new Map(
      collectionApi.getFilteredByGlob("_posts/**/*.md").map((p) => [path.resolve(p.inputPath), p])
    );
    const postsDir = path.join(__dirname, "_posts");
    for (const file of fs.readdirSync(postsDir)) {
      if (!file.endsWith(".md")) continue;
      const full = path.join(postsDir, file);
      const { data } = matter(fs.readFileSync(full, "utf8"));
      if (!data.series) continue;
      const entry = byName.get(data.series.toString().trim().toLowerCase());
      if (!entry) {
        console.warn(`[series] ${file}: unknown series "${data.series}". Add it in _series/; no series box is shown.`);
        continue;
      }
      const post = live.get(full);
      entry.parts.push({
        title: data.title,
        part: Number(data.series_part) || null,
        date: new Date(data.date || 0),
        url: post ? post.url : null,
        inputPath: full,
        card: post ? (siteData.posts || []).find((p) => p.url === post.url) : null,
      });
    }

    const list = [...byName.values()];
    for (const s of list) {
      s.parts.sort((a, b) => (a.part || Infinity) - (b.part || Infinity) || a.date - b.date);
      const seen = new Set();
      s.parts.forEach((p, i) => {
        if (p.part && seen.has(p.part)) {
          console.warn(`[series] "${s.name}": two posts claim part ${p.part}; ordering by date.`);
        }
        if (p.part) seen.add(p.part);
        p.number = i + 1;
      });
      // For series cards: what a reader can open now, where to start, and when it last grew
      s.published = s.parts.filter((p) => p.card);
      s.firstPart = s.published[0] || null;
      s.updated = s.published.reduce((latest, p) => (p.date > latest ? p.date : latest), new Date(0));
      // Cover: the series' own `image` (set in the CMS), else Part 1's cover
      s.image = s.coverImage || (s.firstPart && s.firstPart.card && s.firstPart.card.image) || "";
    }
    siteData.series = list;
    // Most recently updated first, so new and growing series lead on the homepage and /series/
    return list.sort((a, b) => b.updated - a.updated || a.name.localeCompare(b.name));
  });

  // Categories & Tags collections for archives (paginated in category-archive.liquid and tag-archive.liquid)
  // Every category used by a technical or personal post has a page
  // (siteData.categoryIndex). "" means the value is not a category at all.
  const categoryUrls = new Map(siteData.categoryIndex.map((c) => [c.slug, c.url]));
  eleventyConfig.addFilter("category_url", (cat) => categoryUrls.get(slugify(cat)) || "");

  eleventyConfig.addCollection("categoriesList", () => siteData.categoryIndex);

  // ── Tags ────────────────────────────────────────────────────────────────
  // Every tag is reduced to one key per topic, so "AI", "ai" and "Artificial Intelligence"
  // share a page. Automatic: case, punctuation, plurals and run-together words.
  // Manual: true synonyms in _data/tag_aliases.json (e.g. "ml" -> "machine-learning").
  // Tags with TAG_PAGE_MIN_POSTS or more posts get /tags/<key>/; smaller tags link to the
  // tag view at /tags/?tag=<key> instead of producing hundreds of near-empty pages.
  const TAG_PAGE_MIN_POSTS = 3;
  let tagIndex = null;
  eleventyConfig.on("eleventy.before", () => { tagIndex = null; });

  function buildTagIndex() {
    if (tagIndex) return tagIndex;
    let aliases = {};
    try {
      aliases = JSON.parse(fs.readFileSync(path.join(__dirname, "_data", "tag_aliases.json"), "utf8"));
    } catch (e) {
      console.warn(`[tags] Could not read _data/tag_aliases.json: ${e.message}`);
    }
    // "_distinct": pairs that look alike but are different topics (silences the warning below)
    const distinct = new Set((aliases._distinct || []).map((pair) => [...pair].sort().join("|")));
    aliases = Object.fromEntries(Object.entries(aliases).filter(([k]) => !k.startsWith("_")));
    const docs = [...(siteData.posts || []), ...(siteData.personal || [])];

    // 1. raw slug -> how often each spelling is used
    const rawCounts = new Map();
    const spellings = new Map();
    for (const doc of docs) {
      for (const raw of (doc.tags || [])) {
        const s = slugify(raw);
        if (!s) continue;
        rawCounts.set(s, (rawCounts.get(s) || 0) + 1);
        if (!spellings.has(s)) spellings.set(s, new Map());
        const name = raw.toString().trim();
        spellings.get(s).set(name, (spellings.get(s).get(name) || 0) + 1);
      }
    }

    // 2. raw slug -> key: run-together words, plurals, then manual aliases
    const slugs = [...rawCounts.keys()];
    const byJoined = new Map();
    for (const s of slugs) {
      const joined = s.replace(/-/g, "");
      const prev = byJoined.get(joined);
      // prefer the hyphenated, then the more used spelling ("artificialintelligence" -> "artificial-intelligence")
      if (!prev || (s.includes("-") && !prev.includes("-")) || rawCounts.get(s) > rawCounts.get(prev)) byJoined.set(joined, s);
    }
    const keyOf = new Map();
    const resolve = (s) => {
      let k = byJoined.get(s.replace(/-/g, "")) || s;
      const singular = k.endsWith("ies") ? k.slice(0, -3) + "y" : k.endsWith("s") && !k.endsWith("ss") ? k.slice(0, -1) : null;
      if (singular && rawCounts.has(singular)) k = singular;
      for (let hops = 0; aliases[k] && hops < 5; hops++) k = aliases[k];
      return k;
    };
    for (const s of slugs) keyOf.set(s, resolve(s));
    for (const [from, to] of Object.entries(aliases)) if (!keyOf.has(from)) keyOf.set(from, resolve(to));

    // 3. key -> entry
    const byKey = new Map();
    for (const doc of docs) {
      const seen = new Set();
      for (const raw of (doc.tags || [])) {
        const s = slugify(raw);
        if (!s) continue;
        const key = keyOf.get(s);
        if (seen.has(key)) continue;
        seen.add(key);
        if (!byKey.has(key)) byKey.set(key, { slug: key, posts: [], names: new Map() });
        const entry = byKey.get(key);
        entry.posts.push(doc);
        for (const [name, n] of spellings.get(s)) entry.names.set(name, (entry.names.get(name) || 0) + n);
      }
    }
    for (const entry of byKey.values()) {
      // display the most used spelling, e.g. "AI" over "ai"
      entry.displayName = [...entry.names.entries()].sort((a, b) => b[1] - a[1])[0][0];
      delete entry.names;
      entry.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
      entry.count = entry.posts.length;
      entry.hasPage = entry.count >= TAG_PAGE_MIN_POSTS;
      entry.url = entry.hasPage ? `/tags/${entry.slug}/` : `/tags/?tag=${entry.slug}`;
    }

    // 4. post cards read tags_data[].url, so point those at the right place too
    for (const doc of docs) {
      for (const t of (doc.tags_data || [])) {
        const entry = byKey.get(keyOf.get(slugify(t.name)));
        if (entry) t.url = entry.url;
      }
    }

    // 5. flag likely duplicates that were not merged automatically (one letter apart)
    const keys = [...byKey.keys()].filter((k) => k.length >= 5).sort();
    const close = (a, b) => {
      if (Math.abs(a.length - b.length) > 1) return false;
      let i = 0, j = 0, edits = 0;
      while (i < a.length && j < b.length) {
        if (a[i] === b[j]) { i++; j++; continue; }
        if (++edits > 1) return false;
        if (a.length > b.length) i++; else if (b.length > a.length) j++; else { i++; j++; }
      }
      return edits + (a.length - i) + (b.length - j) <= 1;
    };
    for (let x = 0; x < keys.length; x++) {
      for (let y = x + 1; y < keys.length; y++) {
        if (close(keys[x], keys[y]) && !distinct.has(`${keys[x]}|${keys[y]}`)) {
          console.warn(`[tags] "${keys[x]}" and "${keys[y]}" look like the same tag. Add an alias to _data/tag_aliases.json, or list them under "_distinct".`);
        }
      }
    }

    const all = [...byKey.values()].sort((a, b) => a.slug.localeCompare(b.slug));
    tagIndex = { keyOf, byKey, all };
    return tagIndex;
  }

  // Where a tag should link: its own page, or the tag view for small tags
  eleventyConfig.addFilter("tag_url", (raw) => {
    const s = slugify(raw);
    const { keyOf, byKey } = buildTagIndex();
    const entry = byKey.get(keyOf.get(s) || s);
    return entry ? entry.url : `/tags/?tag=${s}`;
  });

  // Every tag (for the /tags/ page and its tag view)
  eleventyConfig.addCollection("allTags", () => buildTagIndex().all);

  // Compact JSON for the /tags/?tag=<key> view: small tags list their posts, big tags their page
  eleventyConfig.addFilter("tag_view_json", () => {
    const { keyOf, all } = buildTagIndex();
    const posts = [];
    const postIndex = new Map();
    const tags = {};
    for (const t of all) {
      if (t.hasPage) {
        tags[t.slug] = { name: t.displayName, page: t.url };
        continue;
      }
      tags[t.slug] = {
        name: t.displayName,
        posts: t.posts.map((p) => {
          if (!postIndex.has(p.url)) {
            postIndex.set(p.url, posts.length);
            posts.push({ t: p.title, u: p.url, e: p.clean_excerpt || "", i: p.image || "", d: p.formatted_date || "" });
          }
          return postIndex.get(p.url);
        }),
      };
    }
    const aliases = {};
    for (const [raw, key] of keyOf) if (raw !== key) aliases[raw] = key;
    return JSON.stringify({ tags, aliases, posts }).replace(/</g, "\\u003c");
  });

  // Tags that get their own archive page (paginated in tag-archive.liquid)
  eleventyConfig.addCollection("tagsList", () => {
    const tags = buildTagIndex().all.filter((t) => t.hasPage);
    // `npm start` skips the tag archive pages for faster rebuilds; `npm run start:full`,
    // `npm run build` and deploys build them all.
    if (process.env.npm_lifecycle_event === "serve:11ty") {
      console.log(`[dev] Skipping ${tags.length} tag pages for faster rebuilds. Use "npm run start:full" to include them.`);
      return [];
    }
    return tags;
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
