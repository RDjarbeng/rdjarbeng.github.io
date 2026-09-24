module.exports = {
  eleventyComputed: {
    title: (data) => data.catItem && data.catItem.displayName,
    posts: (data) => data.catItem && data.catItem.posts,
  },
};
