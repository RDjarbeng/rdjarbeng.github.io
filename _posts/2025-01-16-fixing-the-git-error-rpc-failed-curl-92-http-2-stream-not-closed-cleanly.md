---
date: 2025-01-16T13:29:00
author: Richard
categories:
  - Help
tags:
  - Git
  - Git Stream not closed
  - stackoverflow
  - git error
title: 'Fixing the Git Error: RPC Failed; curl 92 HTTP/2 Stream Not Closed Cleanly'
image: /assets/images/git_stream_error_screenshot.png
video: ''
layout: post
---
If you've encountered the following error while using Git, you're not alone:

```

error: RPC failed; curl 92 HTTP/2 stream 5 was not closed cleanly before end of the underlying stream

error: 7844 bytes of body are still expected

fetch-pack: unexpected disconnect while reading sideband packet

fatal: early EOF

fatal: unpack-objects failed

```

![Screenshot of git stream error](/assets/images/git_stream_error_screenshot.png "Screenshot of git stream error")

Here's how I resolved this issue.

#### **Solution That Worked for Me**

The solution that worked for me was increasing Git's `http.postBuffer` size. This configuration adjusts the buffer size used by Git when sending data over HTTP, which can help when dealing with large repositories or unstable connections.

Run the following command in your terminal:

```bash

git config http.postBuffer 524288000

```

This sets the buffer size to **500 MB**, which is often sufficient to resolve this issue. Note that this command applies only to the current repository. If you'd like to apply it globally across all repositories, add the `--global` flag:

```bash

git config --global http.postBuffer 524288000

```

#### **Acknowledgment**

This solution was inspired by a helpful answer from [Juhikushwah](https://stackoverflow.com/users/16789486/juhikushwah) on Stack Overflow. You can find more details on their post [here](https://stackoverflow.com/questions/59282476/error-rpc-failed-curl-92-http-2-stream-0-was-not-closed-cleanly-protocol-erro).

![Stackoverflow answer to git stream error](/assets/images/git_stream_error_stackoverflow.png "Stackoverflow answer to git stream error")

#### **Conclusion**

The `RPC failed` error can be frustrating, but adjusting Git's buffer size often resolves it quickly.

Citations:

[1] https://stackoverflow.com/questions/59282476/error-rpc-failed-curl-92-http-2-stream-0-was-not-closed-cleanly-protocol-erro/59474908
