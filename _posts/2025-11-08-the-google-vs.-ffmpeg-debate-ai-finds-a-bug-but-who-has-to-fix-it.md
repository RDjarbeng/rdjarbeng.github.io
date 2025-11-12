---
date: 2025-11-08T15:52:00
published: true
author: Richard
categories:
  - Security
tags:
  - Google
  - FFmpeg
  - Open Source
  - AI
  - Cybersecurity
  - Google Project Zero
  - Big Sleep AI
  - Vulnerability Reporting
  - Responsible Disclosure
  - Open Source Maintainers
  - Software Development
  - Tech Dispute
  - Google vs FFmpeg
  - Bug Fixing
  - Volunteer Developers
  - Corporate Responsibility
  - AI Ethics
title: 'The Google vs. FFmpeg Debate: AI Finds a Bug, But Who Has to Fix It?'
image: /assets/images/google_vs_ffmpeg_cover.webp
layout: post
---
In the vast world of software, a recent conflict has flared up between Google's elite security team and the volunteer maintainers of FFmpeg, a project that powers countless apps you use every day. This isn't just a technical squabble; it's a story about AI, corporate responsibility, and the foundations of the open-source world.

What happens when a trillion-dollar company uses advanced AI to find flaws in software run by volunteers? And who is responsible for fixing the mess? Let's break down what happened.

![A vertical poster illustrating the Google vs. FFmpeg debate using a "David vs. Goliath" meme. A giant, menacing robot labeled "GOOGLE" holds an AI-themed magnifying glass and says, "I found bugs! You fix." Below, a small, heroic figure labeled "FFMPEG" stands on a cliff and replies, "But... who pays for it?" The text "GOOGLE VS FFMPEG" is in the center, with "rdjarbeng.com" at the bottom.](/assets/images/google_vs_ffmpeg_cover.webp "An illustration of the Google and FFmpeg AI bug dispute")

## What is FFmpeg, and Why Does It Matter?

First, some quick context. **FFmpeg** is a free, open-source software library that is the backbone of digital media.

Think of it as a universal translator for video and audio. If you've ever:

* Watched a video on YouTube or TikTok
* Used a media player like VLC
* Streamed a video in the Chrome browser

...you have used FFmpeg. It's the essential, invisible plumbing that makes digital media work. Google itself has relied on FFmpeg for over a decade to power core parts of YouTube and Android. You can learn more at the [official FFmpeg documentation](https://ffmpeg.org/documentation.html).

## The Open-Source "Bargain"

This brings us to the core tension. FFmpeg is "open-source," meaning its code is public and built by a community. Like many critical open-source projects, it's maintained primarily by unpaid volunteers who work on it in their spare time.

This creates a paradox:

* **For companies like Google,** FFmpeg is invaluable, free infrastructure.
* **For the maintainers,** it's a passion project that happens to be used by billions of people.

This model works, until it doesn't. Past crises like the [2014 Heartbleed bug](https://www.youtube.com/watch?v=drEBLidpsIM) (which broke security across the internet) showed how thin the volunteer-run foundation can be. This new dispute brings that tension back into the spotlight.

-----

## The Spark: Google's AI Finds a "Big Sleep" of Bugs

The dispute ignited in July 2025, when Google's **Project Zero** (their team of elite bug hunters) announced a new "Reporting Transparency" policy. In short, they would publicly announce the _existence_ of a bug just one week after finding it, though they'd keep the technical details private for 90 days to give maintainers time to create a fix.

Then, in August 2025, Google unveiled **"Big Sleep,"** an AI tool that autonomously hunts for vulnerabilities. Big Sleep immediately found about 20 issues across several projects, including FFmpeg.

### What's the Big Deal About These Bugs?

The AI found serious flaws, like "buffer overflows" and "use-after-free" errors.

**For the non-tech reader:** These are not minor typos. They are the kinds of bugs that, in the worst case, could allow an attacker to crash an application or even run malicious code on someone's computer.

Google's AI had, in effect, pointed out several security risks in this critical piece of internet infrastructure. They reported them, as detailed on [Google's issue tracker](https://issuetracker.google.com/issues/440183164), and the 90-day clock started ticking.

-----

## The Debate: Two Sides of the Story

This is where the conflict exploded.

### ➡️ Google's Perspective: "We're Helping Secure the Internet"

Google frames its actions as responsible disclosure. Their argument, laid out in a [Project Zero blog post](https://googleprojectzero.blogspot.com/2025/07/reporting-transparency.html), is:

* **Transparency is good.** Publicly disclosing (but not detailing) bugs motivates everyone to patch faster, making users safer.
* **Bugs are bugs.** These vulnerabilities exist whether an AI finds them or a malicious hacker does. It's better that Google finds them first.
* **They contribute.** Google offers a [Patch Rewards program](https://bughunters.google.com/open-source-security/patch-rewards) (up to $15,000 for FFmpeg) and has provided bug-finding tools like OSS-Fuzz to the project for free.

### ⬅️ FFmpeg's Rebuttal: "You Broke It, You Buy It"

The volunteer maintainers of FFmpeg had a sharply different view. In their main [X post](https://x.com/FFmpeg/status/1984178359354483058) on the subject, they laid out their core argument:

> "We take security very seriously but at the same time is it really fair that trillion dollar corporations run AI to find security issues on people's hobby code? Then expect volunteers to fix."

This kicked off a firestorm. As the FFmpeg account on X faced heated comments, it **repeatedly hammered home the point that the project is maintained by volunteers,** not a paid staff.

This sentiment, that Google should provide _fixes_ (patches) and not just _reports_, became the rallying cry for their side of the argument.

### 📣 The Community Weighs In

The tech community was instantly divided.

* Security expert **Katie Moussouris** argued Google should go one step further and use its AI tools to _propose fixes_, not just find problems ([post](https://x.com/k8em0/status/1986428627073093808)).
* Others, like **Dino Dai Zovi**, noted that Google's bug reports didn't even mention their own bounty program, which felt like a missed opportunity. 

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">It looks like there is a $15k bounty out for an accepted PR that fixes the vulnerability identified by Big Sleep in <a href="https://twitter.com/FFmpeg?ref_src=twsrc%5Etfw">@FFmpeg</a>:<a href="https://t.co/C3v0sikr26">https://t.co/C3v0sikr26</a><br><br>I certainly didn't remember that this program existed, would be a different vibe to mention it in the bug report sent to project… <a href="https://t.co/UetMYTg0xj">https://t.co/UetMYTg0xj</a> <a href="https://t.co/YTwnUa1QWP">pic.twitter.com/YTwnUa1QWP</a></p>&mdash; Dino A. Dai Zovi (@dinodaizovi) <a href="https://twitter.com/dinodaizovi/status/1986097829077553339?ref_src=twsrc%5Etfw">November 5, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Side note: If you want more information about bug bounties and the rewards involved from finding bugs for companies, this post should give you a good start. [What on earth is a bug bounty?](https://rdjarbeng.com/what-is-hackerone-and-their-bug-bounty-program/)

* Some critics called it a "perverse incentive" ([post](https://x.com/roddux/status/1978889021431406786)).
* Broader takes, like this one on [PiunikaWeb](https://piunikaweb.com/2025/11/06/google-vs-ffmpeg-open-source-big-sleep-ai-bugs-and-who-must-fix-them/), framed it as corporations "privatizing the gains while socializing the risks" of open source.

-----

## Status as of November 11, 2025: Patches Land, Tensions Linger

So, what happened? The good news is that the immediate danger is over. By November 8, all the vulnerabilities Google's AI found had been patched by the FFmpeg team and others.

The bad news? The philosophical fight is far from over.

There has been no formal resolution. Google's policy trial continues, and the open-source community remains divided. The relationship between the world's biggest companies and the volunteers they depend on is as fragile as ever.

-----

## Final Thoughts: Who Owes What to Whom?

This clash between Google and FFmpeg reveals the fragile heart of our modern digital world. AI is getting incredibly good at finding problems, but we haven't figured out who is responsible for solving them.

It leaves us with critical questions for the future of software:

* Is finding a bug a "gift" to a project, or is it an unfunded mandate?
* Do corporations that profit from open-source owe volunteers their time, their money, or just a "thank you"?
* As AI tools get even more powerful, will they "shift-left" security and make us all safer, or will they simply burn out the human volunteers who keep the internet running?

What do you think?

Ending this post with a message from FFmpeg on X/Twitter:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">We would like to thank everyone who sent messages of support to FFmpeg this week!</p>&mdash; FFmpeg (@FFmpeg) <a href="https://twitter.com/FFmpeg/status/1986891772622999663?ref_src=twsrc%5Etfw">November 7, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

-----

_Sources: Insights drawn from Google Project Zero announcements, FFmpeg communications, and community discussions as of November 8, 2025._

_If you're a developer, consider contributing to [FFmpeg's tracker](https://trac.ffmpeg.org/) or supporting them via [sponsors](https://ffmpeg.org/donations.html)._
