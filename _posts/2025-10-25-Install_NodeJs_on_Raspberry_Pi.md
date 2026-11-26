---
layout: post
key_points:
  - "The simplest way to install and switch Node.js versions on a Raspberry Pi 4 is nvm, the Node Version Manager, which needs no sudo."
  - "Check whether your Raspberry Pi OS is 32-bit or 64-bit first. Node.js 22 is the last major version with official 32-bit ARM builds, and it is supported until April 2027. Node.js 24 and later have official ARM builds for 64-bit systems only."
  - "With nvm, `nvm install --lts` installs the current long-term support release and `nvm install 16` installs an older version for a legacy project."
  - "The post also keeps the manual method: download the official tarball and copy it into /usr/local."
title: "How to Install Node.js on a Raspberry Pi 4"
date: 2025-10-25
author: Richard
image: /assets/images/old_node_js.png
tags: [NodeJs, Raspberry Pi, raspberry pi 4B, node version install, Linux]
image_alt: "Cover image for How to Install Node.js on a Raspberry Pi 4"
series: "Raspberry Pi Setup"
series_part: 1
category: "Web & Software"
ai_assistance:
  - drafting
---
The easiest way to install Node.js on a Raspberry Pi 4 is nvm, the [Node Version Manager](https://github.com/nvm-sh/nvm). It needs no `sudo`, and you can switch between Node.js versions with one command. Before you start, check whether your Raspberry Pi OS is 32-bit or 64-bit, because that limits which versions you can install.

This guide was tested on a Raspberry Pi 4B and assumes your Pi is already set up; if not, start with the [official getting started guide](https://www.raspberrypi.com/documentation/computers/getting-started.html). Every command works over SSH. When I first wrote this post I installed Node.js from a tarball by hand; that method is still at the end.

## Check whether your OS is 32-bit or 64-bit

This decides which Node.js versions you can install. Run:

```
dpkg --print-architecture
```

- `arm64` means a 64-bit Raspberry Pi OS. Any current Node.js version works.
- `armhf` means a 32-bit OS.

Don't rely on `uname -m` for this. A Raspberry Pi 4 starts a 64-bit kernel by default, even under the 32-bit OS (the `arm_64bit` setting [defaults to 1 on the Pi 4](https://www.raspberrypi.com/documentation/computers/config_txt.html#arm_64bit)), so `uname -m` can print `aarch64` on a system that can't run 64-bit Node.js.

Why it matters: Node.js 22 is the last major version with official 32-bit ARM (`armv7l`) builds. It still gets updates, with support until April 2027 according to the [Node.js release schedule](https://github.com/nodejs/release#release-schedule). Node.js 24 and later have official ARM builds for 64-bit systems (`arm64`) only, as the [Node.js download index](https://nodejs.org/dist/index.json) shows. On a 32-bit OS, stay on Node.js 22, or reinstall the 64-bit Raspberry Pi OS if you need Node.js 24 or later.

## Install Node.js with nvm (recommended)

nvm installs Node.js in your home folder, so you don't need `sudo`, and you can keep several versions side by side.

If you installed Node.js earlier with `apt` (for example from NodeSource), remove it first so the two don't clash:

```
sudo apt remove nodejs
```

1. Install nvm. This is the install command from the [nvm README](https://github.com/nvm-sh/nvm#installing-and-updating) for version 0.41.0, the latest release as of November 2026:

    ```
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.41.0/install.sh | bash
    ```

2. Close and reopen the terminal (or run `source ~/.bashrc`) so the `nvm` command is available.

3. Install the current long-term support (LTS) release:

    ```
    nvm install --lts
    ```

    On a 32-bit OS, ask for Node.js 22 instead, the last major version with official 32-bit ARM builds:

    ```
    nvm install 22
    ```

4. Check that it worked:

    ```
    node --version
    npm --version
    ```

npm comes with Node.js, so there is nothing else to install.

## Switch between Node.js versions

This is where nvm saves time. Some older projects only run on an old version, such as Node.js 16:

```
nvm install 16
nvm use 16
```

`nvm ls` lists the versions you have, and `nvm alias default 22` picks the one a new terminal starts with. Node.js 16 stopped getting security updates in September 2023, and Node.js 18 in April 2025 (see the [Node.js release schedule](https://github.com/nodejs/release#release-schedule)). Use them only for a project that needs them.

## Manual install from the official tarball

This is the method from the first version of this post. It still works, but you have to repeat it for every upgrade. The example uses Node.js 18.18.0, the 32-bit build. Swap in a current version from the [Node.js download page](https://nodejs.org/en/download), and use the `arm64` file on a 64-bit OS.

```
wget https://nodejs.org/dist/v18.18.0/node-v18.18.0-linux-armv7l.tar.xz
tar -xvf node-v18.18.0-linux-armv7l.tar.xz
cd node-v18.18.0-linux-armv7l
sudo cp -R * /usr/local/
node --version
```

To remove a version installed this way, delete the copied files from `/usr/local/` (`bin/node`, `bin/npm`, `bin/npx`, `lib/node_modules` and `include/node`).

![Terminal output after installing Node.js on a Raspberry Pi](https://github.com/RDjarbeng/Install-NodeJs-on-Raspberry-Pi/assets/57795443/e01ff866-71f4-40ca-9767-88435c5b03e8)

## In short

Check the architecture with `dpkg --print-architecture`, install nvm, then run `nvm install --lts` on a 64-bit OS or `nvm install 22` on a 32-bit one. Use `nvm use <version>` whenever a project needs a different Node.js.
