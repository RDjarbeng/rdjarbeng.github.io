// Width/height ratio of a local image, read from its header bytes (JPEG, PNG, WebP, GIF).
// Used by the `img_ratio` / `img_shape` filters so layouts can fit a cover's real shape
// (wide covers on top, square covers beside the text) instead of cropping into one frame.
// Results are cached per path for the life of the process.
const fs = require("fs");
const path = require("path");

const cache = new Map();

function readHeader(file) {
  const fd = fs.openSync(file, "r");
  try {
    const buf = Buffer.alloc(256 * 1024);
    const n = fs.readSync(fd, buf, 0, buf.length, 0);
    return buf.subarray(0, n);
  } finally {
    fs.closeSync(fd);
  }
}

function dimensions(buf) {
  // PNG
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  }
  // GIF
  if (buf.toString("ascii", 0, 3) === "GIF") {
    return { w: buf.readUInt16LE(6), h: buf.readUInt16LE(8) };
  }
  // WebP
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8 ") return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
      const b = buf.readUInt32LE(21);
      return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 };
    }
    if (chunk === "VP8X") return { w: buf.readUIntLE(24, 3) + 1, h: buf.readUIntLE(27, 3) + 1 };
  }
  // JPEG: walk markers until a start-of-frame
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5) };
      }
      i += 2 + len;
    }
  }
  return null;
}

// Returns width / height, or null if the image is remote, missing or unreadable.
function imageRatio(src, root = process.cwd()) {
  if (typeof src !== "string" || !src.startsWith("/") || src.startsWith("//")) return null;
  if (cache.has(src)) return cache.get(src);
  let ratio = null;
  try {
    const file = path.join(root, decodeURIComponent(src.split("?")[0]));
    const d = dimensions(readHeader(file));
    if (d && d.w > 0 && d.h > 0) ratio = d.w / d.h;
  } catch (e) {
    ratio = null;
  }
  cache.set(src, ratio);
  return ratio;
}

module.exports = { imageRatio };
