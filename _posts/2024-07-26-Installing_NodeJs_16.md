---
title: "Installing and removing Node.js on linux-based Systems-for raspberry pi 4B "
date: 2024-07-26
author: Richard
 image :/assets/images/nodejs_2024.png
categories: ["IoT"]
tags: [Nodejs, installation, raspberry pi, raspberry pi 4B, linux]
---


To install Node.js 16 after uninstalling Node.js 18, you can use the NodeSource repository to get the specific version you want. Here's a step-by-step guide using the terminal:

![NodeJs site July 2024 screenshot ](/RDjarbeng/assets/images/nodejs_2024.png)

### Remove the existing Node.js version

```
sudo apt remove nodejs
```

### Install the NodeSource repository for Node.js 16

```
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
```

### Install Node.js 16

```
sudo apt install -y nodejs
```

This will install Node.js 16 on your system. You can verify the installation by checking the version:

```
node -v
```

This should output the version of Node.js 16 that you just installed.