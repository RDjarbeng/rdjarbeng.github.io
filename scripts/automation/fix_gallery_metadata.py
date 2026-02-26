import os
import re
import yaml
import requests

def extract_youtube_id(url):
    # Regex to extract YouTube ID from various URL formats
    youtube_regex = (
        r'(https?://)?(www\.)?'
        '(youtube|youtu|youtube-nocookie)\.(com|be)/'
        '(watch\?v=|embed/|v/|shorts/|)([^#&?]+)'
    )
    match = re.match(youtube_regex, url)
    if match:
        return match.group(6)
    return None

def process_gallery_videos(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".md"):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract frontmatter
            parts = content.split('---', 2)
            if len(parts) < 3:
                continue
            
            frontmatter_raw = parts[1]
            body = parts[2]
            
            try:
                frontmatter = yaml.safe_load(frontmatter_raw)
            except yaml.YAMLError as e:
                print(f"Error parsing YAML in {filename}: {e}")
                continue

            changed = False
            
            # 1. Ensure platform is set
            if 'platform' not in frontmatter:
                if 'youtube_id' in frontmatter and frontmatter['youtube_id']:
                    frontmatter['platform'] = 'youtube'
                    changed = True
                elif 'embed_code' in frontmatter and 'tiktok.com' in frontmatter['embed_code']:
                    frontmatter['platform'] = 'tiktok'
                    changed = True
            
            # 2. Extract YouTube ID if it's a full URL
            if frontmatter.get('platform') == 'youtube' and 'youtube_id' in frontmatter:
                yt_id = extract_youtube_id(frontmatter['youtube_id'])
                if yt_id and yt_id != frontmatter['youtube_id']:
                    frontmatter['youtube_id'] = yt_id
                    changed = True

            # 3. Handle TikTok thumbnails
            if frontmatter.get('platform') == 'tiktok':
                if not frontmatter.get('thumbnail'):
                    # Try to extract video URL to find ID
                    embed_code = frontmatter.get('embed_code', '')
                    tiktok_url_match = re.search(r'cite="(https://www.tiktok.com/@[^/]+/video/(\d+))"', embed_code)
                    if tiktok_url_match:
                        video_id = tiktok_url_match.group(2)
                        # TikTok doesn't have a simple public thumbnail API like YouTube
                        # but we can at least flag them or look for common patterns
                        print(f"TikTok video found in {filename} (ID: {video_id}) - Needs thumbnail.")
            
            if changed:
                new_frontmatter = yaml.dump(frontmatter, sort_keys=False, allow_unicode=True).strip()
                new_content = f"---\n{new_frontmatter}\n---{body}"
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filename}")

if __name__ == "__main__":
    gallery_dir = r"C:\Users\Richard\RD\myprojects\rdjarbeng.github.io\_gallery\videos"
    process_gallery_videos(gallery_dir)
