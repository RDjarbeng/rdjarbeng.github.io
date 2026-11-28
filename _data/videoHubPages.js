// Pages for the hand-written video hubs (/gallery/videos/ and one per
// platform), PER_PAGE videos each, newest first. The Jekyll custom-pagination
// plugin used to give these pages their `custom_pager`; galleryPages.js skips
// them because the hub templates own those URLs. Each hub paginates over its
// list here with `alias: custom_pager`, so the templates need no changes.
const site = require("./site.js");

const PER_PAGE = 12;
const HUBS = {
  all: { base: "/gallery/videos/", match: () => true },
  youtube: { base: "/gallery/videos/youtube/", match: (i) => i.platform === "youtube" },
  tiktok: { base: "/gallery/videos/tiktok/", match: (i) => i.platform === "tiktok" },
  instagram: { base: "/gallery/videos/instagram/", match: (i) => i.platform === "instagram" },
  twitter: { base: "/gallery/videos/twitter/", match: (i) => i.platform === "twitter" }
};

const pageUrl = (base, n) => (n === 1 ? base : `${base}page-${n}/`);

module.exports = function () {
  const videos = site.gallery
    .filter((i) => i.type === "video")
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const out = {};
  for (const [key, { base, match }] of Object.entries(HUBS)) {
    const items = videos.filter((i) => match({ ...i, platform: (i.platform || "").toLowerCase() }));
    const total = Math.max(1, Math.ceil(items.length / PER_PAGE));
    out[key] = [];
    for (let n = 1; n <= total; n++) {
      out[key].push({
        url: pageUrl(base, n),
        current_page: n,
        per_page: PER_PAGE,
        total_pages: total,
        total_posts: items.length,
        posts: items.slice((n - 1) * PER_PAGE, n * PER_PAGE),
        previous_page: n > 1 ? n - 1 : null,
        next_page: n < total ? n + 1 : null,
        previous_page_path: n > 1 ? pageUrl(base, n - 1) : null,
        next_page_path: n < total ? pageUrl(base, n + 1) : null
      });
    }
  }
  return out;
};
