// /review/ exists only under `eleventy --serve`; a normal build writes nothing for it.
module.exports = {
  eleventyExcludeFromCollections: true,
  eleventyComputed: {
    permalink: (data) => (data.devReview ? "/review/" : false),
  },
};
