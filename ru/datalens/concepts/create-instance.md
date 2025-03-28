---
title: Как развернуть {{ datalens-full-name }}
description: Следуя данной инструкции, вы сможете развернуть {{ datalens-full-name }}.
---



# Развертывание {{ datalens-short-name }}

Чтобы развернуть {{ datalens-short-name }} локально, достаточно запустить несколько контейнеров через [Docker Compose](https://docs.docker.com/compose/):

1. Если у вас нет Docker, установите его по инструкции для вашей платформы:

   * [macOS](https://docs.docker.com/desktop/install/mac-install/)
   * [Linux](https://docs.docker.com/engine/install/)
   * [Windows](https://docs.docker.com/desktop/install/windows-install/)

1. Выполните следующие команды:

   1. Склонируйте репозиторий:

      ```bash
      git clone https://github.com/datalens-tech/datalens
      ```

   1. Перейдите в директорию с репозиторием и запустите все контейнеры, необходимые для старта {{ datalens-short-name }}:

      ```bash
      cd <путь_к_папке_datalens> && \
      HC=1 docker compose up
      ```

      Последнюю команду можно выполнить с параметром для подключения внешней базы данных:

      ```bash
      METADATA_POSTGRES_DSN_LIST="postgres://{user}:{password}@{host}:{port}/{database}" HC=1 docker compose up
      ```

      {% note info %}

      [Highcharts](https://github.com/highcharts/highcharts/blob/master/readme.md) — это запатентованный коммерческий продукт. Если вы включаете Highcharts в своем экземпляре {{ datalens-short-name }} (с переменной `HC=1`), вы должны соблюдать [лицензию](https://github.com/highcharts/highcharts/blob/master/license.txt). С выключенным Highcharts доступны не все [типы визуализаций](../visualization-ref/index.md).

      {% endnote %}

1. Перейдите в пользовательский интерфейс {{ datalens-short-name }} по адресу `http://localhost:8080`.

После запуска {{ datalens-short-name }} вы сможете:

* изучить демо-примеры;
* подключить [источники](./connection.md);
* построить свои [дашборды](./dashboard.md).

В первый релиз открытой версии входит все необходимое, чтобы опробовать возможности {{ datalens-short-name }} на своей инфраструктуре. Сейчас в [репозитории](https://github.com/datalens-tech/datalens/) опубликовано ядро сервиса, набор основных подключений ([{{ PG }}](../operations/connection/create-postgresql.md), [{{ CH }}](../operations/connection/create-clickhouse.md) и [{{ ytsaurus-name }}](../operations/connection/chyt/create-chyt.md)) и основные части интерфейса.

