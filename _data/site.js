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
    : [];
  const tags = Array.isArray(parsed.data.tags)
    ? parsed.data.tags
    : typeof parsed.data.tags === "string"
    ? parsed.data.tags.split(/,\s*/)
    : [];

  return {
    ...parsed.data,
    title: parsed.data.title || "",
    categories,
    tags,
    author: parsed.data.author || "Richard",
    image: parsed.data.image || "",
    image_alt: parsed.data.image_alt || "",
    thumbnail: parsed.data.thumbnail || parsed.data.image || "",
    url,
    date,
    content: parsed.content,
    excerpt: parsed.data.excerpt || (parsed.content ? parsed.content.slice(0, 200) : ""),
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

  return {
    ...parsed.data,
    title: parsed.data.title || "",
    categories,
    tags,
    author: parsed.data.author || "Richard",
    image: parsed.data.image || "",
    image_alt: parsed.data.image_alt || "",
    thumbnail: parsed.data.thumbnail || parsed.data.image || "",
    url,
    date,
    content: parsed.content,
    excerpt: parsed.data.excerpt || (parsed.content ? parsed.content.slice(0, 200) : ""),
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

// 5. Authors
const authorFiles = getFiles("_authors");
const authors = authorFiles.map((file) => {
  const content = fs.readFileSync(file, "utf8");
  const parsed = matter(content);
  const slug = slugify(parsed.data.short_name || path.basename(file, ".md"));
  return {
    ...parsed.data,
    url: `/authors/${slug}/`
  };
});

// 6. Video Collections
const vidFiles = getFiles("_video_collections");
const video_collections = vidFiles.map((file) => {
  const content = fs.readFileSync(file, "utf8");
  const parsed = matter(content);
  const slug = slugify(parsed.data.title || path.basename(file, ".md"));
  return {
    ...parsed.data,
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

// 9. Categories Map
const rawCategories = {};
for (const p of posts) {
  for (const c of p.categories) {
    if (!rawCategories[c]) rawCategories[c] = [];
    rawCategories[c].push(p);
  }
}
const categories = createLookupMap(rawCategories);

// 10. Tags Map
const rawTags = {};
for (const p of posts) {
  for (const t of p.tags) {
    if (!rawTags[t]) rawTags[t] = [];
    rawTags[t].push(p);
  }
}
const tags = createLookupMap(rawTags);

module.exports = {
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
    linkedin: "richarddjarbeng"
  },
  social: {
    name: "Richard Djarbeng",
    links: [
      "https://twitter.com/DjarbengRichard",
      "https://github.com/RDjarbeng",
      "https://linkedin.com/in/richarddjarbeng"
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
  tags
};
