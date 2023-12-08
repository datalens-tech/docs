# Creating a QL chart


QL charts have the same [general settings](../../concepts/chart/settings.md#common-settings) and [section settings](../../concepts/chart/settings.md#section-settings) available as charts based on a dataset. Only certain [measure settings](../../concepts/chart/settings.md#indicator-settings) are supported for chart fields.

To create a QL chart:

1. Go to an existing database connection.
1. Make sure **SQL query access level** → **Allow subqueries in datasets and queries from charts** is enabled.
1. In the top-right corner, click **Create QL chart**.
1. Use the **Query** tab to enter a query in the flavor of SQL native to the database you are accessing.
1. In the bottom-left corner, click **Start**.

After the query runs, a visualization of your data will be displayed.

{% include [datalens-sql-ch-example](../../../_includes/datalens/datalens-sql-ch-example.md) %}




## Adding selector parameters {#selector-parameters}

In [QL charts](../../concepts/chart/index.md#sql-charts), you can control selector parameters from the **Parameters** tab in the chart editing area and use the **Query** tab to specify a variable in the query itself in `not_var{{variable}}` format.

To add a parameter:

1. Go to the **Parameters** tab when creating a chart.
1. Click **Add parameter**.
1. Set the value type for the parameter, e.g., `date-interval`.
1. Name the parameter, e.g., `interval`.
1. Reset the default values, e.g., `2017-01-01 — 2019-12-31`.

   ![image](../../../_assets/datalens/parameters/date-interval.png =450x167)

### Intervals {#params-interval}

You can use the `date-interval` and the `datetime-interval` type parameters in query code only with the `_from` and `_to` postfixes. For example, for the `interval` parameter set to `2017-01-01 — 2019-12-31`, specify:

* `interval_from` to get the start of the range (`2017-01-01`).
* `interval_to` to get the end of the range (`2019-12-31`).

{% cut "Sample query" %}

```sql
SELECT toDate(Date) as datedate, count ('Order ID')
FROM samples.SampleLite
WHERE not_var{{interval_from}} < datedate AND datedate < not_var{{interval_to}}
GROUP BY datedate
ORDER BY datedate
```

{% endcut %}

### Substituting parameter values in a QL chart query {#params-in-select}

Parameter values from a selector arrive to a QL chart as a:

* Single value if one element is selected.
* [Tuple](https://docs.python.org/3/library/stdtypes.html#tuples) if multiple values are selected.

If the query has the `IN` operator specified before a parameter, the substituted value is always converted into a tuple. A query like this will run correctly if you select one or more values.

{% cut "Sample query with the `IN` operator" %}

```sql
SELECT sum (Sales) as Sales, Category
FROM samples.SampleLite
WHERE Category in not_var{{category}}
GROUP BY Category
ORDER BY Category
```

{% endcut %}

If the query has `=` before a parameter, the query will only run correctly if a single value is selected.

{% cut "Sample query with the `=` operator" %}

```sql
SELECT sum (Sales) as Sales, Category
FROM samples.SampleLite
WHERE Category = not_var{{category}}
GROUP BY Category
ORDER BY Category
```

{% endcut %}

### Null choice in selector and parameters {#empty-selector}

If a selector has no value selected and no default value is set for a parameter, a null value is provided to a query. In this case, all values will be selected in [dataset-based charts](../../concepts/chart/dataset-based-charts.md), and the filter for the relevant column will disappear when generating a query.

To enable a similar behavior in QL charts, you can use a statement like this in your query:

```sql
AND
CASE
    WHEN LENGTH(not_var{{param}}::VARCHAR)=0 THEN TRUE
    ELSE column IN not_var{{param}}
END
```
