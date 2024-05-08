# QL charts: Overview


To create such charts, one uses direct queries to the source. The query is run using the source database's SQL dialect, which helps expand visualization capabilities by using database-specific transactions.


Running a query does not create a separate [dataset](../dataset/index.md) object: a chart is generated on the fly and displayed in the preview panel.

Unlike [dataset-based charts](dataset-based-charts.md), the logic of a visualization area in QL charts favors queries against the source, i.e., the visualization area only displays the data from the query.


QL charts:

* Reduce database workload by using direct queries.
* Are only suitable for `SELECT` queries.
* Enable the use of `JOIN`, `GROUP BY`, and `SORT BY` queries and aggregate functions in SQL queries.
* Enable the parameterization of any part of a SQL query.
* Support a limited set of [visualizations types](../../visualization-ref/index.md).


To create a QL chart, follow [this guide](../../operations/chart/create-sql-chart.md).

#### See also {#see-also}

* [{#T}](../../operations/chart/create-sql-chart.md)
* [{#T}](../../concepts/chart/index.md)
* [{#T}](../../operations/chart/create-chart.md)

{% include [clickhouse-disclaimer](../../../_includes/clickhouse-disclaimer.md) %}