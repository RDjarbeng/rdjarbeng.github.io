const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    // 1. Test search page
    await page.goto('http://127.0.0.1:4000/search/?q=andrew');
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'search_page_results.png' });
    console.log('Search page screenshot saved to search_page_results.png');

    // 2. Test navbar dropdown
    await page.goto('http://127.0.0.1:4000/');
    await page.waitForSelector('#nav-search-input');
    await page.focus('#nav-search-input');
    await page.keyboard.type('andrew');
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'search_dropdown_metadata.png' });
    console.log('Navbar dropdown screenshot saved to search_dropdown_metadata.png');

    await browser.close();
})();
