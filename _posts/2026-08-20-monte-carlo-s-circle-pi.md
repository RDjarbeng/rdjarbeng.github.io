---
date: 2026-08-21T00:39:00+02:00
published: false
author: Richard
category: Research
tags:
  - Math
title: Monte Carlo's circle Pi
image: ''
image_alt: ''
layout: post
card_items: []
---

We’re using a Monte Carlo simulation to guess the value of the mathematical constant π (pi).

What is π?
π is the ratio of a circle’s circumference to its diameter. It also appears in the formula for the area of a circle:

\[
\text{Area of a circle} = \pi r^{2}
\]

For a circle of radius 1, the area is simply π.

Why a unit square and a quarter‑circle?

Unit square – we pick random points \((x, y)\) where both \(x\) and \(y\) are between 0 and 1. The square’s area is \(1 \times 1 = 1\).
Quarter‑circle – the part of a circle of radius 1 that lies in the same first‑quadrant region (where \(x \ge 0, y \ge 0\)). Its area is one‑fourth of the full circle’s area:
\[
\text{Area of quarter‑circle} = \frac{\pi \cdot 1^{2}}{4} = \frac{\pi}{4}.
\]

The idea
If we throw a huge number of random points uniformly into the unit square, the fraction of points that land inside the quarter‑circle will be roughly equal to the ratio of the two areas:

\[
\frac{\text{points inside}}{\text{total points}} \approx \frac{\text{area of quarter‑circle}}{\text{area of square}} = \frac{\pi/4}{1} = \frac{\pi}{4}.
\]

Turning the fraction into π
We simply multiply that fraction by 4:

\[
\pi_{\text{estimate}} = 4 \times \frac{\text{inside count}}{\text{total count}}.
\]

The more points we sample, the closer the estimate gets to the true value of π (≈ 3.14159).

What the plot shows

Red points → inside the quarter‑circle.

Blue points → outside the circle but still inside the square.


The visual density of red vs. blue gives a quick sense of the ratio, but the actual numeric estimate comes from the counts, not from looking at the picture.
