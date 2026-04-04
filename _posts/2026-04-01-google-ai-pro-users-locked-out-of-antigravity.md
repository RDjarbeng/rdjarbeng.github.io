---
date: 2026-04-01T17:41:00+02:00
published: true
author: Richard
category: AI News
tags:
  - AI
  - Antigravity
title: Many Google AI Pro Users Are Locked Out of Antigravity IDE (And is the Bug Reporter Broken?)
image: /assets/images/posts/covers/antigravity_lockout.jpg
image_alt: 'Cover image showing an AI user locked out of the Antigravity IDE'
layout: post
card_items:
  - name: Antigravity
    description: An agent-first, AI-native IDE from Google that features autonomous browser subagents and advanced coding agents for an agentic development experience.
    url: https://antigravity.google
    link_text: Visit Antigravity
    badge_1: Agent-First
    badge_2: Google
  - name: Claude Code
    description: Anthropic's command-line interface for AI-native coding, offering a powerful alternative to integrated IDE agents.
    url: https://www.anthropic.com/news/claude-code-cli-agent
    link_text: Visit Claude Code
    badge_1: CLI Agent
  - name: Cline
    description: An open-source AI assistant that can use your CLI and editor, providing a flexible and transparent coding experience.
    url: https://github.com/cline/cline
    link_text: Visit Cline
    badge_1: Open Source
  - name: Aider
    description: A popular command-line chat tool that lets you write code with AI, known for its efficiency and strong editing capabilities.
    url: https://aider.chat/
    link_text: Visit Aider
    badge_1: Popular
---



Google advertised AI coding with **5-hour reset limits**, but those who signed up for the AI Pro plan have been met with a reality that starkly contradicts those promises.

Instead of a quick reset, some users are facing lockouts upwards of **120 hours** (and in some cases, a full 7 days). Because the AI Pro plan was positioned as the sweet spot between the free tier and the Ultra plan, many users expected to supercharge their workflows, perhaps upgrading to Ultra later if the benefits were clear. 

![Cover image for post titled Many Google AI Pro Users Are Locked Out of Antigravity IDE](/assets/images/posts/covers/antigravity_lockout.jpg "Many Google AI Pro Users Are Locked Out of Antigravity IDE")

Now, Google's suggestion to resolve the issue is to move up to the **$200 AI Ultra plan**, a move considered by many to be a slap in the face. Unsurprisingly, users are hesitant to upgrade. Instead, many are weighing whether to downgrade back to the free tier or cancel their monthly and yearly subscriptions entirely.

One disgruntled user on the Google Dev forums put it bluntly:

> "I no longer use those Antigravity agents, only my Claude subscription. I do not want to feel like I am having a stroke every day because of unfair terms and the complete lack of communication." 
> ([google.dev user](https://discuss.ai.google.dev/t/google-ai-pro-subscription-antigravity-quota-not-working-as-advertised-10-day-lockout-instead-of-5-hour-reset/118505/682?u=rdjarbeng))

Included below is a screenshot of the Antigravity model console for an AI Pro user, showing the exorbitant wait time for the usage limits to reset:

![Screenshot of the Antigravity console showing usage limits](/assets/images/20260401-174233.png "Antigravity usage limits")

## The Irony of the IDE Bug

To compound users' frustrations, the IDE has an internal issue-reporting feature designed to capture logs and send feedback. Naturally, users attempted to use this to report the lockouts, only to find that the issue submission tool itself is broken. The irony is palpable.

![Screenshot of the antigravity issue submission error, saying an error occured while submitting your feedback please try again](/assets/images/20260401-175048.png "Antigravity bug reporter error")

## Will Upgrading Save You?

If you're thinking about biting the bullet and upgrading to the highest tier, think again. According to current AI Ultra subscribers, the $200 price tag might not solve your woes either. 

> "I’m an Ultra subscriber, do not upgrade bro. Right now it’s the same situation with quota. No support, no announcements, just silent quota cut off."
> ([@YND](https://discuss.ai.google.dev/t/google-ai-pro-subscription-antigravity-quota-not-working-as-advertised-10-day-lockout-instead-of-5-hour-reset/118505/685))

## Alternatives to Antigravity

We can't let you go without providing a few working alternatives. If you are looking to jump ship, consider these tools:
* **Claude Code** (Anthropic)
* **OpenAI Codex**
* **Open-Source Tools:** Cline, Aider, and Continue.dev

---

## References

How long has this been going on? About three months. And yes, we brought receipts:

* **The Original Thread:** An open issue from January 25, 2026, with over 639 replies and 26.5k views. [Read on discuss.ai.google.dev](https://discuss.ai.google.dev/t/google-ai-pro-subscription-antigravity-quota-not-working-as-advertised-10-day-lockout-instead-of-5-hour-reset/118505/686)
* **The Active Issue:** A recent thread confirming the 6-day lockout bug is still very much active for Pro subscribers. [Read on discuss.ai.google.dev](https://discuss.ai.google.dev/t/bug-antigravity-ide-critical-quota-error-6-day-lockout-for-google-ai-pro-subscriber/122780/8)

*P.S. The writer is fully aware of the irony that this post was formatted using Gemini 3.1 Pro from Google.*
