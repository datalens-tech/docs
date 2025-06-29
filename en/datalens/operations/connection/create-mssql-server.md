---
title: How to create a {{ MS }} connection in {{ datalens-full-name }}
description: In this tutorial, you will learn how to connect to {{ MS }} in {{ datalens-full-name }}.
---

# Creating a {{ MS }} connection


To create a {{ MS }} connection:


1. Go to the [workbook](../../workbooks-collections/index.md) page or create a new one.
1. In the top-right corner, click **Create** → **Connection**.
1. Select **MS SQL Server** as the connection type.
1. Specify the connection parameters for the external **MS SQL Server** database:


   * **Hostname**. Specify the path to a master host or a {{ MS }} master host IP address. You can specify multiple hosts in a comma-separated list. If you are unable to connect to the first host, {{ datalens-short-name }} will select the next one from the list.
   * **Port**. Specify the {{ MS }} connection port. The default port is 1433.
   * **Path to database**. Specify the name of the database to connect to.
   * **Username**. Specify the username for the {{ MS }} connection.
   * **Password**. Enter the password for the specified user.
   * **Cache TTL in seconds**. Specify the cache time-to-live or leave the default value. The recommended value is 300 seconds (5 minutes).
   * **Raw SQL level**. Enables you to use an ad-hoc SQL query to [generate a dataset](../../dataset/settings.md#sql-request-in-datatset).

   ![image](../../../_assets/datalens/operations/connection/connection-mssql.png)

1. (Optional) Test the connection. To do this, click **Check connection**.
1. Click **Create connection**.


1. Select a [workbook](../../workbooks-collections/index.md) to save your connection to or create a new one. If using legacy folder navigation, select a folder to save the connection to. Click **Create**.


1. Enter a name for the connection and click **Create**.

## Additional settings {#additional-settings}

{% include [datalens-db-connection-export-settings](../../../_includes/datalens/operations/datalens-db-connection-export-settings.md) %}
