---
date: 2026-03-04T10:35:00+02:00
published: false
author: Richard
category: Web & Software
tags:
  - Computer graphics
  - Web & Software
  - SVG
  - Web Development
  - Performance
title: "Vector Versus Raster: The Mathematical and Architectural Case for Scalable Graphics"
image: /assets/images/posts/covers/vector_versus_raster_graphics_cover.jpg
image_alt: Technical comparison diagram contrasting raster pixel grids and aliasing artifacts with mathematical vector Bézier curves and DOM styling
layout: post
description: An architectural comparison of vector and raster graphics, examining parametric Bézier curves, spatial sampling limits, and DOM-native SVG integration.
key_points:
  - Raster graphics store discrete pixel color arrays, while vector formats describe geometry through parametric mathematical equations.
  - Scaling raster images past native resolution triggers spatial aliasing and blur according to the Nyquist-Shannon sampling theorem.
  - Vector file sizes scale with geometric path complexity rather than screen resolution or display pixel density.
  - Scalable Vector Graphics (SVG) integrate directly into the browser DOM, enabling CSS animations, theme switching, and accessibility.
card_items:
  - name: Parametric Geometry
    description: Cubic Bézier curves evaluate analytically at render time, preserving crisp edges on high-density displays without pixelation.
  - name: Memory Footprint Scaling
    description: Raster memory scales quadratically with resolution, while vector payloads remain lightweight regardless of canvas dimensions.
  - name: DOM Native Capabilities
    description: Embedding SVGs inline allows developers to bind JavaScript events, style strokes via CSS custom properties, and support screen readers.
---
<!-- WRITER NOTE (for the writer only, remove before publishing)
Original draft, kept so you remember where this post was going:

Raster vs  Vector

# Vector versus raster

https://mdn.github.io/learning-area/html/multimedia-and-embedding/adding-vector-graphics-to-the-web/vector-versus-raster.html

# Including vector graphics in HTML

https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Including_vector_graphics_in_HTML

END WRITER NOTE -->

Digital graphics divide into two foundational representations: raster images and vector graphics. On the modern web, choosing the wrong format degrades page load performance, introduces visual blurring on high-density displays, and complicates responsive layout engineering.

Mastering this distinction requires understanding the mathematics of discrete spatial sampling, parametric curve evaluation, and the architectural advantages of integrating Scalable Vector Graphics (SVG) directly into the browser Document Object Model.

| Characteristic | Raster Graphics (JPEG, PNG, WebP, AVIF) | Vector Graphics (SVG, PDF, EPS) |
| :--- | :--- | :--- |
| **Data Representation** | 2D discrete grid of color pixel samples | Continuous parametric equations and coordinate paths |
| **Scaling Behavior** | Resolution-dependent; blurs or pixelates upon magnification | Resolution-independent; renders crisply at arbitrary zoom levels |
| **Payload Scaling** | Scales quadratically with canvas pixel dimensions | Scales with geometric node and path complexity |
| **Primary Domain** | Continuous-tone photography and complex natural textures | UI icons, typography, technical diagrams, and brand logos |

## The Mathematical Duality: Pixels Versus Bézier Curves

The distinction between raster and vector representations stems from signal processing.

### Raster Graphics: Discrete Spatial Sampling

A raster image represents a continuous visual scene $$f(x, y)$$ sampled onto a discrete two-dimensional integer matrix $$I[i, j]$$:

$$I[i, j] = f(i \cdot \Delta x, j \cdot \Delta y), \quad i \in [0, W-1], \; j \in [0, H-1]$$

Each cell (pixel) stores fixed numerical values representing color channels, typically 8 bits per channel across Red, Green, Blue, and Alpha (RGBA).

Because raster representations capture a fixed grid of samples, their quality is governed by the Nyquist-Shannon sampling theorem. When a browser displays a $$200 \times 200$$ pixel PNG image across a $$800 \times 800$$ logical pixel canvas, the spatial frequency of the display exceeds the sampling rate of the image. The rendering engine must interpolate missing intermediate values using algorithms like nearest-neighbor, bilinear, or bicubic filtering.

Nearest-neighbor scaling produces jagged staircase pixelation, while bilinear filtering softens edges into an unsharp blur.

```text
Raster Zoom (Spatial Aliasing):
Original Sample: [xx] -> Upscaled 4x: [x][x][x][x] (Visible pixel blocks)
                                       [x][x][x][x]
```

### Vector Graphics: Parametric Coordinate Primitives

Vector graphics do not store pre-computed pixel grids. Instead, they store mathematical instructions: coordinates, line segments, polygons, circular arcs, and cubic Bézier curves.

A cubic Bézier curve, the core primitive of SVG path elements (`<path d="M... C...">`), is defined parametrically across the interval $$t \in [0, 1]$$ using four control points $$\mathbf{P}_0, \mathbf{P}_1, \mathbf{P}_2, \mathbf{P}_3$$:

$$\mathbf{B}(t) = (1-t)^3 \mathbf{P}_0 + 3(1-t)^2 t \mathbf{P}_1 + 3(1-t) t^2 \mathbf{P}_2 + t^3 \mathbf{P}_3$$

```text
            P1 (Control Handle)
            o
           /
          /   B(t) Parametric Curve
    P0 o-----------------------o P3 (End Point)
        \                     /
         \                   /
          o                 o
          P2 (Control Handle)
```

The browser graphics engine (such as Skia in Chrome or WebRender in Firefox) does not store pixels in memory. When the browser renders the page, GPU fragment shaders evaluate the polynomial equation analytically for the exact pixel density of the user's display. Whether viewed on an old monitor or a 500 DPI mobile screen, the curve renders with sub-pixel antialiasing.

## Memory and Payload Economics

The storage economics of raster and vector formats scale under entirely different constraints:

| Graphic Format | Scaling Variable | File Size Formula | 4K Display Payload Impact |
| :--- | :--- | :--- | :--- |
| **Raster (PNG/WebP)** | Pixel Dimensions | $$\text{Size} \propto \text{Width} \times \text{Height}$$ | Expands quadratically ($$4\times$$ when doubling axes) |
| **Vector (SVG)** | Geometric Complexity | $$\text{Size} \propto N_{\text{nodes}} + N_{\text{curves}}$$ | Remains constant regardless of display resolution |

An uncompressed raster image with dimensions $$W \times H$$ at 32-bit color depth consumes:

$$\text{Memory}_{\text{raw}} = W \times H \times 4 \text{ bytes}$$

Displaying a full-bleed background on a 4K display ($$3840 \times 2160$$) requires over 33 megabytes of raw memory in the GPU frame buffer before compression.

In contrast, a vector illustration containing 50 Bézier curves requires approximately 3 kilobytes of XML text. When gzipped across an HTTP/2 or HTTP/3 connection, the transfer payload drops below 1 kilobyte. The same 1 KB file scales to cover a smartwatch display or an outdoor billboard without a single byte of added data transfer.

## Architectural Advantages of Modern Web SVG

Modern web development leverages SVG as a first-class structural format rather than an isolated external graphic asset. As demonstrated in MDN's interactive [vector versus raster comparison](https://mdn.github.io/learning-area/html/multimedia-and-embedding/adding-vector-graphics-to-the-web/vector-versus-raster.html) and their [SVG integration guide](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Including_vector_graphics_in_HTML), inline SVGs provide significant functional capabilities over traditional image tags.

### 1. Direct Document Object Model Integration

When embedded directly within HTML, SVG elements become part of the DOM tree:

```html
<svg viewBox="0 0 100 100" class="status-indicator" role="img" aria-labelledby="status-title">
  <title id="status-title">System Status: Operational</title>
  <circle cx="50" cy="50" r="40" class="status-circle" />
</svg>
```

Developers can style vector paths using standard CSS custom properties (variables):

```css
.status-circle {
  fill: var(--color-surface, #ffffff);
  stroke: var(--color-primary, #2563eb);
  stroke-width: 4px;
  transition: stroke 0.3s ease, transform 0.3s ease;
}

.status-circle:hover {
  transform: scale(1.05);
  stroke: var(--color-accent, #16a34a);
}

/* Automatic Dark Mode Adaptation */
@media (prefers-color-scheme: dark) {
  .status-circle {
    stroke: #60a5fa;
  }
}
```

A single vector asset automatically responds to responsive breakpoints, theme switches, and interactive hover states without requiring duplicate image downloads or CSS sprite sheets.

### 2. Scriptability and Dynamic Data Visualization

Because SVG nodes emit standard DOM events (`click`, `mouseenter`, `focus`), libraries like D3.js bind data models directly to vector elements. Interactive geographic maps, financial candlestick charts, and scatter plots update their coordinates in response to user inputs without canvas re-rendering overhead.

### 3. Native Accessibility (a11y)

Standard raster image tags rely on a single `alt` attribute string. Complex technical infographics encoded as raster graphics hide their internal structure from screen readers.

SVG supports hierarchical semantic tags, including `<title>`, `<desc>`, and `aria-labelledby`. Screen readers can navigate internal groups (`<g>`), announcing structural chart relationships and data points to visually impaired users.

## When Raster Graphics Win: The Complexity Boundary

Vector graphics are not universally superior. The format encounters severe performance degradation when applied to natural photography and continuous-tone imagery.

| Asset Category | Recommended Format | Technical Rationale |
| :--- | :--- | :--- |
| **Brand Logos and Badges** | Scalable Vector Graphics (SVG) | Infinite scaling without pixelation across all viewports and print |
| **User Interface Controls** | Scalable Vector Graphics (SVG) | Lightweight payloads, CSS theming, and dark mode adaptability |
| **Technical Diagrams and Charts** | Scalable Vector Graphics (SVG) | Searchable DOM text nodes, screen-reader accessibility, and scriptability |
| **Photographic Imagery** | Modern Raster (WebP / AVIF) | High-entropy continuous color transitions and complex natural noise |
| **Pre-Rendered 3D Assets** | Modern Raster (WebP / AVIF) | Raytraced lighting and texture detail impossible to model with curves |

A high-resolution photograph of outdoor scenery contains millions of subtle color shifts, granular textures, and lighting gradients. Attempting to vectorize a photograph forces tracing algorithms to approximate gradients using hundreds of thousands of microscopic polygon paths. 

This results in two failure modes:
1. **Payload Explosion**: A compressed WebP photograph weighing 180 kilobytes expands into an SVG file exceeding 25 megabytes of raw XML path coordinates.
2. **GPU Tessellation Bottlenecks**: The browser graphics pipeline must tessellate every individual path into triangle meshes on the CPU before passing vertices to the GPU. Complex vector files cause significant frame drops and battery drain during scrolling.

For photographic content, modern raster formats like WebP and AVIF (which use intra-frame video compression algorithms like VP9 and AV1) provide superior compression ratios and instantaneous rendering.

## Production Implementation Guidelines

Engineers deploying graphics on production web applications should enforce three practices:

1. **Automate SVG Optimization**: Vector graphics exported from design suites like Figma or Illustrator contain extensive metadata, editor comments, and redundant decimal precision. Running tools like SVGO strips unnecessary attributes and truncates floating-point coordinates to two decimal places, routinely reducing raw SVG sizes by 50 to 70 percent.
2. **Sanitize User-Submitted SVGs**: Because SVG supports inline `<script>` tags, accepting arbitrary SVG file uploads from untrusted users introduces Cross-Site Scripting (XSS) vulnerabilities. Always sanitize user-uploaded vector files using libraries like DOMPurify before rendering them in the DOM.
3. **Use CSS `currentColor`**: Assigning `stroke="currentColor"` or `fill="currentColor"` allows vector icons to inherit their color dynamically from the parent text element, eliminating hardcoded color declarations across icon libraries.

By pairing modern vector mathematics for user interface geometry with optimized raster codecs for photography, web architectures achieve optimal visual fidelity and minimal page weight.
