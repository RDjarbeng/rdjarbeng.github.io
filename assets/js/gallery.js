document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxMediaContainer = document.getElementById('lightbox-media-container');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-nav.prev');
    const nextBtn = document.querySelector('.lightbox-nav.next');

    let currentIndex = 0;
    let visibleItems = [];

    // Filter Functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });

            // Update visible items list for lightbox navigation
            updateVisibleItems();
        });
    });

    function updateVisibleItems() {
        visibleItems = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
    }

    // Initial update
    updateVisibleItems();

    // Lightbox Functionality
    galleryItems.forEach((item) => {
        item.addEventListener('click', function () {
            // Find the index of this item in the visibleItems array
            currentIndex = visibleItems.indexOf(this);
            if (currentIndex !== -1) {
                openLightbox(currentIndex);
            }
        });
    });

    function openLightbox(index) {
        if (index < 0 || index >= visibleItems.length) return;

        const item = visibleItems[index];
        const type = item.getAttribute('data-type');
        const src = item.getAttribute('data-src');
        const caption = item.getAttribute('data-caption');

        lightboxMediaContainer.innerHTML = ''; // Clear previous content

        if (type === 'image') {
            const img = document.createElement('img');
            img.src = src;
            img.alt = caption;
            lightboxMediaContainer.appendChild(img);
        } else if (type === 'iframe') {
            const iframe = document.createElement('iframe');
            iframe.src = src;
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            lightboxMediaContainer.appendChild(iframe);
        } else if (type === 'html') {
            const htmlContent = item.querySelector('.gallery-html-content').innerHTML;
            const div = document.createElement('div');
            div.innerHTML = htmlContent;
            // Execute scripts if any (TikTok embed needs this)
            Array.from(div.querySelectorAll('script')).forEach(oldScript => {
                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });
            lightboxMediaContainer.appendChild(div);
        }

        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightboxMediaContainer.innerHTML = ''; // Stop video playback
        document.body.style.overflow = ''; // Restore scrolling
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % visibleItems.length;
        openLightbox(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        openLightbox(currentIndex);
    }

    // Event Listeners for Lightbox Controls
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });

    // Close on outside click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
});
