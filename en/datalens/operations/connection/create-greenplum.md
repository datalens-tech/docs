---
title: "How to create a {{ GP }} connection in {{ datalens-full-name }}"
description: "In this tutorial, you will learn how to connect to {{ GP }} in {{ datalens-full-name }}."
---

# Creating a {{ GP }} connection



To create a {{ GP }} connection:

1. Go to the [workbook](../../workbooks-collections/index.md) page or create a new one.
1. In the top-right corner, click **Create** → **Connection**.
1. Select a **{{ GP }}** connection.
1. Specify the connection parameters for the external {{ GP }} database:

   * **Hostname**: Specify the path to the {{ GP }} host. You can specify multiple hosts in a comma-separated list. If you are unable to connect to the first host, {{ datalens-short-name }} will select the next one from the list.
   * **Port**: Specify the {{ GP }} connection port. The default port is 5432.
   * **Path to database**: Specify the name of the database to connect to.
   * **Username**: Specify the username for the {{ GP }} connection.
   * **Password**: Enter the password for the user.
   * **Cache TTL in seconds**: Specify the cache time-to-live or keep the default value. The recommended value is 300 seconds (5 minutes).
   * **Raw SQL level**: Enables you to use an ad-hoc SQL query to [generate a dataset](../../concepts/dataset/settings.md#sql-request-in-datatset).

1. (Optional) Make sure the connection works properly. To do this, click **Check connection**.
1. Click **Create connection**.
1. Enter a name for the connection and click **Create**.


## Additional settings {#additional-settings}

{% include [datalens-db-connection-export-settings](../../../_includes/datalens/operations/datalens-db-connection-export-settings.md) %}
