module.exports = {
  layout: "author",
  tags: ["authors"],
  eleventyComputed: {
    permalink: (data) => {
      if (data.permalink) return data.permalink;
      return `/authors/${data.page.fileSlug}/`;
    }
  }
};
