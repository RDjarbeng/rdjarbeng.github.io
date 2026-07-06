const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    await page.goto('http://127.0.0.1:4000/');
    await page.waitForSelector('#nav-search-input');

    await page.hover('.header-search-form');
    await page.focus('#nav-search-input');
    await page.keyboard.type('andrew');
    await new Promise(r => setTimeout(r, 2000));

    // Evaluate CSS variables and properties
    const data = await page.evaluate(() => {
        const dropdown = document.querySelector('#nav-search-results');
        const computed = window.getComputedStyle(dropdown);
        const rootComputed = window.getComputedStyle(document.documentElement);
        return {
            dropdownBg: computed.backgroundColor,
            rootCardBg: rootComputed.getPropertyValue('--card-bg'),
            dropdownCardBg: computed.getPropertyValue('--card-bg')
        };
    });
    console.log(data);

    await browser.close();
})();
