This todo file contains design specifications and technical  directions for rdjarbeng.com, possible issues and possible future implementations

# Specifications
- This website is deployed on Github pages at rdjarbeng.com and should scale globally
- Blog posts are rarely written, but often read
- Most of the website is purely static files, 
- Caching must be implemented where possible
- the rest is a dynamic REST API- todo
- Any new users that subscribes should receive a welcome email- todo
- Email newsletter - todo
- Comments on blog posts - todo
- Any photo uploaded to the blog should have a thumbnail generated- todo

# To-Do List for rdjarbeng.com

## High Priority - Immediate Fixes & Critical Enhancements

- [ ] Add a section for AI tools and AI projects. (High Importance, Medium Complexity: Requires new collection/layout)
- [ ] Fix: Gallery Titles - Investigate why all gallery pages show the same title. (High Importance, Medium Complexity: Debugging Jekyll logic)
- [ ] Fix: The nav search button is hidden on mobile once the user starts typing. (High Importance, Trivial Complexity: CSS/JavaScript fix)

## Low Priority - Existing Feature Polish & Minor Bugs

### Styling & Layout
- [ ] Optimize CSS: Currently loads CSS for personal and video pages when not needed. (Medium Importance, Medium Complexity: Refactor CSS loading)
- [ ] Style: Homepage contact form in dynamic nav needs proper styling. (Medium Importance, Trivial Complexity: CSS tweaks)
- [ ] Implement `jekyll-responsive-image` to properly size images on mobile devices. (Medium Importance, Medium Complexity: Plugin integration)
- [ ] Fix: Previews for posts on Twitter aren't working for some reason. (Medium Importance, Medium Complexity: Debugging meta tags)
- [ ] Fix: Post cards showing previous and next post are overflowing the bottom and making the padding at the bottom smaller than it needs to be. (Medium Importance, Trivial Complexity: CSS layout adjustment)
- [ ] Fix: Code on this post doesn't show up nicely on mobile https://rdjarbeng.com/critical-supply-chain-attack-on-axios-npm-package/. (Medium Importance, Trivial Complexity: CSS for code blocks)
- [ ] Fix: The categories page night mode isn't properly displayed. (Medium Importance, Trivial Complexity: CSS for dark mode)
- [ ] Fix: Videos page inline player is not obvious that video can play the video without navigating, perhaps set to play on hover or something. (Medium Importance, Trivial Complexity: CSS/JavaScript hover effect)
- [ ] Fix: The last modified section for posts sometimes shows a wrong date on deployed site but not on local. (Medium Importance, Medium Complexity: Debugging Jekyll build/timezone)
- [ ] Add a view related posts link for videos too so I can track media across the site. (Medium Importance, Medium Complexity: Jekyll layout/logic)
- [ ] **Contact Overlay**: Implement background for the contact overlay at the bottom. (Medium Importance, Trivial Complexity: CSS styling)
- [ ] Add skeleton loader for images. (Medium Importance, Medium Complexity: HTML/CSS/JS implementation)
- [ ] **Card images**: Card images for post cards have a top padding that leaves a gray space. (Medium Importance, Trivial Complexity: CSS styling)
- [ ] **Cards**: add category to cards on homepage, posts. (Medium Importance, Trivial Complexity: Jekyll layout modification)
- [ ] TOC section highlighting flashes briefly when title is visible then is not visible for rest of the scroll needs fix. (Medium Importance, Medium Complexity: JavaScript debugging)

### Content & Data Structure
- [ ] **Contact Form**: Add dropdown to website contact form to append reason for user's query. Automated reply should come from website email. (High Importance, Significant Complexity: Backend integration/email service)
- [ ] **Card layouts**: Cards for posts (shown at the bottom of the page) are not shown in the table of contents. (Medium Importance, Medium Complexity: TOC generation logic)
- [ ] Add authors page listing all the authors. (Medium Importance, Medium Complexity: New Jekyll layout/data iteration)
- [ ] Get images to load separately, get parts of the homepage to load separately so the main content loads quickly even on slow connections (ideally 1s initial load time,FCP). (High Importance, Significant Complexity: Advanced lazy loading/critical path optimization)
- [ ] Remove tiktok expander plugin if not necessary. (Low Importance, Trivial Complexity: Plugin removal)
- [ ] Tags and categories need to be added to personal posts, gallery images and videos. (Medium Importance, Medium Complexity: Content front matter updates/Jekyll logic)
- [ ] Gallery item titles need to be capitalized - possible use of jekyll capitalize filters. (Medium Importance, Trivial Complexity: Jekyll filter application)
- [ ] Add pages: authors page, meme page, videos page, youtube page specifically for youtube videos (add a random picker for youtube videos, allow users to customize it to their preferred category, eg: Nigerian movies, long form content). (High Importance, Significant Complexity: New Jekyll layouts, YouTube API integration)
- [ ] Authors page needs a page for each author instead of a long scrolling page. (Medium Importance, Significant Complexity: Jekyll collection/layout restructuring)

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
- [ ] Search needs to include gallery items, tags, categories. (High Importance, Significant Complexity: Search engine integration or custom build)

### Overall Strategic Goals
- [ ] **Strategic Goal: Doubling Daily Active Users (2x DAU)**
    - [ ] Programmatic SEO for AI Trends: Create "Solution Recipes" (e.g., "How to deploy YOLO World on a Raspberry Pi").
    - [ ] "Project-to-Post" Pipeline: Automate generation of "Build Log" for project updates.
    - [ ] Newsletter Integration: Implement a "Digital Garden" style newsletter for AI research updates.
    - [ ] GitHub Cross-Pollination: Ensure every README has a "Learn how this was built" link to a deep-dive post.
- [ ] **Strategic Goal: Increasing Time Spent by 35%**
    - [ ] Live Interactive Demos: Embed "Lite" versions of your projects directly in the posts.
    - [ ] Series-Based Architecture: Reorganize content into "Tracks" (e.g., "The Autonomous Trading Track").
    - [ ] Technical Deep-Dives (The 2,000+ Word Rule): Transition from 500-word overviews to 2,000+ word authoritative guides with annotated code blocks and architectural diagrams.
    - [ ] Readability UX: Improve the "In-App" feel by adding Estimated Reading Time.
    - [ ] Readability UX: Improve the "In-App" feel by adding Table of Contents (Sticky).
    - [ ] Readability UX: Improve the "In-App" feel by adding Code "Copy" and "Play" buttons.
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
- **Search Solution Considerations**: "I've seen other websites use powered by Algolia or Google; need to see the tradeoff vs building search myself." (Research idea for search implementation)
- **CSS optimization insight from Victor @vponamariov**: "You know what kills your site performance? Rendering 3000px of content when the user can only see 900px. And there is an easy fix for that. It's a magical CSS property `content-visibility: auto`." (Research note/idea for CSS optimization)


## Telegram todos
- [ ] Check YouTube API to see if from a channel name you can see the growth in subscribers over time and plot this on a graph 📈
- [ ] Memes don't show most recent first, layout needs improvement
- [ ] Issue: Tables are not showing text properly on dark mode
- [ ] Bug: Video page preview shows code instead of a proper description
- [ ] Long titles are cut off on the third line, full title should show on tool tip on hover
