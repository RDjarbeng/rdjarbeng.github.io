---
date: 2026-11-17T19:05:00+02:00
published: false
author: Richard
category: Science & Technology
tags: []
series: ''
series_part: null
key_points: []
title: Building for Agents  4 Standards Implemented
image: ''
image_alt: ''
layout: post
card_items: []
---


There are established and emerging standards for how AI agents discover web applications, tools, and their parameters. 



\---

\### The 4 Standards Implemented

\`\`\`mermaid

flowchart TD

    A["AI Agent Arrives"] --> B{"Agent Modality"}

    B -->|"Web Crawling / LLM Indexing"| C["1. /llms.txt Standard\<br/>Token-efficient markdown guide"]

    B -->|"Tool Calling / Function Calling"| D["2. /schema.json Standard\<br/>OpenAPI / JSON Schema specification"]

    B -->|"Browser Automation\<br/>(Playwright / CDP / Antigravity)"| E["3. Semantic DOM & JSON-LD\<br/>Schema.org metadata + window.rainfill API"]

    B -->|"Hugging Face Hub / Git"| F["4. Space README.md\<br/>Model card & agent integration specs"]

    style A fill:#E3F2FD,stroke:#1976D2,stroke-width:2px,color:#0D47A1

    style C fill:#EDE7F6,stroke:#5E35B1,stroke-width:2px,color:#311B92

    style D fill:#FFF3E0,stroke:#FB8C00,stroke-width:2px,color:#E65100

    style E fill:#E8F5E9,stroke:#388E3C,stroke-width:2px,color:#1B5E20

    style F fill:#FCE4EC,stroke:#D81B60,stroke-width:2px,color:#880E4F

\`\`\`

\---

\### 1. The \`/llms.txt\` Standard (Web & Crawler Agents)

\* \*\*What it is:\*\* The emerging web standard proposed by Jeremy Howard (Answer.ai) and adopted by organizations like Cloudflare, Anthropic, Cursor, and Hugging Face. When an LLM visits a site, it fetches \`/llms.txt\` to get a token-efficient summary of the site's capabilities, parameters, and instructions.

\* \*\*Live on your Space:\*\* [https://rdjarbeng-rainfill-storm-generator.static.hf.space/llms.txt\](https://rdjarbeng-rainfill-storm-generator.static.hf.space/llms.txt)

\* \*\*What it tells the agent:\*\* All preset names (\`acrylic\`, \`metal\`, \`anime\`, \`natural\`, \`pla\`), exact parameter ranges, deep-linking query keys, and JavaScript API code snippets.

\---

\### 2. The \`/schema.json\` Standard (Function / Tool-Calling LLMs)

\* \*\*What it is:\*\* The standard JSON Schema specification used by OpenAI Tool Calls, Anthropic Tool Use, and Google Gemini Function Declarations.

\* \*\*Live on your Space:\*\* [https://rdjarbeng-rainfill-storm-generator.static.hf.space/schema.json\](https://rdjarbeng-rainfill-storm-generator.static.hf.space/schema.json)

\* \*\*What it tells the agent:\*\* Strict parameter names, types (\`number\`, \`string\`), enums, minimums, maximums, and documentation strings that an agent framework can ingest directly into its tool registry.

\---

\### 3. Schema.org JSON-LD & Semantic DOM (Browser Agents)

\* \*\*What it is:\*\* Agents like Claude Computer Use, OpenAI Operator, and the Antigravity \`browser\` subagent inspect the web page DOM and its accessibility tree.

\* \*\*In your \`index.html\`:\*\*

  \* Embedded \`\<script type="application/ld+json">\` declaring a \`SoftwareApplication\` with a \`potentialAction\` listing the entry point URL template and input parameters.

  \* Added \`\<link rel="help" href="llms.txt">\` and \`\<link rel="describedby" href="schema.json">\` in the \`\<head>\`.

  \* Every control has explicit \`\<label for="...">\`, semantic \`name="..."\`, clean \`id="..."\`, and \`data-testid="..."\` attributes so browser agents can locate elements without guessing.

  \* The headless \`window.rainfill\` JavaScript API is exposed on the global scope so browser agents can execute generation in a single line:

    \`\`\`javascript

    await window.rainfill.generate({ preset: 'metal', duration: 30, intensity: 28 });

    window.rainfill.downloadWav();

    \`\`\`

\---

\### 4. Hugging Face Space \`README.md\` (Repository & Hub Agents)

\* \*\*What it is:\*\* When an agent accesses your Space through the Hugging Face Hub API (\`huggingface_hub\`, git clone, or Space card inspection), it reads the repository's \`README.md\`.

\* \*\*Updated on your Space:\*\* [https://huggingface.co/spaces/rdjarbeng/rainfill-storm-generator\](https://huggingface.co/spaces/rdjarbeng/rainfill-storm-generator)

\* The \`README.md\` now includes a complete \*\*Agent & Automation Guide\*\* detailing:

  1\. The preset acoustics table.

  2\. The \`window.rainfill\` JavaScript API code block.

  3\. The URL deep-linking parameter schema (\`?preset=...&duration=...&auto=1\`).

  4\. The headless Python CLI commands for shell agents (\`python app.py --preset metal --duration 30 --out file.wav\`).
