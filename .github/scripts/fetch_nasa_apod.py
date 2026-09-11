import json
import os
import re
import sys
import time
import urllib.request
import urllib.error
from datetime import datetime
from html import unescape

APOD_API_URL = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
APOD_WEB_URL = "https://apod.nasa.gov/apod/astropix.html"
GALLERY_DIR = os.path.join("_gallery", "nasa-apod")

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def get_youtube_id(url):
    match = re.search(r'(?:v=|\/embed\/|\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})', url)
    return match.group(1) if match else None

def fetch_from_api(retries=3, delay=5):
    req = urllib.request.Request(
        APOD_API_URL,
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    )
    for attempt in range(1, retries + 1):
        try:
            print(f"Fetching APOD from API (attempt {attempt}/{retries})...")
            with urllib.request.urlopen(req, timeout=30) as response:
                return json.loads(response.read().decode('utf-8'))
        except urllib.error.HTTPError as e:
            print(f"API attempt {attempt} failed with HTTP {e.code}: {e.reason}")
        except Exception as e:
            print(f"API attempt {attempt} failed: {e}")
        
        if attempt < retries:
            time.sleep(delay * attempt)
    return None

def fetch_from_web():
    print("Attempting fallback fetch directly from NASA APOD webpage...")
    req = urllib.request.Request(
        APOD_WEB_URL,
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            html = response.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Fallback fetch failed: {e}")
        return None

    # Parse date (e.g. 2026 September 11)
    m_date = re.search(r'(\d{4})\s+([A-Za-z]+)\s+(\d{1,2})', html)
    if not m_date:
        print("Fallback: could not parse date from HTML.")
        return None
    year, month_name, day = m_date.groups()
    dt = datetime.strptime(f"{year} {month_name} {day}", "%Y %B %d")
    date_str = dt.strftime("%Y-%m-%d")

    # Parse media URL & type
    media_type = "image"
    raw_url = ""
    m_img = re.search(r'<IMG\s+SRC=[\'"]?(image/[^\'">\s]+)[\'"]?', html, re.I) or re.search(r'<a\s+href=[\'"]?(image/[^\'">\s]+)[\'"]?>', html, re.I)
    if m_img:
        raw_url = f"https://apod.nasa.gov/apod/{m_img.group(1)}"
    else:
        m_iframe = re.search(r'<iframe[^>]+src=[\'"]([^\'">\s]+)[\'"]', html, re.I)
        if m_iframe:
            media_type = "video"
            raw_url = m_iframe.group(1)

    # Parse title
    raw_title = "Astronomy Picture of the Day"
    m_title = re.search(r'<center>[\s\S]*?<b>\s*([^<\n\r]+?)\s*</b>\s*<br>[\s\S]*?(?:Image\s+Credit|Credit\s*&|<b>\s*Explanation)', html, re.I)
    if m_title:
        raw_title = m_title.group(1).strip()

    # Parse copyright
    copyright_info = ""
    m_cr = re.search(r'(?:Image\s+Credit\s*&?\s*Copyright|Credit\s*&?\s*Copyright)[^:]*:\s*</b>\s*([^<]+)', html, re.I)
    if m_cr:
        copyright_info = re.sub(r'\s+', ' ', unescape(m_cr.group(1))).strip()

    # Parse explanation
    explanation = ""
    m_exp = re.search(r'<b>\s*Explanation:\s*</b>([\s\S]*?)(?:<p>\s*<center>|<b>\s*Tomorrow\'s\s+picture|<hr>)', html, re.I)
    if m_exp:
        exp_clean = re.sub(r'<[^>]+>', '', m_exp.group(1))
        explanation = ' '.join(exp_clean.split())

    return {
        "date": date_str,
        "title": raw_title,
        "explanation": explanation,
        "media_type": media_type,
        "url": raw_url,
        "hdurl": raw_url,
        "copyright": copyright_info
    }

def main():
    os.makedirs(GALLERY_DIR, exist_ok=True)
    
    data = fetch_from_api()
    if not data:
        data = fetch_from_web()

    if not data or not data.get("date"):
        print("Failed to fetch NASA APOD data from both API and webpage fallback.")
        sys.exit(1)

    date_str = data.get("date")
    raw_title = data.get("title", "Astronomy Picture of the Day").strip()
    explanation = data.get("explanation", "").strip()
    media_type = data.get("media_type", "image")
    raw_url = data.get("url") or data.get("hdurl", "")
    copyright_info = data.get("copyright", "").strip().replace("\n", " ")
    
    date_formatted = datetime.strptime(date_str, "%Y-%m-%d")
    try:
        short_date = date_formatted.strftime("%b %#d, %y")
        readable_date = date_formatted.strftime("%B %#d, %Y")
    except ValueError:
        short_date = date_formatted.strftime("%b %d, %y").replace(" 0", " ")
        readable_date = date_formatted.strftime("%B %d, %Y").replace(" 0", " ")
        
    yymmdd = date_formatted.strftime("%y%m%d")
    apod_page_link = f"https://apod.nasa.gov/apod/ap{yymmdd}.html"

    # Title with short date (e.g. Sep 4, 26)
    display_title = f"NASA Picture of the Day: {raw_title} ({short_date})"
    
    filename = f"{date_str}-{slugify(raw_title)}.md"
    file_path = os.path.join(GALLERY_DIR, filename)

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
    escaped_display_title = display_title.replace('"', '\\"')
    escaped_raw_title = raw_title.replace('"', '\\"')

    md_content = f"""---
title: "{escaped_display_title}"
date: {iso_date}
image: "{image_url}"
image_alt: "NASA Picture of the Day - {escaped_raw_title} ({short_date})"
type: {item_type}
category: NASA APOD
labels:
  - NASA
  - APOD
  - Space
link: "{apod_page_link}"
{extra_fields}---

> 🌌 **NASA Picture of the Day — {readable_date}**
> 
> **{raw_title}**

{explanation}{copyright_line}

---
*Source: [NASA Astronomy Picture of the Day]({apod_page_link})*
"""

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(md_content)

    print(f"Successfully created NASA APOD gallery entry: {file_path}")

if __name__ == "__main__":
    main()
