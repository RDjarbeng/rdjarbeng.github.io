import os
import re
from collections import defaultdict

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
    
    fm = match.group(1)
    in_tags = False
    for line in fm.split('\n'):
        if line.startswith('tags:'):
            in_tags = True
            continue
        if in_tags:
            if line.startswith('  -'):
                tag_match = re.match(r'^\s*-\s*[\'"]?(.*?)[\'"]?$', line)
                if tag_match:
                    t = tag_match.group(1)
                    slug = re.sub(r'[^a-zA-Z0-9]+', '-', t.lower()).strip('-')
                    tag_freq[slug][t] += 1
            elif not line.startswith(' '):
                in_tags = False

canonical_tags = {}
for slug, casings in tag_freq.items():
    if len(casings) > 1:
        # Pick the most frequent, or fallback to the one with more capital letters
        best_case = sorted(casings.items(), key=lambda x: (-x[1], -sum(1 for c in x[0] if c.isupper())))[0][0]
        for casing in casings:
            if casing != best_case:
                canonical_tags[casing] = best_case

# Second pass: Replace directly line by line to preserve formatting
for filename in os.listdir(posts_dir):
    if not filename.endswith('.md'): continue
    filepath = os.path.join(posts_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.read().split('\n')
        
    in_tags = False
    changed = False
    new_lines = []
    
    for i, line in enumerate(lines):
        if line == '---':
            if i > 0 and in_tags:
                in_tags = False
        
        if line.startswith('tags:'):
            in_tags = True
            new_lines.append(line)
            continue
            
        if in_tags:
            if line.startswith('  -'):
                tag_match = re.match(r'^(\s*-\s*[\'"]?)(.*?)([\'"]?)$', line)
                if tag_match:
                    prefix = tag_match.group(1)
                    t = tag_match.group(2)
                    suffix = tag_match.group(3)
                    
                    if t in canonical_tags:
                        new_line = f"{prefix}{canonical_tags[t]}{suffix}"
                        new_lines.append(new_line)
                        changed = True
                    else:
                        new_lines.append(line)
                else:
                    new_lines.append(line)
            elif not line.startswith(' '):
                in_tags = False
                new_lines.append(line)
            else:
                new_lines.append(line)
        else:
            new_lines.append(line)
            
    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write('\n'.join(new_lines))
        print(f"Updated tags in {filename}")
