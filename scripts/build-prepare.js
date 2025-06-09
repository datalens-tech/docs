const path = require('path');

const fs = require('fs-extra');
const walkSync = require('walk-sync');

const ASSETS_PATH_FIX = ['_assets', '_includes', '_qa'];

const fixNestedPath = async (basePath, lang) => {
    try {
        await fs.rm(path.join(basePath, lang), {recursive: true});
    } catch {
        // pass
    }

    await fs.copy(lang, path.join(basePath, lang));

    await fs.copy('assets/icon', path.join(basePath, lang, '_assets/icon'));

    try {
        await fs.rm(path.join(basePath, lang, 'index.yaml'));
        await fs.rm(path.join(basePath, lang, 'toc.yaml'));
    } catch {
        // pass
    }

    const moveCandidate = await fs.readdir(path.join(basePath, lang, 'datalens'));
    await Promise.all(
        moveCandidate.map((file) => {
            return fs.move(
                path.join(basePath, lang, 'datalens', file),
                path.join(basePath, lang, file),
                {
                    overwrite: true,
                },
            );
        }),
    );

    await fs.rm(path.join(basePath, lang, 'datalens'), {recursive: true});

    let tocYaml = (await fs.readFile(path.join(basePath, lang, 'toc.yaml'))).toString();
    const navigationYaml = (await fs.readFile('assets/navigation.yaml')).toString();
    tocYaml = tocYaml.replace('href: index.yaml', `href: index.yaml\n${navigationYaml}`);
    await fs.writeFile(path.join(basePath, lang, 'toc.yaml'), tocYaml);
    await fs.copy(path.join(lang, 'presets.yaml'), path.join(basePath, lang, 'presets.yaml'));

    const paths = walkSync(path.join(basePath, lang), {
        directories: false,
        globs: ['**/*.md'],
        includeBasePath: true,
    });
    await Promise.all(
        paths.map(async (fPath) => {
            let fileMd = (await fs.readFile(fPath)).toString();

            if (ASSETS_PATH_FIX.some((p) => fPath.includes(path.join(lang, p)))) {
                fileMd = fileMd.replace(new RegExp(`\\.\\./\\.\\./datalens/`, 'g'), '../../');
            } else {
                ASSETS_PATH_FIX.forEach((p) => {
                    fileMd = fileMd.replace(new RegExp(`\\.\\./${p}`, 'g'), p);
                    fileMd = fileMd.replace(new RegExp(`\\.\\./datalens/`, 'g'), '/');
                });
            }

            await fs.writeFile(fPath, fileMd);
        }),
    );
};

async function main() {
    const basePath = process.argv[2];

    try {
        await fs.rmSync('./build', {recursive: true});
        await fs.rmSync(path.join(basePath, '.yfm'));
        await fs.rmSync(path.join(basePath, '.yfmlint'));
    } catch {
        // pass
    }

    if (!(await fs.exists(basePath))) {
        await fs.mkdir(basePath);
    }

    await fs.copyFile('./.yfm-docs', path.join(basePath, '.yfm'));
    await fs.copyFile('./.yfmlint', path.join(basePath, '.yfmlint'));
    await Promise.all([fixNestedPath(basePath, 'ru'), fixNestedPath(basePath, 'en')]);
}

main().catch((err) => {
    console.error(err.stack || err);
    process.exit(1);
});
