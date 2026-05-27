import os
import yaml
from collections import defaultdict
import re

tags = defaultdict(list)
posts_dir = '_posts'

for filename in os.listdir(posts_dir):
    if not filename.endswith('.md'): continue
    filepath = os.path.join(posts_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not match: continue
    
    try:
        fm = yaml.safe_load(match.group(1))
        if fm and 'tags' in fm:
            post_tags = fm['tags']
            if isinstance(post_tags, list):
                for t in post_tags:
                    if isinstance(t, str):
                        slug = re.sub(r'[^a-zA-Z0-9]+', '-', t.lower()).strip('-')
                        tags[slug].append(t)
    except Exception as e:
        pass

for slug, t_list in tags.items():
    unique_tags = list(set(t_list))
    if len(unique_tags) > 1:
        print(f"Slug: {slug} -> {unique_tags}")
