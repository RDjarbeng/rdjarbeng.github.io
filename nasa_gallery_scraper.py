import os
import requests
from bs4 import BeautifulSoup
import re
from datetime import datetime, timezone, timedelta

# Configuration 
GALLERY_URL = "https://www.nasa.gov/gallery/artemis-ii-return-to-earth-gallery/" 
CATEGORY_NAME = "Artemis II Mission"
OUTPUT_DIR = "_gallery"

def scrape_and_generate():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print(f"Fetching gallery: {GALLERY_URL}")
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    response = requests.get(GALLERY_URL, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Target images specifically hosted on NASA's image asset CDN
    images = soup.find_all('img', src=re.compile(r'images-assets\.nasa\.gov/image/'))

    # Set up Rwanda time (CAT, UTC+2) for the publish dates
    cat_timezone = timezone(timedelta(hours=2))
    current_time = datetime.now(cat_timezone).strftime('%Y-%m-%dT%H:%M:%S%z')
    current_time = current_time[:-2] + ':' + current_time[-2:]

    count = 0
    for img in images:
        raw_src = img.get('src', '')
        
        # Strip the query parameters to get the clean ~large.jpg URL
        full_res_src = raw_src.split('?')[0]
        
        # Extract the caption. NASA puts the text inside the parent <a> tag.
        parent_a = img.find_parent('a')
        caption_text = ""
        if parent_a:
            # Get the text but remove the image filename that sometimes gets appended
            caption_text = parent_a.text.strip()
            
        # Fallback to the alt attribute just in case
        alt_text = img.get('alt', '').strip()
        
        # Use whichever string is longer/more descriptive
        final_description = caption_text if len(caption_text) > len(alt_text) else alt_text
        
        if not full_res_src or not final_description:
            continue
            
        # Create a clean slug from the first few words of the description
        slug_base = re.sub(r'[^a-z0-9]+', '-', final_description.lower()[:45]).strip('-')
        if not slug_base:
            slug_base = f"nasa-image-{count}"
            
        filename = f"{OUTPUT_DIR}/artemis-ii-return-{slug_base}.md"
        
        markdown_content = f"""---
title: 'Artemis II: Return to Earth'
image: {full_res_src}
image_alt: '{final_description.replace("'", "''")}'
type: external
link: ''
category: {CATEGORY_NAME}
labels:
  - Return to Earth
date: {current_time}
---

{final_description}

_Image Credit: NASA_
"""
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(markdown_content)
        
        print(f"Created: {filename}")
        count += 1

    print(f"\nSuccessfully generated {count} markdown files in {OUTPUT_DIR}/")

if __name__ == "__main__":
    scrape_and_generate()