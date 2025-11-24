const path = require('path');

const fs = require('fs-extra');
const walkSync = require('walk-sync');

const yaml = require('yaml');

const root = './build';
const subDir = 'datalens';

const YAML_SETTINGS = yaml.parse(fs.readFileSync(path.join(__dirname, '..', '.yfm-docs'), 'utf8'));

const argsPath = process.argv[2] ? process.argv[2].replace(/^\.?\/?build\//, '/') : '';

const BUILD_SETTINGS = {
    docsPath: argsPath || YAML_SETTINGS.docsPath || '/docs',
    lang: YAML_SETTINGS.lang || '',
    langs: YAML_SETTINGS.langs || [],
};

const ASSETS_PATH_FIX = ['_assets', '_includes', '_qa'];

const fixNestedPath = async (basePath, lang = null) => {
    try {
        await fs.rm(path.join(basePath, lang), {recursive: true});
    } catch {
        // pass
    }

    await fs.copy(lang, path.join(basePath, lang));
    if (await fs.exists(path.join(basePath, '_assets'))) {
        await fs.rm(path.join(basePath, '_assets'), {recursive: true});
        await fs.mkdir(path.join(basePath, '_assets'), {recursive: true});
    }
    // async throw error
    fs.copySync('assets/icon', path.join(basePath, '_assets/icon'), {overwrite: true});
    fs.copySync('assets/favicon', path.join(basePath, '_assets/favicon'), {overwrite: true});
    fs.copySync('assets/meta', path.join(basePath, '_assets/meta'), {overwrite: true});
    fs.copySync('assets/manifest.json', path.join(basePath, 'manifest.json'), {overwrite: true});

    if (await fs.exists(path.join(basePath, lang, 'index.yaml'))) {
        await fs.rm(path.join(basePath, lang, 'index.yaml'));
    }
    if (await fs.exists(path.join(basePath, lang, 'toc.yaml'))) {
        await fs.rm(path.join(basePath, lang, 'toc.yaml'));
    }

    const moveCandidate = await fs.readdir(path.join(basePath, lang, subDir));
    await Promise.all(
        moveCandidate.map((file) => {
            return fs.move(
                path.join(basePath, lang, subDir, file),
                path.join(basePath, lang, file),
                {
                    overwrite: true,
                },
            );
        }),
    );

    await fs.rm(path.join(basePath, lang, subDir), {recursive: true});

    let tocYaml = await fs.readFile(path.join(basePath, lang, 'toc.yaml'), 'utf8');
    const navigationYaml = await fs.readFile('assets/navigation.yaml', 'utf8');
    tocYaml = tocYaml.replace('href: index.yaml', `href: index.yaml\n${navigationYaml}`);
    tocYaml = tocYaml.replace('title: DataLens', `title: ${lang === 'ru' ? 'Главная' : 'Home'}`);
    await fs.writeFile(path.join(basePath, lang, 'toc.yaml'), tocYaml);

    let indexYaml = await fs.readFile(path.join(basePath, lang, 'index.yaml'), 'utf8');
    indexYaml = indexYaml.replace(/(href:.+[^/])\n/g, '$1.md\n');
    await fs.writeFile(path.join(basePath, lang, 'index.yaml'), indexYaml);

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
                fileMd = fileMd.replace(new RegExp(`\\.\\./\\.\\./${subDir}/`, 'g'), '../../');
            } else {
                ASSETS_PATH_FIX.forEach((p) => {
                    fileMd = fileMd.replace(new RegExp(`\\.\\./${p}`, 'g'), p);
                    fileMd = fileMd.replace(new RegExp(`\\.\\./${subDir}/`, 'g'), '/');
                });
            }

            await fs.writeFile(fPath, fileMd);
        }),
    );
};

async function main() {
    const basePath = path.join(__dirname, '../', BUILD_SETTINGS.docsPath);

    if (await fs.exists(root)) {
        await fs.rm(root, {recursive: true});
    }
    if (await fs.exists(basePath)) {
        await fs.rm(basePath, {recursive: true});
    }
    if (!(await fs.exists(basePath))) {
        await fs.mkdir(basePath, {recursive: true});
    }

    const promises = [];
    BUILD_SETTINGS.langs.forEach((lang) => {
        promises.push(fixNestedPath(basePath, lang));
    });

    await Promise.all(promises);
}

main().catch((err) => {
    console.error(err.stack || err);
    process.exit(1);
});
