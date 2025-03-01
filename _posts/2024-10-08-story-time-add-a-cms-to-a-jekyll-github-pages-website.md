---
title: Escaping CMS hell-DecapCMS, Netlify and Sveltia
date: 2024-10-08T23:01:00
author: Richard
image: /assets/images/static_site.jpeg
video: ""
layout: post
categories: ["Software Engineering"]
tags: [CMS, DecapCMS, Sveltia, Netlify, Software engineering, web development]
---
# Add a CMS to a jekyll GitHub-pages website
Story time: When I created this website I used to create and edit the posts in visual studio code directly with the markdown. This was a bit slow and I had to name each file myself, then add the date to the file name. This gave me more tasks to do with every new post and became a chore. Also I had to make sure the assets such as images matched the file name given in the asset folder. So many things to check ✅ before I finally published a post. As you can imagine this chore did not give me much excitement whenever I had to add a new post.

What could I do to remove these mundane tasks anytime I create a post? Well I know, I could use a Content Management System (CMS) to avoid all this pain of creating files. Or so I thought.

## CMS- First steps

I made an extensive search (quick google query) for a suitable CMS with Jekyll support. Then came along DecapCMS, a spin-off from an old acquaintance Netlify. They claimed to be completely different from Netlify-CMS and didn't require hosting the site on Netlify to use. Oh boy this seems great. Or so I thought.

### DecapCMS

Alright, let's get DecapCMS up and running. Hold on, I can't complete some of the steps without a Netlify account. I should have guessed using DecapCMS would be a pain when the documentation kept on referencing Netlify even though they claimed to be completely independent. After an eternity trying to comprehend the documentation and trying my best to avoid hosting the site on Netlify I got something working:

![DecapCMS admin page ](/RDjarbeng/assets/images/cms_post/decap_failure.png)

Or so I thought.

### DecapCMS - the pain 

![DecapCMS admin page failure ](/RDjarbeng/assets/images/cms_post/decap_failure_white.png)

Turns out something was broken. And it wasn't my fault. A little searching on the DecapCMS site (*about 7 browser tabs open now*) showed some integration with Netlify hosting, namely Netlify identity which just wasn't going to work without a Netlify site. At this point I had spent a lot of time getting this CMS to work and probably should have given up here. This is where I fell victim to the Sunk-Cost fallacy and kept on trying to get DecapCMS to work. After many hours I created an issue on the [Decap CMS GitHub](https://github.com/decaporg/decap-cms/issues/7280).

Then after a considerable time-one or two days later- when I didn't get a response I asked the question on [stackoverflow](https://stackoverflow.com/questions/79009410/can-i-use-decap-cms-on-github-pages-without-hosting-the-site-on-netlify). And then I waited for someone to provide a suitable answer. Or so I thought.

### DecapCMS- more pain

One contributor for DecapCMS noticed my issue. Finally. Whew. Left a comment then closed my issue on GitHub-DecapCMS a week after opening and basically left it unsolved. How rude!

![DecapCMS github discussion failure ](/RDjarbeng/assets/images/cms_post/decap_cms_github1.png)

Of course I wasn't going to let this go unchallenged. So I replied with my valid reasons why this was an important issue.

![DecapCMS github discussion failure ](/RDjarbeng/assets/images/cms_post/decap_cms_github2.png)

So I got no response to that and the issue remained closed. Or so I thought.

A 'Member' at DecapCMS saw my issue and reeopened it. Then he transferred it over to the DecapCMS repository as a documentation issue. Even better he asked for suggested improvements. Chef's kiss

![DecapCMS github discussion success ](/RDjarbeng/assets/images/cms_post/decap_cms_github3.png)

So I gave my comments specifying how the DecapCMS documentation should be improved -'Suggested Improvements for Decap CMS Documentation'. Basically stating that the authentication workflow and the steps part that Netlify played was not very clear in the documentation.  After I posted that, I got... nothing. And so I waited. 

### DecapCMS- the wait

Eventually I gave in and hosted the site on Netlify and managed to get the CMS running now. But only on the `netlify/admin` site. Now I had 2 platforms to manage the site on Netlify and the site on GitHub pages. Well, this has become more complicated than I expected.

### DecapCMS-the exit

After a long time- *a couple of days*- I got tired of waiting for updates to this issue and began looking for alternatives. Then I found SveltiaCMS. It claimed to be a CMS like Netlify CMS but built from the ground up with Svelte, unlike DecapCMS. At this point I was pretty skeptical about any CMS for good reason. However, I couldn't just let this end like this. Sunk cost fallacy - remember!

## Hello Sveltia CMS

So I gave SveltiaCMS a try, it was apparently really easy since the getting started for SveltiaCMS assumes you'll be coming from DecapCMS-ironic. Just swapped out about 2 lines in the old code and like that I had migrated to SveltiaCMS. And best of all it already had login with GitHub already setup so it was a very smooth process.

Now even though I was no longer using DecapCMS, the problem of having 2 platforms for the site still remained. At this point I had spent more time than I had budgeted for this. But I decided to give it another try by creating an [issue](https://github.com/sveltia/sveltia-cms/issues/217#event-14547928697) on SveltiaCMS if I could have the CMS on the GitHub pages site. So here goes nothing. Or so I thought. 

### Sveltia CMS with GitHub pages

Turns out the maintainer-[Kohei Yoshino](https://github.com/kyoshino)- for this project is quite active, unlike some other CMS which shall not be named. He provided a solution that would use the GitHub-pages site only. The catch was that I had to use the their own client called [Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth). Well at this point I was too deep to turn back anyway. 

### Sveltia CMS with Sveltia CSM Authenticator

So I went down the rabbit hole, *again*, of setting up the authenticator. This took me to Cloudflare where I had to figure out IDs and API keys on the Cloudflare worker setup. As expected the Cloudflare documentation also had missing steps. Sigh!  Finally when I was done figuring out Cloudflare, the Sveltia CMS authenticator steps were actually pretty easy to follow.

Now the moment of truth. Will this work... so I push the changes, and go to the github pages site `mysite/admin` and what do I see....

It works! 

![goku super saiyan ](/RDjarbeng/assets/images/cms_post/goku_yellow_super.gif)

#### Finally

No more Netlify!. Yes! Ha! Thank you [Kohei Yoshino](https://github.com/kyoshino)!

Finally after more than 2 weeks of *painful* debugging I finally got halfway there with a CMS that deploys on GitHub pages and I don't have to be managing file names or keeping track of dates anymore.

![before_after_cms ](/RDjarbeng/assets/images/cms_post/before_after_CMS.png)

Unfortunately SveltiaCMS is not a full solution. It doesn't allow me to add images within posts by just dragging or selecting. So I still have to type the file paths to images to add them to this post. Hopefully [Kohei Yoshino](https://github.com/kyoshino) will work on this soon. **End story.**

PS: I don't know what the full meaning of OAuth is. Hope to find out soon.
