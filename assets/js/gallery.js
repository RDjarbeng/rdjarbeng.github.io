document.addEventListener('DOMContentLoaded', function () {
    const DEFAULT_THUMBNAIL = '/assets/images/webOrMobile.jpeg';
    // DOM Elements
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-nav.prev');
    const nextBtn = document.querySelector('.lightbox-nav.next');
    const dashboardContainer = document.getElementById('gallery-dashboard');
    const gridViewContainer = document.getElementById('gallery-grid-view');
    const gridContainer = document.getElementById('gallery-grid');
    const gridCategoryTitle = document.getElementById('grid-category-title');
    const backToDashboardBtn = document.getElementById('back-to-dashboard');
    const paginationContainer = document.getElementById('gallery-pagination');
    const galleryDataContainer = document.getElementById('gallery-data');
    const filterButtons = document.querySelectorAll('.gallery-filter');

    // Lightbox Elements
    const lightbox = document.getElementById('gallery-modal');
    const lightboxMediaContainer = document.getElementById('lightbox-media-container');
    const lightboxCaption = document.querySelector('.lightbox-caption');

    // State
    let allItems = [];
    let currentCategory = 'all';
    let currentPage = 1;
    const itemsPerPage = 12;
    let currentView = 'dashboard'; // 'dashboard' or 'grid'
    let visibleItems = []; // For lightbox navigation
    let currentLightboxIndex = 0;

    // Categories Configuration
    const imageCategories = [
        { id: 'cover-images', title: 'Cover Images', filter: item => item.dataset.category.includes('cover-images') },
        { id: 'ai-generations', title: 'AI Generations', filter: item => item.dataset.category.includes('ai-generations') },
        { id: 'memes', title: 'Memes', filter: item => item.dataset.category.includes('memes') },
        { id: 'ghana', title: 'Ghana', filter: item => item.dataset.category.includes('ghana') }
    ];

    const videoCategories = [
        { id: 'videos', title: 'Videos', filter: item => item.dataset.category.includes('videos') },
        { id: 'tiktok', title: 'TikTok', filter: item => item.dataset.category.includes('tiktok') },
        { id: 'instagram', title: 'Instagram', filter: item => item.dataset.category.includes('instagram') },
        { id: 'youtube', title: 'YouTube', filter: item => item.dataset.category.includes('youtube') },
        { id: 'twitter', title: 'Twitter/X', filter: item => item.dataset.category.includes('twitter') }
    ];

    const allCategories = [...imageCategories, ...videoCategories];

    // Initialize
    function init() {
        // Parse data items
        const dataItems = galleryDataContainer.querySelectorAll('.gallery-data-item');
        allItems = Array.from(dataItems).map(item => item); // Keep the DOM elements

        // Check URL params for deep linking or view state
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        const pageParam = parseInt(urlParams.get('page')) || 1;

        // Check for deep link path
        const currentPath = window.location.pathname;
        const isDeepLink = currentPath.startsWith('/gallery/') && currentPath !== '/gallery/';

        if (isDeepLink) {
            // Handle deep link (open lightbox)
            // Pass false to prevent renderDashboard from overwriting the URL before we check it
            renderDashboard(false);
            checkDeepLink(currentPath);
        } else if (categoryParam) {
            // Open specific category grid
            switchToGrid(categoryParam, pageParam);
        } else {
            // Default to dashboard
            renderDashboard(true);
        }

        setupEventListeners();
    }

    // --- Rendering Logic ---

    function renderDashboard(updateUrl = true) {
        currentView = 'dashboard';
        currentCategory = 'all';
        dashboardContainer.innerHTML = '';
        dashboardContainer.style.display = 'block';
        gridViewContainer.style.display = 'none';

        updateActiveFilter('all');

        // Update URL only if requested
        if (updateUrl) {
            history.pushState({ view: 'dashboard' }, 'Gallery', '/gallery/');
        }

        // Render strips for IMAGE categories only
        imageCategories.forEach(category => {
            const categoryItems = allItems.filter(category.filter);
            if (categoryItems.length === 0) return;

            const section = document.createElement('div');
            section.className = 'dashboard-category';

            const header = document.createElement('div');
            header.className = 'dashboard-category-header';
            header.innerHTML = `
                <h3 class="dashboard-category-title">${category.title}</h3>
                <a class="view-all-link" data-category="${category.id}">View All</a>
            `;

            const scrollContainer = document.createElement('div');
            scrollContainer.className = 'horizontal-scroll-container'; // Updated class name

            // Take first 6 items
            const previewItems = categoryItems.slice(0, 6);

            previewItems.forEach(item => {
                const dashboardItem = createDashboardItem(item);
                scrollContainer.appendChild(dashboardItem);
            });

            // Add "View All" card
            const viewAllCard = document.createElement('div');
            viewAllCard.className = 'dashboard-item dashboard-view-all-card';
            viewAllCard.innerHTML = `
                <span class="view-all-icon">➜</span>
                <span>View All</span>
            `;
            viewAllCard.addEventListener('click', () => switchToGrid(category.id));
            scrollContainer.appendChild(viewAllCard);

            section.appendChild(header);
            section.appendChild(scrollContainer);
            dashboardContainer.appendChild(section);

            // Add event listener to header link
            header.querySelector('.view-all-link').addEventListener('click', () => switchToGrid(category.id));
        });
    }

    function createDashboardItem(dataItem) {
        const item = document.createElement('div');
        item.className = 'dashboard-item';

        const type = dataItem.dataset.type;
        const src = dataItem.dataset.thumb || dataItem.dataset.src;
        const title = dataItem.dataset.title;

        let imgContent;
        if (src && src.trim() !== '') {
            imgContent = `<img src="${src}" alt="${title}" loading="lazy" onerror="this.onerror=null;this.src='${DEFAULT_THUMBNAIL}';">`;
        } else {
            imgContent = `<img src="${DEFAULT_THUMBNAIL}" alt="${title}" loading="lazy">`;
        }

        item.innerHTML = `
            <div class="gallery-thumb-wrapper">
                ${imgContent}
                <div class="gallery-overlay">
                    <span class="gallery-title">${title}</span>
                </div>
                ${type === 'html' ? '<div class="video-icon-wrapper"><span class="gallery-type-icon" style="position:absolute;bottom:10px;right:10px;color:white;font-size:20px;">▶</span></div>' : ''}
            </div>
        `;

        item.addEventListener('click', () => {
            const categoryId = getCategoryFromItem(dataItem);
            const categoryItems = allItems.filter(i => i.dataset.category.includes(categoryId));
            visibleItems = categoryItems;
            currentLightboxIndex = visibleItems.indexOf(dataItem);
            openLightbox(currentLightboxIndex, true);
        });

        return item;
    }

    function getCategoryFromItem(item) {
        // Helper to find primary category
        for (const cat of allCategories) {
            if (item.dataset.category.includes(cat.id)) return cat.id;
        }
        return 'all';
    }

    function switchToGrid(categoryId, page = 1) {
        currentView = 'grid';
        currentCategory = categoryId;
        currentPage = page;

        dashboardContainer.style.display = 'none';
        gridViewContainer.style.display = 'block';

        updateActiveFilter(categoryId);

        const categoryDef = allCategories.find(c => c.id === categoryId);
        gridCategoryTitle.textContent = categoryDef ? categoryDef.title : 'Gallery';

        // Update URL
        const url = new URL(window.location);
        url.searchParams.set('category', categoryId);
        url.searchParams.set('page', page);
        history.pushState({ view: 'grid', category: categoryId, page: page }, `Gallery - ${categoryDef ? categoryDef.title : ''}`, url);

        renderGridItems();
    }

    function renderGridItems() {
        gridContainer.innerHTML = '';

        const categoryDef = allCategories.find(c => c.id === currentCategory);
        const filteredItems = categoryDef ? allItems.filter(categoryDef.filter) : allItems;

        // Update visible items for lightbox
        visibleItems = filteredItems;

        // Pagination Logic
        const totalItems = filteredItems.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        // Ensure current page is valid
        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageItems = filteredItems.slice(startIndex, endIndex);

        pageItems.forEach(dataItem => {
            const gridItem = createGridItem(dataItem);
            gridContainer.appendChild(gridItem);
        });

        renderPagination(totalPages);
    }

    function createGridItem(dataItem) {
        const item = document.createElement('a');
        item.className = 'gallery-item';
        item.href = dataItem.dataset.url; // For SEO/fallback

        const type = dataItem.dataset.type;
        const src = dataItem.dataset.thumb || dataItem.dataset.src;
        const title = dataItem.dataset.title;

        let imgContent;
        if (src && src.trim() !== '') {
            imgContent = `<img src="${src}" alt="${title}" loading="lazy" onerror="this.onerror=null;this.src='${DEFAULT_THUMBNAIL}';">`;
        } else {
            imgContent = `<img src="${DEFAULT_THUMBNAIL}" alt="${title}" loading="lazy">`;
        }

        item.innerHTML = `
            <div class="gallery-thumb-wrapper">
                ${imgContent}
                <div class="gallery-overlay">
                    <span class="gallery-title">${title}</span>
                </div>
                ${type === 'html' ? '<div class="video-icon-wrapper"><span class="gallery-type-icon" style="position:absolute;bottom:10px;right:10px;color:white;font-size:20px;">▶</span></div>' : ''}
            </div>
        `;

        item.addEventListener('click', (e) => {
            e.preventDefault();
            currentLightboxIndex = visibleItems.indexOf(dataItem);
            openLightbox(currentLightboxIndex, true);
        });

        return item;
    }

    function renderPagination(totalPages) {
        paginationContainer.innerHTML = '';
        if (totalPages <= 1) return;

        const template = document.getElementById('pagination-template');
        const clone = template.content.cloneNode(true);

        const firstBtn = clone.querySelector('.first-page-btn');
        const prevBtn = clone.querySelector('.prev-page-btn');
        const nextBtn = clone.querySelector('.next-page-btn');
        const lastBtn = clone.querySelector('.last-page-btn');
        const pageNumbers = clone.querySelector('.page-numbers');

        // Setup Prev/Next/First/Last
        if (currentPage > 1) {
            firstBtn.classList.remove('disabled');
            prevBtn.classList.remove('disabled');
            firstBtn.onclick = () => changePage(1);
            prevBtn.onclick = () => changePage(currentPage - 1);
        }

        if (currentPage < totalPages) {
            nextBtn.classList.remove('disabled');
            lastBtn.classList.remove('disabled');
            nextBtn.onclick = () => changePage(currentPage + 1);
            lastBtn.onclick = () => changePage(totalPages);
        }

        // Page Numbers Logic
        const trail = 2;
        let start = Math.max(1, currentPage - trail);
        let end = Math.min(totalPages, currentPage + trail);

        if (start > 1) {
            pageNumbers.appendChild(createPageLink(1));
            if (start > 2) pageNumbers.appendChild(createEllipsis());
        }

        for (let i = start; i <= end; i++) {
            if (i === currentPage) {
                const span = document.createElement('span');
                span.className = 'current-page';
                span.textContent = i;
                pageNumbers.appendChild(span);
            } else {
                pageNumbers.appendChild(createPageLink(i));
            }
        }

        if (end < totalPages) {
            if (end < totalPages - 1) pageNumbers.appendChild(createEllipsis());
            pageNumbers.appendChild(createPageLink(totalPages));
        }

        paginationContainer.appendChild(clone);
    }

    function createPageLink(page) {
        const a = document.createElement('a');
        a.textContent = page;
        a.onclick = () => changePage(page);
        return a;
    }

    function createEllipsis() {
        const span = document.createElement('span');
        span.className = 'ellipsis';
        span.textContent = '...';
        return span;
    }

    function changePage(page) {
        currentPage = page;
        // Update URL
        const url = new URL(window.location);
        url.searchParams.set('page', page);
        history.pushState({ view: 'grid', category: currentCategory, page: page }, '', url);

        renderGridItems();
        window.scrollTo(0, 0);
    }

    function updateActiveFilter(filterId) {
        filterButtons.forEach(btn => {
            if (btn.dataset.filter === filterId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    function setupEventListeners() {
        // Nav Filters
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                if (filter === 'all') {
                    renderDashboard();
                } else {
                    switchToGrid(filter);
                }
            });
        });

        backToDashboardBtn.addEventListener('click', () => {
            renderDashboard();
        });

        // Browser Back/Forward
        window.addEventListener('popstate', (e) => {
            if (e.state) {
                if (e.state.view === 'grid') {
                    switchToGrid(e.state.category, e.state.page);
                } else if (e.state.view === 'dashboard') {
                    renderDashboard();
                } else if (e.state.index !== undefined && e.state.index !== -1) {
                    // Lightbox state
                    openLightbox(e.state.index, false);
                } else {
                    // Close lightbox
                    closeLightbox(false);
                }
            } else {
                // Default
                renderDashboard();
            }
        });
    }

    // --- Lightbox Logic (Reused & Adapted) ---

    function openLightbox(index, updateHistory = false) {
        if (index < 0 || index >= visibleItems.length) return;
        currentLightboxIndex = index;

        const item = visibleItems[index];
        const type = item.dataset.type;
        const src = item.dataset.src;
        const caption = item.dataset.caption;
        const title = item.dataset.title;
        const date = item.dataset.date;

        lightboxMediaContainer.innerHTML = ''; // Clear previous

        document.querySelector('.lightbox-title').textContent = title || '';
        document.querySelector('.lightbox-date').textContent = date || '';
        lightboxCaption.innerHTML = caption || '';

        if (type === 'image') {
            const img = document.createElement('img');
            img.src = src;
            img.alt = title;
            lightboxMediaContainer.appendChild(img);
        } else if (type === 'html') {
            // Clone the hidden HTML content
            const htmlContent = item.querySelector('.gallery-html-content').innerHTML;
            const div = document.createElement('div');
            div.innerHTML = htmlContent;
            // Execute scripts if any
            Array.from(div.querySelectorAll('script')).forEach(oldScript => {
                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });
            lightboxMediaContainer.appendChild(div);
        }

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (updateHistory) {
            const url = item.dataset.url; // Use the permalink URL
            // Push state for lightbox on top of current view
            history.pushState({ index: index, view: currentView, category: currentCategory, page: currentPage }, title, url);
        }
    }

    function closeLightbox(updateHistory = true) {
        lightbox.classList.remove('active');
        lightboxMediaContainer.innerHTML = '';
        document.body.style.overflow = '';

        if (updateHistory) {
            // Go back to current view URL
            const url = new URL(window.location);
            if (currentView === 'grid') {
                url.pathname = '/gallery/';
                url.searchParams.set('category', currentCategory);
                url.searchParams.set('page', currentPage);
            } else {
                url.pathname = '/gallery/';
                url.search = '';
            }
            history.pushState({ view: currentView, category: currentCategory, page: currentPage }, 'Gallery', url);
        }
    }

    function showNext() {
        currentLightboxIndex = (currentLightboxIndex + 1) % visibleItems.length;
        openLightbox(currentLightboxIndex, true);
    }

    function showPrev() {
        currentLightboxIndex = (currentLightboxIndex - 1 + visibleItems.length) % visibleItems.length;
        openLightbox(currentLightboxIndex, true);
    }

    // Lightbox Controls
    closeBtn.addEventListener('click', () => closeLightbox());
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });

    // Deep Link Check
    function checkDeepLink(pathToCheck) {
        const normalizePath = (path) => {
            try {
                let decoded = decodeURIComponent(path);
                if (decoded.endsWith('/') && decoded.length > 1) {
                    decoded = decoded.slice(0, -1);
                }
                return decoded;
            } catch (e) {
                return path;
            }
        };

        // Use passed path or current location
        const currentPath = normalizePath(pathToCheck || window.location.pathname);

        if (currentPath.startsWith('/gallery/') && currentPath !== '/gallery') {
            const targetItem = allItems.find(item => {
                try {
                    const itemUrl = new URL(item.dataset.url, window.location.origin);
                    const itemPath = normalizePath(itemUrl.pathname);
                    return itemPath === currentPath;
                } catch (e) {
                    return false;
                }
            });

            if (targetItem) {
                const categoryId = getCategoryFromItem(targetItem);
                const categoryItems = allItems.filter(i => i.dataset.category.includes(categoryId));
                visibleItems = categoryItems;
                currentLightboxIndex = visibleItems.indexOf(targetItem);
                openLightbox(currentLightboxIndex, false);
            } else {
                // Fallback: Try matching by slug from URL
                const urlSlug = currentPath.split('/').pop();
                const fallbackItem = allItems.find(item => {
                    try {
                        const itemUrl = new URL(item.dataset.url, window.location.origin);
                        const itemSlug = normalizePath(itemUrl.pathname).split('/').pop();
                        return itemSlug === urlSlug;
                    } catch (e) { return false; }
                });

                if (fallbackItem) {
                    const categoryId = getCategoryFromItem(fallbackItem);
                    const categoryItems = allItems.filter(i => i.dataset.category.includes(categoryId));
                    visibleItems = categoryItems;
                    currentLightboxIndex = visibleItems.indexOf(fallbackItem);
                    openLightbox(currentLightboxIndex, false);
                }
            }
        }
    }

    // Start
    init();
});