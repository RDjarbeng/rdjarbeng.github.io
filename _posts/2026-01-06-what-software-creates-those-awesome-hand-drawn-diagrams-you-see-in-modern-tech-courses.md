---
date: 2026-01-06T14:40:00+02:00
published: false
author: Richard
category: Web & Software
tags:
  - Web & Software
  - Diagramming
  - Developer Tools
  - Design
  - Software Architecture
title: "Tools for Hand-Drawn System Architecture Diagrams: Excalidraw, tldraw, and Progressive Animation Workflows"
image: /assets/images/posts/covers/hand_drawn_diagram_tools_cover.jpg
image_alt: Overview of hand-drawn system architecture whiteboard software comparing Excalidraw, tldraw, and progressive video animation workflows
layout: post
description: A technical guide to the software powering modern hand-drawn technical diagrams, analyzing Rough.js line perturbation, tldraw vector splines, and progressive video recording pipelines.
key_points:
  - Hand-drawn sketch aesthetics in technical education reduce cognitive friction and signal conceptual flexibility compared to rigid corporate UML diagrams.
  - Excalidraw utilizes the open-source Rough.js library to programmatically generate wobbly, organic vector paths using Perlin noise offsets.
  - The tldraw canvas engine computes pressure-sensitive polygon outlines around parametric splines, offering smooth handwriting dynamics.
  - Technical educators produce step-by-step video lessons by grouping canvas elements and recording incremental reveals in OBS Studio.
card_items:
  - title: Algorithmic Sketching
    content: Rather than drawing manual strokes with a stylus, engines like Rough.js perturb straight geometric paths into organic hand-drawn lines on HTML5 canvas.
  - title: Progressive Layering
    content: Structuring infrastructure components into hierarchical groups permits educators to reveal complex topologies one subsystem at a time.
  - title: Production Pipeline
    content: Combining open-source whiteboards with OBS Studio screen capture and DaVinci Resolve produces studio-grade lectures without motion graphics software.
---

Anyone who has followed contemporary cloud computing courses, DevOps walkthroughs, or system design breakdowns over recent years has likely encountered a distinct visual style. Technical educators like Adrian Cantrill, ByteByteGo, and modern engineering YouTubers have largely abandoned corporate PowerPoint decks and sterile Visio charts. In their place stands an engaging, sketch-driven visual language: slightly wobbly rectangular borders, hand-written typography, custom cloud vendor icons, and progressive step-by-step reveals that unpack complex distributed systems piece by piece.

This visual transformation is not an accident of graphic design. It reflects deliberate cognitive engineering. Understanding the software tools and rendering mathematics behind this style allows developers and instructors to replicate this aesthetic across their own technical documentation and video presentations.

| Diagramming Paradigm | Era & Representative Software | Cognitive & Visual Characteristics |
| :--- | :--- | :--- |
| **Rigid Enterprise UML** | 1990s to 2000s (Rational Rose, Visio) | Intimidating, formal, heavy arrow semantics, high cognitive barrier |
| **Web Vector Boxes** | 2010s (Lucidchart, Draw.io Standard Mode) | Clean but clinical, corporate aesthetic, static presentation slides |
| **Algorithmic Sketching** | 2020s (Excalidraw, tldraw) | Approachable, organic lines, progressive canvas reveals, high engagement |

## The Cognitive Psychology of Hand-Drawn Aesthetics

Formal Unified Modeling Language (UML) specifications and corporate enterprise architecture diagrams communicate finality. When an engineer views a perfectly straight, razor-sharp box with a corporate gradient, the brain interprets the system as a finished, inflexible monolith.

In contrast, hand-drawn diagrams communicate a different psychological signal: work in progress. Sketchy lines and hand-lettered text mirror what senior engineers draw on physical conference room whiteboards during architectural brainstorming sessions. By softening the formal barrier, hand-drawn visuals reduce cognitive anxiety, encourage viewers to question design choices, and make dense distributed networks accessible to learners.

## The Software Engines Behind the Sketch

The modern hand-drawn aesthetic does not require drawing talent or expensive digital drawing tablets. The hand-crafted look is generated algorithmically through open-source browser whiteboards:

| Pipeline Phase | Mathematical & Algorithmic Transformation | Rendered Graphic Result |
| :--- | :--- | :--- |
| **Geometric Definition** | `Rectangle(x=10, y=10, w=200, h=100)` | Pure mathematical polygon vertices |
| **Rough.js Perturbation** | Adds Perlin noise to coordinates, generates double-pass overlapping strokes and stochastic hatch fills | Algorithmic hand-drawn simulation |
| **Canvas Rasterization** | HTML5 Canvas or SVG `<path>` raster output | Organic, hand-crafted architectural diagram element |

### 1. Excalidraw: The Standard for Technical Architecture

[Excalidraw](https://excalidraw.com) remains the most widely deployed open-source whiteboard in developer education. Built using React and HTML5 Canvas, it defaults to a recognizable hand-drawn aesthetic.

- **The Rough.js Core:** Excalidraw's distinctive visual identity comes from [Rough.js](https://roughjs.com/), an algorithmic drawing library created by Preet Shihn. When a user requests a straight line between two coordinates, Rough.js does not draw a single linear segment. Instead, it generates two slightly offset, overlapping paths perturbed by Perlin noise, simulating the natural drift of a human hand drawing with a felt marker.
- **Community Icon Repositories:** The platform hosts extensive community-built libraries containing official AWS, Azure, Google Cloud, and Kubernetes icons, pre-styled to match the sketchy line weight.
- **Data Portability:** Excalidraw stores canvas state as human-readable JSON payloads, allowing diagrams to be embedded directly into markdown files or version-controlled inside Git repositories.

### 2. tldraw: Modern Vector Spline Dynamics

[tldraw](https://tldraw.com), designed by Steve Ruiz, represents a contemporary evolution of the infinite canvas. While sharing the informal spirit of Excalidraw, its underlying rendering pipeline differs fundamentally.

- **The Perfect-Freehand Algorithm:** Rather than perturbing straight lines, tldraw's drawing engine utilizes the `perfect-freehand` library. It treats stylus or mouse inputs as parametric splines, calculating variable-width polygon meshes based on simulated velocity and pressure. The result is fluid, calligraphic strokes that feel closer to a gel pen on paper.
- **Infinite Dot Grid Canvas:** The interface features a subtle dot grid that snaps nodes into alignment without forcing rigid box constraints.
- **Component Embeddability:** tldraw is engineered as a headless React library (`@tldraw/tldraw`), enabling teams to embed interactive whiteboards directly into custom web applications.

### 3. diagrams.net (draw.io) with Sketch Styling

For organizations with strict governance policies requiring offline desktop software or enterprise cloud storage integration, [diagrams.net](https://app.diagrams.net) provides a bridge between corporate precision and informal styling.

By selecting any standard geometric shape or official cloud connector and enabling the **Rough** style property in the formatting panel, the application applies an SVG turbulence filter. This allows architects to maintain exact orthogonal connector routing while adopting the friendlier hand-sketched look.

| Feature Matrix | Excalidraw | tldraw | diagrams.net |
| :--- | :--- | :--- | :--- |
| **Stroke Engine** | Rough.js | Perfect-Freehand | SVG Filter / mxGraph |
| **Aesthetic Style** | Wobbly Sketch | Fluid Calligraphic | Hybrid Enterprise |
| **Cloud Icon Packs** | Community Libraries | Built-in & Custom | Complete Official |
| **Code Embeds** | JSON & SVG | React Component | XML, SVG, HTML |
| **Cost Model** | Free Open-Source | Free Open-Source | Free Open-Source |

## The Video Production Pipeline: Producing Progressive Reveals

The smooth animations observed in high-end courses rarely use heavy motion graphic suites like Adobe After Effects. Professional course creators achieve dynamic visual pacing through simple, repeatable desktop capture workflows:

| Production Phase | Software Tool | Step-by-Step Workflow |
| :--- | :--- | :--- |
| **1. Canvas Setup** | Excalidraw or tldraw | Construct complete diagram, then group elements into hierarchical subsystems (Network Core, Subnets, Compute) |
| **2. Presentation Capture** | OBS Studio | Set 1080p / 60 FPS window capture and sequentially unhide groups using keyboard shortcuts |
| **3. Final Assembly** | DaVinci Resolve or CapCut | Synchronize voiceover narration with visual reveals, ripple-edit pauses, and insert subtle transition cues |

### Step 1: Hierarchical Layer Grouping

Before recording, construct the complete system architecture diagram in its final, comprehensive state. Next, group individual elements into logical narrative chapters:

- **Group 1 (Foundation):** Network boundaries, virtual private clouds (VPCs), and regional availability zones.
- **Group 2 (Routing):** Internet gateways, route tables, and load balancers.
- **Group 3 (Compute & Storage):** Microservices, database clusters, and message queues.
- **Group 4 (Security & Threat Actors):** Firewalls, IAM roles, and external request traffic.

### Step 2: Screen Capture with OBS Studio

Launch [OBS Studio](https://obsproject.com/) and configure a display capture source targeted at the browser canvas window. Using keyboard shortcuts (such as `Ctrl+G` to group/ungroup or custom canvas hide/unhide plugins), record a continuous 60 FPS video track while sequentially revealing diagram components in sync with your lecture notes.

### Step 3: Audio Synchronization

Import the screen capture video into a non-linear editor such as DaVinci Resolve. Cut the timeline to align each visual reveal with spoken explanations. By eliminating dead mouse movement and accelerating pauses, the final video presents an effortless, studio-grade lesson that keeps viewers engaged throughout complex architectural discussions.

## Programmatic Alternative: Web SVG Stroke Animations

For web developers who wish to embed animated hand-drawn diagrams directly into web pages without video players, SVG stroke-dasharray properties offer a lightweight alternative:

```css
/* Animate sketch path drawing on page scroll */
.sketch-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawStroke 2s ease-in-out forwards;
}

@keyframes drawStroke {
  to {
    stroke-dashoffset: 0;
  }
}
```

Exporting an Excalidraw or tldraw asset as an SVG exposes clean vector paths that can be styled with standard CSS animations, creating interactive web diagrams that draw themselves as the user scrolls through technical documentation.

## Conclusion

Technical communication is most effective when it removes barriers between abstract concepts and the human mind. The rise of hand-drawn diagramming tools provides a accessible mechanism for engineers, educators, and architects to communicate complex software designs with clarity, warmth, and visual engagement.
