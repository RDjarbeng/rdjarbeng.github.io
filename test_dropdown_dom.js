const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

    await page.goto('http://127.0.0.1:4000/');
    await page.waitForSelector('#nav-search-input');
    await page.focus('#nav-search-input');
    await page.keyboard.type('andrew');
    await new Promise(r => setTimeout(r, 2000));
    
    // Check if the metadata elements are actually in the DOM
    const html = await page.evaluate(() => {
        const item = document.querySelector('.nav-search-hit');
        return item ? item.innerHTML : 'No item found';
    });
    console.log('DOM CONTENT:', html);

    await browser.close();
})();
