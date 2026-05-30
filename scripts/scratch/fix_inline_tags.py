import os
import re
from collections import defaultdict
import yaml

posts_dir = '_posts'
tag_freq = defaultdict(lambda: defaultdict(int))

# First pass: Count frequencies
for filename in os.listdir(posts_dir):
    if not filename.endswith('.md'): continue
    filepath = os.path.join(posts_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not match: continue
    
    try:
        fm = yaml.safe_load(match.group(1))
        if fm and 'tags' in fm and isinstance(fm['tags'], list):
            for t in fm['tags']:
                if isinstance(t, str):
                    clean_t = t.replace('- ', '', 1) if t.startswith('- ') else t
                    slug = re.sub(r'[^a-zA-Z0-9]+', '-', clean_t.lower()).strip('-')
                    tag_freq[slug][clean_t] += 1
    except:
        pass

canonical_tags = {}
for slug, casings in tag_freq.items():
    if len(casings) > 1:
        # Pick the most frequent, or fallback to the one with more capital letters
        best_case = sorted(casings.items(), key=lambda x: (-x[1], -sum(1 for c in x[0] if c.isupper())))[0][0]
        for casing in casings:
            if casing != best_case:
                canonical_tags[casing] = best_case

# Second pass: Replace directly
for filename in os.listdir(posts_dir):
    if not filename.endswith('.md'): continue
    filepath = os.path.join(posts_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    changed = False
    
    # Handle inline tags: [tag1, tag2]
    def replace_inline(match):
        global changed
        tags_content = match.group(1)
        tags_list = tags_content.split(',')
        new_tags = []
        for t in tags_list:
            t_strip = t.strip()
            # remove quotes if any
            clean_t = t_strip.strip("'\"")
            if clean_t in canonical_tags:
                new_t = t.replace(clean_t, canonical_tags[clean_t])
                new_tags.append(new_t)
                changed = True
            else:
                new_tags.append(t)
        return "tags: [" + ",".join(new_tags) + "]"

    content = re.sub(r'^tags:\s*\[(.*?)\]', replace_inline, content, flags=re.MULTILINE)

    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated inline tags in {filename}")
