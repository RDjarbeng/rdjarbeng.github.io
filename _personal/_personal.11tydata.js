const { getPostLastModified } = require("../scripts/git-dates.cjs");

module.exports = {
  layout: "personal",
  tags: ["personal"],
  author: "Richard",
  eleventyComputed: {
    eleventyExcludeFromCollections: (data) => data.published === false,
    permalink: (data) => {
      // Drafts render only on the local dev server (for /review/), never in a real build
      if (data.published === false) return data.devReview || data.buildDrafts ? `/drafts/personal/${data.page.fileSlug}/` : false;
      if (data.permalink) return data.permalink;
      return `/personal/${data.page.fileSlug}/`;
    },
    last_modified_at: (data) => {
      return getPostLastModified(
        data.page.inputPath,
        data.last_modified_at || data.updated,
        data.page.date
      );
    }
  }
};
