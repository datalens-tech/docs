# DataLens docs

Welcome to the datalens-tech/docs repository. Here you can suggest additions and fixes for the DataLens [documentation](https://datalens.tech/docs) or make them by yourself.

## Making edits

You can report bugs and submit suggestions as GitHub issues in this repository. To make edits, create a pull request from your fork. Edits will be reviewed by the repository owner.

## About docs

Our documentation is developed using [Yandex Flavored Markdown](https://diplodoc.com/docs/en/index-yfm).

## Building docs

Pre-build script for prepare navigation and up datalens docs to root level.

```bash
npm run pre-build
```

Build .md doc sources into .html static files.

```bash
npm run build
```
Post-build script for fixing metadata tags and adding headers.

```bash
npm run post-build
```
