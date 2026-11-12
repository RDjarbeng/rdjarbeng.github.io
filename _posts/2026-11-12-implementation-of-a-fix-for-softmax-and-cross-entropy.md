---
date: 2026-11-12T14:24:00+02:00
published: false
author: Richard
category: Science & Technology
tags: []
series: ''
series_part: null
key_points: []
title: Implementation of A Fix for Softmax and Cross-Entropy
image: ''
image_alt: ''
layout: post
card_items: []
---

[https://arxiv.org/abs/2610.31642](https://arxiv.org/abs/2610.31642)

\### Baseline Summary

\- \*\*Node:\*\* \`Fixed Softmax and Cross-Entropy Implementation and Baseline\` (\`6d2affb6-f838-460f-9a52-b8c91aa87fb1\`)

\- \*\*Status:\*\* Complete \`\<run id="a73fac5b-1716-4391-908b-0a93b926ad25" />\`

\- \*\*Headline Findings:\*\*

  1\. \*\*Exact Zero-Sum Conservation:\*\* In hard-target cross-entropy, Fixed CE maintains exact zero-sum gradients ($\sum_k g_k = 0.0$) and preserves target gradients past the $c\_{32} \approx 16.6$ precision cliff, whereas Standard CE target gradients collapse to $0.0$ (\<file path="test_numerical_verification.py" />).

  2\. \*\*Grokking Dynamics ($a + b \pmod{31}$):\*\* Fixed CE reaches $100.0\\%$ train memorization and $78.0\\%$ test accuracy, with margin advancing smoothly ($m = 15.59$) toward theoretical equilibrium $m^\star = \log(1/\epsilon) \approx 18.42$ without slingshot spikes (\<file path="grokking.py" />).

  3\. \*\*Zero Distillation Drift ($a + b \pmod{53}$):\*\* Fixed Soft CE maintains exact parameter stability ($\text{KL} = 0.00$, $100.0\\%$ test accuracy), eliminating the gradient noise floor that causes drift in Standard Soft CE ($\text{KL} = 1.23 \times 10^{-5}$) (\<file path="distillation.py" />).

  4\. \*\*Artifacts & Reports:\*\* Clean publication vector figures and structured results are stored in \<file path="artifacts/fig1_numerical_bugs.svg" />, \<file path="artifacts/fig2_grokking_slingshot.svg" />, \<file path="artifacts/fig3_distillation_stability.svg" />, and \<file path="artifacts/implementation_and_verification_report.md" />.

\---

\### Potential Next Experiments

With the baseline frozen, we can branch child experiments to explore:

1\. \*\*Precision Sweep ($\epsilon \in \\{10^{-8}, 10^{-12}, 10^{-16}\\}$ across bf16, fp32, fp64):\*\* Replicating Table 1 of the paper to test where standard CE stalls at $c\_{16} \approx 5.5$, $c\_{32} \approx 16.6$, and $c\_{64} \approx 36.7$.

2\. \*\*Modular Polynomials without Weight Decay ($a^2 + b^2 \pmod{97}$):\*\* Replicating Figure 2 (bottom row), where hitting $c\_{32}$ causes standard CE accuracy to collapse from $61\\%$ to $23\\%$, while fixed CE continues to $85\\%$.

3\. \*\*Alternative Loss Comparisons:\*\* Benchmarking against Zero-Sum Projection (Liu et al., 2026) and StableMax (Prieto et al., 2025).
