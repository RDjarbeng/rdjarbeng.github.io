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

## Current focus

This is the short, curated list of work currently being pursued. It should normally contain no more than three outcomes.

- [ ] Make `/videos/` easy to understand and navigate for a first-time visitor.
- [ ] Extend the existing Algolia search architecture to gallery and YouTube content.
- [ ] Define a scalable video-collection model, including how YouTube playlist updates are synchronized.

## Current known issue

- [ ] Hide or replace the video collection list when a visitor starts a search.

## Decision queue

- Should each video collection have a standalone landing page?
- Should YouTube remain the source of truth for playlist membership, with the website synchronized from it?

## Note workflow

Raw Telegram notes now go to [TODO_inbox.md](TODO_inbox.md). During triage, move a deduplicated, actionable version to `TODO_content.md` or `TODO_design.md`. Keep only active outcomes here.
