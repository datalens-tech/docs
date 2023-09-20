# Creating a QL chart


QL charts have the same [general settings](../../concepts/chart/settings.md#common-settings) and [section settings](../../concepts/chart/settings.md#section-settings) available as charts based on a dataset. Only some [measure settings](../../concepts/chart/settings.md#indicator-settings) are supported for chart fields.

To create a QL chart:

1. Go to an existing database connection.
1. Make sure **Raw SQL level** → **Allow subqueries in datasets and queries from charts** is enabled.
1. In the top-right corner, click **Create QL chart**.
1. Use the **Query** tab to enter a query in the flavor of SQL native to the database you are accessing.
1. In the bottom-left corner, click **Start**.

After the query runs, a visualization of your data will be displayed.

{% include [datalens-sql-ch-example](../../_includes/datalens/datalens-sql-ch-example.md) %}




## Adding selector parameters {#selector-parameters}

In [QL charts](../../concepts/chart/index.md#sql-charts), you can control selector parameters from the **Parameters** tab in the chart editing area and use the **Query** tab to specify a variable in the query itself in `not_var{{variable}}` format.

You cannot use parameters of the `date-interval` and the `datetime-interval` types in query code unless they have the `_from` and `_to` suffixes. For a parameter named `interval`, for instance, you need to specify:

* `interval_from` to get the start of the range.
* `interval_to` to get the end of the range.

To add a parameter:

1. Go to the **Parameters** tab when creating a chart.
1. Click **Add parameter**.
1. Set the value type to `date-interval` (`datetime-interval`).
1. Name the parameter.
1. Set the range start and end values.

{% cut "Sample query" %}

```sql
SELECT toDate(Date) as datedate, count ('Order ID')
FROM samples.SampleLite
WHERE not_var{{interval_from}} < datedate AND datedate < not_var{{interval_to}}
GROUP BY datedate
ORDER BY datedate
```

{% endcut %}