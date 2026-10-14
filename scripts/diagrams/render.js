// Render SVG diagrams at the width they appear in a post and check them.
//
//   node scripts/diagrams/render.js <file.svg> [more.svg ...] [--out dir] [--width 800]
//
// For each SVG it writes <name>.png (default: next to this script in ./out/) and reports:
//   - text rendered smaller than 18px (Gmail "Large"; the minimum for this site)
//   - text that runs outside the image
//   - text boxes that overlap each other
//   - text with a stroke-only line or path running through it
// Exit code is 1 when any problem is found, so an agent can loop until it passes.
const path = require("path");
const fs = require("fs");
const puppeteer = require(path.join(process.cwd(), "node_modules", "puppeteer"));

const MIN_PX = 18;
const args = process.argv.slice(2);
let outDir = path.join(__dirname, "out");
let width = 800; // the post column is ~796px wide on desktop
const files = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--out") outDir = args[++i];
  else if (args[i] === "--width") width = Number(args[++i]);
  else files.push(args[i]);
}
if (!files.length) {
  console.error("usage: node scripts/diagrams/render.js <file.svg> [...] [--out dir] [--width 800]");
  process.exit(2);
}
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let failed = false;
  for (const file of files) {
    const svg = fs.readFileSync(file, "utf8");
    await page.setViewport({ width, height: 800 });
    await page.setContent(
      `<html><body style="margin:0"><div style="width:${width}px">${svg}</div></body></html>`
    );
    const report = await page.evaluate((MIN_PX) => {
      const root = document.querySelector("svg");
      const rb = root.getBoundingClientRect();
      const texts = [...root.querySelectorAll("text")].filter((t) => t.textContent.trim());
      const boxes = texts.map((t) => ({ t: t.textContent.trim(), b: t.getBoundingClientRect(), px: parseFloat(getComputedStyle(t).fontSize) * (rb.width / root.viewBox.baseVal.width) }));
      const small = boxes.filter((x) => x.px < MIN_PX - 0.01).map((x) => `${x.px.toFixed(1)}px "${x.t}"`);
      const outside = boxes.filter((x) => x.b.left < rb.left - 1 || x.b.right > rb.right + 1 || x.b.top < rb.top - 1 || x.b.bottom > rb.bottom + 1).map((x) => `"${x.t}"`);
      const overlaps = [];
      for (let i = 0; i < boxes.length; i++)
        for (let j = i + 1; j < boxes.length; j++) {
          const a = boxes[i].b, b = boxes[j].b;
          const w = Math.min(a.right, b.right) - Math.max(a.left, b.left);
          const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
          if (w > 2 && h > 4) overlaps.push(`"${boxes[i].t}" x "${boxes[j].t}"`);
        }
      // text crossed by a stroke-only line or path (sampled across each label)
      const crossed = [];
      const isStrokeOnly = (el) =>
        el.tagName === "line" ||
        (["path", "polyline"].includes(el.tagName) && getComputedStyle(el).fill === "none");
      for (const x of boxes) {
        const { left, right, top, bottom } = x.b;
        let hit = null;
        for (let sx = left + 2; sx < right - 1 && !hit; sx += 3)
          for (const sy of [top + (bottom - top) * 0.4, top + (bottom - top) * 0.7]) {
            const first = document.elementsFromPoint(sx, sy).find((el) => !["text", "tspan"].includes(el.tagName));
            if (first && isStrokeOnly(first)) { hit = first.tagName; break; }
          }
        if (hit) crossed.push(`"${x.t}" crossed by a ${hit}`);
      }
      return { small, outside, overlaps, crossed, height: Math.round(rb.height) };
    }, MIN_PX);
    const out = path.join(outDir, path.basename(file).replace(/\.svg$/i, ".png"));
    await (await page.$("svg")).screenshot({ path: out });
    const problems = [
      ...report.small.map((s) => `  too small: ${s}`),
      ...report.outside.map((s) => `  outside image: ${s}`),
      ...report.overlaps.map((s) => `  overlap: ${s}`),
      ...report.crossed.map((s) => `  crossed: ${s}`),
    ];
    console.log(`${problems.length ? "FAIL" : "ok  "} ${file} (${width}x${report.height}) -> ${out}`);
    problems.forEach((p) => console.log(p));
    if (problems.length) failed = true;
  }
  await browser.close();
  process.exit(failed ? 1 : 0);
})();
