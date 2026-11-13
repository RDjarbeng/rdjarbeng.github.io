---
date: 2026-11-12T14:56:00+02:00
published: false
author: Richard
category: Science & Technology
tags: []
series: ''
series_part: null
key_points: []
title: Why Vision Transformers Are So Important
image: ''
image_alt: ''
layout: post
card_items: []
---



The VISION TRANSFORMERS, 2020 marker on the Timeline isn't just hype—on this map, ViT (An Image is Worth 16×16 Words, 2020) has 57 internal citations (second only to ResNet's 88), and it marks the exact inflection point where the field splits:

Replaced CV-specific inductive biases with scale: Before ViT, vision depended on convolutional locality, translation equivariance, and hand-tuned pipelines (anchors, NMS). ViT showed that slicing an image into 16×16 patches and feeding them to a standard Transformer scales cleanly with data and compute.
Unified vision with language models: Because images became token sequences in the same architecture as text, ViT directly unlocked CLIP (2021, 41 internal citations), BLIP-2 / LLaVA, and modern multimodal LLMs—which is why Vision-language & multimodal on your map has 0 papers before 2020 and 21 papers in 2023–2026.
Enabled self-supervised & promptable vision: Global self-attention made masked image modeling (MAE, DINO/DINOv2), end-to-end detection (DETR, 39 internal citations), hierarchical backbones (Swin Transformer, 41 internal citations), and promptable segmentation (SAM) possible with minimal task-specific engineering.
