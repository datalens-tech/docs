const path = require('path');

const fs = require('fs-extra');
const walkSync = require('walk-sync');

const ASSETS_PATH_FIX = ['_assets', '_includes', '_qa'];

function fixNestedPath(basePath, lang) {
    try {
        fs.rmSync(path.join(basePath, lang), {recursive: true});
    } catch {
        // pass
    }

    fs.copySync(lang, path.join(basePath, lang));

    fs.copySync('assets/icon', path.join(basePath, lang, '_assets/icon'));

    fs.rmSync(path.join(basePath, lang, 'index.yaml'));
    fs.rmSync(path.join(basePath, lang, 'toc.yaml'));

    const moveCandidate = fs.readdirSync(path.join(basePath, lang, 'datalens'));
    moveCandidate.forEach((file) => {
        fs.moveSync(path.join(basePath, lang, 'datalens', file), path.join(basePath, lang, file));
    });

    fs.rmSync(path.join(basePath, lang, 'datalens'), {recursive: true});

    let tocYaml = fs.readFileSync(path.join(basePath, lang, 'toc.yaml')).toString();
    let navigationYaml = fs.readFileSync('assets/navigation.yaml').toString();
    navigationYaml = navigationYaml.replace(
        /{{lang_title}}/g,
        lang === 'ru' ? 'English' : 'Russian',
    );
    tocYaml = tocYaml.replace('href: index.yaml', `href: index.yaml\n${navigationYaml}`);
    fs.writeFileSync(path.join(basePath, lang, 'toc.yaml'), tocYaml);

    const paths = walkSync(path.join(basePath, lang), {
        directories: false,
        globs: ['**/*.md'],
        includeBasePath: true,
    });
    for (let i = 0; i < paths.length; i += 1) {
        const fPath = paths[i];

        let fileMd = fs.readFileSync(fPath).toString();

        if (ASSETS_PATH_FIX.some((p) => fPath.includes(path.join(lang, p)))) {
            fileMd = fileMd.replace(new RegExp(`\\.\\./\\.\\./datalens/`, 'g'), '../../');
        } else {
            ASSETS_PATH_FIX.forEach((p) => {
                fileMd = fileMd.replace(new RegExp(`\\.\\./${p}`, 'g'), p);
                fileMd = fileMd.replace(new RegExp(`\\.\\./datalens/`, 'g'), '/');
            });
        }

        fs.writeFileSync(fPath, fileMd);
    }
}

async function main() {
    const basePath = process.argv[2];

    try {
        fs.rmSync(path.join(basePath, '.yfm'));
        fs.rmSync(path.join(basePath, '.yfmlint'));
    } catch {
        // pass
    }

    fs.copyFileSync('./.yfm-dltech', path.join(basePath, '.yfm'));
    fs.copyFileSync('./.yfmlint', path.join(basePath, '.yfmlint'));

    fixNestedPath(basePath, 'ru');
    fixNestedPath(basePath, 'en');
}

main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err.message || err);
});
