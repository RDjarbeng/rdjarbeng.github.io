---
layout: post
title: "Install-NodeJs-on-Raspberry-Pi"
date: 2023-10-25
author: Richard
image: /assets/images/old_node_js.png
categories: ["Software Engineering"]
tags: [NodeJs, raspberry pi, node version install]
image_alt: "Cover image for Install-NodeJs-on-Raspberry-Pi"
---

<!-- Todo: fix this link -->
> For an updated version of this post see this post:
> [Installing NodeJs on the Pi -linux based system](https://rdjarbeng.com/Install_NodeJs_on_Raspberry_Pi/)

# How to install NodeJs on the Raspberry Pi 4
Tested on Raspberry Pi 4B using the terminal
Steps:
Assuming you have a Raspberry Pi already setup. If you need help setting up find resources [here](https://www.raspberrypi.com/documentation/computers/getting-started.html)
1. Turn on the raspberry Pi. <br> _Optional: If you are not using a monitor you can ssh into the Raspberry Pi and run the commands from there._
2. Open a terminal window
3. Run these commands to download node version 18.18.0 (LTS) from the terminal on the Raspberry Pi. You need to copy and paste these into the terminal or use a bash script.

### Commands
```
wget https://nodejs.org/dist/v18.18.0/node-v18.18.0-linux-armv7l.tar.xz

tar -xvf node-v18.18.0-linux-armv7l.tar.xz
cd node-v4.4.2-linux-armv7l
sudo cp -R * /usr/local/
```
### Check installation
4. To check if the NodeJs installation worked run this:
```
node –-version
```

This should print out the current NodeJs version; The commands given installed version 18.18.0. For installing packages **npm** should come installed with your version of NodeJs if you installed a recent version of NodeJs.

## Installing different Node versions
_Optional_
If you wish to change the node version to install, you can change the link in the command. Here we used version 18.18.0: `https://nodejs.org/dist/v18.18.0/node-v18.18.0-linux-armv7l.tar.xz`

but you can use any link from the [NodeJs download page](https://nodejs.org/en/download) . Use the ARM7 linux binaries link if you need to install a different version on the Raspberry pi 4B.

![image](https://github.com/RDjarbeng/Install-NodeJs-on-Raspberry-Pi/assets/57795443/e01ff866-71f4-40ca-9767-88435c5b03e8)
