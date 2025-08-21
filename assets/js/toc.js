document.addEventListener('DOMContentLoaded', () => {
  const tocToggle = document.querySelector('.toc-toggle');
  const tocContent = document.querySelector('#toc-content');
  const headers = document.querySelectorAll('h1, h2, h3, h4'); // Adjust based on your heading levels
  const tocLinks = document.querySelectorAll('#toc-content a');

  // Toggle TOC on mobile
  if (tocToggle && tocContent) {
    tocToggle.addEventListener('click', () => {
      tocContent.classList.toggle('active');
    });
  }

  // Highlight active section on scroll
  function highlightActiveSection() {
    let scrollPosition = window.scrollY + 100; // Offset for better accuracy

    headers.forEach(header => {
      const sectionId = header.id;
      const tocLink = document.querySelector(`#toc-content a[href="#${sectionId}"]`);
      const rect = header.getBoundingClientRect();
      const offsetTop = window.pageYOffset + rect.top;

      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + header.offsetHeight + 100) {
        tocLinks.forEach(link => link.classList.remove('active'));
        if (tocLink) tocLink.classList.add('active');
      }
    });
  }

  // Debounce scroll event
  let debounceTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(highlightActiveSection, 100);
  });

  // Initial check
  highlightActiveSection();
});