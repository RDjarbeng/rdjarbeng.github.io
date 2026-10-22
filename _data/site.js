const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const yaml = require("js-yaml");

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

function getFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      results = results.concat(getFiles(full));
    } else if (item.name.endsWith(".md")) {
      results.push(full);
    }
  }
  return results;
}

function extractCleanExcerpt(text, wordLimit = 30) {
  if (!text) return "";
  const clean = text
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*`_~>!]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = clean.split(" ");
  if (words.length <= wordLimit) return clean;
  return words.slice(0, wordLimit).join(" ") + "...";
}

function computeWordsAndReadTime(content) {
  if (!content) return { words: 0, read_time: 0 };
  const words = content.trim().split(/\s+/).length;
  const read_time = Math.round(words / 180);
  return { words, read_time };
}

// 0. Authors
const authorFiles = getFiles("_authors");
const authors = authorFiles.map((file) => {
  const content = fs.readFileSync(file, "utf8");
  const parsed = matter(content);
  const slug = slugify(parsed.data.short_name || path.basename(file, ".md"));
  return {
    ...parsed.data,
    bio: parsed.content.trim(),
    url: `/authors/${slug}/`
  };
});
const authorMap = new Map();
for (const a of authors) {
  if (a.short_name) authorMap.set(a.short_name.toLowerCase(), a);
}

function getAuthorInfo(authorName) {
  if (!authorName) return null;
  const isGuest = authorName.toLowerCase() !== "richard";
  const authorObj = authorMap.get(authorName.toLowerCase());
  const displayName = (authorObj && authorObj.display_name) || (authorObj && authorObj.short_name) || authorName;
  const avatar = (authorObj && authorObj.avatar) || "";
  const initials = displayName.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  return {
    is_guest: isGuest,
    display_name: displayName,
    avatar,
    initials
  };
}

// 1. Posts
const postFiles = getFiles("_posts");
const posts = postFiles.map((file) => {
  const content = fs.readFileSync(file, "utf8");
  const parsed = matter(content);
  const rel = path.relative(".", file).replace(/\\/g, "/");
  const filename = path.basename(file, ".md");
  const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, "");
  const url = parsed.data.permalink || `/${slug}/`;
  const date = new Date(parsed.data.date || fs.statSync(file).mtime);
  const categories = Array.isArray(parsed.data.categories)
    ? parsed.data.categories
    : parsed.data.category
    ? [parsed.data.category]
    : ["Science & Technology"]; // default section for technical posts saved without one
  const tags = Array.isArray(parsed.data.tags)
    ? parsed.data.tags
    : typeof parsed.data.tags === "string"
    ? parsed.data.tags.split(/,\s*/)
    : [];

  const { words, read_time } = computeWordsAndReadTime(parsed.content);
  const clean_excerpt = parsed.data.excerpt
    ? extractCleanExcerpt(parsed.data.excerpt, 30)
    : extractCleanExcerpt(parsed.content, 30);

  const author_info = getAuthorInfo(parsed.data.author || "Richard");

  const categories_data = categories.map((cat) => ({
    name: cat,
    slug: slugify(cat),
    url: `/categories/${slugify(cat)}/`
  }));
  const tags_data = tags.map((tag) => ({
    name: tag,
    slug: slugify(tag),
    url: `/tags/${slugify(tag)}/`
  }));

  const postYear = date.getFullYear();
  const currentYear = new Date().getFullYear();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const formatted_date = postYear === currentYear
    ? `${monthNames[date.getMonth()]} ${date.getDate()}`
    : `${monthNames[date.getMonth()]} ${date.getDate()}, ${postYear}`;
  const iso_date = date.toISOString();

  return {
    ...parsed.data,
    title: parsed.data.title || "",
    categories,
    categories_data,
    tags,
    tags_data,
    author: parsed.data.author || "Richard",
    author_info,
    image: parsed.data.image || "",
    image_alt: parsed.data.image_alt || "",
    thumbnail: parsed.data.thumbnail || parsed.data.image || "",
    url,
    date,
    formatted_date,
    iso_date,
    content: parsed.content,
    excerpt: parsed.data.excerpt || (parsed.content ? parsed.content.slice(0, 200) : ""),
    clean_excerpt,
    words,
    read_time,
    relative_path: rel
  };
}).filter((p) => p.published !== false).sort((a, b) => b.date - a.date);

// 2. Personal Posts
const personalFiles = getFiles("_personal");
const personal = personalFiles.map((file) => {
  const content = fs.readFileSync(file, "utf8");
  const parsed = matter(content);
  const rel = path.relative(".", file).replace(/\\/g, "/");
  const filename = path.basename(file, ".md");
  const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, "");
  const url = parsed.data.permalink || `/personal/${slug}/`;
  const date = new Date(parsed.data.date || fs.statSync(file).mtime);
  const categories = Array.isArray(parsed.data.categories)
    ? parsed.data.categories
    : parsed.data.category
    ? [parsed.data.category]
    : [];
  const tags = Array.isArray(parsed.data.tags)
    ? parsed.data.tags
    : typeof parsed.data.tags === "string"
    ? parsed.data.tags.split(/,\s*/)
    : [];

  const { words, read_time } = computeWordsAndReadTime(parsed.content);
  const clean_excerpt = parsed.data.excerpt
    ? extractCleanExcerpt(parsed.data.excerpt, 30)
    : extractCleanExcerpt(parsed.content, 30);

  const categories_data = categories.map((cat) => ({
    name: cat,
    slug: slugify(cat),
    url: `/categories/${slugify(cat)}/`
  }));
  const tags_data = tags.map((tag) => ({
    name: tag,
    slug: slugify(tag),
    url: `/tags/${slugify(tag)}/`
  }));

  const postYear = date.getFullYear();
  const currentYear = new Date().getFullYear();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const formatted_date = postYear === currentYear
    ? `${monthNames[date.getMonth()]} ${date.getDate()}`
    : `${monthNames[date.getMonth()]} ${date.getDate()}, ${postYear}`;
  const iso_date = date.toISOString();

  const author_info = getAuthorInfo(parsed.data.author || "Richard");

  return {
    ...parsed.data,
    title: parsed.data.title || "",
    categories,
    categories_data,
    tags,
    tags_data,
    author: parsed.data.author || "Richard",
    author_info,
    image: parsed.data.image || "",
    image_alt: parsed.data.image_alt || "",
    thumbnail: parsed.data.thumbnail || parsed.data.image || "",
    url,
    date,
    formatted_date,
    iso_date,
    content: parsed.content,
    excerpt: parsed.data.excerpt || (parsed.content ? parsed.content.slice(0, 200) : ""),
    clean_excerpt,
    words,
    read_time,
    relative_path: rel
  };
}).filter((p) => p.published !== false).sort((a, b) => b.date - a.date);

// 3. Gallery
const galleryFiles = getFiles("_gallery");
const gallery = galleryFiles.map((file) => {
  const content = fs.readFileSync(file, "utf8");
  const parsed = matter(content);
  const rel = path.relative(".", file).replace(/\\/g, "/");
  const relFromGallery = path.relative("_gallery", file).replace(/\\/g, "/").replace(/\.md$/, "");
  const url = parsed.data.permalink || `/gallery/${relFromGallery}/`;
  const date = new Date(parsed.data.date || fs.statSync(file).mtime);
  const categories = Array.isArray(parsed.data.categories)
    ? parsed.data.categories
    : parsed.data.category
    ? [parsed.data.category]
    : [];
  const tags = Array.isArray(parsed.data.tags)
    ? parsed.data.tags
    : typeof parsed.data.tags === "string"
    ? parsed.data.tags.split(/,\s*/)
    : [];

  const clean_caption = extractCleanExcerpt(parsed.content || parsed.data.caption || "", 50);

  return {
    ...parsed.data,
    title: parsed.data.title || "",
    category: parsed.data.category || (categories.length > 0 ? categories[0] : ""),
    categories,
    tags,
    platform: parsed.data.platform || "",
    type: parsed.data.type || "",
    genre: parsed.data.genre || "",
    image: parsed.data.image || "",
    image_alt: parsed.data.image_alt || "",
    thumbnail: parsed.data.thumbnail || parsed.data.image || "",
    url,
    date,
    content: parsed.content,
    clean_caption,
    relative_path: rel
  };
}).filter((p) => p.published !== false).sort((a, b) => b.date - a.date);

// 4. Gallery Categories
const catFiles = getFiles("_gallery_categories");
const gallery_categories = catFiles.map((file) => {
  const content = fs.readFileSync(file, "utf8");
  const parsed = matter(content);
  const filename = path.basename(file, ".md");
  const slug = slugify(parsed.data.title || filename);
  return {
    ...parsed.data,
    title: parsed.data.title || filename,
    slug,
    url: `/gallery/${slug}/`,
    content: parsed.content
  };
});



// 6. Video Collections
const vidFiles = getFiles("_video_collections");
const video_collections = vidFiles.map((file) => {
  const content = fs.readFileSync(file, "utf8");
  const parsed = matter(content);
  const slug = path.basename(file, ".md");
  return {
    ...parsed.data,
    slug,
    url: `/gallery/videos/collections/${slug}/`
  };
});

// 7. Books
const bookFiles = getFiles("_books");
const books = bookFiles.map((file) => {
  const content = fs.readFileSync(file, "utf8");
  const parsed = matter(content);
  const slug = path.basename(file, ".md");
  return {
    ...parsed.data,
    slug,
    title: parsed.data.title || "",
    author: parsed.data.author || "",
    link: parsed.data.link || "",
    category: parsed.data.category || "",
    format: parsed.data.format || "Online",
    known_for: parsed.data.known_for || "",
    tags: Array.isArray(parsed.data.tags) ? parsed.data.tags : [],
    note: parsed.data.note || "",
    description: parsed.data.description || "",
    url: `/enlighten/#${slug}`
  };
});

// 8. Book Categories
const bookCatFiles = getFiles("_book_categories");
const book_categories = bookCatFiles.map((file) => {
  const content = fs.readFileSync(file, "utf8");
  const parsed = matter(content);
  const slug = slugify(parsed.data.name || path.basename(file, ".md"));
  return {
    ...parsed.data,
    slug,
    name: parsed.data.name || "",
    icon: parsed.data.icon || "📚",
    weight: parsed.data.weight || 0,
    description: parsed.data.description || ""
  };
}).sort((a, b) => (a.weight || 0) - (b.weight || 0));

// 8.5 Library PDFs
const libraryPdfsFile = path.join(__dirname, "library_pdfs.yml");
let library_pdfs = [];
if (fs.existsSync(libraryPdfsFile)) {
  try {
    library_pdfs = yaml.load(fs.readFileSync(libraryPdfsFile, "utf8")) || [];
  } catch (e) {
    console.error("Error loading library_pdfs.yml:", e);
  }
}

if (!Object.prototype.hasOwnProperty.call(Array.prototype, "size")) {
  Object.defineProperty(Array.prototype, "size", {
    get() {
      return this.length;
    },
    configurable: true
  });
}

function createLookupMap(rawMap) {
  const lowerMap = new Map();
  const slugMap = new Map();
  for (const [k, v] of Object.entries(rawMap)) {
    lowerMap.set(k.toLowerCase(), v);
    slugMap.set(slugify(k), v);
  }
  return new Proxy(rawMap, {
    get(target, prop) {
      if (typeof prop === "string") {
        if (prop in target) return target[prop];
        if (prop === "size" || prop === "length") return Object.keys(target).length;
        const low = prop.toLowerCase();
        if (lowerMap.has(low)) return lowerMap.get(low);
        const s = slugify(prop);
        if (slugMap.has(s)) return slugMap.get(s);
      }
      return target[prop];
    }
  });
}

// 8b. Category descriptions (_category_info), read here so every template
// sees them as site.category_info.
const category_info = getFiles("_category_info").map((file) => {
  const parsed = matter(fs.readFileSync(file, "utf8"));
  return { ...parsed.data, slug: slugify(parsed.data.category_name || path.basename(file, ".md")) };
});

// 9. Categories: one index for technical and personal posts.
// Categories are merged by slug, so "AI" and "ai" share a page. The display
// name is the spelling used most often. Every category in the index gets a
// page at /categories/<slug>/ (category-archive.liquid).
const categoryIndex = (() => {
  const bySlug = new Map();
  for (const p of [...posts, ...personal]) {
    for (const c of p.categories) {
      const slug = slugify(c);
      if (!slug) continue;
      if (!bySlug.has(slug)) bySlug.set(slug, { slug, url: `/categories/${slug}/`, names: new Map(), posts: [] });
      const entry = bySlug.get(slug);
      const name = String(c).trim();
      entry.names.set(name, (entry.names.get(name) || 0) + 1);
      if (!entry.posts.includes(p)) entry.posts.push(p);
    }
  }
  return [...bySlug.values()].map((e) => {
    const displayName = [...e.names.entries()].sort((a, b) => b[1] - a[1])[0][0];
    const sorted = e.posts.sort((a, b) => b.date - a.date);
    return {
      slug: e.slug,
      url: e.url,
      displayName,
      posts: sorted,
      technical: sorted.filter((p) => !p.url.startsWith("/personal/")).length,
      personal: sorted.filter((p) => p.url.startsWith("/personal/")).length
    };
  }).sort((a, b) => a.slug.localeCompare(b.slug));
})();
const rawCategories = {};
for (const c of categoryIndex) rawCategories[c.displayName] = c.posts;
const categories = createLookupMap(rawCategories);

// 10. Tags Map (technical and personal posts)
const rawTags = {};
for (const p of [...posts, ...personal]) {
  for (const t of p.tags) {
    if (!rawTags[t]) rawTags[t] = [];
    rawTags[t].push(p);
  }
}
const tags = createLookupMap(rawTags);

module.exports = {
  environment: process.env.ELEVENTY_ENV || (process.env.NODE_ENV === "production" ? "production" : "development"),
  title: "Richard Djarbeng",
  tagline: "A blog about technology research and personal posts from Richard Djarbeng",
  description: "Richard Djarbeng's website with technical and personal posts. Tech blogs + real-life adventures in East Africa, USA and Europe",
  lang: "en",
  logo: "/assets/images/logo.jpeg",
  baseurl: "",
  url: "https://rdjarbeng.com",
  author: {
    name: "Richard Djarbeng",
    email: "rdjarbeng@rdjarbeng.com",
    uri: "https://rdjarbeng.com",
    twitter: "DjarbengRichard",
    github: "RDjarbeng",
    linkedin: "richarddjarbeng",
    youtube: "rdjarbengweb"
  },
  social: {
    name: "Richard Djarbeng",
    links: [
      "https://twitter.com/DjarbengRichard",
      "https://github.com/RDjarbeng",
      "https://linkedin.com/in/richarddjarbeng",
      "https://youtube.com/@rdjarbengweb"
    ]
  },
  feed: {
    title: "Richard Djarbeng - Latest Posts RSS Feed"
  },
  twitter: {
    username: "DjarbengRichard",
    card: "summary_large_image"
  },
  defaults_image: "/assets/images/logo.jpeg",
  time: new Date(),
  posts,
  personal,
  gallery,
  gallery_categories,
  authors,
  video_collections,
  books,
  book_categories,
  categories,
  categoryIndex,
  category_info,
  // Technical and personal posts together, newest first (llms.txt, feed.json,
  // the Markdown copies of posts).
  articles: [...posts, ...personal].sort((a, b) => b.date - a.date),
  tags,
  library_pdfs
};
