---
title: How to create an Oracle Database connection in {{ datalens-full-name }}
description: In this tutorial, you will learn how to connect to Oracle Database in {{ datalens-full-name }}.
---

# Creating an Oracle Database connection


To create an Oracle Database connection:

1. Select a workbook for the new connection and click **Create** → **Connection**.
1. Under **Databases**, selec the **Oracle Database** connection.
1. Configure the connection as follows:

   * **Hostname**. Specify the path to the master host or the IP address of the Oracle Database master host. You can specify multiple hosts in a comma-separated list. If you are unable to connect to the first host, {{ datalens-short-name }} will select the next one from the list.
   * **Port**. Specify the Oracle Database connection port. The default port is 1521.
   * **Path to database**. Specify the service name or the system ID of the database to connect and select the **Service name** or **SID** option, respectively.
   * **Username**. Specify the username for the Oracle Database connection.
   * **Password**. Enter the password for the specified user.
   * **Cache TTL in seconds**. Specify the cache time-to-live or leave the default value. The recommended value is 300 seconds (5 minutes).
   
   {% include [datalens-db-sql-level](../../../_includes/datalens/datalens-db-connection-sql-level.md) %}

   ![image](../../../_assets/datalens/operations/connection/connection-oracle.png)

1. (Optional) Test the connection. To do this, click **Check connection**.
1. Click **Create connection**.


1. Select a [workbook](../../workbooks-collections/index.md) to save your connection to or create a new one. If using legacy folder navigation, select a folder to save the connection to. Click **Create**.


1. Enter a name for the connection and click **Create**.

## Additional settings {#additional-settings}

You can specify additional connection settings in the **Advanced connection settings** section:

* **TLS**: Indicates whether TLS is required. When this option is enabled, the connection requires using SSL.
* **CA Certificate**: To upload a certificate, click **Attach file** and specify the certificate file. When the certificate is uploaded, the field shows the file name.
* {% include [datalens-db-connection-export-settings-item](../../../_includes/datalens/operations/datalens-db-connection-export-settings-item.md) %}
