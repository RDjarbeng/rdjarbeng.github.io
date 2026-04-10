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

# Enhancements & Infrastructure
## High Priority

- Claps for post don't show on dark mode

- Add a section for AI tools and AI projects

- [ ] **Fix Gallery Titles**: Investigate why all gallery pages show the same title.

- The nav search button is hidden on mobile once the user starts typing, needs a fix

## Low Priority
- Css needs to be optimized, currently loads css for personal and video pages when not needed
- Homepage contact form in dynamic nav needs proper styling
- Implement jekyll-responsive-image to properly size images on mobile devices
- Previews for posts on twitter aren't working for some reason
- Post cardss showing previous and next post are overflowing the bottom and making the padding at the bottom smaller than it needs to be
- Code on this post doesn't show up nicely on mobile https://rdjarbeng.com/critical-supply-chain-attack-on-axios-npm-package/
- The categories page night mode isn't properly displayed
- videos page inline player is not obvious that video can play the video without navigating, perhaps set to play on hover or something
- THe last modified section for posts sometimes shows a wrong date on deployed site but not on local
- The loading indicator for the contact dynamic footer for light mode isn't showing
- Add a view related posts link for videos too so I can track media across the site

### Enhancements & Infrastructure
- [ ] **Contact Overlay**: Implement background for the contact overlay at the bottom.
- [ ] **Contact Form**: Add dropdown to website contact form to append reason for user's query. Automated reply should come from website email.
- [ ] **Card layouts**: Cards for posts (shown at the bottom of the page) are not shown in the table of contents.
- [ ] add skeleton loader for images
- [ ] **Cover Images**: Investigate how to position cover images so they are not cut off (maybe add adjust on upload feature). 270x200 might be good image size
- [ ] **Card images**: Card images for post cards have a top padding that leaves a gray space
- [ ] **Cards**: add category to cards on homepage, posts

- [] Carousel: Try carousel design from apple site, book flipping carousel, story mode, carousel for categories with 3D animations
- [ ] Add authors page listing all the authors
- [ ] Get images to load separately, get parts of the homepage to load separately so the main content loads quickly even on slow connections (ideally 1s initial load time,FCP)
- [ ] Remove tiktok expander plugin if not necessary'
Search needs to include gallery items, tags, categories - I've seen other websites use powered by Algolia or googlem need to see the tradeoff vs building search myself
Tags and categories need to be added to personal posts, gallery images and videos

## Gallery improvements
Gallery item titles need to be capitalized- possible use of jekyll capitalize filters

The gallery section just looks uninteresting on mobile view, I think it's the layout, I'm not sure how to fix it, I'll have to look into it. Memes need to be scrollable

- Add pages: authors page, meme page, videos page, youtube page specifically for youtube videos (add a random picker for youtube videos, allow users to customize it to their preferred category, eg: Nigerian movies, long form content)


Possible improvements
- Here is the strategic roadmap:

1. Doubling Daily Active Users (2x DAU)
The focus here is on Distribution and Search Intent.

Programmatic SEO for AI Trends: Since you work with YOLO World and Gemini, I would create a series of "Solution Recipes"—short, highly searchable posts solving specific technical hurdles (e.g., "How to deploy YOLO World on a Raspberry Pi"). These capture long-tail search traffic from developers.
The "Project-to-Post" Pipeline: Every time you update a project like MAHORAGA or the Lyric Video Generator, I would automate the generation of a "Build Log." Sharing these technical journeys on LinkedIn and Twitter (where you're already active) drives high-intent referral traffic.
Newsletter Integration: Implement a "Digital Garden" style newsletter. Instead of a standard blog, treat it as a recurring update on your AI research. This converts one-time visitors into the "Daily Active" cohort.
GitHub Cross-Pollination: Ensure every README in your repositories (like rdjarbeng.github.io) has a "Learn how this was built" link leading back to a specific deep-dive on the site.
2. Increasing Time Spent by 35%
The focus here is on Interactivity and Content Loops.

Live Interactive Demos: Instead of just screenshots, I would suggest embedding "Lite" versions of your projects directly in the posts. If a user can play with a YOLO World detector or a TTS preview in-browser, their session duration will skyrocket.
Series-Based Architecture: Reorganize content into "Tracks" (e.g., The Autonomous Trading Track). At the end of every post, use a "Next in Series" prompt rather than just "Related Posts." This creates a "binge-reading" effect.
Technical Deep-Dives (The 2,000+ Word Rule): Transition from 500-word overviews to 2,000-word authoritative guides. Detailed tutorials with annotated code blocks and architectural diagrams (using the landscape screenshots you prefer) naturally keep users on the page longer.
Readability UX: Improve the "In-App" feel by adding:
Estimated Reading Time: Sets expectations.
Table of Contents (Sticky): Allows users to jump to sections of interest without leaving.
Code "Copy" and "Play" buttons: Increases interaction events within the page.

### Copy this carousel/hero section for the gallery
https://inkscape.org/

## CSS optimization to try

Victor
@vponamariov
You know what kills your site performance?

Rendering 3000px of content when the user can only see 900px. And there is an easy fix for that.

It's a magical CSS property

content-visibility: auto.
