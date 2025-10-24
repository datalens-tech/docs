---
title: How to create a {{ ydb-name }} connection
description: Follow this guide to create a connection to {{ ydb-name }}.
---

# Creating a {{ ydb-short-name }} connection

{% note info %}


To write subqueries in datasets and queries in QL charts, use [YQL syntax]({{ ydb.docs }}/yql/reference/syntax/).

{% endnote %}

To create a {{ ydb-short-name }} connection:



1. Go to the [workbook](../../workbooks-collections/index.md) page or create a new one.
1. In the top-right corner, click **Create** → **Connection**.
1. Select a **{{ ydb-short-name }}** connection.
1. Select the authentication type:

   {% list tabs group=auth-type %}

   - Anonymous {#anonymous}

     * **Hostname**. Specify the path to the {{ ydb-short-name }} host.
     * **Port**. Specify the {{ ydb-short-name }} connection port. The default port is 2135.
     * **Path to database**. Specify the name of the database to connect to.

   - Password {#password}

     * **Hostname**. Specify the path to the {{ ydb-short-name }} host.
     * **Port**. Specify the {{ ydb-short-name }} connection port. The default port is 2135.
     * **Path to database**. Specify the name of the database to connect to.
     * **Username**. Specify the username for the {{ ydb-short-name }} connection.
     * **Password**. Enter the password for the user.

   - OAuth {#oauth}

     * **OAuth token**. Specify an OAuth token to use with {{ ydb-short-name }}.
     * **Hostname**. Specify the path to the {{ ydb-short-name }} host.
     * **Port**. Specify the {{ ydb-short-name }} connection port. The default port is 2135.
     * **Path to database**. Specify the name of the database to connect to.

   {% endlist %}

   * **Cache TTL in seconds**. Specify the cache time-to-live or leave the default value. The recommended value is 300 seconds (5 minutes).
   * **Raw SQL level**. Enables you to use an ad-hoc SQL query to [generate a dataset](../../dataset/settings.md#sql-request-in-datatset).

1. Click **Create connection**.
1. Enter a name for the connection and click **Create**.


## Additional settings {#additional-settings}

You can specify additional connection settings in the **Advanced connection settings** section:

* **TLS**: Indicates whether TLS is required. When this option is enabled, the connection requires using SSL.
* **CA Certificate**: To upload a certificate, click **Attach file** and specify the certificate file. When the certificate is uploaded, the field shows the file name.


{% cut "RESOURCE_EXHAUSTED error" %}

If the {{ ydb-name }} quotas and limits are exceeded, you may get the `RESOURCE_EXHAUSTED` error message. To avoid the error, follow these recommendations:

* Reduce the query rate. To achieve this, you can use filters or specify only the required chart fields to limit the amount of data you get.
* Follow the recommendations for [query optimization](../../concepts/optimization_recommendations.md).
* Use the {{ datalens-short-name }} [chart inspector](../../concepts/chart/inspector.md) to assess the data amount and upload time.
* Refer to the {{ ydb-name }} monitoring charts to see of the quotas and limits are exceeded. If you need to, you may slightly increase the request unit (RU) limit under **{{ ui-key.yacloud.ydb.overview.label_serverless-limits }}**.

{% endcut %}
