import os
import yaml
import re

def review_captions(directory):
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

            caption = frontmatter.get('caption', '')
            platform = frontmatter.get('platform', '')
            yt_id = frontmatter.get('youtube_id', '')
            title = frontmatter.get('title', '')

            # Heuristic: Check for generic captions or descriptions that seem AI-generated without detail
            # Or if it's too short/missing.
            # Richard mentioned "make sure the captions match the video content"
            # I will print them for review or look for obvious mismatches.
            
            if platform == 'youtube' and yt_id:
                print(f"--- REVIEW: {filename} ---")
                try:
                    print(f"Title: {title}")
                    print(f"YouTube ID: {yt_id}")
                    print(f"Caption: {caption[:200]}...")
                except UnicodeEncodeError:
                    print(f"Title: {title.encode('ascii', 'ignore').decode()}")
                    print(f"YouTube ID: {yt_id}")
                    print(f"Caption: {caption[:200].encode('ascii', 'ignore').decode()}...")
                print("-" * 20)

if __name__ == "__main__":
    gallery_dir = r"C:\Users\Richard\RD\myprojects\rdjarbeng.github.io\_gallery\videos"
    review_captions(gallery_dir)
