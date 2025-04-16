/* eslint-disable max-depth */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const crypto = require('crypto');

const cheerio = require('cheerio');
const walkSync = require('walk-sync');

function md5(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

function extractFunctionCategories(toc) {
    const result = [];

    for (const item of toc.items) {
        if (item.name === 'Вычисляемые поля' && item.items) {
            for (const subItem of item.items) {
                if (subItem.name === 'Справочник функций' && subItem.items) {
                    for (const category of subItem.items) {
                        if (category.name === 'Все функции') {
                            continue;
                        }

                        if (category.items) {
                            const categoryName = category.name;
                            const categoryItems = [];
                            const categoryId = md5(categoryName);

                            for (const funcItem of category.items) {
                                if (funcItem.href) {
                                    const href = path
                                        .join('/docs/ru', funcItem.href)
                                        .replace(/\\/g, '/')
                                        .replace(/\.md$/, '');
                                    const id = md5(href);

                                    categoryItems.push({
                                        name: funcItem.name,
                                        href: href,
                                        id: id,
                                    });
                                }
                            }

                            if (categoryItems.length > 0) {
                                result.push({
                                    name: categoryName,
                                    items: categoryItems,
                                    id: categoryId,
                                });
                            }
                        }
                    }
                    break;
                }
            }
            break;
        }
    }

    return result;
}

function extractFunctions(functionRefPath, targetApiPath) {
    const paths = walkSync(functionRefPath, {
        directories: false,
        globs: ['**/*.html'],
        includeBasePath: true,
    });

    for (let i = 0; i < paths.length; i += 1) {
        const originalPath = paths[i];
        const trimPath = originalPath.replace(functionRefPath, '');
        const trimPathLog = trimPath.replace(/^\//g, '');

        if (trimPathLog === 'all.html') {
            continue;
        }

        // eslint-disable-next-line no-console
        console.log(`[API] Analyze file [${trimPathLog}]`);

        const fileHtml = fs.readFileSync(originalPath);
        const $ = cheerio.load(fileHtml);

        const html = $('.yfm.dc-doc-page__body ')
            .html()
            .replace(/<svg[\s\S]+?<\/svg>/gs, '');

        fs.writeFileSync(
            path.join(targetApiPath, path.parse(trimPath).name) + '.json',
            JSON.stringify({html}),
        );
    }
}

async function main() {
    // eslint-disable-next-line no-console
    console.log('[API] Start build json api...');

    const lang = 'ru';
    const datalensPath = path.join(lang, 'datalens');

    // eslint-disable-next-line no-console
    console.log('[API] Analyze toc and generate main file...');
    const content = fs.readFileSync(path.join(datalensPath, 'toc.yaml'), 'utf8');
    const toc = yaml.load(content);

    const functionCategories = extractFunctionCategories(toc);

    const apiPath = path.join(path.join('build', 'docs', lang, 'api', 'function-ref'));

    if (fs.existsSync(apiPath)) {
        fs.rmSync(apiPath, {recursive: true});
    }
    fs.mkdirSync(apiPath, {recursive: true});

    fs.writeFileSync(path.join(apiPath, 'all.json'), JSON.stringify(functionCategories, null, 2));

    // eslint-disable-next-line no-console
    console.log('[API] Generate function api files...');
    extractFunctions(
        path.join('build', 'docs', lang, 'function-ref'),
        path.join('build', 'docs', lang, 'api', 'function-ref'),
    );

    // eslint-disable-next-line no-console
    console.log('[API] Finish build json api');
}

main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err.message || err);
    process.exit(1);
});
