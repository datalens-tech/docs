---
title: How to create a {{ CH }} connection
description: Follow this guide to create a connection to {{ CH }}.
---

# Creating a {{ CH }} connection

{% note info %}

All data requests must be made with the [join_use_nulls]({{ ch.docs }}/operations/settings/settings/#join_use_nulls) flag enabled. See [Specifics of using a connection to {{ CH }}](#ch-connection-specify) if you are using views or subqueries with the JOIN section in {{ datalens-short-name }}.

{% endnote %}



To create a {{ CH }} connection:

1. Go to the [workbook](../../workbooks-collections/index.md) page or create a new one.
1. In the top-right corner, click **Create** → **Connection**.
1. Select a **{{ CH }}** connection.
1. Specify the connection parameters for the external {{ CH }} database:

   {% include [datalens-db-connection-parameters](../../../_includes/datalens/datalens-db-connection-parameters.md) %}

1. (Optional) Test the connection. To do this, click **Check connection**.
1. Click **Create connection**.
1. Enter a name for the connection and click **Create**.


## Additional settings {#clickhouse-additional-settings}

You can specify additional connection settings in the **Advanced connection settings** section:

* **TLS**: If this option is enabled, the DB is accessed via `HTTPS`; if not, via `HTTP`.

* **CA Certificate**: To upload a certificate, click **Attach file** and select the certificate file. When the certificate is uploaded, the field shows the file name.

* {% include [datalens-db-connection-export-settings-item](../../../_includes/datalens/operations/datalens-db-connection-export-settings-item.md) %}

* **Readonly**: Select a permission for requests to read data, write data, and change parameters. This setting must not exceed the user's corresponding setting in {{ CH }}:

  * `0`: All requests are allowed.
  * `1`: Only read data requests are allowed.
  * `2`: Allows requests to read data and edit settings.

## Specifics of using a connection to {{ CH }} {#ch-connection-specify}

In {{ CH }}, you can create a dataset on top of a `VIEW` that contains the `JOIN` section. To do this, make sure a view is created with the `join_use_nulls` option enabled. We recommend setting `join_use_nulls = 1` in the `SETTINGS` section:

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

You should also enable this option for raw-sql subqueries that are used as a data source in your dataset.

To avoid errors when using views with the JOIN section in {{ datalens-short-name }}, re-create all views and set `join_use_nulls = 1`. This fills in empty cells with `NULL` values and converts the type of the relevant fields to [Nullable]({{ ch.docs }}/sql-reference/data-types/nullable/#data_type-nullable).

{% include [clickhouse-disclaimer](../../../_includes/clickhouse-disclaimer.md) %}

