import os
import glob
import yaml
import json
import argparse
import urllib.parse
import subprocess
from pathlib import Path
from PIL import Image
from google import genai
from google.genai import types

# Setup the prompt for Gemini
SYSTEM_INSTRUCTION = """
You are an expert content enhancer for a personal blog and gallery.
Your goal is to take a brief, thin caption and an image, and expand it into engaging, SEO-friendly content.
You will also provide a highly descriptive alt text for the image.

    Critical Writing Guidelines:
    1. Expand, Don't Summarize: Add more information and detail to make the post longer and more comprehensive.
    2. Punctuation: Do NOT use em dashes (—) or en dashes (–) or spaced hyphens ( - ) anywhere. Use natural punctuation like commas, periods, semicolons, colons, or parentheses instead.
    3. Tone: Avoid asking questions to the reader. Make punchy, declarative statements. Keep the tone matching the post type.
    4. Formatting: Retain any original hashtags or specific mentions if present.
    5. Intent: The provided Title reflects the user's core intent for the post. Ensure the expanded content aligns with the meaning and spirit of the Title.

    Output your response ONLY in valid JSON format with the following keys:
    - "alt_text": A descriptive alt text for the image (max 150 characters).
    - "content": An expanded, engaging paragraph or two based on the image and the original caption that strictly follows the writing guidelines.

    Do not include markdown codeblocks (like ```json), just output the raw JSON object.
    """

def setup_gemini():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY environment variable not set.")
        return None
    # Using gemini-3.1-flash-lite due to 500 RPD limits, perfect for a backlog
    return genai.Client(api_key=api_key)

def process_file(client, file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Simple frontmatter parsing
    if not content.startswith('---\n'):
        return False
    
    try:
        parts = content.split('---\n', 2)
        if len(parts) < 3:
            return False
        
        frontmatter_str = parts[1]
        body = parts[2]
        data = yaml.safe_load(frontmatter_str) or {}
    except yaml.YAMLError:
        print(f"Failed to parse YAML for {file_path}")
        return False

    if data.get('enhanced_by_bot') == True or data.get('enhanced') == True:
        print(f"Skipping {file_path}, already enhanced.")
        return False
        
    if data.get('type') == 'video':
        print(f"Skipping video post {file_path}")
        return False

    image_path_url = data.get('image')
    if not image_path_url:
        print(f"Skipping {file_path}, no image found.")
        return False

    # Convert /assets/images/... to relative path assets/images/... and unquote URL encoding
    local_img_path = urllib.parse.unquote(image_path_url).lstrip('/')
    if not os.path.exists(local_img_path):
        print(f"❌ Image not found on disk: {local_img_path}")
        return False

    title = data.get('title', 'Untitled')
    original_caption = body.strip()

    print(f"Processing: {file_path}")
    
    try:
        # Load image for Gemini
        img = Image.open(local_img_path)
        
        prompt = f"Title (User's Intent): {title}\nOriginal Caption: {original_caption}\n\nPlease analyze this image, the title (which shows my intent), and the original text. Provide an improved alt text and an expanded, engaging body content in JSON format."
        
        response = client.models.generate_content(
            model='gemini-3.1-flash-lite',
            contents=[img, prompt],
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTION,
                response_mime_type="application/json",
            )
        )
        
        result = json.loads(response.text)
        new_alt = result.get('alt_text', '').strip()
        new_content = result.get('content', '').strip()
        
        if new_alt and new_content:
            data['image_alt'] = new_alt
            data['enhanced_by_bot'] = True
            
            # Reconstruct file
            class NoAliasDumper(yaml.SafeDumper):
                def ignore_aliases(self, data):
                    return True
            new_frontmatter = yaml.dump(data, Dumper=NoAliasDumper, sort_keys=False, allow_unicode=True, width=float("inf"), default_flow_style=False)
            
            # Append new content instead of replacing
            if original_caption:
                new_file_content = f"---\n{new_frontmatter}---\n\n{original_caption}\n\n{new_content}\n"
            else:
                new_file_content = f"---\n{new_frontmatter}---\n\n{new_content}\n"
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_file_content)
                
            print(f"✅ Successfully enhanced {file_path}")
            return True
        else:
            print(f"❌ Failed to extract data from Gemini for {file_path}")
            return False
            
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description="Enhance gallery posts using Gemini.")
    parser.add_argument("--max", type=int, default=10, help="Maximum number of files to process per run.")
    args = parser.parse_args()

    client = setup_gemini()
    if not client:
        return

    # Find all markdown files in _gallery
    gallery_files = glob.glob('_gallery/**/*.md', recursive=True)
    
    # Sort by git commit time, newest first to prioritize recently pushed telegram posts
    # GitHub Actions checkouts reset mtime, so os.path.getmtime doesn't work correctly.
    try:
        result = subprocess.run(
            ['git', 'log', '--name-only', '--pretty=format:', '_gallery'],
            capture_output=True, text=True, check=True
        )
        git_sorted_files = []
        for line in result.stdout.splitlines():
            line = line.strip()
            if line.endswith('.md') and line.startswith('_gallery'):
                # normalize path separators
                line = line.replace('\\', '/')
                if line not in git_sorted_files:
                    git_sorted_files.append(line)
                    
        # Append any untracked or missed files to the end
        gallery_files_normalized = [f.replace('\\', '/') for f in gallery_files]
        untracked = [f for f in gallery_files_normalized if f not in git_sorted_files]
        gallery_files = git_sorted_files + untracked
    except Exception as e:
        print(f"Warning: Failed to sort by git history: {e}")
        gallery_files.sort(key=os.path.getmtime, reverse=True)
    
    processed_count = 0
    for file_path in gallery_files:
        if processed_count >= args.max:
            print(f"Reached maximum process limit ({args.max}). Stopping.")
            break
            
        if process_file(client, file_path):
            processed_count += 1

    print(f"Finished processing {processed_count} files.")

if __name__ == "__main__":
    main()
