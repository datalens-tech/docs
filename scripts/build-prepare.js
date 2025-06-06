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

    try {
        fs.rmSync(path.join(basePath, lang, 'index.yaml'));
        fs.rmSync(path.join(basePath, lang, 'toc.yaml'));
    } catch {
        // pass
    }

    const moveCandidate = fs.readdirSync(path.join(basePath, lang, 'datalens'));
    moveCandidate.forEach((file) => {
        fs.moveSync(path.join(basePath, lang, 'datalens', file), path.join(basePath, lang, file), {
            overwrite: true,
        });
    });

    fs.rmSync(path.join(basePath, lang, 'datalens'), {recursive: true});

    let tocYaml = fs.readFileSync(path.join(basePath, lang, 'toc.yaml')).toString();
    const navigationYaml = fs.readFileSync('assets/navigation.yaml').toString();
    tocYaml = tocYaml.replace('href: index.yaml', `href: index.yaml\n${navigationYaml}`);
    fs.writeFileSync(path.join(basePath, lang, 'toc.yaml'), tocYaml);
    fs.copySync(path.join(lang, 'presets.yaml'), path.join(basePath, lang, 'presets.yaml'));

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
        fs.rmSync('./build', {recursive: true});
        fs.rmSync(path.join(basePath, '.yfm'));
        fs.rmSync(path.join(basePath, '.yfmlint'));
    } catch {
        // pass
    }

    if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath);
    }

    fs.copyFileSync('./.yfm-docs', path.join(basePath, '.yfm'));
    fs.copyFileSync('./.yfmlint', path.join(basePath, '.yfmlint'));

    fixNestedPath(basePath, 'ru');
    fixNestedPath(basePath, 'en');
}

main().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
});
