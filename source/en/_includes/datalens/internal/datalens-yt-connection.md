To create a CHYT connection:


1. Go to the [connections page](https://datalens.yandex.ru/connections).
1. Click **Create connection**.
1. Select **CHYT** as the connection type.


1. Specify the connection parameters:

   * **YTsaurus token**: Manually set the OAuth token to use with YTsaurus. For more information, see the [YTsaurus documentation](https://ytsaurus.tech/docs/en/user-guide/storage/auth).
   * **Hostname**: Specify the YTsaurus proxy server address.
   * **Port**: Specify the CHYT connection port.
   * **Clique**: Specify the alias of a running clique. By default, the `*ch_public` public clique is used.
   * **Cache TTL in seconds**: Specify the cache time-to-live or leave the default value. The recommended value is 300 seconds (5 minutes).
   * **Raw SQL level**: Select the SQL query access level for the user.


1. Click **Create connection**.
1. Enter a name for the connection and click **Create**.

{% include [datalens-check-host](../../../_includes/datalens/operations/datalens-check-host.md) %}