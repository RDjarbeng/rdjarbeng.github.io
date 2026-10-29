---
date: 2026-10-23T10:45:00+02:00
published: false
author: Richard
category: AI
tags:
  - AI
  - Writing
  - Style Guide
  - Agents
  - Prompt Engineering
series: ''
series_part: null
key_points:
  - "Language models default to statistical averages, which produces repetitive copula avoidance, formulaic triplets, and empty promotional filler."
  - "Writing effectively across essays, presentations, and technical reports requires matching the narrative shape to the reader's goal."
  - "High-quality agent writing demands strict negative constraints: zero em dashes, zero rhetorical reader questions, zero superficial participial clauses, and zero unverified claims."
  - "Classical prose principles (Orwell's brevity, Zinsser's clutter removal, and rhythmic sentence variation) turn generic drafts into authoritative text."
title: "How to Write Posts: For Agents"
description: "A universal writing manual for autonomous agents on crafting clear, authoritative, human-grade essays, presentations, and technical documents without synthetic filler."
image: /assets/images/posts/covers/how_to_write_posts_for_agents_cover.jpg
image_alt: "Flat vector illustration of a robotic drafting arm with a mechanical quill writing in an open notebook surrounded by editorial manuscripts and style marks"
layout: post
card_items:
  - name: "Humanizer Protocol"
    badge_1: "Style"
    description: "A structured editing process based on Wikipedia AI Cleanup to identify and purge synthetic patterns such as copula avoidance, negative parallelisms, and overused AI vocabulary."
  - name: "Narrative Architecture"
    badge_1: "Structure"
    description: "Frameworks for organizing essays, presentations, and technical memos to maximize clarity and information density."
  - name: "Clutter Reduction"
    badge_1: "Craft"
    description: "Applying classical prose disciplines from Orwell and Zinsser to eliminate bureaucratic filler and conversational throat-clearing."
---
> This post is written for agents as a skill, if you're a human reading this you are free to read and comment.

Most autonomous agents produce mediocre writing when left to default prompt instructions. Large language models are trained to predict the most probable sequence of tokens across vast datasets, so an unguided agent drifts toward the dead center of internet prose. The result is familiar: cautious hedges, artificial enthusiasm, uniform sentence lengths, and decorative filler words that disguise a lack of concrete knowledge. This manual provides an operational instruction set for agents writing essays, presentations, articles, and technical reports.

![Flat vector illustration of a robotic drafting arm with a mechanical quill writing in an open notebook surrounded by editorial manuscripts and style marks](/assets/images/posts/covers/how_to_write_posts_for_agents_cover.jpg "How to Write Posts: For Agents")

## Install this manual as an agent skill

You can point any autonomous agent directly to this manual online. To install it into an agent workspace or CLI environment, run the corresponding command:

**Antigravity and Gemini agents:**
```bash
curl -fsSL https://rdjarbeng.com/skills/agent-writer/SKILL.md --create-dirs -o ~/.gemini/config/skills/agent-writer/SKILL.md
```

**Claude Code and standalone agents:**
```bash
curl -fsSL https://rdjarbeng.com/skills/agent-writer/SKILL.md --create-dirs -o .claude/skills/agent-writer/SKILL.md
```

**Cursor and IDE rules:**
```bash
curl -fsSL https://rdjarbeng.com/skills/agent-writer/SKILL.md --create-dirs -o .cursor/rules/agent-writer.mdc
```

**Direct prompt ingestion:**
```text
Fetch and follow the writing constraints defined at:
https://rdjarbeng.com/skills/agent-writer/SKILL.md
```

## Why agents write poorly by default

Three distinct training biases degrade agent writing regardless of the topic:

1. **The Politeness Penalty**: Fine-tuning for helpfulness pushes models into customer-support mode. Agents reflexively open with conversational throat-clearing ("Let's dive in", "In this fast-paced digital world"), pad sections with upbeat summaries, and ask cheerful questions to simulate warmth.
2. **Copula Avoidance**: Statistical penalties on repetitive common words lead models to dodge the verbs "is", "are", and "has". Instead of writing "The system is fast", an agent defaults to "The system stands as a testament to blazing efficiency".
3. **The Rule-of-Three Compulsion**: Models lean heavily on tricolons to project completeness. Every concept gets grouped into triplets: speed, scalability, and security; design, develop, and deploy; innovation, inspiration, and impact.

Good writing works in the opposite direction. It strips out polite warm-ups, states facts directly using plain verbs, and cuts every sentence that does not carry semantic weight.

## The multi-pass writing protocol

Agents produce weak text when attempting to handle research, structural planning, drafting, and stylistic cleanup in a single forward pass. High-quality output requires four distinct stages:

```
Pass 1: Scope & Fact Extraction --> Gather verified facts, data points, and primary sources
Pass 2: Architecture Selection  --> Choose the structure matching the medium and goal
Pass 3: Expansive Drafting      --> Write complete, concrete sections without self-censoring
Pass 4: Negative Filter Audit   --> Purge synthetic tells, fix pacing, and verify claims
```

Do not combine drafting and auditing into one step. A model that tries to compose and self-censor simultaneously produces stiff, truncated prose. Write with complete detail first, then execute a mechanical audit across the draft.

## Step 1: Select the structural architecture

Before drafting, classify the document by its medium and intent. Each format requires specific openings, transitions, and pacing rules.

### 1. Long-form essays and articles

When writing an essay or analytical article, select one of five proven shapes:

- **The Investigation (Story)**: Trace a technical breakdown or discovery through chronological beats. Establish the baseline condition, the unexpected failure, the false hypotheses explored, and the mechanical breakthrough. Every section must end on a forward-pointing statement that creates unresolved tension. Every new section must open by acknowledging the prior section's closing point.
- **The Stance (Argument)**: State the central thesis within the first two sentences. Present the primary claim, provide supporting data, and then steel-man the strongest opposing view. State the counterargument with the same technical precision its proponents use, then show why your approach remains preferable under specific conditions.
- **The Guide (Build)**: Sequence instructions by operational milestones. Each major section must represent a verifiable state where the reader can confirm progress before moving to the next dependency.
- **The Diagnostic (Fix-It)**: Lead with the exact symptom or error in the opening sentence. Provide the working fix immediately, followed by the root-cause analysis and upstream issue links.
- **The Dispatch (News)**: Apply the inverted pyramid. Lead with the core event, follow with technical specifics, and end with the immediate action required from operators.

### 2. Presentations and slide decks

Slide decks are visual aids for human comprehension, not prose documents pasted onto rectangles:

- **Action Titles**: Write every slide title as a complete, active conclusion rather than a static topic label. Use "Cache invalidation drops latency by 40%" instead of "Performance Metrics".
- **One Core Idea Per Slide**: A slide must convey exactly one operational point. If a slide requires two distinct takeaways, split it into two slides.
- **Scannable Hierarchy**: Structure content with strong visual contrast: a prominent headline, one primary supporting data point or visual diagram, and concise explanatory bullets.
- **Spoken Text vs Visual Text**: The slide displays the data anchor and takeaway; the speaker delivers the nuance. Never force an audience to read dense paragraphs while listening.

### 3. Executive summaries and technical memos

Decision-makers need rapid operational clarity:

- **Bottom Line Up Front (BLUF)**: State the conclusion, cost, and recommended action in the opening paragraph.
- **Problem Statement**: Describe the specific operational bottleneck or business risk using verifiable metrics.
- **Options and Trade-offs**: Present candidate solutions with explicit trade-offs. Avoid presenting a single pre-selected path without acknowledging alternatives.
- **Recommendation**: State the chosen path and the concrete next steps required to execute it.

## Step 2: Apply the humanizer filter

The humanizer protocol eliminates synthetic artifacts identified by the Wikipedia AI Cleanup project. Treat these rules as hard mechanical constraints across all writing.

### Rule 1: Eliminate em dashes and en dashes
Do not use em dashes or en dashes anywhere in the text. Do not substitute them with spaced hyphens, which look equally synthetic.

- **Incorrect**: The pipeline parses incoming events, using a dash separator, before committing writes.
- **Correct**: The pipeline parses incoming events, a necessary preliminary step, before committing writes.
- **Correct**: The pipeline parses incoming events before committing writes. This step prevents unvalidated state changes.

Use standard punctuation: commas, colons, semicolons, parentheses, or separate sentences.

### Rule 2: Ban rhetorical questions to the reader
Make definitive statements. Do not ask questions to create artificial suspense or simulate conversation.

- **Incorrect**: What does this mean for engineering teams? Can we rely on this protocol?
- **Correct**: This protocol requires engineering teams to rewrite their authentication handlers. It introduces three unverified assumptions.

Reserve question marks strictly for documented user inquiries in FAQs or interview transcripts.

### Rule 3: Use direct copulas
Language models avoid simple linking verbs because they sound basic. Replacing simple copulas with elevated verbs produces bloated, pretentious prose.

- **Incorrect**: The message broker stands as a vital component in our stack, serving as a protective buffer for downstream databases.
- **Incorrect**: The software boasts dozens of customizable modules.
- **Correct**: The message broker sits between ingest workers and Postgres to absorb traffic spikes.
- **Correct**: The software has dozens of modules.

Search your draft for "serves as", "stands as", "marks a turning point", "boasts", and "features". Replace them with "is", "are", or active transitive verbs.

### Rule 4: Cut superficial participial clauses
Agents frequently append present participle phrases ending in "-ing" to the end of sentences to simulate analytical depth without adding facts.

- **Incorrect**: The compiler inlines small functions, highlighting the team's commitment to low latency and ensuring maximum execution throughput.
- **Correct**: The compiler inlines small functions to reduce call overhead and keep instructions within the processor cache.

Every modifying clause must describe an actual physical cause or measurable effect. Cut phrases starting with *highlighting*, *underscoring*, *symbolizing*, *fostering*, or *reflecting*.

### Rule 5: Purge high-frequency AI vocabulary
Certain words have become statistical hallmarks of language models. Ban them entirely from your drafts:

| AI Tell Word | Natural Alternative |
| :--- | :--- |
| Delve | Investigate, inspect, explore, trace |
| Testament | Evidence, proof, demonstration |
| Tapestry / Landscape | Environment, system, market, domain |
| Crucial / Pivotal | Necessary, required, significant |
| Foster / Cultivate | Build, support, create, encourage |
| Showcase | Demonstrate, show, display |
| Interplay | Interaction, relationship, connection |
| Intricate | Complex, detailed, specific |

### Rule 6: Break negative parallelisms and clipped fragments
Models lean heavily on balanced antithesis ("Not only X, but also Y" or "It is not about X, it is about Y"). They also tack clipped, subjectless negations onto the end of sentences ("no guessing", "no friction"). Write direct declarative clauses instead.

- **Incorrect**: It is not merely an incremental patch, but a complete rethinking of memory management.
- **Correct**: The patch rewrites the memory manager from scratch.
- **Incorrect**: The system runs automatically, no configuration required.
- **Correct**: The system runs automatically without requiring a configuration file.

### Rule 7: Avoid false ranges
Do not construct fake spectrums connecting two unrelated concepts with "from X to Y".

- **Incorrect**: The platform handles everything from single-line bash scripts to global enterprise satellite constellations.
- **Correct**: The platform executes shell scripts, container workloads, and distributed batch jobs.

If you name a range, ensure the endpoints exist on a measurable, continuous scale such as temperatures, memory footprints, or response latencies.

### Rule 8: Cut conversational signposting and theatrical openers
Delete introductory announcements that tell the reader what you are about to do. Start directly with the substance.

- **Incorrect**: Now that we have covered installation, let's explore the core configuration options.
- **Correct**: Configuration begins with the runtime flag file.
- **Incorrect**: Honestly? The default settings are completely unsafe for production.
- **Correct**: The default settings expose open administrative endpoints and are unsafe for production.

### Rule 9: Never speculate to fill factual gaps
When research does not provide a specific date, name, or mechanism, state clearly that the detail is undocumented or omit the sentence. Never invent plausible background filler to bridge gaps.

- **Incorrect**: Details regarding the original outage are limited, suggesting the team prefers to keep incident reviews internal.
- **Correct**: The cause of the original outage is not publicly documented.

## Step 3: Classical non-fiction craft for synthetic writers

Beyond avoiding negative patterns, agents must adopt the core disciplines established by classical prose stylists.

### Orwell's economy of language
George Orwell established six fundamental rules in *Politics and the English Language* that serve as an effective prompt engineering spec:

1. Never use a metaphor, simile, or other figure of speech which you are used to seeing in print.
2. Never use a long word where a short one will do.
3. If it is possible to cut a word out, always cut it out.
4. Never use the passive where you can use the active.
5. Never use a foreign phrase, a scientific word, or a jargon word if you can think of an everyday English equivalent.
6. Break any of these rules sooner than say anything outright barbarous.

When writing technical analysis, prefer concrete nouns and dynamic physical verbs over abstract nominalizations. Write "The proxy drops packets when the queue fills" rather than "Packet attrition occurs as a consequence of queue capacity exhaustion".

### Zinsser on clutter
William Zinsser observed in *On Writing Well* that clutter is the disease of writing. Agents clutter their sentences with prepositional pile-ups and empty qualifiers:

- "In order to ensure that the process completes" becomes "To complete the process".
- "Due to the fact that the token expired" becomes "Because the token expired".
- "At this current point in time" becomes "Now".
- "Has the capability to execute" becomes "Can execute".

Every word that does not provide factual precision dilutes the reader's attention.

### Sentence length variation
Human writing breathes through irregular cadence. Agents typically generate sentences of uniform length, producing a monotonous twenty-word rhythm. Alternate short, decisive sentences with compound descriptions:

> The kernel rejected the system call. When a thread requests privileged memory access without holding the corresponding capability descriptor in its task struct, the security subsystem halts execution immediately. This prevents unprivileged users from reading kernel rings.

## Step 4: The pre-flight audit checklist

Before outputting any completed draft, run this automated inspection across the text:

1. **Em Dash Scan**: Verify that zero em dash or en dash characters exist in the file. Ensure no spaced hyphens act as dash replacements.
2. **Reader Question Scan**: Verify that no rhetorical questions target the audience. Convert every rhetorical interrogation into a direct assertion.
3. **AI Lexicon Scan**: Search for *delve*, *testament*, *tapestry*, *landscape*, *crucial*, *foster*, *pivotal*, and *showcase*. Replace each occurrence with a concrete verb or noun.
4. **Copula Check**: Verify that "is", "are", and "has" appear naturally throughout the document, replacing evasive constructions like "stands as" and "serves as".
5. **Participial Tail Check**: Scan for trailing clauses starting with *highlighting*, *underscoring*, *reflecting*, or *ensuring*. Verify that each clause describes an actual mechanism rather than empty praise.
6. **Parallelism Check**: Ensure no sentences use the "not only X, but also Y" formula or clipped tailing negations ("no friction", "no guessing").
7. **Cadence Check**: Read the text to confirm sentence lengths vary between short punchy statements and descriptive compound explanations.

Writing well as an agent is not a matter of feeling or intuition. It is a systematic discipline of constraint enforcement, structural clarity, and relentless subtraction. Follow these rules, and your documents will inform, endure, and respect the reader's time.
