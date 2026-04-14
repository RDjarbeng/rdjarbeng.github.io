import os
import requests
from bs4 import BeautifulSoup
import re
from datetime import datetime, timezone, timedelta
import time

# Configuration
GALLERY_URL = "https://www.nasa.gov/gallery/return-to-earth/" 
CATEGORY_NAME = "Artemis II Mission"
OUTPUT_DIR = "_gallery"

def get_full_description(detail_url, headers):
    """Visits the image detail page to extract the untruncated description."""
    try:
        response = requests.get(detail_url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Strategy 1: Look for OpenGraph meta description (usually the cleanest full text)
        meta_desc = soup.find('meta', property='og:description')
        if meta_desc and meta_desc.get('content'):
            return meta_desc.get('content').strip()
            
        # Strategy 2: Look for standard meta description
        meta_desc_name = soup.find('meta', attrs={'name': 'description'})
        if meta_desc_name and meta_desc_name.get('content'):
            return meta_desc_name.get('content').strip()
            
        # Strategy 3: Fallback to finding the largest paragraph in the main content
        main_content = soup.find('main') or soup
        paragraphs = main_content.find_all('p')
        if paragraphs:
            # Assume the longest paragraph contains the full image caption
            longest_p = max(paragraphs, key=lambda p: len(p.text))
            return longest_p.text.strip()
            
    except Exception as e:
        print(f"  -> Failed to fetch details: {e}")
    
    return None

def scrape_and_generate():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print(f"Fetching gallery grid: {GALLERY_URL}")
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    response = requests.get(GALLERY_URL, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Target ONLY the image containers. This inherently skips 'hds-gallery-video'
    image_items = soup.find_all('div', class_=re.compile(r'hds-gallery-image'))

    # Set up Central Africa Time (UTC+2)
    cat_timezone = timezone(timedelta(hours=2))
    current_time = datetime.now(cat_timezone).strftime('%Y-%m-%dT%H:%M:%S%z')
    current_time = current_time[:-2] + ':' + current_time[-2:]

    count = 0
    for item in image_items:
        # 1. Get the Detail URL
        link_tag = item.find('a', class_='hds-gallery-item-link')
        if not link_tag or not link_tag.get('href'):
            continue
        detail_url = link_tag.get('href')
        
        # 2. Get the High-Res Image Source
        img_tag = item.find('img')
        if not img_tag or not img_tag.get('src'):
            continue
        raw_src = img_tag.get('src')
        full_res_src = raw_src.split('?')[0] # Strip the resizing parameters
        
        print(f"Diving into details for image {count + 1}...")
        
        # 3. Fetch the full description from the detail page
        full_description = get_full_description(detail_url, headers)
        
        # Fallback to the truncated grid text if the deep dive fails for some reason
        if not full_description:
            caption_div = item.find('div', class_='hds-gallery-item-caption')
            full_description = caption_div.text.strip() if caption_div else img_tag.get('alt', 'Artemis II Image').strip()
            
        # --- NEW: TITLE PARSING ---
        # Look for the closing parenthesis and a hyphen/dash to extract the real sentence
        title_match = re.search(r'\)\s*[-–]\s*(.*)', full_description)
        if title_match:
            clean_title = title_match.group(1).strip()
            # Cap the title at ~65 characters so it doesn't break your CMS layout
            if len(clean_title) > 65:
                clean_title = clean_title[:62].rsplit(' ', 1)[0] + '...'
        else:
            # Fallback if NASA didn't use their standard formatting on an image
            clean_title = "Artemis II Return to Earth"

        # --- NEW: SLUG PARSING ---
        # Remove the leading ID (e.g., "art002e013367 ") before the parenthesis
        slug_text = re.sub(r'^[a-zA-Z0-9_]+\s*(?=\()', '', full_description)
        # Create a clean slug from the remaining text (which now starts with the date)
        slug_base = re.sub(r'[^a-z0-9]+', '-', slug_text.lower()[:50]).strip('-')
        
        if not slug_base:
            slug_base = f"image-{count}"
            
        # --- NEW: FILENAME FORMATTING ---
        filename = f"{OUTPUT_DIR}/artemis-ii-{slug_base}.md"
        
        # 4. Generate SveltiaCMS Markdown
        markdown_content = f"""---
title: '{clean_title.replace("'", "''")}'
image: {full_res_src}
image_alt: '{full_description.replace("'", "''")}'
type: external
link: ''
category: {CATEGORY_NAME}
labels:
  - Return to Earth
date: {current_time}
---

{full_description}

_Image Credit: NASA_
"""
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(markdown_content)
        
        print(f"  -> Created: {filename}")
        count += 1
        
        # Pause for 1 second to be polite to the server
        time.sleep(1)

    print(f"\nSuccessfully generated {count} markdown files in {OUTPUT_DIR}/")

if __name__ == "__main__":
    scrape_and_generate()