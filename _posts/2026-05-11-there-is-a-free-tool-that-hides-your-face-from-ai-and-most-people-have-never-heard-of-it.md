---
date: 2026-05-11T11:59:00+02:00
published: false
author: Richard
category: Research
tags:
  - AI
  - Fawkes
title: There Is a Free Tool That Hides Your Face From AI, and Most People Have Never Heard of It
image: ''
image_alt: ''
layout: post
card_items: []
---

Every time you post a photo online, there is a chance someone is collecting it without your knowledge. Not to share it, not to comment on it, but to teach a machine what your face looks like.

Companies like Clearview AI built facial recognition systems by scraping billions of images from social media and the public web, without asking anyone for permission. The result is a world where your face can potentially be identified in a crowd, matched to your name, and linked to your online history, all from a single photo you posted years ago.

A team of researchers at the University of Chicago built a tool to fight back. It is called Fawkes.

## What Fawkes Does

Fawkes is a free, open source tool developed by the SAND (Security, Algorithms, Networking and Data) Laboratory at the University of Chicago. It takes your photos and makes tiny changes to the pixels, changes so small they are completely invisible to the human eye. The altered image looks identical to the original when you look at it. To a facial recognition system, however, it tells an entirely different story.

The process is called image cloaking.

When a facial recognition company scrapes a cloaked image and uses it to train their model, they are essentially teaching the system a corrupted version of what you look like. The model learns the wrong face. So when someone later tries to identify you using a real, unaltered photo taken in public, the system fails. It either cannot recognize you at all, or it matches you to a completely different person.

The name Fawkes comes from the Guy Fawkes mask, made famous by the graphic novel "V for Vendetta," a symbol of resistance against surveillance and control. The researchers chose it deliberately.

## How the Technology Works

Facial recognition systems are built on a type of artificial intelligence called deep learning. These models are trained on thousands or millions of photos and learn to identify the specific visual features that make a face unique: the spacing of the eyes, the shape of the jaw, the geometry of the nose.

Fawkes exploits a known weakness in how these models learn. By applying what researchers call adversarial perturbations to an image, it shifts the model's understanding of your face toward a completely different identity, a process described as a "poison attack." Unlike more obvious methods of defeating facial recognition (wearing masks, applying face paint, or using reflective glasses), a poison attack works invisibly and in advance.

The approach is fundamentally different from simply hiding your face. Fawkes does not prevent a facial recognition system from attempting to scan your photo. Instead, it corrupts the information that system learns from your photo, so that all future attempts to recognize you using that model will fail.

The tool runs entirely on your computer. Nothing is uploaded to a server, and no data leaves your device.

## What the Research Found

The original paper, published at the USENIX Security 2020 symposium, reported strong results. In controlled testing, Fawkes provided 95%+ protection against recognition regardless of the method used to train the model. In real experiments run directly against commercial facial recognition services from Microsoft (Azure Face API), Amazon (Rekognition), and Face++, the team reported 100% success.

Even in harder scenarios where some uncloaked photos of the same person were mixed into the training data, Fawkes maintained over 80% protection.

By May 2022, the tool had surpassed 840,000 downloads. It received coverage from the New York Times, The Verge, and publications across Europe and Asia.

## The Honest Limitations

Fawkes is a meaningful tool, but it is not a complete solution, and the researchers have been upfront about that.

The most significant limitation is that cloaking only works going forward. If a facial recognition company has already collected your photos and trained a model before you started using Fawkes, that existing model is unaffected. The cloaking only corrupts models that are trained on your altered images after you start using it.

There is also the problem of photos you cannot control. Friends and family may post unaltered photos of you, and you have no way to cloak those. If enough uncloaked photos are available, a company can still build a workable model.

The security landscape has also shifted since the tool launched in 2020. New model architectures and training techniques have emerged, and some research has shown that certain newer facial recognition models can reduce the effectiveness of cloaking perturbations designed for older systems. One independent analysis noted that the protection offered by Fawkes can be bypassed if the attacker uses a sufficiently different model architecture than the one Fawkes was designed to target.

Some researchers have argued that because a cloaked photo cannot be updated after it has already been posted and scraped, any cloaking system faces a fundamental challenge: it has to remain effective against all future models, including ones that do not yet exist at the time of cloaking.

The SAND Lab researchers acknowledged these constraints from the beginning. As co-creator Emily Wenger put it: "We're not under any delusions that this will solve all privacy violations. But the purpose of Fawkes is to provide individuals with some power to fight back themselves, because right now, nothing like that exists."

## Who It Is For

Fawkes is best understood as a proactive measure, not a guarantee. It is most useful for people who are starting to share photos online and want to make it harder for unauthorized systems to build an accurate model of their face from that point forward.

It is free, available for Windows, macOS, and Linux, and requires no advanced technical knowledge to use. The tool offers three protection modes (low, mid, and high), with higher modes adding stronger but slightly more visible alterations to the image.

For anyone concerned about the unconsented use of their photos in AI training pipelines, it is one of the few practical tools available that does not require you to stop sharing photos entirely.

## The Bigger Picture

Fawkes sits at an important intersection of technology and policy. The researchers themselves have noted that technical tools alone are not sufficient. Legislation restricting the unauthorized scraping and use of personal images for facial recognition training remains one of the most effective long term solutions.

Until that legislation exists at meaningful scale, tools like Fawkes offer individuals a way to take some control over how their images are used, even if that control is partial.

The tool is available for download at [sandlab.cs.uchicago.edu/fawkes](https://sandlab.cs.uchicago.edu/fawkes). The full academic paper is available via USENIX Security 2020.
