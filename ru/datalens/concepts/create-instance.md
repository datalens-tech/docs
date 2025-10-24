---
title: Как развернуть {{ datalens-full-name }}
description: Следуя данной инструкции, вы сможете развернуть {{ datalens-full-name }}.
---



# Начало работы с DataLens

[DataLens](https://datalens.tech) — современная система бизнес-аналитики и визуализации данных. Она разработана и активно применяется как основной инструмент бизнес-аналитики в Яндексе, а также является компонентом платформы [Yandex Cloud](https://datalens.yandex.com). С более подробной информацией можно ознакомиться в нашем [плане развития](https://github.com/orgs/datalens-tech/projects/1), [описании изменений](https://github.com/datalens-tech/datalens/releases) и [сообществе в Telegram](https://t.me/YandexDataLens).

## Развертывание DataLens

Чтобы развернуть DataLens локально, достаточно запустить несколько контейнеров через [Docker Compose](https://docs.docker.com/compose/).

1. Если у вас нет Docker, установите его по инструкции для вашей платформы:

   * [macOS](https://docs.docker.com/desktop/install/mac-install/)
   * [Linux](https://docs.docker.com/engine/install/)
   * [Windows](https://docs.docker.com/desktop/install/windows-install/)

   {% note info %}

   * Новый Docker Compose в виде плагина доступен как пакет `docker-compose-v2` на Ubuntu 20.04/22.04/24.04 из базового APT-репозитория.

   * Минимальная поддерживаемая версия устаревшей утилиты `docker-compose` в виде отдельного пакета — это `1.29.0`. Она включена в базовый APT-репозиторий как пакет `docker-compose` только для Ubuntu 22.04.

   {% endnote %}

1. Запустите контейнеры. Для этого:

   1. Склонируйте репозиторий:

      ```bash
      git clone https://github.com/datalens-tech/datalens && cd datalens
      ```

   1. Чтобы ускорить работу, воспользуйтесь следующей командой для запуска контейнеров {{ datalens-short-name }}:

      ```bash
      HC=1 docker compose up
      ```

      Эта команда запустит все контейнеры, необходимые для работы {{ datalens-short-name }}. Интерфейс будет доступен по адресу `http://localhost:8080`, имя пользователя по умолчанию — `admin`, пароль — `admin`.

      {% note info %}

      [Highcharts](https://github.com/highcharts/highcharts/blob/master/readme.md) — это запатентованный коммерческий продукт. Если вы включаете Highcharts в своем экземпляре {{ datalens-short-name }} (с переменной `HC=1`), вы должны соблюдать [лицензию](https://github.com/highcharts/highcharts/blob/master/license.txt).

      Если библиотека Highcharts отключена, используется D3.js — в этом случае доступны не все [типы визуализаций](../visualization-ref/index.md). Команда {{ datalens-short-name }} активно работает над добавлением в D3.js недостающих типов визуализаций и со временем планирует полностью перейти на D3.js.

      {% endnote %}

      **Использование альтернативного порта для интерфейса**

      Если вам нужно использовать порт, отличный от порта по умолчанию (например, `8081`), можно установить соответствующую настройку с помощью переменной окружения `UI_PORT`:

      ```bash
      UI_PORT=8081 docker compose up
      ```

   1. В условиях реального использования рекомендуем генерировать файл `compose` с помощью случайных секретов:

      ```bash
      # генерируем случайные секреты через openssl, сохраняем их в файл .env и подготавливаем шаблон production compose
      ./init.sh --hc

      # далее запускаем production compose
      docker compose -f ./docker-compose.production.yaml up -d

      # можно также сгенерировать и запустить файл production compose одной командой
      ./init.sh --hc --up
      ```

      Случайно генерируемый пароль администратора хранится в файле `.env` и выводится в терминале.


      {% note info %}

      Все доступные аргументы для запуска скрипта вы можете найти, запустив команду:

      ```
      ./init.sh --help
      ```

      {% endnote %}

### Подключение Яндекс Карт {#yandex-maps-integration}

Функциональность доступна с [версии 1.11.0](https://github.com/datalens-tech/datalens/releases/tag/v1.11.0).

1. [Получите API-ключ](https://yandex.ru/dev/jsapi-v2-1/doc/ru/) для API Яндекс Карт.
1. [Запустите контейнер](#zapusk-kontejnerov) DataLens со следующими параметрами:

   | Параметр            | Описание                                                     | Значения        |
   | -------------------- | --------------------------------------------------------------- | ------------- |
   | `YANDEX_MAP_ENABLED` | Подключает визуализацию Яндекс Карт                       | `1` или `true` |
   | `YANDEX_MAP_TOKEN`   | [API-ключ](https://yandex.ru/dev/jsapi-v2-1/doc/en/) Яндекс Карт | `<string>`    |

   Выполните команду:

   **Docker Compose**

   ```bash
   YANDEX_MAP_ENABLED=1 YANDEX_MAP_TOKEN=XXXXXXXXX docker compose up
   ```

   **Скрипт инициализации**

   ```bash
   ./init.sh --yandex-map --yandex-map-token XXXXXXXXX --up
   ```

## Обновление DataLens

Для обновления DataLens до последней версии скачайте репозиторий `git` и перезапустите контейнеры:

```bash
git pull

# при использовании базового файла compose
docker compose up

# при использовании скрипта init.sh
./init.sh --up
```

Все пользовательские настройки, подключения и созданные объекты останутся в том же виде, в каком они хранятся в docker-томе `db-postgres`. Таким образом, обновление не затронет ваших данных.

## Развертывание с использованием Helm-чартов в кластере Kubernetes

Для развертывания в кластере Kubernetes можно использовать Helm-чарт из реестра пакетов, совместимого с OCI.

Для начала установите релиз Helm:

```bash
# генерируем rsa-ключи для сервисов auth и temporal
AUTH_TOKEN_PRIVATE_KEY=$(openssl genpkey -algorithm RSA -pkeyopt "rsa_keygen_bits:4096" 2>/dev/null)
AUTH_TOKEN_PUBLIC_KEY=$(echo "${AUTH_TOKEN_PRIVATE_KEY}" | openssl rsa -pubout 2>/dev/null)
TEMPORAL_AUTH_PRIVATE_KEY=$(openssl genpkey -algorithm RSA -pkeyopt "rsa_keygen_bits:4096" 2>/dev/null)
TEMPORAL_AUTH_PUBLIC_KEY=$(echo "${TEMPORAL_AUTH_PRIVATE_KEY}" | openssl rsa -pubout 2>/dev/null)

helm upgrade --install datalens oci://ghcr.io/datalens-tech/helm/datalens \
--namespace datalens --create-namespace \
--set "secrets.AUTH_TOKEN_PRIVATE_KEY=${AUTH_TOKEN_PRIVATE_KEY}" \
--set "secrets.AUTH_TOKEN_PUBLIC_KEY=${AUTH_TOKEN_PUBLIC_KEY}" \
--set "secrets.TEMPORAL_AUTH_PRIVATE_KEY=${TEMPORAL_AUTH_PRIVATE_KEY}" \
--set "secrets.TEMPORAL_AUTH_PUBLIC_KEY=${TEMPORAL_AUTH_PUBLIC_KEY}"
```

> Шаблонный движок Helm не имеет встроенных функций для создания открытых и закрытых RSA-ключей.

Обновите релиз Helm:

```bash
helm upgrade datalens oci://ghcr.io/datalens-tech/helm/datalens --namespace datalens
```

Логин и пароль администратора будет храниться в ресурсе секретов Kubernetes `datalens-secrets`.

## Компоненты проекта

DataLens состоит из следующих основных частей:

* [Интерфейс](https://github.com/datalens-tech/datalens-ui) — одностраничное приложение (SPA) с соответствующим компонентом на Node.js. Интерфейс направляет запросы пользователей к сервисам бэкенда, а также производит легкую постобработку данных для чартов.
* [Бэкенд](https://github.com/datalens-tech/datalens-backend) — набор Python-приложений и библиотек. Он отвечает за подключение к источникам данных, генерацию запросов к ним и постобработку данных (включая вычисление формул). Результатом этих действий является абстрактный датасет, который используется в интерфейсе для запросов к данным чарта.
* [UnitedStorage (US)](https://github.com/datalens-tech/datalens-us) — сервис Node.js, использующий PostgreSQL для хранения метаданных и конфигурации всех объектов DataLens.
* [Auth](https://github.com/datalens-tech/datalens-auth) — сервис Node.js, предоставляющий слой аутентификации/авторизации для DataLens.
* [MetaManager](https://github.com/datalens-tech/datalens-meta-manager) — сервис Node.js, предоставляющий воркеры процессов для экспорта и импорта воркбуков.

## Что уже доступно

Текущий релиз DataLens включает минимальный набор коннекторов (ClickHouse, ClickHouse через YTsaurus и PostgreSQL) и прочие основные функции: движок обработки данных, пользовательский интерфейс и минимальный уровень авторизации. Другие функции будут добавлены позже в соответствии с приоритетами сообщества и обратной связью пользователей.

## Облачные провайдеры

Платформа [Yandex Cloud](https://yandex.cloud) предоставляет [DataLens](https://datalens.ru) в качестве сервиса.

## Аутентификация

В DataLens по умолчанию включена встроенная аутентификация.

Чтобы запустить DataLens с аутентификацией и автоматически генерируемыми секретами, воспользуйтесь следующей командой:

```bash
./init.sh --up
```

> Файл `.env`, обновленный после инициализации, содержит ключи доступа и пароль администратора. Необходимо обеспечить сохранность этого файла и не делиться его содержимым.

Далее вы сможете авторизоваться в DataLens по адресу `http://localhost:8080` с помощью следующих учетных данных:

| Имя пользователя | Пароль                               |
| -------- | -------------------------------------- |
| `admin`  | `<AUTH_ADMIN_PASSWORD from .env file>` |

С помощью тех же учетных данных можно добавлять новых пользователей через панель управления администратора по адресу `http://localhost:8080/`.

По умолчанию в DataLens с включенной аутентификацией у всех пользователей есть роль `datalens.viewer`. Она позволяет просматривать все коллекции и воркбуки без возможности создания и редактирования объектов. Чтобы получить такую возможность, требуется роль `datalens.editor` или `datalens.admin`. Для назначения ролей откройте DataLens по адресу `http://localhost:8080`, найдите нужного пользователя и выберите соответствующую роль.

DataLens поддерживает следующие роли:

* `datalens.viewer` — позволяет просматривать все коллекции и воркбуки, однако не позволяет создавать или редактировать какие-либо объекты;
* `datalens.editor` — включает все разрешения роли `datalens.viewer`, а также позволяет создавать, редактировать и удалять все объекты;
* `datalens.admin` — в настоящее время эквивалентна `datalens.editor`. В будущих релизах пользователи с этой ролью смогут управлять системными настройками и выполнять административные операции.

## Вопросы и ответы

#### Где DataLens хранит метаданные?

Для хранения данных PostgreSQL используется docker-том `db-postgres`. Чтобы начать заново, можно удалить этот том, и он будет воссоздан вместе с демо-объектами при следующем запуске `datalens compose`.

#### Как использовать свой домен или IP-адрес для эндроинта контейнера пользовательского интерфейса?

При использовании обратного прокси-сервера с HTTPS и своим доменом можно сгенерировать файл `docker compose` со следующими аргументами:

`./init.sh --domain <domain> --https`

При использовании IP-адреса в качестве эндпоинта можно сгенерировать файл `docker compose` со следующим аргументом:

`./init.sh --ip <ip>`

#### Как указать стороннюю базу PostgreSQL?

Вы можете ознакомиться с примером производственного развертывания с высокой доступностью в кластере Kubernetes с помощью Tofu (Terraform) в директории `terraform/`.

Для использования внешней базы PostgreSQL вместе с Docker можно передать строку подключения в переменных окружения:

```bash
# пример файла .env

POSTGRES_HOST=
POSTGRES_PORT=6432
POSTGRES_USER=pg-user
POSTGRES_PASSWORD=
```

Для замены имен баз данных по умолчанию можно также передать это в переменных окружения:

```bash
# пример файла .env

POSTGRES_DB_COMPENG='pg-compeng-db'
POSTGRES_DB_AUTH='pg-auth-db'
POSTGRES_DB_US='pg-us-db'
POSTGRES_DB_META_MANAGER='pg-meta-manager-db'
POSTGRES_DB_TEMPORAL='pg-temporal-db'
POSTGRES_DB_TEMPORAL_VISIBILITY='pg-temporal-visibility-db'
POSTGRES_DB_DEMO='pg-demo-db'
```

После этого можно запустить DataLens следующей командой:

```bash
./init.sh --postgres-external --up
```

Она сгенерирует файл `docker-compose.production.yaml` без контейнера PostgreSQL.

#### Как прописать пользовательский сертификат для подключения к базе данных?

Дополнительные сертификаты можно добавить с помощью аргумента `--postgres-cert` для скрипта `./init.sh`. Сертификат будет привязан ко всем контейнерам и использоваться для подключения к базе данных.

```bash
./init.sh --postgres-external --postgres-ssl --postgres-cert ./cert.pem --up
```

Если контейнеры не запускаются даже после указания верных сертификатов, задайте переменной подключения `POSTGRES_ARGS` в файле `.env` значение `?sslmode=prefer`.

#### При использовании внешней базы PostgreSQL приложение не запускается. В чем причина?

Для базы метаданных используются некоторые расширения PostgresSQL. Проверьте права пользователя базы данных на установку расширений или установите их вручную:

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS btree_gin;
CREATE EXTENSION IF NOT EXISTS btree_gist;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

По умолчанию автоматическая установка расширений выключена переменной `SKIP_INSTALL_DB_EXTENSIONS=1`. Чтобы включить ее, задайте переменной `SKIP_INSTALL_DB_EXTENSIONS` в файле `.env` значение `0`. Приложения проверят наличие расширений при запуске и, в случае если они не установлены, попытаются установить их.

Если это не удается, установите зависимости с помощью администратора базы данных.

При использовании управляемой базы данных также возможно, что расширения для вашей базы контролируются внешней системой, поэтому их можно изменить только интерфейсом или API этой системы. В таком случае следует обратиться к документации используемого вами сервиса управления базами данных.

#### Почему у меня два compose-файла — `docker-compose.yaml` и `docker-compose.dev.yaml`?

Файл `docker-compose.dev.yaml` — это особый compose-файл, используемый только в целях разработки. При запуске DataLens в реальных условиях нужно всегда использовать файл `docker-compose.yaml` или скрипт `./init.sh`.

#### Как отключить аутентификацию?

При необходимости использовать DataLens без аутентификации (в целях разработки или тестирования) можно использовать флаг `--disable-auth` в скрипте инициализации:

```bash
./init.sh --disable-auth --up
```

Так вы сгенерируете compose-файл без сервиса аутентификации, что обеспечит прямой доступ к DataLens без логина и пароля.

#### Как отключить экспорт воркбуков?

Чтобы отключить функцию экспорта воркбуков в целях экономии ресурсов или упрощения процесса разработки, используйте флаг `--disable-workbook-export`:

```bash
./init.sh --disable-workbook-export --up
```

Он отключит экспорт воркбуков в формате JSON и удалит сервисы `meta-manager` и `ui-api` из развертывания.

#### Как отключить сервис Temporal для систем с ограниченными ресурсами?

Для таких систем можно отключить сервис рабочих процессов Temporal с помощью флага `--disable-temporal`:

```bash
./init.sh --disable-temporal --up
```

Сервис Temporal будет удален из развертывания, что значительно сократит потребление ресурсов. Обратите внимание, что отключение Temporal также приведет к автоматическому отключению экспорта воркбуков, поскольку эта функция зависит от рабочих процессов Temporal.

#### Каковы минимальные системные требования?

Минимальные системные требования для установки DataLens OpenSource:

* `datalens-ui` — 512 MB RAM
* `datalens-data-api` — 1 GB RAM
* `datalens-control-api` — 512 MB RAM
* `datalens-us` — 512 MB RAM
* `datalens-postgres` — 512 MB RAM

Минимальная конфигурация:

* RAM — 4 ГБ
* CPU — 2 ядра

Фактическое потребление ресурсов зависит от сложности запросов, видов подключения, числа пользователей и скорости обработки на уровне источника.

