---
date: 2026-04-16T15:00:00+02:00
published: false
author: Richard
category: Security
tags:
  - MKBHD
  - Tap-To-Pay
  - Visa
  - Apple Pay
title: How Secure is Tap To Pay? MKBHD's iPhone Loses 10,000 USD
image: ''
image_alt: ''
layout: post
card_items: []
---

In this video, Derek from Veritasium demonstrates a man-in-the-middle attack to steal $10,000 from Marques Brownlee's (MKBHD) locked iPhone, and then breaks down exactly how the exploit works using detailed visual animations.

Here are the key visual moments and explanations from the video:

**The Setup and the Heist**

- **The Mark:** The video opens with Derek and Marques standing behind a white table [[00:10](http://www.youtube.com/watch?v=PPJ6NJkmDAo&t=10)]. On the table is a standard white Square payment terminal, a laptop, and Marques' locked iPhone.
- **The Tools:** Derek places Marques' locked iPhone on top of a black, rectangular device called a Proxmark, which is connected via USB to a laptop [[05:09](http://www.youtube.com/watch?v=PPJ6NJkmDAo&t=309)]. He also has a secondary "burner" Android phone.
- **The Execution:** Derek types a $5 charge into the Square terminal [[00:44](http://www.youtube.com/watch?v=PPJ6NJkmDAo&t=44)]. He taps his burner phone to the Square terminal. Immediately, Marques' locked iPhone lights up with a $5 Apple Pay charge.
- **The Escalation:** Derek then types in a $10,000 charge [[02:07](http://www.youtube.com/watch?v=PPJ6NJkmDAo&t=127)]. He taps the burner phone to the terminal again, and the Square terminal displays a green checkmark, indicating the $10,000 was successfully approved [[03:09](http://www.youtube.com/watch?v=PPJ6NJkmDAo&t=189)], leaving Marques stunned.

**Visualizing the "Three Lies"**

To explain how they bypassed the security, the video uses neon-styled animations of a hacker (a blue figure) intercepting data in a tunnel between the phone and the terminal. They have to tell "three lies" by flipping specific bits in the binary code:

1. **Lie 1 (Bypassing the Lock Screen):** The Proxmark sends a specific code pretending to be an underground transit gate [[07:05](http://www.youtube.com/watch?v=PPJ6NJkmDAo&t=425)]. Because Apple has an "Express Transit" mode, the phone prepares to pay without needing to be unlocked. An animation shows a string of binary code where a `0` is flipped to a `1` (green), tricking the phone into thinking the reader is offline like a subway gate [[07:40](http://www.youtube.com/watch?v=PPJ6NJkmDAo&t=460)].
2. **Lie 2 (Bypassing FaceID/PIN):** Normally, a $10,000 charge triggers a high-value verification check. An animation shows the transaction data passing through the laptop, where the hacker flips a green `1` (High Value) to a red `0` (Low Value) [[09:40](http://www.youtube.com/watch?v=PPJ6NJkmDAo&t=580)]. The phone now thinks it's approving a tiny transit fee and doesn't ask for FaceID.
3. **Lie 3 (Fooling the Terminal):** The phone approves the charge but flags that the customer did not verify it. The terminal would normally reject this. The hacker intercepts the phone's response and flips another bit from `0` to `1` [[11:26](http://www.youtube.com/watch?v=PPJ6NJkmDAo&t=686)], tricking the terminal into believing Marques verified the massive payment on his device.

**Symmetric vs. Asymmetric Cryptography**

The video uses lock-and-key animations to explain why this only works with a Visa card [[16:10](http://www.youtube.com/watch?v=PPJ6NJkmDAo&t=970)].

- **Symmetric (Visa & Mastercard):** A blue key represents the shared secret key between the card and the bank [[16:19](http://www.youtube.com/watch?v=PPJ6NJkmDAo&t=979)].
- **Asymmetric (Mastercard Only):** A green key represents a digital signature (public/private key) between the card and the terminal itself [[16:45](http://www.youtube.com/watch?v=PPJ6NJkmDAo&t=1005)].

The video explains that Mastercard always requires this second green key, which would catch the tampered data. Visa, however, only requires the digital signature when the terminal is offline. Since the hackers keep the actual Square terminal online, Visa skips the check, allowing the fraudulent $10,000 charge to go through directly to the bank [[20:01](http://www.youtube.com/watch?v=PPJ6NJkmDAo&t=1201)].

Who is affected? 

Certain phones, certain cards.

Iphones with Visa cards. Mastercard has  a layer of asymmetric encryption that actually verifies a transaction and makes it difficult to tamper
