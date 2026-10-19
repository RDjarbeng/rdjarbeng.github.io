// Pass the precomputed page (see _data/galleryPages.js) to the
// gallery_category layout under the names it already reads.
module.exports = {
  eleventyComputed: {
    title: (data) => (data.gp ? data.gp.title : data.title),
    custom_pager: (data) => (data.gp ? data.gp.pager : undefined),
    description: (data) => (data.gp ? `${data.gp.title} in Richard Djarbeng's gallery.` : data.description)
  }
};
