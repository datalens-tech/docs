---
__system: {"dislikeVariants":["There's no answer to my question","Recommendations aren't helpful","Content does not match the title","Other"]}
---
# Creating a ClickHouse connection

{% note info %}

All data requests are executed with the [join_use_nulls](https://clickhouse.com/docs/en/operations/settings/settings/#join_use_nulls) flag enabled. See the [{#T}](#ch-connection-specify) section if you use views or subqueries with a JOIN in DataLens.

{% endnote %}



To create a ClickHouse connection:

1. Go to the workbook page.
1. In the top-right corner, click **Create**→ **Connection**.
1. Select a **ClickHouse** connection.
1. Specify the connection parameters:

   {% include [datalens-db-connection-parameters](../../../_includes/datalens/datalens-db-connection-parameters.md) %}

1. Click **Create connection**.
1. Enter the name for the connection and click **Create**.

{% include [datalens-check-host](../../../_includes/datalens/operations/datalens-check-host.md) %}


## Additional settings {#clickhouse-additional-settings}

You can specify additional connection settings in the **Advanced connection settings** section:

* **TLS**: If this option is enabled, the DB is accessed via `HTTPS`; if not, via `HTTP`.

* **CA Certificate**: To upload a certificate , click **Attach file** and specify the certificate file. When the certificate is uploaded, the field shows the file name.

##  specifics for ClickHouse connections {#ch-connection-specify}

In ClickHouse, you can create a dataset on top of a `VIEW` that contains a `JOIN`. To do this, make sure a view is created with the `join_use_nulls` option enabled. We recommend that you set `join_use_nulls = 1` in the `SETTINGS` section:

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

To avoid errors when using views with a JOIN in DataLens, re-create all views and set `join_use_nulls = 1`. This fills in empty cells with `NULL` values and converts the type of the corresponding fields to [Nullable](https://clickhouse.com/docs/en/sql-reference/data-types/nullable/#data_type-nullable).
