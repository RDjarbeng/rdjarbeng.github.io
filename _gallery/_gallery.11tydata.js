module.exports = {
  layout: "gallery_single",
  tags: ["gallery"],
  eleventyComputed: {
    permalink: (data) => {
      if (data.permalink) return data.permalink;
      const subpath = data.page.filePathStem.replace(/^\/_gallery\//, "");
      return `/gallery/${subpath}/`;
    }
  }
};
