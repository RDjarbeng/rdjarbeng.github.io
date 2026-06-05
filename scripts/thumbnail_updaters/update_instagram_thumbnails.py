import os
import re
import urllib.request
import urllib.parse
import json

REPO_ROOT = r"c:\Users\Richard\RD\myprojects\rdjarbeng.github.io"
gallery_dir = os.path.join(REPO_ROOT, "_gallery")
covers_dir = os.path.join(REPO_ROOT, "assets", "images", "videos")

os.makedirs(covers_dir, exist_ok=True)


def get_thumbnail_url(url):
    """Fetch the thumbnail URL via microlink.io for a given Instagram URL."""
    api_url = f"https://api.microlink.io/?url={urllib.parse.quote(url)}"
    try:
        req = urllib.request.Request(api_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            if data.get("status") == "success" and data.get("data", {}).get("image"):
                return data["data"]["image"]["url"]
    except Exception as e:
        print(f"  Error fetching microlink for {url}: {e}")
    return None


def download_image(image_url, dest_path):
    """Download a remote image to dest_path. Returns True on success."""
    try:
        req = urllib.request.Request(image_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as response:
            with open(dest_path, "wb") as f:
                f.write(response.read())
        return True
    except Exception as e:
        print(f"  Error downloading image {image_url}: {e}")
        return False


for root, dirs, files in os.walk(gallery_dir):
    for filename in files:
        if not filename.endswith(".md"):
            continue

        filepath = os.path.join(root, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        # Match youtube_id that has instagram.com
        match = re.search(
            r"^youtube_id:\s*'?((?:https?://)?(?:www\.)?instagram\.com/[^\s']+)'?",
            content,
            re.MULTILINE,
        )
        if not match:
            continue

        video_url = match.group(1)

        # Check if thumbnail is already set (non-empty)
        thumb_match = re.search(r"^thumbnail:\s*'?([^'\n]*)'?", content, re.MULTILINE)
        if thumb_match:
            thumb_val = thumb_match.group(1).strip()
            if thumb_val and thumb_val not in ("''", '""', "") and "cdninstagram.com" not in thumb_val:
                print(f"Skipping {filename} — already has thumbnail: {thumb_val}")
                continue

        print(f"Fetching for {filename} -> {video_url}")
        image_url = get_thumbnail_url(video_url)
        if not image_url:
            print("  No image URL found.")
            continue

        print(f"  Found image URL: {image_url[:80]}...")

        # Derive a local filename from the md filename (strip .md, add .jpg)
        base_name = os.path.splitext(filename)[0]
        ext = ".jpg"
        if ".png" in image_url.lower():
            ext = ".png"
        elif ".webp" in image_url.lower():
            ext = ".webp"
        local_filename = f"{base_name}-cover{ext}"
        dest_path = os.path.join(covers_dir, local_filename)

        # Skip download if file already exists
        if os.path.exists(dest_path):
            print(f"  File already exists locally: {local_filename}")
        else:
            success = download_image(image_url, dest_path)
            if not success:
                print("  Download failed, skipping front matter update.")
                continue
            print(f"  Downloaded to: assets/images/videos/{local_filename}")

        # Write the local path into the front matter
        local_ref = f"/assets/images/videos/{local_filename}"
        new_content = re.sub(
            r"^thumbnail:.*$",
            f"thumbnail: '{local_ref}'",
            content,
            flags=re.MULTILINE,
        )
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"  Updated front matter: thumbnail: '{local_ref}'")
