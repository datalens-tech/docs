const {test, expect} = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

const yamlSettings = yaml.parse(fs.readFileSync(path.join(__dirname, '..', '.yfm-docs'), 'utf8'));
const testSettings = {
    docsPath: yamlSettings.docsPath || '/docs',
    langs: yamlSettings.langs || [],
    noindex: yamlSettings.noindex || false,
};

// Function to extract urls from toc file
const extractUrlsFromToc = (tocPath) => {
    const content = fs.readFileSync(tocPath, 'utf8');
    const jsonStr = content.match(/window\.__DATA__\.data\.toc = ({.*});/)[1];
    const tocData = JSON.parse(jsonStr);

    const urls = {};

    const traverse = (items) => {
        items.forEach((item) => {
            if (item.href) {
                urls[item.href] = item.name;
            }
            if (item.items) {
                traverse(item.items);
            }
        });
    };

    traverse(tocData.items);
    return urls;
};

test.describe('doc urls test', () => {
    // get all urls from toc
    let allUrls = {};
    if (testSettings.langs.length > 0) {
        testSettings.langs.forEach((lang) => {
            allUrls = {
                ...allUrls,
                ...extractUrlsFromToc(
                    path.join(__dirname, `../build/${testSettings.docsPath}/${lang}/toc.js`),
                ),
            };
        });
    } else {
        allUrls = extractUrlsFromToc(
            path.join(__dirname, `../build/${testSettings.docsPath}/toc.js`),
        );
    }

    // create a test for each url
    Object.entries(allUrls).forEach(([url, title]) => {
        test(`[${url}] - [${title}] load without errors`, async ({page}) => {
            // check for console errors
            const consoleErrors = [];
            page.on('console', (msg) => {
                if (msg.type() === 'error') {
                    consoleErrors.push(msg.text());
                }
            });

            const response = await page.goto(
                new URL(path.join(testSettings.docsPath, url), 'http://localhost:3000').href,
            );
            expect(response.status()).toBe(200);

            if (consoleErrors.length > 0) {
                throw new Error(`[${url}] console errors found:\n  ${consoleErrors.join('\n  ')}`);
            }

            await expect(page.locator('body')).not.toBeEmpty();
            await expect(page).toHaveTitle(/./);

            if (testSettings.noindex) {
                await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
                    'content',
                    'noindex, nofollow',
                );
            }
        });
    });
});
