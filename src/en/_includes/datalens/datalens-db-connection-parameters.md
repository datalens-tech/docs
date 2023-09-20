- **Hostname**. Specify the path to the master host or the ClickHouse master host IP address. You can specify multiple hosts in a comma-separated list. If you are unable to connect to the first host, DataLens will select the next one from the list.
- **HTTP interface port**. Specify the ClickHouse connection port. The default port is 8443.
- **Username**. Specify the username for the ClickHouse connection.

  {% include [datalens-db-note](datalens-db-note.md) %}

- **Password**. Enter the password for the user.
- **Cache TTL in seconds**. Specify the cache lifetime or leave the default value. The recommended value is 300 seconds (5 minutes).
- **Raw SQL level**. Enables you to use an ad-hoc SQL query to [generate a dataset](../../concepts/dataset/settings.md#sql-request-in-datatset).
- **HTTPS**. Enable the secure connection option if your server supports HTTPS.

