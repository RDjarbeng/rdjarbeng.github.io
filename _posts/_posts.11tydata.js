module.exports = {
  layout: "post",
  body_class: "post-page",
  tags: ["posts"],
  author: "Richard",
  eleventyComputed: {
    permalink: (data) => {
      if (data.permalink) return data.permalink;
      return `/${data.page.fileSlug}/`;
    }
  }
};
