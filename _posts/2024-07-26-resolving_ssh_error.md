---
title: "Resolving SSH 'REMOTE HOST IDENTIFICATION HAS CHANGED' Error"
date: 2024-07-26
author: Richard
image: /assets/images/error_image.webp
categories: ["Software Engineering"]
tags: [Software engineering, SSH, fixing ssh error]
---

If you encounter this error when connecting to your Raspberry Pi via SSH using its IP address or rasperrypi.local:

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

This warning appears because the SSH client has detected a change in the host key of the remote server, which could be due to a legitimate change in the server's configuration or it could indicate a potential security risk like a man-in-the-middle attack. If you are certain that the change is legitimate, you can resolve this issue by removing the old key from the `known_hosts` file.

![error image red ](/assets/images/error_image.webp)

Here’s how you can do it:

1. **Locate the `known_hosts` file:**
   The file is typically located at `~/.ssh/known_hosts` on Unix-like systems (Linux, macOS) and at `C:\Users\<YourUsername>\.ssh\known_hosts` on Windows.

2. **Open the `known_hosts` file:**
   You can open it using a text editor. For example, on Unix-like systems, you can use `nano` or `vim`, and on Windows, you can use Notepad.

3. **Find and remove the offending key:**
   The warning message specifies the line number where the offending key is located. In the example above, it’s line 11. Remove the entire line 11 from the file.

4. **Save the changes and close the editor.**

Alternatively, you can use the following command in your terminal or command prompt to remove the offending key:

```sh
ssh-keygen -R 192.168.xxx.xxx
```

This command will automatically remove the offending key from the `known_hosts` file.

After doing this, you can try connecting to the Raspberry Pi again:

```sh
ssh user@192.168.xxx.xxx
```
If this works, the first time you connect, SSH will prompt you to accept the new host key. If you are confident that the connection is secure, you can accept the new key by typing `yes`. And continue the ssh connection to the pi by typing the password when prompted. The password is not shown as text in the terminal. You just have to type it without being able to see it on the screen and hit enter.

If it works you should now see the working directory showing as the hostname and user similar to the screenshot below.

![Screenshot_successful_ssh_on_pi](https://github.com/user-attachments/assets/2ddcbef2-6527-4d9e-a2e6-6b89522bdfe4)


Image: [source](https://sparwan.com/en/blogs/news/comment-resoudre-lerreur-ssh-warning-remote-host-identification-has-changed)