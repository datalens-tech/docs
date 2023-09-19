---
__system: {"dislikeVariants":["There's no answer to my question","Recommendations aren't helpful","Content does not match the title","Other"]}
---
# Memory limit has been exceeded during query execution

`ERR.DS_API.DB.MEMORY_LIMIT_EXCEEDED`

There is not enough memory in the data source to run the query.

The error occurs when the database does not have enough memory to run a query from DataLens.



To correct the error, optimize the source table or reduce the amount of data in the query using chart filters.

To optimize tables, contact your database administrator.

If you are going to perform optimization yourself, try enhancing your database with indexes and sorts.

{% note tip %}

If ClickHouse is your data source, find queries from DataLens in [system.query_log](https://clickhouse.com/docs/en/operations/system-tables/query_log/).

If PostgreSQL MBD is your data source, review the performance analysis.

{% endnote %}

