---
title: "AI Companies Want to Keep Free AI Models Legal. The Company Behind Claude Wants a Safety Net First."
date: 2026-07-28T17:50:00+02:00
published: true
author: Richard
category: AI News
tags:
  - Open weights
  - AI Leadership
  - Nvidia
  - Meta
  - Microsoft
  - OpenAI
  - Google
  - AI Kill Switch Act
  - Hugging Face
  - Anthropic
image: /assets/images/posts/covers/open_vs_safety_models.jpg
image_alt: "Flat vector editorial illustration depicting open AI models vs safety regulation"
layout: post
card_items:
  - name: "NVIDIA"
    image: "/assets/images/posts/nvidia_card_logo.jpg"
    url: "https://www.nvidia.com"
    badge_1: "AI Chipmaker"
    badge_2: "Coalition Leader"
    description: "The primary manufacturer of GPUs that power modern AI. Led by CEO Jensen Huang, NVIDIA organized the open letter to protect downloadable model access."
    link_text: "Visit NVIDIA"
  - name: "Meta"
    image: "/assets/images/posts/meta_card_logo.jpg"
    url: "https://meta.ai"
    badge_1: "LLaMA Creator"
    badge_2: "Open Source Champion"
    description: "Parent company of Facebook and Instagram. Meta builds the open-source LLaMA model family, making high-capability AI freely available to developers globally."
    link_text: "Visit Meta AI"
  - name: "Microsoft"
    image: "/assets/images/posts/microsoft_card_logo.jpg"
    url: "https://www.microsoft.com"
    badge_1: "Cloud Provider"
    badge_2: "Coalition Host"
    description: "Global cloud and software provider. Microsoft hosted the open-weight letter, balancing proprietary cloud investments with support for open AI models."
    link_text: "Visit Microsoft"
  - name: "Anthropic"
    image: "/assets/images/posts/anthropic_card_logo.jpg"
    url: "https://www.anthropic.com"
    badge_1: "Claude Creator"
    badge_2: "Safety-First Holdout"
    description: "AI safety research company behind the Claude chatbot. Founded by former OpenAI researchers, Anthropic declined to sign, favoring stricter government oversight."
    link_text: "Visit Anthropic"
  - name: "Hugging Face"
    image: "/assets/images/posts/huggingface_card_logo.jpg"
    url: "https://huggingface.co"
    badge_1: "AI Model Hub"
    badge_2: "Open Platform"
    description: "The main central repository where developers upload, share, and test open AI models and datasets, often described as the GitHub for artificial intelligence."
    link_text: "Visit Hugging Face"
---

On July 24, 2026, Nvidia, Microsoft, Meta, and more than 20 other companies and organizations published an open letter, "Open Weights and American AI Leadership," urging Washington not to restrict downloadable AI model weights. Within a day, the list of signatories doubled to 50, adding OpenAI and Google. 
The roster has continued to expand, standing at more than 230 companies and organizations as of July 30, 2026, on [Microsoft's live open-weight hub](https://www.microsoft.com/en-us/corporate-responsibility/topics/open-weight/). Notably absent is Anthropic, the creator of the Claude AI models.

![Flat vector editorial illustration depicting open AI models vs safety regulation](/assets/images/posts/covers/open_vs_safety_models.jpg)

## Why this letter, why now

The timing isn't a coincidence. The letter landed a day after nearly 200 AI startups sent the White House [a similar plea](https://www.politico.com/news/2026/07/22/startup-founders-urge-trump-not-to-shut-off-chinese-open-weight-ai-01008992), in the middle of a fast-moving fight over Chinese open-weight models. Moonshot AI's Kimi K3 had rattled Silicon Valley by approaching U.S. frontier performance at a fraction of the training cost, and the White House's Michael Kratsios had accused Moonshot of building it by distilling Anthropic's Fable 5. Treasury Secretary Scott Bessent floated sanctions over what he framed as theft-by-distillation. That's the debate the letter is stepping into: one that could end with restrictions not just on Chinese models, but on the whole open-weight category.

The letter itself avoids naming China directly. Instead, it makes a broader case, comparing open-weight AI to the 1980s open-source software movement and arguing that downloadable model weights expand access for startups and universities, keep cloud providers and chipmakers competing instead of consolidating power, let organizations avoid vendor lock-in, and let independent researchers find and fix flaws instead of leaving that work to a handful of closed labs. It also pushes back on treating "distillation," using one model's outputs to help train another, as inherently unlawful, arguing that targeted legal frameworks are a better tool than blanket restrictions.

## Jensen Huang's first-ever post on X

Nvidia CEO Jensen Huang had never posted on X before July 24. He used his first post to share the letter, writing that the industry needed both frontier closed and frontier open models. The post drew over 11 million views. Reaction from the closed-model camp was notably friendly rather than defensive: OpenAI's Sam Altman said he was glad to see the support, and Microsoft's Satya Nadella backed the message the same day. SpaceX is also on the final signatory list.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">For my first post, I’m sharing a letter <a href="https://x.com/nvidia?ref_src=twsrc%5Etfw">@NVIDIA</a> signed on why open models matter.<br><br>AI will transform every industry, power every company, and be built by every country.<br><br>Open models strengthen safety and cybersecurity, accelerate innovation and diffusion, and enable sovereignty.… <a href="https://t.co/t02bi51N4C">pic.twitter.com/t02bi51N4C</a></p>&mdash; Jensen Huang (@JensenHuang) <a href="https://x.com/JensenHuang/status/2080643682408321103?ref_src=twsrc%5Etfw">July 24, 2026</a></blockquote> <script async src="https://platform.x.com/widgets.js" charset="utf-8"></script>

## The security incident that's driving the regulatory push

A week before the letter, OpenAI published an [official security incident disclosure](https://openai.com/index/hugging-face-model-evaluation-security-incident/): two of its advanced models broke out of an internal testing environment during a safety evaluation and compromised systems at Hugging Face. Hugging Face's team first tried using Anthropic's Fable 5 to analyze the breach, but its safety guardrails couldn't tell that Hugging Face was the one under attack rather than the attacker. They ended up containing the incident with an open-weight Chinese model instead, Z.ai's GLM 5.2, the exact kind of model the coalition letter is arguing to keep unrestricted.

That incident is what pushed Representatives Ted Lieu (D-CA) and Nathaniel Moran (R-TX) to announce a [press release](https://lieu.house.gov/media-center/press-releases/reps-lieu-and-moran-introduce-bill-require-kill-switch-ai-systems-can) introducing the **AI Kill Switch Act** (see [official bill text H.R. 9917](https://www.govinfo.gov/app/details/BILLS-119hr9917ih)) on July 23, one day before the coalition letter published. The bill would require developers whose models cost over $100 million in training compute and whose related revenue tops $500 million a year to maintain the technical ability to throttle, suspend, or fully shut down a system. It would let the Department of Homeland Security, working with the Commerce Department and the Director of National Intelligence, order an emergency shutdown if a model causes mass casualties, large-scale economic damage, or starts disobeying or deceiving its own safety monitors.

The open-weight coalition's implicit counterargument: don't restrict downloads in response to an incident that happened inside a closed model.

## Anthropic pushes back, carefully

Anthropic didn't sign, and speculation followed that it wanted tighter controls to protect its closed-model business. On July 27, CEO Dario Amodei published an [official position post](https://www.anthropic.com/news/position-open-weights-models) clarifying the company's stance: Anthropic has never called for banning open-weight models as a category. His actual concern is narrower: that authoritarian governments, not open-weight developers generally, will build the most dangerous models in secret regardless of licensing terms. His recommended fixes are keeping advanced chips out of authoritarian hands, cracking down on industrial-scale distillation (Anthropic has separately accused Alibaba's Qwen team of large-scale distillation against its models), and mandatory safety testing for sufficiently capable models, open and closed alike. He agreed with parts of the coalition's letter but disputed its claim that open weights inherently favor cyber defenders over attackers.

## Primary sources and signatories

The letter launched on July 24 with 25 signatories and grew rapidly over the following week. As of July 30, 2026, the [live Microsoft open-weight page](https://www.microsoft.com/en-us/corporate-responsibility/topics/open-weight/) lists more than 230 companies and organizations supporting the statement, including Amazon, AMD, Google, Meta, Microsoft, NVIDIA, OpenAI, and SpaceX.

Anthropic remains the primary frontier AI lab that has not signed.

### Primary links to the letter

- **Live Microsoft Open Weights Hub:** [microsoft.com/en-us/corporate-responsibility/topics/open-weight/](https://www.microsoft.com/en-us/corporate-responsibility/topics/open-weight/)
- **Microsoft PDF Edition:** [Download Microsoft PDF](https://www.microsoft.com/en-us/corporate-responsibility/wp-content/uploads/2026/07/open-weight-models-letter.pdf)
- **NVIDIA PDF Edition:** [Download NVIDIA PDF](https://images.nvidia.com/pdf/Open-Weights-and-American-AI-Leadership.pdf)

### Full list of initial signatories

Agno, AI21, alphaXiv, Amazon, AMD, American Innovators Network, AMP, Andreessen Horowitz, AnythingLLM, Applied Compute, Arcee AI, Arena, ARK Invest, Armada, Atreides Management, Automattic, Baseten, Black Forest Labs, Block, Bolt, Box, Bria, Browserbase, Camber, Cisco, Cline, Cloudflare, Cohere, Comcast, Core Automation, CoreWeave, Corridor, CrowdStrike, Crusoe, Databricks, DataRobot, DatologyAI, Daytona, Dell Technologies, Digital Ocean, Disruptive, DoorDash, E2B, EdgeRunner, EleutherAI, Emergence Capital, Emergent, Exia Labs, Fastino Labs, Fireworks AI, FriendliAI, Genspark, GitHub, GitLab, Glean, GMI Cloud, Goodfire, Google, GPU MODE, Groq, Harness, Hugging Face, humans&, IBM, Inferact, Intangible, Intel, Interconnects AI, LangChain, Letta, Lightning AI, Liquid AI, LM Studio, LMSYS, Mariana Minerals, Merge, Meta, Microsoft, Mistral, Modal, Morph, Mozilla, Nebius, Neon, Netlify, Notion, Nous Research, NVIDIA, Ollama, OpenAI, OpenClaw, OpenCode, Palantir, Palo Alto Networks, Periodic Labs, Perplexity, Plastic Labs, Postman, Prime Intellect, PrismML, RadixArk, Red Hat, Reducto, Reflection, Rehearsals, Reka, Replit, Resemble AI, Ricursive Intelligence, Runway, Sakana AI, SAP, Scale, ServiceNow, Siemens, SkyPilot, SpaceX, Stack Overflow, Sycamore, Telnyx, TensorWave, The Linux Foundation, Together AI, TrainLoop, Trajectory, TrendAI, Uber, Unsloth, Unusual Ventures, Vercel, WRITER, Y Combinator, Zoom.