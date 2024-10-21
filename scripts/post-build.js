const fs = require('fs');
const path = require('path');

const cheerio = require('cheerio');
const walkSync = require('walk-sync');

const META = [
    {name: 'theme-color', content: '#efefef'},
    {itemprop: 'name', content: ({title}) => title || 'DataLens'},
    {itemprop: 'description', content: ({description}) => description || ''},
    {itemprop: 'image', content: ({lang}) => `/docs/${lang}/_assets/share.png`},

    {property: 'og:title', content: ({title}) => title || 'DataLens'},
    {property: 'og:description', content: ({description}) => description || ''},
    {property: 'og:type', content: 'website'},
    {property: 'og:site_name', content: 'DataLens'},
    {property: 'og:locale', content: ({lang}) => lang},
    {property: 'og:image', content: ({lang}) => `/docs/${lang}/_assets/share.png`},
    {property: 'og:url', content: ({lang}) => `https://datalens.tech/docs/${lang}/`},

    {name: 'twitter:title', content: ({title}) => title || 'DataLens'},
    {name: 'twitter:description', content: ({description}) => description || ''},
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:image', content: ({lang}) => `/docs/${lang}/_assets/share.png`},

    {property: 'share:title', content: ({title}) => title || 'DataLens'},
    {property: 'share:sharing_schema', content: 'default'},
];

const notes = {
    Примечание: 'Note',
    Совет: 'Tip',
    Внимание: 'Alert',
    Важно: 'Warning',
};

const VENDOR_FIX = {
    consent: {
        ru: {
            old: 'Нажав Принять, вы даёте согласие на использование нашим веб-сайтом файлов cookie Google Analytics для предоставления вам наиболее релевантных услуг и в аналитических целях.',
            new: 'Мы используем файлы cookie, чтобы вы могли наилучшим образом пользоваться нашим веб-сайтом. Если вы продолжаете использовать наш веб-сайт, мы полагаем, что вы согласны с таким использованием.',
        },
        en: {
            old: 'By clicking Accept, you consent to our website’s use of Google Analytics cookies in order to give you the most relevant experience, and for analytics purposes.',
            new: 'We use cookies to ensure that you have the best experience on our website. If you continue to use our website, we assume that you are happy with it.',
        },
    },
};

const LINK = [
    {rel: 'icon', href: '/favicon.ico', sizes: 'any'},
    {type: 'image/x-icon', rel: 'shortcut icon', href: '/favicon.ico'},
    {type: 'image/png', sizes: '16x16', rel: 'icon', href: '/favicon-16x16.png'},
    {type: 'image/png', sizes: '32x32', rel: 'icon', href: '/favicon-32x32.png'},
    {type: 'image/png', sizes: '64x64', rel: 'icon', href: '/favicon-64x64.png'},
    {type: 'image/png', sizes: '76x76', rel: 'icon', href: '/favicon-76x76.png'},
    {type: 'image/png', sizes: '120x120', rel: 'icon', href: '/favicon-120x120.png'},
    {type: 'image/png', sizes: '152x152', rel: 'icon', href: '/favicon-152x152.png'},
    {type: 'image/png', sizes: '180x180', rel: 'icon', href: '/favicon-180x180.png'},
    {type: 'image/png', sizes: '192x192', rel: 'icon', href: '/favicon-192x192.png'},
    {rel: 'apple-touch-icon', href: '/favicon-192x192.png'},
    {rel: 'manifest', href: '/manifest.json'},
];

const STYLE_FIX = `
li.pc-navigation-item:first-child {
  display: flex;
  align-items: center;
  margin-right: 0;
}
`;

const FILE_CHECK_MAP = [];

async function main() {
    const basePath = process.argv[2];
    const paths = walkSync(basePath, {
        directories: false,
        globs: ['**/*.html'],
        includeBasePath: true,
    });

    // fix vendor script
    let vendorScript = fs.readFileSync(path.join(basePath, '_bundle', 'vendor.js')).toString();
    Object.keys(VENDOR_FIX).forEach((key) => {
        Object.keys(VENDOR_FIX[key]).forEach((lang) => {
            vendorScript = vendorScript.replace(
                VENDOR_FIX[key][lang].old,
                VENDOR_FIX[key][lang].new,
            );
        });
    });
    fs.writeFileSync(path.join(basePath, '_bundle', 'vendor.js'), vendorScript);

    for (let i = 0; i < paths.length; i += 1) {
        const filePath = paths[i];
        const trimPath = filePath.replace(basePath, '');
        const trimPathLog = trimPath.replace(/^\//g, '');

        // eslint-disable-next-line no-console
        console.log('\x1b[33m%s\x1b[0m %s %s', 'POST-BUILD', 'Fixing file', trimPathLog);

        let lang = trimPath.match(/\/(en|ru)\//);

        if (lang) {
            lang = lang[1];

            const pathWithoutLang = trimPath
                .replace(new RegExp(`^/${lang}/`), '')
                .replace(new RegExp(`.html$`), '');

            if (FILE_CHECK_MAP[pathWithoutLang]) {
                delete FILE_CHECK_MAP[pathWithoutLang];
            } else {
                FILE_CHECK_MAP[pathWithoutLang] = lang;
            }
        }

        const fileHtml = fs.readFileSync(filePath);
        const $ = cheerio.load(fileHtml);

        const head = $('head');

        let title = $('meta[name="title"]');
        if (title) {
            title = title.attr('content');
        }

        let description = $('meta[name="description"]');
        if (description) {
            description = description.attr('content');
        }

        META.forEach((meta) => {
            const tag = $('<meta>');

            Object.entries(meta).forEach(([key, value]) => {
                if (typeof value === 'function') {
                    tag.attr(key, value({lang, title, description}));
                } else {
                    tag.attr(key, value);
                }
            });

            head.append(tag);
        });

        LINK.forEach((link) => {
            const tag = $('<link>');

            Object.entries(link).forEach(([key, value]) => {
                tag.attr(key, value);
            });

            head.append(tag);
        });

        const tag = $('<style type="text/css"></style>');
        tag.text(STYLE_FIX);
        head.append(tag);

        const logoLink = $('a.pc-logo');
        logoLink.attr('href', lang === 'ru' ? '/ru' : '/');

        let html = $.html()
            .replace(/"lang":"[a-z]+"/g, `"lang":"${lang}"`)
            .replace(/("href":".+?\/)index\.html"/g, '$1"')
            .replace(/( href=".+?\/)index\.html"/g, '$1"')
            .replace(/("href":")index\.html"/g, '$1./"')
            .replace(/( href=")index\.html"/g, '$1./"')
            .replace(/"[^"]+?\/_bundle\/app\.client\.js"/, '"/docs/_bundle/app.client.js"')
            .replace(/"[^"]+?\/_bundle\/app\.client\.css"/, '"/docs/_bundle/app.client.css"');

        if (lang !== 'ru') {
            html = html
                .replace(new RegExp(`>(${Object.keys(notes).join('|')})<`, 'g'), (sub, group) => {
                    return `>${notes[group]}<`;
                })
                .replace(/>В этой статье</g, '>In this article<');
        }

        fs.writeFileSync(filePath, html);
    }

    if (Object.keys(FILE_CHECK_MAP).length > 0) {
        // eslint-disable-next-line no-console
        console.error(
            '\n\x1b[31mERROR\x1b[0m Detected files without pair on other lang\n' +
                Object.entries(FILE_CHECK_MAP)
                    .map(([file, lang]) => `  - ${lang}: ${file}`)
                    .join('\n'),
        );
    }
}

main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err.stack || err);
});
