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
image: /assets/images/posts/covers/why-codecs-yuv-cover.jpg
image_alt: "Editorial illustration showing a video stream splitting into luminance and chrominance channels"
card_items: []
---

A single minute of uncompressed 4K video recorded at 60 frames per second on a smartphone would consume roughly 89 gigabytes of storage if kept in red, green, and blue (RGB). Every 4K frame contains 3840 by 2160 pixels. Storing 8 bits per channel across red, green, and blue requires 24 bits for every individual pixel, amounting to nearly 25 megabytes per frame. At 60 frames per second, a phone recording raw RGB would exhaust its internal storage in minutes and overwhelm common cellular bandwidth during streaming. Video encoders resolve this data bottleneck by converting raw RGB to a luma and chroma color space before running compression algorithms.

![Why Codecs Use YUV, Not RGB](/assets/images/posts/covers/why-codecs-yuv-cover.jpg)

## How human vision splits brightness and color

The conversion relies on how the human retina detects light. The human eye has approximately 120 million rod cells and only 6 to 7 million cone cells. Rods detect luminance, the brightness and contrast differences that define edges, silhouettes, and texture. Cones detect color, split across red, green, and blue wavelengths. Because rods outnumber cones by roughly twenty to one, human vision resolves fine spatial detail through variations in brightness rather than differences in hue. If color resolution drops across neighboring pixels, human vision fills in the chromatic data, provided the underlying brightness pattern remains sharp.

## Chroma subsampling in 4:2:0

Video encoders convert RGB into $$Y'CbCr$$, commonly called YUV. In this representation, $$Y'$$ represents luma (brightness), while $$Cb$$ and $$Cr$$ represent chroma (blue difference and red difference relative to luma). Separating brightness from color allows encoders to discard color data through chroma subsampling, most frequently $$4:2:0$$. In a $$2 \times 2$$ block of four pixels, the encoder retains all four luma samples at full resolution, but shares a single pair of $$Cb$$ and $$Cr$$ samples across the four pixels.

Instead of storing 12 channel samples (96 bits) across four pixels, the block stores 4 luma samples and 2 chroma samples (48 bits):

$$
\frac{4 \text{ luma} + 2 \text{ chroma}}{4 \text{ pixels}} \times 8 \text{ bits} = 12 \text{ bits per pixel}
$$

This subsampling cuts raw data volume by 50 percent before spatial or temporal compression begins.

## Practical FFmpeg workflows

FFmpeg sets pixel formats with the `-pix_fmt` option. When encoding video with the standard H.264 encoder, `yuv420p` provides standard 8-bit $$4:2:0$$ planar output:

```bash
ffmpeg -i input.mov -c:v libx264 -pix_fmt yuv420p output.mp4
```

You can inspect the pixel format of an existing file using `ffprobe`:

```bash
ffprobe -v error -select_streams v:0 -show_entries stream=pix_fmt -of default=noprint_wrappers=1:nokey=1 output.mp4
```

If you force FFmpeg to preserve raw RGB using `libx264rgb` with `-pix_fmt rgb24`, the encoder spends bitrate compressing high-frequency color variations that human eyes ignore. At matched quality settings, an `rgb24` video file is typically two to three times larger than the `yuv420p` version, while looking virtually identical during normal playback.

## Hardware decoders and player compatibility

Beyond storage efficiency, `yuv420p` is required for reliable playback. Dedicated video decoding chips inside smartphones, televisions, and graphics cards are designed to process 8-bit `yuv420p` in silicon with minimal battery consumption. Most consumer browsers and native media players lack hardware decoding support for `rgb24` video streams. Feeding an `rgb24` MP4 into standard players frequently causes black screens, dropped frames, or decode errors. Encoders default to `yuv420p` because it matches the architecture of both human eyes and playback hardware.
