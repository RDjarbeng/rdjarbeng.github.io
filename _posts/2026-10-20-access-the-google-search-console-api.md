---
date: 2026-10-20T11:12:00+02:00
published: false
author: Richard
category: Technology
tags: []
series: ''
series_part: null
key_points: []
title: Access the Google Search Console API
image: ''
image_alt: ''
layout: post
card_items: []
---

Note to agent: This post needs work, especially on the part where the user has to switch to the google search console and add the user to property

Step 1: Enable the API in Google Cloud

1. Go to the [Google Cloud Console](https://console.cloud.google.com/). [[1](https://www.hobo-web.co.uk/how-to-set-up-google-search-console-api/)]
2. Click the project dropdown at the top and select an existing project, or click **New Project** to create a new one. [[1](https://developers.google.com/workspace/cloud-search/docs/guides/project-setup), [2](https://www.youtube.com/watch?v=r1azWA9a4jk)]
3. Open the left menu, navigate to **APIs & Services**, and select **Library**. [[1](https://apps.make.com/google-search-console), [2](https://docs.cloud.google.com/apis/docs/getting-started)]
4. Search for "**Google Search Console API**". [[1](https://www.hobo-web.co.uk/how-to-set-up-google-search-console-api/), [2](https://apps.make.com/google-search-console)]
5. Click on the API and click **Enable**. [[1](https://docs.cloud.google.com/apis/docs/getting-started), [2](https://apps.make.com/google-search-console)]

Step 2: Configure Credentials

Because Search Console data is private, you must prove you own or have permission to access the site property. Choose one of the following methods depending on your use case: [[1](https://console.cloud.google.com/apis/library/searchconsole.googleapis.com), [2](https://developers.google.com/webmaster-tools/about)]

- **For Scripts, Apps, or Third-Party Tools (OAuth 2.0):**
    1. In **APIs & Services**, click **OAuth consent screen**, select your user type, and fill out the required app profile details.
    2. Go to **Credentials**, click **Create Credentials**, and select **OAuth client ID**.
    3. Choose your application type (e.g., _Web application_ or _Desktop app_).
    4. Set up your **Authorized redirect URIs** (provided by the tool you are connecting, such as N8N or Make).
    5. Copy the generated **Client ID** and **Client Secret**. [[1](https://www.youtube.com/watch?v=HT56wExnN5k&t=59), [2](https://developers.google.com/webmaster-tools/v1/how-tos/authorizing), [3](https://www.youtube.com/watch?v=r1azWA9a4jk), [4](https://apps.make.com/google-search-console)]
- **For Automated Backend Servers (Service Account):**
    1. Go to **Credentials**, click **Create Credentials**, and select **Service account**.
    2. Provide a name, finish the setup, and open the new service account profile.
    3. Go to the **Keys** tab, click **Add Key** > **Create new key**, and download the **JSON file**.
    4. _Crucial:_ Copy the service account's unique email address and add it as a user (with at least "Read" permission) inside your [Google Search Console](https://search.google.com/search-console) settings dashboard. [[1](https://developers.google.com/webmaster-tools/about), [2](https://www.youtube.com/watch?v=EA4uWb8UsiU)]

Step 3: Authorization Scopes

When making API requests (e.g., using Python, R, or HTTP clients), you will need to request one of these two scopes: [[1](https://www.r-bloggers.com/2019/03/how-to-use-google-search-console-api-with-r/), [2](https://www.youtube.com/watch?v=HT56wExnN5k&t=59)]

- `https://www.googleapis.com/auth/webmasters.readonly` (To pull performance data and list sites)
- `https://www.googleapis.com/auth/webmasters` (Full access to add/remove sites and sitemaps) [[1](https://developers.google.com/webmaster-tools/v1/how-tos/authorizing), [2](https://www.youtube.com/watch?v=HT56wExnN5k&t=59), [3](https://developers.google.com/webmaster-tools/about)]
