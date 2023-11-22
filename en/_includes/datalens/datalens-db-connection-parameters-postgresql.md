* **Hostname**: Specify the path to a master host or a PostgreSQL master host IP address. You can specify multiple hosts in a comma-separated list. If you are unable to connect to the first host, DataLens will select the next one from the list.
* **Port**: Specify the PostgreSQL connection port. In DataLens, the default port is 6432.
* **Path to database**: Specify the name of the database to connect to.
* **Username**: Specify the username for the PostgreSQL connection.
* **Password**: Enter the password for the user.
* **Cache TTL in seconds**: Specify the cache time-to-live or leave the default value. The recommended value is 300 seconds (5 minutes).
* **Raw SQL level**: Enables you to use an ad-hoc SQL query to [generate a dataset](../../concepts/dataset/settings.md#sql-request-in-datatset).