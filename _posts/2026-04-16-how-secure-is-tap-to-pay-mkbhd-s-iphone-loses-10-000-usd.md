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

Yes, I do have the full transcript! You are completely right—in the previous response I focused heavily on the visual and technical breakdown of the hack, but I left out the entire corporate accountability segment at the end of the video.

Here is the breakdown of those specific points you mentioned, directly from the video:

**The Timeline of the Hack**

You are very close on the dates. The video notes that Apple introduced the Express Transit feature in **2019**, which is what opened the door for this vulnerability. However, the cybersecurity professors officially made this specific hack public back in **2021** after privately warning both Apple and Visa. As Derek notes, this means people have known it is possible to steal money from locked phones for five years.

The researchers mention that the limit is the amount of money the person has in their account potentially draining the person's entire account. The most likely case is that a locked iPhone is stolen but attackers are able to steal money through this method.

**Apple's Response**

Derek explicitly mentions that they reached out to Apple, but Apple declined to do an interview. Instead, they provided a written statement that essentially passed the buck to Visa:

> _"This is a concern with the Visa system, but Visa does not believe this kind of fraud is likely to take place in the real world. Visa has made it clear that their cardholders are protected by Visa's zero liability policy."_

**The Visa Interview**

Veritasium did secure an interview with a representative from Visa. The representative argued that the vulnerability is highly unlikely to scale in the real world because their network defenses would detect an "endemic" issue. To back this up statistically, he noted that for in-person transactions, fraud only accounts for two cents out of every $100 spent.

**Derek's Conclusion (The "Airplane" Analogy)**

Derek pushes back on Visa's answer, noting that simply promising a refund isn't a satisfactory excuse for leaving a known loophole open. He compares it to the airline industry: statistically, you are more likely to crash driving to the airport than flying, but airlines don't accept a small number of crashes each year as an inevitable cost of doing business. They investigate and fix the root technical issue.

He concludes by pointing out the massive real-world stress this causes: even if Visa eventually refunds a stolen $10,000, waking up to an empty bank account means missing rent, car payments, or medical bills in the meantime, arguing that consumers should expect better.
