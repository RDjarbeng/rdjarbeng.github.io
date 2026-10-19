---
date: 2025-07-13T14:35:00
author: Richard
categories:
  - Technology
tags:
  - Sound
  - GitHub
  - Projects
title: 'Chirp: Transmitting Data Through Sound'
image: /assets/images/chirp_screenshot_data_with_sound.png
layout: post
image_alt: "Cover image for Chirp: Transmitting Data Through Sound"
---
[Chirp](https://github.com/solst-ice/chirp) is a small GitHub project by [solst-ice](https://github.com/solst-ice) that sends text from one device to another as sound. One browser plays a string of beeps through its speaker, another listens through its microphone and turns the beeps back into text. No Wi-Fi, no Bluetooth, no pairing. You can try it on the [demo site](https://chirp.hex.dance/) once you allow microphone access, and it is more fun with two devices in the same room.

![Chirp website showing a message being received on a live frequency spectrum](/assets/images/chirp_screenshot_data_with_sound.png "Chirp website showing a message being received on a live frequency spectrum")

## How it turns text into sound

I read through the code to see what the beeps actually are, and the scheme is refreshingly simple. Every character gets its own pitch:

- A space is 900 Hz.
- Punctuation and symbols sit between 1,300 and 4,600 Hz.
- The digits 0 to 9 run from 4,700 to 5,600 Hz.
- The letters A to Z run from 5,700 to 8,200 Hz.

Each step is 100 Hz apart, so the receiver has room to tell neighbours apart. Lowercase text is converted to uppercase before sending, which keeps the alphabet down to 26 tones.

A message starts with a 2,500 Hz tone and ends with a 2,700 Hz tone, so the listener knows when to start and stop recording characters. Each character plays for 70 milliseconds followed by a 30 millisecond gap. That works out at about ten characters a second, slow by any network standard but fast enough that a short message is over in a couple of seconds.

On the receiving side, the Web Audio API breaks the microphone input into its frequencies, the same thing the spectrum on screen is showing you. The decoder looks for the loudest tone, matches it to the nearest character within a small tolerance, and ignores repeats that arrive too quickly. To make the signal easier to pick out, each character is sent as two tones played together, 35 Hz apart.

## Getting a clean transmission

Sound is a noisy channel. A few things helped when I tried it:

- Use a quiet room. Talking, music or a fan adds frequencies that confuse the decoder.
- Turn the sending device's volume up and keep the two devices fairly close.
- Allow microphone access when the browser asks, otherwise the receiver hears nothing.

The README calls it a proof of concept with a simplified encoding scheme, and that is fair. There is no error correction, so a missed beep is a missed letter.

## Why I like it

Data over sound is not new. A startup also called Chirp built a business on it, and Sonos bought its technology in 2020. Modems were doing a version of this long before that. What I like about this project is that it is small enough to understand in an afternoon. It is a React and TypeScript app built with Vite, and the whole codec fits in one file. If you have ever wondered what "encoding" means in practice, changing a frequency table and hearing the result is a good way to find out.

It also turned out to be popular. The repository was created in February 2025, and within about five months it had nearly 600 stars. One of them caught my eye: `jackjackbits`, Jack Dorsey's GitHub account.

![Jack Dorsey's GitHub account starring the Chirp repository](/assets/images/jackjackbits_dorsey_stars_chirp.png "Jack Dorsey stars the Chirp repository on GitHub")

## Try it

Open the [demo site](https://chirp.hex.dance/) on two devices, or on one device with the volume up, and send yourself a message. The code is on [GitHub](https://github.com/solst-ice/chirp) if you want to see how it works.
