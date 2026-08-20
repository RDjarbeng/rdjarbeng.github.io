---
date: 2026-08-20T15:23:00+02:00
published: false
author: Richard
category: Technology
tags:
  - Nvidia
title: NVIDIA Releases Alpamayo 2 Super Under an Open Commercial License
image: ''
image_alt: ''
layout: post
card_items: []
---

# Unlocking Production Robotaxis: NVIDIA Releases Alpamayo 2 Super Under an Open Commercial License

Autonomous vehicle (AV) development is shifting from rigid, rules-based software stacks to foundation models capable of reasoning through rare, unpredictable real-world scenarios. Addressing this long-tail challenge, NVIDIA has announced the release of **Alpamayo 2 Super**, a 34-billion-parameter open Vision-Language-Action (VLA) model designed to bring advanced reasoning and decision-making to robotaxis and autonomous vehicles ([NVIDIA Blog](https://blogs.nvidia.com/blog/alpamayo-2-super-open-model-now-available/)).

Unlike earlier research-only releases, NVIDIA is making Alpamayo 2 Super and the entire Alpamayo model family available under the Linux Foundation’s **OpenMDW-1.1** permissive commercial license ([NVIDIA Blog](https://blogs.nvidia.com/blog/alpamayo-2-super-open-model-now-available/)). This allows automakers, AV startups, and commercial fleets to fine-tune, modify, and deploy these frontier models in production ([NVIDIA Technical Blog](https://developer.nvidia.com/blog/generate-trajectories-reasoning-traces-and-auto-labels-with-nvidia-alpamayo-2-super/)).

---

## Technical Architecture: Reasoning Meets Diffusion

Alpamayo 2 Super combines multi-modal visual reasoning with precise motion trajectory planning ([NVIDIA Technical Blog](https://developer.nvidia.com/blog/generate-trajectories-reasoning-traces-and-auto-labels-with-nvidia-alpamayo-2-super/)):

* **Core Reasoner**: Built on the 32-billion-parameter **NVIDIA Cosmos 3 Super Reasoner** and post-trained with reinforcement learning ([NVIDIA Technical Blog](https://developer.nvidia.com/blog/generate-trajectories-reasoning-traces-and-auto-labels-with-nvidia-alpamayo-2-super/)).
* **Action Expert**: A 2-billion-parameter diffusion-based decoder that converts the model’s internal reasoning into a smooth, future vehicle trajectory ([NVIDIA Technical Blog](https://developer.nvidia.com/blog/generate-trajectories-reasoning-traces-and-auto-labels-with-nvidia-alpamayo-2-super/)).
* **360-Degree Surround Perception**: The model processes synchronized video feeds from up to seven surround cameras alongside natural language context and ego-motion history ([NVIDIA Technical Blog](https://developer.nvidia.com/blog/generate-trajectories-reasoning-traces-and-auto-labels-with-nvidia-alpamayo-2-super/)).

---

## Five Unified Outputs for Transparent AV Workflows

In complex driving situations—such as unprotected left turns, merging into heavy traffic, or encountering unpredictable pedestrians—black-box models lack interpretability. Alpamayo 2 Super produces five tightly coupled outputs in a single pass to ensure transparency and auditability ([NVIDIA Blog](https://blogs.nvidia.com/blog/alpamayo-2-super-open-model-now-available/)):

1. **Planned Trajectory**: Future path coordinates for vehicle control ([NVIDIA Technical Blog](https://developer.nvidia.com/blog/generate-trajectories-reasoning-traces-and-auto-labels-with-nvidia-alpamayo-2-super/)).
2. **Chain-of-Causation (CoC) Traces**: Human-readable step-by-step reasoning explaining *why* a specific decision was made ([NVIDIA Blog](https://blogs.nvidia.com/blog/alpamayo-2-super-open-model-now-available/)).
3. **Meta-Actions**: Discrete driving intent classifications (e.g., yield, lane-change, stop) ([NVIDIA Technical Blog](https://developer.nvidia.com/blog/generate-trajectories-reasoning-traces-and-auto-labels-with-nvidia-alpamayo-2-super/)).
4. **Reasoning Auto-Labels**: Automated causal annotations for raw fleet video, cutting data labeling timelines from months to days ([NVIDIA Blog](https://blogs.nvidia.com/blog/alpamayo-2-super-open-model-now-available/)).
5. **Visual Question Answering (VQA) with 2D Grounding**: Answers to scene queries linked directly to bounding regions in camera frames ([NVIDIA Technical Blog](https://developer.nvidia.com/blog/generate-trajectories-reasoning-traces-and-auto-labels-with-nvidia-alpamayo-2-super/)).

---

## The Cloud-to-Car Deployment Model

Rather than running 34-billion-parameter models directly on vehicle edge computers, NVIDIA advocates a **Cloud-to-Car architecture** ([NVIDIA Blog](https://blogs.nvidia.com/blog/alpamayo-2-super-open-model-now-available/)):

* **In the Cloud**: Alpamayo 2 Super serves as a frontier teacher model for synthetic data generation, automated dataset curation, closed-loop simulation, and teacher-student knowledge distillation ([NVIDIA Technical Blog](https://developer.nvidia.com/blog/generate-trajectories-reasoning-traces-and-auto-labels-with-nvidia-alpamayo-2-super/)).
* **In the Vehicle**: Distilled smaller models—or cost-efficient variants like **Alpamayo 1.5** and **Alpamayo 1**—are deployed on embedded hardware for real-time, low-latency inference ([NVIDIA Blog](https://blogs.nvidia.com/blog/alpamayo-2-super-open-model-now-available/)).

---

## Benchmark Performance & Industry Validation

On autonomous driving reasoning benchmarks, Alpamayo 2 Super sets a new standard ([NVIDIA Blog](https://blogs.nvidia.com/blog/alpamayo-2-super-open-model-now-available/)):

* **LingoQA Reasoning Benchmark**: Scored **79.2** on the Lingo-Judge metric, ranking **#1** out of nearly 40 evaluated models ([NVIDIA Technical Blog](https://developer.nvidia.com/blog/generate-trajectories-reasoning-traces-and-auto-labels-with-nvidia-alpamayo-2-super/)). It outperformed Qwen2.5-VL 72B by 17.0 points, Gemini 2.5 Pro by 15.1 points, and GPT-4o by 23.2 points ([NVIDIA Blog](https://blogs.nvidia.com/blog/alpamayo-2-super-open-model-now-available/)).
* **Trajectory Accuracy**: Achieved a `minADE₆` open-loop trajectory prediction error of **0.911 meters** at 6.4 seconds ([NVIDIA Technical Blog](https://developer.nvidia.com/blog/generate-trajectories-reasoning-traces-and-auto-labels-with-nvidia-alpamayo-2-super/)).
* **Closed-Loop Evaluation**: Attained an AlpaSim score of **1.50 ± 0.13** across 910 simulation scenarios from the PhysicalAI-AV-NuRec dataset ([NVIDIA Technical Blog](https://developer.nvidia.com/blog/generate-trajectories-reasoning-traces-and-auto-labels-with-nvidia-alpamayo-2-super/)).
* **Safety & Regulatory Compliance**: CoC reasoning traces integrate with NVIDIA Halos workflows and align with **ISO/PAS 8800** safety frameworks ([NVIDIA Blog](https://blogs.nvidia.com/blog/alpamayo-2-super-open-model-now-available/)). Industry partners like Foretellix are deploying reference validation platforms to verify Operational Design Domain (ODD) coverage using Alpamayo models ([Foretellix Analysis](https://www.foretellix.com/nvidia-alpamayo-2-super/)).

---

## An Expanding Open Physical AI Ecosystem

The Alpamayo family has reached over **500,000 downloads** on Hugging Face ([NVIDIA Blog](https://blogs.nvidia.com/blog/alpamayo-2-super-open-model-now-available/)). It is supported by an open toolkit containing:

* **NVIDIA AlpaSim**: Closed-loop driving simulator ([NVIDIA Blog](https://blogs.nvidia.com/blog/alpamayo-2-super-open-model-now-available/)).
* **NVIDIA AlpaGym**: High-throughput reinforcement learning framework ([NVIDIA Blog](https://blogs.nvidia.com/blog/alpamayo-2-super-open-model-now-available/)).
* **Physical AI Open Datasets**: Datasets and training recipes for fine-tuning custom models ([NVIDIA Blog](https://blogs.nvidia.com/blog/alpamayo-2-super-open-model-now-available/)).

Developers can access model weights, code, and documentation directly on [Hugging Face](https://huggingface.co/nvidia/Alpamayo2-Super) to begin building next-generation autonomous driving systems ([NVIDIA Blog](https://blogs.nvidia.com/blog/alpamayo-2-super-open-model-now-available/)).
