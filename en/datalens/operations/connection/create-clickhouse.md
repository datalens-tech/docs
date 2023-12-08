---
title: "How to create a {{ CH }} connection"
description: "This guide describes how you can create a {{ CH }} connection."
---

# Creating a {{ CH }} connection

{% note info %}

All data requests are executed with the [join_use_nulls]({{ ch.docs }}/operations/settings/settings/#join_use_nulls) flag enabled. See the [{#T}](#ch-connection-specify) section if you use views or subqueries with a JOIN in {{ datalens-short-name }}.

{% endnote %}



To create a {{ CH }} connection:

1. Go to the workbook page.
1. In the top-right corner, click **Create** → **Connection**.
1. Select a **{{ CH }}** connection.
1. Specify the connection parameters for the external {{ CH }} database:

   {% include [datalens-db-connection-parameters](../../../_includes/datalens/datalens-db-connection-parameters.md) %}

1. Click **Create connection**.
1. Enter a name for the connection and click **Create**.

{% include [datalens-check-host](../../../_includes/datalens/operations/datalens-check-host.md) %}


## Additional settings {#clickhouse-additional-settings}

You can specify additional connection settings in the **Advanced connection settings** section:

* **TLS**: If this option is enabled, the DB is accessed via `HTTPS`; if not, via `HTTP`.

* **CA Certificate**: To upload a certificate , click **Attach file** and specify the certificate file. When the certificate is uploaded, the field shows the file name.

* {% include [datalens-db-connection-export-settings-item](../../../_includes/datalens/operations/datalens-db-connection-export-settings-item.md) %}

## Specifics for {{ CH }} connections {#ch-connection-specify}

In {{ CH }}, you can create a dataset on top of a `VIEW` that contains a `JOIN`. To do this, make sure a view is created with the `join_use_nulls` option enabled. We recommend that you set `join_use_nulls = 1` in the `SETTINGS` section:

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

To avoid errors when using views with a JOIN in {{ datalens-short-name }}, re-create all views and set `join_use_nulls = 1`. This fills in empty cells with `NULL` values and converts the type of the corresponding fields to [Nullable]({{ ch.docs }}/sql-reference/data-types/nullable/#data_type-nullable).
