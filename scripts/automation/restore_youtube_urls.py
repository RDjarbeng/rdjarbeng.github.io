import os
import yaml
import re

def restore_youtube_urls(directory):
    for root, dirs, files in os.walk(directory):
        for filename in files:
            if filename.endswith(".md"):
                filepath = os.path.join(root, filename)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                parts = content.split('---', 2)
                if len(parts) < 3:
                    continue
                
                frontmatter_raw = parts[1]
                body = parts[2]
                
                try:
                    frontmatter = yaml.safe_load(frontmatter_raw)
                except yaml.YAMLError:
                    continue

                if frontmatter.get('platform') == 'youtube' and 'youtube_id' in frontmatter:
                    yt_id = frontmatter['youtube_id']
                    # Check if it's just the ID (usually 11 chars)
                    if len(yt_id) == 11 and not yt_id.startswith('http'):
                        frontmatter['youtube_id'] = f"https://www.youtube.com/watch?v={yt_id}"
                        
                        new_frontmatter = yaml.dump(frontmatter, sort_keys=False, allow_unicode=True).strip()
                        new_content = f"---\n{new_frontmatter}\n---{body}"
                        
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Restored URL in {filename}")

if __name__ == "__main__":
    gallery_dir = r"C:\Users\Richard\RD\myprojects\rdjarbeng.github.io\_gallery\videos"
    restore_youtube_urls(gallery_dir)
