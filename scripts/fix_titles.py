import os
import re

gallery_dir = '_gallery/artemis-ii'

for root, dirs, files in os.walk(gallery_dir):
    for filename in files:
        if filename.endswith('.md'):
            filepath = os.path.join(root, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Check if title is 'Artemis II Return to Earth'
            if "title: 'Artemis II Return to Earth'" in content or 'title: "Artemis II Return to Earth"' in content or 'title: Artemis II Return to Earth' in content:
                # Extract image_alt
                alt_match = re.search(r"image_alt:\s*['\"](.*?)['\"]", content, re.DOTALL)
                if alt_match:
                    alt_text = alt_match.group(1).strip()
                    # Take first sentence or up to 80 chars
                    first_sentence = alt_text.split('.')[0]
                    if len(first_sentence) > 80:
                        first_sentence = first_sentence[:77] + "..."
                    
                    # Clean up quotes
                    new_title = first_sentence.replace("'", "''")
                    
                    # Replace title
                    new_content = re.sub(
                        r"title:\s*['\"]?Artemis II Return to Earth['\"]?",
                        f"title: '{new_title}'",
                        content
                    )
                    
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {filename}")
                else:
                    # Fallback to filename
                    clean_name = filename.replace('.md', '').replace('-', ' ').title()
                    if len(clean_name) > 80:
                        clean_name = clean_name[:77] + "..."
                    new_content = re.sub(
                        r"title:\s*['\"]?Artemis II Return to Earth['\"]?",
                        f"title: '{clean_name}'",
                        content
                    )
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated (fallback) {filename}")
