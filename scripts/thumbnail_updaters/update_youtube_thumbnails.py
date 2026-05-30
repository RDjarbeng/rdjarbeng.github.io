import os
import re
import urllib.request

gallery_dir = r"c:\Users\Richard\RD\myprojects\rdjarbeng.github.io\_gallery\videos"
assets_dir = r"c:\Users\Richard\RD\myprojects\rdjarbeng.github.io\assets\images\videos"

# Make sure assets dir exists
os.makedirs(assets_dir, exist_ok=True)

posts = []

# Collect posts
for root, dirs, files in os.walk(gallery_dir):
    for filename in files:
        if not filename.endswith(".md"):
            continue
            
        filepath = os.path.join(root, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Check if platform is youtube
        if re.search(r"^platform:\s*'?youtube'?", content, re.MULTILINE):
            # Check if thumbnail is empty
            thumb_match = re.search(r"^thumbnail:\s*'?([^'\n]*)'?", content, re.MULTILINE)
            thumb_val = thumb_match.group(1).strip() if thumb_match else ""
            if not thumb_val or thumb_val == "''" or thumb_val == '""':
                # Get Date for sorting
                date_match = re.search(r"^date:\s*'?([^\n']*)'?", content, re.MULTILINE)
                date_str = date_match.group(1).strip() if date_match else "2000-01-01"
                
                # Get youtube_id
                yt_match = re.search(r"^youtube_id:\s*'?([^'\n]+)'?", content, re.MULTILINE)
                if yt_match:
                    youtube_id = yt_match.group(1).strip()
                    posts.append({
                        "filepath": filepath,
                        "filename": filename,
                        "youtube_id": youtube_id,
                        "date": date_str,
                        "content": content
                    })

# Sort by date desc
posts.sort(key=lambda x: x["date"], reverse=True)

# Process top 15
for post in posts[:15]:
    yt_url = post["youtube_id"]
    
    # Extract video ID
    vid_id = ""
    if "youtu.be/" in yt_url:
        vid_id = yt_url.split("youtu.be/")[-1].split("?")[0]
    elif "shorts/" in yt_url:
        vid_id = yt_url.split("shorts/")[-1].split("?")[0]
    elif "v=" in yt_url:
        vid_id = yt_url.split("v=")[-1].split("&")[0]
    else:
        vid_id = yt_url

    if not vid_id:
        print(f"Could not extract ID from {yt_url}")
        continue
        
    print(f"Fetching for {post['filename']} (ID: {vid_id})")
    
    # Try maxresdefault first, then hqdefault
    img_urls = [
        f"https://img.youtube.com/vi/{vid_id}/maxresdefault.jpg",
        f"https://img.youtube.com/vi/{vid_id}/hqdefault.jpg"
    ]
    
    saved_path = ""
    for url in img_urls:
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response:
                img_data = response.read()
                filename = f"youtube_{vid_id}.jpg"
                local_path = os.path.join(assets_dir, filename)
                with open(local_path, "wb") as f:
                    f.write(img_data)
                saved_path = f"assets/images/videos/{filename}"
                print(f"  -> Saved {url} to {saved_path}")
                break
        except Exception as e:
            pass

    if saved_path:
        # Update content
        new_content = re.sub(r"^thumbnail:.*$", f"thumbnail: '/{saved_path}'", post["content"], flags=re.MULTILINE)
        with open(post["filepath"], "w", encoding="utf-8") as f:
            f.write(new_content)
    else:
        print("  -> Failed to download image")
