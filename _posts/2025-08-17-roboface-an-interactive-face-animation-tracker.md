---
date: 2025-08-17T21:19:00
published: true
author: Richard
categories:
  - Technology
tags:
  - Human Robot Interaction
  - Face animation
  - Digital avatar
  - Uncanny valley
  - 2D avatar
  - React project
  - RDjarbeng's project
  - animation
  - virtual head
title: Roboface-an Interactive Face Animation Tracker
image: /assets/images/face_animation_cover.png
layout: post
---
I want you to imagine a character that tracks your mouse and expresses emotions based on how you interact with it. Emotions range from happy, surprised, bored, or neutral. The character in this case is a 2D face, a playful experiment to build something that feels alive. See it [on GitHub](https://github.com/RDjarbeng/interactive_face_animation) or try the [live demo](https://roboface.netlify.app/).

![Face animation gif with mouse](/assets/images/face_animation2.gif "Face animation gif with mouse")

## 😄 What It Does

The face shifts between emotional states—happy, surprised, bored, or neutral—based on mouse position and activity, acting like a **finite state machine**:

- Eyes track the cursor for a lively effect.
- Gets happier (smiling, blushing) when the mouse is closer.
- Shows surprise after a pause in interaction.
- Turns bored after long inactivity.
- Settles to neutral with less activity.

![Face animation demo screenshot](/assets/images/face_animation_screenshot (1).png "Face animation demo screenshot")

Smooth transitions come from CSS and JavaScript, adjusting eye movement, mouth shape, and blush.

## Previous versions

This project started with the bare minimum of pupils that follow the user's mouse on the screen. It was good for a simple proof of concept but needed improvement. One important aspect was emotion. I wanted the avatar to display surprise, happiness, sadness, boredom. How to do this with pixels on a screen was another problem to solve.

After some iterations, a face was added for the eyes, then a nose and mouth. Then to show emotions based on the mouse movements I got the pupils to dilate when the pointer gets close to the face to mimic a surprised expression. The reflection of the light (of course there isn't actually a light) on the pupils were also made to move in the opposite direction of the gaze to mimic the eyes of an animated character being illuminated.

I think I got a bit ahead of myself and added eyebrows and added blush" or "blush marks." They’re used to show emotions like affection, embarrassment, or shyness. In animation and comics, especially in anime or manga, they’re sometimes stylized as simple pink ovals, lines, or shading under the eyes.

Take a look at this screenshot of an earlier version where I tried to include eyebrows on the face to make it more _expressive_.

![Face_animation_with eyebrows](/assets/images/face_animation_screenshot (2).png "Face animation with eyebrows")

I thought maybe adding as many features to the face as possible to express emotion is not the ideal path, so I removed the eyebrows. If you look at projects such as keepon, referenced below, it is able to display a wide range of emotions without so many facial features. 

To document the experience I made a video showing the progress from version 0 to the current version, version 5. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/xsSTf1fn0Zw" frameborder="0" allowfullscreen></iframe>

---

## 🧠 HRI Inspiration

This project came from a human-robot interaction course at Carnegie Mellon, where I explored how robots evoke emotions. The [Keepon robot](https://en.wikipedia.org/wiki/Keepon), with its simple, expressive movements, inspired me to create a virtual version with similar charm.

HRI concepts in the project:

- **Feedback Loop**: Boredom prompts mouse movement, which shifts the face to happiness, creating an interaction cycle.
- **Agency**: The face seems to “choose” emotions (like happiness when approached), despite being algorithmic.
- **Affective Interaction**: Emotions like happiness or surprise aim to spark a response in the user.
- **Social Presence**: The face feels like a social entity through its reactions.
- **Proxemics**: Emotions change with the mouse’s virtual proximity, mimicking real-world closeness.
- **Uncanny Valley**: A cartoonish style keeps it approachable, avoiding eerie realism.

> _Note_: It feels alive, but it’s just pixels driven by code.

---

## 🌟 Other Projects

Since building this in May 2025, I’ve noticed similar projects. [xAI’s Grok Companions](https://x.ai/grok) (July 2025) introduced animated characters like “Ani” for premium users. Emotionally adaptive AI companions, discussed in tech blogs around August 2025, focus on emotional support but lack a specific project page. [KEYi Robot’s automated companions](https://www.keyirobot.com/) (August 2025) also emerged. These focus on conversation and emotional support but don’t react to user movement or proximity like this face does.

_This is my take on blending HRI with code to create something lively and fun._
