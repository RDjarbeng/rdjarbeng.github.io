---
date: 2025-09-19T00:14:00
published: false
author: Richard
categories:
  - Technology
tags:
  - Agent57
  - Reinforcement Learning
  - AI
  - Atari57
  - Research paper
  - Google deepmind
title: Agent57 for Reinforcement Learning beats Atari benchmark
image: ''
layout: post
---
Post about Agent 57 

Are reinforcement learning models cheating? By performing well on certain parts of a benchmark and poorly on others but still get a good enough score? It would seem so. This paper claims that many RL models that were considered state of the art were in fact not performing well on certain games in the Atari57 benchmark but were doing well on a subset of those games. This resulted in an increase in the summary statistics such as the mean and total points but produced models that were terrible at playing certain games such as montezuma’s revenge. In an earlier post I had spoken about the situation that occurs when you incorporate RL in games(insert link)

About the Atari57 bench mark (generate here)

This paper Agent 57 from Google deepmind claims to have created a model that performs on par with humans across all atari57 games beating previous models. 

They include in the paper a discussion on previous models such as R2D2 and DQN. I find their post (Their blog post: -[https://deepmind.google/discover/blog/agent57-outperforming-the-human-atari-benchmark/](https://deepmind.google/discover/blog/agent57-outperforming-the-human-atari-benchmark/)) on their blog to be much more intuitive and easy to follow. Here they discuss the changes that were made stepping through time to reach the performance of Agent57 by looking at the earliest models such as those that were the first to include memory, and optimize for an agent that can switch from exploration to exploitation.

One of the key contributions in the paper is a way of training a model controller that can select whether the agent should go into an explorative or exploitative state. Some previous RL models would start with an exploration state at the beginning as they explored their environment then once the agent had explored for a while they would switch to an exploration state that would take actions that would maximise it’s reward only without checking to explore other options.

Comments on the paper: This paper in my opinion advances reinforcement learning by providing a model that performs well generally across all the games in the bench mark, it also provides a model for switching between explore and exploit. My only complaint is that the blog seems to be more informative and easier to read and without it, reading the paper alone for non-technical readers might be a bit daunting. Personally I have come across people who gave the paper a bad rating because they couldn’t see it’s potential impact or use cases from reading the paper alone, but I think a paper should not be judged on real world contributions, although they are important but it’s contribution to it’s field as well. 

Timeline of reinforcement learning: DQN from deepmind around 2017 had  HNS of 70

As noted in the presentation (https://www.youtube.com/watch?v=VQEg8aSpXcU) there is a general linear trend increasing across the years


## **Agent57: Key Concepts Explained**

## **What is CHNS?**

First of all what is human normalized score? Before going to challenging **CHNS** stands for **Challenging Human-Normalized Score**. In the context of Agent57, CHNS refers to the percentage of Atari 57 benchmark games where an agent's score exceeds the human-normalized baseline, but specifically on a set of particularly hard games known as the "Challenging Set." When Agent57’s CHNS is reported as 100%, it means the agent surpassed human performance on all 57 Atari games, demonstrating consistent, above-human skill across even the most difficult tasks.[proceedings.mlr](http://proceedings.mlr.press/v119/badia20a/badia20a.pdf)

## **State-Action Value Function Parameterization in Agent57**

Agent57 improves learning stability and exploration by **decomposing the state-action value function** (Q-function) into intrinsic and extrinsic parts:

Q(x,a,j;θ)=Q(x,a,j;θe)+βjQ(x,a,h;θi)Q(x, a, j; \theta) = Q(x, a, j; \theta^e) + \beta_j Q(x, a, h; \theta^i)Q(x,a,j;θ)=Q(x,a,j;θe)+βjQ(x,a,h;θi)

Where:

- Q(x,a,j;θe)Q(x, a, j; \theta^e)Q(x,a,j;θe): Value from **extrinsic rewards** (from the environment’s "official" reward signals).


- Q(x,a,h;θi)Q(x, a, h; \theta^i)Q(x,a,h;θi): Value from **intrinsic rewards** (from curiosity or exploration bonuses).


- βj\beta_jβj: Weight determining the level of intrinsic motivation for the j-th policy.[neuralnet+1

](https://www.neuralnet.ai/towards-an-open-source-agent57/)

## **Discounted Extrinsic Returns: What Are They?**

- **Extrinsic returns** are the total rewards an agent collects from the environment’s standard reward function (e.g., points in a game).


- **Discounted extrinsic returns** refer to the sum of these external rewards, but where each reward is **multiplied by a discount factor (γ\gammaγ)** depending on how far in the future it is received.



Mathematically:

Gtextrinsic=∑k=0∞γkrt+kextrinsicG_t^{extrinsic} = \sum_{k=0}^{\infty} \gamma^k r_{t+k}^{extrinsic}Gtextrinsic=k=0∑∞γkrt+kextrinsic

- Here, γ\gammaγ (0 < γ\gammaγ < 1) reduces the weight of future rewards, prioritizing immediate gains.


- In the **random coin game** context, maximizing discounted extrinsic returns means following the optimal path to maximize the official game reward, such as taking the fastest route to collect the coin for a score.[ar5iv.arxiv+1

](https://ar5iv.labs.arxiv.org/html/2003.13350)

## **Augmented Returns: Their Meaning**

- **Augmented returns** are the sum of **extrinsic and weighted intrinsic rewards**:
 raugmented=rextrinsic+βrintrinsicr_{augmented} = r^{extrinsic} + \beta r^{intrinsic}raugmented=rextrinsic+βrintrinsic
- Here, **intrinsic rewards** reflect bonuses for exploring novel or uncertain states, encouraging the agent to seek out new behaviors and avoid stagnation.


- The parameter β\betaβ adjusts how much these curiosity-driven intrinsic rewards matter, allowing the agent to balance exploration and exploitation as needed through training.[vitalab.github+1

](https://vitalab.github.io/article/2020/06/05/Agent57.html)

**In essence:**

- **Discounted extrinsic returns** focus only on the immediate goal as defined by the game.


- **Augmented returns** combine both the official game goals and an exploration bonus, promoting both achievement and discovery.



## **Table: Key Differences**

| **Term** | **Source of Reward** | **Discounting?** | **Contains Intrinsic Bonus?** | **Main Use** |
| Discounted Extrinsic Return | Environment (game's rewards) | Yes (γ\gammaγ) | No | Measures agent’s success at the game’s official objective |
| Augmented Return | Environment + Exploration Bonus | Yes (γ\gammaγ) | Yes (βrintrinsic\beta r^{intrinsic}βrintrinsic) | Encourages both achieving goals and exploring new possibilities |

## **Summary**

- **CHNS** measures how reliably an agent beats the human baseline even on difficult games.


- **Discounted extrinsic returns** are the classic, game-defined, discounted sum of rewards.


- **Augmented returns** add an intrinsic bonus to this sum, encouraging exploration.


- Agent57’s innovation lies in smartly balancing these returns using a meta-controller, leading to its broad, superhuman mastery of Atari games.[acm+3

](https://dl.acm.org/doi/pdf/10.5555/3524938.3524986)

1. [http://proceedings.mlr.press/v119/badia20a/badia20a.pdf](http://proceedings.mlr.press/v119/badia20a/badia20a.pdf)
2. [https://www.neuralnet.ai/towards-an-open-source-agent57/](https://www.neuralnet.ai/towards-an-open-source-agent57/)
3. [https://vitalab.github.io/article/2020/06/05/Agent57.html](https://vitalab.github.io/article/2020/06/05/Agent57.html)
4. [https://ar5iv.labs.arxiv.org/html/2003.13350](https://ar5iv.labs.arxiv.org/html/2003.13350)
5. [https://dl.acm.org/doi/pdf/10.5555/3524938.3524986](https://dl.acm.org/doi/pdf/10.5555/3524938.3524986)
6. [https://arxiv.org/abs/2003.13350](https://arxiv.org/abs/2003.13350)
7. [https://deepmind.google/discover/blog/agent57-outperforming-the-human-atari-benchmark/](https://deepmind.google/discover/blog/agent57-outperforming-the-human-atari-benchmark/)
8. [https://dl.acm.org/doi/10.5555/3524938.3524986](https://dl.acm.org/doi/10.5555/3524938.3524986)
9. [https://www.kdnuggets.com/2020/04/deepmind-agent57-atari-games.html](https://www.kdnuggets.com/2020/04/deepmind-agent57-atari-games.html)
10. [https://www.academia.edu/88171614/Agent57_Outperforming_the_Atari_Human_Benchmark](https://www.academia.edu/88171614/Agent57_Outperforming_the_Atari_Human_Benchmark)
11. [https://www.youtube.com/watch?v=VQEg8aSpXcU](https://www.youtube.com/watch?v=VQEg8aSpXcU)
12. [https://github.com/YHL04/agent57](https://github.com/YHL04/agent57)
13. [http://proceedings.mlr.press/v119/badia20a/badia20a-supp.pdf](http://proceedings.mlr.press/v119/badia20a/badia20a-supp.pdf)
14. [https://neurohive.io/en/news/deepmind-s-agent57-outperforms-humans-on-all-atari-games/](https://neurohive.io/en/news/deepmind-s-agent57-outperforms-humans-on-all-atari-games/)
15. [https://www.reddit.com/r/MachineLearning/comments/fsbi38/200313350_agent57_outperforming_the_atari_human/](https://www.reddit.com/r/MachineLearning/comments/fsbi38/200313350_agent57_outperforming_the_atari_human/)
16. [https://www.alphaxiv.org/overview/2003.13350v1](https://www.alphaxiv.org/overview/2003.13350v1)
17. [https://ufal.mff.cuni.cz/\~straka/courses/npfl122/2223/slides.pdf/npfl122-2223-09.pdf](https://ufal.mff.cuni.cz/~straka/courses/npfl122/2223/slides.pdf/npfl122-2223-09.pdf)
18. [https://ufal.mff.cuni.cz/\~straka/courses/npfl139/2324/slides.pdf/npfl139-2324-10.pdf](https://ufal.mff.cuni.cz/~straka/courses/npfl139/2324/slides.pdf/npfl139-2324-10.pdf)
