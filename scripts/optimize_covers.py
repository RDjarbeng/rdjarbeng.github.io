"""Shrink oversized cover images in the built site before deploy.

Reads _site/cover-images.txt (written by the Eleventy build), and for every
local .jpg/.jpeg over LIMIT bytes resizes it to at most 1200px wide at JPEG
quality 78, in place. Replaces an ImageMagick step whose apt-get install
alone took 7 to 10 minutes on GitHub's runners.

    python scripts/optimize_covers.py [site_dir]
"""
import os
import sys
import urllib.parse

from PIL import Image

LIMIT = 600 * 1024
MAX_WIDTH = 1200

site = sys.argv[1] if len(sys.argv) > 1 else "_site"
listing = os.path.join(site, "cover-images.txt")
if not os.path.exists(listing):
    print("No cover-images.txt found, skipping.")
    sys.exit(0)

done = 0
for raw in open(listing, encoding="utf-8"):
    path = raw.strip()
    if not path or path.startswith("http") or not path.lower().endswith((".jpg", ".jpeg")):
        continue
    full = os.path.join(site, urllib.parse.unquote(path).lstrip("/"))
    if not os.path.isfile(full) or os.path.getsize(full) <= LIMIT:
        continue
    before = os.path.getsize(full)
    with Image.open(full) as im:
        im = im.convert("RGB")
        if im.width > MAX_WIDTH:
            im = im.resize((MAX_WIDTH, round(im.height * MAX_WIDTH / im.width)), Image.LANCZOS)
        im.save(full, "JPEG", quality=78, optimize=True, progressive=True)
    print(f"  {path}: {before // 1024} KB -> {os.path.getsize(full) // 1024} KB")
    done += 1
print(f"Optimized {done} image(s).")
