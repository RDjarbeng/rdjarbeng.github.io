module.exports = {
  layout: "gallery_single",
  tags: ["gallery"],
  eleventyComputed: {
    eleventyExcludeFromCollections: (data) => data.published === false,
    // Single gallery pages that only re-host someone else's media are kept
    // out of search results (noindex, follow): video embeds, memes, NASA
    // images and copies of post covers. Collection pages, your own photos and
    // AI art stay indexable. Set `index: true` on an item to keep it indexable.
    noindex: (data) => {
      if (data.index === true) return false;
      const p = (data.page.inputPath || "").split("\\").join("/");
      return data.type === "video" || data.type === "cover" ||
        /\/_gallery\/(videos|memes|nasa-apod|artemis-ii)\//.test(p);
    },
    permalink: (data) => {
      if (data.published === false) return false;
      if (data.permalink) return data.permalink;
      const inputPath = data.page.inputPath || "";
      const subpath = inputPath
        .replace(/^(\.\/)?_gallery\//, "")
        .replace(/\.[^/.]+$/, "");
      return `/gallery/${subpath}/`;
    }
  }
};
