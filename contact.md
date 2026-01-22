---
layout: page
title: Contact Richard Djarbeng
permalink: /contact/
---

The preferred way to contact me is via the form below.

{% include contact-form.html %}

You can also reach me via email at <span id="email-text">rdjarbeng@rdjarbeng.com</span>
<button id="copy-email-btn" class="copy-btn" title="Copy to clipboard">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
</button>
<span id="copy-feedback" style="display: none; color: green; font-size: 0.8em; margin-left: 5px;">Copied!</span>

<script>
    document.getElementById('copy-email-btn').addEventListener('click', function() {
        const email = document.getElementById('email-text').innerText;
        navigator.clipboard.writeText(email).then(() => {
            const feedback = document.getElementById('copy-feedback');
            feedback.style.display = 'inline';
            setTimeout(() => {
                feedback.style.display = 'none';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy email: ', err);
        });
    });
</script>

### Social Media

*   [Twitter](https://twitter.com/DjarbengRichard)
*   [LinkedIn](https://linkedin.com/in/richarddjarbeng)
*   [GitHub](https://github.com/RDjarbeng)

<div class="donation-section" align="left">
  <p>Love my work? Support me with a small donation!</p>
  <a href="https://buymeacoffee.com/rdjarbeng" target="_blank">
    <button class="donate-btn">Support Me</button>
  </a>
</div>
