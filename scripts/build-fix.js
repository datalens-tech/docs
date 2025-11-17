const fs = require('fs-extra');
const path = require('path');

const yaml = require('yaml');
const cheerio = require('cheerio');
const walkSync = require('walk-sync');

const YAML_SETTINGS = yaml.parse(fs.readFileSync(path.join(__dirname, '..', '.yfm-docs'), 'utf8'));

const argsPath = process.argv[2] ? process.argv[2].replace(/^\.?\/?build\//, '/') : '';

const BUILD_SETTINGS = {
    docsPath: argsPath || YAML_SETTINGS.docsPath || '/docs',
    manifest: {
        name: YAML_SETTINGS.manifest?.name || 'DataLens',
        shortName: YAML_SETTINGS.manifest?.shortName || 'DataLens',
        description: YAML_SETTINGS.manifest?.description || '',
        themeColor: YAML_SETTINGS.manifest?.themeColor || '#efefef',
        backgroundColor: YAML_SETTINGS.manifest?.backgroundColor || '#ffffff',
    },
    endpoint: YAML_SETTINGS.endpoint || '',
    lang: YAML_SETTINGS.lang || '',
    langs: YAML_SETTINGS.langs || '',
};

const META = [
    {name: 'theme-color', content: ({manifest}) => manifest.themeColor},
    {itemprop: 'name', content: ({title, manifest}) => title || manifest.name},
    {itemprop: 'description', content: ({description}) => description || ''},
    {itemprop: 'image', content: ({docsPath, lang}) => `${docsPath}/_assets/share-${lang}.png`},

    {property: 'og:title', content: ({title, manifest}) => title || manifest.name},
    {property: 'og:description', content: ({description}) => description || ''},
    {property: 'og:type', content: 'website'},
    {property: 'og:site_name', content: ({manifest}) => manifest.name},
    {property: 'og:locale', content: ({lang}) => lang},
    {property: 'og:image', content: ({docsPath, lang}) => `${docsPath}/_assets/share-${lang}.png`},
    {property: 'og:url', content: ({docsPath, endpoint, lang}) => `${endpoint}${docsPath}/${lang}`},

    {name: 'twitter:title', content: ({title}) => title || 'DataLens'},
    {name: 'twitter:description', content: ({description}) => description || ''},
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:image', content: ({docsPath, lang}) => `${docsPath}/_assets/share-${lang}.png`},

    {property: 'share:title', content: ({title}) => title || 'DataLens'},
    {property: 'share:sharing_schema', content: 'default'},
];

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
    {rel: 'icon', sizes: 'any', href: ({docsPath}) => `${docsPath}/favicon.ico`},
    {type: 'image/x-icon', rel: 'shortcut icon', href: ({docsPath}) => `${docsPath}/favicon.ico`},
    {
        type: 'image/png',
        sizes: '16x16',
        rel: 'icon',
        href: ({docsPath}) => `${docsPath}/_assets/favicon/favicon-16x16.png`,
    },
    {
        type: 'image/png',
        sizes: '32x32',
        rel: 'icon',
        href: ({docsPath}) => `${docsPath}/_assets/favicon/favicon-32x32.png`,
    },
    {
        type: 'image/png',
        sizes: '64x64',
        rel: 'icon',
        href: ({docsPath}) => `${docsPath}/_assets/favicon/favicon-64x64.png`,
    },
    {
        type: 'image/png',
        sizes: '76x76',
        rel: 'icon',
        href: ({docsPath}) => `${docsPath}/_assets/favicon/favicon-76x76.png`,
    },
    {
        type: 'image/png',
        sizes: '120x120',
        rel: 'icon',
        href: ({docsPath}) => `${docsPath}/_assets/favicon/favicon-120x120.png`,
    },
    {
        type: 'image/png',
        sizes: '152x152',
        rel: 'icon',
        href: ({docsPath}) => `${docsPath}/_assets/favicon/favicon-152x152.png`,
    },
    {
        type: 'image/png',
        sizes: '180x180',
        rel: 'icon',
        href: ({docsPath}) => `${docsPath}/_assets/favicon/favicon-180x180.png`,
    },
    {
        type: 'image/png',
        sizes: '192x192',
        rel: 'icon',
        href: ({docsPath}) => `${docsPath}/_assets/favicon/favicon-192x192.png`,
    },
    {
        rel: 'apple-touch-icon',
        href: ({docsPath}) => `${docsPath}/_assets/favicon/favicon-192x192.png`,
    },
    {rel: 'manifest', href: ({docsPath}) => `${docsPath}/manifest.json`},
];

const STYLE_FIX = `
li.pc-navigation-item:first-child {
  display: flex;
  align-items: center;
  margin-right: 0;
}
`;

const FILE_CHECK_MAP = [];

const fixFile = async (filePath, basePath) => {
    const trimPath = filePath.replace(basePath, '');
    const trimPathLog = trimPath.replace(/^\//g, '');

    // eslint-disable-next-line no-console
    console.log('\x1b[33m%s\x1b[0m %s %s', 'POST-BUILD', 'Fixing file', trimPathLog);

    const fileHtml = await fs.readFile(filePath);
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

    head.append('\n');
    META.forEach((meta) => {
        const tag = $('<meta>');

        Object.entries(meta).forEach(([key, value]) => {
            if (typeof value === 'function') {
                tag.attr(
                    key,
                    value({
                        lang: BUILD_SETTINGS.lang,
                        title,
                        description,
                        manifest: BUILD_SETTINGS.manifest,
                        docsPath: BUILD_SETTINGS.docsPath,
                        endpoint: BUILD_SETTINGS.endpoint,
                    }),
                );
            } else {
                tag.attr(key, value);
            }
        });

        head.append(tag);
        head.append('\n');
    });

    head.append('\n');
    LINK.forEach((link) => {
        const tag = $('<link>');

        Object.entries(link).forEach(([key, value]) => {
            if (typeof value === 'function') {
                tag.attr(
                    key,
                    value({
                        lang: BUILD_SETTINGS.lang,
                        title,
                        description,
                        manifest: BUILD_SETTINGS.manifest,
                        docsPath: BUILD_SETTINGS.docsPath,
                        endpoint: BUILD_SETTINGS.endpoint,
                    }),
                );
            } else {
                tag.attr(key, value);
            }
        });

        head.append(tag);
        head.append('\n');
    });

    head.append('\n');
    const tag = $('<style type="text/css"></style>');
    tag.text(STYLE_FIX);
    head.append(tag);

    const docsPath = BUILD_SETTINGS.docsPath;

    let html = $.html();
    html = html
        .replace(/"[^"]+?\/_bundle\/app\.client\.js"/g, `"${docsPath}/_bundle/app.client.js"`)
        .replace(/"[^"]+?\/_bundle\/app\.client\.css"/g, `"${docsPath}/_bundle/app.client.css"`)
        .replace(/href="_bundle\/([^"]+?)"/g, `href="${docsPath}/_bundle/$1"`)
        .replace(/src="_bundle\/([^"]+?)"/g, `src="${docsPath}/_bundle/$1"`)
        .replace(/src="_search\/([^"]+?)"/g, `src="${docsPath}/_search/$1"`)
        .replace(/src="([^"]+?)\/toc\.js"/g, `src="${docsPath}/$1/toc.js"`)
        // fix double load bundled resources
        .replace(/,"style":\[[^\]]+?\],"script":\[[^\]]+?\],/g, ',"style":[],"script":[],')
        .replace(
            / *?<link type="text\/css" rel="stylesheet" href="_assets\/cut-extension.css">\n/g,
            '',
        )
        .replace(
            / *?<link type="text\/css" rel="stylesheet" href="_assets\/tabs-extension.css">\n/g,
            '',
        )
        .replace(
            / *?<script type="application\/javascript" defer="" src="_assets\/cut-extension.js"><\/script>\n/g,
            '',
        )
        .replace(
            /<script type="application\/javascript" defer="" src="_assets\/tabs-extension.js"><\/script>\n/g,
            '',
        );

    await fs.writeFile(filePath, html);
};

async function main() {
    const basePath = path.join(__dirname, '../build', BUILD_SETTINGS.docsPath);

    const paths = walkSync(basePath, {
        directories: false,
        globs: ['**/*.html'],
        includeBasePath: true,
    });

    const vendorFiles = await fs.readdir(path.join(basePath, '_bundle'));
    const vendorFile = vendorFiles.find(
        (file) => file.startsWith('vendor-') && file.endsWith('.js'),
    );
    let vendorScript = (await fs.readFile(path.join(basePath, '_bundle', vendorFile))).toString();
    Object.keys(VENDOR_FIX).forEach((key) => {
        Object.keys(VENDOR_FIX[key]).forEach((lang) => {
            vendorScript = vendorScript.replace(
                VENDOR_FIX[key][lang].old,
                VENDOR_FIX[key][lang].new,
            );
        });
    });
    await fs.writeFile(path.join(basePath, '_bundle', vendorFile), vendorScript);

    await Promise.all(paths.map((filePath) => fixFile(filePath, basePath)));

    const manifestPath = path.join(basePath, 'manifest.json');
    let manifest = fs.readFileSync(manifestPath, 'utf8');
    manifest = manifest
        .replaceAll('{docsPath}', BUILD_SETTINGS.docsPath)
        .replaceAll('{manifest.name}', BUILD_SETTINGS.manifest.name)
        .replaceAll('{manifest.shortName}', BUILD_SETTINGS.manifest.shortName)
        .replaceAll('{manifest.description}', BUILD_SETTINGS.manifest.description)
        .replaceAll('{manifest.themeColor}', BUILD_SETTINGS.manifest.themeColor)
        .replaceAll('{manifest.backgroundColor}', BUILD_SETTINGS.manifest.backgroundColor);
    fs.writeFile(manifestPath, manifest);

    if (Object.keys(FILE_CHECK_MAP).length > 0) {
        console.error(
            '\n\x1b[31mERROR\x1b[0m Detected files without pair on other lang\n' +
                Object.entries(FILE_CHECK_MAP)
                    .map(([file, lang]) => `  - ${lang}: ${file}`)
                    .join('\n'),
        );
    }
}

main().catch((err) => {
    console.error(err.stack || err);
    process.exit(1);
});
