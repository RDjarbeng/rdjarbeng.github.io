---
date: 2026-07-08T13:05:00+02:00
published: true
author: Richard
category: Help
tags:
  - Vscode
  - IDE
title: How To Fix vscode merge editor not showing in 1 minute
image: '/assets/images/posts/covers/vscode_merge_editor_cover.jpg'
image_alt: 'VSCode Merge Editor Fix'
layout: post
card_items: []
---

![How To Fix vscode merge editor not showing in 1 minute](/assets/images/posts/covers/vscode_merge_editor_cover.jpg)

Have you recently run into an issue where the three-way Merge Editor in VS Code just won't show up, and instead, you're stuck with the old inline UI? You are not alone. The inline UI is the default experience in some VS Code versions, but the dedicated three-way merge editor offers a much more comprehensive view for resolving tricky conflicts. 

Luckily, fixing this takes less than a minute.

## Steps to Enable the Merge Editor

1. **Open Settings**: In VS Code, go to `File > Preferences > Settings` (on Windows/Linux) or `Code > Settings` (on macOS). Alternatively, use the shortcut `Ctrl + ,` (or `Cmd + ,` on Mac).
2. **Search for "merge editor"**: In the search bar at the top, type `git.mergeEditor`.
3. **Enable the Setting**: Check the box next to **Git: Merge Editor** to enable the three-way merge view.
4. **Restart VS Code (if necessary)**: Some changes may require reloading the window to take effect. You can do this by opening the Command Palette (`Ctrl + Shift + P`) and typing `Developer: Reload Window`.

And that's it! Next time you encounter a merge conflict, VS Code will launch the powerful three-way merge editor to help you resolve it visually.
