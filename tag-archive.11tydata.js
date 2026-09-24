module.exports = {
  eleventyComputed: {
    title: (data) => data.tagItem && data.tagItem.displayName,
    posts: (data) => data.tagItem && data.tagItem.posts,
  },
};
