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
title: How to Break into AI Without a Degree
image: /assets/images/posts/covers/how-to-break-into-ai-without-a-degree.jpg
image_alt: Flat vector illustration showing a software engineer transitioning into AI and machine learning engineering without a degree
layout: post
card_items:
  - name: Aleksa Gordić's Original Story
    alt: Aleksa Gordic Medium Post
    badge_1: Story
    badge_2: Career
    description: Aleksa Gordić's original account of breaking into AI research engineering without a formal machine learning degree.
    url: https://medium.com/@gordicaleksa/how-i-got-a-job-at-deepmind-as-a-research-engineer-without-a-machine-learning-degree-1a45f2a781de
    link_text: Read Story
  - name: The AI Epiphany (YouTube)
    alt: The AI Epiphany YouTube Channel
    badge_1: Video
    badge_2: Tutorials
    description: Aleksa's companion video breakdown covering his exact self-taught curriculum, paper implementations, and interview pipeline.
    url: https://www.youtube.com/watch?v=SgaN-4po_cA
    link_text: Watch Video
  - name: Aleksa's GitHub Repositories
    alt: Aleksa Gordic GitHub
    badge_1: Code
    badge_2: Open Source
    description: Open-source PyTorch implementations of seminal papers including GAT, Transformers, DCGAN, and DQN.
    url: https://github.com/gordicaleksa
    link_text: View Repositories
---

Entering artificial intelligence often looks impossible without a master's degree, a PhD, or years inside elite academic research labs. Yet one of the clearest case studies of breaking into frontier AI engineering comes from Aleksa Gordić, who transitioned from an electrical engineering background in Serbia into a software role at Microsoft, and ultimately landed a Research Engineer position at DeepMind without holding a machine learning degree.

![Breaking into AI Without a Degree](/assets/images/posts/covers/how-to-break-into-ai-without-a-degree.jpg)

His path was neither glamorous nor immediate. It was an exercise in self-designed curricula, public accountability, and relentless iteration after multiple high-profile rejections.

## The Starting Point: Late Exposure and Early Failures

Aleksa did not write his first line of code until age 19. His undergraduate studies at the Faculty of Electrical Engineering in Belgrade focused primarily on analog and digital electronics, with programming representing only a small slice of his courses.

When he decided to pivot to software engineering in 2017, he realized traditional engineering knowledge did not prepare him for technical hiring loops. After landing a student internship in Germany, he applied to big tech firms and hit a wall:

* He failed an interview with Facebook in December 2017.
* He interviewed with Microsoft and was rejected.
* He interviewed with NVIDIA in 2018 and failed again.

Rather than giving up, he treated each rejection as a diagnostics report. He bought *Cracking the Coding Interview*, studied core algorithms and data structures, and practiced competitive programming. In 2018, he earned a spot in a machine learning summer camp run by Microsoft engineers in Belgrade, which paved the way to an offer on the Microsoft HoloLens team.

## The Pivot to AI at Microsoft

Surrounded by computer vision algorithms on the HoloLens project, Aleksa began studying machine learning in his spare time. He started with classic Andrew Ng Coursera courses, but his initial progress was low-intensity while balancing full-time software engineering duties.

The turning point came when Microsoft management recognized his self-study efforts and shifted his internal role from Software Engineer to Machine Learning Engineer, even sponsoring him to attend ICCV. That exposure convinced him to take self-directed AI research seriously, leading him to structure a disciplined, year-and-a-half study plan.

## The Self-Study System: Macro and Micro Cycles

Instead of dabbling randomly across tutorials, Aleksa structured his learning around structured iterations:

* **Macro Cycles (2 to 3 months each)**: Dedicated exclusively to a single subfield of machine learning.
* **Micro Cycles**: Split into two distinct operational modes:
  * **Input Cycles**: Immersing in high-level blogs and videos first, followed by reading dense research papers and textbook chapters.
  * **Output Cycles**: Producing verifiable public work. This included releasing open-source PyTorch implementations of seminal papers, recording video walkthroughs on his YouTube channel (*The AI Epiphany*), and writing summary articles on Medium.

Over eighteen months, he applied this framework across six successive topics:

1. **Neural Style Transfer (NST)**: Driven by his personal interest in visual art, he spent four and a half months digging into PyTorch, CNNs, and optimization techniques. He open-sourced three projects: the original NST paper, real-time fast NST, and video NST, alongside his first YouTube tutorials.
2. **Deep Dream**: A six-week dive into feature visualization and dream representations, resulting in his own implementation and video breakdown.
3. **Generative Adversarial Networks (GANs)**: Implemented three projects: the vanilla GAN paper, conditional GANs, and Deep Convolutional GANs (DCGAN).
4. **Transformers**: To master the foundation of modern NLP and vision models, he implemented and open-sourced the original *Attention Is All You Need* paper from scratch, building a German-to-English translation system.
5. **Graph Machine Learning**: Focused on Graph Neural Networks, where he implemented the Graph Attention Network (GAT) paper and built a popular tutorial series. This work became the turning point for his career.
6. **Reinforcement Learning**: Implemented Deep Q-Networks (DQN) for Atari games, and dissected seminal papers including AlphaGo, AlphaGo Zero, and MuZero.

## How the Referral Actually Happened

Cold messaging recruiters at top AI labs rarely works. Aleksa's breakthrough came directly through the open-source artifacts he had built.

In mid-2020, while preparing to dive into Graph Neural Networks, he reached out on LinkedIn to Petar Veličković, a staff research scientist at DeepMind and the primary author of the Graph Attention Network paper. To Aleksa's surprise, Veličković was already aware of his content and encouraged him to reach out during his research.

When Aleksa completed his clean PyTorch implementation of GAT and shared it with the community, he had already built a genuine technical rapport. In April 2021, during a casual call where Aleksa mentioned he was ready to apply to DeepMind, Veličković submitted an internal referral on the spot. Within minutes, an interview was scheduled.

Aleksa offers two concrete recommendations on referrals for non-traditional candidates:
1. **Build genuine, mutually helpful relationships**: Never spam employees asking for favors or unearned referrals. Offer assistance, discuss technical work, and engage with their research directly.
2. **Contribute to their open-source projects**: Spend a few months submitting pull requests and fixing issues in repositories maintained by the target team. Consistent value creation makes internal referrals natural.

## The Interview Loop: Rejection and Recovery

Because the referral moved so quickly, Aleksa had to prepare for the DeepMind interview pipeline on short notice. He organized his review across four disciplines:
* **Computer Science & Algorithms**: Reviewing algorithmic textbooks and *Cracking the Coding Interview*.
* **Mathematics for Machine Learning**: Reviewing the *Mathematics for Machine Learning* textbook covering linear algebra, calculus, and probability.
* **Machine Learning Fundamentals**: Testing derivations and core architectural trade-offs.
* **AGI and Research Background**: Reading published papers from every scheduled interviewer to understand their research perspectives, alongside reviewing behavioral questions.

He passed his first five interview rounds. On the final day, he faced two remaining interviews and failed.

His immediate takeaway was the danger of putting all your hopes on a single company. Hiring pipelines have noise, and even qualified candidates get turned down. However, because his interview performance across the broader loop was technically strong, DeepMind recruiters rerouted him to a different team. Four interviews later, he received an offer to join as a Research Engineer.

## The Core Lesson

Aleksa Gordić's path illustrates that entering AI without a formal degree is not about shortcuts or hype. It requires:

1. **Systematic self-curricula** that balance reading theory with writing code.
2. **Re-implementing papers from scratch** to build tangible intuition for why models fail or succeed.
3. **Public artifacts** (open-source implementations, technical breakdowns) that demonstrate competence and create organic connections with researchers.
