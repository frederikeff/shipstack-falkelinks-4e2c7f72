const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.click('a[href="https://www.nxtconnect.ai"]');
  await page.click('a[href="https://www.creativeailab.ai/builder-lab"]');
  await browser.close();
})();
