---
title: Data model in {{ datalens-full-name }}
description: This article describes the data model used in {{ datalens-full-name }}. One or more tables are used as the data source. If multiple tables are available in the data source, you can merge them using the JOIN operator. When the tables are joined, a link is created between them. When you create a link, you specify the fields from the source table and merged table.
---

# Data model in {{ datalens-name }}

Data in a dataset is represented as fields.

## {#source} data source

One or more tables are used as the data source.

{% note info %}

There is a limit on displaying the first 1,000 tables from a source in a dataset. If the required tables are not on the list, currently, you can only add them manually using an SQL query.

{% endnote %}

If there are multiple tables in the source, you can join them with a [JOIN](https://en.wikipedia.org/wiki/Join_(SQL)) operator.
When the tables are [joined](../concepts/data-join.md), a link is created between them. When you create a link, you specify the fields from the source table and merged table.

Tables are linked automatically by the first match in the field name and field data type.

In this case, you can:

* Edit fields in the link.
* Add new links or delete existing links.
* Change the type of the `JOIN` operator in the link (`INNER`, `LEFT`, `RIGHT`, or `FULL`).
* Manage link optimization.

`JOIN` is used if a query made from a chart uses fields from two or more dataset tables.

`JOIN` is not used if:

* The dataset contains one table.
* The dataset contains multiple tables; however, the query uses fields from only one of those tables (with link optimization enabled).

To manage the link behavior when [joining data from multiple tables](./create-dataset.md#links), use the **Optimize link** option in the link settings. The option is enabled by default for all links in the dataset: the `JOIN` operator is applied if a query uses fields from two or more linked tables. You can disable the option for each individual link to make such a link a required one. In which case the `JOIN` operation will be performed even if fields from a single table are selected.

{% note info %}

If you disable optimization, it may take more time to run a query.

{% endnote %}


## Data fields {#field}

The fields define the structure and format of the dataset. The following types of fields are available:

* **Dimension**. Contains values that define data parameters, such as a city, date of purchase, or product category. The aggregation function is not applied to fields with a dimension; otherwise, the field becomes a measure. In the interface, dimensions are displayed in green.
* **Measure**. Contains numeric values the aggregation functions (information) apply to, such as the amount of clicks and the number of click-throughs. If you remove the aggregation function from this field, it will become a dimension. In the interface, measures are displayed in blue.

In the dataset creation interface and wizard, you can duplicate fields, create fields, and use [aggregation functions](#aggregation).

{% note warning %}

The maximum number of fields in a single dataset is 1,200.

{% endnote %}

{{ datalens-short-name }} allows you to create calculable fields using formulas. To write formulas, you can use existing dataset fields, constants, and functions. For a full list of functions, see the [Function reference](../function-ref/all.md).

For more information about calculable fields, see [{#T}](../concepts/calculations/index.md).

## Aggregating data {#aggregation}

The following aggregation functions are available for fields with different data types:

Function | Description | Supported types
----- | ----- | -----
No | Without aggregation | All types
Average | Arithmetic mean value | `Fractional number`<br/>`Integer`
Amount | Number of records| `String`<br/>`Date`<br/>`Date and time`<br/>`Fractional number`<br/>`Integer`
Number of unique | Number of unique records | `String`<br/>`Date`<br/>`Date and time`<br/>`Fractional number`<br/>`Integer`
Maximum | Maximum value | `Date`<br/>`Date and time`<br/>`Fractional number`<br/>`Integer`
Minimum | Minimum value | `Date`<br/>`Date and time`<br/>`Fractional number`<br/>`Integer`
Amount | Sum of values | `Fractional number`<br/>`Integer`

Additional aggregation functions are available in [calculated fields](../concepts/calculations/index.md).

{% note info %}

For some sources, aggregation functions are unavailable.
The sources you can use aggregation functions for are listed under **Data source support** on the aggregation function page in the [reference](../function-ref/aggregation-functions.md).

{% endnote %}

To learn more about data types, see [{#T}](./data-types.md).

#### See also {#see-also}

* [{#T}](./create-dataset.md)
