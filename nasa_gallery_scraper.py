import os
import requests
from bs4 import BeautifulSoup
import re
from datetime import datetime, timezone, timedelta

# Configuration - Ensure this is the exact URL
GALLERY_URL = "https://www.nasa.gov/gallery/return-to-earth/" 
CATEGORY_NAME = "Artemis II Mission"
OUTPUT_DIR = "_gallery"

def scrape_and_generate():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print(f"Fetching gallery: {GALLERY_URL}")
    # Adding a User-Agent helps prevent the server from serving a stripped-down or blocked page
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    response = requests.get(GALLERY_URL, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Isolate the main content area to avoid sidebars, footers, and news widgets
    main_content = soup.find('main') or soup
    
    # NASA typically wraps actual gallery images inside <figure> tags
    figures = main_content.find_all('figure')
    
    images = []
    for fig in figures:
        img = fig.find('img')
        # Ensure it has a source and is an uploaded image, not a UI icon
        if img and img.get('src') and 'wp-content/uploads' in img.get('src'):
            images.append(img)
            
    # Fallback just in case they aren't using <figure> tags on this specific page
    if not images:
        all_imgs = main_content.find_all('img', src=re.compile(r'wp-content/uploads'))
        # Filter out obvious thumbnail sizes often used in news widgets
        images = [img for img in all_imgs if not re.search(r'-\d+x\d+\.\w+$', img.get('src', ''))]

    cat_timezone = timezone(timedelta(hours=2))
    current_time = datetime.now(cat_timezone).strftime('%Y-%m-%dT%H:%M:%S%z')
    current_time = current_time[:-2] + ':' + current_time[-2:]

    count = 0
    for img in images:
        src = img.get('src')
        alt_text = img.get('alt', '').strip()
        
        # Strip thumbnail dimensions from the URL to get the full-res image
        full_res_src = re.sub(r'-\d+x\d+(?=\.\w+$)', '', src)
        
        # Skip if there's no alt text or if the alt text indicates it's a UI element/logo
        if not full_res_src or not alt_text or "logo" in alt_text.lower():
            continue
            
        slug_base = re.sub(r'[^a-z0-9]+', '-', alt_text.lower()[:50]).strip('-')
        if not slug_base:
            slug_base = f"nasa-image-{count}"
            
        filename = f"{OUTPUT_DIR}/artemis-ii-return-{slug_base}.md"
        
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