import requests
import json
import os
import xml.etree.ElementTree as ET
import re
import subprocess
import sys

# --changed: submit only pages whose source changed in the last commit range (default HEAD~1..HEAD,
# or the range given after --changed). Used by the deploy workflow. Without it, the whole sitemap is sent.
def changed_slugs(rev_range):
    try:
        out = subprocess.run(["git", "diff", "--name-only", "--diff-filter=AMR", rev_range, "--", "_posts", "_personal"],
                             capture_output=True, text=True, check=True).stdout
    except Exception as e:
        print(f"Could not read changed files: {e}")
        return set()
    slugs = set()
    for f in out.split():
        name = os.path.splitext(os.path.basename(f))[0]
        slugs.add(re.sub(r"^\d{4}-\d{2}-\d{2}-", "", name).lower())
    return slugs

def submit_to_indexnow():
    host = "rdjarbeng.com"
    key = "c1a71520d5504c3b932e5cce4931df21"
    
    # Path to sitemap.xml in the build output
    sitemap_path = os.path.join("_site", "sitemap.xml")
    
    if not os.path.exists(sitemap_path):
        # In CI after deploy there is no _site folder: read the live sitemap instead
        try:
            r = requests.get(f"https://{host}/sitemap.xml", timeout=30)
            r.raise_for_status()
            os.makedirs("_site", exist_ok=True)
            with open(sitemap_path, "wb") as fh:
                fh.write(r.content)
        except Exception as e:
            print(f"Error: no local sitemap and could not fetch the live one: {e}")
            return

    # Parse sitemap.xml for all URLs
    urls = []
    try:
        tree = ET.parse(sitemap_path)
        root = tree.getroot()
        
        # XML namespaces can be tricky with ElementTree
        # The default namespace is usually 'http://www.sitemaps.org/schemas/sitemap/0.9'
        ns = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        
        for url_node in root.findall("ns:url", ns):
            loc = url_node.find("ns:loc", ns)
            if loc is not None:
                url_text = loc.text
                # Replace localhost with production domain if building locally
                if "localhost:4000" in url_text:
                    url_text = url_text.replace("http://localhost:4000", f"https://{host}")
                urls.append(url_text)
                
    except Exception as e:
        print(f"Error parsing sitemap: {e}")
        return

    if "--changed" in sys.argv:
        i = sys.argv.index("--changed")
        rev_range = sys.argv[i + 1] if len(sys.argv) > i + 1 else "HEAD~1..HEAD"
        slugs = changed_slugs(rev_range)
        urls = [u for u in urls if u.rstrip("/").split("/")[-1].lower() in slugs]
        print(f"Changed pages in {rev_range}: {len(urls)}")

    if not urls:
        print("No URLs to submit.")
        return

    payload = {
        "host": host,
        "key": key,
        "urlList": urls
    }
    
    # Endpoints for IndexNow
    endpoints = [
        "https://api.indexnow.org/indexnow",
        "https://www.bing.com/indexnow",
        "https://yandex.com/indexnow"
    ]
    
    print(f"Submitting {len(urls)} URLs from sitemap to IndexNow...")
    
    for url in endpoints:
        try:
            r = requests.post(
                url,
                headers={"Content-Type": "application/json; charset=utf-8"},
                json=payload,
                timeout=15
            )
            print(f"{url}: {r.status_code}")
            if r.status_code != 200 and r.status_code != 202:
                print(f"  Response: {r.text}")
        except Exception as e:
            print(f"{url}: FAILED - {e}")

if __name__ == "__main__":
    submit_to_indexnow()
