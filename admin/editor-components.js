// Custom editor components for Sveltia CMS. Loaded by admin/index.html after
// the CMS script. Docs: https://sveltiacms.app/en/docs/api/editor-components

// "Media from gallery": pick any item from the Gallery collection (images,
// memes, YouTube/TikTok/Instagram/X videos) and insert it into a post. It
// writes {% media "<file name>" %}, which lib/media.js turns into the right embed
// with the gallery item's caption and a link back to its gallery page.
CMS.registerEditorComponent({
  id: "media",
  label: "Media from gallery",
  icon: "perm_media",
  mode: "dialog",
  summary: "Gallery: {{item}}",
  fields: [
    {
      name: "item",
      label: "Gallery item",
      widget: "relation",
      collection: "gallery",
      search_fields: ["title"],
      display_fields: ["title"],
      value_field: "{{slug}}",
      hint: "Search by title. Images, memes and videos all live in the Gallery.",
    },
  ],
  pattern: /^\{% media "(?<item>[^"]*)" %\}$/m,
  toBlock: ({ item } = {}) => `{% media "${item || ""}" %}`,
  toPreview: ({ item } = {}) =>
    `<p style="padding:12px;border:1px dashed #999;border-radius:8px;margin:0">
      Gallery media: <code>${item || "none selected"}</code>
    </p>`,
});
