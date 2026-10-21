// {% media "videos/flying-tesla-roadster-powered-by-spacex" %}
//
// Embeds a gallery item in a post by its path under _gallery/ (no ".md").
// The CMS inserts this tag through the "Media from gallery" editor component
// (admin/editor-components.js), so captions, credits and embed details live
// once on the gallery item and every post that uses it stays in sync.
// Platform rules follow _layouts/gallery_single.html.

const escape = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function youtubeParts(raw) {
  let id = raw;
  if (raw.includes("youtube.com/watch")) id = raw.split("v=").pop().split("&")[0];
  else if (raw.includes("youtube.com/shorts/")) id = raw.split("shorts/").pop().split("?")[0];
  else if (raw.includes("youtu.be/")) id = raw.split("youtu.be/").pop().split("?")[0];
  else if (raw.includes("?list=")) id = raw.split("?list=")[0];
  else if (raw.includes("&list=")) id = raw.split("&list=")[0];
  const list = raw.includes("list=") ? raw.split("list=").pop().split("&")[0] : "";
  return { id, list };
}

function lastIdAfter(raw, marker) {
  return raw.includes(marker) ? raw.split(marker).pop().split("?")[0].split("/")[0] : raw;
}

function renderMedia(item) {
  const title = escape(item.title);
  const raw = String(item.youtube_id || item.link || "").trim();

  if (item.type === "video") {
    if (item.platform === "youtube" && raw) {
      const { id, list } = youtubeParts(raw);
      const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}${list ? `?list=${encodeURIComponent(list)}` : ""}`;
      return `<div class="media-embed__frame media-embed__frame--16x9"><iframe src="${src}" title="${title}" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    }
    if (item.platform === "instagram") {
      const id = escape(item.instagram_id || lastIdAfter(lastIdAfter(raw, "instagram.com/p/"), "instagram.com/reel/"));
      if (id) return `<div class="media-embed__frame media-embed__frame--tall"><iframe src="https://www.instagram.com/p/${id}/embed" title="${title}" loading="lazy" scrolling="no" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`;
    }
    if (item.platform === "tiktok") {
      const id = escape(lastIdAfter(raw, "/video/"));
      if (id) return `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@a/video/${id}" data-video-id="${id}"><section></section></blockquote><script async src="https://www.tiktok.com/embed.js"></script>`;
    }
    if (item.platform === "twitter") {
      const id = escape(lastIdAfter(raw, "/status/"));
      if (id) return `<blockquote class="twitter-tweet" data-dnt="true"><a href="https://twitter.com/x/status/${id}"></a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`;
    }
    if (item.embed_code) return item.embed_code;
  }

  if (item.image) {
    const alt = escape(item.image_alt || item.title);
    return `<img src="${escape(item.image)}" alt="${alt}" loading="lazy">`;
  }
  return "";
}

module.exports = function registerMedia(eleventyConfig, siteData) {
  eleventyConfig.addShortcode("media", (path) => {
    const key = String(path || "").trim().replace(/^\/+|\/+$/g, "").replace(/\.md$/, "");
    const item = (siteData.gallery || []).find((g) => g.relative_path === `_gallery/${key}.md`);
    if (!item) {
      console.warn(`[media] No gallery item at _gallery/${key}.md`);
      return "";
    }
    const body = renderMedia(item);
    if (!body) return "";
    return `<figure class="media-embed">${body}<figcaption>${escape(item.title)} · <a href="${escape(item.url)}">View in gallery</a></figcaption></figure>`;
  });
};
