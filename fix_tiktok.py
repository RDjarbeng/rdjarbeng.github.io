import os
import re
import urllib.request
import glob

def get_final_url(url):
    try:
        # Use a real user-agent since some services block default python agents
        req = urllib.request.Request(url, method='HEAD', headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req, timeout=10)
        return res.geturl()
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return url

files = glob.glob('_gallery/videos/*.md')
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Look for youtube_id with a vt.tiktok.com shortlink
    match = re.search(r'youtube_id:\s*(https://vt\.tiktok\.com/[^\s]+)', content)
    if match:
        short_url = match.group(1)
        print(f"Resolving shorturl {short_url} in {file}...")
        final_url = get_final_url(short_url)
        
        # Strip tracking parameters from final url
        if '?' in final_url:
            final_url = final_url.split('?')[0]
            
        print(f"    --> {final_url}")
        new_content = content.replace(short_url, final_url)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)

print("Done fixing TikTok links.")
