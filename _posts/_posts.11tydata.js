module.exports = {
  layout: "post",
  body_class: "post-page has-side-toc",
  tags: ["posts"],
  author: "Richard",
  eleventyComputed: {
    eleventyExcludeFromCollections: (data) => data.published === false,
    permalink: (data) => {
      if (data.published === false) return false;
      if (data.permalink) return data.permalink;
      return `/${data.page.fileSlug}/`;
    }
  }
};
