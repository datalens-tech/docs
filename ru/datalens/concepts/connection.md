# Подключение к источнику данных

_Подключение_ содержит информацию о параметрах доступа к источнику данных. Например, IP-адрес хоста БД, порт.

В одном подключении можно описать только один источник данных.

На базе подключения вы можете создавать [_датасеты_](../dataset/index.md).

В {{ datalens-short-name }} доступны следующие типы подключений:



* [{{ CH }}](../operations/connection/create-clickhouse.md)
* [{{ PG }}](../operations/connection/create-postgresql.md)
* [{{ ytsaurus-name }} CHYT](../operations/connection/chyt/create-chyt.md)
* [{{ ydb-short-name }}](../operations/connection/create-ydb.md)
* [{{ MY }}](../operations/connection/create-mysql.md)
* [{{ GP }}](../operations/connection/create-greenplum.md)
* [MS SQL Server](../operations/connection/create-mssql-server.md)
* [Oracle Database](../operations/connection/create-oracle.md)
* [{{ TR }}](../operations/connection/create-trino.md)
* [Metrica](../operations/connection/create-metrica-api.md)
* [AppMetrica](../operations/connection/create-appmetrica.md)




{% include [clickhouse-disclaimer](../../_includes/clickhouse-disclaimer.md) %}
