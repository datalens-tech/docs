const fs = require('fs');

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
@media (max-width: 768px) {
  .dc-doc-page__controls {
    padding-right: 20px;
    position: static;
    justify-content: flex-end;
  }
}

.yc-root {
  --dc-header-height: 64px;
}

.dc-doc-layout__center {
  top: var(--dc-header-height);
  overflow: auto;
}

.dc-settings-control__list-item {
  max-width: var(--yc-popover-max-width);
}

li.pc-navigation-item > button img {
  position: absolute;
  left: 12px;
}
`;

const SCRIPT_FIX = `
  const controlsButtons = document.querySelectorAll('li.pc-navigation-item > button')

  controlsButtons[0].addEventListener('click', () => {
    let langSwitch = '/ru/'
    if(window.location.pathname.includes('/en/')) {
      langSwitch = '/en/'
    }
    window.location.href = window.location.pathname.replace(langSwitch, langSwitch === '/ru/' ? '/en/' : '/ru/')
  })

  controlsButtons[1].addEventListener('click', () => {
    window.location.href = 'https://github.com/datalens-tech/datalens'
  })
`;

const FILE_CHECK_MAP = [];

async function main() {
    const basePath = process.argv[2];
    const paths = walkSync(basePath, {
        directories: false,
        globs: ['**/*.html'],
        includeBasePath: true,
    });

    for (let i = 0; i < paths.length; i += 1) {
        const path = paths[i];
        const trimPath = path.replace(basePath, '');

        // eslint-disable-next-line no-console
        console.log('POST-BUILD:', trimPath);

        const lang = trimPath.match(/\/(en|ru)\//)[1];

        const pathWithoutLang = trimPath
            .replace(new RegExp(`^/${lang}/`), '/')
            .replace(new RegExp(`.html$`), '');

        if (FILE_CHECK_MAP[pathWithoutLang]) {
            delete FILE_CHECK_MAP[pathWithoutLang];
        } else {
            FILE_CHECK_MAP[pathWithoutLang] = lang;
        }

        const fileHtml = fs.readFileSync(path);
        const $ = cheerio.load(fileHtml);

        const head = $('head');
        const body = $('body');

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

        const tagScript = $('<script type="application/javascript"></script>');
        tagScript.text(SCRIPT_FIX);
        body.append(tagScript);

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

        fs.writeFileSync(path, html);
    }

    if (Object.keys(FILE_CHECK_MAP).length > 0) {
        // eslint-disable-next-line no-console
        console.error(
            '\nERROR: detected files without pair on other lang\n' +
                Object.entries(FILE_CHECK_MAP)
                    .map(([file, lang]) => `  - ${lang}: ${file}`)
                    .join('\n'),
        );
    }
}

main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err.message || err);
});
