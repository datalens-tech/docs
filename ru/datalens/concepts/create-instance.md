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

   {% note info %}

   Новый Docker Compose в виде плагина доступен как пакет `docker-compose-v2` на Ubuntu 20.04/22.04/24.04 из базового APT-репозитория.

   Минимальная поддерживаемая версия устаревшей утилиты `docker-compose` в виде отдельного пакета — это `1.29.0`. Она включена в базовый APT-репозиторий как пакет `docker-compose` только для Ubuntu 22.04.

   {% endnote %}

1. Выполните следующие команды:

   1. Склонируйте репозиторий и перейдите в него:

      ```bash
      git clone https://github.com/datalens-tech/datalens && cd datalens
      ```

   1. Запустите все контейнеры, необходимые для старта {{ datalens-short-name }}:

      ```bash
      HC=1 docker compose up
      ```
      {% note info %}

      [Highcharts](https://github.com/highcharts/highcharts/blob/master/readme.md) — это запатентованный коммерческий продукт. Если вы включаете Highcharts в своем экземпляре {{ datalens-short-name }} (с переменной `HC=1`), вы должны соблюдать [лицензию](https://github.com/highcharts/highcharts/blob/master/license.txt).
      
      Если библиотека Highcharts отключена, используется D3.js — в этом случае доступны не все [типы визуализаций](../visualization-ref/index.md). Команда {{ datalens-short-name }} активно работает над добавлением в D3.js недостающих типов визуализаций и со временем планирует полностью перейти на D3.js.

      {% endnote %}

      Интерфейс {{ datalens-short-name }} будет доступен по адресу `http://localhost:8080`, учетные данные для входа первого пользователя: пользователь — `admin`, пароль — `admin`.

      Если вы хотите задействовать другой порт, например `8081`, используйте переменную окружения `UI_PORT`:

      ```bash
      UI_PORT=8081 docker compose up
      ```

   1. Для production-развертывания {{ datalens-short-name }} рекомендуется сгенерировать файл конфигурации с предзаполненными случайными секретами:

      ```bash
      # генерация секретов с помощью openssl, сохранение их в файл .env file и подготовка production-шаблона для compose-файла
      ./init.sh --hc

      # Запуск production-окружения с использованием compose-файла
      docker compose -f ./docker-compose.production.yaml up -d

      # Единая команда для генерации и запуска production-шаблона
      ./init.sh --hc --up
      ```
      
      Сгенерированный пароль для администратора будет сохранен в `.env` файле и выведен в терминале.

      {% note info %}

      Все доступные аргументы для запуска скрипта вы можете найти, запустив команду:
      
      ```
      ./init.sh --help
      ```

      {% endnote %}

После запуска {{ datalens-short-name }} вы сможете:

* изучить демо-примеры;
* подключить [источники](./connection.md);
* построить свои [дашборды](./dashboard.md).

В первый релиз открытой версии входит все необходимое, чтобы опробовать возможности {{ datalens-short-name }} на своей инфраструктуре. Сейчас в [репозитории](https://github.com/datalens-tech/datalens/) опубликовано ядро сервиса, набор основных подключений ([{{ PG }}](../operations/connection/create-postgresql.md), [{{ CH }}](../operations/connection/create-clickhouse.md) и [{{ ytsaurus-name }}](../operations/connection/chyt/create-chyt.md)) и основные части интерфейса.

