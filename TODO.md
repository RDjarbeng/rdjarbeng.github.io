This todo file contains design specifications and technical  directions for rdjarbeng.com, possible issues and possible future implementations

# Specifications
- This website is deployed on Github pages at rdjarbeng.com and should scale globally
- Blog posts are rarely written, but often read
- Most of the website is purely static files, 
- Caching must be implemented where possible

## Understanding the layout and reason for certain pages



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
    -Youtube
    -Instagram 
    -TikTok
    Each of the dedicated social media pages have their own strengths that distinguish it from the combined videos page. Youtube playlists for instance are  a strength of youtube.
- Other minor pages 'search, tags, categories, contact... etc'

# Developer To-Do List & Notes

This file tracks issues, bugs, and future improvements for the [rdjarbeng.com](https://rdjarbeng.com) codebase.

This repo is a blog that's being built as well as being filled with content concurrently

List of todos is split across two files:
TODO_content.md: Todos related to content 
TODO_design.md: Todos related to design and technical site building 

Current focus:

I want to improve the videos page on '/videos' the goal is to make it easier to navigate as a new user that get's sent the link. The video page should be organised in an interesting and useful way that can be easily navigated and the user should be able to find what they are looking for easily.

Current problems with the video page:

* The list of collections don't disappear when the user starts searching.

 Okay, now I also want to consider making the different collections have their own pages, let's discuss how scalable this is. The collections are basically groupings of existing videos already uploaded. I had an implementation for youtube playlists but I'm not sure how scalable that would be especially if it can sync with youtube when the playlist is updated, mostly additions will be made to the playlist on youtube and I don't want the playlist on the site to fall behind.

For improving the search, even across the entire site, I'm open to using tools such as algolia.
