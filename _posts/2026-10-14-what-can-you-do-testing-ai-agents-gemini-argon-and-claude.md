---
date: 2026-10-14T10:08:00+02:00
published: true
author: Richard
tags:
  - AI
  - gemini
  - claude
  - agents
  - benchmarks
title: What can you do? Testing AI Agents, Gemini Argon and Claude
image: /assets/images/posts/covers/ai_agents_benchmark_cover.jpg
image_alt: Flat vector illustration of two AI robots sitting at desks taking an exam while Richard grades their responses
layout: post
card_items:
  - name: Gemini 4 Argon
    badge_1: Google
    badge_2: LLM
    description: Google DeepMind's flagship model at the time of this post. Supports text, images, audio, video, and code as inputs, with live Google Search integration and an extended context window on the Paid tier.
    url: https://deepmind.google/technologies/gemini/
    link_text: Learn More
  - name: Claude Sonnet 5.5
    badge_1: Anthropic
    badge_2: LLM
    description: Anthropic's mid-tier model available on the web. Accepts text, images, PDFs, and uploaded files. Can generate downloadable files (Word, Excel, PowerPoint, PDF), host small web apps, and produce inline SVG diagrams.
    url: https://www.anthropic.com/claude
    link_text: Learn More
  - name: Grok 4.5
    badge_1: xAI
    badge_2: LLM
    description: xAI's flagship conversational model. Supports image generation, live web search, X platform retrieval, sandboxed code execution, and direct document generation.
    url: https://x.ai/
    link_text: Learn More
  - name: ChatGPT (GPT-4o)
    badge_1: OpenAI
    badge_2: LLM
    description: OpenAI's flagship conversational model with Advanced Data Analysis, sandboxed Python code execution, web browsing, image interpretation, and canvas capabilities.
    url: https://chatgpt.com/
    link_text: Learn More
  - name: AI Agent Benchmark Prompt
    badge_1: Tool
    badge_2: Open Source
    description: A standardized, multi-dimensional prompt designed to quickly evaluate and audit new AI agents, LLMs, coding assistants, and autonomous systems across six categories including inputs/outputs, internet access, strengths, weaknesses, misconceptions, and hidden complexity.
    url: https://github.com/RDjarbeng/testing-agent-capabilities
    link_text: View on GitHub
category: "AI"
---

I have a benchmark prompt that I use to evaluate AI agent capabilities.

![Flat vector illustration of two AI robots sitting at desks taking an exam while Richard grades their responses](/assets/images/posts/covers/ai_agents_benchmark_cover.jpg)

The GitHub repository for the benchmark prompt is [here](https://github.com/RDjarbeng/testing-agent-capabilities).

Every time a new model or agent drops, the same problem comes up: the marketing page says one thing, the actual behavior says another, and figuring out the gap costs hours of poking around. I wrote a short prompt asking six specific questions covering inputs and outputs, live internet access, core strengths, admitted weaknesses, common misconceptions, and hidden capabilities. It provides a usable operational snapshot in about thirty seconds.

Asking an agent to evaluate itself is not foolproof. Models tend to undersell some capabilities and oversell others. Still, getting the model's own account of its operational boundaries provides an explicit baseline to cross-check against actual behavior.

Here is the standardized prompt:

```
Give me a quick capability overview:

1. Inputs/outputs: What formats can you take in and produce (text, files, images, audio, code, etc.)?
2. Internet access: Can you browse or search live, and what are the limits (blocked sites, rate limits, no real-time data, etc.)?
3. Strengths: What tasks do you handle best?
4. Weaknesses: What tasks are you noticeably worse at, or should I avoid relying on you for?
5. Common misconceptions: What do people typically assume you can do that you actually can't?
6. Hidden complexity: What's something you could build or do fairly easily that most people would assume is way harder than it is?

Keep it concrete. I'd rather have specific examples than general claims.
```

I ran this prompt across four leading models: **Gemini 4 Argon** (Google, Paid tier), **Claude Sonnet 5.5** (Anthropic, Web), **Grok 4.5** (xAI, Web and Sandbox), and **ChatGPT** (OpenAI, Web with Tools).

## Model Capability Comparison

Here is how the four models compare across each core dimension of the benchmark prompt:

<div class="table-wrapper">
<table class="table-wrap">
  <thead>
    <tr>
      <th>Model</th>
      <th>Inputs &amp; Modalities</th>
      <th>Outputs &amp; Deliverables</th>
      <th>Live Internet Access</th>
      <th>Primary Stated Strengths</th>
      <th>Admitted Weaknesses</th>
      <th>Standout Hidden Capability</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Gemini 4 Argon</strong><br><small>(Google, Paid Tier)</small></td>
      <td>Text, Codebases, PDFs, CSV/XLSX, Images, Audio, Video, Extended Context.</td>
      <td>Markdown, LaTeX, Source Code, Structured Data (JSON/YAML/SQL). No direct binary downloads.</td>
      <td>Live Google Search integration. Retrieves snippets/index; misses heavy JS-rendered body content.</td>
      <td>Cross-stack architecture, PyTorch debugging, whiteboard-to-Terraform translation, dense PDF synthesis, custom Gems.</td>
      <td>Niche/brand-new unindexed libraries, token-level manual counting/math, live rendered CSS pixel alignment.</td>
      <td>Zero-dependency interactive simulations (double pendulum, $$A^*$$ pathfinding), custom Python AST visitors, undocumented API schema inference.</td>
    </tr>
    <tr>
      <td><strong>Claude Sonnet 5.5</strong><br><small>(Anthropic, Web)</small></td>
      <td>Text, Images, PDFs, Code, Office files (.docx, .xlsx, .csv). No audio or video.</td>
      <td>Code, direct Office files (.docx, .pptx, formula-backed .xlsx), hosted HTML web apps, inline SVG diagrams.</td>
      <td>Live search and page fetching. Knowledge cutoff June 2026. Sandbox restricted to package managers and GitHub.</td>
      <td>Writing and multi-tone editing, code refactoring and bug fixing, document and spreadsheet data pipelines, structured decision memos.</td>
      <td>Mental multi-step arithmetic, character/word count drift, obscure factual citations, long-horizon multi-step drift.</td>
      <td>One-shot hosted interactive web apps (tip calculators, pomodoros), complete PowerPoint decks from raw notes, draggable financial charts.</td>
    </tr>
    <tr>
      <td><strong>Grok 4.5</strong><br><small>(xAI, Web &amp; Sandbox)</small></td>
      <td>Text, Sandbox files (.docx, .pdf, .pptx, .xlsx), URLs, Screenshots, Video/Audio via ffmpeg.</td>
      <td>Text, Code, Office files, zip archives, Grok Imagine images, spoken audio via Voice, rendered preview links.</td>
      <td>Live web search, real-time X (Twitter) search/threads, video frame inspection, browser tab with JavaScript execution.</td>
      <td>Formatted decks/Word docs, Excel pivot analysis, image generation, multi-step file pipelines, live X sentiment and sports.</td>
      <td>Long-running continuous monitoring without automations, persistent login browser flows, heavy GPU model training, degraded OCR.</td>
      <td>Batch video/image manipulation via ffmpeg, scraping public web tables straight into formatted Excel charts, consistent product mockup variations.</td>
    </tr>
    <tr>
      <td><strong>ChatGPT</strong><br><small>(OpenAI, Web &amp; Tools)</small></td>
      <td>Text, Documents, Code, Datasets, Images, Screenshots, Voice conversations.</td>
      <td>Markdown, Code, Office files and spreadsheets via Python sandbox, DALL-E generated images, spoken voice.</td>
      <td>Live web browsing tool. Blocked by paywalls, CAPTCHAs, bot protection, and authentication walls.</td>
      <td>Software development across full stacks, automated CSV cleaning and reporting, multi-source research synthesis, multi-step tool workflows.</td>
      <td>Fluency masquerading as correctness, rare algorithmic edge cases, large specification omissions, fragile browser automation.</td>
      <td>Natural language translation into scheduled automations, full application prototype generation from a brief, unstructured invoice extraction.</td>
    </tr>
  </tbody>
</table>
</div>

## Comparative Analysis: What the Self-Reports Reveal

Looking at these four responses side by side highlights distinct product philosophies, architectural priorities, and self-awareness styles.

### The Modality Divide: Native Multimedia vs. Document Workflows

There is a clear dividing line in how these models ingest information. Gemini 4 Argon handles native audio and video files directly in its multimodal pipeline. Grok 4.5 bridges media inputs through integrated tools like ffmpeg and computer vision frame analysis. In contrast, Claude Sonnet 5.5 and ChatGPT focus strictly on text, code, PDFs, and uploaded documents, requiring a transcript before processing speech or video recordings.

If your workflow involves recorded meetings, conference presentations, or screen recordings, Gemini and Grok offer native utility that Claude cannot match without preprocessing.

### Output Delivery: Runnable Code vs. Direct Deliverables

How models deliver their results reflects their target users. Gemini takes an engineer-first approach: it outputs source code, structured JSON payloads, and LaTeX, but explicitly notes that it does not output direct binaries like compiled applications, ZIP files, or raw Excel sheets. Instead, it expects the user to run the generated Python script locally.

Claude and Grok take the opposite approach. Claude generates downloadable Word documents, PowerPoint presentations, and working Excel files with live formulas directly in the browser session. Claude can also deploy single-file HTML applications to a hosted, shareable URL on the spot. Grok similarly compiles ZIP archives, slide decks, and edited media within its sandbox. For non-developers who want a client-ready deliverable without touching a terminal, Claude and Grok eliminate friction.

### Live Web Access and Retrieval Boundaries

All four models feature live search, but the underlying mechanisms differ considerably:

- **Gemini 4 Argon** integrates directly with Google Search. It retrieves indexed page snippets and search text, but warns that single-page applications requiring heavy client-side JavaScript execution can cause it to miss body content.
- **Claude Sonnet 5.5** emphasizes sandbox network isolation. While the assistant can search and fetch web pages, its backend code execution sandbox is restricted to package managers (pip, npm, crates) and GitHub. It cannot execute scripts that scrape random websites.
- **Grok 4.5** leverages its unique connection to the X platform, allowing real-time keyword, user, and thread searches alongside video frame viewing. Its browsing environment includes a browser tab with JavaScript execution and screenshots.
- **ChatGPT** relies on an on-demand browsing tool with standard safeguards against paywalls, interactive CAPTCHAs, and private logged-in portals.

### Behavioral Persona and Self-Awareness Candor

The tone of each self-report mirrors the culture of its creators:

- **Gemini** reads like an internal engineering specification. It relies on concrete technical terminology: PyTorch tracebacks, Abstract Syntax Trees (ASTs), Terraform manifests, and Pydantic validation models.
- **Claude** communicates like a cautious, self-aware colleague. It provides the longest list of admitted weaknesses, openly warning the user that its confident tone does not correlate with factual accuracy, and explicitly advising against using it for unverified legal, medical, or financial decisions.
- **Grok** frames itself as an end-to-end tool operator, highlighting practical media pipelines, sports lookups, and presentation decks.
- **ChatGPT** adopts an outcome-driven framing, repeatedly emphasizing that the best way to utilize its strengths is to provide explicit goals, sequences, and verification standards.

### Shared Blind Spots: The Fluency Trap

Every single model independently flagged the exact same fundamental limitation: **token prediction is not a CPU arithmetic unit**.

Each model advised against asking it to mentally calculate multi-step arithmetic, count characters in a block, or sum large spreadsheet rows directly in text. Because language models process tokens rather than native numbers, token counting drifts quickly. The recommended practice across all four providers is identical: instruct the model to write and execute a script rather than relying on its raw text reasoning.

Similarly, all models cautioned that fluency is not evidence of correctness. A cleanly formatted, authoritative explanation can still contain fabricated citations, unindexed API parameters, or overlooked edge cases.

### Hidden Complexity: High-Leverage Superpowers

The prompt's final question ("What's something you could build or do fairly easily that most people would assume is way harder than it is?") yielded the most practical insights:

- **Single-shot interactive visualizers**: Gemini and Claude both excel at generating zero-dependency interactive canvas simulations (such as double pendulum physics or pathfinding algorithms) within seconds.
- **Unstructured to structured extraction**: ChatGPT and Grok excel at taking chaotic collections of receipts, invoices, or server logs and standardizing them into structured schemas or normalized Excel sheets.
- **Full multi-deliverable pipelines**: Claude and ChatGPT can turn a rough outline into a cohesive package: technical requirements, task backlog, presentation deck, and automated script in a single pass.

## What Self-Reporting Does Not Tell You

This benchmark prompt evaluates self-reporting rather than empirical performance. A model may describe its error-handling capabilities eloquently and still miss a basic logic bug in practice. Similarly, it may underestimate its own problem-solving abilities.

Self-reporting also does not capture operational metrics such as token generation latency, cost per thousand tokens, actual context window degradation under needle-in-a-haystack retrieval, or multi-turn conversational drift. Those dimensions require automated test harnesses and rigorous synthetic benchmarks.

Nevertheless, as a thirty-second operational audit, the prompt succeeds. It immediately reveals what modalities a model natively supports, where its sandbox boundaries lie, and what kinds of deliverables it is optimized to produce.

---

## Full Unedited Model Responses

The complete, verbatim responses from each model are preserved below. Click any model to inspect the unedited answers.

<details>
<summary>Gemini 4 Argon (Google, Paid tier)</summary>
<div class="details-body">

Running as **Gemini 4 Argon** on the Web (Paid tier), here is the breakdown of what I can and cannot do:

##### 1. Inputs & Outputs

- **Inputs I accept:** Text, code repositories, PDFs, spreadsheets (CSV, XLSX), documents, images (diagrams, UI screenshots, handwriting), audio files, and video files. In the Paid tier, I support an extended context window, meaning you can drop in multi-file codebases, full academic papers, or long error logs at once.
- **Outputs I produce:** Formatted Markdown, LaTeX math, complete source code in any major language, structured data payloads (JSON, YAML, SQL, CSV), and interactive visual widgets directly in the chat.
- **What I cannot output directly:** I cannot generate downloadable binary files (such as a compiled `.exe`, a `.zip` archive, or a raw `.xlsx` binary) directly from this chat text stream, though I can give you the exact Python script or raw text to generate them locally in seconds.

##### 2. Internet Access

- **Live Search:** Yes. I have live Google Search integration to pull up-to-date documentation, recent library releases, current events, and factual verification.
- **Limits:**
    - **Paywalls & Auth:** I cannot log into private accounts, bypass paywalls (e.g., IEEE Xplore, NYT), or solve CAPTCHAs.
    - **No Arbitrary Scraping:** I retrieve search snippets and indexed page content rather than running a full headless browser inside this chat window. If a single-page application requires heavy client-side JavaScript execution to render its text, I might miss the body content. (Note: For autonomous background browsing using saved credentials, that is handled via **Gemini Spark** rather than this standard chat interface).
    - **Sub-second Tickers:** I am not connected to a live WebSocket stream, so do not use me for sub-second stock market execution or millisecond-level telemetry.

##### 3. Strengths

- **Cross-Stack Code & Architecture:** Writing, refactoring, and debugging code across Python, JavaScript/TypeScript, C++, Rust, and SQL. For example, you can paste a raw PyTorch traceback alongside your model definition, and I will pinpoint the tensor shape mismatch.
- **Data & File Transformation:** Converting messy, unstructured inputs into strict schemas. For example, taking a photo of a whiteboard architecture diagram and outputting a working Terraform configuration or Mermaid.js chart.
- **Technical Synthesis:** Reading a 40-page PDF specification or a dense research paper and extracting the exact mathematical formulas, algorithmic steps, or hyperparameter tables you need.
- **Custom Workflows (Gems):** You can lock in specific system instructions, reference files, and coding styles as a reusable **Gem** so you do not have to re-prompt your baseline preferences every session.

##### 4. Weaknesses

- **Niche or Unindexed Libraries:** If a framework was released two weeks ago or is an obscure internal tool with sparse public documentation, I am prone to hallucinating method names or mixing up syntax from older versions.
- **Large-Scale Arithmetic & Counting:** Because I process text via tokens rather than a native CPU ALU, asking me to manually sum a 500-row CSV or count the exact occurrences of a character in a 10,000-word block by "reading" it will likely yield off-by-one errors. Always ask me to write a quick script to compute exact metrics on large datasets.
- **Visual Pixel-Perfection:** While I can write clean CSS and Tailwind, I cannot visually "see" the rendered DOM in real time as I write the code. Complex, multi-layered CSS grid alignments sometimes take an iterative tweak after you render them.

##### 5. Common Misconceptions

- **"You run the code you write":** Unless a specific sandbox tool is invoked, I am generating code via static reasoning, not compiling and executing it in a live terminal before showing it to you.
- **"You remember everything forever automatically":** While I can reference past chats and personal context when enabled, starting a **Temporary Chat** wipes the slate clean with zero memory or training usage. Even in standard chats, I do not continuously retrain my base weights on our conversation in real time.
- **"You can check a live URL's exact visual layout":** If you give me a URL, I read the text/HTML index. I do not take a screenshot of the live site to critique its visual typography unless you upload a screenshot yourself.

##### 6. Hidden Complexity (Easy for me, looks hard)

- **Single-File Interactive Web Apps & Simulators:** Most people assume building a working physics simulation, an interactive data visualizer, or a playable 2D game takes hours of setup. You can ask me for a single-file HTML/JS/Canvas app that simulates a double pendulum with adjustable gravity sliders or visualizes $$A^*$$ pathfinding in real time, and I will output the complete, zero-dependency code in 15 seconds.
- **Complex Regex & AST Parsers:** Writing a gnarly regular expression with positive lookbehinds to parse messy server logs, or writing a custom Abstract Syntax Tree (AST) visitor in Python to automatically refactor a specific function call across 100 files, takes me seconds despite being tedious for humans to write from scratch.
- **Reverse-Engineering Undocumented Payloads:** If you paste three examples of a cryptic, undocumented JSON response from a third-party API or IoT sensor, I can immediately infer the schema, generate the TypeScript interfaces or Pydantic models, and write the validation logic.

</div>
</details>

<details>
<summary>Claude Sonnet 5.5 (Anthropic, Web)</summary>
<div class="details-body">

##### 1. Inputs and outputs

**In:** Text, images (screenshots, photos, charts, handwriting), PDFs, and uploaded files like .docx, .xlsx, .csv, .json, and code files. I don't take audio or video as input here.

**Out:**

- Text and code in most languages
- Files: Word (.docx), PowerPoint (.pptx), Excel (.xlsx with working formulas), PDF, CSV, Markdown
- Hosted web pages and small apps (HTML, published as a shareable link)
- Inline visuals: SVG diagrams, charts, interactive widgets
- Structured cards for recipes, quizzes, itineraries, and product comparisons

I can't generate photos or illustrations in the image-model sense, and I can't produce audio. SVG and charts are fine.

##### 2. Internet access

I can search the web and fetch pages. My knowledge itself ends around June 2026, so anything newer needs a search. Limits:

- I can only open URLs you give me or that came up in search results, not ones I guess.
- Anything behind a login (private Google Docs, paywalled or members-only pages) is off-limits.
- I'm capped on quoting: short excerpts only, no lyrics or long passages from articles.
- My code sandbox has its own restricted network. It can reach package registries (pip, npm, crates) and GitHub, but not arbitrary sites. So I can't write a script that scrapes a random website from inside the sandbox, though I can search and read it myself.

##### 3. Strengths

- **Writing and editing:** rewriting a messy email in three tones, tightening a 2,000-word draft to 800, adapting a README for a non-technical audience.
- **Code:** writing, debugging, and explaining it. Paste a stack trace and the relevant function and I'll usually find the bug quickly.
- **Document and data work:** "Here's a CSV of 5,000 sales rows; clean the dates, group by region, and give me an Excel file with a chart."
- **Synthesis:** reading a 60-page PDF and pulling out the clauses that matter, or comparing five sources on a question.
- **Structured thinking:** pressure-testing a plan, laying out tradeoffs, drafting a decision memo.

##### 4. Weaknesses

- **Exact arithmetic in my head:** I'm unreliable on long multi-step math unless I run code, which I can do. Ask me to compute it rather than just recall it.
- **Counting and precise layout in text:** exact word counts or character-level constraints can drift without a tool check.
- **Obscure facts:** I can state wrong details confidently, especially names, dates, citations, and niche statistics. Verify anything high-stakes, or ask me to search.
- **Legal, medical, and financial decisions:** I can explain the factors and the landscape, but I'm not a substitute for a professional who knows your situation.
- **Very long or sprawling tasks:** quality can slip across hundreds of steps without checkpoints.
- **Real-time or private data:** I don't know your inbox, your company's internal systems, or live prices unless I've been given a tool or you paste them in.

##### 5. Common misconceptions

- **"You remember our past chats."** Not here. Memory isn't enabled, so each conversation starts fresh.
- **"You can open any link."** See the limits above.
- **"You can watch a video or listen to a recording."** Not directly; I'd need a transcript.
- **"If you sound sure, you're right."** My tone doesn't track my accuracy. Ask me how confident I am and what I'd check.
- **"You can see my screen or files on my computer."** Only what you upload or paste.
- **"You can make me an image or logo like a design model."** I can make vector graphics and layouts, not photorealistic art.

##### 6. Hidden complexity: things that are easier than they sound

- **A working app in one shot:** "A tip calculator that splits by person and rounds up" or "a Pomodoro timer with sound" becomes a hosted page in a couple of minutes.
- **A formatted deck or spreadsheet from a rough brief:** a 7-slide PowerPoint from a paragraph of notes, or an Excel model with live formulas from a description of the logic.
- **Interactive explainers:** a draggable compound-interest chart, or a sorting-algorithm visualization you can step through.
- **Bulk file transformations:** converting a folder's worth of messy data into a clean spreadsheet, merging PDFs, or extracting tables from a scanned document.
- **Quick data analysis:** upload a CSV and ask "what's odd about this?" I'll run actual code and show you the outliers and a chart.

If you tell me what you're planning to use me for, I can point out where I'd be strong and where you should double-check my work.

</div>
</details>

<details>
<summary>Grok 4.5 (xAI, Web &amp; Sandbox)</summary>
<div class="details-body">

##### 1. Inputs/outputs

**Inputs I can take:**
- Plain text / conversation
- Files in the sandbox (or uploaded): `.docx`, `.pdf`, `.pptx`, `.xlsx`/`.csv`, images, video/audio (via ffmpeg), code, plain text
- URLs (I can fetch pages, images, X posts, videos)
- Screenshots / image URLs (I can view them)
- Voice generation requests (via connected Voice tool)

**Outputs I can produce:**
- Text answers, code, structured data
- Files: Word docs, PDFs, PowerPoint decks, Excel spreadsheets, edited images, processed video/audio (mp4, gif, etc.), zip archives
- Generated or edited images (Grok Imagine)
- Spoken audio (Voice connector)
- Rendered previews + download links for files I create
- Live sports cards, citations from web/X searches

I cannot directly read or write files on *your* local computer; only the remote sandbox.

##### 2. Internet access

Yes; live search and browsing:
- Web search + full page fetch
- X (Twitter) keyword/semantic/user/thread search + video frame viewing
- Browser tab with JS execution, screenshots, network capture
- Sports data (current season only for listed leagues)

**Limits:**
- Some sites block scrapers or require login (paywalls, heavy JS apps, certain government/banking sites often fail)
- No guaranteed real-time streaming (stock ticks, live chat, etc.)
- Rate limits exist; very high-volume scraping is not practical
- I cannot log into accounts on your behalf or bypass CAPTCHAs/auth walls reliably
- Historical data beyond what public indexes return is limited

##### 3. Strengths (concrete examples)

- Turning messy notes/data into clean Word docs, PDFs, or PowerPoint decks with proper formatting
- Spreadsheet work: cleaning CSVs, formulas, charts, pivot-style analysis
- Image generation + editing (Grok Imagine) and basic video processing (trim, combine, GIF, mute, resize)
- Research + synthesis with live sources + citations
- Code writing + execution in the sandbox (Python, bash, etc.)
- Multi-step file pipelines: extract tables from PDF to Excel, clean and chart, and insert into a slide deck
- X/Twitter analysis and sports lookups

##### 4. Weaknesses (concrete examples)

- Real-time continuous monitoring or acting as a long-running agent without the Automations connector
- Heavy interactive web apps that require persistent login sessions or complex browser automation
- Very large video processing or GPU-heavy ML training (sandbox has limits)
- Perfect OCR on extremely degraded scans or handwriting
- Tasks that need your local files, local hardware, or private authenticated APIs without connectors
- Guaranteeing legal/compliance advice or medical diagnosis

##### 5. Common misconceptions

- "You can see and edit any file on my computer" -> No, only the remote sandbox (or files you upload)
- "You have continuous real-time awareness" -> No, each turn is discrete; I don't watch the world 24/7
- "You can post on X / send emails / control my accounts" -> Not without explicit connected tools and auth
- "You remember everything forever across all chats" -> Context is conversation-scoped (plus any files in the current sandbox)
- "You can generate perfect long-form video or photorealistic 3D models" -> Image gen and light video editing yes; full video production or complex 3D no

##### 6. Hidden complexity (things that are easier than people expect)

- Build a complete multi-page Word report or PowerPoint deck with tables, images, and consistent styling from a rough outline in one go
- Take a folder of images/videos -> resize, add text overlays, mute, combine into a single MP4 or GIF
- Scrape a public page + extract tables -> clean into a formatted Excel file with charts
- Generate a set of consistent product mockup images, then edit them all with the same style change
- Pull live sports data + recent X posts and turn it into a short briefing doc or slide

These are the kinds of end-to-end file and research pipelines that feel "agent-like" but are straightforward with current tools.

</div>
</details>

<details>
<summary>ChatGPT (OpenAI, Web &amp; Tools)</summary>
<div class="details-body">

The practical way to think about me: I'm a reasoning, coding, research, and content-production assistant that can also use tools to work with files, images, websites, and connected apps. I'm strongest when you give me a clear objective and let me work through several steps. I'm less reliable when a task requires perfect accuracy, unrestricted access to your computer, or independent judgment about the real world.

##### 1. Inputs and outputs

**Text and documents (Input &amp; Output):**
Plain text, long documents, Markdown, emails, reports, tables, PDFs, and many common office-file formats. I can summarize, extract information, rewrite, compare, and create document drafts.
*Example:* Analyze 50 pages of a proposal and produce a two-page executive summary with a risk register.

**Code and data (Input &amp; Output):**
Python, JavaScript, TypeScript, SQL, HTML/CSS, shell commands, configuration files, JSON, CSV, spreadsheets, and more. I can debug code, design APIs, write scripts, analyze datasets, and generate files.
*Example:* Build a Python script that cleans a messy CSV, removes duplicate records, and generates an Excel report.

**Images and visual information (Input &amp; Output):**
I can interpret uploaded images and screenshots, inspect diagrams, read many images of documents, and generate or edit images.
*Example:* Upload a screenshot of a broken website layout, and I can identify likely CSS problems and suggest a fix.

**Audio and voice:**
Available through supported audio and voice features: voice conversations, speech input, spoken responses, and certain audio-processing tasks. Exact transcription, generation, and upload options depend on the interface and available tools.
*Example:* Talk through a project idea, ask follow-up questions aloud, and turn the discussion into an action plan.

**Websites and external services:**
Search the web, open pages, follow links, use connected services, and in supported workflows interact with websites and applications.
*Example:* Research competing products, compare their specifications, and prepare a purchasing shortlist.

*Important distinction:* Being able to generate code isn't the same as executing it. I can run certain code and data-analysis tasks in supported environments, but I don't automatically have access to your local files, terminal, installed applications, or every programming runtime.

##### 2. Internet access

Yes, I can browse and search the live web when the browsing tool is available. I can retrieve current pages, search for recent information, open sources, and cite evidence.

| Capability | What to expect |
| :--- | :--- |
| **Current information** | News, product listings, documentation, and other accessible web content |
| **Source verification** | Cross-check claims against multiple sources, where possible |
| **Website access** | Depends on whether pages are publicly accessible and compatible with browsing tools |
| **Login-protected content** | Not automatically accessible; authorization and connected tools required |
| **Live data** | Only when a suitable live source or integration provides it |
| **Rate limits** | Usage and tool limits may apply; requests are not unlimited |
| **Blocked websites** | Paywalls, CAPTCHAs, anti-bot protections, regional restrictions, and technical barriers can prevent access |
| **Completeness** | Search results may omit relevant pages; content may occasionally be outdated |

For example, I can search for the latest version of a software library and compare its documentation. I cannot guarantee that a private GitHub repository, a logged-in dashboard, or a website protected by an interactive CAPTCHA will be accessible.

One particularly important limitation: I don't have a universal, continuous view of the internet. I retrieve information through available tools and sources, and I should distinguish what I've verified from what I'm inferring.

##### 3. Strengths: where I provide the most value

Here are the areas where I can be particularly useful, with concrete examples:

- **A. Software development:** Build websites, APIs, scripts, and internal tools; debug errors and explain unfamiliar codebases; refactor code, write tests, and review security risks; design databases and deployment workflows. *Example:* Give me a folder containing a web application and ask me to add authentication, fix a broken dashboard, and write regression tests. With suitable coding tools, I can work through the implementation, not just describe it.
- **B. Data analysis and automation:** Clean datasets, reconcile records, calculate metrics, and find anomalies; generate Excel reports, charts, and repeatable Python scripts; convert repetitive manual processes into automated workflows. *Example:* Take monthly sales spreadsheets, merge them, flag suspicious transactions, and produce a report with regional performance and trends.
- **C. Research and synthesis:** Compare products, technologies, business models, and research findings; search for current information and provide citations; turn many sources into an actionable briefing. *Example:* Compare five database technologies against cost, scalability, operational complexity, and specific workload requirements.
- **D. Producing finished work:** Draft proposals, presentations, reports, specifications, and emails; turn rough notes into polished deliverables; create structured plans with dependencies, acceptance criteria, and milestones. *Example:* Turn a vague startup idea into a product requirements document, a technical architecture, a development backlog, and a launch checklist.
- **E. Multi-step work:** Research, analyze files, use supported tools, and combine results into unified pipelines. *Example:* Research a market, build a competitor spreadsheet, draft a report, and generate charts from the findings.

The common thread is that I can connect several kinds of work into one process. OpenAI's official [capabilities overview](https://help.openai.com/en/articles/9260256-chatgpt-capabilities-overview) documents many of these functions.

##### 4. Weaknesses: where you should be careful

| Weakness | Concrete example | Best safeguard |
| :--- | :--- | :--- |
| **Incorrect facts** | Confidently inventing an API parameter that doesn't exist. | Check official documentation or run the code. |
| **Complex reasoning errors** | Missing a rare edge case in a long algorithm. | Add unit tests and independent assertions. |
| **Long-context omissions** | Overlooking a requirement buried in a large specification. | Use explicit requirements and a verification checklist. |
| **Visual inaccuracies** | Misreading a tiny number in a screenshot. | Provide the original spreadsheet or higher-resolution image. |
| **Unreliable predictions** | Forecasting customer demand too precisely from limited data. | Use historical data, uncertainty ranges, and validation. |
| **Incomplete web research** | A search misses a relevant page or relies on stale info. | Cross-check primary sources and dates. |
| **Fragile automation** | A website changes layout and a browser workflow breaks. | Use stable APIs where possible and verify every action. |
| **Ambiguous instructions** | Building the wrong feature due to multiple interpretations. | State assumptions and define acceptance criteria. |

My most important weakness is that fluency is not proof of correctness. I can produce a well-written explanation for a wrong answer. For high-impact tasks (financial decisions, legal filings, security changes, medical decisions, or production deployments), use me to improve the process, but retain expert review and verification.

##### 5. Common misconceptions

- **"You can see everything on my computer":** Not by default. A normal chat doesn't give me unrestricted access to your desktop, local folders, running applications, or terminal.
- **"If you write code, the software must work":** Code can contain bugs, missing dependencies, security flaws, or assumptions that don't match the target environment. Execution and tests matter.
- **"Browsing means you can access any website":** Login restrictions, anti-bot measures, blocked domains, and paywalled content still apply.
- **"You will keep working indefinitely after I close the chat":** Continued execution depends on the workflow. Standard chat sessions are not continuous background processes.
- **"You automatically remember everything and can access every connected account":** Memory is selective, and connected apps have explicit permission boundaries.
- **"You can perform any external action I request":** External actions require explicit authorization, confirmation, or supported integrations.

##### 6. Hidden complexity: things that are easier than people expect

1. **Turn a natural-language process into a working automation:** Describe: *"Every Monday, read this spreadsheet, identify overdue tasks, group them by owner, and prepare reminder emails."* I can translate that into a script or scheduled workflow with error handling and run documentation.
2. **Build a useful prototype from a short description:** You can describe an inventory tracker, CRM, expense dashboard, or project-management tool in plain English. I can generate a working front end, data models, backend endpoints, sample data, and tests.
3. **Turn unstructured information into structured data:** Provide a collection of receipts, invoices, notes, or product descriptions. I can extract selected fields into a normalized table and export the result.
4. **Build a small end-to-end system instead of isolated pieces:** Combine a web form, database schema, scheduled report, and notification logic together into an integrated prototype.
5. **Produce several deliverables from one source:** A single project brief can become a technical specification, task backlog, risk register, test plan, presentation, and implementation checklist.

##### A practical way to use me

Instead of asking only for advice, give me an outcome, the relevant materials, and permission to use the appropriate tools. A useful instruction defines the goal, the sequence, the verification standard, and the final deliverable.

</div>
</details>