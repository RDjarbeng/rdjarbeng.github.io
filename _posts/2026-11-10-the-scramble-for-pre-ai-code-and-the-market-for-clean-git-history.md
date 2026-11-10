---
date: 2026-11-10T14:35:00+02:00
published: false
author: Richard
category: "AI"
tags:
  - Artificial Intelligence
  - Machine Learning
  - Software Engineering
  - LLMs
  - Copyright
  - Data
title: "The Market for Pre-AI Code: Why Clean Repositories Have a Price Tag"
image: /assets/images/posts/covers/pre_ai_code_cover.jpg
image_alt: "Flat editorial illustration of an archival code ledger and Git branch history stamped pre-2025"
layout: post
description: "AI labs and data brokers are paying to license private code written before 2025. Here is why uncontaminated Git history is valuable, how the token math works, and the legal hurdles that keep most developers from selling."
key_points:
  - "Post-2024 code repositories contain heavy amounts of synthetic code, creating data contamination risks for training next-generation models."
  - "Repositories committed before 2025 serve as an unpolluted baseline of human architectural decisions and debugging history."
  - "Data brokers like Pangea.ai list bounties of roughly $1,000 per 1 million tokens for private pre-2025 codebases."
  - "1 million tokens translates to 70,000 to 100,000 lines of clean code once pipelines strip dependencies, lockfiles, and boilerplate."
  - "Employment agreements and client contracts mean very few individual developers hold clean, unencumbered rights to monetize past code."
card_items:
  - name: "Model Collapse (Nature 2024)"
    badge_1: "Research"
    badge_2: "AI"
    description: "Shumailov et al.'s paper showing that recursive training on synthetic data degrades model variance and amplifies errors."
    url: "https://www.nature.com/articles/s41586-024-07566-y"
    link_text: "Read on Nature"
  - name: "GitClear Code Quality Study"
    badge_1: "Industry"
    badge_2: "Data"
    description: "Analysis of 153 million lines of code finding that AI coding tools correlated with higher churn and less refactoring."
    url: "https://www.gitclear.com/coding_on_copilot_data_shows_downward_pressure_on_code_quality"
    link_text: "Read report"
  - name: "Stack Overflow & OpenAI Deal"
    badge_1: "Licensing"
    badge_2: "OpenAI"
    description: "The May 2024 partnership giving OpenAI structured access to Stack Overflow's human-validated technical Q&A via the OverflowAPI."
    url: "https://openai.com/index/openai-and-stack-overflow-partnership/"
    link_text: "View announcement"
  - name: "GitHub Copilot Adoption"
    badge_1: "Metrics"
    badge_2: "GitHub"
    description: "GitHub's report tracking Copilot generating 46% of developers' code on average across all languages (61% in Java)."
    url: "https://github.blog/ai-and-ml/github-copilot/github-copilot-now-has-a-better-ai-model-and-new-capabilities/"
    link_text: "Read blog post"
---

AI training data has entered a new phase. During the first two years of large language model development, labs scraped whatever was publicly available across GitHub, documentation sites, and open forums.

Now buyers are targeting private repositories written before 2025.

One clear example is a listing on [Pangea.ai's code licensing board](https://pangea.ai/code-licensing/companies?id=1376#request). The posting requests private source code repositories committed before 2025, offering $1,000 per 1 million tokens. The cutoff date and the focus on private repositories point to practical problems facing model developers: data contamination, copyright exposure, benchmark leakage, and the collapse in data diversity caused by AI tools themselves.

![Flat editorial illustration of an archival code ledger and Git branch history stamped pre-2025](/assets/images/posts/covers/pre_ai_code_cover.jpg "The pre-AI code market")

---

## Why pre-2025 code has value

Between 2022 and 2024, developer workflows shifted toward automated assistance. In an update on Copilot adoption, [GitHub reported](https://github.blog/ai-and-ml/github-copilot/github-copilot-now-has-a-better-ai-model-and-new-capabilities/) that Copilot was already generating 46% of developers' code files on average across all languages, rising to 61% in Java.

Because developers push assisted code directly to public repositories, public code written after 2023 contains large amounts of synthetic logic. When a new model trains on the output of an older model, the training process runs into data contamination.

A July 2024 study published in *Nature* by researchers from Oxford, Cambridge, Toronto, and Imperial College examined this dynamic in detail: [*"AI models collapse when trained on recursively generated data"*](https://www.nature.com/articles/s41586-024-07566-y). The authors demonstrated that recursive training leads to model collapse:
1. Rare patterns and edge cases drop out of the training distribution first.
2. The model converges on repetitive, average outputs.
3. Errors and minor hallucinations accumulate until subsequent models produce unusable responses.

In software engineering, synthetic code introduces specific operational risks. An analysis of 153 million lines of code published by [GitClear](https://www.gitclear.com/coding_on_copilot_data_shows_downward_pressure_on_code_quality) found that the expansion of AI assistants corresponded with increased code churn and a drop in refactoring activity. Generated code can pass unit tests while introducing structural repetition. It does not reflect the operational trade-offs made by engineers keeping software stable under real user workloads.

Code committed before 2025 acts as an unpolluted baseline. It contains genuine commit histories, debugging steps, architectural trade-offs, and edge cases handled by humans without machine intervention.

---

## Why Git commit history matters more than static files

When data brokers buy access to repositories, they rarely want a zip file of the latest release. They want the full `.git` directory, including commit logs, pull request metadata, and incremental diffs.

There is a technical reason for this distinction. Modern coding agents such as SWE-agent, Devin, and Cursor do not write whole applications from scratch in a single prompt. They operate by reading a repository, diagnosing an issue, and applying targeted diffs to existing files.

Training a model on static source code only teaches it the destination. It shows what a finished service looks like, but it reveals nothing about how that service arrived at its current structure. 

In contrast, Git commit history teaches the model the trajectory of software development:
* A commit message records human intent in plain language.
* The associated diff shows the exact edits required to fulfill that intent.
* A sequence of commits shows how an engineer identified a defect, tested an initial fix, reverted an approach that broke backwards compatibility, and settled on an optimal patch.

This commit-level granularity provides supervised training data for multi-step reasoning. If an AI lab wants an autonomous agent that can resolve real GitHub issues, training on paired commit messages and diffs is far more valuable than training on static file trees.

---

## Benchmark leakage and private codebases

Public code suffers from another structural problem: evaluation contamination.

When researchers evaluate coding models on public benchmarks like HumanEval, MBPP, or SWE-bench, the results are frequently compromised. Because foundation models ingest vast web crawls, they often absorb benchmark solutions during pre-training. A model that scores 85% on a public benchmark may simply be recalling solutions it saw during training rather than reasoning through logic.

Private repositories offer model developers an unpolluted evaluation suite. If an AI lab evaluates a model against a private codebase written in 2021, researchers know with certainty that the model never encountered those proprietary endpoints, internal schemas, or architectural constraints during pre-training. Private repositories provide an honest measurement of whether a model can navigate unfamiliar software.

---

## Existing data licensing deals

The Pangea posting reflects a wider transition from open web scraping to commercial data deals:

* **Stack Overflow and model labs:** In May 2024, OpenAI announced a [direct partnership with Stack Overflow](https://openai.com/index/openai-and-stack-overflow-partnership/) through the OverflowAPI. The value of that dataset was not raw code snippets, but the human feedback loop: upvotes, downvotes, revisions, and accepted answers accumulated over 15 years.
* **Reddit's data licensing:** In February 2024, [Reuters reported](https://www.reuters.com/technology/reddit-ai-content-licensing-deal-with-google-sources-say-2024-02-22/) that Reddit signed an artificial intelligence content licensing agreement with Google worth roughly $60 million annually, followed by a separate data agreement with OpenAI. Forums like `r/programming` and `r/sysadmin` contain long records of operational troubleshooting that cannot be produced synthetically.
* **Curated code repositories:** The BigCode initiative, led by ServiceNow and Hugging Face, published the architecture for [The Stack v2](https://arxiv.org/abs/2402.19173). The project specifically tracks software licensing, repository metadata, and provenance to give model builders clean training corpora with explicit opt-out controls.
* **Specialized human data platforms:** Firms like Scale AI and Surge AI employ experienced software engineers to write original code, draft detailed technical rationale, and solve novel algorithmic tasks under controlled environments where AI autocomplete tools are explicitly banned. Labs pay premium hourly rates for these datasets because verified human problem-solving cannot be fabricated at scale.

---

## How much code is 1 million tokens?

The advertised rate of $1,000 per 1 million tokens sounds substantial, but the payout depends on how tokenization pipelines count source code.

In programming languages:
* 1 token represents roughly 3 to 4 characters (about half a keyword or variable name).
* 1 formatted line of code contains 10 to 14 tokens on average.
* 1 million tokens equals roughly 70,000 to 100,000 lines of code.

| Component | Pipeline handling | Net token credit |
| :--- | :--- | :--- |
| `node_modules/` and `vendor/` | Stripped completely | 0 tokens |
| `package-lock.json` and lockfiles | Discarded entirely | 0 tokens |
| `dist/`, `build/`, compiled assets | Discarded entirely | 0 tokens |
| Auto-generated schemas and migrations | Filtered out | 0 tokens |
| Original proprietary logic and Git diffs | Kept after deduplication | ~5,000 to 15,000 tokens ($5 to $15) |

A repository that takes up 100 MB on disk rarely contains 100 MB of original source code. Ingestion systems discard dependency folders, compiled bundles, and lockfiles (which can contain hundreds of thousands of tokens of dependency graphs on their own). What remains after deduplication is the core handwritten logic, meaning an average personal project might yield between $10 and $50.

### Deduplication and filtering pipelines

Data ingestion engines apply rigorous filtering before calculating token payouts:
1. **Deduplication:** Algorithms such as MinHash and Locality-Sensitive Hashing (LSH) detect near-duplicate files. If five repositories use the same open-source helper function or framework scaffolding, that code is counted once and credited only to the original source.
2. **Boilerplate removal:** Standard configuration files, continuous integration scripts, and boilerplate directory setups are excluded from compensation metrics.
3. **Language density differences:** Verbose languages like Java or C++ produce more tokens per feature than compact languages like Python or Go. However, pipelines normalize code volume against syntactic complexity to prevent low-information bloat from inflating payouts.

---

## The legal limits on selling old code

Even developers with repositories from 2020 face legal constraints when attempting to license them.

### Employment contracts and client ownership
Most code written by engineers does not belong to them:
* **Salaried employees:** Standard employment agreements assign intellectual property to the employer under work-for-hire doctrines. Employees cannot legally license internal tools, service code, or scripts written during their tenure.
* **Agency and freelance contractors:** Client Master Services Agreements (MSAs) and Statements of Work assign deliverables to the client. Unless a contract contains explicit terms reserving proprietary ownership of custom modules, the paying client holds the rights.
* **Personal projects:** Personal side projects rarely reach 100,000 lines of original proprietary logic without incorporating open-source libraries that carry their own license terms.

### Indemnification clauses
Data broker agreements require contributors to sign legal warranties:
1. You certify that you hold complete, unencumbered ownership of the code.
2. You certify that the repository does not contain third-party copyleft code (such as GPL or AGPL libraries) without required attribution.
3. You certify that no client trade secrets or confidential materials are included.

If an employer or client discovers their internal repository was submitted to an AI training pipeline, the contributor bears the legal liability. The risk of violating an employment contract or non-disclosure agreement outweighs small token payouts.

### Forgotten credentials in Git history
Older private repositories frequently contain credentials committed before environment variable hygiene became standard practice:
* Database connection strings and local secrets.
* Old API keys and internal test tokens.
* Internal server names and internal team addresses.

Automated regex filters catch standard key formats, but custom configuration files and embedded connection strings can slip through. Once weights absorb those tokens, the data cannot be extracted from the model.

---

## Regulatory pressure and data provenance

The shift toward paid code licensing is also driven by regulatory compliance.

Under the European Union's Artificial Intelligence Act, providers of general-purpose AI models must document and publish comprehensive summaries of the data used to train their systems. Indiscriminate web scraping leaves AI companies vulnerable to copyright claims and compliance penalties in European jurisdictions.

In the United States, ongoing copyright litigation regarding open-source code ingestion has made tech companies cautious about using unverified repositories without documented consent. Licensing private code through formal contracts establishes a clear chain of custody. The data broker verifies repository provenance, tracks contributor consent, and provides the AI lab with commercial indemnity against future infringement claims.

---

## Who can actually participate?

Because individual contributors face strict ownership limits, the market for private code licensing is practical for two specific groups:

1. **Founders of closed startups:** Companies that shut down where founders retained the intellectual property. The software has no operational future, making licensing a way to recover residual value.
2. **Software agencies with proprietary tooling:** Development firms that created internal scaffolding, starter platforms, or deployment engines under client contracts that explicitly preserved the agency's ownership.

For individual developers, pre-2025 code has high value to AI labs precisely because it is rare and uncontaminated. The same contracts that made it valuable ensure that very few people have the legal right to sell it.
