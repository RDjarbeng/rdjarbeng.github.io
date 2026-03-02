---
date: 2026-03-02T13:23:00
published: true
author: Richard
category: AI News
tags:
  - Google
  - Antigravity
  - OpenClaw
title: Google Bans Hundreds of Paying Antigravity Users for Using OpenClaw - Then Says "We Heard You"
image: '/assets/images/google_bans_antigravity_v2.png'
image_alt: 'Illustration of a structural gate blocking a claw with text The OpenClaw Ban Wave'
layout: post
card_items:
  - name: "OpenClaw Framework"
    description: "The viral open-source AI agent framework that led to the Antigravity ban wave."
    badge_1: "Open Source"
    badge_2: "Agent Framework"
    url: "https://github.com/openclaw/openclaw"
    link_text: "View on GitHub"
  - name: "Google Antigravity"
    description: "Google's agentic development platform powered by Gemini models."
    badge_1: "Official IDE"
    badge_2: "AI Platform"
    url: "https://antigravity.google.com"
    link_text: "Visit Platform"
---

The Google Antigravity OpenClaw controversy erupted in mid-February 2026, when numerous users of Google's agentic development platform **Antigravity** (powered by Gemini models) suddenly found their accounts restricted or banned. The trigger: integration with **OpenClaw**, the viral open-source AI agent framework that exploded in popularity late 2025.

![The OpenClaw Ban Wave](/assets/images/google_bans_antigravity_v2.png)

### What Happened: The Ban Wave
Around February 12–14, 2026, reports flooded forums like the Google AI Developers Forum, Reddit, and X. Paid subscribers, including those on the pricey **AI Ultra** plan ($250/month), lost access without warning, no prior notice, and initially no clear appeals process. Google cited "malicious usage" and backend overload from automated/agentic patterns routed through third-party tools via OAuth credentials.

Many affected users weren't intentionally abusing quotas; they used OpenClaw to power advanced workflows (e.g., agent chains, automated coding tasks) that leveraged Antigravity's flat-rate access instead of metered APIs. This created massive token consumption spikes, degrading service for standard users and straining Google's infrastructure.

The **official response** came on February 27, 2026, from the @antigravity account:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">To the builders: we heard you. We&#39;re welcoming back everyone who recently had their Google Antigravity accounts restricted for use of third-party tools. Moving forward, we’ll have clear steps for users to restore  their account if it’s restricted.<br><br>To maintain the integrity of…</p>&mdash; Google Antigravity (@antigravity) <a href="https://twitter.com/antigravity/status/2027435365275967591?ref_src=twsrc%5Etfw">February 27, 2026</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

This post confirmed:
- Mass restoration for those restricted.
- A promised future restoration process (though with limited capacity mentioned in related coverage).
- Strict enforcement: third-party tool use via Antigravity login stays prohibited under ToS (likely under clauses banning credential sharing, unauthorized product powering, or resource abuse).

### OpenClaw Founder's Reaction and Support Removal
OpenClaw's creator, **Peter Steinberger** (@steipete), was vocal and critical. He called Google's approach "pretty draconian" in posts around February 23, 2026, contrasting it with more communicative providers like Anthropic:

> Pretty draconian from Google. Be careful out there if you use Antigravity. I guess I'll remove support (from OpenClaw). Even Anthropic pings me and is nice about issues. Google just… bans?  
> 
> - Peter Steinberger (paraphrased and quoted across sources including [The Register](https://www.theregister.com/), [MLQ.ai](https://www.mlq.ai/), and others)

He followed through: **OpenClaw removed Antigravity support** in updates around late February 2026. Community reports and coverage confirm the OAuth bridge was moved to a bundled (disabled-by-default) plugin, and official docs no longer list Google Antigravity as a supported provider. Users updating to versions like 2026.2.23 found the integration gone or requiring manual re-enablement that was discouraged.

This move came amid irony - Steinberger had recently joined **OpenAI** (announced mid-February 2026) to lead next-gen personal agents, with OpenClaw continuing as an open-source project under OpenAI support.

### Timeline Summary
- **Early–mid February 2026**: Surge in OpenClaw + Antigravity usage → backend strain.
- **Feb 12–14**: Mass restrictions begin; complaints spike on forums/Reddit/X.
- **Feb 15**: OpenAI hires Steinberger.
- **Feb 23**: Steinberger publicly criticizes Google as "draconian" and announces intent to drop support.
- **Late Feb**: OpenClaw updates remove/disable Antigravity integration.
- **Feb 27**: Google @antigravity announces restorations and reaffirms policy.

### The Way Forward for Antigravity Users
1. **Stick to official channels** - Use the native Antigravity IDE, Gemini CLI (where permitted), and avoid third-party OAuth routing to prevent restrictions.
2. **If restricted** - Follow the upcoming restoration steps outlined by Google (check @antigravity or discuss.ai.google.dev for updates).
3. **Alternatives for agentic/power users**:
   - Local/open models (e.g., Gemma, Qwen on hardware).
   - Providers with clearer agent-friendly rules (MiniMax, Anthropic with direct APIs).
   - Self-hosted agents or metered API usage to avoid flat-rate credential risks.
4. **Broader lesson** - Flat-rate AI access + open agent tools create inevitable tension. Expect more providers to tighten ToS, add explicit prohibitions, or launch dedicated agent APIs.

The incident highlights growing pains in agentic AI: innovation thrives on openness, but scale demands guardrails. Google's reversal shows they listen to backlash - but the firm line on third-party tools signals the "wild west" era may be closing.

Sources: Official [@antigravity announcement](https://x.com/antigravity/status/2027435365275967591), coverage from [The Register](https://www.theregister.com/), [MLQ.ai](https://www.mlq.ai/), [PCWorld](https://www.pcworld.com/article/3068842/whats-behind-the-openclaw-ban-wave.html), Google AI forum threads, and OpenClaw GitHub/community updates.
