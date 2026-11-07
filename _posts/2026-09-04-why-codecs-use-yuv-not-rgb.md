---
layout: post
title: "Why Codecs Use YUV, Not RGB"
date: 2026-09-04T10:00:00+02:00
published: false
author: Richard
category: Computer Vision
tags:
  - Video
  - Codecs
  - FFmpeg
  - Image Processing
  - Hardware Acceleration
description: An exploration of why digital video codecs discard raw RGB in favor of YUV and 4:2:0 chroma subsampling, leveraging human visual biology and silicon decoders.
image: /assets/images/posts/covers/why-codecs-yuv-cover.jpg
image_alt: Editorial illustration showing a video stream splitting into luminance and chrominance channels
key_points:
  - Human visual physiology possesses roughly twenty times more luminance-sensing rod cells than color-sensing cone cells, making the eye far more sensitive to brightness than hue.
  - The Y'CbCr (YUV) color space decouples brightness from color, allowing 4:2:0 chroma subsampling to eliminate 50% of raw data volume before temporal compression begins.
  - Forcing full RGB encoding via libx264rgb inflates bitrates by 2x to 3x with virtually zero perceptible improvement in video fidelity.
  - Dedicated hardware video decoders inside mobile chips and televisions are physically wired for 8-bit yuv420p, making it essential for universal compatibility.
card_items: []
---

A single minute of uncompressed 4K video recorded at 60 frames per second on a smartphone consumes roughly 89 gigabytes of storage in red, green, and blue (RGB). With 3840 by 2160 pixels per frame and 8 bits per color channel, each frame demands 24 bits per pixel, or nearly 25 megabytes. At 60 frames per second, uncompressed RGB exhausts internal storage in minutes and overwhelms common cellular bandwidth. 

Video encoders bypass this data bottleneck before deeper compression algorithms ever run, shrinking that raw data stream down using standard FFmpeg workflows. Understanding this initial reduction reveals why video pipelines behave the way they do, and how command-line tools expose the underlying process. Raw RGB is an inefficient starting point for moving pictures because it ignores human physiology.

## How Human Vision Splits Brightness and Color

Raw RGB is an unsuitable starting point because it treats every color channel as equally important to human vision. In reality, the human retina does not process light with uniform sensitivity. The eye contains roughly 120 million rod cells and only 6 to 7 million cone cells, an imbalance of nearly twenty to one. 

Rods register luminance, meaning the brightness and contrast differences that define edges, silhouettes, and fine surface textures. Cones detect color across red, green, and blue wavelengths. Because rods outnumber cones so dramatically, human vision resolves sharp spatial detail through variations in brightness rather than differences in hue. 

If color resolution drops across neighboring pixels, your visual system fills in the chromatic details without loss of apparent sharpness, provided the underlying brightness pattern remains intact. Storing full-resolution color data for every individual pixel wastes storage on information human eyes cannot actually distinguish. Separating brightness from color eliminates this inefficiency.

## Chroma Subsampling in 4:2:0

Splitting brightness and color into separate streams is exactly what the $$Y'CbCr$$ color space, commonly called YUV, was created to accomplish. In this system, $$Y'$$ represents luma (brightness), while $$Cb$$ and $$Cr$$ represent chroma (blue difference and red difference relative to luma). 

Once brightness stands apart from color, encoders can discard redundant chromatic data through chroma subsampling, most frequently $$4:2:0$$. In a $$2 \times 2$$ block of four adjacent pixels, the encoder keeps all four luma samples at full resolution, but shares a single pair of $$Cb$$ and $$Cr$$ samples across the whole quartet:

```text
4:4:4 Full RGB / YUV vs 4:2:0 Chroma Subsampling Grid
--------------------------------------------------------------------------------
Pixel Block [2x2]      4:4:4 Sampling (Full)      4:2:0 Sampling (Subsampled)
[ P00 ] [ P01 ]  --->  4 Luma (Y0, Y1, Y2, Y3)    4 Luma (Y0, Y1, Y2, Y3)
[ P10 ] [ P11 ]        4 Cb   (B0, B1, B2, B3)    1 Shared Cb (Average)
                       4 Cr   (R0, R1, R2, R3)    1 Shared Cr (Average)
--------------------------------------------------------------------------------
Total Samples:         12 samples (96 bits)       6 samples (48 bits)
Data Savings:          0% Baseline                50% Bandwidth Reduction
--------------------------------------------------------------------------------
```

Instead of storing 12 channel samples (96 bits) across four pixels as raw RGB would, the block stores 4 luma samples and 2 chroma samples (48 bits):

$$
\frac{4 \text{ luma} + 2 \text{ chroma}}{4 \text{ pixels}} \times 8 \text{ bits} = 12 \text{ bits per pixel}
$$

This subsampling cuts raw data volume by 50 percent before spatial or temporal compression begins. Inspecting and controlling this subsampling in everyday practice is straightforward using standard media tooling.

## Practical FFmpeg Workflows

In everyday practice, FFmpeg gives you direct control over that subsampling with a single flag. When encoding video with the standard H.264 encoder, `yuv420p` provides standard 8-bit $$4:2:0$$ planar output:

```bash
ffmpeg -i input.mov -c:v libx264 -pix_fmt yuv420p output.mp4
```

You can inspect the pixel format of an existing file using `ffprobe`:

```bash
ffprobe -v error -select_streams v:0 -show_entries stream=pix_fmt -of default=noprint_wrappers=1:nokey=1 output.mp4
```

The difference becomes striking when you force FFmpeg to preserve raw RGB using `libx264rgb` with `-pix_fmt rgb24`. The encoder spends bitrate compressing high-frequency color variations that human eyes ignore. At matched quality settings, an `rgb24` video file is typically two to three times larger than the `yuv420p` version, while looking virtually identical during normal playback. Hardware decoder pipelines and universal player support further mandate `yuv420p` over `rgb24`.

## Hardware Decoders and Player Compatibility

Media players insist on `yuv420p` because consumer playback hardware is physically built around it. Decoding high-resolution video in software consumes heavy battery power and strains CPU cores. To make smooth playback feasible, dedicated video decoding silicon inside smartphones, televisions, and graphics cards is designed specifically to process 8-bit `yuv420p` with minimal power draw. 

Most consumer browsers and native media players lack hardware decoding support for `rgb24` video streams. Feeding an `rgb24` MP4 into standard players frequently causes black screens, dropped frames, or decode errors.

The default to `yuv420p` is not an accident of history, but a clean match between human visual biology and playback silicon. YUV splits luma from chroma so $$4:2:0$$ subsampling can slice raw frame weight in half, while `ffmpeg -pix_fmt yuv420p` and `ffprobe` give you the exact commands to encode and verify universal playback across modern devices.
