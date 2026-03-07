import os
import re
import urllib.request
import glob

def get_final_url(url):
    try:
        req = urllib.request.Request(url, method='HEAD', headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req, timeout=10)
        return res.geturl()
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return url

def main():
    print("Expanding TikTok shortlinks in _gallery/videos...")
    files = glob.glob('_gallery/videos/*.md')
    modified_count = 0
    
    for file in files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find any 'youtube_id' or 'link' that uses a vt.tiktok.com or vm.tiktok.com shortlink
        matches = list(re.finditer(r'(https://v[mt]\.tiktok\.com/[^\s\"\']+)', content))
        if not matches:
            continue
            
        new_content = content
        for match in matches:
            short_url = match.group(1)
            print(f"Resolving shorturl {short_url} in {file}...")
            final_url = get_final_url(short_url)
            
            # Strip tracking parameters from final url to keep it clean
            if '?' in final_url:
                final_url = final_url.split('?')[0]
                
            print(f"    --> {final_url}")
            new_content = new_content.replace(short_url, final_url)
            modified_count += 1
            
        if modified_count > 0:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)

    print(f"Finished expanding {modified_count} TikTok shortlinks.")

if __name__ == "__main__":
    main()
