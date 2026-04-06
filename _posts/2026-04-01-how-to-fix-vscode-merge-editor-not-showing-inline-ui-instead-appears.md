---
date: 2026-04-01T15:25:00+02:00
published: false
author: Richard
category: Help
tags:
  - Vscode
  - IDE
title: How To Fix vscode merge editor not showing, inline ui instead appears
image: ''
image_alt: ''
layout: post
card_items: []
---

To show the VS Code merge editor instead of the inline UI, you need to enable the git.mergeEditor setting. The inline UI is the default experience in some VS Code versions, but the three-way merge editor offers a more comprehensive view.

## Steps to enable the merge editor

1. Open Settings: In VS Code, go to File > Preferences > Settings (on Windows/Linux) or Code > Settings (on macOS), or use the shortcut Ctrl + ,.
2. Search for "merge editor": In the search bar, type git.mergeEditor.
3. Enable the setting: Check the box next to Git: Merge Editor to enable the three-way merge view.
4. Restart VS Code (if necessary): Some changes may require reloading the window. You can do this by opening the Command Palette (Ctrl + Shift + P) and typing Developer: Reload Window
