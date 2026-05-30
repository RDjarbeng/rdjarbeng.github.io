import os
import yaml

gallery_dir = r"c:\Users\Richard\RD\myprojects\rdjarbeng.github.io\_gallery"

for root, dirs, files in os.walk(gallery_dir):
    for filename in files:
        if not filename.endswith(".md"):
            continue
        filepath = os.path.join(root, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        parts = content.split("---", 2)
        if len(parts) >= 3:
            front_matter = parts[1]
            try:
                yaml.safe_load(front_matter)
            except Exception as e:
                print(f"Error in {filename}: {e}")
