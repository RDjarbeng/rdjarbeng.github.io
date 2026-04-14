import os
import requests
from bs4 import BeautifulSoup
import re
from datetime import datetime, timezone, timedelta
import time
import sys

# Configuration
GALLERY_URL = "https://www.nasa.gov/gallery/return-to-earth/" 
CATEGORY_NAME = "Artemis II"
BASE_OUTPUT_DIR = "_gallery/artemis-ii"

def get_full_description(detail_url, headers):
    """Visits the image detail page to extract the untruncated description."""
    try:
        response = requests.get(detail_url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        meta_desc = soup.find('meta', property='og:description')
        if meta_desc and meta_desc.get('content'):
            return meta_desc.get('content').strip()
            
        meta_desc_name = soup.find('meta', attrs={'name': 'description'})
        if meta_desc_name and meta_desc_name.get('content'):
            return meta_desc_name.get('content').strip()
            
        main_content = soup.find('main') or soup
        paragraphs = main_content.find_all('p')
        if paragraphs:
            longest_p = max(paragraphs, key=lambda p: len(p.text))
            return longest_p.text.strip()
            
    except Exception as e:
        print(f"  -> Failed to fetch details: {e}")
    
    return None

def scrape_and_generate(gallery_url):
    # Extract the gallery slug from the URL (e.g., 'return-to-earth' or 'lunar-flyby')
    clean_url = gallery_url.strip('/')
    parts = clean_url.split('/')
    
    if len(parts) >= 3 and parts[-2] == 'page':
        gallery_slug = parts[-3]
    else:
        gallery_slug = parts[-1]
    
    # Create the dynamic output directory
    output_dir = f"{BASE_OUTPUT_DIR}/{gallery_slug}"
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"Fetching gallery grid: {gallery_url}")
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    response = requests.get(gallery_url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    image_items = soup.find_all('div', class_=re.compile(r'hds-gallery-image'))

    cat_timezone = timezone(timedelta(hours=2))
    current_time = datetime.now(cat_timezone).strftime('%Y-%m-%dT%H:%M:%S%z')
    current_time = current_time[:-2] + ':' + current_time[-2:]

    count = 1 # Started at 1 for cleaner filenames
    for item in image_items:
        link_tag = item.find('a', class_='hds-gallery-item-link')
        if not link_tag or not link_tag.get('href'):
            continue
        detail_url = link_tag.get('href')
        
        img_tag = item.find('img')
        if not img_tag or not img_tag.get('src'):
            continue
        raw_src = img_tag.get('src')
        full_res_src = raw_src.split('?')[0] 
        
        print(f"Diving into details for image {count}...")
        
        full_description = get_full_description(detail_url, headers)
        
        if not full_description:
            caption_div = item.find('div', class_='hds-gallery-item-caption')
            full_description = caption_div.text.strip() if caption_div else img_tag.get('alt', 'Artemis II Image').strip()
            
        # --- TITLE PARSING ---
        # Look for the title after the date parentheses, e.g. "(Date) - Title"
        title_match = re.search(r'\)\s*[-–]\s*(.*)', full_description)
        if title_match:
            clean_title = title_match.group(1).strip()
            # If the title is very long, we might still want it for alt but truncated for cms_title
            if len(clean_title) > 65:
                cms_title = clean_title[:62].rsplit(' ', 1)[0] + '...'
            else:
                cms_title = clean_title
        else:
            # If no dash pattern, use the first sentence or first 60 chars
            first_sent = full_description.split('.')[0].strip()
            if len(first_sent) > 65:
                cms_title = first_sent[:62].rsplit(' ', 1)[0] + '...'
            else:
                cms_title = first_sent if first_sent else "Artemis II Mission Image"
            clean_title = full_description

        # Ensure image_alt is descriptive
        # If full_description is very short, use clean_title
        image_alt_text = full_description if len(full_description) > 20 else clean_title
        if not image_alt_text or image_alt_text.lower() == "artemis ii image":
            image_alt_text = clean_title

        # --- DATE PARSING (For the slug) ---
        # Extracts text inside parentheses, e.g., "April 7, 2026"
        date_match = re.search(r'\((.*?)\)', full_description)
        extracted_date = date_match.group(1).strip() if date_match else "2026"

        # --- SLUG PARSING & REORDERING ---
        # Sluggify up to 75 characters of the main title text to get more context
        title_slug = re.sub(r'[^a-z0-9]+', '-', clean_title.lower()[:75]).strip('-')
        # Sluggify the extracted date
        date_slug = re.sub(r'[^a-z0-9]+', '-', extracted_date.lower()).strip('-')
        
        # Combine: title + date + unique count to prevent overwriting
        slug_base = f"{title_slug}-{date_slug}-{count}"
            
        filename = f"{output_dir}/artemis-ii-{slug_base}.md"
        
        markdown_content = f"""---
title: '{cms_title.replace("'", "''")}'
image: {full_res_src}
image_alt: '{image_alt_text.replace("'", "''")}'
type: external
link: ''
category: {CATEGORY_NAME}
labels:
  - Return to Earth
date: {current_time}
---

{full_description}

[_Image Credit: NASA_]({full_res_src})
"""
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(markdown_content)
        
        print(f"  -> Created: {filename}")
        count += 1
        
        time.sleep(1)

    print(f"\nSuccessfully generated {count - 1} markdown files in {output_dir}/")

if __name__ == "__main__":
    target_url = sys.argv[1] if len(sys.argv) > 1 else GALLERY_URL
    scrape_and_generate(target_url)