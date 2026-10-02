module.exports = {
  layout: "gallery_single",
  tags: ["gallery"],
  eleventyComputed: {
    eleventyExcludeFromCollections: (data) => data.published === false,
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
