---
date: 2026-10-22T09:56:00+02:00
published: false
author: Richard
category: AI
tags: []
series: ''
series_part: null
key_points: []
title: Modeling agent tasks - Agent economy
image: ''
image_alt: ''
layout: post
card_items: []
---

How would a way an agent approaches a task be modeled in the agent economy. Can you make it a straight line graph where the agent goes from start to finish. How would you model a task that cannot be completed no matter how many tokens, what about  a task that takes a large number of tokens, what about a task which doesn't even depend on tokens? Is there a mathematical representation of this? Does this visualization help, how many paths are there from start to expected result? Does an approximate result work?

Let's start with a few assumptions.

1. The model will start at a fixed node called the start
2. The model will end at an end node called the goal/ final output
3. There will be a path from the start to the end goal

If we model the agent task as a diagram, perhaps a graph going from tasks to a final output. We now have a start node that moves left to right and finally lands in a goal node. There are an infinite number of nodes that may be inserted between the start and goal node. 
To make our diagram complete we are going to have some level of branching from node to node that can also be infinite. Now you have a kind of directed graph that shoots forth in different directions with multiple interconnected nodes that converge on an end goal.

Now let's take a look at the way our AI agents work. 
starting from a start goal they work on a number of tasks until they reach an end goal that the user is satisfied with. for the purposes of this modeling we will denote it goal', (goal prime) for the goal the model produces, vs goal which is the actual intended goal the user intended.

From [anthropic](https://www.anthropic.com/research/writing-tools-for-agents): 

> In computing, deterministic systems produce the same output every time given identical inputs, while _non-deterministic_ systems—like agents—can generate varied responses even with the same starting conditions
