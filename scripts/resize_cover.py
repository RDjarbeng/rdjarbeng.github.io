import sys
import os
try:
    from PIL import Image
except ImportError:
    print("Pillow is not installed. Please install it using 'pip install Pillow'")
    sys.exit(1)

if len(sys.argv) > 1:
    img_path = sys.argv[1]
else:
    img_path = "c:/Users/Richard/RD/myprojects/rdjarbeng.github.io/assets/images/google_bans_antigravity.png"

try:
    img = Image.open(img_path)
    # Ensure it's RGB
    img = img.convert("RGB")
    
    # Get the background color from the top-left pixel to match it perfectly
    bg_color = img.getpixel((5, 5))
    
    # Target size 16:9 (1280x720)
    target_width = 1280
    target_height = 720
    
    # Resize the 640x640 image to 720x720 to fill the height
    img_resized = img.resize((target_height, target_height), Image.Resampling.LANCZOS)
    
    # Create the new canvas
    new_img = Image.new("RGB", (target_width, target_height), bg_color)
    
    # Paste the resized image squarely in the center
    offset_x = (target_width - target_height) // 2
    new_img.paste(img_resized, (offset_x, 0))
    
    new_img.save(img_path)
    print("Successfully padded and resized image to 1280x720 (16:9)")
except Exception as e:
    print(f"Error processing image: {e}")
    sys.exit(1)
