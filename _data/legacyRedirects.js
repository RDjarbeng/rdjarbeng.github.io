// Old URL -> current URL for the first version of the site, which lived under
// the /RDjarbeng/ subpath (rdjarbeng.github.io/RDjarbeng/..., now forwarded by
// GitHub to rdjarbeng.com/RDjarbeng/...). Rendered by legacy-redirects.liquid.
//
// Sources: legacy_urls.json (every URL in that site's sitemap) plus the dated
// Jekyll post URLs /RDjarbeng/<categories>/<yyyy>/<mm>/<dd>/<slug>.html that
// the old sitemap did not list.
const site = require("./site.js");
const legacy = require("./legacy_urls.json");
const renamed = require("./renamed_urls.json").renamed;

const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
const FIXED = {
  "": "/", "about": "/about/", "posts.html": "/posts/", "personal.html": "/personal/",
  "projects.html": "/projects/", "projects": "/projects/", "authors": "/authors/",
  "authors/richard.html": "/authors/richard/", "categories": "/categories/", "tags": "/tags/",
};

module.exports = function () {
  const bySlug = new Map();
  for (const a of site.articles) {
    const last = a.url.replace(/\/$/, "").split("/").pop();
    bySlug.set(norm(last.replace(/^\d{4}-\d{2}-\d{2}-/, "")), a);
    bySlug.set(norm(last), a);
  }
  const categories = new Set(site.categoryIndex.map((c) => c.slug));

  const out = new Map();
  // Some current URLs contain spaces; encode them for the redirect target.
  const add = (from, to) => {
    if (!out.has(from)) out.set(from, { from, to: to.includes("?") ? to : encodeURI(to) });
  };
  const outPath = (p) => (p.endsWith("/") ? p + "index.html" : p);

  for (const path of legacy.paths) {
    const rest = path.replace(/^\/RDjarbeng\/?/, "").replace(/\/$/, "");
    let to = FIXED[rest];
    if (!to && rest.startsWith("tags/")) to = `/tags/?tag=${encodeURIComponent(rest.slice(5))}`;
    if (!to && rest.startsWith("categories/")) {
      const c = rest.slice(11);
      to = categories.has(c) ? `/categories/${c}/` : "/categories/";
    }
    if (!to) {
      const key = rest.split("/").pop().replace(/\.html$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
      const a = bySlug.get(norm(key));
      to = a ? a.url : "/";
    }
    add(outPath(path), to);
  }

  for (const a of site.articles) {
    if (a.url.startsWith("/personal/")) continue;
    const slug = a.url.replace(/^\/|\/$/g, "");
    const d = new Date(a.date);
    const ymd = [d.getUTCFullYear(), String(d.getUTCMonth() + 1).padStart(2, "0"), String(d.getUTCDate()).padStart(2, "0")].join("/");
    const cats = (a.categories || []).map((c) => String(c).toLowerCase()).join("/");
    add(`/RDjarbeng${cats ? "/" + cats : ""}/${ymd}/${slug}.html`, a.url);
  }
  // Posts whose files were renamed to give them clean URLs.
  for (const [from, to] of Object.entries(renamed)) add(`${from}index.html`, to);

  return [...out.values()];
};
