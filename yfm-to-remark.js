import fs from 'fs';
import path from 'path';

const recursiveInclude = (content, filePath) => {
    const regex = new RegExp(/\{% include ?(notitle)? ?\[[^\]]+\] ?\(([^)]+)\) ?%\}/, 'g');

    const match = content.match(regex);
    let outContent = content;

    const dirPath = filePath.replace(new RegExp(`${path.basename(filePath)}$`), '');

    if (match) {
        outContent = content.replace(regex, (sub, notitle, link) => {
            try {
                const f = path.resolve(path.join(dirPath, link));

                let fContent = fs.readFileSync(f).toString();

                if (notitle) {
                    fContent = fContent.replace(/^#.*\n/, '');
                }

                return recursiveInclude(fContent, f);
            } catch (err) {
                console.error(filePath, err.stack || err);
            }
        });
    }

    // #T link to title from anchor
    outContent = outContent.replace(/\[\{#T\}\]\(([^)]+)\)/g, (sub, link) => {
        let title = '';

        try {
            if (link.startsWith('#')) {
                title = (fs
                    .readFileSync(filePath)
                    .toString()
                    .match(new RegExp(`#+ ([^{]) ?{${link}}`)) || [])[1];
            } else {
                const linkSeed = link.split('#');

                const f = path.resolve(path.join(dirPath, linkSeed[0]));
                title = (fs
                    .readFileSync(f)
                    .toString()
                    .match(
                        linkSeed.length > 1
                            ? new RegExp(`#+ ([^{]) ?{#${linkSeed[1]}}`)
                            : new RegExp('^#+ ([^[!]+)'),
                    ) || [])[1];
            }
        } catch (err) {
            console.error(filePath, err.stack || err);
        }

        return `[${title || ''}](${link})`;
    });

    // img links
    outContent = outContent.replace(/\((\.\.\/[^)]*?_assets\/[^)]+)\)/g, (sub, link) => {
        let absoluteLink = path.resolve(path.join(dirPath, link));
        absoluteLink = absoluteLink.replace(new RegExp(`^${process.cwd()}/`), '');
        absoluteLink = absoluteLink.replace(new RegExp(`^\\w{2}/_assets`), '_assets');

        const prefix = dirPath
            .replace(new RegExp(`^${process.cwd()}/`), '')
            .replace(new RegExp(`^\\w{2}/`), '')
            .replace(/\/$/, '')
            .split('/')
            .map(() => '..')
            .join('/');

        absoluteLink = path.join(prefix, absoluteLink);

        return `(${absoluteLink})`;
    });

    return outContent;
};

const preprocessor = ({filePath, fileContent}) => {
    let remarkContent = fileContent.toString();

    // include
    remarkContent = recursiveInclude(remarkContent, filePath);

    // br
    remarkContent = remarkContent.replace(/<br\/>/g, '\\\n').replace(/<br>/g, '\\\n');

    // cut
    remarkContent = remarkContent
        .replace(/\{% cut ?"?([^%"]+)"? ?%\}/g, '<details>\n<summary>$1</summary>\n')
        .replace(/\{% ?endcut ?%\}/g, '</details>');

    // notes
    remarkContent = remarkContent
        .replace(/\{% ?note (note|tip|info|warning|danger) ?%\}/g, ':::$1')
        .replace(/\{% ?endnote ?%\}/g, ':::');

    // TODO: tabs
    remarkContent = remarkContent.replace(/\{% list tabs %\}/g, '').replace(/\{% endlist %\}/g, '');

    // > < symbols
    remarkContent = remarkContent
        .replace(/</g, '&lt;')
        .replace(/>/g, '&rt;')
        .replace(/{/g, '&lcub;')
        .replace(/}/g, '&rcub;');

    return remarkContent;
};

export default preprocessor;
