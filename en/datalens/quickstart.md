---
title: Getting started with {{ datalens-full-name }}
description: In this tutorial, you will connect to a data source, create your first dataset, build multiple charts for data visualization, and place them on a dashboard.
---

# Getting started with {{ datalens-short-name }}


This section outlines how to connect to a data source, create your first [dataset](dataset/index.md), build multiple [charts](concepts/chart/index.md) for data visualization, and place them on a [dashboard](concepts/dashboard.md).

To get started with {{ datalens-short-name }}, follow [this deployment guide](./concepts/create-instance.md).





## Create a workbook {#create-workbook}

In {{ datalens-short-name }}, all objects are stored in special containers, i.e., [workbooks and collections](./workbooks-collections/index.md):

* A **workbook** stores [connections](./concepts/connection.md), [datasets](./dataset/index.md), [charts](./concepts/chart/index.md), and [dashboards](./concepts/dashboard.md).
* A **collection** is a container used for grouping workbooks and other collections.

To create a workbook:

1. Go to the {{ datalens-short-name }} page.
1. In the top-right corner, click **Create** → **Create workbook**.
1. Enter a name for the workbook: `Quick start`.
1. Click **Create**.


## Create a connection {#create-connection}

[Connections](./concepts/connection.md) contain information about data source access parameters, such as the DB host IP address and port. You can create datasets based on connections.

To create a connection:




1. In the top-right corner of the workbook, click **Create** → ![image](../_assets/console-icons/thunderbolt.svg) **Connection**.
1. Select a **{{ CH }}** connection.

   1. In the window that opens, specify the connection parameters:

      * Host name: `rc1a-ckg8nrosr2lim5iz.{{ dns-zone }}`.
      * HTTP interface port: `8443` (default).
      * Username: `samples_ro`.
      * Password: `MsgfcjEhJk`.

   1. Enable **Allow subqueries in datasets and queries from charts**.
   1. Click **Check connection** and make sure you get a green check mark.
   1. Click **Create connection**.

      ![create-connection](../_assets/datalens/quickstart/create-sample-connection-os.png)

   1. Enter the connection name:`Sample ClickHouse`.
   1. Click **Create**.


Wait for the connection to be saved.

## Create a dataset {#create-dataset}

A [dataset](./dataset/index.md) describes a set of data and its structure. It is created by connecting to a data source. A dataset is used when creating the following widgets:

* [Charts](./concepts/chart/index.md): To visualize data.
* [Selectors](./dashboard/selector.md): To filter data.

To create a dataset based on the `Sample ClickHouse` connection:

1. In the top-right corner of the connection page, click **Create dataset**.


1. Drag the `MS_SalesMiniTable` table to the workspace.

   ![drag-table](../_assets/datalens/quickstart/drag-table-os.png)

1. Navigate to the **Fields** tab.



1. Create a measure for the order amount. To do this, select **Sum** for the `Sales` field in the **Aggregation** column.

   ![dataset-sales-sum](../_assets/datalens/quickstart/dataset-sales-sum-os.png)

1. Create a measure for the number of orders:

   1. Rename the `OrderID` field as `OrderCount`: click the field name, delete the current name, and enter the new one.
   1. Select **Number of unique** for the `OrderCount` field in the **Aggregation** column.

1. Change the data type for the `ShopAddressCoord` field: select **Geopoint** in the **Type** column.

   ![dataset-sales-geotype](../_assets/datalens/quickstart/dataset-sales-geotype-os.png)

1. Save the dataset:

   1. In the top-right corner, click **Save**.
   1. Enter `Sales Dataset` for the dataset name and click **Create**.

      ![create-dataset](../_assets/datalens/quickstart/create-dataset-os.png)

## Create a column chart {#create-column-chart}

[Charts](./concepts/chart/index.md) visualize the data from a dataset as tables, diagrams, or maps.

To create a chart based on `Sales Dataset`:

1. Click **Create chart** in the top-right corner of the dataset page.
1. Add the product subcategory to the chart. To do this, drag the `ProductSubcategory` field from **Dimensions** to the **X** section.
1. Add a sales measure to the chart. To do this, drag the `Sales` field from **Measures** to the **Y** section.
1. Sort the chart by sales in descending order by dragging the `Sales` field from **Measures** to the **Sorting** section.
1. Save the chart:

   1. In the top-right corner, click **Save**.
   1. In the window that opens, enter the `Sales by subcategory` name for the chart and click **Save**.

      ![create-chart-1](../_assets/datalens/quickstart/create-column-chart-os.png)

## Create an area chart {#create-area-chart}

1. Copy the chart you created in the previous step:

   1. In the top-right corner, click ![save-button](../_assets/console-icons/chevron-down.svg) → **Save as copy**.

      ![chart-save-as](../_assets/datalens/quickstart/chart-save-as-os.png)

   1. In the window that opens, enter the `Sales by week` name for the new chart and click **Save**.

1. Select **Area chart** as the visualization type.

   ![type-chart-select](../_assets/datalens/quickstart/type-chart-select-os.png)

1. Replace the product subcategories with the order date on the X-axis. To do this, drag the `OrderDate` field from **Dimensions** to the **X** section and hold it over the `ProductSubcategory` field until the latter turns red.
1. Add the product category to the chart. To do this, drag the `ProductCategory` field from **Dimensions** to the **Colors** section.
1. Display a week by week chart:

   1. Click the calendar icon next to the `OrderDate` field in the **X** section.
   1. In the **Grouping** field, select **Rounding** → **Week**.

      ![chart-week-grouping](../_assets/datalens/quickstart/chart-week-grouping-os.png)

   1. Click **Apply**.

1. Remove sorting by sales: click ![save-button](../_assets/console-icons/xmark.svg) (the icon appears when you hover over the field) next to the `Sales` field in the **Sorting** section.
1. In the top-right corner, click **Save**.

   ![create-chart-2](../_assets/datalens/quickstart/create-area-chart-os.png)



## Create a pie chart {#create-pie-chart}

1. Copy the chart you created in the previous step:

   1. In the top-right corner, click ![save-button](../_assets/console-icons/chevron-down.svg) → **Save as copy**.
   1. In the window that opens, enter the `Sales by category` name for the new chart and click **Save**.

1. Select **Pie chart** as the visualization type.
1. Add the product category to the chart. To do this, drag the `ProductCategory` field from **Dimensions** to the **Color** section.
1. Check that the chart includes the sales measure: the `Sales` field should be located in the **Measures** section. If it is not there, drag it from under **Measures**.
1. Add a measure label:

   1. Drag the `Sales` field from **Measures** to the **Labels** section.
   1. Click the icon to the left of the measure name.
   1. In the window that opens, for **Label value**, select `Percentage` and click **Apply**.

      ![value-as-percentage](../_assets/datalens/quickstart/value-as-percentage-os.png)

1. In the top-right corner, click **Save**.

   ![create-chart-3](../_assets/datalens/quickstart/create-pie-chart-os.png)


## Create a dashboard and add charts to it {#create-dashboard}

A [dashboard](./concepts/dashboard.md) is a page or multiple pages that contain widgets. It allows you to group your charts in the same place and add [captions](./dashboard/widget.md#text) and [titles](./dashboard/widget.md#title) to them.

To create a dashboard:


1. Go to the `Quick start` workbook by clicking its name in the chart path.

   ![chart-settings](../_assets/datalens/quickstart/bread-crumbs-os.png)

1. In the top-right corner, click **Create** → ![image](../_assets/console-icons/layout-cells-large.svg) **Dashboard**.



1. In the panel at the bottom of the page, hold down ![image](../_assets/console-icons/chart-column.svg) **Chart** and drag it to the required area.
1. In the window that opens, click **Select**.
1. Select the `Sales by subcategory` chart.

   ![chart-settings](../_assets/datalens/quickstart/chart-settings-os.png)

1. Click **Add**.
1. Repeat steps 3 through 6 to add the `Sales by week` and `Sales by subcategory` charts.
1. Adjust the size of the charts with your mouse and place them on the dashboard as you prefer.

   ![chart-settings](../_assets/datalens/quickstart/add-charts-os.png)

## Set up chart filtering {#add-chart-chart-filtration}



Add [filtering](./dashboard/chart-chart-filtration.md) by the `Sales by subcategory` chart to the dashboard to filter other charts:

1. Click ![image](../_assets/console-icons/gear.svg) in the top-right corner of the `Sales by subcategory` chart.

   ![chart-settings](../_assets/datalens/quickstart/chart-dash-settings-os.png)

1. Enable the **Filtering** option.

   ![chart-filtration-option](../_assets/datalens/quickstart/chart-filtration-option-os.png)

1. Click **Save**.


By default, the chart used for filtering filters data in all charts on the current dashboard tab that share the same dataset.

## Add a selector to the dashboard {#add-selectors}

[Selectors](./dashboard/selector.md) are filters that affect the results of queries in the linked widgets.

To add a selector to a dashboard:

1. In the panel at the bottom of the page, hold down ![image](../_assets/console-icons/sliders.svg) **Selector** and drag it to the required area.
1. Add the calendar selector for the order date:

   1. Select `Sales Dataset`.
   1. Select the `OrderDate` field.
   1. In the **Header** field, enter `Order date`.
   1. Enable **Range**.

      ![selector-settings](../_assets/datalens/quickstart/selector-settings-os.png)

   1. Click **Save**.

1. Position the selector on the dashboard wherever you like.
1. Save the dashboard:

   1. In the top-right corner of the dashboard, click **Save**.
   1. Enter `Sales` for the dashboard name and click **Create**.

      ![add-selectors](../_assets/datalens/quickstart/dashboard-saved-os.png)

## Learn how a dashboard works {#dashboard-work}



1. Apply cross-chart filtering on the dashboard:

   1. In the `Sales by subcategory` chart, click the column with the `Kitchen appliances` value. This will filter the linked charts by the selected dimension.

      ![chart-chart-filtration](../_assets/datalens/quickstart/chart-chart-filtration-os.png)

   1. Clear chart filtering by clicking the selected item once more or ![image](../_assets/datalens/clear-filters.svg) in the top-right corner of the chart.

1. Use the `Order date` selector:

   1. In the `Order date` selector, enter the period start and end dates: `01.01.2019 - 31.01.2019`.
   1. This will filter data by the `OrderDate` field in all charts on the current tab that share the same dataset.

      ![selector-filtration](../_assets/datalens/quickstart/selector-filtration-os.png)

   1. Clear selector filtering by clicking ![save-button](../_assets/console-icons/xmark.svg) in the right corner of the selector.



## What's next {#whats-next}

* Read about [service concepts](./concepts/index.md).
* View an [example of a ready-to-use dashboard](https://datalens.yandex/9fms9uae7ip02).

{% include [clickhouse-disclaimer](../_includes/clickhouse-disclaimer.md) %}
