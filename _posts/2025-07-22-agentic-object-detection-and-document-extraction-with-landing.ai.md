---
date: 2025-07-22T12:05:00
published: true
author: Richard
categories:
  - Technology
tags:
  - agentic object detection
  - document extraction
  - Landing.ai
  - Andrew Ng
  - AI technology
title: Agentic Object Detection and Document Extraction with Landing.ai
image: /assets/images/agentic_obj_dection_landingai_cover.png
layout: post
---
This week, I dive into agentic object detection and document extraction using tools from Landing.ai, one of Andrew Ng's innovative startups! Inspired by Andrew Ng's recent post on X about their blazing-fast text extraction upgrades, I put their tech to the test. Here's what I found:

## Agentic Object Detection

Forget training models with tons of coffee cup images! Just describe the object, and the model nails it. Simple, smart, and efficient. For example, I noticed one of the coffee cups has a design made with milk that looks like a tree leaf, so I asked it to detect the 'coffee in a cup with plant design', and it successfully identified those cups. This differs from typical computer vision tasks (e.g., object detection or instance segmentation) where models are trained on specific object classes like cars or license plates.

![coffee cups with plant design detected by landing ai](/assets/images/landingai_coffee_plant.png "coffee cups with plant design detected by landing ai")

In a screen recording, I specified detecting 'windows with room lights on' in a building picture, and it highlighted them with 100% accuracy. Similarly, using the singular 'building' (as instructed by the app) on a skyline image detected all buildings perfectly. Besides bounding boxes in the UI, it also provides JSON output with coordinates for API use.

![landing ai detecting windows with lights on](/assets/images/landingai_window_detection.png "landing ai detecting windows with lights on")

## Agentic Document Extraction

Prompted by Andrew Ng's tweet, I tested document extraction. It handled an invoice, outputting details in markdown or JSON, and a lab report with images and mixed layouts (two-column and single-column) effortlessly. It even described the logo and formatted results consistently. Here is a screenshot from the video showing the extracted text

![Extraracted text from landing ai agentic document extraction](/assets/images/landingai_document_extraction.png "Extraracted text from landing ai agentic document extraction")

### Andrew Ng's X Post

Embedded below is Andrew Ng's tweet:
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Agentic Document Extraction just got much faster! From previous 135sec median processing time down to 8sec. Extracts not just text but diagrams, charts, and form fields from PDFs to give LLM-ready output. Please see the video for details and some application ideas. <a href="https://t.co/29lOKf6UGO">pic.twitter.com/29lOKf6UGO</a></p>— Andrew Ng (@AndrewYNg) <a href="https://twitter.com/AndrewYNg/status/1927384264779170259?ref_src=twsrc%5Etfw">May 27, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

He noted: "Agentic Document Extraction just got much faster! From previous 135sec median processing time down to 8sec. Extracts not just text but diagrams, charts, and form fields from PDFs to give LLM-ready output. Please see the video for details and some application ideas."

## Landing.ai Video Demo

Check out this video by Richard demonstrating the technology (note: detection is sped up, so actual performance may be slower):
<iframe width="560" height="315" src="https://www.youtube.com/embed/lC6g-T5V470" frameborder="0" allowfullscreen></iframe>

## Side Note: Landing.ai Support

I reported a non-working 'Start for free' button on their site. I received this email:

> Hi Richard,  
> I hope all is well, and thank you for reaching out. I sincerely appreciate you letting us know the "Start for free" button isn't working! The team is working on fixing it as we speak.  
> Best,  
> \*\*\*

Then Adrian from Landing.ai confirmed via LinkedIn that the team is addressing the issue.

![Landing ai thanks Richard for noticing issue](/assets/images/landing_adrian_linkedin.png "Linkedin -Landing ai thanks Richard for noticing issue")

 It seems fixed now—glad to help, and impressed by their proactive response!
