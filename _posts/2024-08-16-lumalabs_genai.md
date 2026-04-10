---
date: 2024-08-16
published: true
author: Richard
categories:
  - AI
tags:
  - Luma AI
  - Dream Machine
  - Generative AI
  - AI Limitations
  - Text-to-Video
  - AI Video Generation
  - AI Animation
  - Machine Learning
  - Bing Image Creator
  - AI Fail
  - Physics
  - Bees
  - Insects
  - Animated-Images
title: Can AI bring images to life? Limits of Generative AI- Luma AI and Virtual Bees.
image: /assets/images/bees_luma.jpeg
image_alt: Cover image for Can AI bring images to life?
---

 I recently tried out Luma AI's  [dream machine](https://lumalabs.ai/dream-machine) using a picture of what I believe are wasps or bees (though I'm not entirely sure which!)..

### What I Did

After signing up for a Luma Labs account, I uploaded my chosen image to their platform. Below is the input image I used:

![10 bees on a white background with one large bee in the centre with wings and eyes in detail, 9 flying bees in the background with different sizes ](/assets/images/bees_luma.jpeg)

It shows 10 bees on a white background with one large bee in the centre with wings and eyes shown in detail. There are 9 flying bees in the background with different sizes.

I then entered this simple prompt:

```plain
Move the insects in a realistic manner
```
What I was expecting: 
* The bees should flap their wings
* There should be movement of their feet, fur, hair or body appendages. 
* Bonus feature: Wanted to see if there will be some motion blur when the wings flap similar to how 

After a short wait, the results were in.

### Result

<video width="100%" preload="auto" autoplay controls>
  <source src="{{ '/assets/videos/luma_bees.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>

The dream machine AI recognized the image as one of flying insects, and it attempted to animate this. Movement in the animation was placed on the centre bee as the smaller bees did not seem to move. There's a bit of camera motion that follows the centre bee as it moves from left to right. However, it struggled with making the wings flap. The attempt looked like someone was dragging the bee with a mouse pointer. The bees in the background have some blur applied to them with their appendages moving slightly. However for some reason, they seem stationary, their wings don't flap properly up and down, they just move slightly

To give the attempt some credit, the bees in the background did move their wings slightly so it was a decent effort. While the body of the insect moved like a flying object, it didn't quite capture the nuances of how insects actually fly which I found hilarious. I am not sure what training dataset was used to train Luma AI. To give the benefit of the doubt, it may not contain many videos of insect flight so the AI couldn't learn how to properly animate them. 

#### Comparison to realiy

In reality, a bee can't move forward or tilt its body midair the way the AI made it do without flapping its wings. This is an interesting example of generative AI's limitations; specifically its lack of understanding of the physical laws that govern the real world.

The original image was generated using Bing Image Creator, which may have influenced the AI's performance 🤖 using a generated image vs a real image. I'll have to try it out with a real image to see if there's a difference. This was an interesting experiment to see how far generative AI has come and what its limitations are.

_PS: I am aware that these may not be bees but may be wasps, hornets or some other kind of similar insect but I choose to use bees until I can confirm which insect they look closest to here._


