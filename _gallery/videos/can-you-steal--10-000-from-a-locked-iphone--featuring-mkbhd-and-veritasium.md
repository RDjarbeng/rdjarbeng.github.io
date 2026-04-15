---
title: Can you steal $10,000 from a locked iPhone? Featuring MKBHD and Veritasium
platform: youtube
youtube_id: https://www.google.com/search?q=https://youtu.be/PPJ6NJkmDAo
embed_code: ''
thumbnail: ''
type: video
genre: Entertainment
category: videos
date: '2026-04-15T23:20:51+02:00'
published: true
---

In this video, Derek from Veritasium teams up with cybersecurity experts to demonstrate a real, unpatched vulnerability that allows hackers to drain funds from a locked iPhone without the user's knowledge. He successfully demonstrates this by "stealing" $10,000 from Marques Brownlee's (MKBHD) locked phone [03:09].

### The Mechanism: A Man-in-the-Middle Attack

The hack relies on intercepting and altering the near-field communication (NFC) data sent between an iPhone and a payment terminal using a device called a Prox Mark and a Python script [05:32]. To make the theft work, the hackers have to bypass three layers of security by telling "three lies":

  * Lie 1: Bypassing the Lock Screen. Apple’s "Express Transit" mode allows users to tap and pay for subway rides without unlocking their phones [06:25]. The hacker's device broadcasts a code pretending to be a transit gate, tricking the locked phone into initiating a payment. The script then modifies a bit of data to tell the phone that the reader is offline.
  * Lie 2: Bypassing High-Value Verification. Normally, a $10,000 charge requires FaceID or a PIN. However, the phone relies on the *reader* to flag whether a transaction is "high value" or "low value." The script intercepts the terminal's request and flips the "high value" bit to a zero, tricking the phone into thinking it's approving a tiny transit fee [09:12].
  * Lie 3: Fooling the Payment Terminal. When the phone approves the transaction, it flags that no customer verification (FaceID/PIN) was provided. If the actual payment terminal sees this for a $10,000 charge, it will reject it. The script intercepts the phone's response and flips the verification bit to a one, tricking the terminal into believing the user verified the massive payment on their device [11:08].

### Why Visa and not Mastercard?

This specific hack only works with a Visa card set up in an iPhone's Express Transit slot [15:15].

While both Visa and Mastercard use symmetric cryptography (a shared secret key between the card and the bank), Mastercard adds a mandatory layer of *asymmetric* cryptography between the card and the reader [16:17]. This requires the card to send a unique digital signature. Because the hacker's script alters the transaction data, the signature wouldn't match, and Mastercard would block the payment. Visa, however, skips this signature check when the payment terminal is online, leaving a loophole for this specific attack to succeed.

### The Corporate Response

This vulnerability was made public by the researchers in 2021, yet it remains unpatched:

  * Apple: Stated this is a concern with the Visa system and noted Visa's stance on the matter [22:18].
  * Visa: Claimed that this type of fraud is highly unlikely to scale in the real world [22:43]. They argue their network defenses are adequate and point out that affected consumers are fully protected by Visa's zero-liability policy (meaning victims will be refunded).

### How to Protect Yourself

Since the exploit relies entirely on Apple's transit feature, you can easily protect yourself by either turning off Express Transit mode entirely, or ensuring you do not have a Visa card assigned as your primary transit card [21:44].

Watch the full video here: https://youtu.be/PPJ6NJkmDAo

http://googleusercontent.c
