import os
from PIL import Image

input_path = 
output_path_webp = 
output_path_400w_webp = 

try:
    with Image.open(input_path) as img:
        # original as webp
        img.save(output_path_webp, 'WEBP', quality=85)
        
        # 400w
        wpercent = (400 / float(img.size[0]))
        hsize = int((float(img.size[1]) * float(wpercent)))
        img_400 = img.resize((400, hsize), Image.Resampling.LANCZOS)
        img_400.save(output_path_400w_webp, 'WEBP', quality=85)
        print("Success")
except Exception as e:
    print(f"Error: {e}")
