---
date: 2025-11-25T11:14:00
published: true
author: Richard
tags:
  - PC
  - Windows
  - Hardware
title: Check Hardware Specifications for Windows Computers
image: '/assets/images/windows-hardware-specs-cover.png'
image_alt: 'Windows PC hardware specifications illustration'
description: 'Quick and easy ways to check your Windows PC hardware specs using built-in tools like dxdiag, System Information, and Settings.'
layout: post
categories:
  - Help
---

Need to know your PC's specs? Whether you're troubleshooting, upgrading, or just curious about what's under the hood, Windows has several built-in tools to help you find out. Here are the quickest methods.

## Method 1: DirectX Diagnostic Tool (dxdiag)

The **dxdiag** tool is a hidden gem for checking system specs, especially for display and audio hardware.

1. Press `Win + R` to open the Run dialog
2. Type `dxdiag` and press Enter
3. Click "Yes" if prompted to check for signed drivers

The **System** tab shows:
- Operating system version
- Processor (CPU) model and speed
- RAM (Memory)
- DirectX version
- System manufacturer and model

The **Display** tab reveals your graphics card details, including the GPU name, manufacturer, and video memory (VRAM).

> **Pro tip**: Click "Save All Information" to export a complete report as a text file — useful for sharing specs with tech support.

## Method 2: File Explorer Properties

This is the fastest way to see basic specs:

1. Open **File Explorer**
2. Right-click on **This PC** in the left sidebar
3. Select **Properties**

This opens the About page showing your processor, RAM, system type (64-bit or 32-bit), and Windows edition.

## Method 3: Settings App (Windows 11)

Windows 11 makes it easy through Settings:

1. Press `Win + I` to open Settings
2. Go to **System** → **About**

Here you'll find:
- Device name
- Processor
- Installed RAM
- Device ID and Product ID
- Windows edition and version

## Method 4: System Information (msinfo32)

For the most detailed view:

1. Press `Win + R`
2. Type `msinfo32` and press Enter

This tool shows *everything* — from BIOS version to hardware resources, components, and software environment. Expand the **Components** section to drill down into:
- Display adapters
- Sound devices
- Storage
- USB controllers
- Network adapters

## Method 5: Command Line (for power users)

Open **Command Prompt** or **PowerShell** and try:

```cmd
systeminfo
```

This outputs a detailed summary including OS info, hardware specs, network configuration, and uptime.

To save it to a file:
```cmd
systeminfo > systemreport.txt
```

## Quick Reference Table

| What You Need | Best Tool |
|---------------|-----------|
| Quick overview | Settings → About |
| GPU/Graphics info | dxdiag |
| Full hardware details | msinfo32 |
| Export to file | systeminfo (CMD) |

---

Now you know exactly where to look. No third-party software needed — Windows has you covered.
