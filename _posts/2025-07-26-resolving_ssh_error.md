---
title: "Resolving SSH 'REMOTE HOST IDENTIFICATION HAS CHANGED' Error"
date: 2025-07-26
author: Richard
image: /assets/images/error_image.webp
categories: ["Software Engineering"]
tags: [Software engineering, SSH, fixing ssh error]
image_alt: "Cover image for Resolving SSH 'REMOTE HOST IDENTIFICATION HAS CHANGED' Error"
---

I got this error when connecting to my Raspberry Pi over SSH, using its IP address (raspberrypi.local gives the same result):

```sh
ssh user@192.168.xxx.xxx
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ECDSA key sent by the remote host is
SHA256:+nhOSw/fjrJ5J477c5HPQsWiGxYT6+jR2Aj4vce+9z0.
Please contact your system administrator.
Add correct host key in /path/to/.ssh/known_hosts to get rid of this message.
Offending ECDSA key in /path/to/.ssh/known_hosts:11
```

The first time you connect to a machine, SSH saves its host key, a kind of fingerprint, in a file called `known_hosts`. Every connection after that, it checks the fingerprint matches. If it does not, SSH refuses to connect, because a different fingerprint is exactly what you would see if someone were intercepting the connection.

With a Raspberry Pi, the usual cause is far more boring. Reflash the SD card and the Pi generates a brand new host key on first boot. Your router may also have given the same IP address to a different device. In both cases the old fingerprint in `known_hosts` is simply out of date. If you know you reinstalled the Pi or changed devices, the fix is to delete the old entry. If you did not change anything and see this on a network you do not trust, stop and find out why first.

![Red error warning illustration](/assets/images/error_image.webp)

You can remove the entry by hand:

1. **Locate the `known_hosts` file:**
   The file is typically located at `~/.ssh/known_hosts` on Unix-like systems (Linux, macOS) and at `C:\Users\<YourUsername>\.ssh\known_hosts` on Windows.

2. **Open the `known_hosts` file:**
   Any text editor works: `nano` or `vim` on Linux and macOS, Notepad on Windows.

3. **Find and remove the offending key:**
   The warning message specifies the line number where the offending key is located. In the example above, it's line 11. Remove the entire line 11 from the file.

4. **Save the changes and close the editor.**

Or, more simply, let SSH do it for you. This works in a terminal on Linux and macOS and in Command Prompt or PowerShell on Windows:

```sh
ssh-keygen -R 192.168.xxx.xxx
```

It removes every saved key for that address and keeps a backup of the old file as `known_hosts.old`. If you connect with `raspberrypi.local`, run it for that name too.

Then connect again:

```sh
ssh user@192.168.xxx.xxx
```
SSH treats it as a new machine and asks whether to trust the new host key. Type `yes` if you are confident it is your Pi. Then enter the password when prompted. Nothing appears on screen while you type it, not even dots, which catches a lot of people out. Type it anyway and press Enter.

If it worked, the prompt changes to your username and the Pi's hostname, like in the screenshot below.

![Terminal after a successful SSH login to the Raspberry Pi](https://github.com/user-attachments/assets/2ddcbef2-6527-4d9e-a2e6-6b89522bdfe4)


Error illustration: [source](https://sparwan.com/en/blogs/news/comment-resoudre-lerreur-ssh-warning-remote-host-identification-has-changed)