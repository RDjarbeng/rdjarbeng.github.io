const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();
    await page.goto('http://localhost:4000/videos/');
    const btn = await page.$('#load-more-btn');
    console.log('Button visible?', await btn.isIntersectingViewport());
    await btn.click();
    await new Promise(r => setTimeout(r, 1000));
    const items = await page.$$('.video-masonry-item');
    let visibleCount = 0;
    for (let item of items) {
        const display = await page.evaluate(el => window.getComputedStyle(el).display, item);
        if (display !== 'none') visibleCount++;
    }
    console.log('Visible videos count:', visibleCount);
    await browser.close();
})();
