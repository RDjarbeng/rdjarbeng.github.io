---
title: Can you steal $10,000 from a locked iPhone? Featuring MKBHD and Veritasium
published: true
date: 2026-04-15T23:20:00+02:00
platform: youtube
youtube_id: https://www.google.com/search?q=https://youtu.be/PPJ6NJkmDAo
embed_code: ''
thumbnail: ''
type: video
genre: Science & Technology
category: videos
---

In this video, Derek from Veritasium teams up with cybersecurity experts to demonstrate a real, unpatched vulnerability that allows hackers to drain funds from a locked iPhone without the user's knowledge. He successfully demonstrates this by "stealing" $10,000 from Marques Brownlee's (MKBHD) locked phone [03:09].

### The Mechanism: A Man-in-the-Middle Attack

The hack relies on intercepting and altering the near-field communication (NFC) data sent between an iPhone and a payment terminal using a device called a Prox Mark and a Python script [05:32]. To make the theft work, the hackers have to bypass three layers of security by telling "three lies":

    - Lie 1: Bypassing the Lock Screen. Apple’s "Express Transit" mode allows users to tap and pay for subway rides without unlocking their phones [06:25]. The hacker's device broadcasts a code pretending to be a transit gate, tricking the locked phone into initiating a payment. The script then modifies a bit of data to tell the phone that the reader is offline.
    - Lie 2: Bypassing High-Value Verification. Normally, a $10,000 charge requires FaceID or a PIN. However, the phone relies on the _reader_ to flag whether a transaction is "high value" or "low value." The script intercepts the terminal's request and flips the "high value" bit to a zero, tricking the phone into thinking it's approving a tiny transit fee [09:12].
    - Lie 3: Fooling the Payment Terminal. When the phone approves the transaction, it flags that no customer verification (FaceID/PIN) was provided. If the actual payment terminal sees this for a $10,000 charge, it will reject it. The script intercepts the phone's response and flips the verification bit to a one, tricking the terminal into believing the user verified the massive payment on their device [11:08].

### Why Visa and not Mastercard?

This specific hack only works with a Visa card set up in an iPhone's Express Transit slot [15:15].

While both Visa and Mastercard use symmetric cryptography (a shared secret key between the card and the bank), Mastercard adds a mandatory layer of _asymmetric_ cryptography between the card and the reader [16:17]. This requires the card to send a unique digital signature. Because the hacker's script alters the transaction data, the signature wouldn't match, and Mastercard would block the payment. Visa, however, skips this signature check when the payment terminal is online, leaving a loophole for this specific attack to succeed.

### The Corporate Response

This vulnerability was made public by the researchers in 2021, yet it remains unpatched:

    - Apple: Stated this is a concern with the Visa system and noted Visa's stance on the matter [22:18].
    - Visa: Claimed that this type of fraud is highly unlikely to scale in the real world [22:43]. They argue their network defenses are adequate and point out that affected consumers are fully protected by Visa's zero-liability policy (meaning victims will be refunded).

### How to Protect Yourself

Since the exploit relies entirely on Apple's transit feature, you can easily protect yourself by either turning off Express Transit mode entirely, or ensuring you do not have a Visa card assigned as your primary transit card [21:44].

### Chronological Breakdown of the Video Script

- **[00:00:00] The Heist Setup:** Derek introduces the premise with Marques Brownlee (MKBHD). Without Marques unlocking his phone, Derek places the locked iPhone on a device and successfully charges $5 to it via Apple Pay.
- **[00:02:00] The $10,000 Escalation:** Derek tests the limits of the exploit by typing a $10,000 charge into the terminal. Despite Marques believing a charge that high would absolutely require FaceID or a PIN, the terminal approves the $10,000 charge from the locked phone, leaving Marques stunned.
- **[00:04:00] The Hackers & The Loophole:** Derek introduces cybersecurity professors Yana Borenu and Tom Chofia from the University of Surrey. They explain that this hack was actually made public back in 2021. It uses a "Man-in-the-Middle" attack, where a device called a Proxmark intercepts the NFC data, passes it to a laptop running a Python script to alter the data, and then sends it to a burner phone to complete the transaction at the terminal.
- **[00:06:00] The First Lie (Bypassing the Lock Screen):** The script exploits Apple's "Express Transit" mode (introduced in 2019), which allows users to pay for subway rides without unlocking their phones. The hackers broadcast a transit gate code to wake the phone up, then flip a bit of binary code to convince the phone it is talking to an offline subway gate.
- **[00:08:20] The Second Lie (Bypassing FaceID):** To get $10,000 out, they have to bypass customer verification. The iPhone relies on the _reader_ to categorize a transaction as "high value" or "low value," rather than checking the number itself. The script intercepts the terminal's request and changes the "high value" flag to a zero, tricking the phone into thinking it's a small transit fee.
- **[00:10:19] The Third Lie (Fooling the Terminal):** The terminal expects proof that the customer verified a $10,000 charge. The script intercepts the phone's response and flips a zero to a one, artificially stamping the transaction as "verified on device."
- **[00:11:50] Why Samsung and Mastercard are Safe:** The video notes this _only_ works on iPhones, because Samsung phones check the actual numerical value of a transit charge (rejecting anything over $0). Furthermore, it only works if a **Visa** card is in the Express Transit slot.
- **[00:15:15] Symmetric vs. Asymmetric Cryptography:** The script takes a deep dive into cryptography. Mastercard uses asymmetric cryptography, requiring a unique digital signature between the card and the reader for every transaction. Because the hackers altered the data, this signature wouldn't match and Mastercard would block the hack. Visa, however, skips this digital signature check if the payment terminal is online—which is exactly how the hackers keep the loop open.
- **[00:20:14] Testing on the Crew:** To prove how easy this is to replicate in the real world, Derek successfully uses the hack to steal from his own card, as well as the channel's CFO.
- **[00:22:00] Apple and Visa's Response:** Derek explains that Apple declined an interview but sent a statement blaming the Visa system, citing Visa's "zero liability policy."
- **[00:22:35] The Visa Interview:** A Visa representative claims this vulnerability is highly unlikely to scale in the real world. Because in-person fraud is incredibly low (two cents for every $100 spent), Visa believes its network defenses are adequate, and that victims will just get their money refunded.
- **[00:24:28] The Conclusion:** Derek pushes back on Visa's logic using an airline analogy: airlines don't accept a small number of crashes as the "cost of doing business," they fix the technical issues. He concludes that even if a user gets refunded, waking up to a missing $10,000 can cause massive real-world stress (missed rent, bounced bills), and the tech industry should be expected to patch known vulnerabilities.
