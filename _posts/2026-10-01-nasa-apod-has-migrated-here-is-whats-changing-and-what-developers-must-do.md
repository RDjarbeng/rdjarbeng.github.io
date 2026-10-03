---
date: 2026-10-01T17:00:00+02:00
published: true
author: Richard
category: Technology
tags:
  - Technology
  - APIs
  - Python
  - NASA
  - Web Development
title: NASA APOD Has Migrated. Here Is What Is Changing and What Developers Must Do
image: /assets/images/posts/covers/nasa-apod-api-migration-wordpress.jpg
image_alt: NASA APOD API migration illustration showing telescope data moving into a WordPress cloud architecture
layout: post
card_items:
  - name: NASA Science APOD Portal
    alt: NASA Science APOD
    badge_1: Official Site
    badge_2: Primary Source
    description: NASA's revamped Astronomy Picture of the Day home, built on a unified science.nasa.gov infrastructure.
    url: https://science.nasa.gov/apod/
    link_text: Visit NASA APOD
  - name: NASA Open APIs
    alt: NASA Open APIs Portal
    badge_1: Developer Docs
    badge_2: API Reference
    description: Central hub for NASA open data catalogs, API keys, and endpoint retirement advisories.
    url: https://api.nasa.gov/
    link_text: NASA API Documentation
  - name: New APOD REST Endpoint
    alt: NASA APOD REST API
    badge_1: REST API
    badge_2: WordPress WP-JSON
    description: Direct JSON endpoint serving structured metadata, explanation text, and media assets.
    url: https://science.nasa.gov/wp-json/wp/v2/apod-basic
    link_text: View Endpoint
---

NASA's Astronomy Picture of the Day (APOD) is one of the oldest living institutions on the World Wide Web. For over three decades, millions of space enthusiasts, students, researchers, and hobbyist coders have visited the service daily to view imagery captured by deep space observatories, planetary rovers, and amateur astrophotographers.

![NASA APOD API migration illustration showing telescope data moving into a WordPress cloud architecture](/assets/images/posts/covers/nasa-apod-api-migration-wordpress.jpg)

The infrastructure powering APOD has now undergone its biggest architectural overhaul in history. NASA has moved the platform from its classic, raw HTML layout at `apod.nasa.gov` to an integrated content management platform at `science.nasa.gov/apod/`. 

Along with the public web frontend, the backend data delivery pipelines and developer APIs have changed. If you maintain an application, script, Discord bot, smart display, or digital photo frame that pulls from NASA APOD, you need to understand what changed, why it changed, and how to update your software before the legacy systems go dark.

## About NASA APOD

Astronomy Picture of the Day was created in June 1995 by professional astronomers Robert Nemiroff (Michigan Technological University) and Jerry Bonnell (NASA Goddard Space Flight Center). The concept was straightforward: publish a single photograph or video of astronomical interest each day, accompanied by a brief explanation written by a professional astronomer, complete with hyperlinks to deeper scientific literature and image credits.

When APOD launched in 1995, the web was tiny. APOD ran on basic static HTML files served directly through an HTTP server at Michigan Tech and later mirrored through NASA servers. There was no client-side JavaScript, no complex responsive stylesheet, and no dynamic CMS. A typical page consisted of a `<center>` tag, an image tag, bold headings, and a single paragraph of text followed by author credits.

Because of that simplicity, APOD remained lightweight, indestructible, and universally readable on any device capable of rendering basic HTML, from ancient text browsers like Lynx to modern smartphones. Over 30 years, it cataloged thousands of celestial events, from the Shoemaker-Levy 9 comet impacts on Jupiter to high-resolution JWST deep fields.

## How to get it via API

In the early days of programming with APOD, there was no official API. Developers who wanted to show the daily photo on their own websites or desktop widgets wrote simple screen scrapers with tools like `curl`, `BeautifulSoup`, or regular expressions. The predictable HTML markup made it easy to locate the image URL and the text between the bold explanation tags.

Around 2015, NASA centralized its developer tools under the `api.nasa.gov` initiative. APOD received an official REST API endpoint:

```http
GET https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
```

This endpoint was convenient. You signed up for a free developer key (or used the rate-limited `DEMO_KEY`), sent a GET request, and received a clean JSON payload:

```json
{
  "date": "2026-04-10",
  "explanation": "A massive cluster of hot young stars...",
  "hdurl": "https://apod.nasa.gov/apod/image/2604/cluster_hubble_big.jpg",
  "media_type": "image",
  "service_version": "v1",
  "title": "Star Cluster in the Large Magellanic Cloud",
  "url": "https://apod.nasa.gov/apod/image/2604/cluster_hubble_standard.jpg"
}
```

The payload included everything a developer needed: both standard and high-resolution URLs, publication dates, and clean strings without HTML markup. Thousands of mobile apps, browser extensions, and background wallpapers were built on this foundation.

## Who uses it

The reach of the APOD dataset is larger than most developers realize:

1. **Classrooms and Planetariums**: Science teachers and educators use the feed for morning warm-ups, science trivia, and planetarium display screens.
2. **Mobile and Desktop Wallpaper Apps**: Popular open-source utilities on macOS, Windows, Linux, Android, and iOS fetch the APOD daily image to refresh desktop backgrounds automatically.
3. **Smart Home Displays and Digital Frames**: Raspberry Pi home dashboards (MagicMirror), e-ink calendar boards, and digital picture frames rely on the lightweight payload.
4. **Community Bots**: Tens of thousands of Discord, Telegram, Mastodon, Bluesky, and Reddit bots post the picture of the day into general interest channels.
5. **Personal Portfolios and Blogs**: Sites like this one curate space imagery alongside personal technical writing.

Because the old API was stable for over a decade, hundreds of libraries, tutorial projects, and unattended scripts were written with the assumption that the `api.nasa.gov/planetary/apod` contract would never change.

## What is changing

NASA has been modernizing its public-facing digital properties, consolidating isolated project pages into a unified, responsive web platform hosted under `science.nasa.gov`. 

Here are the specific changes:

### 1. New Website Architecture
The legacy site hosted at `apod.nasa.gov/apod/` is being phased out in favor of `science.nasa.gov/apod/`. The new site runs on a headless WordPress infrastructure with modern layouts, accessibility compliance, and integrated NASA navigation.

### 2. The Legacy API Retirement Deadline
NASA has announced that the legacy APOD API framework is officially being retired. **The old endpoint will be permanently taken offline on December 1, 2026.** 

### 3. Current Compatibility Rewiring
To prevent immediate service disruption across the ecosystem, NASA currently proxies traffic hitting `api.nasa.gov/planetary/apod` through to their new WordPress API backend. While this keeps simple calls functioning temporarily, subtle differences in payload formats, key naming, and HTML tag sanitization are already surfacing. Once December 1 arrives, the old endpoint will stop answering entirely.

### 4. The New REST Endpoint
The direct, primary endpoint for accessing APOD data is now NASA's WordPress REST API endpoint:

```http
GET https://science.nasa.gov/wp-json/wp/v2/apod-basic
```

This endpoint returns structured JSON directly from the new CMS backend.

## What you need to do (for developers)

If you maintain software that consumes APOD data, you must update your requests and response parsers before December 1, 2026.

### Understanding the New JSON Response
The new endpoint returns an array containing the latest post objects (or queryable by date and pagination parameters). A typical response item looks like this:

```json
[
  {
    "id": 128942,
    "date": "2026-10-01",
    "title": "Harvest Moon with Erupting Mount Etna",
    "explanation": "<p><strong>Explanation: </strong>What is happening behind that volcano? Nothing really unusual...</p>",
    "media_type": "image",
    "url": "https://science.nasa.gov/apod/harvest-moon-mount-etna/",
    "hdurl": "https://science.nasa.gov/wp-content/uploads/2026/10/etna_moon.jpg",
    "copyright": "Marcella Giulia Pace",
    "permalink": "https://science.nasa.gov/apod/harvest-moon-mount-etna/"
  }
]
```

### Key Differences to Account For

When refactoring your code, watch out for these changes:

1. **List vs Object**: The new `apod-basic` endpoint returns a JSON list `[...]` instead of a standalone dictionary `{...}`. You will need to take `response[0]` if fetching the latest item.
2. **Field Semantics for URLs**:
   - In the old API, `url` contained the standard image file URL (JPEG/PNG) and `hdurl` contained the high-resolution file.
   - In the new API, `url` often points to the canonical web article URL on `science.nasa.gov`, while `hdurl` contains the actual direct image asset URL. If your script downloads `data["url"]` expecting an image, it will now download an HTML webpage instead of an image file. Always prefer `data.get("hdurl")` or check file extensions when pulling images.
3. **Embedded HTML in Explanations**: The `explanation` string in the new API contains raw HTML tags, such as `<p>`, `<strong>Explanation: </strong>`, and anchor links. If you display this text in terminal applications, native UI labels, or markdown documents, you must strip or sanitize the HTML tags first.
4. **Header Requirements**: Ensure your client sends a standard descriptive `User-Agent` header. Requests without a valid user agent may receive HTTP 403 Forbidden responses from cloud edge caches.

### The Image Path Redirect Gotcha

A critical breaking change that caught many developers off guard involves legacy image asset paths. Historically, APOD images were hosted directly under URLs like `https://apod.nasa.gov/apod/image/YYMM/filename.jpg`.

With the migration, requests to `apod.nasa.gov/apod/image/...` no longer return image binaries. Instead, the legacy web server returns an HTTP `301 Moved Permanently` redirecting to the HTML landing page `https://science.nasa.gov/apod/`.

This creates a subtle failure mode:
- In web browsers, an `<img src="https://apod.nasa.gov/apod/image/...">` tag follows the 301 redirect and receives an HTML document instead of image data. The browser fails to decode the image, fires the `onerror` event, and displays a broken image icon or fallback placeholder.
- In automated download scripts, downloading the URL without validating `Content-Type` saves an HTML file with a `.jpg` extension to disk.

Modern direct image assets now live on NASA's dedicated CDN:
```text
https://assets.science.nasa.gov/dynamicimage/assets/science/cds/apod/...
```

If you maintain existing databases or archives referencing `apod.nasa.gov/apod/image/`, you cannot rely on transparent HTTP redirects to resolve the binary images. You must update your records to reference the new direct CDN URLs provided by the `hdurl` field in the API, or self-host your image assets.

## How the changes affected this site

This site features a dedicated [NASA APOD gallery collection](/gallery/) that archives daily imagery. A GitHub Actions workflow runs every night at midnight UTC to query NASA, generate a structured markdown post with frontmatter metadata, and commit it to the repository.

### What Broke
On the day NASA transitioned traffic to the new WordPress infrastructure, our nightly GitHub Action failed, and several gallery cards broke. 

Four issues disrupted the sync pipeline:
1. **Broken Scraping Fallback**: Our backup scraper was targeting patterns specific to the 1995-era HTML tables on `apod.nasa.gov`. When the site redirected to `science.nasa.gov`, regex patterns looking for `<IMG SRC="...">` and `<center><b>` failed to match anything.
2. **Image Link Inversion**: In the updated API responses, the `url` key stopped pointing to direct image binaries and began returning the WordPress article permalink. The build pipeline wrote web URLs into gallery markdown files instead of media links, creating empty gallery cards.
3. **Legacy Image 301 Redirects**: Existing gallery entries that referenced `apod.nasa.gov/apod/image/...` stopped loading because those URLs now issue 301 redirects to the NASA Science homepage rather than serving the raw image file. The browser attempted to parse the redirected HTML as image data, causing gallery images to disappear and fallback placeholders to display.
4. **Raw HTML Explanations**: The explanation text imported with leading `<strong>Explanation: </strong>` strings and unbalanced paragraph tags, which cluttered the clean reading view.

### How We Fixed It
We updated our fetch script at `.github/scripts/fetch_nasa_apod.py` to point directly to the new WordPress endpoint:

```python
import json
import os
import re
import urllib.request
from html import unescape

APOD_API_URL = "https://science.nasa.gov/wp-json/wp/v2/apod-basic"

def fetch_from_api():
    req = urllib.request.Request(
        APOD_API_URL,
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    )
    with urllib.request.urlopen(req, timeout=30) as response:
        data = json.loads(response.read().decode('utf-8'))
        if isinstance(data, list) and len(data) > 0:
            return data[0]
        return data
```

Next, we updated our payload normalization logic:

```python
# Extract and sanitize the explanation
explanation = data.get("explanation", "").strip()
explanation = re.sub(r'<strong>\s*Explanation:\s*</strong>', '', explanation, flags=re.IGNORECASE)
explanation = re.sub(r'<[^>]+>', '', explanation)
explanation = ' '.join(explanation.split())

# Use hdurl for the direct image file, falling back cleanly
raw_url = data.get("hdurl") or data.get("url", "")
```

We also added a fallback web crawler that parses the new modern layout if the JSON endpoint encounters downtime, ensuring our daily updates never stall. With these updates merged and deployed in our `v1.3.1` release, our daily automated syncs are once again running smoothly.

## Extra details and best practices

If you are planning your own migration, keep these additional operational details in mind:

### Caching and Polling Frequency
APOD only updates once every 24 hours (generally between midnight and 04:00 UTC). Do not poll the endpoint every five minutes. Set up a daily cron job or timer, cache the response in local storage or a database, and serve that cached payload to your clients. NASA periodically throttles aggressive scrapers that hammer their endpoints.

### Video Entries
APOD is not always a photograph. Several times a month, NASA features a YouTube video, a Vimeo animation, or a high-framerate simulation. The `media_type` field in the response will indicate `"video"`. Always verify that `media_type == "image"` before attempting to download image bytes or set a system desktop wallpaper. For videos, extract the embed URL or direct video link instead.

### Licensing and Image Credits
NASA images created by government employees (such as Hubble, Webb, Curiosity, and Perseverance data) are in the public domain. However, a significant percentage of APOD features belong to private photographers, observatories, or university teams who grant NASA one-time publishing permissions. 

Always inspect and credit the `copyright` field when republishing or redistributing APOD content. Respecting photographer attribution keeps services like APOD sustainable for the astronomical community.

### Timeline Summary
- **Current Status**: New WordPress site and `apod-basic` endpoint are live. Legacy `api.nasa.gov` proxies traffic.
- **Action Required**: Migrate client code to the new REST structure.
- **December 1, 2026**: Hard cutoff. Legacy APOD endpoints will be turned off.
