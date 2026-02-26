import os
import yaml
import re

def migrate_captions(directory):
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
                body = parts[2].strip()
                
                try:
                    # Use a loader that preserves order if possible, 
                    # but safe_load is fine for simple refactoring
                    frontmatter = yaml.safe_load(frontmatter_raw)
                except yaml.YAMLError:
                    continue

                if 'caption' in frontmatter:
                    caption = frontmatter.pop('caption')
                    
                    # If body already has content, prepend the caption
                    if body:
                        new_body = f"{caption}\n\n{body}"
                    else:
                        new_body = caption
                    
                    # Reconstruct file
                    new_frontmatter = yaml.dump(frontmatter, sort_keys=False, allow_unicode=True).strip()
                    new_content = f"---\n{new_frontmatter}\n---\n\n{new_body}\n"
                    
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Migrated {filename}")

if __name__ == "__main__":
    gallery_dir = r"C:\Users\Richard\RD\myprojects\rdjarbeng.github.io\_gallery"
    migrate_captions(gallery_dir)
