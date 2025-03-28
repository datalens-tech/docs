---
title: Справочник визуализаций в {{ datalens-full-name }}
description: Из статьи вы узнаете, какие чарты доступны в {{ datalens-short-name }}.
---

# Справочник визуализаций


При [запуске](../quickstart.md#create-datalens) своего экземпляра {{ datalens-short-name }} вы можете включить [Highcharts](https://github.com/highcharts/highcharts/blob/master/readme.md) (с переменной `HC=1`), или запустить без него. В зависимости от этого доступны следующие типы чартов:

{% list tabs %}

- С Highcharts

  * **Диаграммы**:

    * [Линейная диаграмма](line-chart.md)
    * [Столбчатая диаграмма](column-chart.md)
    * [Линейчатая диаграмма](bar-chart.md)
    * [Нормированная линейчатая диаграмма](normalized-bar-chart.md)
    * [Точечная диаграмма](scatter-chart.md)
    * [Круговая диаграмма](pie-chart.md)
    * [Кольцевая диаграмма](ring-chart.md)
    * [Древовидная диаграмма](tree-chart.md)

  * **Таблицы**:

    * [Таблица](table-chart.md)
    * [Сводная таблица](pivot-table-chart.md)

  * **Другое**:

    * [Индикатор](indicator-chart.md)

- Без Highcharts

  * **Диаграммы**:

    * [Столбчатая диаграмма](column-chart.md)
    * [Точечная диаграмма](scatter-chart.md)
    * [Круговая диаграмма](pie-chart.md)

  * **Таблицы**:

    * [Таблица](table-chart.md)
    * [Сводная таблица](pivot-table-chart.md)

  * **Другое**:

    * [Индикатор](indicator-chart.md)

{% endlist %}

{% note info %}

[QL-чарты](../concepts/chart/index.md#sql-charts) не поддерживают сводную таблицу.

{% endnote %}


