import os
import re
from collections import defaultdict
import yaml

posts_dir = '_posts'
tag_freq = defaultdict(lambda: defaultdict(int))

# First pass: count frequencies of tag casings per slug
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

# Determine canonical form for each slug
canonical_tags = {}
for slug, casings in tag_freq.items():
    # pick the casing with the highest frequency, fallback to alphabetical
    best_case = sorted(casings.items(), key=lambda x: (-x[1], x[0]))[0][0]
    canonical_tags[slug] = best_case

# Second pass: replace tags
for filename in os.listdir(posts_dir):
    if not filename.endswith('.md'): continue
    filepath = os.path.join(posts_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.match(r'^---\n(.*?)\n---(.*)', content, re.DOTALL)
    if not match: continue
    
    fm_text = match.group(1)
    body = match.group(2)
    
    # We will do a simple regex replace for the tags list lines
    lines = fm_text.split('\n')
    in_tags = False
    new_lines = []
    changed = False
    
    for line in lines:
        if line.startswith('tags:'):
            in_tags = True
            new_lines.append(line)
        elif in_tags and line.startswith('  -'):
            # Extract the tag value
            t_match = re.match(r'^\s*-\s*[\'"]?(.*?)[\'"]?$', line)
            if t_match:
                t = t_match.group(1)
                clean_t = t.replace('- ', '', 1) if t.startswith('- ') else t
                slug = re.sub(r'[^a-zA-Z0-9]+', '-', clean_t.lower()).strip('-')
                
                # Replace with canonical
                if slug in canonical_tags:
                    canonical = canonical_tags[slug]
                    # We will quote it if it contains spaces or colons just in case, but safe default is yaml quote
                    new_line = f"  - '{canonical}'"
                    if new_line != line:
                        changed = True
                    new_lines.append(new_line)
                else:
                    new_lines.append(line)
            else:
                new_lines.append(line)
        elif in_tags and not line.startswith(' '):
            in_tags = False
            new_lines.append(line)
        else:
            new_lines.append(line)
            
    if changed:
        new_content = f"---\n{chr(10).join(new_lines)}\n---{body}"
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated tags in {filename}")

