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

![Face animation with eyebrows](/assets/images/face_animation_screenshot \(1\).png "Face animation with eyebrows\"").png "Face animation demo screenshot")

Smooth transitions come from CSS and JavaScript, adjusting eye movement, mouth shape, and blush.

The current version is version 2. Here's a screenshot of an earlier version where I tried to include eyebrows on the face avatar to make it more _expressive_.

![Face_animation_with eyebrows](/assets/images/face_animation_screenshot \(2).png "Face animation with eyebrows")

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
