const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { algoliasearch } = require("algoliasearch");

const APP_ID = process.env.ALGOLIA_APP_ID || "IS96FR2E65";
const API_KEY = process.env.ALGOLIA_API_KEY;
const INDEX_NAME = process.env.ALGOLIA_INDEX_NAME || "rdjarbeng_index";

if (!API_KEY) {
  console.log("No ALGOLIA_API_KEY provided in environment. Skipping Algolia indexing.");
  process.exit(0);
}

function stripMarkdown(text) {
  if (!text) return "";
  return text
    .replace(/\{%[^%]*%\}/g, "")
    .replace(/\{\{[^\}]*\}\}/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^#+\s+/gm, "")
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractHeadings(content) {
  const headings = [];
  const lines = content.split("\n");
  for (const line of lines) {
    const match = line.match(/^#{1,3}\s+(.*)$/);
    if (match) {
      headings.push(match[1].trim());
    }
  }
  return headings;
}

function collectFiles(dir, exts = [".md", ".markdown"]) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(collectFiles(filePath, exts));
    } else if (exts.includes(path.extname(file))) {
      results.push(filePath);
    }
  }
  return results;
}

async function run() {
  const client = algoliasearch(APP_ID, API_KEY);

  const targets = [
    { dir: "_posts", collection: "posts", prefix: "/" },
    { dir: "_personal", collection: "personal", prefix: "/personal/" },
    { dir: "_gallery", collection: "gallery", prefix: "/gallery/" },
    { dir: "_authors", collection: "authors", prefix: "/authors/" },
    { dir: "_video_collections", collection: "video_collections", prefix: "/gallery/videos/collections/" },
  ];

  const records = [];

  for (const target of targets) {
    const files = collectFiles(target.dir);
    for (const filePath of files) {
      const content = fs.readFileSync(filePath, "utf8");
      const parsed = matter(content);
      const data = parsed.data || {};

      if (data.published === false) continue;

      const fileSlug = path.basename(filePath, path.extname(filePath)).replace(/^\d{4}-\d{2}-\d{2}-/, "");
      let url = data.permalink;
      if (!url) {
        if (target.collection === "gallery") {
          const rel = path.relative("_gallery", filePath).replace(/\\/g, "/").replace(/\.md$/, "");
          url = `/gallery/${rel}/`;
        } else {
          url = `${target.prefix}${fileSlug}/`;
        }
      }

      const headings = extractHeadings(parsed.content);
      const cleanContent = stripMarkdown(parsed.content).slice(0, 4500);

      records.push({
        objectID: url,
        title: data.title || fileSlug,
        url: url,
        collection: target.collection,
        categories: data.category ? [data.category] : data.categories || [],
        tags: Array.isArray(data.tags) ? data.tags : [],
        genre: data.genre || "",
        headings: headings,
        content: cleanContent,
        date: data.date ? new Date(data.date).getTime() : 0,
      });
    }
  }

  // Also index about.md
  if (fs.existsSync("about.md")) {
    const content = fs.readFileSync("about.md", "utf8");
    const parsed = matter(content);
    records.push({
      objectID: "/about/",
      title: parsed.data.title || "About",
      url: "/about/",
      collection: "pages",
      headings: extractHeadings(parsed.content),
      content: stripMarkdown(parsed.content).slice(0, 4500),
      date: 0,
    });
  }

  console.log(`Prepared ${records.length} records for Algolia.`);

  // Upload in chunks of 500
  const chunkSize = 500;
  for (let i = 0; i < records.length; i += chunkSize) {
    const chunk = records.slice(i, i + chunkSize);
    await client.saveObjects({
      indexName: INDEX_NAME,
      objects: chunk,
    });
    console.log(`Uploaded batch ${i / chunkSize + 1} (${chunk.length} records).`);
  }

  console.log("Algolia sync completed successfully.");
}

run().catch((err) => {
  console.error("Algolia sync failed:", err);
  process.exit(1);
});
