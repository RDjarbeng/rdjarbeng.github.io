---
date: 2026-11-13T17:23:00+02:00
published: false
author: Richard
category: Science & Technology
tags: []
series: ''
series_part: null
key_points: []
title: How small on-device models are doing (late 2026)
image: ''
image_alt: ''
layout: post
card_items: []
---





| Class | Leaders | Notes |
| \~1B | Qwen3.5 0.8B, LFM2.5 1.2B, Granite 4 1B | Phone and CPU models. FunctionGemma (270M) is a tool-calling-only option. |
| \~2B | **Gemma 4 E2B**, **Qwen3.5 2B**, **LFM3 1.7B** | Gemma 4 E-models are Google’s phone line and also take images and audio. |
| \~4B | **Qwen3.5 4B** (the most-cited all-rounder), Gemma 4 E4B, Phi-4-mini, Nemotron 3 nano 4B, SmolLM3 3B | Phi-4-mini is older but still strong at reasoning. SmolLM3 is fully open, including its training data. |
| Small MoE | LFM2.5 8B (\~1B used per token) | Bigger model’s knowledge at small-model speed |



- **Hybrid architectures** like LFM’s keep context memory small, so long documents become cheap.
- **Mixture-of-experts models** use only about 1B parameters per token.
- **Low-bit weights:** models trained to survive 4-bit compression, and ternary models like `bonsai-2`.
- **Built-in speculative decoding:** the `-mtp` tags.
- **Small models trained for one job:** agents, tool calling, or yes/no “decision” models.
