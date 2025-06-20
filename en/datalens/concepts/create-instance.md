---
title: How to deploy {{ datalens-full-name }}
description: Follow this guide to deploy {{ datalens-full-name }}.
---



# {{ datalens-short-name }} deployment

To deploy {{ datalens-short-name }} locally, just run multiple containers using [Docker Compose](https://docs.docker.com/compose/):

1. If you do not have Docker, install it by following the guide for your platform:

   * [macOS](https://docs.docker.com/desktop/install/mac-install/)
   * [Linux](https://docs.docker.com/engine/install/)
   * [Windows](https://docs.docker.com/desktop/install/windows-install/)

1. Run the following commands:

   1. Clone the repository:

      ```bash
      git clone https://github.com/datalens-tech/datalens
      ```

   1. Go to the repository directory and run all the containers required to start {{ datalens-short-name }}:

      ```bash
      cd <path_to_datalens_directory> && \
      HC=1 docker compose up
      ```

      You can run the last command with a parameter for connecting an external database:

      ```bash
      METADATA_POSTGRES_DSN_LIST="postgres://{user}:{password}@{host}:{port}/{database}" HC=1 docker compose up
      ```

      {% note info %}

      [Highcharts](https://github.com/highcharts/highcharts/blob/master/readme.md) is a patented commercial product. If you enable Highcharts in your {{ datalens-short-name }} instance (with the `HC=1` variable), make sure to comply with the [license](https://github.com/highcharts/highcharts/blob/master/license.txt). When Highcharts is disabled, not all [visualization types](../visualization-ref/index.md) are available.

      {% endnote %}

1. Open the {{ datalens-short-name }} UI at`http://localhost:8080`.

Once you run {{ datalens-short-name }}, you can:

* Review demo examples
* Attach data [sources](./connection.md)
* Build custom [dashboards](./dashboard.md)

The first release of the open-source version includes everything you need to try {{ datalens-short-name }} features in your infrastructure. The [repository](https://github.com/datalens-tech/datalens/) currently hosts the service core, a set of key connectors ([{{ PG }}](../operations/connection/create-postgresql.md), [{{ CH }}](../operations/connection/create-clickhouse.md), and [{{ ytsaurus-name }}](../operations/connection/chyt/create-chyt.md)), and the main interface components.

