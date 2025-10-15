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

## Initial test

I decided to put it to the test. First I prompted it 'Hello, can you show me what you can do'.

Gemini gave a pretty standard, comprehensive text-based answer, listing its abilities like answering questions, writing code, and solving math problems.  Here's a snippet of the answer:

> Hello! Of course. I'd be happy to show you what I can do.

> I am a large language model, trained by Google. Think of me as a versatile tool for information, creativity, and productivity. My capabilities are broad, but here's a taste of what I can help you with:

> 1. Answer Your Questions (from simple to complex)

> ....

> 2. Create and Brainstorm

> 3. Help with Practical Tasks

> 4. Role-Playing and Scenarios

It was a good summary, but it was missing the one thing I was there for.

"Can you generate images?" I asked, "if yes why didn't you mention it?"

That's when it came clean. It confirmed it could generate images and apologized for the omission. Then it generated this:
![Image from gemini google nano-banana](/assets/images/20251008-160137.png "Test generated image from gemini google nano-banana")

I then asked it about the technology, specifically mentioning "Nano Banana," the codename I'd seen floating around. Gemini confirmed that this was indeed the internal name for the powerful model it uses. Now we were getting somewhere. From Gemini

> Here’s the story: **"Nano Banana" was the internal codename** Google used for a powerful new image generation model while it was being tested. This codename became public and caught on, creating a lot of buzz online. The official name for this technology is **Gemini 2.5 Flash Image**.

## The Real Challenge: Designing a Room

To move beyond simple prompts, I uploaded a hand-drawn floor plan of a room with specific dimensions for the room itself, a bed, a table, a cupboard, and two doors. The task was simple: generate a design.

![Room layout sketch with dimensions of door, table, bed and entrances](/assets/images/room_design.png "Room layout sketch with dimensions of door, table, bed and entrances")

The first attempt came back. It was a nicely rendered photorealistic room, but it had a TV I never mentioned and had placed the doors on the same wall. I'll add it below.

![Room layout from sketch by google nano-banana](/assets/images/20251014-173944.png "Room layout from sketch by google nano-banana")

Not a great start. I corrected it.

> There was no tv in the room and the doors were not on the same side of the wall

![2nd output of photorealistic Room layout from provided sketch by google nano-banana](/assets/images/20251014-174100.png "2nd output of photorealistic Room layout from sketch by google nano-banana")

The second version removed the TV and fixed the doors, but now the scale was off. The table looked larger than the cupboard, despite my dimensions clearly stating the cupboard was wider. Some text from the sketch in purple ink with an arrow was also somehow in the photo. I also pointed out that there were no lamps or pictures in my simple plan.

![3rd output of photorealistic Room layout from provided sketch by google nano-banana](/assets/images/20251014-174227.png "3rd output of photorealistic Room layout from provided sketch by google nano-banana")

This attempt had a plainer slightly less visually appealing room that was better than the previous generations.

The third attempt was closer, but it was clear that the 3D perspective was making it hard for the AI to get the layout just right. So, I switched tactics.

> "Can you generate it from a bird's eye view from the top?"

This was the breakthrough. 

![4th output of photorealistic Room layout bird's eye view from nano-banana](/assets/images/20251014-174342.png "4th output of photorealistic Room layout bird's eye view from nano-banana")

The top-down view was much more accurate. Now we could really get into the details. I decided to add a window, specifying its exact size and location: centered on the wall directly opposite the entrance. The AI tried, but it put the window on the wrong wall. 

My prompt:


> Good, but you added a window. I would like the window to be on the wall opposite the entrance. The window is in the middle of that wall opposite the entrance and is 1.5 m wide 

Gemini's output:

> Thank you for the precise feedback! My apologies for that stray window. You're right, it needs to be on the wall opposite the entrance, centered, and 1.5m wide...

I corrected it again, and it moved the window... to the _other_ wrong wall.

![Output of photorealistic Room layout bird's eye view from nano-banana wrong window](/assets/images/20251014-174548.png "Output of photorealistic Room layout bird's eye view from nano-banana wrong window")

It was a fascinating failure. It showed the AI was trying to follow instructions but was struggling with spatial relationships described in text. I decided to scrap the window idea altogether.

"Go back to the previous design before you added the window," I instructed.

![Output of photorealistic Room layout bird's eye view from nano-banana restored](/assets/images/20251014-174649.png "Output of photorealistic Room layout bird's eye view from nano-banana restored")

It did, but it also removed the bathroom door in the process! A small but crucial detail. After one final correction to bring the door back, we had a perfect, minimalist top-down view of my original layout.

![Output of minimalist room layout bird's eye-view from nano-banana restored from original](/assets/images/20251014-174727.png "Output of minimalist room layout bird's eye-view from nano-banana restored from original")

## The Final Test: A New Layout with Constraints

Now for the real test of its reasoning. I gave it a new set of rules: the cupboard and doors were fixed, but the bed and table could be moved. Crucially, I added that the entrance door swings _inward_. Could it create a functional new layout?

> Assuming the cupboard position cannot be changed along with the position of the doors, but all other items can be moved, also the door at the entrance swings outward into the room can you. Suggest another possible layout?

![Output of minimalist room layout  bird's eye-view with constraints from nano-banana restored from original](/assets/images/20251014-174902.png)

Its first attempt was good, but I spotted a flaw that only someone who had studied the dimensions would see. 

> "If you look at the dimensions for the door and the cupboard you realize that they take up most of the wall which means that space between the entrance door and the wall will be very small, not very large as shown in the current layout."

This was the final boss of corrections. It required the AI to not just place objects, but to understand the spatial implications of their dimensions on a fixed-size wall. 

_Gemini's output:_

> You are absolutely right to point that out! My apologies, I failed to accurately represent the tight space between the cupboard and the entrance door given their combined width and the wall length. The previous layout did not respect those precise dimensions, making the gap appear larger than it would be.

> Let's fix that. The cupboard is 1.8m and the entrance door is 1.2m. On a 3m wall, that only leaves 0m (1.8m + 1.2m = 3m) if they are side-by-side, or very minimal space if the cupboard is offset slightly. This means the cupboard must start right next to the wall to accommodate the door.

> I'll adjust the layout to reflect this tight fit accurately, while still allowing the entrance door to swing inward.

And it nailed it. The final image came back with the cupboard pushed right up against the corner, accurately reflecting the tight space left for the door and its inward swing.

![Output of minimalist room layout bird's eye-view from sketch provided to nano-banana updaed with dimensions](/assets/images/20251014-175126.png "Output of minimalist room layout bird's eye-view from sketch provided to nano-banana updaed with dimensions")

Then after playing around to a point where I was satisfied with its ability to generate images, I told it to write this website post.

> Write me a website post in markdown about this interaction. It should go something like this...

> (The post ends like this)Then after playing around to a point where I was satisfied with it's ability to generate images, I told it to write this website post.

This final portion is written by me, Richard. I hope you enjoyed testing out the capabilities of nano-banana in Gemini Pro with me. I would like to figure out ways in which this can be extended one day. Also hope to review other models soon.
