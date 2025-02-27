fetch('/RDjarbeng/redirects.json')
  .then(response => response.json())
  .then(redirects => {
    const currentPath = window.location.pathname;
    const normalizedCurrentPath = decodeURIComponent(currentPath).replace(/\.html$/, '').toLowerCase();; // Decode and remove .html

    const redirect = redirects.find(r => {
      const normalizedOldUrl = decodeURIComponent(r.old_url).replace(/\.html$/, '').toLowerCase();; // Decode and remove .html
      return normalizedOldUrl === normalizedCurrentPath;
    });

    if (redirect) {
      window.location.href = redirect.new_url;
    } else {
      console.log(`No redirect found for: ${normalizedCurrentPath}`);
    }
  })
  .catch(error => console.error('Error loading redirects:', error));