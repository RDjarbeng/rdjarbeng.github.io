// Book cover images for Enlighten, keyed by book file slug (e.g. "pro-git").
// Covers live in assets/images/books/<slug>.jpg; drop a new file there to add one.
// No front matter needed. Covers were taken from Open Library (openlibrary.org).
const fs = require("fs");
const path = require("path");

module.exports = () => {
  const dir = path.join(__dirname, "..", "assets", "images", "books");
  const covers = {};
  if (!fs.existsSync(dir)) return covers;
  for (const f of fs.readdirSync(dir)) {
    const m = f.match(/^(.+)\.(jpe?g|png|webp)$/i);
    if (m) covers[m[1]] = `/assets/images/books/${f}`;
  }
  return covers;
};
