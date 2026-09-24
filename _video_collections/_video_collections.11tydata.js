module.exports = {
  layout: "video_collection",
  tags: ["video_collections"],
  eleventyComputed: {
    permalink: (data) => {
      if (data.permalink) return data.permalink;
      return `/gallery/videos/collections/${data.page.fileSlug}/`;
    }
  }
};
