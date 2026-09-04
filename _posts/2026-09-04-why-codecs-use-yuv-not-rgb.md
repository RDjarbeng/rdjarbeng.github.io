---
layout: post
title: "Why Codecs Use YUV, Not RGB"
date: 2026-09-04T10:00:00+02:00
published: false
author: Richard
category: Technology
tags:
  - video
  - codecs
image: ''
image_alt: ''
card_items: []
---

Digital displays render images with red, green, and blue subpixels, but virtually every modern video codec transmits and stores video in a color space based on luma and chroma, such as $$Y'CbCr$$. The reason comes down to human biology rather than display hardware. The human retina contains two primary types of photoreceptor cells: rods and cones. Approximately 120 million rods detect luminance and contrast, while roughly 6 to 7 million cones detect color. Because rods outnumber cones by roughly twenty to one, human vision resolves fine patterns and sharp edges through variations in brightness rather than differences in hue.

## Separating brightness from color

RGB packages color and brightness together across all three channels. A change in red, green, or blue alters both the perceived brightness and the color of a pixel simultaneously. By converting RGB to $$Y'CbCr$$ through a linear matrix transform, codecs decouple brightness ($$Y'$$, luma) from two color-difference components ($$Cb$$, blue minus luma, and $$Cr$$, red minus luma). Once brightness is isolated from color, compression systems can process them independently.

## The math behind 4:2:0 subsampling

This separation enables chroma subsampling, most commonly $$4:2:0$$. In full-resolution 8-bit RGB or $$4:4:4$$ $$Y'CbCr$$, each pixel requires 24 bits: 8 bits for each of the three channels. Over a $$2 \times 2$$ block of four pixels, uncompressed video requires 96 bits. 

With $$4:2:0$$ subsampling, the codec preserves all four luma samples at full resolution, but downsamples the chroma channels by half horizontally and half vertically. That leaves one $$Cb$$ sample and one $$Cr$$ sample shared across the entire four-pixel block. The four pixels require 32 bits for luma ($$4 \times 8$$) and 16 bits for chroma ($$1 \times 8 + 1 \times 8$$), totaling 48 bits. This reduces the average bit depth from 24 bits per pixel down to 12 bits per pixel, cutting raw data volume by 50 percent before spatial or temporal compression even begins.

## Why RGB wastes bandwidth

Transmitting video in full RGB forces compression algorithms to spend bitrate on high-frequency color variations that the human visual cortex filters out. By eliminating redundant chromatic information at the capture and encoding stage, codecs such as H.264, HEVC, and AV1 can dedicate processing power, motion estimation, and transform blocks to the luma channel. Displays convert the decoded $$Y'CbCr$$ signal back to RGB for presentation, but across transmission networks, YUV ensures bandwidth goes where human eyes can actually perceive detail.
