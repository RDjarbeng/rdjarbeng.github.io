import os
import re

directory = r'c:\Users\Richard\RD\myprojects\rdjarbeng.github.io\_gallery\videos'

for filename in os.listdir(directory):
    if not filename.endswith('.md'):
        continue
    filepath = os.path.join(directory, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if it's an instagram video
    if 'platform: instagram' not in content:
        continue

    # Extract instagram_id
    match = re.search(r'^instagram_id:\s*(\w+)', content, re.MULTILINE)
    instagram_id = None
    if match:
        instagram_id = match.group(1)
    
    # Check for the link placed at the end of the file by the user
    end_link_match = re.search(r'https?://(www\.)?instagram\.com/(p|reel)/([\w-]+)/?', content)
    if not instagram_id and end_link_match:
        instagram_id = end_link_match.group(3)
    
    # Remove the link if it was placed after the frontmatter
    # Usually it looks like:
    # ---
    # https://...
    if re.search(r'^---\s*\nhttps?://(www\.)?instagram\.com/[^\s]+', content, re.MULTILINE):
        content = re.sub(r'(^---\s*\n)https?://(www\.)?instagram\.com/[^\s]+', r'\1', content, flags=re.MULTILINE)
    elif re.search(r'https?://(www\.)?instagram\.com/[^\s]+\s*$', content):
        content = re.sub(r'https?://(www\.)?instagram\.com/[^\s]+\s*$', '', content)

    # Insert instagram_id and link into frontmatter if missing
    new_content = content
    if instagram_id:
        # Check if instagram_id is in frontmatter, if not add it
        if not re.search(r'^instagram_id:\s*', new_content, re.MULTILINE):
            new_content = re.sub(r'^(---\s*\n)', rf'\1instagram_id: {instagram_id}\n', new_content)
        
        # Check if link is in frontmatter
        if not re.search(r'^link:\s*', new_content, re.MULTILINE):
            new_content = re.sub(r'^(---\s*\n)', rf'\1link: https://www.instagram.com/p/{instagram_id}/\n', new_content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")

