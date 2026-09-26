module.exports = {
  layout: "personal",
  tags: ["personal"],
  author: "Richard",
  eleventyComputed: {
    permalink: (data) => {
      if (data.permalink) return data.permalink;
      return `/personal/${data.page.fileSlug}/`;
    }
  }
};
