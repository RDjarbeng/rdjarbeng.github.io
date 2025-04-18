document.addEventListener('DOMContentLoaded', () => {
    const postCards = document.querySelectorAll('.post-list .post-card');
    
    // Use IntersectionObserver to trigger animations on scroll
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Calculate delay based on card index within its .post-list
            const delay = index * 100; // 100ms delay per card
            entry.target.style.animationDelay = `${delay}ms`;
            entry.target.classList.add('animate');
            observer.unobserve(entry.target); // Stop observing once animated
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the card is visible
        rootMargin: '0px' // Adjust if needed for earlier/later triggering
      }
    );
    
    // Observe each post card
    postCards.forEach((card) => {
      observer.observe(card);
    });
  });