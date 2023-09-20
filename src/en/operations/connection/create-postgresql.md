---
title: "Instructions for creating a PostgreSQL connection in DataLens"
description: "In this tutorial, you will learn how to connect to PostgreSQL in DataLens."

---

# Creating a PostgreSQL connection



To create a PostgreSQL connection:

1. Go to the workbook page.
1. In the top-right corner, click **Create** → **Connection**.
1. Select **PostgreSQL** as the connection type.
1. Specify the connection parameters for the external PostgreSQL database:

   {% include [datalens-db-connection-parameters-postgresql](../../_includes/datalens/datalens-db-connection-parameters-postgresql.md) %}

1. Click **Create connection**.

1. Enter the name and click **Create**.

{% include [datalens-check-host](../../_includes/datalens/operations/datalens-check-host.md) %}


## Additional settings {#postgresql-additional-settings}

You can specify additional connection settings in the **Advanced connection settings** section:

* **Setting collate in a query**: To explicitly define a collation for DB queries, select a mode:

   * **Auto**: The default setting is used, DataLens decides whether to enable the `en_US` locale.
   * **On**: The DataLens setting is used, the `en_US` locale is specified for individual expressions in a query. This makes the server use the appropriate sorting logic, regardless of the server settings and specific tables. Use the DataLens setting if the DB locale is incompatible with DataLens performance. 
   * **Off**: The default setting is used, DataLens only uses the existing parameters of the DB locale.

* **TLS**: Indicates that TLS should be used. If the option is enabled, the `sslmode` parameter value is `required`; if disabled, the parameter value is `prefer`.
* **CA Certificate**: To upload a certificate , click **Attach file** and specify the certificate file. When the certificate is uploaded, the field shows the file name.
