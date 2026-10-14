# rdjarbeng.com - Richard Djarbeng's Personal Website

<img width="1349" height="628" alt="Richard's website screenshot 23-jan-2026" src="https://github.com/user-attachments/assets/6d159f02-c539-45fc-9481-10d5191bbb5f" />

<img width="1342" height="634" alt="image" src="https://github.com/user-attachments/assets/1e3ef4d0-4451-4b2c-89a8-21b2bc7070cd" />
<img width="1277" height="620" alt="image" src="https://github.com/user-attachments/assets/ab3e7838-5740-47c3-8290-a6eca6102905" />
<img width="1344" height="628" alt="image" src="https://github.com/user-attachments/assets/c0397adb-0922-49f1-9050-eb1c28a5fd6f" />
<img width="1351" height="633" alt="image" src="https://github.com/user-attachments/assets/503ba0de-c6e9-4b5c-8a1c-5c135442bb09" />






Welcome to the source code for **rdjarbeng.com**, my personal corner of the web. This site is where I document anything interesting that catches my eye—from practical troubleshooting guides and tech solutions I've discovered, to explorations of emerging AI tools and occasional personal reflections drawn from my travels and life experiences across Ghana (my homeland), the USA, Germany, Uganda, and beyond.

Built with **Eleventy (11ty)** and powered by **SveltiaCMS** for seamless post management. GitHub Actions builds the site and **GitHub Pages** hosts it.

# 🚀 **Live Site**: [rdjarbeng.com](https://rdjarbeng.com)

## Key Pages & Sections

Explore the site through these core sections:

- **[Home](https://rdjarbeng.com/)**: Overview of my latest posts and a quick intro to who I am.
- **[Posts](https://rdjarbeng.com/posts/)**: A collection of articles covering AI innovations, tech fixes, environmental insights, and more. Highlights include hands-on reviews like Andrew Ng's [Landing AI for agentic object detection and document extraction](https://rdjarbeng.com/agentic-object-detection-and-document-extraction-with-landing.ai/), [Kolors' virtual try-on app](https://rdjarbeng.com/kolors-virtual-try-on-nobody-s-gonna-know/), and my latest deep dive: [A Chronological Look At AI—A Decade-by-Decade Evolution](https://rdjarbeng.com/a-chronological-look-at-ai-a-decade-by-decade-evolution/), tracing the field from 1940s theoretical roots to today's generative AI boom. My latest post: [When LLMs Become Scientific Instruments: Groundsource Flash Flood Research Report](https://rdjarbeng.com/when-llms-become-scientific-instruments-groundsource-flash-flood-research-report/)

  Recent favorites:
    - [How to Break into AI Without a Degree](https://rdjarbeng.com/how-to-break-into-ai-without-a-degree/) – Aleksa Gordić's self-taught path into frontier AI engineering.
    - [NASA APOD Has Migrated. Here Is What Is Changing and What Developers Must Do](https://rdjarbeng.com/nasa-apod-has-migrated-here-is-whats-changing-and-what-developers-must-do/) – What the move to science.nasa.gov means for apps built on APOD.
    - [Sveltia CMS Is Feature Complete. Time to Switch from Decap CMS](https://rdjarbeng.com/sveltia-cms-is-feature-complete-time-to-switch-from-decap-cms/) – Why this site's CMS made the switch.
    - [Latest Gallery Images & Videos](https://rdjarbeng.com/gallery/) – Check out the newest cover images, memes, and social media videos.
    - [The Artemis II Collection](https://rdjarbeng.com/gallery/artemis-ii/) – A curated visual journey of the NASA Artemis II mission.
- **[Personal](https://rdjarbeng.com/personal/)**: Candid stories, memes, and slices of life from my journeys—think Kigali sunsets, Ghanaian vibes, or unexpected adventures in Europe and East Africa. One popular post is: [Trip to Uganda- Kampala & silver springs](https://rdjarbeng.com/personal/trip-to-kampala-uganda-and-silver-springs/)
- **[About](https://rdjarbeng.com/about/)**: My background as a Machine Learning Engineer & IoT Specialist, including ways to [contact me](https://rdjarbeng.com/contact/) or [support my work through donations](https://rdjarbeng.com/about/#donate).
- **[Gallery](https://rdjarbeng.com/gallery/)**: Images that I used for posts or found across the internet. Also contains my collection of memes and pictures from Ghana and Rwanda. In the videos section I have video content that I created as well as interesting ones I found from social media.
  <img width="1179" height="598" alt="Gallery page screenshot 23-Jan-2026" src="https://github.com/user-attachments/assets/505cdbdc-4bb1-4fa0-8362-e29333f9630d" />


## Tech Stack & Features

- **Static Site Generator**: [Eleventy (11ty) 3.x](https://www.11ty.dev/) with LiquidJS templates, building 2,000+ pages in well under a minute. (Migrated from Jekyll.)
- **Content Management**: [SveltiaCMS](https://github.com/sveltia/sveltia-cms) at `/admin/` for editing posts, gallery items and collections in the browser.
- **Styling**: SCSS compiled with Dart Sass; responsive, with light and dark mode.
- **Search**: [Algolia](https://www.algolia.com/), indexed on deploy by `scripts/algolia-sync.js`.
- **Markdown extras**: KaTeX math, heading anchors and an auto-generated table of contents.
- **Deployment**: GitHub Actions builds the site and publishes it to GitHub Pages on every push to `main`.
- **Automation**: scheduled workflows sync YouTube playlists and NASA's Astronomy Picture of the Day, enhance gallery posts and check book links. A Telegram bot (`scripts/telegram-bot/`) adds videos and todos from a phone.
- **SEO Optimized**: Meta tags, Open Graph, Twitter cards, sitemaps and an RSS feed for better search visibility on topics like **AI tool reviews**, **DNS troubleshooting**, and **tech solutions from Africa**.

### 📖 Learn How This Was Built
If you are curious about the technical setup of this blog, check out my deep-dive:
- [Building a Modern Blog with Eleventy 3.x (Liquid Edition)](https://rdjarbeng.com/building-a-modern-blog-with-eleventy-3-x-liquid-edition/)
- [Story Time: Add a CMS to a Jekyll / GitHub Pages Website](https://rdjarbeng.com/story-time-add-a-cms-to-a-jekyll-github-pages-website/) (written before the move to Eleventy)

Keywords for discovery: personal tech blog, AI trends and reviews, troubleshooting guides Eleventy site, machine learning insights Rwanda, global travel stories tech.

## Quick Start: Local Development

Requires Node.js 20+.

1. **Clone the Repo**:
   ```
   git clone https://github.com/RDjarbeng/rdjarbeng.github.io.git
   cd rdjarbeng.github.io
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```

3. **Serve Locally** (watches SCSS and templates, with live reload):
   ```
   npm start
   ```
   Open [http://localhost:8080](http://localhost:8080) in your browser. To use another port: `npx @11ty/eleventy --serve --port 5000`.

4. **Build for Production**:
   ```
   npm run build
   ```
   Output goes to `_site/`.

5. **Edit Content**:
   - Use SveltiaCMS at `/admin/`, or edit the Markdown files in `_posts/`, `_personal/`, `_gallery/` and the other collection folders directly.
   - CMS collections are configured in `admin/config.yml`.

## Repository Structure

```
├── _posts/              # Technical blog posts
├── _personal/           # Personal posts
├── _gallery/            # Gallery images and videos
├── _video_collections/  # Video playlists / collections
├── _books/, _projects/, _authors/ ...  # Other collections
├── _data/               # Global data (site.js builds site-wide metadata and collections)
├── _includes/           # Template partials (header, footer, cards)
├── _layouts/            # Page layouts
├── _sass/               # SCSS partials
├── assets/              # Images, JS, compiled CSS
├── admin/               # SveltiaCMS
├── scripts/             # Algolia sync, Telegram bot, maintenance scripts
├── .github/workflows/   # Deploy and scheduled sync workflows
├── eleventy.config.js   # Eleventy configuration (Markdown, filters, collections)
├── package.json         # Node dependencies and build scripts
└── README.md            # You're reading it!
```

## Contributing

Suggestions welcome!
Open to collaborations and guest posts. Check my other repos like [Countdown App](https://github.com/RDjarbeng/countdown-app) or [3D Game AI](https://github.com/RDjarbeng/3d-character-game).

---


**Author**: [Richard Djarbeng](https://rdjarbeng.com/about/) | Follow on [X/Twitter](https://twitter.com/DjarbengRichard) for updates.  
Built with ❤️ with [Eleventy](https://www.11ty.dev/).
