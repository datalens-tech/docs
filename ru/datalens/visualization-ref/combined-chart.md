# Комбинированная диаграмма ![](../../_assets/datalens/combined.svg)

Комбинированная диаграмма — отдельный тип визуализации, который состоит из слоев. Каждый слой представлен отдельным типом диаграммы. Можно комбинировать [линейные](line-chart.md), [столбчатые](column-chart.md) и [диаграммы с областями](area-chart.md).

Особенности:

* Секции **Х**, **Сортировка** и **Фильтры** общие для всех слоев.
* Слои можно добавлять, удалять, менять порядок, переименовывать.
* Каждый слой исполняется в базе отдельным запросом.
* Максимальное количество слоев — 5.

{% note info %}

* В столбчатых диаграммах нет раскраски по показателю.
* В комбинированной диаграмме сортировка применяется только к тем слоям, где она возможна.

{% endnote %}

Комбинированную диаграмму часто используют для сравнения плана и факта. Линию плана можно показать пунктиром на слое с линейной диаграммой, а столбики факта — разбить по категориям на слое со столбчатой.

![combo-line-column](../../_assets/datalens/visualization-ref/combined-chart/combo-line-column.png)

{% cut "Исходная таблица" %}

|Год|Категория|План|Продажи|
|-----|-----|-----|-----|
|2018|Бытовая химия|435.53|449|
|2018|Бытовые товары|null|null|
|2018|Техника для дома|null|null|
|2019|Бытовая химия|503255|512282|
|2019|Бытовые товары|1457502|1483733|
|2019|Техника для дома|2237228.4|2331805|
|2020|Бытовая химия|1623124|1644668|
|2020|Бытовые товары|4495448|4535567|
|2020|Техника для дома|6711462.8|7046605|
|2021|Бытовая химия|2686134|2737436|
|2021|Бытовые товары|7794310|7836228|
|2021|Техника для дома|11329663.6|11910983|
|2022|Бытовая химия|2512031|2652918|
|2022|Бытовые товары|7013145|7382385|
|2022|Техника для дома|11327092|11461881|

{% endcut %}

Комбинированную диаграмму в некоторых случаях удобно использовать для однотипных слоев. Например, на одном слое представлены продажи по категориям, а на втором слое — выведена константа плана.

![combo-constant](../../_assets/datalens/visualization-ref/combined-chart/combo-constant.png)

Можно выводить дополнительные линии, рассчитанные через [оконные](../../datalens/function-ref/window-functions.md) или [LOD-функции](../../datalens/function-ref/aggregation-functions.md#syntax-lod). Например, для расчета среднего по категориям можно воспользоваться формулой: `avg(SUM([Продажа] INCLUDE [Категория]))`.

![combo-avg](../../_assets/datalens/visualization-ref/combined-chart/combo-avg.png)

## Секции в визарде {#wizard-sections}

Секция<br/> в визарде| Описание
----- | ----
X | Измерение. Может быть указано только одно поле. Обычно это измерение бывает датой. В этом случае проверьте, что в датасете для этого поля указан тип данных `Дата`. Это необходимо для корректной сортировки, отображения подписей. Для более наглядной визуализации дату можно группировать в недели, месяцы, годы (подробнее в разделе [{#T}](../concepts/chart/settings.md#field-settings)). Секция **Х** общая для всех слоев.
Секция слоя | Позволяет добавлять, удалять, менять порядок, переименовывать слои. Можно выбрать тип диаграммы для слоя: [линейную](line-chart.md), [столбчатую](column-chart.md) или [диаграмму с областями](area-chart.md). Список остальных секций зависит от типа выбранной диаграммы слоя.<br/><br/> Управлять отображением данных на слоях диаграммы можно с помощью легенды чарта. Для этого нажимайте на отдельные элементы легенды или выбирайте несколько элементов легенды с зажатой клавишей `Ctrl`/`Cmd`. Легенда включается и отключается в настройках чарта (подробнее в разделе [{#T}](../concepts/chart/settings.md#common-settings)).

## Создание комбинированной диаграммы {#create-diagram}

Чтобы создать комбинированную диаграмму:


{% include [datalens-workbooks-collections-note](../../_includes/datalens/operations/datalens-workbooks-collections-note-step4.md) %}


1. Перейдите на главную страницу {{ datalens-short-name }}.
1. На панели слева выберите ![chart](../../_assets/console-icons/chart-column.svg) **Чарты**.
1. Нажмите кнопку **Создать чарт** → **Чарт**.
1. Слева вверху нажмите ![image](../../_assets/console-icons/circles-intersection.svg) **Выберите датасет** и укажите датасет для визуализации.
1. Выберите тип чарта **Комбинированная диаграмма**.
1. Перетащите измерение из датасета в секцию **X**. Значения отобразятся в нижней части графика по оси X.
1. Выберите тип диаграммы слоя: линейную ![](../../_assets/datalens/line.svg), столбчатую ![](../../_assets/datalens/column.svg) или диаграмму с областями ![](../../_assets/datalens/area.svg). При необходимости измените название слоя.
1. Постройте диаграмму соответствующего типа:

   * [{#T}](line-chart.md#create-diagram)
   * [{#T}](column-chart.md#create-diagram)
   * [{#T}](area-chart.md#create-diagram)

1. Добавьте новый слой. Для этого нажмите значок ![](../../_assets/console-icons/plus.svg) справа от названия слоя.

#### См. также {#see-also}

* [{#T}](../operations/dashboard/create.md)
* [{#T}](../operations/dashboard/add-chart.md)
* [{#T}](../operations/dashboard/add-selector.md)