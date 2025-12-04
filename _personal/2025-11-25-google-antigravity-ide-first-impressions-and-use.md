---
title: Google antigravity IDE first impressions and use
date: 2025-11-25T11:11:00
published: false
tags:
  - IDE
image: ''
image_alt: ''
layout: personal
---
antigravity IDE- tested, makes a lot of unnecessary changes especially white space

Can create python scripts that do bulk tasks. Seems to prefer this. Actually inferred my python version and run this.

Advantages, it doesn't lag like the copilot vscode and doesn't complain when it has to do work across multiple files. Seems to understand the file structure and can infer what type of project it is. For instance I never told it that my website was a jekyll one deployed on Github pages but it was able to infer this. Probably based on the config and the files present in the repository

Doesn't seem to know when it breaks something and doesn't seem to have access to the terminal output to see errors unless I tell it. 

#### Loading issue:

Sometimes it can be done with a task but take a while to generate the walkthroughs, and shows 'generating' or 'loading'. The walkthroughs are usually several paragraphs which for me is too long. I usually only care about the results; if the feature worked or not. The implementation details are not always necessary for me since I can usually see the modified files/code and have to click accept for the changes to remain. Perhaps there should be an option to specify short or summarized walkthroughs vs longer walkthroughs.

#### Jupyter notebook: 

When editing content in jupyter notebooks it usually prefers to run python commands in the terminal and then append to the notebook. I am yet to test it's ability to change code cells and markdown cells directly though.

![Antigravity stalling whilst coding so](/assets/images/antigravity_stalling_whilst_coding.png)

For the antigravity browser because of the time it takes to reason and implement tasks, you are better off giving it tasks and coming back to check later, maybe this is what agentic means, because micromanaging it and waiting in front of the screen will just waste your time. One example is if you want to test that a feature is working on your website, say the search functionality. Instead of watching the agent launch the browser and run tests and different queries, you can tell it to run the tests, leave it for a few minutes whilst you switch to another task and then come back to read the walkthrough generated at the end. This would contain all the information you need about the tests, but the advantage is you wouldn't need to be watching the agent the entire time.
