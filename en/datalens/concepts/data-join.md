---
title: "Joining {{ datalens-full-name }} data"
description: "When creating a dashboard in {{ datalens-full-name }}, a link is often used that determines how a selector affects one or more charts and other selectors. You can use links to filter the values of selectors and charts. This article describes how to join data from different datasets to set up links between widgets."
---

# Combining {{ datalens-full-name }} data

{{ datalens-full-name }} uses a [connection](connection.md) to retrieve data from a source. You can create datasets, charts, and selectors from the connection's data. If the source has multiple tables, you can join them to build the required set of data. You can link data from different datasets at the chart level or through selector links.

## Methods of combining data {#data-join}

You can use different methods to combine data:

* [{#T}](#dataset-join)

  * [{#T}](#ui-join)
  * [{#T}](#sql-join)

* [{#T}](#chart-join)


* [{#T}](#selector-join)

### At the dataset level {#dataset-join}

To join data at the dataset level, you can [add tables](#ui-join) to the workspace or write an [SQL query](#sql-join).

{% note warning %}

You can't join data from different sources at the level of a single dataset.

{% endnote %}

#### Adding tables {#ui-join}

You can combine data through the dataset creation interface by dragging tables to the workspace and configuring links between them via the [JOIN operator](dataset/data-model.md#source).

#### SQL query {#sql-join}

In a dataset, you can add an [ad-hoc SQL query](dataset/settings.md#sql-request-in-datatset) to the data source. When a data source is accessed, the query code is run as a subquery. You can use the output of the query as final dataset data or combine it with other source tables via the interface.

### At the chart level {#chart-join}


To combine data at the chart level, you can use a [QL chart](#sql-chart).



### At the selector link level {#selector-join}

You can add a selector to a dashboard to modify query output in its associated widgets:

* On the dashboard, selectors and charts built from a single dataset link automatically.
* Selectors and charts built from different datasets can be linked manually using aliases.

Before creating a link, make sure that the field used by the selector as a filter is included in the dataset the chart is built from. Otherwise, the link will not work. For more information, see the instructions [{#T}](../operations/dashboard/create-alias.md).


