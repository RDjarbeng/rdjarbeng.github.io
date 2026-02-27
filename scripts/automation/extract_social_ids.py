import os
import re
import yaml

def extract_instagram_id(embed_code):
    match = re.search(r'data-instgrm-permalink="https://www.instagram.com/(reel|p)/([^/]+)/', embed_code)
    if match:
        return match.group(2)
    match = re.search(r'href="https://www.instagram.com/(reel|p)/([^/]+)/', embed_code)
    if match:
        return match.group(2)
    return None

def extract_twitter_id(embed_code):
    match = re.search(r'href="https://twitter.com/[^/]+/status/(\d+)', embed_code)
    if match:
        return match.group(1)
    return None

def process_social_thumbnails(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".md"):
            filepath = os.path.join(directory, filename)
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

            platform = frontmatter.get('platform', '')
            embed_code = frontmatter.get('embed_code', '')
            changed = False
            
            if platform == 'instagram':
                ig_id = extract_instagram_id(embed_code)
                if ig_id:
                    # Instagram has a simple redirect to the thumbnail
                    # but it's not always reliable without a token.
                    # We'll set a custom field for the template to use.
                    if not frontmatter.get('instagram_id'):
                        frontmatter['instagram_id'] = ig_id
                        changed = True
            
            elif platform == 'twitter':
                tw_id = extract_twitter_id(embed_code)
                if tw_id:
                    if not frontmatter.get('twitter_id'):
                        frontmatter['twitter_id'] = tw_id
                        changed = True

            if changed:
                new_frontmatter = yaml.dump(frontmatter, sort_keys=False, allow_unicode=True).strip()
                new_content = f"---\n{new_frontmatter}\n---{body}"
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filename} with social ID")

if __name__ == "__main__":
    gallery_dir = r"C:\Users\Richard\RD\myprojects\rdjarbeng.github.io\_gallery\videos"
    process_social_thumbnails(gallery_dir)
