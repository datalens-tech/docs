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

## Deployment

1. Push changes to the `main` branch

2. Wait for the automatic deployment with GitHub Actions: [build.yaml](.github/workflows/build.yaml)

3. GitHub workflow action will create new release with current date tag

4. Go to [datalens-landing](https://github.com/datalens-tech/landing/) repository and manually run `Deploy` workflow action: [link](https://github.com/datalens-tech/landing/actions/workflows/deploy.yml)

5. GitHub workflow action at landing repository automatically pull new docs release, build and deploy landing and docs to [datalens.tech](https://datalens.tech) as GitHub pages 


## Sync with docs

1. Documentation is synchronized with the main repository: [link](https://github.com/yandex-cloud/docs)

2. If you want to update the documentation, you need to create a pull request in the main repository

3. After the pull request is merged, robot (`DataUI VCS Robot`) automatically sync changes from the main repository to the this DataLens docs repository

4. The `ru`, `en` folders at root and the `.yfm` file are synchronized and will be overwritten

5. If you need to make changes `.yfm` config file, you need to edit local `.yfm-dltech` file
