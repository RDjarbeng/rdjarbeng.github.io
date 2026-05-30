import os
import re
import urllib.request
import urllib.parse
import json

gallery_dir = r"c:\Users\Richard\RD\myprojects\rdjarbeng.github.io\_gallery"

def get_thumbnail(url):
    api_url = f"https://api.microlink.io/?url={urllib.parse.quote(url)}"
    try:
        req = urllib.request.Request(api_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            if data.get('status') == 'success' and data.get('data', {}).get('image'):
                return data['data']['image']['url']
    except Exception as e:
        print(f"Error fetching {url}: {e}")
    return None

for root, dirs, files in os.walk(gallery_dir):
    for filename in files:
        if not filename.endswith(".md"):
            continue
            
        filepath = os.path.join(root, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Match youtube_id that has instagram.com
        match = re.search(r"^youtube_id:\s*'?((?:https?://)?(?:www\.)?instagram\.com/[^\s']+)'?", content, re.MULTILINE)
        if match:
            video_url = match.group(1)
            
            # Check if thumbnail is already set (not empty)
            thumb_match = re.search(r"^thumbnail:\s*'?([^'\n]*)'?", content, re.MULTILINE)
            if thumb_match:
                thumb_val = thumb_match.group(1).strip()
                if thumb_val and thumb_val != "''" and thumb_val != '""':
                    print(f"Skipping {filename}, already has thumbnail: {thumb_val}")
                    continue
            
            print(f"Fetching for {filename} -> {video_url}")
            image_url = get_thumbnail(video_url)
            if image_url:
                print(f"Found image: {image_url}")
                # Replace the thumbnail line
                new_content = re.sub(r"^thumbnail:.*$", f"thumbnail: '{image_url}'", content, flags=re.MULTILINE)
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_content)
            else:
                print("No image found.")
