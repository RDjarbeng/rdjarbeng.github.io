---
date: 2025-10-23T15:21:00
published: false
author: Richard
categories:
  - Technology
tags:
  - Richard Djarbeng's Blog
  - Review
title: 100 posts later-lessons learnt from building this blog
image: ''
image_alt: Cover image for 100 posts later-lessons learnt from building this blog
layout: post
---
Changes since the start:

Content about the website:

Made more long form content that is more than a 5 minute read. I think these posts allow me to cover more and are more informative. One good example is my post on a [decade by decade look at AI](https://rdjarbeng.com/a-chronological-look-at-ai-a-decade-by-decade-evolution/) which is sitting at 16 min read time. Ironically it is one of the posts that I would have liked to make longer but didn't have the time to add in all the extra details. If I had my way I could spend days writing about AI and it's hard to figure out which content to leave out. Because what to write is not just the issue what to leave out is also a big part of it. I must admit it's a bit painful leaving out a section of a piece you've worked on for days because you don't think it contributes to the story you're currently telling. Now that I am writing this post it might actually exceed that record of 16 minutes, but we'll see.

Sometimes too I end up changing a post so much that I'm not quite sure if the final version that was published is what I intended from the start. Especially when I use Gemini as an editor to brainstorm the drafts of post. If the wording in every paragraph is changed and the sentence structure differs but it's saying the same thing is it still the same post with different words or a new post with a different idea but similar to the first? It's giving the vibe of the [ship of Theseus](https://en.wikipedia.org/wiki/Ship_of_Theseus) so much

One of the things that has changed is that I mostly include references directly in the post with the link to the external resource. I used to 'cite' them in the text and place them at the end of the post, but I felt that breaks the flow of reading for the web reader and doesn't usually help them find what they are looking for quickly; they have to scroll through the list of references to find the actual reference before finally clicking to see what they are looking for. On the upside it makes the post more compact. However one downside to this is that if the reader doesn't notice that the text they are currently reading is a link to a reference it may sound as if I'm just speaking from my personal experience. I've got the personal section of this website for that. Also sometimes I do a lot of research to before including certain content in a post, reading across many sources and then when I finally mention it in the post I include a link. I feel this  doesn't show the effort put into looking up sources for that particular post when all you see is a link; which the reader may or may not notice.

Thumbnails for the posts have become more detailed with more information about the post highlighted on the thumbnail. I realise that the posts that feature me in the cover I have a tendency to strike a post where I am looking up. Just like that vegeta video where he's in the rain and staring up into the sky.

## Technical about the website building:

Moved to SveltiaCMS.

(add a graph of timeseries of published posts)

Added a form for people to contact me because I felt it wasn't wise to publish my personal email on the web.

Setup emails ending in @rdjarbeng.com for branding purposes. It also helps me filter emails/contacts related to the site. Very handy

Changed from long url github.io to rdjarbeng.com

Insert lighthouse reports are we green? How long to load?

Added a personal page where I discuss non-technical stuff. It took more than expected to create and link another collection with jekyll

Pagination is a pain in jekyll. Version 1 and  2 of the jekyll paginate plugin both fail. I even tried leaving the task to an agentic agent to try and figure it out. It tried failed to get the posts to show up but got the page navigation working then realised it wasn't working tried different workarounds changed from v1 to v2 back to v1 then back to v2 and eventually gave up.

500+ indexed pages on google (add screenshot)

Got problems with 'crawled-not indexed' and 'discovered-not indexed' though on google search console

Tags and category pages are ranked higher on google search instead of the home page or the navigation links.

AI tools

AI man, AI - Gemini pro supercharged my content creation process, thumbnails and image creation for the covers

### Top AI models:

Grok: good for refining text and is able to add current information in the proper context especially for posts where information needed is about current events/trending news. Also good for verifying links but not 100% accurate. I've found some links to be dead after Grok assures me they are active. Hopefully it gets better eventually.

Gemini: doing well with image generation especially with the text than grok. Also able to retain context of long posts and is most likely the one that will be used to edit this post. Grok has the tendency to summarize sections of the post that don't need to be summarized or leave out important information on long posts. Gemini does this less often. Gemini also has nano-banana and now with nano-banana pro I can edit pictures and add text that is actually spelled correctly to my images. This saves me time in having to edit and watermark images. Of course the manual thumbnail creation has more detail but not every post requires that level of detail. Here for example is my thumbnail for the post on Letsile Tebogo's epic win at the olympics (manual thumbnail done with Microsoft Designer) vs my post on the Google vs FFMpeg debate (Generated by Gemini nano-banana)

![](/assets/images/TebogoOlympics2024200m_cover.webp)

![](/assets/images/google_vs_ffmpeg_cover.webp)

However the problem with gemini is that sometimes it can produce beautifully written posts that don't sound like the author (me). So I have to be careful not to lose my _voice_ and flow of thought when editing with gemini by always referencing the earlier drafts.

I mentioned this when speaking about how I can change posts so many times. If I don't track the original intention of the post I may end up missing the point of the post if I leave the reins to the AI tools.

Claude: I used to edit posts with claude. It excelled at keeping context and also did not change too many things. If I had to change a particular paragraph alone most likely I would use claude and specify the rest of the post as context. So claude was good at quick edits that didn't disrupt much. But it failed at adding relevant context to posts, adding links and verifying that they were working was also something it could not do at that time, it also used to timeout a lot and I find that I have to revisit a post multiple times everytime it times out. This friction of going back to posts whenever I ran out of tokens made me eventually stop using it for web posts.

Meta ai: I used meta AI for the post on [Tunde Onakoya's chess marathon](https://rdjarbeng.com/personal/tunde-onakoya-breaks-guinness-world-record-with-epic-chess-marathon-for-children-s-education/) in Times square. I liked the feature where it generated images as you typed allowing you to kind of edit on the fly.  However since then I have not used it much, also because when I was in Rwanda it was not available in that Region for some time. It is now available but now, just like Claude I haven't really felt a need to go back to it after I stopped using it.

### AI tools as writers and editors

Sometimes I take the output from one model and give it to the other to criticize and work on improvements for the generated output.

Workflow for that AI work flow: Initial draft by me-> 1st draft post\* by AI model acting as a co-author -> Review by 2nd model acting as editor -> Update of draft post by me and 2nd AI model-> Final edits by senior Editor, Me

\*1st draft post, may go through many iterations and is usually the nth version, but it's usually the version that I find suitable to publish but could use improvement so it's sent to the editor.

Sometimes your work helps others. Landing AI post highlighted how I was able to notify them about the bug on their website,  RuRa electricity announcement saving costs for electricity, interior AI post helped someone create an appropriate layout for their room.

## Lessons in content creation:

Detailed does not always mean informative. Some technical posts here didn't receive much traffic

Some posts that I thought were just regular posts actually did pretty well. For instance my post about my trip to Uganda had a lot of interest even from my friends who were Ugandans and I got a lot of messages when I posted about it. It's funny because I didn't really consider a it as a post that was going to pick up traction. My whole idea was to tell a story about my experience. I didn't really think I was writing a post the whole premise of the post was, 'See what happened was...'

Adding thumbnails of posts is good, even if they take time to make.

Writing takes time, even with AI

Sometimes AI is double work because I have to write drafts, write prompts, edit the AI output, edit my prompts, make minor tweaks, revert changes and scan the posts many times again with reference to the original draft to make sure no important detail was left out acting as a senior editor to make sure everything is set before signing off on a publications. Sometimes I wonder if writing everything myself and editing my drafts is not a less tiring approach. Editing with AI does have the advantage of speed but the extra supervision needed almost negates the speed boost. Maybe writing things myself is a better approach but that also takes up much of my time and posts come out slowly.

My conclusion for AI tools is that they are  good for generating tags, images, refining titles. Cannot be trusted to create and edit posts from start to finish without supervision. Opinions mine.

Gallery feature:

You might be surprised to hear this, but creating 160 (or even 1,000) small text files is actually **more efficient** for the workflow and the CMS than one giant yaml file, and it had **zero noticeable impact** on your build speed.

## Improvements to be made:

Homepage apparently is not very informative, according to google. Been thinking of improving the homepage structure to reflect the different categories. I find that seeing a post on finance, then next another on air quality then another about AI spoils the experience. What are the chances that a user will be interested in all three yet they are presented in order on the site. So if you look at it like a recommendation algorithm the closely related items should be grouped into a place where the user can browse their interests without navigating other posts which they have little interest in. I should think this is also good for SEO but I haven't verified this.

About page does not indicate a contact page at first glance

Tags pages get more attention than posts

Getting guest authors

Improving backlinks

Best posts:

Trip to Uganda. This post got a lot of attention.

My favorites:

Banks in Rwanda, Letsile Tebogo
