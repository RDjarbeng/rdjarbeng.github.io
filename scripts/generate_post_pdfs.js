const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const mimeTypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

function cleanExcerptText(text) {
  if (!text) return "";
  const cleaned = text
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*`_~>!]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (cleaned.length <= 180) return cleaned;
  return cleaned.slice(0, 180).trim() + "...";
}

async function generatePdfs() {
  console.log("=== Generating High-Quality Post PDFs for Library ===");
  const siteData = require("../_data/site.js");
  const posts = (siteData.posts || []).filter((p) => (p.read_time || 0) >= 10);

  console.log(`Found ${posts.length} deep-dive posts (>= 10 min read).`);

  const documentsDir = path.resolve(__dirname, "../documents");
  const siteDir = path.resolve(__dirname, "../_site");
  const stylesPath = path.resolve(__dirname, "../assets/css/styles.css");

  if (!fs.existsSync(documentsDir)) {
    fs.mkdirSync(documentsDir, { recursive: true });
  }

  const css = fs.existsSync(stylesPath) ? fs.readFileSync(stylesPath, "utf8") : "";

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--allow-file-access-from-files",
      "--enable-local-file-accesses",
    ],
  });

  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }]);

  // Read existing library_pdfs.yml to preserve custom manual entries (e.g. user presentation)
  const yamlPath = path.resolve(__dirname, "../_data/library_pdfs.yml");
  let existingEntries = [];
  if (fs.existsSync(yamlPath)) {
    try {
      existingEntries = yaml.load(fs.readFileSync(yamlPath, "utf8")) || [];
    } catch (e) {
      console.warn("Could not parse existing library_pdfs.yml:", e.message);
    }
  }

  // Filter out any fabricated resume or old generated entries, keep actual manual documents
  const customEntries = existingEntries.filter((item) => {
    if (item.is_generated) return false;
    if (item.id === "resume-richard-djarbeng") return false;
    return true;
  });

  const generatedEntries = [];

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const slug = post.url.replace(/^\/|\/$/g, "");
    const htmlPath = path.join(siteDir, slug, "index.html");

    if (!fs.existsSync(htmlPath)) {
      console.warn(`[Skip] HTML not found for: ${post.title} at ${htmlPath}`);
      continue;
    }

    const pdfFileName = `${slug}.pdf`;
    const pdfPath = path.join(documentsDir, pdfFileName);

    console.log(`[${i + 1}/${posts.length}] Generating PDF for: "${post.title}"...`);

    let html = fs.readFileSync(htmlPath, "utf8");

    // Inline images as Base64 to guarantee 100% reliable rendering in PDF
    html = html.replace(/<img\s+([^>]*?)src=["'](\/assets\/[^"']+)["']([^>]*?)>/gi, (match, before, src, after) => {
      const localImgPath = path.join(siteDir, src);
      if (fs.existsSync(localImgPath)) {
        const ext = path.extname(src).toLowerCase();
        const mime = mimeTypes[ext] || "image/jpeg";
        const b64 = fs.readFileSync(localImgPath).toString("base64");
        return `<img ${before}src="data:${mime};base64,${b64}"${after}>`;
      }
      return match;
    });

    // Strip external scripts and external stylesheets
    html = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<link\b[^>]*rel=["'](?:preconnect|stylesheet)["'][^>]*href=["']https?:\/\/[^"']+["'][^>]*>/gi, "")
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "");

    // Inject compiled print & theme CSS
    const injection = `<style>${css}</style>`;
    if (html.includes("</head>")) {
      html = html.replace("</head>", `${injection}</head>`);
    } else {
      html = `${injection}${html}`;
    }

    await page.setContent(html, { waitUntil: "domcontentloaded", timeout: 20000 });
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "light");
      document.body.setAttribute("data-theme", "light");
    });
    await page.emulateMediaType("print");

    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: {
        top: "1.6cm",
        bottom: "1.6cm",
        left: "1.4cm",
        right: "1.4cm",
      },
    });

    const stat = fs.statSync(pdfPath);
    const sizeKb = Math.round(stat.size / 1024);

    generatedEntries.push({
      id: `post-${slug}`,
      title: post.title,
      url: `/documents/${pdfFileName}`,
      file: `/documents/${pdfFileName}`,
      file_name: pdfFileName,
      file_size: `${sizeKb} KB`,
      read_time: post.read_time,
      image: post.image || null,
      image_alt: post.image_alt || null,
      author: post.author_info ? post.author_info.display_name : (post.author || "Richard Djarbeng"),
      date: post.formatted_date || "2026",
      formatted_date: post.formatted_date || "2026",
      clean_excerpt: cleanExcerptText(post.clean_excerpt || post.excerpt),
      tags: post.tags || [],
      categories: post.categories || [],
      is_generated: true,
    });

    console.log(`  -> Saved: ${pdfFileName} (${sizeKb} KB)`);
  }

  await browser.close();

  // Combine custom manual entries first, followed by generated whitepapers
  const combinedEntries = [...customEntries, ...generatedEntries];
  fs.writeFileSync(yamlPath, yaml.dump(combinedEntries, { lineWidth: -1 }));
  console.log(`\nSuccessfully updated ${yamlPath} with ${combinedEntries.length} total PDF documents!`);
}

generatePdfs().catch((err) => {
  console.error("Fatal error generating PDFs:", err);
  process.exit(1);
});
