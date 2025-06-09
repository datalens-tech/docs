const {test, expect} = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const LANGS = ['ru', 'en'];

// Function to extract urls from toc file
const extractUrlsFromToc = (tocPath) => {
    const content = fs.readFileSync(tocPath, 'utf8');
    const jsonStr = content.match(/window\.__DATA__\.data\.toc = ({.*});/)[1];
    const tocData = JSON.parse(jsonStr);

    const urls = new Set();

    const traverse = (items) => {
        items.forEach((item) => {
            if (item.href) {
                urls.add(item.href);
            }
            if (item.items) {
                traverse(item.items);
            }
        });
    };

    traverse(tocData.items);
    return Array.from(urls);
};

test.describe('doc urls test', () => {
    // get all urls from both language tocs
    const urls = LANGS.map((lang) =>
        extractUrlsFromToc(path.join(__dirname, `../build/docs/${lang}/toc.js`)),
    );

    const allUrls = [];
    urls.forEach((langUrls) => {
        langUrls.forEach((url) => {
            allUrls.push(url);
        });
    });

    // create a test for each url
    allUrls.forEach((url) => {
        test(`[${url}] load without errors`, async ({page}) => {
            // check for console errors
            const consoleErrors = [];
            page.on('console', (msg) => {
                if (msg.type() === 'error') {
                    consoleErrors.push(msg.text());
                }
            });

            const response = await page.goto(`http://localhost:3000/docs/${url}`);
            expect(response.status()).toBe(200);

            if (consoleErrors.length > 0) {
                throw new Error(`[${url}] console errors found:\n  ${consoleErrors.join('\n  ')}`);
            }

            await expect(page.locator('body')).not.toBeEmpty();
            await expect(page).toHaveTitle(/./);
        });
    });
});
