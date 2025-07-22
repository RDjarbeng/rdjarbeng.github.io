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
# Agentic Object Detection and Document Extraction with Landing.ai

This week, I dive into agentic object detection and document extraction using tools from Landing.ai, one of Andrew Ng's innovative startups! Inspired by Andrew Ng's recent post on X about their blazing-fast text extraction upgrades, I put their tech to the test. Here's what I found:

![Agentic detection with landing ai cover image](/assets/images/agentic_obj_dection_landingai_cover.png "Agentic detection with landing ai")

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

## Importance and Potential Use Cases

### Why This Matters

The advancements in agentic object detection and document extraction from Landing.ai are significant because they simplify complex tasks that were previously time-consuming or required specialized knowledge. For a general person, this means tools that can understand and process visual and textual information in ways that mimic human intuition but with greater speed and accuracy. This technology can transform how we interact with digital content, making it more accessible and useful in everyday life.

### Potential Use Cases

Here are some ways this technology can benefit you, regardless of your technical background:

1. **Personal Organization and Productivity**

- **Document Management:** Imagine sorting through a pile of receipts, invoices, or personal documents. Landing.ai's document extraction can automatically organize these into readable formats, saving you hours of manual work. For instance, it can extract key details from your utility bills or tax documents, making it easier to track expenses or prepare for tax season.
- **Photo and Image Sorting:** If you have a collection of photos, this technology can help identify and categorize them based on objects or scenes, like finding all pictures of a specific landmark or event without manually tagging each one.

2. **Education and Learning**

- **Research Assistance:** Students and lifelong learners can use agentic document extraction to quickly summarize research papers, extract key data from scientific articles, or even transcribe handwritten notes into digital text. This speeds up the learning process and helps in creating study materials.
- **Visual Learning Aids:** Teachers can use object detection to create interactive learning materials, such as identifying objects in images for educational games or lessons.

3. **Home and Lifestyle**

- **Smart Home Integration:** Imagine a smart home system that can detect objects in your living space, like identifying which lights are on or off, or recognizing specific items in your kitchen. This can enhance automation and energy efficiency.
- **Personal Projects:** Hobbyists or DIY enthusiasts can use this technology to analyze blueprints, extract measurements from images, or even identify parts in a hardware store catalog, making project planning more efficient.

4. **Business and Entrepreneurship**

- **Small Business Operations:** Small business owners can leverage document extraction to handle invoices, client contracts, or inventory lists without needing expensive software or extensive training. It can also help in analyzing customer feedback forms or survey results.
- **Market Research:** Entrepreneurs can quickly gather and analyze data from various sources, including visual content, to identify trends or customer preferences, aiding in decision-making.

5. **Accessibility and Inclusion**

- **Assistive Technology:** For individuals with visual impairments, agentic object detection can describe images or detect objects in real-time, enhancing independence. Document extraction can convert printed materials into accessible formats, making information more reachable.
- **Language Learning:** Learners can use extraction tools to translate and understand documents in different languages, breaking down barriers to information.

These use cases demonstrate how Landing.ai's technology can simplify tasks, save time, and open up new possibilities for personal and professional growth. Whether you're organizing your home, learning something new, or running a small business, these tools can make your life easier and more efficient.

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
