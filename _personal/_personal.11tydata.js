module.exports = {
  layout: "personal",
  tags: ["personal"],
  author: "Richard",
  eleventyComputed: {
    eleventyExcludeFromCollections: (data) => data.published === false,
    permalink: (data) => {
      if (data.published === false) return false;
      if (data.permalink) return data.permalink;
      return `/personal/${data.page.fileSlug}/`;
    }
  }
};
