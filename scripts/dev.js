const express = require('express');
const path = require('path');
const fs = require('fs-extra');

const app = express();
const root = './build';

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

const listen = () =>
    app.listen(3000, () => {
        // eslint-disable-next-line no-console
        console.log('[DEV] Server started at http://localhost:3000');
    });

if (require.main === module) {
    listen();
}

module.exports = {
    listen,
};
