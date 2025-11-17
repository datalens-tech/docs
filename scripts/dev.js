const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const {spawnSync} = require('child_process');

const yaml = require('yaml');
const chokidar = require('chokidar');

const app = express();
const root = './build';

const yamlSettings = yaml.parse(fs.readFileSync(path.join(__dirname, '..', '.yfm-docs'), 'utf8'));
const devSettings = {
    docsPath: yamlSettings.docsPath || '/docs',
};

// redirects for / root
app.use((req, res, next) => {
    if (req.path === '/') {
        // eslint-disable-next-line no-console
        console.log('[REDIRECT]', `from [${req.path}]`, `to [${devSettings.docsPath}]`);
        return res.redirect(301, devSettings.docsPath);
    }
    return next();
});

// redirect from /folder to /folder/ if it is directory
app.use(async (req, res, next) => {
    const reqPath = decodeURIComponent(req.path);
    const absPath = path.join(root, reqPath);

    try {
        const stat = await fs.stat(absPath);
        if (stat.isDirectory() && !reqPath.endsWith('/')) {
            const fixPath = reqPath + '/';
            // eslint-disable-next-line no-console
            console.log('[REDIRECT]', `from [${req.path}]`, `to ${fixPath}`);
            return res.redirect(301, fixPath + (req.url.slice(req.path.length) || ''));
        }
    } catch {
        // pass
    }
    return next();
});

// redirect from /file.html/ to /file.html
app.use((req, res, next) => {
    if (req.path.endsWith('index.html')) {
        const fixPath = req.path.replace(/\/index.html$/, '');
        // eslint-disable-next-line no-console
        console.log('[REDIRECT]', `from [${req.path}]`, `to ${fixPath}`);
        return res.redirect(301, fixPath + (req.url.slice(req.path.length) || ''));
    }
    if (req.path.endsWith('.html/')) {
        const fixPath = req.path.replace(/\.html\/+$/, '.html');
        // eslint-disable-next-line no-console
        console.log('[REDIRECT]', `from [${req.path}]`, `to ${fixPath}`);
        return res.redirect(301, fixPath + (req.url.slice(req.path.length) || ''));
    }
    if (req.path.endsWith('.html')) {
        const fixPath = req.path.replace(/\.html$/, '');
        // eslint-disable-next-line no-console
        console.log('[REDIRECT]', `from [${req.path}]`, `to ${fixPath}`);
        return res.redirect(301, fixPath + (req.url.slice(req.path.length) || ''));
    }
    return next();
});

// static
app.use(express.static(root, {extensions: ['html']}));

// not found
app.use((_, res) => {
    res.status(404).send('Not found');
});

const build = () => {
    spawnSync('npm run build:prepare', {
        stdio: 'inherit',
        shell: true,
    });
    spawnSync('npm run build', {
        stdio: 'inherit',
        shell: true,
    });
    spawnSync('npm run build:fix', {
        stdio: 'inherit',
        shell: true,
    });
};

let timeout = null;

const buildEvent = (filePath, eventType) => {
    // eslint-disable-next-line no-console
    console.log(`[WATCH]  - file ${filePath} has been ${eventType}`);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
        // eslint-disable-next-line no-console
        console.log('[WATCH] Build started');
        build();
    }, 2000);
};

// eslint-disable-next-line no-negated-condition
if (process.env.DISABLE_WATCHER !== 'true') {
    const watcher = chokidar.watch(
        [
            path.join(__dirname, '..', devSettings.docsPath),
            path.join(__dirname, '..', '.yfm'),
            path.join(__dirname, '..', 'scripts'),
        ],
        {
            ignored: (filePath, stats) => stats?.isFile() && filePath.endsWith('dev.js'), // self ignore
            persistent: true,
            ignoreInitial: true,
            awaitWriteFinish: true,
        },
    );

    watcher
        .on('add', (filePath) => buildEvent(filePath, 'added'))
        .on('change', (filePath) => buildEvent(filePath, 'changed'))
        .on('unlink', (filePath) => buildEvent(filePath, 'removed'));
} else {
    // eslint-disable-next-line no-console
    console.log('[WATCH] Disabled');
}

const main = () => {
    // eslint-disable-next-line no-console
    console.log('[INIT DEV] First build...');
    build();

    app.listen(3000, () => {
        // eslint-disable-next-line no-console
        console.log('[DEV] Server started at http://localhost:3000');
    });
};

if (require.main === module) {
    main();
}

module.exports = {
    main,
};
