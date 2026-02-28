# rdjarbeng.com - Richard Djarbeng's Personal Website

<img width="1349" height="628" alt="Richard's website screenshot 23-jan-2026" src="https://github.com/user-attachments/assets/6d159f02-c539-45fc-9481-10d5191bbb5f" />

<img width="1342" height="634" alt="image" src="https://github.com/user-attachments/assets/1e3ef4d0-4451-4b2c-89a8-21b2bc7070cd" />
<img width="1277" height="620" alt="image" src="https://github.com/user-attachments/assets/ab3e7838-5740-47c3-8290-a6eca6102905" />
<img width="1344" height="628" alt="image" src="https://github.com/user-attachments/assets/c0397adb-0922-49f1-9050-eb1c28a5fd6f" />
<img width="1351" height="633" alt="image" src="https://github.com/user-attachments/assets/503ba0de-c6e9-4b5c-8a1c-5c135442bb09" />






Welcome to the source code for **rdjarbeng.com**, my personal corner of the web. This site is where I document anything interesting that catches my eye—from practical troubleshooting guides and tech solutions I've discovered, to explorations of emerging AI tools and occasional personal reflections drawn from my travels and life experiences across Ghana (my homeland), the USA, Germany, Uganda, and beyond.

Built with **Jekyll** (a static site generator in Ruby) and powered by **SveltiaCMS** for seamless post management. Deployed via **GitHub Pages** for automatic builds and hosting.

# 🚀 **Live Site**: [rdjarbeng.com](https://rdjarbeng.com)

## Key Pages & Sections

Explore the site through these core sections:

- **[Home](https://rdjarbeng.com/)**: Overview of my latest posts and a quick intro to who I am.
- **[Posts](https://rdjarbeng.com/posts/)**: A collection of articles covering AI innovations, tech fixes, environmental insights, and more. Highlights include hands-on reviews like Andrew Ng's [Landing AI for agentic object detection and document extraction](https://rdjarbeng.com/agentic-object-detection-and-document-extraction-with-landing.ai/), [Kolors' virtual try-on app](https://rdjarbeng.com/kolors-virtual-try-on-nobody-s-gonna-know/), and my latest deep dive: [A Chronological Look At AI—A Decade-by-Decade Evolution](https://rdjarbeng.com/a-chronological-look-at-ai-a-decade-by-decade-evolution/), tracing the field from 1940s theoretical roots to today's generative AI boom. My latest post: [Why Can I Pay for Netflix Instantly, But Not Send Money Abroad? Enter Revolut](https://rdjarbeng.com/why-can-i-pay-for-netflix-instantly-but-not-send-money-abroad/)

  Recent favorites:
    - [I Tried to Replace an Interior Designer with Gemini. Here's What Happened.](https://rdjarbeng.com/putting-google-s-gemini-pro-and-nano-banana-to-the-test/) – Testing Gemini Pro and Nano for creative tasks.
    - [Why Does Restarting Your Computer (or Router) Actually Work?](https://rdjarbeng.com/why-does-restarting-your-computer-or-router-actually-work/) – Unpacking the surprisingly elusive science of the ultimate tech reset.
    - [How to Fix ERR_NAME_NOT_RESOLVED and DNS_PROBE_FINISHED_BAD_CONFIG Errors in Google Chrome](https://rdjarbeng.com/how-to-fix-err-name-not-resolved-and-dns-probe-finished-bad-config-errors-in-google-chrome-due-to-dns/) – Step-by-step guide to resolving DNS woes I encountered myself.
- **[Personal](https://rdjarbeng.com/personal/)**: Candid stories, memes, and slices of life from my journeys—think Kigali sunsets, Ghanaian vibes, or unexpected adventures in Europe and East Africa. One popular post is: [Trip to Uganda- Kampala & silver springs](https://rdjarbeng.com/personal/trip-to-kampala-uganda-and-silver-springs/)
- **[About](https://rdjarbeng.com/about/)**: My background as a Machine Learning Engineer & IoT Specialist, including ways to [contact me](https://rdjarbeng.com/contact/) or [support my work through donations](https://rdjarbeng.com/about/#donate).
- **[Gallery](https://rdjarbeng.com/gallery/)**: Images that I used for posts or found across the internet. Also contains my collection of memes and pictures from Ghana and Rwanda. In the videos section I have video content that I created as well as interesting ones I found from social media.
  <img width="1179" height="598" alt="Gallery page screenshot 23-Jan-2026" src="https://github.com/user-attachments/assets/505cdbdc-4bb1-4fa0-8362-e29333f9630d" />


## Tech Stack & Features

- **Static Site Generator**: [Jekyll](https://jekyllrb.com/) – Ruby-based, for fast, SEO-friendly pages.
- **Content Management**: [SveltiaCMS](https://github.com/sveltia/sveltia-cms) – Headless CMS integrated for editing blog posts directly in the browser.
- **Styling**: Custom CSS with responsive design; supports dark mode.
- **Deployment**: GitHub Pages – Push to `main` branch for instant updates.
- **SEO Optimized**: Meta tags, Open Graph, structured data for better search visibility on topics like **AI tool reviews**, **DNS troubleshooting**, and **tech solutions from Africa**.

### 📖 Learn How This Was Built
If you are curious about the technical setup of this blog, check out my deep-dive:
- [Story Time: Add a CMS to a Jekyll / GitHub Pages Website](https://rdjarbeng.com/story-time-add-a-cms-to-a-jekyll-github-pages-website/)

### Custom Pagination Implementation

The site uses a custom pagination solution to handle the `posts` collection, as the default `jekyll-paginate` plugin has limitations with custom collections and complex sorting requirements.

- **Plugin**: `_plugins/custom-pagination.rb`
- **Logic**: Generates paginated pages for the `posts` collection, sorting them by date.
- **Credit**: This implementation was adapted from a solution provided by [@eugeneandrienko](https://github.com/eugeneandrienko) in [jekyll-paginate-v2 Issue #265](https://github.com/sverrirs/jekyll-paginate-v2/issues/265).

Keywords for discovery: personal tech blog, AI trends and reviews, troubleshooting guides Jekyll site, machine learning insights Rwanda, global travel stories tech.

## Quick Start: Local Development

To run this site locally (requires Ruby 3.0+ and Bundler):

1. **Clone the Repo**:
   ```
   git clone https://github.com/RDjarbeng/rdjarbeng.github.io.git
   cd rdjarbeng.github.io
   ```

2. **Install Dependencies**:
   ```
   bundle install
   ```

3. **Serve Locally**:
   ```
   bundle exec jekyll serve
   ```
   Open [http://127.0.0.1:4000](http://127.0.0.1:4000) in your browser.

4. **Edit Content**:
   - Use SveltiaCMS via the GitHub integration for posts in `_posts/`.
   - Modify pages in the root or `_pages/` for static content.

For SveltiaCMS setup: Follow the [official guide](https://github.com/sveltia/sveltia-cms#usage) and configure `sveltiarc.js` for your collections.

## Repository Structure

```
├── _includes/      # Layout snippets (header, footer)
├── _layouts/       # Page templates
├── _posts/         # Markdown blog posts (managed via SveltiaCMS)
├── _sass/          # SCSS styles
├── assets/         # Images, JS, CSS
├── _config.yml     # Jekyll configuration
├── Gemfile         # Ruby dependencies
├── index.md        # Home page
├── posts.md        # Posts index
├── personal.md     # Personal page
├── about.md        # About page
└── README.md       # You're reading it!
```

## Contributing

Suggestions welcome!
Open to collaborations and guest posts. Check my other repos like [Countdown App](https://github.com/RDjarbeng/countdown-app) or [3D Game AI](https://github.com/RDjarbeng/3d-character-game).

---


**Author**: [Richard Djarbeng](https://rdjarbeng.com/about/) | Follow on [X/Twitter](https://twitter.com/DjarbengRichard) for updates.  
Built with ❤️ with Jekyll.
[![Jekyll](https://jekyllrb.com/img/logo-2x.png)](https://jekyllrb.com/) 
