---
title: Dr Jekyll & Ruby -building Richard's personal website
date: 2024-07-22T00:00:00
author: Richard
 image :/assets/images/jekyll_cyber.jpeg
layout: post
categories: ["Software Engineering"]
tags: [Ruby, jekyll, website development, Richard Djarbeng's website]
---
# First step - Why Ruby?

*This post is about my developer experience building my personal website with ruby, jekyll and GitHub pages, opinions mine*

When I decided to build👨🏽‍💻 my personal website I could have used [React](https://react.dev/) or just plain html and CSS with [Netlify](https://www.netlify.com/) deploy.
😒 But no, somebody had the bright idea to build with Ruby and Jekyll with deployment on Github pages.
At that point I had watched the [ruby on rails demo](https://www.youtube.com/watch?v=Gzj723LkRJY&) by [David Heinemeier](https://dhh.dk/) Hansson and thought it was pretty neat. It also reminded me of the PHP framework laravel *(unreliable source twitter: turns out laravel rather copies ruby on rails )*.

The site I had in mind was suppose to be simple in functionality

- Generate pages of post
- Support images and gifs
- Include content about the creator, yours truly, Richard
- Have a smooth blogging experience

Since I was interested in learning Ruby so I thought why not use that. That was when the trouble began.

![jekyll_cyber_theme by RD ](/RDjarbeng/assets/images/jekyll_cyber.jpeg)

## Jekyll

### Syntax and extensions

First of all the ruby syntax is slightly weird and there is a mixture of different file formats. Apart from the big three in web development

- HTML
- CSS
- Javascript

There are also more files with extensions:

- Yaml (.yml)
- Markdown (.md)
- Gemfile *(no extension)*

Not forgetting that it also supports

- Json (.json)
- CSV (.csv)

### Jekyll step by step tutorial

The [Jekyll step by step tutorial](https://jekyllrb.com/docs/step-by-step/01-setup/) is okay for people learning who already have some programming experience. Perhaps with a similar stack in web development. However I would not recommend it for absolute beginners who have never coded before.
The step-by-step tutorial covers:

1. Setup
2. Liquid (Jekyll's templating language)
3. Front Matter
4. Layouts
5. Includes
6. Data Files
7. Assets
8. Blogging
9. Collections
10. Deployment

The tutorial covers blogging but does not specify how to work with images (😒 what blog has no images) and other media. It is a very minimal approach to get quickly started with Jekyll. Could also benefit with screenshots of some of the steps.

### Developing locally with Jekyll

The site is served with the command:
`bundle exec jekyll serve`
I use this command with the 'livereload' flag to avoid manually reloading.
`bundle exec jekyll serve --livereload` 

The bundling of the site was pretty quick to load up a server and supports hot reloading so I didn't have to stop the server all the time.

The experience of creating posts on the fly with minimal delay makes it comparable to javascript bundlers such as [Vite](https://vitejs.dev/). 
There was some intial friction but once the teething issues are sorted it's a very enjoyable developer process. The errors thrown in the terminal when coding are also not super ambiguous and most of the time I could interpret them and fix easily.

## Deployment and errors

Then comes the deployment on Github. Deploying with the Github pages default for Jekyll apparently does not support certain versions of Jekyll or Ruby or certain gems. So the result was one build error after the other. As shown 😒:
![build errors jekyll](https://github.com/user-attachments/assets/b075fbf5-2675-463b-8aea-032cfdf2dbbd)

### Debugging Jekyll

Finally, I dug deeper on the [jekyll](https://jekyllrb.com/) website and apparently I have to use a very different workflow that involves github actions and configuring another yaml file🙄. Finally when I got that up and running, the build process for the site apparently is not in a good mood. It can randomly fail even on errors that I have already fixed ... *(apparently not)*.
Ironically this post also failed when I added it to the posts on the site.
![adding posts to site failed](https://github.com/user-attachments/assets/c1731bac-b045-4bd0-9cd6-33e3107dd21b)

*Sigh*

If you're reading this on my personal website then just know that the evil Dr Jekyll was defeated along with his henchman the build error. Hope to publish this soon🥲. 

### Edit a few moments later:

![Man surprised staring at laptop](/RDjarbeng/assets/images/man_surprised.png)

So I realized there are usually 2 builds which start and one of them usually succeeds and the other doesn't. I was using the 'jekyll-gh-pages' by before switching to just jekyll. 
![workflow in github](https://github.com/user-attachments/assets/a10a3c67-2d2b-42c9-9c87-848868aa4fb0)
So what I mean is that there were two concurrent builds; one for the recommended Jekyll build and one for the old jekyll-gh-pages as shown in the left of the screenshot. The build errors I was seeing were from that jekyll-gh-pages workflow which should have been disabled. Apparently Github does not disable it automatically when you create a new workflow even though they did that for the pages-build-deployment when I moved to Jekyll. Simple solution was to manually disable the jekyll-gh-pages workflow.

Lesson learnt. Double check assumptions next time and stop blaming Dr Jekyll🙂 wohoo!

![image](https://github.com/user-attachments/assets/43728fc2-7195-44c7-9f81-4b06920948a9)
