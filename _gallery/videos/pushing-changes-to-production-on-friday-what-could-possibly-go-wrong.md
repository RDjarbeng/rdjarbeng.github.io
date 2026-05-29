---
title: Pushing Changes to  Production on Friday- What Could Possibly Go Wrong
date: 2026-02-07T19:44:00+02:00
platform: youtube
youtube_id: https://www.youtube.com/watch?v=WlBsKo-RMH4
embed_code: ''
thumbnail: /assets/images/videos/pushing_to_prod_cover.png
type: video
genre: Entertainment
category: videos
---

Every senior software engineer knows the golden rule of IT: never, under any circumstances, push new changes to the production environment on a Friday afternoon! Yet, in this hilarious and highly relatable tech comedy video, we explore exactly what happens when that sacred rule is boldly ignored. "What could possibly go wrong?" As it turns out, absolutely everything!

## What's happening here: Software deploy explanation

I have some code that runs when I'm deploying a project. This code is known as a workflow. It performs a series of steps to get my project files on GitHub (a place I store code) up and running.  When it's running,we can see the progress of each step in the GitHub Actions workflow, so if the workflow fails during some tests we know that the code is broken, and therefore we don't want to deploy it to our server. This usually means more time will be spent debugging the code we wrote to see what went wrong. This can take a substantial amount of time and so it's better not to make any such actions when you plan on leaving the office early.

If the workflow is successful, we're going to see a big green checkmark ✅telling us that everything is working within our code base.

## The humor & excitement

The excitement in this video stems from a deeply shared, universal anxiety among software developers and DevOps teams. The premise is simple: you make a "minor" update right before the weekend begins, assuming it will deploy smoothly without requiring monitoring. Suddenly, critical errors start logging, the server crashes, and what was supposed to be a relaxing weekend turns into a frantic, sleepless night in the office trying to desperately revert the repository.

Relatable tech content like this resonates massively within the programming community because it highlights the chaotic reality of software deployment. "Everyone says not to push changes on a Friday? What are they so afraid of?" the caption jokingly asks, perfectly capturing the naive confidence that inevitably precedes a massive system failure. "But that has never stopped me. 🙂" 

If you work in tech, coding, or IT management, this short video will either make you laugh out loud or trigger your deployment PTSD. 

The video

The video shows leeds united team players and fans watching a goal about to happen. On this overlay there's a github actions workflow that has triggered a build and deploy pipeline. The first step is the build and the crowd holds their breath, it completes successfully ✅, then there's the moment of truth the deploy...

✅

And the crowd goes wild!
