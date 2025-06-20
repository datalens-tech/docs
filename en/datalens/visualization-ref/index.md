---
title: Visualization reference in {{ datalens-full-name }}
description: In this article, you will learn about chart types available in {{ datalens-short-name }}.
---

# Visualization reference


When [running](../quickstart.md#create-datalens) your {{ datalens-short-name }} instance, you can enable [Highcharts](https://github.com/highcharts/highcharts/blob/master/readme.md) (with `HC=1`) or run the instance without this option. Depending on that, the following chart types will be available:

{% list tabs %}

- With Highcharts

  * **Charts**:

    * [Line chart](line-chart.md)
    * [Column chart](column-chart.md)
    * [Bar chart](bar-chart.md)
    * [Normalized bar chart](normalized-bar-chart.md)
    * [Scatter chart](scatter-chart.md)
    * [Pie chart](pie-chart.md)
    * [Donut chart](ring-chart.md)
    * [Tree chart](tree-chart.md)

  * **Tables**:

    * [Table](table-chart.md)
    * [Pivot table](pivot-table-chart.md)

  * **Other**:

    * [Indicator](indicator-chart.md)

- Without Highcharts

  * **Charts**:

    * [Column chart](column-chart.md)
    * [Scatter chart](scatter-chart.md)
    * [Pie chart](pie-chart.md)

  * **Tables**:

    * [Table](table-chart.md)
    * [Pivot table](pivot-table-chart.md)

  * **Other**:

    * [Indicator](indicator-chart.md)

{% endlist %}

{% note info %}

[QL charts](../concepts/chart/index.md#sql-charts) do not support pivot tables.

{% endnote %}


