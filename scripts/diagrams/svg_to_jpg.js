// Render an SVG to a JPG at an exact size (for cover images, which must be .jpg and 16:9).
//
//   node scripts/diagrams/svg_to_jpg.js <in.svg> <out.jpg> [--width 1280] [--height 720] [--quality 88]
const path = require("path");
const fs = require("fs");
const puppeteer = require(path.join(process.cwd(), "node_modules", "puppeteer"));

const args = process.argv.slice(2);
const opt = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? dflt : Number(args[i + 1]);
};
const [input, output] = args.filter((a, i) => !a.startsWith("--") && !(args[i - 1] || "").startsWith("--"));
if (!input || !output) {
  console.error("usage: node scripts/diagrams/svg_to_jpg.js <in.svg> <out.jpg> [--width 1280] [--height 720] [--quality 88]");
  process.exit(2);
}
const width = opt("width", 1280);
const height = opt("height", 720);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  const svg = fs.readFileSync(input, "utf8");
  await page.setContent(`<html><body style="margin:0;width:${width}px;height:${height}px;overflow:hidden">${svg}</body></html>`);
  await page.screenshot({ path: output, type: "jpeg", quality: opt("quality", 88), clip: { x: 0, y: 0, width, height } });
  await browser.close();
  console.log(`wrote ${output} (${width}x${height}, ${(fs.statSync(output).size / 1024).toFixed(0)} KB)`);
})();
