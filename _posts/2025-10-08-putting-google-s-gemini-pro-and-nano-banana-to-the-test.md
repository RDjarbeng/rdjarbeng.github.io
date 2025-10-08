---
date: 2025-10-08T15:46:00
published: false
author: Richard
categories:
  - Technology
tags:
  - Gemini
  - Nano banana
title: Putting Google's Gemini Pro and 'Nano Banana' to the Test
layout: post
---
I wanted to test out Gemini and Nano banana, so once I got my access to Gemini Pro, I opened the page in the Google Chrome browser, it features a text input with some buttons to add files and select tools, a paper airplane send icon. I wanted to test it out specifically its abilities to generate images with the new Nano Banana image generation model.

I decided to put it to the test. First I prompted it 'Hello, can you show me what you can do'.

Gemini gave a pretty standard, comprehensive text-based answer, listing its abilities like answering questions, writing code, and solving math problems. It was a good summary, but it was missing the one thing I was there for.

"Can you generate images?" I asked, "if yes why didn't you mention it?"

That's when it came clean. It confirmed it could generate images and apologized for the omission. I then asked it about the technology, specifically mentioning "Nano Banana," the codename I'd seen floating around. Gemini confirmed that this was indeed the internal name for the powerful model it uses. Now we were getting somewhere.

## The Real Challenge: Designing a Room

To move beyond simple prompts, I uploaded a hand-drawn floor plan of a room with specific dimensions for the room itself, a bed, a table, a cupboard, and two doors. The task was simple: generate a design.

The first attempt came back. It was a nicely rendered room, but it had a TV I never mentioned and had placed the doors on the same wall. Not a great start. I corrected it.

The second version removed the TV and fixed the doors, but now the scale was off. The table looked larger than the cupboard, despite my dimensions clearly stating the cupboard was wider. I also pointed out that there were no lamps or pictures in my simple plan.

The third attempt was closer, but it was clear that the 3D perspective was making it hard for the AI to get the layout just right. So, I switched tactics.

"Can you generate it from a bird's eye view from the top?"

This was the breakthrough. The top-down view was much more accurate. Now we could really get into the details. I decided to add a window, specifying its exact size and location: centered on the wall directly opposite the entrance. The AI tried, but it put the window on the wrong wall. I corrected it again, and it moved the window... to the *other* wrong wall.

It was a fascinating failure. It showed the AI was trying to follow instructions but was struggling with spatial relationships described in text. I decided to scrap the window idea altogether.

"Go back to the previous design before you added the window," I instructed.

It did, but it also removed the bathroom door in the process! A small but crucial detail. After one final correction to bring the door back, we had a perfect, minimalist top-down view of my original layout.

## The Final Test: A New Layout with Constraints

Now for the real test of its reasoning. I gave it a new set of rules: the cupboard and doors were fixed, but the bed and table could be moved. Crucially, I added that the entrance door swings *inward*. Could it create a functional new layout?

Its first attempt was good, but I spotted a flaw that only someone who had studied the dimensions would see. "If you look at the dimensions for the door and the cupboard you realize that they take up most of the wall which means that space between the entrance door and the wall will be very small, not very large as shown in the current layout."

This was the final boss of corrections. It required the AI to not just place objects, but to understand the spatial implications of their dimensions on a fixed-size wall.

And it nailed it. The final image came back with the cupboard pushed right up against the corner, accurately reflecting the tight space left for the door and its inward swing.

Then after playing around to a point where I was satisfied with its ability to generate images, I told it to write this website post.
