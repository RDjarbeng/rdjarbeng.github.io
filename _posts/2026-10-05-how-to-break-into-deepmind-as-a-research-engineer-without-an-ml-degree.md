---
date: 2026-10-05T11:30:00+02:00
published: true
author: Richard
category: Technology
tags:
  - Artificial Intelligence
  - Machine Learning
  - Career
  - Software Engineering
  - DeepMind
title: How to Break into DeepMind as a Research Engineer Without an ML Degree
image: /assets/images/posts/covers/how-i-got-a-job-at-deepmind-without-an-ml-degree.jpg
image_alt: Flat vector illustration showing a software engineer transitioning into an AI research engineer
layout: post
card_items:
  - name: Original Article by Aleksa Gordić
    alt: Aleksa Gordic Medium Post
    badge_1: Story
    badge_2: Career
    description: Aleksa Gordić recounts his detailed path from software engineering at Microsoft to a Research Engineer role at DeepMind.
    url: https://medium.com/@gordicaleksa/how-i-got-a-job-at-deepmind-as-a-research-engineer-without-a-machine-learning-degree-1a45f2a781de
    link_text: Read on Medium
  - name: The AI Epiphany (YouTube)
    alt: The AI Epiphany YouTube Channel
    badge_1: Video
    badge_2: Tutorials
    description: Aleksa's educational channel breaking down seminal papers, graph neural networks, transformers, and ML interview prep.
    url: https://www.youtube.com/@TheAIEpiphany
    link_text: Visit Channel
  - name: Aleksa's PyTorch Implementations
    alt: GitHub PyTorch Repositories
    badge_1: Code
    badge_2: Open Source
    description: Open-source repository containing clean, from-scratch PyTorch implementations of landmark deep learning architectures.
    url: https://github.com/gordicaleksa
    link_text: View GitHub
---

Breaking into frontier AI labs like DeepMind often feels like entering an exclusive guild reserved for PhDs with decades of publication history. Yet Aleksa Gordić made that exact transition without a formal machine learning degree, moving from a standard software engineering role at Microsoft directly into DeepMind as a Research Engineer.

![From Software Engineer to DeepMind](/assets/images/posts/covers/how-i-got-a-job-at-deepmind-without-an-ml-degree.jpg)

His account offers an exceptionally grounded roadmap for anyone writing software who wants to move closer to the research frontier. Instead of treating machine learning credentials as gatekeeping barriers, his path reveals how software craftsmanship and deliberate, public learning create an edge that traditional academic credentials often miss.

## The Research Engineer Distinction

Understanding the role of a Research Engineer (RE) is the first hurdle. Elite AI labs do not hire REs to simply run notebooks or train toy models. 

Frontier labs need engineers who can take complex mathematical papers and translate them into stable, performant, distributed systems:

1. **Research Scientists** formulate novel hypotheses, derive mathematical foundations, and design experiments.
2. **Research Engineers** bridge theoretical design and scalable execution. They build distributed training loops, optimize GPU kernels, implement novel architectures from scratch, and debug subtle numerical instabilities when models diverge.

Traditional computer science degrees teach solid software principles, but they rarely expose students to matrix calculus, optimization theory, or tensor operations. Conversely, pure research degrees often lack rigorous software engineering disciplines like testing, clean modular design, profiling, and distributed systems architecture. That gap is where a dedicated software engineer can shine.

## The Strategy: Build in Public and Implement from Scratch

Aleksa did not rely on passive resume drops or generic certifications. He adopted a high-leverage playbook anchored around proof of competence:

### 1. Re-implementing Seminal Papers from Scratch
Reading a machine learning paper gives an illusion of comprehension. True comprehension arrives when you implement the forward pass, loss calculations, and custom layers line by line in PyTorch without high-level library abstractions.

By tackling foundational architectures, including Transformers, Graph Neural Networks, and generative models, Aleksa developed intimate familiarity with tensor dimensions, memory constraints, and common implementation pitfalls. When interviewers asked about architectural nuances, his answers reflected real debugging scars rather than memorized theory.

### 2. Creating Public Explanations
Through his YouTube channel (*The AI Epiphany*) and technical breakdowns, Aleksa documented what he learned as he went. 

Teaching a concept forces you to eliminate fuzzy assumptions. If you cannot explain self-attention or gradient accumulation simply, you do not understand it well enough. This public trail accomplished two things: it cemented his technical foundation and established undeniable public proof of his skills.

### 3. Systematic Math and Theory Foundations
Skipping foundational mathematics is a fatal mistake for research roles. Aleksa rebuilt his mathematical fluency systematically:
* **Linear Algebra**: Matrix factorizations, eigenvalues, singular value decomposition, and vector spaces.
* **Multivariate Calculus & Optimization**: Gradient descent dynamics, Jacobian and Hessian matrices, stochastic optimizers, and learning rate schedules.
* **Probability & Statistics**: Maximum likelihood estimation, Bayesian priors, information theory, and distribution modeling.

Instead of browsing abstract math textbooks without context, he tied every mathematical theorem directly back to why neural network weights update or why loss landscapes behave the way they do.

## Surviving the Frontier AI Interview Loop

Interviews for Research Engineer positions test both software engineering rigour and deep machine learning intuition. Aleksa prepared for each phase with deliberate structure:

* **Coding & Algorithmic Problem Solving**: Standard data structures and algorithmic complexity (`$$O(N)$$`, `$$O(\log N)$$`) remain a mandatory baseline. Strong SWEs already hold an advantage here.
* **ML Domain Coding**: Writing tensor operations, implementing custom loss functions, and optimizing data loading pipelines on tight timelines without syntax crutches.
* **Research and System Debugging**: Diagnosing training failures, detecting vanishing gradients, addressing memory bottlenecks, and optimizing distributed communication primitives across multiple compute nodes.
* **Deep Paper Discussions**: Demonstrating the ability to dissect recent papers, critique experimental setups, and debate alternative architectural choices with active researchers.

## Core Takeaways for Software Engineers

For engineers looking to replicate this trajectory, the playbook boils down to three straightforward principles:

1. **Leverage Your Engineering Muscle**: Code quality, debugging stamina, and systems intuition are rare assets in research environments. Lean into them.
2. **Prioritize Depth Over Breadth**: Mastering three papers by coding them from zero beats skimming fifty papers on arXiv.
3. **Leave Verifiable Artifacts**: Code repositories, benchmarked implementations, and clear technical write-ups prove your capabilities long before an interviewer opens your resume.
