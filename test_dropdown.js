const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    console.log('Navigating to local server...');
    await page.goto('http://127.0.0.1:4000/');

    // Wait for the nav search input to be available
    console.log('Waiting for search input...');
    await page.waitForSelector('#nav-search-input');

    // Type into the search input
    console.log('Typing into search input...');
    // We need to hover or focus it first to expand it based on the CSS
    await page.hover('.header-search-form');
    await page.focus('#nav-search-input');
    await page.keyboard.type('andrew');

    // Wait a bit for Algolia to fetch
    await new Promise(r => setTimeout(r, 2000));

    // Check if dropdown is visible
    const dropdown = await page.$('#nav-search-results');
    const display = await page.evaluate(el => window.getComputedStyle(el).display, dropdown);
    console.log('Dropdown display:', display);

    // Take a screenshot
    await page.screenshot({ path: 'search_dropdown.png' });
    console.log('Screenshot saved to search_dropdown.png');

    await browser.close();
})();
