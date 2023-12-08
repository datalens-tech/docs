---
title: "Instructions for creating a {{ PG }} connection in {{ datalens-full-name }}"
description: "In this tutorial, you will learn how to connect to {{ PG }} in {{ datalens-full-name }}."
---

# Creating a {{ PG }} connection



To create a {{ PG }} connection:

1. Go to the workbook page.
1. In the top-right corner, click **Create** → **Connection**.
1. Select a **{{ PG }}** connection.
1. Specify the connection parameters for the external {{ PG }} database:

   {% include [datalens-db-connection-parameters-postgresql](../../../_includes/datalens/datalens-db-connection-parameters-postgresql.md) %}

1. Click **Create connection**.
1. Enter a name for the connection and click **Create**.

{% include [datalens-check-host](../../../_includes/datalens/operations/datalens-check-host.md) %}


## Additional settings {#postgresql-additional-settings}

You can specify additional connection settings in the **Advanced connection settings** section:

* **Setting collate in a query**: To explicitly define a collation for DB queries, select a mode:

   * **Auto**: The default setting is used, {{ datalens-short-name }} decides whether to enable the `en_US` locale.
   * **On**: The {{ datalens-short-name }} setting is used, the `en_US` locale is specified for individual expressions in a query. This makes the server use the appropriate sorting logic, regardless of the server settings and specific tables. Use the {{ datalens-short-name }} setting if the DB locale is incompatible with {{ datalens-short-name }} performance.
   * **Off**: The default setting is used, {{ datalens-short-name }} only uses the existing parameters of the DB locale.

* **TLS**: Indicates that TLS should be used. If the option is enabled, the `sslmode` parameter value is `required`; if disabled, the parameter value is `prefer`.
* **CA Certificate**: To upload a certificate , click **Attach file** and specify the certificate file. When the certificate is uploaded, the field shows the file name.
* {% include [datalens-db-connection-export-settings-item](../../../_includes/datalens/operations/datalens-db-connection-export-settings-item.md) %}
