import os
import glob
import yaml
import json
import argparse
from pathlib import Path
import google.generativeai as genai
from PIL import Image

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
    genai.configure(api_key=api_key)
    # Using gemini-1.5-flash as it's fast and supports multimodal (text + image)
    return genai.GenerativeModel('gemini-1.5-flash', system_instruction=SYSTEM_INSTRUCTION)

def process_file(model, file_path):
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

    if data.get('enhanced') == True:
        print(f"Skipping {file_path}, already enhanced.")
        return False
        
    if data.get('type') == 'video':
        print(f"Skipping video post {file_path}")
        return False

    image_path_url = data.get('image')
    if not image_path_url:
        print(f"Skipping {file_path}, no image found.")
        return False

    # Convert /assets/images/... to relative path assets/images/...
    local_img_path = image_path_url.lstrip('/')
    if not os.path.exists(local_img_path):
        print(f"Image not found on disk: {local_img_path}")
        return False

    title = data.get('title', 'Untitled')
    original_caption = body.strip()

    print(f"Processing: {file_path}")
    
    try:
        # Load image for Gemini
        img = Image.open(local_img_path)
        
        prompt = f"Title: {title}\nOriginal Caption: {original_caption}\n\nPlease analyze this image and the original text. Provide an improved alt text and an expanded, engaging body content in JSON format."
        
        response = model.generate_content(
            [img, prompt],
            generation_config=genai.GenerationConfig(
                response_mime_type="application/json",
            )
        )
        
        result = json.loads(response.text)
        new_alt = result.get('alt_text', '').strip()
        new_content = result.get('content', '').strip()
        
        if new_alt and new_content:
            data['image_alt'] = new_alt
            data['enhanced'] = True
            
            # Reconstruct file
            new_frontmatter = yaml.dump(data, sort_keys=False, allow_unicode=True)
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

    model = setup_gemini()
    if not model:
        return

    # Find all markdown files in _gallery
    gallery_files = glob.glob('_gallery/**/*.md', recursive=True)
    
    processed_count = 0
    for file_path in gallery_files:
        if processed_count >= args.max:
            print(f"Reached maximum process limit ({args.max}). Stopping.")
            break
            
        if process_file(model, file_path):
            processed_count += 1

    print(f"Finished processing {processed_count} files.")

if __name__ == "__main__":
    main()
