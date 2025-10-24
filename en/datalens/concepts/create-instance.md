---
title: How to deploy {{ datalens-full-name }}
description: Follow this guide to deploy {{ datalens-full-name }}.
---



# Getting started with DataLens

[DataLens](https://datalens.tech) is a modern business analytics and data visualization system. Developed and actively used as Yandex's main business analysis tool, it also is a [Yandex Cloud](https://datalens.yandex.com) platform component. For details, refer to our [roadmap](https://github.com/orgs/datalens-tech/projects/1), [changelog](https://github.com/datalens-tech/datalens/releases), and [Telegram community](https://t.me/YandexDataLens).

## Deploying DataLens

To deploy DataLens locally, just run multiple containers using [Docker Compose](https://docs.docker.com/compose/):

1. If you do not have Docker, install it by following the guide for your platform:

   * [macOS](https://docs.docker.com/desktop/install/mac-install/)
   * [Linux](https://docs.docker.com/engine/install/)
   * [Windows](https://docs.docker.com/desktop/install/windows-install/)

   {% note info %}

   * The new Docker Compose plugin is available as the `docker-compose-v2` package for Ubuntu 20.04/22.04/24.04 from the base APT repository.

   * The minimum supported version of the outdated `docker-compose` utility as a standalone package is `1.29.0`. It is included in the base APT repository as the `docker-compose` package only for Ubuntu 22.04.

   {% endnote %}

1. Run your containers. To do this:

   1. Clone the repository:

      ```bash
      git clone https://github.com/datalens-tech/datalens && cd datalens
      ```

   1. To speed things up, use the following command to start {{ datalens-short-name }} containers:

      ```bash
      HC=1 docker compose up
      ```

      This command will start all the containers {{ datalens-short-name }} needs to operate. The interface will be available at `http://localhost:8080`, the default username is `admin`, the password is `admin`.

      {% note info %}

      [Highcharts](https://github.com/highcharts/highcharts/blob/master/readme.md) is a patented commercial product. If you enable Highcharts in your {{ datalens-short-name }} instance (with the `HC=1` variable), make sure to comply with the [license](https://github.com/highcharts/highcharts/blob/master/license.txt).

      If Highcharts is disabled, {{ datalens-short-name }} uses D3.js, in which case not all [visualization types](../visualization-ref/index.md) are available. The {{ datalens-short-name }} team is actively working on adding the missing visualization types to D3.js and plans to fully transition to D3.js over time.

      {% endnote %}

      **Using an alternate port for the interface**

      If you need to use a port different from the default one (e.g., `8081`), you can set the relevant setting using the `UI_PORT` environment variable:

      ```bash
      UI_PORT=8081 docker compose up
      ```

   1. In real-world scenarios, we recommend generating the `compose` file using random secrets:

      ```bash
      # generate random secrets via openssl, save them to the `.env` file and prepare a production compose template
      ./init.sh --hc

      # then run production compose
      docker compose -f ./docker-compose.production.yaml up -d

      # you can also generate and run the production compose file with a single command
      ./init.sh --hc --up
      ```

      The randomly generated administrator password is stored in the `.env` file and displayed in the terminal.


      {% note info %}

      Run this command to find all available arguments for the script to run:

      ```
      ./init.sh --help
      ```

      {% endnote %}

### Connecting Yandex Maps {#yandex-maps-integration}

This feature is available starting with [version 1.11.0](https://github.com/datalens-tech/datalens/releases/tag/v1.11.0).

1. [Get an API key](https://yandex.ru/dev/jsapi-v2-1/doc/en/) for the Yandex Maps API.
1. [Run](#zapusk-kontejnerov) the DataLens container with the following parameters:

   | Parameter            | Description                                                     | Values        |
   | -------------------- | --------------------------------------------------------------- | ------------- |
   | `YANDEX_MAP_ENABLED` | Connects Yandex Maps visualization                       | `1` or `true` |
   | `YANDEX_MAP_TOKEN`   | Yandex Maps [API key](https://yandex.ru/dev/jsapi-v2-1/doc/en/) | `<string>`    |

   Run this command:

   **Docker Compose**

   ```bash
   YANDEX_MAP_ENABLED=1 YANDEX_MAP_TOKEN=XXXXXXXXX docker compose up
   ```

   **Initialization script**

   ```bash
   ./init.sh --yandex-map --yandex-map-token XXXXXXXXX --up
   ```

## Updating DataLens

To update DataLens to the latest version, download the `git` repository and restart your containers:

```bash
git pull

# if using the basic compose file
docker compose up

# if using the init.sh script
./init.sh --up
```

All user settings, connections, and created objects will remain the way they are stored in the `db-postgres` docker volume. The update will thus not affect your data.

## Deployment with the help of Helm charts in a Kubernetes cluster

To deploy in a Kubernetes cluster, you can use a Helm chart from an OCI-compliant package registry.

Start by installing the Helm release:

```bash
# Generate rsa keys for auth and temporal:
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

> The Helm template engine does not have built-in features for generating public and private RSA keys.

Update the Helm release:

```bash
helm upgrade datalens oci://ghcr.io/datalens-tech/helm/datalens --namespace datalens
```

The administrator login and password will be stored in the Kubernetes secrets resource named `datalens-secrets`.

## Project components

DataLens consists of the following main parts:

* [Interface](https://github.com/datalens-tech/datalens-ui) is a single-page application (SPA) with a corresponding Node.js component. This interface routes user requests to backend services and lightly post-processes chart data.
* [Backend](https://github.com/datalens-tech/datalens-backend) is a set of Python applications and libraries responsible for establishing connections to data sources, generating queries to them, and data post-processing (including formula calculations). The result of these actions is an abstract dataset used in the interface for querying chart data.
* [UnitedStorage (US)](https://github.com/datalens-tech/datalens-us) is a Node.js service that uses PostgreSQL to store metadata and configure all DataLens objects.
* [Auth](https://github.com/datalens-tech/datalens-auth) is a Node.js service that provides an authentication/authorization layer for DataLens.
* [MetaManager](https://github.com/datalens-tech/datalens-meta-manager) is a Node.js service that provides process workers for workbook export and import.

## What is already available

The current DataLens release includes a minimal set of connectors (ClickHouse, ClickHouse via YTsaurus, and PostgreSQL) and other basic features: data processing engine, user interface, and minimal level of authorization. More features will be added later based on community priorities and user feedback.

## Cloud providers

[Yandex Cloud](https://yandex.cloud) provides [DataLens](https://datalens.ru) as a service.

## Authentication

DataLens has built-in authentication enabled by default.

To start DataLens with authentication and automatically generated secrets, use the following command:

```bash
./init.sh --up
```

> The `.env` file, updated after initialization, contains access keys and the administrator password. Keep this file safe at all times and do not share its contents.

You can then log into DataLens at `http://localhost:8080` using the following credentials:

| User name | Password                               |
| -------- | -------------------------------------- |
| `admin`  | `<AUTH_ADMIN_PASSWORD from .env file>` |

Use the same credentials to add new users through the admin control panel at `http://localhost:8080/`.

By default, in DataLens with authentication enabled, all users have the `datalens.viewer` role. It allows viewing all collections and workbooks without the ability to create and edit objects. You need the `datalens.editor` or `datalens.admin` role for that. To assign roles, open DataLens at `http://localhost:8080`, find the user of interest and select the relevant role.

DataLens supports the following roles:

* `datalens.viewer`: Allows you to view all collections and workbooks, but does not allow you to create or edit any objects.
* `datalens.editor`: Includes all permissions of the `datalens.viewer` role, and also allows you to create, edit, and delete all objects.
* `datalens.admin`: Currently equivalent to `datalens.editor`. In future releases, users with this role will be able to manage system settings and perform administrative operations.

## FAQ

#### Where does DataLens store metadata?

It uses a `db-postgres` docker volume to store PostgreSQL data. To start over, you can delete this volume, and it will be recreated along with the demo objects the next time you run `datalens compose`.

#### How to use your own domain or IP address for the UI container endpoint?

When using a reverse proxy with HTTPS and your own domain, you can generate a `docker compose` file with the following arguments:

`./init.sh --domain <domain> --https`

When using an IP address as an endpoint, you can generate a `docker compose` file with the following argument:

`./init.sh --ip <ip>`

#### How to specify a third-party PostgreSQL database?

You can see an example of a highly available production deployment in a Kubernetes cluster using Tofu (Terraform) in the `terraform/` directory.

To use an external PostgreSQL database with Docker, you can provide the connection string in environment variables:

```bash
# Example of the `.env` file:

POSTGRES_HOST=
POSTGRES_PORT=6432
POSTGRES_USER=pg-user
POSTGRES_PASSWORD=
```

To override the default database names, you can also provide this in environment variables:

```bash
# Example of the `.env` file:

POSTGRES_DB_COMPENG='pg-compeng-db'
POSTGRES_DB_AUTH='pg-auth-db'
POSTGRES_DB_US='pg-us-db'
POSTGRES_DB_META_MANAGER='pg-meta-manager-db'
POSTGRES_DB_TEMPORAL='pg-temporal-db'
POSTGRES_DB_TEMPORAL_VISIBILITY='pg-temporal-visibility-db'
POSTGRES_DB_DEMO='pg-demo-db'
```

After this, you can run DataLens using the following command:

```bash
./init.sh --postgres-external --up
```

It will generate a `docker-compose.production.yaml` file without a PostgreSQL container.

#### How to specify a custom certificate for connection to a database?

You can add additional certificates using the `--postgres-cert` argument to the `./init.sh` script. The certificate will be bound to all containers and used to connect to the database.

```bash
./init.sh --postgres-external --postgres-ssl --postgres-cert ./cert.pem --up
```

If the containers fail to start even after you specify the correct certificates, set the `POSTGRES_ARGS` connection variable in the `.env` file to `?sslmode=prefer`.

#### When using an external PostgreSQL database, the application does not start. What is the reason?

The metadata database uses some PostgreSQL extensions. Check the database user's permissions to install extensions or install them manually:

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS btree_gin;
CREATE EXTENSION IF NOT EXISTS btree_gist;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

By default, automatic installation of extensions is disabled by the `SKIP_INSTALL_DB_EXTENSIONS=1` variable. To enable it, set the `SKIP_INSTALL_DB_EXTENSIONS` variable in the `.env` file to `0`. Applications will check for extensions on startup and, if there are not any, will try to install them.

If this fails, install dependencies with the database administrator's help.

When using a managed database, it is also possible that the extensions to your database are controlled by an external system, so you can only change them through that system's interface or API. In this case, refer to your database management service's documentation.

#### Why do I have two compose files, `docker-compose.yaml` and `docker-compose.dev.yaml`?

`docker-compose.dev.yaml` is a special compose file used for development purposes only. When running DataLens in real-world conditions, you should always use the `docker-compose.yaml` file or `./init.sh` script.

#### How to disable authentication?

If you need to use DataLens without authentication (for development or testing purposes), you can use the `--disable-auth` flag in the initialization script:

```bash
./init.sh --disable-auth --up
```

This will generate a compose file without an authentication service for direct access to DataLens without a login and password.

#### How to disable workbook export?

To disable the workbook export feature in order to save resources or simplify the development process, use the `--disable-workbook-export` flag:

```bash
./init.sh --disable-workbook-export --up
```

This will disable export of workbooks in JSON format and remove `meta-manager` and `ui-api` from the deployment.

#### How to disable Temporal for systems with limited resources?

For such systems, you can disable the Temporal workflow service using the `--disable-temporal` flag:

```bash
./init.sh --disable-temporal --up
```

Temporal will be removed from the deployment, thus significantly reducing resource consumption. Note that disabling Temporal will also automatically disable workbook export because this feature depends on Temporal workflows.

#### What are the minimum system requirements?

Minimum system requirements for DataLens OpenSource:

* `datalens-ui`: 512 MB RAM
* `datalens-data-api`: 1 GB RAM
* `datalens-control-api`: 512 MB RAM
* `datalens-us`: 512 MB RAM
* `datalens-postgres`: 512 MB RAM

Minimum configuration:

* RAM: 4 GB
* CPU: 2 cores

Actual resource consumption depends on the complexity of the queries, connection types, number of users, and processing speed at the source level.

