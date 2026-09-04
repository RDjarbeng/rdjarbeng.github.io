import json
import os
import re
import sys
import urllib.request
from datetime import datetime

APOD_API_URL = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
GALLERY_DIR = os.path.join("_gallery", "nasa-apod")

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def get_youtube_id(url):
    match = re.search(r'(?:v=|\/embed\/|\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})', url)
    return match.group(1) if match else None

def main():
    os.makedirs(GALLERY_DIR, exist_ok=True)
    
    req = urllib.request.Request(
        APOD_API_URL,
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
    except Exception as e:
        print(f"Error fetching NASA APOD: {e}")
        sys.exit(1)
        
    date_str = data.get("date") # YYYY-MM-DD
    if not date_str:
        print("Invalid APOD response: missing date.")
        sys.exit(1)

    title = data.get("title", "NASA Picture of the Day")
    explanation = data.get("explanation", "").strip()
    media_type = data.get("media_type", "image")
    raw_url = data.get("hdurl") or data.get("url", "")
    copyright_info = data.get("copyright", "").strip().replace("\n", " ")
    
    date_formatted = datetime.strptime(date_str, "%Y-%m-%d")
    yymmdd = date_formatted.strftime("%y%m%d")
    apod_page_link = f"https://apod.nasa.gov/apod/ap{yymmdd}.html"
    
    slug = slugify(title)
    filename = f"{date_str}-{slug}.md"
    file_path = os.path.join(GALLERY_DIR, filename)
    
    if os.path.exists(file_path):
        print(f"APOD entry for {date_str} already exists at {file_path}. Skipping.")
        return

    extra_fields = ""
    if media_type == "image":
        item_type = "external"
        image_url = raw_url
    elif media_type == "video":
        yt_id = get_youtube_id(raw_url)
        if yt_id:
            item_type = "video"
            image_url = f"https://img.youtube.com/vi/{yt_id}/hqdefault.jpg"
            extra_fields = f"platform: youtube\nyoutube_id: '{yt_id}'\n"
        else:
            item_type = "external"
            image_url = raw_url
    else:
        item_type = "external"
        image_url = raw_url

    iso_date = f"{date_str}T00:00:00+00:00"
    copyright_line = f"\n\n*Credit & Copyright: {copyright_info}*" if copyright_info else ""
    escaped_title = title.replace('"', '\\"')

    md_content = f"""---
title: "{escaped_title}"
date: {iso_date}
image: "{image_url}"
image_alt: "NASA Picture of the Day - {escaped_title}"
type: {item_type}
category: NASA APOD
labels:
  - NASA
  - APOD
  - Space
link: "{apod_page_link}"
{extra_fields}---

{explanation}{copyright_line}

*Source: [NASA Astronomy Picture of the Day]({apod_page_link})*
"""

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(md_content)

    print(f"Successfully created NASA APOD gallery entry: {file_path}")

if __name__ == "__main__":
    main()
