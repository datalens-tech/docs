---
__system: {"dislikeVariants":["Нет ответа на мой вопрос","Рекомендации не помогли","Содержание не соответствует заголовку","Другое"]}
---
# Создание подключения к ClickHouse

{% note info %}

Все запросы к данным выполняются с включенным флагом [join_use_nulls](https://clickhouse.com/docs/ru/operations/settings/settings/#join_use_nulls). Ознакомьтесь с разделом [{#T}](#ch-connection-specify), если вы используете представления (VIEW) или подзапросы с секцией JOIN в DataLens.

{% endnote %}



Чтобы создать подключение к ClickHouse:

1. Перейдите на страницу воркбука.
1. В правом верхнем углу нажмите **Создать** → **Подключение**.
1. Выберите подключение **ClickHouse**.
1. Укажите параметры подключения для внешней БД ClickHouse:

   {% include [datalens-db-connection-parameters](../../../_includes/datalens/datalens-db-connection-parameters.md) %}

1. Нажмите кнопку **Создать подключение**.
1. Укажите название подключения и нажмите кнопку **Создать**.

{% include [datalens-check-host](../../../_includes/datalens/operations/datalens-check-host.md) %}


## Дополнительные настройки {#clickhouse-additional-settings}

Вы можете указать дополнительные параметры подключения в разделе **Продвинутые настройки подключения**:

* **TLS** — когда опция включена, при взаимодействии с БД используется протокол `HTTPS`, когда выключена — `HTTP`.

* **CA Certificate** — чтобы загрузить сертификат, нажмите кнопку **Прикрепить файл** и укажите файл сертификата. Когда сертификат загружен, поле отображает название файла.

* {% include [datalens-db-connection-export-settings-item](../../../_includes/datalens/operations/datalens-db-connection-export-settings-item.md) %}

## Особенности работы с подключением к ClickHouse {#ch-connection-specify}

Вы можете создавать датасеты поверх представлений (`VIEW`) в ClickHouse, содержащих секцию `JOIN`. Для этого представление должно быть создано с включенной опцией `join_use_nulls`. Рекомендуется выставлять настройку `join_use_nulls = 1` в секции `SETTINGS`:

```sql
CREATE VIEW ... (
    ...
) AS
    SELECT
        ...
    FROM
        ...
    SETTINGS join_use_nulls = 1
```

Также следует включать эту опцию для подзапросов raw-sql, которые используются как источник данных в датасете.

Чтобы избежать ошибок при работе с представлениями в DataLens, содержащими секцию JOIN, создайте заново все представления с настройкой `join_use_nulls = 1`. Пустые ячейки при этом заполнятся значениями `NULL`, а тип соответствующих полей преобразуется в [Nullable](https://clickhouse.com/docs/ru/sql-reference/data-types/nullable/#data_type-nullable).
