import lunr from 'docusaurus-lunr-search';
import {themes as prismThemes} from 'prism-react-renderer';

import YfmToRemark from './yfm-to-remark';

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'DataLens',
    favicon: 'img/favicon.ico',

    url: 'https://datalens.tech',

    baseUrl: '/',
    markdown: {
        preprocessor: YfmToRemark,
    },

    plugins: [
        [
            lunr,
            {
                languages: ['ru', 'en'],
                disableVersioning: true,
            },
        ],
    ],

    organizationName: 'datalens-tech',
    projectName: 'docs',

    onBrokenLinks: 'warn',
    // onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // i18n: {
    //     defaultLocale: 'ru',
    //     locales: ['ru', 'en'],
    // },

    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            {
                docs: {
                    path: 'docs',
                    editUrl: 'https://github.com/datalens-tech/docs/tree/main/',
                },
                // theme: {
                //     customCss: './src/css/custom.css',
                // },
            },
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        {
            image: 'img/docusaurus-social-card.jpg',
            navbar: {
                title: 'DataLens',
                logo: {
                    alt: 'DataLens',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        href: 'https://github.com/datalens-tech/datalens',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Community',
                        items: [
                            {
                                label: 'Telegram',
                                href: 'https://t.me/YandexDataLens/28629',
                            },
                        ],
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'Privacy Policy',
                                href: 'https://yandex.com/legal/confidential/',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/datalens-tech/datalens',
                            },
                        ],
                    },
                ],
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
        },
};

export default config;
