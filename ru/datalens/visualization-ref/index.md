---
title: Справочник визуализаций в {{ datalens-full-name }}
description: Из статьи вы узнаете, какие чарты доступны в {{ datalens-short-name }}.
---

# Справочник визуализаций


При [запуске](../concepts/create-instance.md) своего экземпляра {{ datalens-short-name }} вы можете включить [Highcharts](https://github.com/highcharts/highcharts/blob/master/readme.md) (с переменной `HC=1`) или запустить без этой библиотеки.

По умолчанию визуализации типа **Географическая карта** выключены в {{ datalens-full-name }}. Подключить карты можно также при запуске экземпляра {{ datalens-short-name }} по [инструкции](../concepts/create-instance.md#yandex-maps-integration).




{% list tabs %}

- С Highcharts

  * **Диаграммы**:

    * [Линейная диаграмма](line-chart.md)
    * [Диаграмма с областями](area-chart.md)
    * [Нормированная диаграмма с областями](normalized-area-chart.md)
    * [Столбчатая диаграмма](column-chart.md)
    * [Нормированная столбчатая диаграмма](normalized-column-chart.md)
    * [Линейчатая диаграмма](bar-chart.md)
    * [Нормированная линейчатая диаграмма](normalized-bar-chart.md)
    * [Точечная диаграмма](scatter-chart.md)
    * [Круговая диаграмма](pie-chart.md)
    * [Кольцевая диаграмма](ring-chart.md)
    * [Древовидная диаграмма](tree-chart.md)
    * [Комбинированная диаграмма](combined-chart.md)

  * **Таблицы**:

    * [Таблица](table-chart.md)
    * [Сводная таблица](pivot-table-chart.md) — Не поддерживается в [QL-чартах](../concepts/chart/index.md#sql-charts)

  * **Географическая карта**:

    * [Карта](map-chart.md) — Не поддерживаются в [QL-чартах](../concepts/chart/index.md#sql-charts)

      * [Точечная карта](point-map-chart.md)
      * [Точечная карта с кластеризацией](cluster-point-map-chart.md)
      * [Полилинейная карта](polyline-map-chart.md)
      * [Фоновая карта](choropleth-map-chart.md)
      * [Тепловая карта](heat-map-chart.md)

  * **Другое**:

    * [Индикатор](indicator-chart.md)

- Без Highcharts

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
    * [Сводная таблица](pivot-table-chart.md) — Не поддерживается в [QL-чартах](../concepts/chart/index.md#sql-charts)

  * **Географическая карта**:

    * [Карта](map-chart.md) — Не поддерживаются в [QL-чартах](../concepts/chart/index.md#sql-charts)

      * [Точечная карта](point-map-chart.md)
      * [Точечная карта с кластеризацией](cluster-point-map-chart.md)
      * [Полилинейная карта](polyline-map-chart.md)
      * [Фоновая карта](choropleth-map-chart.md)
      * [Тепловая карта](heat-map-chart.md)

  * **Другое**:

    * [Индикатор](indicator-chart.md)

{% endlist %}


