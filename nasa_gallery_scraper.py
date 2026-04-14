import os
import requests
from bs4 import BeautifulSoup
import re
from datetime import datetime, timezone, timedelta

# Configuration
GALLERY_URL = "https://www.nasa.gov/gallery/return-to-earth/" # Change this for other phases
CATEGORY_NAME = "Artemis II Mission"
OUTPUT_DIR = "_gallery"

def scrape_and_generate():
    # Ensure the output directory exists
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print(f"Fetching gallery: {GALLERY_URL}")
    response = requests.get(GALLERY_URL)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # NASA typically wraps gallery images in figures or specific classes
    # We will look for images that are hosted in their wp-content uploads
    images = soup.find_all('img', src=re.compile(r'wp-content/uploads'))
    
    # Get current time in CAT (UTC+2) for the publish date
    cat_timezone = timezone(timedelta(hours=2))
    current_time = datetime.now(cat_timezone).strftime('%Y-%m-%dT%H:%M:%S%z')
    # Format the timezone offset to have a colon, e.g., +02:00
    current_time = current_time[:-2] + ':' + current_time[-2:]

    count = 0
    for img in images:
        src = img.get('src')
        alt_text = img.get('alt', '').strip()
        
        # Skip small thumbnails if possible, or clean the URL to get the full resolution
        # NASA often adds '-150x150' or similar to thumbnails. Let's strip that if it exists.
        full_res_src = re.sub(r'-\d+x\d+(?=\.\w+$)', '', src)
        
        if not full_res_src or not alt_text:
            continue
            
        # Generate a slug from the first few words of the alt text, or use an index
        slug_base = re.sub(r'[^a-z0-9]+', '-', alt_text.lower()[:50]).strip('-')
        if not slug_base:
            slug_base = f"nasa-image-{count}"
            
        filename = f"{OUTPUT_DIR}/artemis-ii-return-{slug_base}.md"
        
        # SveltiaCMS Markdown Frontmatter
        markdown_content = f"""---
title: 'Artemis II: Return to Earth'
image: {full_res_src}
image_alt: '{alt_text.replace("'", "''")}'
type: external
link: ''
category: {CATEGORY_NAME}
labels:
  - Return to Earth
date: {current_time}
---

{alt_text}

_Image Credit: NASA_
"""
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(markdown_content)
        
        print(f"Created: {filename}")
        count += 1

    print(f"\nSuccessfully generated {count} markdown files in {OUTPUT_DIR}/")

if __name__ == "__main__":
    scrape_and_generate()