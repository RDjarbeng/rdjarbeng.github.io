---
date: 2025-01-17T11:48:00
published: true
author: Richard
categories:
  - Research
tags:
  - Birth Asphyxia
  - Carnegie Mellon University Africa
  - Pamely Zantou
  - CMU-Africa
  - HealthTech
  - Artificial Intelligence
  - AI
  - Machine Learning
  - Federated Learning
  - Neonatal Health
  - HumekaFL
  - Ubenwa
  - Carnegie Mellon University
title: Carnegie Mellon University Africa's Breakthrough in Detecting Birth Asphyxia-HumekaFL
image: /assets/images/pamely_cmu_website.png
layout: post
video: ''
image_alt: "Cover image for Carnegie Mellon University Africa's Breakthrough in Detecting Birth Asphyxia-HumekaFL"
---
Birth asphyxia happens when a baby does not get enough oxygen during delivery. It is one of the leading causes of newborn death, and sub-Saharan Africa carries some of the highest under-five mortality rates in the world. Caught early, mild and moderate cases can recover fully. Caught late, the lack of oxygen can do lasting damage to the brain, heart, lungs and kidneys. Diagnosis usually depends on trained staff and equipment, and many clinics have too little of both.

A team at Carnegie Mellon University Africa in Kigali, Rwanda, has built a phone app that tries to spot it from the sound of a newborn's cry. It is called HumekaFL.

![Pamely Zantou, the project's lead research assistant (credit: engineering.cmu.edu)](/assets/images/pamely_cmu_website.png "Pamely Zantou, the project's lead research assistant (credit: engineering.cmu.edu)")

## How it works

A health worker records the baby crying on a smartphone. The recording goes through a machine learning model, a support vector machine (SVM), which looks for patterns in the cry that are associated with asphyxia. The team chose SVMs because they handle small, high-dimensional datasets well, and small datasets are what you get in medicine. It runs on ordinary phones, with no special hardware and no expert training.

The interesting part is the "FL", which stands for federated learning. Normally you would gather recordings from every hospital into one central dataset and train a model on it. That means sensitive patient data leaves the hospital, and many hospitals understandably refuse. With federated learning, each hospital keeps its recordings and trains its own copy of the model locally. Only the model updates are sent to be combined into a shared model. The data stays put, which also makes a large data breach much less likely.

In the team's [paper](https://arxiv.org/abs/2412.01167), the federated SVM did better than the centralised SVM and neural network approaches reported in earlier work. The paper was presented as a poster at ACM COMPASS 2024.

## The team

The project was led by CMU-Africa students Pamely Zantou (lead research assistant), Blessed Guda, Bereket Retta and Gladys Inabeza, with Assane Gueye at CMU-Africa and Carlee Joe-Wong at CMU in Pittsburgh. Joe-Wong described her role as advisory and credited the Kigali team with the idea and most of the design around privacy and limited resources.

## What still has to happen

This is research, not a product in clinics yet. Joe-Wong made the point that the model needs real data from the population it will serve, so it learns local patterns instead of someone else's biases. The next steps are more experiments on African health data and partnerships with African hospitals to collect recordings and validate the model.

## Ubenwa, the older cousin

HumekaFL is not the first attempt at this. [Ubenwa](https://www.ubenwa.ai/), co-founded by Nigerian researcher Charles Onu and based in Montreal, has worked on cry analysis for birth asphyxia since its [2017 paper](https://arxiv.org/abs/1711.06405). Ubenwa analyses the amplitude and frequency patterns in a cry, using techniques borrowed from speech recognition, and has run clinical validation at the University of Port Harcourt Teaching Hospital in Nigeria and the McGill University Health Centre in Canada.

The two share the same bet: a cry is free to record, and a phone is something most health workers already carry. HumekaFL's twist is the privacy design, which could make hospitals more willing to take part. Neither will matter much until it has been tested on enough babies in the places it is meant for, and both teams say so.

## References

- [CMU news: HumekaFL and birth asphyxia](https://engineering.cmu.edu/news-events/news/2025/01/14-birth-asphyxia.html)
- [HumekaFL paper on arXiv](https://arxiv.org/abs/2412.01167)
- [Ubenwa](https://www.ubenwa.ai/)
