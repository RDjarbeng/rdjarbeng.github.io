---
date: 2026-11-25T14:46:00+02:00
published: false
author: Richard
category: Science & Technology
tags: []
series: ''
series_part: null
key_points: []
title: 'Explain AUC, When Accuracy fails as a metric: is AUC the Answer'
image: ''
image_alt: ''
layout: post
content_type: ''
ai_assistance: []
card_items: []
---

Yes, in fault detection, predicting faulty readings is a good thing, because you want your system to catch problems early so you can fix or filter them out.

Why You Predict the "Faulty" Reading

- **The "positive" class is the event you want to detect:** In machine learning, we label the rare or unusual event we are looking for as **1 (Positive)**—just like a medical test looks for a disease, or a spam filter looks for spam.
- **The score is an "alarm level":** Think of the model's score as a **fault probability** or **suspicion score** from `0` to `1`. A score near `0.95` means _"I am 95% sure this sensor is broken,"_ while `0.05` means _"Everything looks normal."_
- **What happens next:** Once the model flags a reading with a high fault score, your system can trigger an alert, discard the bad data, or switch to a backup sensor so your downstream analysis only uses the clean, normal readings.

Why 85% Pairwise Ranking Isn't 85% Overall Accuracy

Imagine you have **100 sensor readings**: **98 are normal** and **2 are faulty**.

- **Why overall accuracy misleads you:** A lazy model that guesses _"normal"_ every single time would be **98% accurate**, yet it would miss 100% of the faults.
- **What 0.85 AUC actually tests:** Instead of grading all 100 readings at once, AUC sets up head-to-head matchups between one faulty reading and one normal reading (`2 × 98 = 196` possible pairs).
- **The result:** In **85% of those pairs** (about 167 out of 196 matchups), the faulty reading gets a higher suspicion score than the normal reading.

If you tell me **what kind of data or sensor readings** you're working with and **whether you are trying to filter out bad data or trigger maintenance alerts**, I can walk through a concrete example with numbers.
