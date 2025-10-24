


To create a {{ ytsaurus-name }} CHYT connection:

1. Go to the [workbook](../../../datalens/workbooks-collections/index.md) page or create a new one.
1. In the top-right corner, click **Create** → **Connection**.
1. Select the **{{ ytsaurus-name }} CHYT** connection.
1. Configure the connection as follows:

   * **Hostname**. Specify the {{ ytsaurus-name }} proxy server address.
   * **Port**. Specify the CHYT connection port.
   * **Clique alias**: Specify the alias of a running clique. By default, the `*ch_public` public clique is used.
   * **{{ ytsaurus-name }} token**: Manually set the OAuth token to use with {{ ytsaurus-name }}. For more information, see [this {{ ytsaurus-name }} article](https://ytsaurus.tech/docs/en/user-guide/storage/auth).
   * **Cache TTL in seconds**. Specify the cache time-to-live or leave the default value. The recommended value is 300 seconds (5 minutes).
   * **Raw SQL level**. Select the SQL query access level for the user.
   * **HTTPS**. Enable the secure connection option if your server supports HTTPS.

1. (Optional) Test the connection. To do this, click **Check connection**.
1. Click **Create connection**.
1. Enter a name for the connection and click **Create**.


## Additional settings {#additional-settings}

{% include [datalens-db-connection-export-settings](../../../_includes/datalens/operations/datalens-db-connection-export-settings.md) %}
