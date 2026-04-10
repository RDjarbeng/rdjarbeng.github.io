---
layout: default
title: Search
permalink: /search/
description: Search posts, personal stories, and tech articles on rdjarbeng.com covering AI, web development, IoT, security, and more.
keywords: search, AI, web development, IoT, technology, security, education, Richard Djarbeng
---

<div class="search-page">
  <h1>Search</h1>

  <p class="search-page-intro">
    Find posts and personal articles across topics like AI, web development, IoT, security, and more.
    Use the search box below or browse by topic.
  </p>

  <div id="search-container">
    <input type="text" id="search-input" placeholder="Search posts and articles..." class="search-box" aria-label="Search posts and articles">
  </div>

  <div id="search-empty-hint" class="search-empty-hint">
    Start typing to search posts and articles&hellip;
  </div>

  <div id="search-browse-sections">
    <section class="search-browse-section" aria-label="Browse by topic">
      <h2 class="search-section-title">Browse by Topic</h2>
      <div class="search-category-chips">
        <a href="/categories/ai/" class="search-chip">AI</a>
        <a href="/categories/technology/" class="search-chip">Technology</a>
        <a href="/categories/web/" class="search-chip">Web</a>
        <a href="/categories/software-development/" class="search-chip">Software Dev</a>
        <a href="/categories/security/" class="search-chip">Security</a>
        <a href="/categories/iot/" class="search-chip">IoT</a>
        <a href="/categories/education/" class="search-chip">Education</a>
        <a href="/categories/research/" class="search-chip">Research</a>
        <a href="/categories/finance/" class="search-chip">Finance</a>
        <a href="/categories/news/" class="search-chip">News</a>
        <a href="/categories/space/" class="search-chip">Space</a>
        <a href="/categories/environment/" class="search-chip">Environment</a>
      </div>
    </section>

    <section class="search-browse-section" aria-label="Quick navigation links">
      <h2 class="search-section-title">Quick Links</h2>
      <div class="search-quick-links">
        <a href="/" class="search-quick-link">🏠 Home</a>
        <a href="/posts/" class="search-quick-link">📝 Latest Posts</a>
        <a href="/gallery/" class="search-quick-link">🖼️ Gallery</a>
        <a href="/personal/" class="search-quick-link">✍️ Personal</a>
        <a href="/tags/" class="search-quick-link">🏷️ Tags</a>
        <a href="/about/" class="search-quick-link">👤 About</a>
      </div>
    </section>
  </div>

  <div id="results-container" class="post-list" style="margin-top: 20px;"></div>
</div>

