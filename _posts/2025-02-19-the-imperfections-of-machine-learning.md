---
date: 2025-02-19T22:12:00
published: true
author: Richard
tags:
  - Computer Vision
  - Machine Learning
  - ML5
  - AI
  - JavaScript
  - Imperfections
key_points:
  - "Machine learning models can sometimes be overconfident in their predictions, as shown in an example where a charger is misclassified as a cell phone with 94% confidence."
  - "Softmax must share all probability among a fixed set of classes, so an object the model was not trained on, like a charger, still gets a confident label. Modern neural networks are also often poorly calibrated (Guo et al., 2017)."
  - "Practitioners reduce these errors with temperature scaling, confidence thresholds or an 'unknown' class, out-of-distribution detection (Hendrycks and Gimpel, 2017), more varied training data and fine-tuning."
  - "As an engineer, it's the role to help communicate the possibilities and limitations of these models to users, emphasizing that no model is perfect and careful training and fine-tuning can bring real value to users."
title: "Why Machine Learning Models Can Be Confidently Wrong: A Charger Classified as a Phone"
image: /assets/images/ml_false positive_cropped_charger_rd.jpg
layout: post
video: ''
image_alt: "Cover image for Why Machine Learning Models Can Be Confidently Wrong: A Charger Classified as a Phone"
category: "AI"
ai_assistance:
  - drafting
---
While machine learning is a powerful tool, it's important to remember that models are not infallible. In fact, they can sometimes be overconfident in their predictions, as shown in this image where a charger is misclassified as a cell phone with 94% confidence.

![Charger misclassified as phone](/assets/images/ml_false positive_cropped_charger_rd.jpg "Charger misclassified as phone by machine learning model")

This example was captured using the **ml5.js** library, specifically the MobileNet model, which is trained on the ImageNet dataset. This dataset includes around 1,000 different classes of objects, ranging from animals and vehicles to household items and electronics. However, the model's performance largely depends on the representation of these classes in the training data. In this case, the misclassification might have occurred because there weren't enough examples of chargers in the dataset for the model to accurately distinguish them from similar objects like cell phones.

## Why a model can be confidently wrong

The 94% figure does not mean the model is 94% sure in a human sense. It comes from the last step of the network, the softmax function. Softmax takes one raw score per class and turns the scores into numbers between 0 and 1 that add up to 1.

For class $i$ with raw score $z_i$, softmax gives $p_i = e^{z_i} / \sum_j e^{z_j}$. The model has to share all of its probability among the classes it knows. There is no slot for "none of these". If a charger is not one of the classes, or is poorly covered, the probability still has to go somewhere. A phone is the nearest match, so the phone gets most of it.

This is the closed-set problem. An input that looks unlike the training data is called out-of-distribution (OOD). A classifier trained on a fixed list of classes will still pick one of them for an OOD input, often with a high score.

A second problem is calibration. A model is well calibrated if, across all the times it says 90%, it is right about 90% of the time. In [On Calibration of Modern Neural Networks](https://arxiv.org/abs/1706.04599) (ICML 2017), Guo, Pleiss, Sun and Weinberger found that modern neural networks are poorly calibrated. Networks from about a decade earlier were better. They linked this to depth, width, weight decay and batch normalization.

## What practitioners do about it

To create useful machine learning models, we need to train them to minimize errors and false positives. This is where fine-tuning comes in: tweaking the model to better match the specific data it may encounter in your application. Fine-tuning helps, but it is not the only tool.

**Calibrate the scores.** Guo et al. tested several fixes applied after training. The simplest, temperature scaling, worked well on most of their datasets. It divides the raw scores by one learned number $T$ before the softmax. With $T > 1$ the probabilities become less extreme, and the model's ranking of classes does not change.

**Add a confidence threshold or an "unknown" answer.** Instead of always showing the top class, the app can say "not sure" when the top probability is below a chosen cut-off. Another option is to train with an explicit "other" class that holds examples of things the app should ignore.

**Detect out-of-distribution inputs.** Hendrycks and Gimpel's [A Baseline for Detecting Misclassified and Out-of-Distribution Examples in Neural Networks](https://arxiv.org/abs/1610.02136) (ICLR 2017) uses the maximum softmax probability as a simple signal. Correctly classified examples tend to have a higher maximum probability than wrong or OOD ones. They found this baseline worked across vision, language and speech tasks, though other methods can beat it.

**Collect more varied training data.** If chargers matter to your app, add labelled chargers, with different angles, lighting and backgrounds. Add the look-alike objects too, so the model learns what separates them.

These steps work best together. Calibration makes the scores honest, and a threshold or OOD check then decides what to do with low scores.

As an engineer, my role is to help communicate the possibilities and limitations of these models to users. While no model is perfect, with careful training and fine-tuning, we can create highly effective solutions that bring real value to our users.
