/**
 * unsplash_composite.js
 * 
 * Fetches an editorial photo from Unsplash, applies contextual styling/filters
 * (duotone, warm matte, crop, frame), overlays blog typography, avatar, and watermark,
 * and renders a production-ready 16:9 (1280x720) JPG for rdjarbeng.com.
 *
 * Usage:
 *   node scripts/diagrams/unsplash_composite.js --query "supercomputer server" \
 *     --title "SCALING AGENT INFRASTRUCTURE" \
 *     --hook "THE HARDWARE REALITIES OF LOCAL AI" \
 *     --out assets/images/posts/covers/demo_unsplash_cover.jpg \
 *     --with-avatar
 */

const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

// 1. Locate and parse .env for UNSPLASH_ACCESS_KEY
function getUnsplashKey() {
  if (process.env.UNSPLASH_ACCESS_KEY) return process.env.UNSPLASH_ACCESS_KEY;
  const envPaths = [
    path.join(process.cwd(), "scripts", "telegram-bot", ".env"),
    path.join(process.cwd(), ".env")
  ];
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf8");
      const match = content.match(/UNSPLASH_ACCESS_KEY=(.+)/);
      if (match && match[1].trim()) {
        return match[1].trim();
      }
    }
  }
  throw new Error("UNSPLASH_ACCESS_KEY not found in scripts/telegram-bot/.env or .env");
}

// 2. Parse CLI arguments
const args = process.argv.slice(2);
function getArg(flag, defaultValue = "") {
  const idx = args.indexOf(`--${flag}`);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : defaultValue;
}
const hasArg = (flag) => args.includes(`--${flag}`);

const query = getArg("query", "vintage computer terminal");
const title = getArg("title", "ARCHIVAL SYSTEMS & COMPUTE");
const hook = getArg("hook", "RETRIEVING LOST PATTERNS IN MODERN AI");
const layout = getArg("layout", "cover"); // "cover" (1280x720) or "body" (inline post figure)
const outPath = getArg("out", path.join("assets", "images", "posts", "covers", "demo_unsplash_cover.jpg"));
const withAvatar = hasArg("with-avatar") || hasArg("avatar");
const filterMode = getArg("filter", "editorial-warm"); // options: editorial-warm, duotone-navy, monochrome, natural

async function searchUnsplash(accessKey, rawQuery) {
  const attempts = [rawQuery];
  const words = rawQuery.trim().split(/\s+/);
  if (words.length > 2) {
    attempts.push(words.slice(0, 2).join(" "));
    attempts.push(words[0]);
  }

  for (const q of attempts) {
    console.log(`[Unsplash] Searching for: "${q}"...`);
    const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&orientation=landscape&per_page=3&content_filter=high`;
    const res = await fetch(searchUrl, {
      headers: { Authorization: `Client-ID ${accessKey}` }
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Unsplash API error (${res.status}): ${errorText}`);
    }
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return data.results[0];
    }
  }
  throw new Error(`No images found on Unsplash for query: "${rawQuery}" (including fallback terms)`);
}

async function run() {
  const startTime = Date.now();
  const accessKey = getUnsplashKey();

  const photo = await searchUnsplash(accessKey, query);
  console.log(`[Unsplash] Selected photo by ${photo.user.name} (${photo.id})`);

  // Unsplash API requirement: Trigger download endpoint
  if (photo.links && photo.links.download_location) {
    fetch(photo.links.download_location, {
      headers: { Authorization: `Client-ID ${accessKey}` }
    }).catch(err => console.warn(`[Unsplash] Failed to trigger download endpoint:`, err.message));
  }

  // Fetch image bytes and convert to base64 for reliable Puppeteer rendering
  const imageUrl = photo.urls.regular || photo.urls.full;
  console.log(`[Unsplash] Fetching image from: ${imageUrl}...`);
  const imgRes = await fetch(imageUrl);
  const imgBuffer = Buffer.from(await imgRes.arrayBuffer());
  const imgBase64 = `data:image/jpeg;base64,${imgBuffer.toString("base64")}`;

  // Avatar base64 if requested
  let avatarBase64 = "";
  if (withAvatar) {
    const avatarPath = path.join(process.cwd(), "assets", "images", "logo.jpeg");
    if (fs.existsSync(avatarPath)) {
      const avatarBuf = fs.readFileSync(avatarPath);
      avatarBase64 = `data:image/jpeg;base64,${avatarBuf.toString("base64")}`;
    }
  }

  // 3. Build HTML template adhering to blog style guide
  // - 1280x720 canvas (16:9)
  // - Cream matte background (#f4f1e6)
  // - Solid #141414 text
  // - Bold typography
  // - Minimalist framing
  // - Watermark: rdjarbeng.com
  // - Subtle attribution
  const photographer = photo.user.name;

  let filterCss = "";
  if (filterMode === "editorial-warm") {
    // Warm vintage editorial film look: high contrast, slight sepia & warm tint
    filterCss = "filter: contrast(1.1) saturate(0.85) sepia(0.15) brightness(0.95);";
  } else if (filterMode === "duotone-navy") {
    // High-contrast duotone navy styling
    filterCss = "filter: grayscale(1) contrast(1.2); mix-blend-mode: multiply;";
  } else if (filterMode === "monochrome") {
    filterCss = "filter: grayscale(1) contrast(1.2) brightness(0.95);";
  }

  const isBody = layout === "body";
  const canvasWidth = isBody ? 800 : 1280;
  const canvasHeight = isBody ? 500 : 720;

  const html = isBody ? `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: ${canvasWidth}px;
      height: ${canvasHeight}px;
      overflow: hidden;
      background-color: #f4f1e6;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      padding: 24px;
      display: flex;
      flex-direction: column;
    }
    .figure-card {
      flex: 1;
      width: 100%;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
      border: 2px solid #141414;
      background: #141414;
      box-shadow: 0 8px 24px rgba(20, 20, 20, 0.1);
      display: flex;
      flex-direction: column;
    }
    .photo-wrap {
      flex: 1;
      position: relative;
      overflow: hidden;
    }
    .photo-inner {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 35%;
      display: block;
      ${filterCss}
    }
    .caption-bar {
      background: #fdfcf9;
      border-top: 1.5px solid #141414;
      padding: 12px 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #141414;
    }
    .caption-title {
      font-size: 15px;
      font-weight: 700;
      letter-spacing: -0.2px;
    }
    .caption-credit {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      opacity: 0.65;
    }
  </style>
</head>
<body>
  <div class="figure-card">
    <div class="photo-wrap">
      <img class="photo-inner" src="${imgBase64}" alt="${photo.alt_description || query}" />
    </div>
    <div class="caption-bar">
      <div class="caption-title">${title}</div>
      <div class="caption-credit">Photo: ${photographer} / Unsplash</div>
    </div>
  </div>
</body>
</html>` : `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1280px;
      height: 720px;
      overflow: hidden;
      background-color: #f4f1e6;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      position: relative;
    }
    
    /* Matte texture / subtle editorial grid lines */
    .grid-lines {
      position: absolute;
      top: 0; left: 0; width: 1280px; height: 720px;
      pointer-events: none;
      opacity: 0.35;
    }

    /* Main Container */
    .container {
      width: 1280px;
      height: 720px;
      padding: 56px 64px 44px 64px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      z-index: 2;
    }

    /* Header section: Hook & Avatar */
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .hook-badge {
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #141414;
      background: #e5dfd0;
      padding: 6px 14px;
      border-radius: 4px;
      display: inline-block;
    }
    .author-pill {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 255, 255, 0.7);
      padding: 4px 12px 4px 5px;
      border-radius: 20px;
      border: 1px solid #d5cfc0;
    }
    .author-pill img {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      object-fit: cover;
    }
    .author-pill span {
      font-size: 13px;
      font-weight: 700;
      color: #141414;
    }

    /* Headline: Must be bold, prominent, solid #141414 */
    .headline-wrap {
      margin-top: 4px;
      margin-bottom: 24px;
      max-width: 1100px;
    }
    .headline {
      font-size: 58px;
      line-height: 1.05;
      font-weight: 900;
      color: #141414;
      letter-spacing: -0.5px;
      text-transform: uppercase;
    }

    /* Photographic Frame / Card */
    .photo-stage {
      flex: 1;
      width: 100%;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
      background: #141414;
      box-shadow: 0 12px 30px rgba(20, 20, 20, 0.12);
      border: 2px solid #141414;
    }
    .photo-inner {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 35%;
      display: block;
      ${filterCss}
    }

    /* Matte film overlay tint */
    .matte-tint {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(180deg, rgba(244, 241, 230, 0.05) 0%, rgba(20, 20, 20, 0.25) 100%);
      pointer-events: none;
    }

    /* Bottom Footer Bar */
    .footer-bar {
      margin-top: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      font-weight: 600;
      color: #141414;
    }
    .photo-credit {
      opacity: 0.65;
      letter-spacing: 0.5px;
    }
    .watermark {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 1.5px;
      color: #141414;
    }
  </style>
</head>
<body>
  <!-- Background Vector Accent Grid -->
  <svg class="grid-lines" xmlns="http://www.w3.org/2000/svg">
    <line x1="64" y1="0" x2="64" y2="720" stroke="#141414" stroke-width="0.5" stroke-dasharray="4 8" />
    <line x1="1216" y1="0" x2="1216" y2="720" stroke="#141414" stroke-width="0.5" stroke-dasharray="4 8" />
    <line x1="0" y1="56" x2="1280" y2="56" stroke="#141414" stroke-width="0.5" stroke-dasharray="4 8" />
    <line x1="0" y1="676" x2="1280" y2="676" stroke="#141414" stroke-width="0.5" stroke-dasharray="4 8" />
  </svg>

  <div class="container">
    <div>
      <div class="top-bar">
        <div class="hook-badge">${hook}</div>
        ${withAvatar && avatarBase64 ? `
        <div class="author-pill">
          <img src="${avatarBase64}" alt="Richard Djarbeng" />
          <span>rdjarbeng.com</span>
        </div>` : ""}
      </div>

      <div class="headline-wrap">
        <h1 class="headline">${title}</h1>
      </div>
    </div>

    <!-- Editorial Photographic Window -->
    <div class="photo-stage">
      <img class="photo-inner" src="${imgBase64}" alt="${photo.alt_description || query}" />
      <div class="matte-tint"></div>
    </div>

    <!-- Footer with Watermark and Photo Credit -->
    <div class="footer-bar">
      <div class="photo-credit">PHOTO: ${photographer.toUpperCase()} / UNSPLASH</div>
      <div class="watermark">rdjarbeng.com</div>
    </div>
  </div>
</body>
</html>`;

  // 4. Render to JPEG via Puppeteer
  console.log(`[Renderer] Launching Puppeteer to capture ${canvasWidth}x${canvasHeight} JPG...`);
  const launchOptions = {};
  const sysChrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    launchOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  } else if (fs.existsSync(sysChrome)) {
    launchOptions.executablePath = sysChrome;
  }

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();
  await page.setViewport({ width: canvasWidth, height: canvasHeight, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "networkidle0" });

  // Ensure output directory exists
  const absOut = path.resolve(outPath);
  fs.mkdirSync(path.dirname(absOut), { recursive: true });

  await page.screenshot({
    path: absOut,
    type: "jpeg",
    quality: 88,
    clip: { x: 0, y: 0, width: canvasWidth, height: canvasHeight }
  });

  await browser.close();

  const stat = fs.statSync(absOut);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  const sizeKb = (stat.size / 1024).toFixed(1);

  console.log(`✅ Success! Rendered ${layout} in ${elapsed}s:`);
  console.log(`   Path: ${absOut}`);
  console.log(`   Dimensions: ${canvasWidth}x${canvasHeight}`);
  console.log(`   File Size: ${sizeKb} KB`);
  console.log(`   Attribution: Photo by ${photographer} on Unsplash`);
}

run().catch((err) => {
  console.error("❌ Composite workflow failed:", err.message);
  process.exit(1);
});
