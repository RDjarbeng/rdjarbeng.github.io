This todo file contains design specifications and technical directions for rdjarbeng.com, possible issues and possible future implementations

# Specifications
- This website is deployed on Github pages at rdjarbeng.com and should scale globally
- Built with **Eleventy (11ty) 3.x** using LiquidJS, Dart Sass, and Node scripts (migrated from legacy Jekyll)
- Blog posts are rarely written, but often read
- Most of the website is purely static files
- Fast build times (~25-30s full build for 2,100+ pages)
- Caching must be implemented where possible

## Understanding the structure of the website

The website is divided into several sections:
- Homepage
- About page
- Technical Posts
- Personal Posts
- Gallery
    - Images
    - Videos
    - Special collections such as Artemis II
- Videos (dedicated videos page) combines data from multiple sources
    - Youtube
    - Instagram 
    - TikTok
    Each of the dedicated social media pages have their own strengths that distinguish it from the combined videos page. Youtube playlists for instance are a strength of youtube.
- Other minor pages (search, tags, categories, contact... etc)

Possible future implementation:
- the rest is a dynamic REST API- todo
- Any new users that subscribes should receive a welcome email- todo
- Email newsletter - todo
- Comments on blog posts - todo
- Any photo uploaded to the blog should have a thumbnail generated- todo

# To-Do List for rdjarbeng.com

## High Priority - Immediate Fixes & Critical Enhancements

### Credibility & citability (audit 2026-11-13): the changes that move the needle
Goal: the site should look and behave like a source a professor would link to. Technical SEO is already solid (BlogPosting/Person JSON-LD, canonical URLs, breadcrumbs, Markdown alternates, legacy redirects). What's missing is the trust layer.

- [x] **Real "Last updated" dates.** No post sets `last_modified_at`, so JSON-LD `dateModified` always equals the publish date and readers never see an update. Derive it from git history at build time (or a front-matter `updated:` field for substantive edits only). Show "Updated <date>" in the post header. (Highest impact, Low–Medium complexity: `eleventy.config.js` seo tag + `_layouts/post.html`)
- [ ] **Editorial standards page** (`/editorial-policy/`): how posts are researched and sourced, the AI-assistance policy, the corrections policy (with a public corrections log), affiliations/conflicts (CMU-Africa), and how to report an error. Link it from the footer and from every post's author card. (Highest impact, Low complexity)
- [ ] **"Cite this page" box on posts**: a ready-to-copy citation (Author. (Year). *Title*. rdjarbeng.com. URL, accessed date) plus BibTeX. Also add Highwire `citation_title` / `citation_author` / `citation_publication_date` meta tags so Google Scholar and Zotero pick posts up correctly. (High impact, Low complexity: `_layouts/post.html`, seo tag)
- [ ] **Standard sources/footnotes rendering**: enable markdown-it-footnote (or a `references:` front-matter list) so citations render consistently as numbered references with a "Sources" section, not ad hoc links. (High impact, Medium complexity)
- [ ] **Standard AI-assistance disclosure**: add front matter like `ai_assistance: drafting | editing | images | none`, rendered as a short consistent note linking to the editorial policy. Replaces the 11 ad hoc paragraphs, and the Gemini "additional comments" should either meet that bar or be removed. (High impact, Low complexity)
- [ ] **Content-type labels**: front matter `content_type: analysis | guide | explainer | paper-review | news | opinion | personal`, shown as a badge, so a visitor (or professor) can tell a researched analysis from a quick note at a glance. Let the posts listing filter on it. (Medium–High impact, Low complexity)
- [ ] **Author identity that verifies itself**: use a real photo on `/about/` and the author card instead of the logo in Person schema. Add `sameAs` for ORCID, Google Scholar, LinkedIn, GitHub and CMU-Africa profiles, plus `affiliation`. Align job titles: `/about/` says "Software Engineer | ML Engineer | Solutions Architect & Embedded Systems" while the schema says "Software and Machine Learning Engineer". Add a short "Research & publications" section. (High impact, Low complexity: `about.md`, `_authors/richard.md`, seo tag)
- [ ] **Topic hub pages** for the expertise clusters (start with *Air Quality & Sensing in Africa*): a curated, maintained landing page that orders the posts from fundamentals → data sources → standards → original work. Hubs are the pages institutions link to. (High impact, Medium complexity)
- [ ] **Datasets/projects with DOIs**: publish original data and code (Kigali dashboard, sensor data) to Zenodo/GitHub releases and render a "Data & code" box with the DOI on the related posts. (High long-term impact, Medium complexity)
- [ ] **Remove trust-eroding third-party bits from posts**: the applause button loads unversioned `unpkg.com/applause-button` (pin the version or self-host), and Mermaid loads as `mermaid@10` (pin the exact version). Consider dropping claps on analysis/guide posts. (Medium impact, Trivial complexity: `_includes/head.html`, `_layouts/post.html`)
- [ ] **Homepage rich results failing** (noted in inbox): fix it so the homepage emits valid `WebSite` + `Person`/`Organization` JSON-LD. (Medium impact, Low complexity)


- [ ] Add a section for AI tools and AI projects. (High Importance, Medium Complexity: Requires new collection/layout)


## Low Priority - Existing Feature Polish & Minor Bugs

### Styling & Layout
- [ ] Optimize CSS: Currently loads CSS for personal and video pages when not needed. (Medium Importance, Medium Complexity: Refactor CSS loading)
- [ ] Implement responsive images (via `@11ty/eleventy-img`) to properly size images on mobile devices. (Medium Importance, Medium Complexity: Eleventy image plugin integration)
- [ ] Fix: Videos page inline player is not obvious that video can play the video without navigating, perhaps set to play on hover or something. (Medium Importance, Trivial Complexity: CSS/JavaScript hover effect)
- [ ] Add a view related posts link for videos too so I can track media across the site. (Medium Importance, Medium Complexity: Eleventy layout/logic)
- [ ] Add skeleton loader for images. (Medium Importance, Medium Complexity: HTML/CSS/JS implementation)

### Content & Data Structure
- [ ] Get images to load separately, get parts of the homepage to load separately so the main content loads quickly even on slow connections (ideally 1s initial load time,FCP). (High Importance, Significant Complexity: Advanced lazy loading/critical path optimization)
- [ ] Tags and categories need to be added to personal posts, gallery images and videos. (Medium Importance, Medium Complexity: Content front matter updates/Eleventy data cascade)
- [ ] Add pages: youtube videos (add a random picker for youtube videos, allow users to customize it to their preferred category, eg: Nigerian movies, long form content). (High Importance, Significant Complexity: New Eleventy layouts, YouTube API integration)

## Future Enhancements & Strategic Roadmap

### Core Features (Significant Complexity)
- [ ] Implement a dynamic REST API.
- [ ] Any new users that subscribes should receive a welcome email.
- [ ] Email newsletter.
- [ ] Comments on blog posts.
- [ ] Any photo uploaded to the blog should have a thumbnail generated.

### Gallery & Media Redesign
- [ ] Carousel: Try carousel design from apple site, book flipping carousel, story mode, carousel for categories with 3D animations. (High Importance, Significant Complexity: Complex front-end development)
- [ ] The gallery page doesn't have a way to browse all gallery items that is user friendly, in markdown using crawl4ai it shows a very long page for /gallery which shouldn't be. (High Importance, Significant Complexity: Re-thinking gallery navigation/pagination)

### Search & Discovery
- [x] Search needs to include gallery items, tags, categories. (Completed via Algolia in `scripts/algolia-sync.js`)

### Overall Strategic Goals
- [ ] **Strategic Goal: Doubling Daily Active Users (2x DAU)**
    - [ ] Programmatic SEO for AI Trends: Create "Solution Recipes" (e.g., "How to deploy YOLO World on a Raspberry Pi").
    - [ ] "Project-to-Post" Pipeline: Automate generation of "Build Log" for project updates.
    - [ ] Newsletter Integration: Implement a "Digital Garden" style newsletter for AI research updates.
    - [ ] GitHub Cross-Pollination: Ensure every README has a "Learn how this was built" link to a deep-dive post.
- [ ] **Strategic Goal: Increasing Time Spent by 35%**
    - [ ] Live Interactive Demos: Embed "Lite" versions of your projects directly in the posts.
    - [ ] Technical Deep-Dives (The 2,000+ Word Rule): Transition from 500-word overviews to 2,000+ word authoritative guides with annotated code blocks and architectural diagrams.
    - [ ] Position the site so agents consider it as a source of information such as when users are asked what is the latest AI news this site shows up

## Notes to Self & Research Ideas

### General Observations & Thoughts
- The gallery section just looks uninteresting on mobile view, I think it's the layout, I'm not sure how to fix it, I'll have to look into it. Memes need to be scrollable. (Observation/problem statement, with implied solution components)
- Test todo: create the most awesome site (Overall aspiration, not a specific technical todo, moved from a previous section)

### Design References & Inspirations
- Copy this carousel/hero section for the gallery: https://inkscape.org/ (Reference for gallery design)

### SEO & Content Strategy Insights
- **Sitemap HTML Page Context**: This section provides the detailed explanation and benefits behind creating an HTML sitemap, which is crucial context.
    - "you can easily create a layout that simply loops through every single post and gallery entry you've ever published, grouping them by year or category on one single page. It achieves the exact same SEO and UX benefits as an HTML sitemap, but feels much more native to a personal blog."
    - "**The "Flattening" SEO Benefit** Search engines pass "link equity" from your homepage to your other pages. If an old blog post is buried under five pages of pagination (e.g., Homepage -> Blog -> Page 2 -> Page 3 -> Page 4 -> Post), it gets less SEO value. An HTML sitemap links to every page directly, meaning every single post on your site is only two clicks away from the homepage."
- **Search Solution Considerations**: "I've seen other websites use powered by Algolia or Google; need to see the tradeoff vs building search myself." (Research idea for search implementation) currently testing the algolia search, seems to do well, especially when the user mistypes, searching and off by one character will also bring up results for that search
- **CSS optimization insight from Victor @vponamariov**: "You know what kills your site performance? Rendering 3000px of content when the user can only see 900px. And there is an easy fix for that. It's a magical CSS property `content-visibility: auto`." (Research note/idea for CSS optimization)


## Telegram todos
- [ ] Check YouTube API to see if from a channel name you can see the growth in subscribers over time and plot this on a graph 📈
- [ ] Memes don't show most recent first, layout needs improvement

- the card layout at the main gallery, and after clicking view all are different (need to decide whether to keep the date), check the gallery card
- Even though I have a post on EV's searching electric vehicles bring up "no result found", can we fix this?
- [ ] All items on the media gallery are not searchable. The search on the nav bar only applies to the posts and personal posts- doesn't include the media gallery. the gallery search only searches the homepage items displayed instead of the entire gallery (videos +images) -partly fixed with algolia
- [ ] Check access logs for user-agents see who's crawling, check for markdown content negotiation

- [ ] Figure out how to structure pages so that even of it's jist a picture it's informative for the user, find out how X,Facebook, Instagram does this. Does adding details such as who posted this make a difference?
- [ ] Add a label to the posts and personal posts, detailing that eg: this post is part of a collection of technical posts on rdjarbeng.com (link to posts page), same for personal posts. Could do same for gallery groupings- need a nice way to implement this though
- [ ] Post images thumbnails cut off on most of the postcards showing only a part of the image need to find a way to size the postcards and post images correctly to show majority of the image so that the text is not cut off especially on the home page- might consider changing from the 2 column layout after moving to 11ty
- [ ] Remove horizontal scroll bars on the gallery collection on the homepage replace with arrows -depends on mobile or desktop


- [ ] Some of the pages on bing webmaster upon inspection show: "Blocked URL cannot appear on Bing

The inspected URL is known to Bing but has some issues which are preventing us from serving it to our users. We recommend you to follow Bing Webmaster Guidelines."
- Youtube page was supposed to be styled differently but now looks more like the videos page
- [ ] YouTube videos aren't showing most recently added first
- [ ] Artemis II gallery is a lot, show only two collections on the main gallery page and the rest when the reader clicks to view all
- [ ] The search on the videos page doesn't display results in the grid similar to the homepage but instead does it vertically- this is broken, search is disabled for now
- [ ] Video collections need a nicer transition, too much whitespace currently between collections
- [ ] Video page collections don't play without redirecting, would be nice to have them play
- [ ] Need to integrate the site with other sites and services so it's useful to people and agents
- [ ] Gallery section on homepage needs more text, can make excerpt or something else, need a smart solution so that no explanation is needed
- [BUG] Thumbnails for TikTok video on the videos page shows a black background behind it instead of filling the page- a bit complicated because of different video sizes and difficulty knowing beforehand from the embed if the space is enough-better to have more space than for the video to be cutoff
- [ ] Instagram videos on the video page don't play at all on mobile, redirects to Instagram
- [ ] Reduce the number of Artemis II Items shown on the gallery page - there are repititions


- The gallery light box shows a preview of the text for images, but shows the full text for the videos instead of just the preview -DISABLED THE PREVIEW
- [ ] Add an explanation to the reader for the gallery so they know how to navigate, first describe the top-level sections such as images, then the subcategories such as Cover images-partial implementation 

-Need to show the visual hierarchy for the Gallery page, images first then the categories for the gallery image such as AI, then videos-partially implemented with toc

Also need to move the Artemis II collection under the images and show about 2 subcollections for Artemis II
- [ ] Click to play should not display on Instagram amd Twitter thumbnails on YouTube, also text should be out of the way of thumbnails
- [ ] The sveltia cms docs has transformations for webp images for width and height, let's see if it can help solve the issue of cover images not being the same size


https://sveltiacms.app/en/docs/media/internal#asset-collections
Eg from docs:
width: 2048 # default: original size height: 2048 # default: original size svg:
- [ ] Add the list of links in navigation and pages on the site to the footer so it's easier to navigate
- The video collections start with Behind the scenes in alphabetical order, need to find a better way
- Video collections should animate on scroll
-Need to show the subcategories visually for the navigation on the gallery homepage
- [ ] Add a navigation for the Artemis II page in '/gallery/Artemis-ii/
- [ ] Need to format quotes for famous people posts like this image. Need it to work for light and dark mode 

🔗 Markdown path: /assets/images/black-quote-go-and-be-the-best.jpg
- [ ] The TikTok cards on the video page are so long or tall that it's difficult to see the entire card. Maybe we can find a way to display it in such a way that you can see a lot of the posts but when you play it it focuses on one particular video for desktop, especially for mobile
- [ ] When iframe for the video's page is loading it just shows a blank gap this is not good for the user experience. Find a way to fix this, make this Interactive
- [ ] The skydiving shorts titled what are you afraid of is displayed as in landscape mode so it doesn't show up properly when played from the video speech and also when played from the single video page
- [ ] The YouTube page sidebar when clicked it's not very obvious that the content is being filtered based on the selection of the sidebar
- [ ] In dark mode on mobile, the cards on this page are hard to distinguish 
https://rdjarbeng.com/gallery/screenshots/ perhaps some kind of border to know when you are at the end of the screenshot
- [] Music of RRR | Richard Djarbeng
https://rdjarbeng.com/gallery/videos/music-of-rrr/

How to put something underneath this post that shows that this is a playlist under a video collection for this website- partial
- [ ] Artemis II Mission gallery needs to be organized so the subsections are organized chronologically
- add a random movie picker, implement for nigerian movies, christian movies
- [ ] Investigate no cookie for YouTube if it makes a difference

It messes with the formatting, can't see the replies, and changes the url, but it works youtube-nocookie.com/embed/-ZRwlYtA.

 Or then adda hyphen after www.yout in the url.
(yout-ube.com/watch?....)
yout-ube.com/watch
- [ ] Add the enlighten project as a section on the homepage
- [ ] TikTok videos aren't loading on the site due to overload protection

- [ ] Need to be able to navigate the website with keyboard inputs if necessary
- [ ] What would it take to add versioning to posts
- [ ] Let the homepage cards scroll horizontally on mobile liie in the gallery so it's easier to navigate the different sections
- [ ] Utilize the free space on the nav between the logo and nav items to put something interesting there. Was thinking about the category display with the icon but there could be something more interesting
- [ ] What can we do with RSS feeds currently and how can it be integrated into the site in terms of content
- [ ] Do we need this or our current embeds are fine?

https://www.jamesleighton.com/2026/09/easily-embed-youtube-videos-into-11ty/
- [ ] Add a UI where posts are linked to each other and the link to the cards. Would be good to add it to the recommended posts as a way to show where you should go next and which direction is strongest, kind of a mindmap, also good for my analytics so I can see posts that stand alone vs those that are connected across the site
- [ ] Create a kind of RSS feed or update that lists site development progress and releases somewhere on the website
- [ ] Rich results test fails for homepage but passes for posts on the site
- [ ] Add a way for links to posts referenced on my website to look very nice with their own preview and make sure it works on other posts mentioning the next one
- [ ] Add a separate section for sources for posts that links all the posts referenced with their previews
- [ ] About page needs work, the rounded corners need to go, the cards, the highlighting with color accents, and that purple theme in dark mode needs to go
- [ ] Customer service evolution, why does it take so long to speak to a person? Why does the automated system suck, nobody seems glad to call them, who's installing them and benefiting them, personally it takes more than 5 minutes to talk to an agent, usually there's some generic tune playing, who even asked for that. Include Amazon call where the numbers were seemingly good but they decided to place a call for themselves only to be on hold for so long
- [ ] Algolia shows 
Recommend Requests
0 / 10K 

Is this something I should be using or it's fine?
- [ ] Is the current way the files are organized in the repo good for agents, what about scale and conpute? I feel like this website isn't taking advantage of all the advantages we have in this modern age
- [ ] Why do inspected pages show this error on google search console: Sitemaps
Temporary processing error
- [ ] Is the animate on scroll still working for posts?
- [ ] With my knowledge of computer vision and image and video compression, I think it would be nice to have some kind of filter or image transformation, I see that this gives a 'funky' different looking image especially for cover images, it makes things interesting than just seeing a grid of posts
- [ ] For the enlighten project we can go deeper than book level, go to chapters.
Which books have interconnected chapters, maybe one book has a theory section on Fourier, and another has a place you can apply it

Or a chapter collection for people who want to learn Laplace or codecs, so it's quick to learn what you need
- [ ] Increase font size across the site so most text uses the same size as email font large by default
- [ ] Bug: Something is wrong on the youtube page the playlist: Neural Networks for Machine Learning —Geoffrey Hinton includes some other videos from somewhere else
- [ ] The mermaid diagrams don't look interesting to look at, some colour,some bigger font, more contrast in night mode instead of grey on black would help
- [ ] CMS Status context: Let's see if we can add this to the cms:  preview_context: Cloudflare Pages

https://sveltiacms.app/en/docs/deployments/previews#specifying-a-status-context
- [ ] Interesting repo, I'm considering doing this for my site mascot using one of my avatars for posts: https://myoctocat.com/
