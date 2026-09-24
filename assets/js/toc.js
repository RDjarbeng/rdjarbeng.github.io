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
    const scrollPosition = window.scrollY + 120; // Offset for header
    let currentHeader = null;

    headers.forEach(header => {
      if (!header.id) return;
      const rect = header.getBoundingClientRect();
      const offsetTop = window.pageYOffset + rect.top;
      if (scrollPosition >= offsetTop) {
        currentHeader = header;
      }
    });

    tocLinks.forEach(link => link.classList.remove('active'));
    if (currentHeader) {
      const activeLink = document.querySelector(`#toc-content a[href="#${currentHeader.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  }

  // Smooth scroll listener via requestAnimationFrame
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        highlightActiveSection();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial check
  highlightActiveSection();
});