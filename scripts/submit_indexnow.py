import requests
import json
import os
import xml.etree.ElementTree as ET

def submit_to_indexnow():
    host = "rdjarbeng.com"
    key = "c1a71520d5504c3b932e5cce4931df21"
    
    # Path to sitemap.xml in the build output
    sitemap_path = os.path.join("_site", "sitemap.xml")
    
    if not os.path.exists(sitemap_path):
        print(f"Error: {sitemap_path} not found. Please build the site first.")
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

    if not urls:
        print("No URLs found in sitemap.")
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
