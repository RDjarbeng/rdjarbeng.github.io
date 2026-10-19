---
date: 2025-01-17T11:48:00
published: true
author: Richard
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
title: "HumekaFL: CMU-Africa's App That Detects Birth Asphyxia From a Baby's Cry"
image: /assets/images/pamely_cmu_website.png
layout: post
video: ''
image_alt: "Cover image for HumekaFL: CMU-Africa's App That Detects Birth Asphyxia From a Baby's Cry"
category: "AI"
---
Birth asphyxia is when a baby does not get enough oxygen during delivery. It is one of the main causes of newborn deaths, and sub-Saharan Africa has some of the highest under-five mortality rates in the world. If it is detected early, babies with mild or moderate asphyxia can recover fully. If treatment is delayed, it can cause lasting damage to the brain, heart, lungs and kidneys. Diagnosing it usually needs trained staff and equipment, which a lot of clinics do not have enough of.

A team at Carnegie Mellon University Africa (CMU-Africa) in Kigali, Rwanda, has built a phone app called HumekaFL that tries to detect it from the sound of a newborn's cry.

![Pamely Zantou, the project's lead research assistant (credit: engineering.cmu.edu)](/assets/images/pamely_cmu_website.png "Pamely Zantou, the project's lead research assistant (credit: engineering.cmu.edu)")

## How it works

A health worker records the baby crying on a smartphone. The recording is passed to a machine learning model called a support vector machine (SVM), which looks for patterns in the cry linked to asphyxia. The team picked SVMs because they work well with small datasets that have a lot of features per sample, and medical datasets are usually small. The app runs on an ordinary phone, so clinics do not need special hardware or experts to use it.

The "FL" in the name stands for federated learning, and I think this is the most useful part of the design. Normally you would collect recordings from every hospital into one dataset and train a model on it. That means patient data has to leave the hospital, and many hospitals are not willing to allow that. With federated learning, each hospital keeps its own recordings and trains a copy of the model on them. Only the model updates are sent out and combined into a shared model. The recordings never leave the hospital, which also makes a large data breach much less likely.

According to the team's [paper](https://arxiv.org/abs/2412.01167), the federated SVM performed better than the centralised SVM and neural network methods from earlier studies. The paper was presented as a poster at ACM COMPASS 2024.

## The team

The project was led by CMU-Africa students Pamely Zantou (lead research assistant), Blessed Guda, Bereket Retta and Gladys Inabeza, with Assane Gueye at CMU-Africa and Carlee Joe-Wong at CMU in Pittsburgh. Joe-Wong said her role was advisory and that the idea and most of the design for privacy and limited resources came from the team in Kigali.

## Next steps

HumekaFL is still a research project and is not being used in clinics yet. Joe-Wong pointed out that the model needs real data from the people it will be used on, so it learns local patterns and not the biases of data collected somewhere else. The team plans to run more experiments on African health data and to partner with African hospitals to collect recordings and test the model.

## Ubenwa

HumekaFL is not the first project to try this. [Ubenwa](https://www.ubenwa.ai/), a Montreal-based company co-founded by Nigerian researcher Charles Onu, has worked on detecting birth asphyxia from cries since its [2017 paper](https://arxiv.org/abs/1711.06405). Ubenwa looks at the amplitude and frequency patterns in a cry using methods taken from speech recognition, and has done clinical validation at the University of Port Harcourt Teaching Hospital in Nigeria and the McGill University Health Centre in Canada.

Both projects rely on the fact that recording a cry costs nothing and most health workers already have a phone. What HumekaFL adds is the privacy design, which could make more hospitals willing to take part. I would like to see both tested on many more babies in the hospitals they are meant for, which is what the CMU-Africa team says it plans to do next.

## References

- [CMU news: HumekaFL and birth asphyxia](https://engineering.cmu.edu/news-events/news/2025/01/14-birth-asphyxia.html)
- [HumekaFL paper on arXiv](https://arxiv.org/abs/2412.01167)
- [Ubenwa](https://www.ubenwa.ai/)
