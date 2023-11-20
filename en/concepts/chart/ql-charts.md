# QL charts. overview


To create such charts, direct queries to the source are used. The query can be run in the source database's SQL dialect. This helps you to expand visualization capabilities by using language-specific transactions.


Running a query does not create a separate [Dataset](../dataset/index.md) object: a chart is generated on the fly and displayed in the preview panel.

Unlike [dataset-based charts](#dataset-based-charts), the logic of a visualization area in QL charts favors queries against the source, that is, the visualization area only displays the data queried.


QL chart specifics:

  * Reduce database workload by using direct queries.
  * Are only suitable for `SELECT` queries.
  * Enable the use of `JOIN`, `GROUP BY`, and `SORT BY` queries and aggregate functions in SQL queries.
  * Enable the parameterization of any part of a SQL query.
  * Support a limited set of [visualizations types](../../visualization-ref/index.md).


To create a QL chart, see the [instructions](../../operations/chart/create-sql-chart.md).

#### See also {#see-also}

* [{#T}](../../operations/chart/create-sql-chart.md)
* [{#T}](../../concepts/chart/index.md)
* [{#T}](../../operations/chart/create-chart.md)
