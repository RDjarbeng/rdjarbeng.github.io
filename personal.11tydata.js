module.exports = {
  eleventyComputed: {
    custom_pager: (data) => {
      if (!data.pagination) return null;
      const p = data.pagination;
      const curr = p.pageNumber + 1;
      const total = p.pages.length;
      return {
        posts: data.paged_posts || [],
        current_page: curr,
        total_pages: total,
        previous_page: curr > 1 ? curr - 1 : null,
        next_page: curr < total ? curr + 1 : null,
        total_posts: (data.collections.personal || []).length,
        per_page: p.size,
      };
    },
  },
};
