/**
 * Wikipedia-style hover previews for internal post & series links.
 * rdjarbeng.com
 */
(function() {
  if (typeof window === 'undefined') return;
  // Only activate on devices that support hover
  if (!window.matchMedia('(hover: hover)').matches) return;

  let previewsCache = null;
  let fetchPromise = null;
  let activePopover = null;
  let openTimer = null;
  let closeTimer = null;

  function loadPreviews() {
    if (previewsCache) return Promise.resolve(previewsCache);
    if (fetchPromise) return fetchPromise;

    fetchPromise = fetch('/post-previews.json')
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => {
        previewsCache = data;
        return data;
      })
      .catch(err => {
        console.warn('[post-preview] Could not load post previews:', err);
        return null;
      });

    return fetchPromise;
  }

  function normalizeUrl(href) {
    if (!href) return null;
    try {
      const url = new URL(href, window.location.origin);
      const isInternal = url.origin === window.location.origin ||
                         url.hostname === 'rdjarbeng.com' ||
                         url.hostname === 'localhost' ||
                         url.hostname === '127.0.0.1';
      if (!isInternal) return null;
      let path = url.pathname;
      if (!path.endsWith('/')) path += '/';
      return path;
    } catch (e) {
      return null;
    }
  }

  function createPopoverElement() {
    const el = document.createElement('a');
    el.className = 'post-preview-popover';
    el.setAttribute('role', 'tooltip');
    el.setAttribute('aria-hidden', 'true');
    el.setAttribute('target', '_self');
    el.innerHTML = `
      <div class="post-preview-popover__thumb" hidden>
        <img src="" alt="" loading="lazy">
      </div>
      <div class="post-preview-popover__content">
        <h4 class="post-preview-popover__title"></h4>
        <div class="post-preview-popover__meta">
          <span class="post-preview-popover__date"></span>
          <span class="post-preview-popover__bullet">&middot;</span>
          <span class="post-preview-popover__time"></span>
        </div>
        <p class="post-preview-popover__excerpt"></p>
      </div>
    `;

    el.addEventListener('mouseenter', () => {
      clearTimeout(closeTimer);
    });

    el.addEventListener('mouseleave', () => {
      scheduleClose(150);
    });

    document.body.appendChild(el);
    return el;
  }

  function positionPopover(popover, targetLink) {
    const rect = targetLink.getBoundingClientRect();
    const popRect = popover.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = rect.bottom + window.scrollY + 8;
    let placeAbove = false;

    // Flip above if not enough room below and plenty above
    if (rect.bottom + popRect.height + 16 > viewportHeight && rect.top - popRect.height > 16) {
      top = rect.top + window.scrollY - popRect.height - 8;
      placeAbove = true;
    }

    let left = rect.left + window.scrollX + (rect.width / 2) - (popRect.width / 2);
    // Boundary checks
    const margin = 14;
    if (left < margin) {
      left = margin;
    } else if (left + popRect.width > viewportWidth - margin) {
      left = viewportWidth - popRect.width - margin;
    }

    popover.style.top = `${Math.round(top)}px`;
    popover.style.left = `${Math.round(left)}px`;
    popover.classList.toggle('post-preview-popover--above', placeAbove);
  }

  function showPreview(targetLink, data) {
    if (!activePopover) {
      activePopover = createPopoverElement();
    }

    activePopover.href = targetLink.getAttribute('href') || '#';

    const titleEl = activePopover.querySelector('.post-preview-popover__title');
    const dateEl = activePopover.querySelector('.post-preview-popover__date');
    const timeEl = activePopover.querySelector('.post-preview-popover__time');
    const excerptEl = activePopover.querySelector('.post-preview-popover__excerpt');
    const thumbContainer = activePopover.querySelector('.post-preview-popover__thumb');
    const thumbImg = thumbContainer.querySelector('img');

    titleEl.textContent = data.title || '';
    dateEl.textContent = data.date || '';
    timeEl.textContent = data.read_time || '';
    excerptEl.textContent = data.excerpt || '';

    if (data.image) {
      thumbImg.src = data.image;
      thumbImg.alt = data.title || '';
      thumbContainer.hidden = false;
    } else {
      thumbContainer.hidden = true;
    }

    // Make visible to measure and position
    activePopover.classList.add('is-measuring');
    activePopover.style.display = 'block';
    positionPopover(activePopover, targetLink);
    activePopover.classList.remove('is-measuring');

    // Trigger transition
    requestAnimationFrame(() => {
      activePopover.classList.add('is-visible');
      activePopover.setAttribute('aria-hidden', 'false');
    });
  }

  function scheduleOpen(link) {
    clearTimeout(closeTimer);
    clearTimeout(openTimer);

    openTimer = setTimeout(async () => {
      const path = normalizeUrl(link.getAttribute('href'));
      if (!path) return;

      const previews = await loadPreviews();
      if (!previews || !previews[path]) return;

      showPreview(link, previews[path]);
    }, 220);
  }

  function scheduleClose(delay = 180) {
    clearTimeout(openTimer);
    clearTimeout(closeTimer);

    closeTimer = setTimeout(() => {
      if (activePopover) {
        activePopover.classList.remove('is-visible');
        activePopover.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
          if (!activePopover.classList.contains('is-visible')) {
            activePopover.style.display = 'none';
          }
        }, 150);
      }
    }, delay);
  }

  function init() {
    const container = document.querySelector('.post-container') ||
                      document.querySelector('.post-content') ||
                      document.body;
    if (!container) return;

    // Prefetch preview data on first idle
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => loadPreviews());
    } else {
      setTimeout(() => loadPreviews(), 1000);
    }

    const currentPath = window.location.pathname;

    container.addEventListener('mouseover', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      // Don't trigger hover on the popover itself
      if (link.closest('.post-preview-popover')) return;

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.includes('.pdf') || href.includes('mailto:')) return;

      const normalized = normalizeUrl(href);
      if (!normalized || normalized === currentPath) return;

      // Don't trigger on author card or standard post cards (they already display the card preview)
      if (link.closest('.author-card') || link.closest('.post-card')) return;

      scheduleOpen(link);
    });

    container.addEventListener('mouseout', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      if (link.closest('.post-preview-popover')) return;
      scheduleClose();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') scheduleClose(0);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
