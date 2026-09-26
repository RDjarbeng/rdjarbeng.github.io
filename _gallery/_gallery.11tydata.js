module.exports = {
  layout: "gallery_single",
  tags: ["gallery"],
  eleventyComputed: {
    eleventyExcludeFromCollections: (data) => data.published === false,
    permalink: (data) => {
      if (data.published === false) return false;
      if (data.permalink) return data.permalink;
      const subpath = data.page.filePathStem.replace(/^\/_gallery\//, "");
      return `/gallery/${subpath}/`;
    }
  }
};
