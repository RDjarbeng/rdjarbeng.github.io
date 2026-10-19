// Listing pages for the gallery: one per gallery category, per subfolder
// (e.g. /gallery/screenshots/general/) and per video genre
// (/gallery/videos/<genre>/, /gallery/videos/<platform>/<genre>/), split into
// pages of PER_PAGE items. Ported from the Jekyll custom-pagination plugin,
// which generated these URLs before the move to Eleventy.
const site = require("./site.js");

const PER_PAGE = 12;
const PLATFORMS = ["youtube", "tiktok", "instagram", "twitter"];
// Hand-written pages that already own these URLs.
const SKIP = new Set(["memes", "videos", "videos/youtube", "videos/tiktok", "videos/instagram", "videos/twitter"]);

// Same rules as Jekyll::Utils.slugify (default mode).
function slugify(str) {
  return String(str || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleFromSlug(slug) {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

module.exports = function () {
  const gallery = site.gallery;
  const targets = [];
  const seen = new Set();
  const add = (title, slug) => {
    if (!slug || seen.has(slug) || SKIP.has(slug)) return;
    seen.add(slug);
    targets.push({ title, slug });
  };

  for (const cat of site.gallery_categories) {
    if (!cat.title || cat.title === "None") continue;
    add(cat.title, slugify(cat.title));
  }
  add("Cover images", "cover-images");
  add("External", "external");

  for (const genre of new Set(gallery.map((i) => (i.genre || "").trim()).filter(Boolean))) {
    const g = slugify(genre);
    add(genre, `videos/${g}`);
    for (const p of PLATFORMS) add(genre, `videos/${p}/${g}`);
  }

  for (const item of gallery) {
    const parts = item.relative_path.split("/");
    if (parts.length >= 4) add(titleFromSlug(parts[2]), `${parts[1]}/${parts[2]}`);
  }

  const matches = (item, slug) => {
    const parts = item.relative_path.split("/");
    if (slug === "cover-images") {
      const cats = [].concat(item.categories || [], item.category || []).join(" ").toLowerCase();
      return cats.includes("cover-images") || item.url.includes("/cover-images/") || item.type === "cover";
    }
    if (slug.startsWith("videos/")) {
      if (item.type !== "video") return false;
      const s = slug.split("/");
      const genre = slugify(item.genre || item.category || "");
      const platform = (item.platform || "").toLowerCase();
      if (s.length === 3) return platform === s[1] && genre === s[2];
      return genre === s[1] || platform === s[1];
    }
    if (slug.includes("/")) return item.relative_path.includes(`/${slug}/`);
    if (slug === "external" && parts.length > 2) return false;
    const fields = [
      [].concat(item.categories || []).join(" ") || item.category || "",
      [].concat(item.labels || []).join(" "),
      item.platform, item.type, item.genre
    ].join(" ").trim();
    return fields.toLowerCase().includes(slug) ||
      slugify(fields).includes(slug) ||
      item.url.includes(`/${slug}/`);
  };

  const pages = [];
  for (const { title, slug } of targets) {
    const items = gallery.filter((item) => matches(item, slug));
    if (items.length === 0) continue;
    // A top-level category with subfolders renders as one dashboard page
    // (a few items per subfolder with "View All" links), so it is not split.
    const hasSubfolders = !slug.includes("/") &&
      items.some((item) => item.relative_path.split("/").length >= 4);
    const total = hasSubfolders ? 1 : Math.ceil(items.length / PER_PAGE);
    for (let n = 1; n <= total; n++) {
      pages.push({
        title,
        slug,
        url: n === 1 ? `/gallery/${slug}/` : `/gallery/${slug}/page-${n}/`,
        pager: {
          current_page: n,
          per_page: PER_PAGE,
          total_pages: total,
          total_posts: items.length,
          all_posts: items,
          posts: items.slice((n - 1) * PER_PAGE, n * PER_PAGE),
          previous_page: n > 1 ? n - 1 : null,
          next_page: n < total ? n + 1 : null,
          previous_page_path: n > 2 ? `/gallery/${slug}/page-${n - 1}/` : n === 2 ? `/gallery/${slug}/` : null,
          next_page_path: n < total ? `/gallery/${slug}/page-${n + 1}/` : null
        }
      });
    }
  }
  return pages;
};
