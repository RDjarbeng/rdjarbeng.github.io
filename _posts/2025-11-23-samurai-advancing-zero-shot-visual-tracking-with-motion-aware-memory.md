---
date: 2025-11-23T16:59:00
author: Richard
category: Research
tags:
  - Computer Vision
  - AI
  - Segment-Anything
  - Samurai
  - segmentation
  - Zero-Shot Learning
  - Visual Tracking Motion-Aware Models
  - Segment Anything Model (SAM)
  - Research
  - Object Detection
title: 'SAMURAI: Advancing Zero-Shot Visual Tracking with Motion-Aware Memory'
image: /assets/images/Samurai_paper_logo.png
image_alt: 'Cover image for SAMURAI: Advancing Zero-Shot Visual Tracking with Motion-Aware Memory'
layout: post
categories:
  - Computer Vision
video: ''
---

Video object tracking sounds simple. You draw a box around something in the first frame and the model follows it for the rest of the video. It gets hard when the scene is crowded with things that look alike, when the object moves fast, or when it disappears behind something for a few seconds. [SAMURAI](https://arxiv.org/abs/2411.11922), from Cheng-Yen Yang and colleagues at the University of Washington, takes Meta's Segment Anything Model 2 (SAM 2) and makes it much better at those cases without any extra training.

![SAMURAI logo](/assets/images/Samurai_paper_logo.png "SAMURAI logo from the paper")

## Where SAM 2 goes wrong

SAM 2 is very good at cutting an object out of an image. For video, it keeps a memory of recent frames and uses it to find the same object in the next one. The authors point to three weaknesses in how it does that:

1. It trusts appearance over motion. In a crowd of similar objects, say one runner among many in matching kit, SAM 2 can jump to whichever candidate looks most like the target, even if that person is on the other side of the frame.
2. Its memory is a fixed window. It stores the most recent frames whatever their quality. If the target was hidden behind something for those frames, the memory fills up with bad examples and the error carries forward.
3. It mostly ignores motion, so fast or sudden movement throws it off.

## What SAMURAI adds

The fix is two ideas that are old by computer vision standards, applied in the right places.

The first is a motion model. SAMURAI runs a Kalman filter on the object's bounding box, tracking its centre, width, height and how fast each is changing. Every frame, SAM 2 proposes several candidate masks with confidence scores. SAMURAI also checks how well each candidate overlaps with where the Kalman filter expected the object to be, and picks the mask with the best combination of the two. A lookalike on the other side of the frame now scores badly, because nothing moves that far in one frame.

The second is a pickier memory. Instead of keeping the last few frames regardless, SAMURAI only stores a frame if the mask confidence, the object score and the motion score all pass a threshold. Frames where the target was half hidden or the prediction was shaky are left out, so they cannot pollute what comes next. It still keeps seven memories, the number SAM 2 was trained with, so the rest of the model works as before.

Neither change needs retraining. SAMURAI plugs into the existing SAM 2 weights, which is what "zero-shot" means here, and the authors say it runs in real time, with speed close to plain SAM 2 on a single RTX 4090.

## How much better it is

The paper reports a 7.1% gain in AUC on LaSOT-ext and a 3.5% gain in average overlap on GOT-10k, and results on LaSOT that compete with trackers trained specifically on tracking data. For a sense of scale, LaSOT has 1,400 videos across 70 object categories, averaging around 2,500 frames each. LaSOT-ext adds harder categories. GOT-10k has over 10,000 clips of real moving objects from more than 560 classes. These are long, messy videos, which is exactly where the fixed memory window hurts SAM 2 most.

This comparison of SAMURAI and SAM 2 was shared on [X](https://x.com/i/status/1859937514691371031). Watch what happens to SAM 2 when similar objects cross paths.

<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="en" dir="ltr">SAMURAI vs. MetaAI's SAM 2!<br><br>Traditional visual object tracking struggles in crowded, fast-moving, or self-occluded scenes, as does SAM2.<br><br>Meet SAMURAI: a completely open-source adaptation of the Segment Anything Model for zero-shot visual tracking!<br><br>Here's why it's a… <a href="https://t.co/4Gx7mWDfba">pic.twitter.com/4Gx7mWDfba</a></p>&mdash; Akshay 🚀 (@akshay_pachaar) <a href="https://twitter.com/akshay_pachaar/status/1859937514691371031?ref_src=twsrc%5Etfw">November 22, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Where it could be used

Anything that needs to follow one object through a cluttered scene: a player through a match for sports analysis, a person through crowd footage, a vehicle or pedestrian for a robot or car to react to. Because there is no training step, you can try it on your own footage straight away.

## Trying it

The code is on [GitHub](https://github.com/yangchris11/samurai) under the Apache 2.0 licence. You need a GPU machine with Python 3.10+ and PyTorch. Install SAM 2 from the repo, download the SAM 2.1 checkpoints with the included script, then run `scripts/demo.py` with a video and a text file holding the first frame's bounding box as `x,y,w,h`.

My one complaint is that there is no online demo. A Hugging Face space where you could upload a clip and draw a box would let far more people test it. For now you need a GPU and some patience with the setup.

## References

1. [Paper: arXiv:2411.11922](https://arxiv.org/abs/2411.11922)
2. [SAMURAI project page](https://yangchris11.github.io/samurai/)
3. [SAMURAI on GitHub](https://github.com/yangchris11/samurai)
