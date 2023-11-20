import fs from 'fs';
import path from 'path';

// import visit from 'unist-util-visit';

const preprocessor = ({filePath, fileContent}) => {
    let remarkContent = fileContent.toString();

    // notes
    remarkContent = remarkContent
        .replace(/\{% ?note (note|tip|info|warning|danger) ?%\}/g, ':::$1')
        .replace(/\{% ?endnote ?%\}/g, ':::');

    // include
    remarkContent = remarkContent.replace(
        /\{% include ?(notitle)? ?\[[^\]]+\] ?\(([^)]+)\) ?%\}/g,
        (sub, notitle, link) => {
            const dirPath = filePath.replace(new RegExp(`${path.basename(filePath)}$`), '');

            const f = path.resolve(path.join(dirPath, link));

            let fContent = fs.readFileSync(f).toString();

            if (notitle) {
                fContent = fContent.replace(/^#.*\n/, '');
            }

            return fContent;
        },
    );

    // TODO: tabs
    remarkContent = remarkContent.replace(/\{% list tabs %\}/g, '').replace(/\{% endlist %\}/g, '');

    // cut
    remarkContent = remarkContent
        .replace(/\{% cut ?"?([^%"]+)"? ?%\}/g, '<details>\n<summary>$1</summary>\n')
        .replace(/\{% ?endcut ?%\}/g, '</details>');

    return remarkContent;
};

// {% cut "A slice of two rows from the source table" %}
// {% endcut %}

// {% list tabs %}
// {% endlist %}

// {% note info %}
// {% note tip %}
// {% note warning %}
// {% endnote %}

// {% include [datalens-db-note](datalens-db-note.md) %}
// {% include notitle [get-geo](../_qa/datalens/get-geo.md) %}

// const plugin = () => {
//     const transformer = async (ast) => {
//         visit(ast, 'text', (node) => {
//             fs.writeFileSync('test.log', 'test');
//         });
//     };
//     return transformer;
// };

// const plugin = (options) => {
//   const transformer = async (ast) => {
//     let number = 1;
//     visit(ast, 'heading', (node) => {
//       if (node.depth === 2 && node.children.length > 0) {
//         node.children.unshift({
//           type: 'text',
//           value: `Section ${number}. `,
//         });
//         number++;
//       }
//     });
//   };
//   return transformer;
// };
export default preprocessor;
