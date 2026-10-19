---
date: 2025-01-16T16:52:00
author: Richard
tags:
  - AI
  - Machine Learning
  - Getting started
  - Jason Brownlee
  - beginners
title: "Where to Start with Machine Learning: Jason Brownlee's Resource List and My Pick"
image: /assets/images/jason_brownlee_start_ml.png
video: ''
layout: post
image_alt: "Cover image for Where to Start with Machine Learning: Jason Brownlee's Resource List and My Pick"
series: "Getting Started with Machine Learning"
series_part: 1
category: "AI"
---
Jason Brownlee runs [Machine Learning Mastery](https://machinelearningmastery.com/), a site I have ended up on many times while trying to fix an error in my code. He describes his work as helping developers get results with machine learning ([about page](https://machinelearningmastery.com/about/)), so I was curious what he recommends to people who are just starting out. He has a short guide on it called ["Best Machine Learning Resources for Getting Started"](https://machinelearningmastery.com/best-machine-learning-resources-for-getting-started/).

![Jason Brownlee's guide to machine learning resources](/assets/images/jason_brownlee_start_ml.png "Best Machine Learning Resources for Getting Started")

## What the guide recommends

He splits it into five groups.

### Libraries to practise with

R (with the CRAN machine learning packages), WEKA, scikit-learn, Octave, and BigML if you would rather not write code. He suggests starting in a programming language you already know and learning just enough to try things out.

### Video courses

Andrew Ng's Stanford machine learning course on Coursera, and Yaser Abu-Mostafa's Learning from Data from Caltech on edX. He also links a talk by Jeremy Howard about getting into data science.

### Two overview papers

Tom Mitchell's "The Discipline of Machine Learning" and Pedro Domingos's "A Few Useful Things to Know about Machine Learning". I would read the Domingos paper first. It is short, and it covers things people usually find out the hard way, for example that more data often helps more than a cleverer algorithm.

### Beginner books

Programming Collective Intelligence, Machine Learning for Hackers, Machine Learning: An Algorithmic Perspective, Data Mining: Practical Machine Learning Tools and Techniques (the WEKA book), and Tom Mitchell's textbook Machine Learning.

### Further reading

Some community lists and Q&A threads on Quora and Stack Overflow.

## His advice on how to use them

The list is from 2020 and parts of it are dated. Some of the books came out before deep learning took off, and not many people use WEKA or Octave now. His advice on how to learn still holds up though:

- Pick one book or one library and work through it before you move on to the next.
- Take notes when you watch videos, and try out what they show you.
- Be careful with papers early on. They can slow you down.
- Learn the maths behind a method before you use it for anything serious.
- Spend more time doing than reading.

I wish I had followed the first one. When I started I kept signing up for new courses and finishing very few of them.

## My recommendation

If you already know some Python, I would take Jeremy Howard's [Practical Deep Learning for Coders](https://course.fast.ai/) from fast.ai. You train a working model in the first lesson, and the theory comes in later as you need it. That fits Brownlee's advice to spend more time doing. I wrote more about the course in [fastai: Practical deep learning without a PhD](/introducingfastai/).

If you prefer a more traditional route, Andrew Ng's course from the list is still a good way to learn the foundations, and Coursera now has an updated version of it, the [Machine Learning Specialization](/machine-learning-specialization-by-andrew-ng-and-deeplearning-ai/), which is the next post in this series.
