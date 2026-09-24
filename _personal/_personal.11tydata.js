module.exports = {
  layout: "personal",
  tags: ["personal"],
  eleventyComputed: {
    permalink: (data) => {
      if (data.permalink) return data.permalink;
      return `/personal/${data.page.fileSlug}/`;
    }
  }
};
