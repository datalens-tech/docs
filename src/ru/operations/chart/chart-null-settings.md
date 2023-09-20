# Настройка отображения пустых (null) значений

{% note info %}

Настройка доступна только для тех чартов, у которых есть хотя бы одна ось X или Y:

* Линейная диаграмма
* Диаграмма с областями (Накопительная и Нормированная)
* Столбчатая диаграмма (в том числе Нормированная)
* Линейчатая диаграмма (в том числе Нормированная)
* Точечная диаграмма

{% endnote %}

Если в исходных данных есть строка, в которой значение показателя равно `null`, в чарте с настройками по умолчанию график не отобразится в этой точке (будет разрыв линии, пропуск столбца или точки). Например, если в источнике есть строка с датой (`20.07.2022`), а сумма продаж для нее не указана.

{% cut "Пример графика с разрывом" %}

![image](../../_assets/datalens/operations/chart/line-chart-null.png =700x495)

**Исходная таблица**

| OrderDate | Sales |
| --------- | --------- |
| 15.07.2022 | 301629 |
| 16.07.2022 | 453595 |
| 17.07.2022 | 977583 |
| 18.07.2022 | 527834 |
| 19.07.2022 | 870054 |
| 20.07.2022 | null |
| 21.07.2022 | 569650 |
| 22.07.2022 | 1116034 |
| 23.07.2022 | 883208 |
| 24.07.2022 | 2359483 |
| 25.07.2022 | 1137851 |

{% endcut %}

Вы можете указать, как будут отображаться пустые значения на диаграмме, в настройках секции чарта:

1. В секции с показателем, отображение значения которого надо настроить, в правом верхнем углу нажмите значок ![image](../../_assets/datalens/gear.svg) (значок появляется при наведении указателя на секцию).
1. Укажите значение для опции **Пустые значения (null)**:

   * **Не отображать** — не показывать точки со значением `null`. На диаграмме это отобразится как разрыв линии, пропуск столбца или точки.
   * **Соединять** — соединять линией соседние точки, в которых значение не равно `null`.
   * **Отображать как 0** — заменять значения `null` на `0`.

1. Нажмите кнопку **Применить**.

{% cut "Пример замены null на 0" %}

![image](../../_assets/datalens/operations/chart/line-chart-null-0.png =700x495)

{% endcut %}

Если в исходных данных совсем нет строки, опция **Пустые значения (null)** не изменит отображение показателя на диаграмме. Например, если в источнике нет строки с определенной датой (`20.07.2022`), данные на эту дату не отобразятся.

{% cut "Пример графика с отсутствующей датой" %}

![image](../../_assets/datalens/operations/chart/line-chart-no-rec.png =700x495)

**Исходная таблица**

| OrderDate | Sales |
| --------- | --------- |
| 15.07.2022 | 301629 |
| 16.07.2022 | 453595 |
| 17.07.2022 | 977583 |
| 18.07.2022 | 527834 |
| 19.07.2022 | 870054 |
| 21.07.2022 | 569650 |
| 22.07.2022 | 1116034 |
| 23.07.2022 | 883208 |
| 24.07.2022 | 2359483 |
| 25.07.2022 | 1137851 |

{% endcut %}

{% note info %}

Чтобы отобразить в чарте нулевое значение для несуществующей в таблице даты:

1\. Внесите строку с этой датой и значением `null` в источник.
2\. В настройках секции чарта с соответствующим показателем для опции **Пустые значения (null)** выберите значение **Отображать как 0**.

{% endnote %}