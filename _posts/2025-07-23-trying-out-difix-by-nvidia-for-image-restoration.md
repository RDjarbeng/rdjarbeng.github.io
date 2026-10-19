---
date: 2025-07-23T14:39:00
published: true
author: Richard
tags:
  - Computer Vision
  - Hugging face
  - Nvidia
  - Difix
title: "Trying NVIDIA's Difix on Blurry Phone Photos: What It Fixes and What It Distorts"
image: /assets/images/difix_cover_image_rd.webp
layout: post
image_alt: "Cover image for Trying NVIDIA's Difix on Blurry Phone Photos: What It Fixes and What It Distorts"
category: "Computer Vision"
---
Difix is an image model from NVIDIA that cleans up blurry or smeared images in a single pass. NVIDIA has a demo on Hugging Face, so I tried it on their example image and then on some blurry photos from my phone. First I show the examples, then I explain what the model was built for, because that helps explain some of the results.

## The example from the demo page

This is the example NVIDIA provides. The first image is the input, the second is what Difix returned.

![Before restoration: blurry example image from the Difix demo](/assets/images/nvidia_difix3d_example1.png "Before restoration")

_Before: the blurry example from the demo page._

![After restoration: the same image after Difix](/assets/images/nvidia_difix3d_example1_restored.webp "After restoration")

_After: sharper edges and more detail._

## My own photos

The rest are pictures I took with my phone, each blurry for a different reason.

The first is Kigali at night, taken from a moving bus, so there is a lot of motion blur.

![Before restoration: Kigali at night with motion blur](/assets/images/test_nvidia_restoration2_kigali.jpg "Before restoration")

_Before: motion blur from a moving bus._

![After restoration: Kigali at night after Difix](/assets/images/nvidia_restoration2_restored_kigali.webp "After restoration")

_After: I think Difix actually fixed (no pun intended) this image to a sufficient degree._

The next is the Margaret Morrison apartments in Pittsburgh. The building in the foreground was slightly out of focus, so it lost detail. The windows barely show any reflection, the glass looks flat, and overall the building does not look great.

![Margaret Morrison apartments, Pittsburgh, before restoration](/assets/images/margaret_morrison_blurred_difix.jpg "Margaret Morrison apartments before restoration")

_Before: the foreground building is out of focus._

![Margaret Morrison apartments, Pittsburgh, after restoration](/assets/images/margaret_morrison_restored_difix.webp "Margaret Morrison apartments after restoration")

_After: the building detail and window reflections come back._

This one surprised me. The details on the building stand out clearly, and the window reflections show up quite nicely.

The last one is, of course, yours truly, taking a self portrait in a mirror. It came out blurry: my eyes, nose, mouth and hands are not clear, and the mirror was not very clean, which left white streaks across the picture.

![Richard's mirror self portrait before restoration](/assets/images/richard_blurred_mirror_difix.jpg "Mirror self portrait before restoration")

_Before: a blurry image that badly needs help to save Richard's face, literally._

![Richard's mirror self portrait after restoration](/assets/images/richard_restored_mirror_difix.webp "Mirror self portrait after restoration")

_After: sharper face and hands, at a cost._

The result here is mixed. It is sharper and clearer. It also looks like an oil painting: the details in the shirt are smudged together, the face is slightly distorted and the fingers look wrong. If I had not taken this picture myself, I would have suspected it was AI generated. Still, it did a decent job with what it was given.

## What Difix was actually built for

The oil painting effect makes more sense once you know what Difix was made for. It was designed for 3D reconstruction rather than for fixing ordinary photos, and comes from a CVPR 2025 paper called [Difix3D+](https://arxiv.org/abs/2503.01774).

Techniques like NeRF and 3D Gaussian Splatting build a 3D scene from a set of photos, and then let you render it from new angles. When you move the camera to an angle the original photos did not cover well, the result is full of blur and smeared artefacts, because the model has to guess what is there. Difix is trained to clean up these renders. In the full pipeline it is used twice: once during reconstruction, to clean up extra views that are fed back into the 3D model, and again at the end to tidy what is left. The paper reports about a twofold improvement in FID, a measure of how realistic images look, over the methods it compares against.

Most diffusion models improve an image over many steps. Difix does it in one step, which is why the demo returns results quickly.

So when I give it a blurry photo, it treats the blur like a bad render and fills in detail that looks believable. For a building, that invented detail is close enough to the real thing. For a face and hands, small mistakes are easy to notice, which is what happened with my selfie.

The [code is on GitHub](https://github.com/nv-tlabs/Difix3D) and the demo is a [Hugging Face space](https://huggingface.co/spaces/nvidia/difix). I appreciate that NVIDIA made both of them public.

## What worked and what did not

The demo is easy to use: you upload an image, wait a few seconds and download the result, and you do not need your own GPU. For blurry photos of buildings and streets, the results were very good.

What I did not like was the input size. The demo works at 1024x576 by default, and I had to resize my photos to that first. Windows Photos would not let me enter those exact dimensions, so it took extra steps. Anything that does not match the expected size can affect the output.

It struggles with people and faces, for the reasons above. I would use it for a blurry landscape or building photo, but I would not use it on a portrait.

## Try it yourself

The space is embedded below, so you can upload your own images.

PS: Update on 10/19/2026: It seems the space has been paused on hugging face and needs a maintainer to restart it. I hope the way it works can at least be seen from the example images I gave.

---
<iframe
	src="https://nvidia-difix.hf.space"
	frameborder="0"
	width="850"
	height="450"
></iframe>
