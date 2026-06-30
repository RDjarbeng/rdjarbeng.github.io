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

- [ ] Fix: The nav search button is hidden on mobile once the user starts typing. (High Importance, Trivial Complexity: CSS/JavaScript fix)

## Low Priority - Existing Feature Polish & Minor Bugs

### Styling & Layout
- [ ] Optimize CSS: Currently loads CSS for personal and video pages when not needed. (Medium Importance, Medium Complexity: Refactor CSS loading)
- [ ] Style: Homepage contact form in dynamic nav needs proper styling. (Medium Importance, Trivial Complexity: CSS tweaks)
- [ ] Implement `jekyll-responsive-image` to properly size images on mobile devices. (Medium Importance, Medium Complexity: Plugin integration)
- [ ] Fix: Previews for posts on Twitter aren't working for some reason, sometimes the preview doesn't load before & after posting. (Medium Importance, Medium Complexity: Debugging meta tags)
- [ ] Fix: Post cards showing previous and next post are overflowing the bottom and making the padding at the bottom smaller than it needs to be. (Medium Importance, Trivial Complexity: CSS layout adjustment)
- [ ] Fix: Code on this post doesn't show up nicely on mobile https://rdjarbeng.com/critical-supply-chain-attack-on-axios-npm-package/. (Medium Importance, Trivial Complexity: CSS for code blocks)
- [ ] Fix: The categories page night mode isn't properly displayed. (Medium Importance, Trivial Complexity: CSS for dark mode)
- [ ] Fix: Videos page inline player is not obvious that video can play the video without navigating, perhaps set to play on hover or something. (Medium Importance, Trivial Complexity: CSS/JavaScript hover effect)
- [ ] Add a view related posts link for videos too so I can track media across the site. (Medium Importance, Medium Complexity: Jekyll layout/logic)
- [ ] **Contact Overlay**: Implement background for the contact overlay at the bottom. NASA picture of the day or media in the site gallery will be nice (Medium Importance, Trivial Complexity: CSS styling)
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
- [ ] Add pages: authors page, youtube videos (add a random picker for youtube videos, allow users to customize it to their preferred category, eg: Nigerian movies, long form content). (High Importance, Significant Complexity: New Jekyll layouts, YouTube API integration)
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
- the nasa gallery images have an option to do ~small, to load smaller versions on the homepage, should use these for the gallery cards, and show the defaults ~large only for the full image

- the card layout at the main gallery, and after clicking view all are different (need to decide whether to keep the date), check the gallery card
- Even though I have a post on EV's searching electric vehicles bring up "no result found", can we fix this?
- [ ] All items on the media gallery are not searchable. The search on the nav bar only applies to the posts and personal posts- doesn't include the media gallery. the gallery search only searches the homepage items displayed instead of the entire gallery (videos +images)
- [ ] Check access logs for user-agents see who's crawling, check for markdown content negotiation
- [ ] Improve individual tags and categories page so that it's informative, currently a single tag page just links to the post it references, this isn't helping SEO.. Suggestions for improvement: we could link more posts in the category of the recommended posts or suggest popular posts on the site to make thenpage not look empty, or some other approach that's good for SEO
- [ ] Figure out how to structure pages so that even of it's jist a picture it's informative for the user, find out how X,Facebook, Instagram does this. Does adding details such as who posted this make a difference?
- [ ] Add a label to the posts and personal posts, detailing that eg: this post is part of a collection of technical posts on rdjarbeng.com (link to posts page), same for personal posts. Could do same for gallery groupings
- [ ] Post images thumbnails cut off on most of the postcards showing only a part of the image need to find a way to size the postcards and post images correctly to show majority of the image so that the text is not cut off especially on the home page
- [ ] Remove horizontal scroll bars on the gallery collection on the homepage replace with arrows
- [ ] The gallery cards on the homepage have a black border on the images which is not needed need to fix this so that the images occupy more space
- [ ] Gallery images need to be organized, there are too many images in Gallery external that don't have a proper category

- the telegram bot needs to be updated on the new organization of the gallery
- [ ] Link directly dev, coder legion posts manually to main site
- [ ] Add link to background remover and projects on the about page

- [ ] Some of the pages on bing webmaster upon inspection show: "Blocked URL cannot appear on Bing

The inspected URL is known to Bing but has some issues which are preventing us from serving it to our users. We recommend you to follow Bing Webmaster Guidelines."
- Youtube page was supposed to be styled differently but now looks more like the videos page
- [ ] YouTube videos aren't showing most recently added first
- [ ] TOC Sidebar on individual posts needs some left space aeay from the screen edge. Title for posts needs space on the right away from screen edge
- [ ] Artemis II gallery is a lot, show only two collections on the main gallery page and the rest when the reader clicks to view all
- [ ] The search on the videos page doesn't display results in the grid similar to the homepage but instead does it vertically
- [ ] Video collections need a nicer transition
- [ ] Video page collections don't play without redirecting, would be nice to have them play

- Video page needs to organize videos so it's not an endless scrolling list
- [ ] Text in Gallery sidebar looks faint in light mode
- [ ] Need to integrate the site woth other sotes and services so it's useful to people and agents
- [ ] Gallery section on homepage needs more text, can make excerpt or something else, need a smart solution so that no explanation is needed
- [ ] The text on gallery recommendations on a single post for a gallery item in dark mode don't have enough contrast
- [ ] Did an import from medium and the cards at the bottom of the posts weren't imported correctly. It shows 'related concepts and posts' but the card content was not included
- [ ] Video collections are in the way, so the user can't see the difference when they filter by a source like Twitter on the video page until they scroll down
- [ ] Need to paginate the videos page to prevent endless scrolling
- [ ] Seems some links in posts, and the category in posts have low contrast need to improve this
- [ ] Part of footer os is hidden on videos page by the sidebar
- [ ] YouTube hub doesn't have a footer
- [ ] Instagram  and TikTok videos don't play on click in the video page, need to remove the play button from those
- [BUG] Thumbnails for TikTok video on the videos page shows a blue background behind it instead of filling the page,
- [ ] Instagram videos on the video page don't play at all on mobile, redirects to Instagram
- [ ] Set certain tags as series on the website, such as money transfer
- [ ] Reduce the number of Artemis II Items shown on the gallery page

- Gallery page Artemis II doesn't capitalize II, instead uses 'Ii', breaking the Roman Numeral format

- The gallery light box shows a preview of the text for images, but shows the full text for the videos instead of just the preview
- [ ] Add an explanation to the reader for the gallery so they know how to navigate, first describe the top-level sections such as images, then the subcategories such as Cover images 

-Need to show the visual hierarchy for the Gallery page, images first then the  categories for the gallery image such as AI, then videos.

Also need to move the Artemis II collection under the images and show about 2 subcollections for Artemis II
- [ ] Could create an option like this for guest posts on my blog:
https://blog.pragmaticengineer.com/pragmatic-engineer-guest-article/
- [ ] Finance series on the blog about page needs a series of cards instead of current format
- [ ] Click to play should mot display on Instagram amd Twitter thumbnails on YouTube, also text should be out of the way of thumbnails
- [ ] The sveltia cms docs has transformations for webp images for width and height, let's see if it can help solve the issue of cover images not being the same size


https://sveltiacms.app/en/docs/media/internal#asset-collections
Eg from docs:
width: 2048 # default: original size height: 2048 # default: original size svg:
- [ ] Add the list of links in navigation and pages on the site to the footer so it's easier to navigate
- [ ] Add icon to the minutes to read on the post cards for homepage
- [ ] Need a way to distinguish the videos from the images in the gallery recommended section on single posts. The icon could help
- [ ] Navigating back from a video collection takes you to the top of the videos page, needs to be fixed
- The video collections start with Behind the scenes in alphabetical order, need to find a better way
- Video collections should animate on scroll
-Need to show the subcategories visually for the navigation on the gallery homepage
- [ ] Add a navigation for the Artemis II page in '/gallery/Artemis-ii/'
- [ ] Need to format quotes for famous people posts like this image. Need it to work for light and dark mode 

🔗 Markdown path: /assets/images/black-quote-go-and-be-the-best.jpg
- [ ] The Tick Tock cars on the video page are so long or tall that it's difficult to see the entire card. Maybe we can find a way to display it in such a way that you can see a lot of the posts but when you play it it focuses on one particular video
- [ ] Some video items " no matter what you do do you still judge you" for example have the play button even though it is still on Instagram post this needs to be fixed. Twitter and Instagram posts should not have a play button on the video page
- [ ] When I frame for the video's page is loading it just shows a blank gap this is not good for the user experience. Find a way to fix this, make this Interactive
- [ ] The skydiving shorts titled what are you afraid of is displayed as in landscape mode so it doesn't show up properly when played from the video speech and also when played from the single video page
- [ ] The YouTube page sidebar when clicked it's not very obvious that the content is being filtered based on the selection of the sidebar
- [ ] Find a way to detect errors on the site from 404 to site going down because of DNS or security issues. Currently will have to visit first before the issue is even noticed
- [ ] In dark mode on mobile, the cards on this page are hard to distinguish 
https://rdjarbeng.com/gallery/screenshots/ this page
