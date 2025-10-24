---
title: Visualization reference in {{ datalens-full-name }}
description: In this article, you will learn about chart types available in {{ datalens-short-name }}.
---

# Visualization reference


When [running](../concepts/create-instance.md) your {{ datalens-short-name }} instance, you can enable [Highcharts](https://github.com/highcharts/highcharts/blob/master/readme.md) (with `HC=1`) or run the instance without this library.

By default, visualizations of the **Geographical map** type are disabled in {{ datalens-full-name }}. You can also enable maps when running a {{ datalens-short-name }} instance, as described in [this guide](../concepts/create-instance.md#yandex-maps-integration).




{% list tabs %}

- With Highcharts

  * **Charts**:

    * [Line chart](line-chart.md)
    * [Area chart](area-chart.md)
    * [Normalized stacked area chart](normalized-area-chart.md)
    * [Column chart](column-chart.md)
    * [Normalized column chart](normalized-column-chart.md)
    * [Bar chart](bar-chart.md)
    * [Normalized bar chart](normalized-bar-chart.md)
    * [Scatter chart](scatter-chart.md)
    * [Pie chart](pie-chart.md)
    * [Donut chart](ring-chart.md)
    * [Tree chart](tree-chart.md)
    * [Combined chart](combined-chart.md)

  * **Tables**:

    * [Table](table-chart.md)
    * [Pivot table](pivot-table-chart.md): Not supported in [QL charts](../concepts/chart/index.md#sql-charts)

  * **Geographical map**:

    * [Map](map-chart.md): Not supported in [QL charts](../concepts/chart/index.md#sql-charts)

      * [Point map](point-map-chart.md)
      * [Point map with clusters](cluster-point-map-chart.md)
      * [Polyline map](polyline-map-chart.md)
      * [Choropleth map](choropleth-map-chart.md)
      * [Heat map](heat-map-chart.md)

  * **Other**:

    * [Indicator](indicator-chart.md)

- Without Highcharts

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
    * [Pivot table](pivot-table-chart.md): Not supported in [QL charts](../concepts/chart/index.md#sql-charts)

  * **Geographical map**:

    * [Map](map-chart.md): Not supported in [QL charts](../concepts/chart/index.md#sql-charts)

      * [Point map](point-map-chart.md)
      * [Point map with clusters](cluster-point-map-chart.md)
      * [Polyline map](polyline-map-chart.md)
      * [Choropleth map](choropleth-map-chart.md)
      * [Heat map](heat-map-chart.md)

  * **Other**:

    * [Indicator](indicator-chart.md)

{% endlist %}


