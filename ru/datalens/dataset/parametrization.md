---
title: Параметризация источников датасета в {{ datalens-full-name }}
description: Параметризация источников датасета в {{ datalens-full-name }} позволяет динамически подставлять параметры из чарта в SQL-запрос или название таблицы или схемы.
---

# Параметризация источников датасета в {{ datalens-full-name }}

Параметризация источников датасета позволяет динамически подставлять параметры из чарта в SQL-запрос или название таблицы или схемы.

Чтобы включить параметризацию источников:

1. На уровне подключения настройте **Уровень доступа SQL запросов**. Активируйте настройку и выберите уровень **Разрешить подзапросы в датасетах и параметризацию источников**.

   {% cut "Подключение с параметризацией источников" %}

   ![create-connection](../../_assets/datalens/operations/connection/create-sample-connection-parametrization.png)

   {% endcut %}

1. Создайте датасет и в его настройках ![image](../../_assets/console-icons/gear.svg) нажмите **Включить параметризацию**.

   {% cut "Включение параметризации в датасете" %}

   ![image](../../_assets/datalens/dataset-parametrization/dataset-parametrization-on.png)

   {% endcut %}

1. По [инструкции](./create-dataset.md#add-parameters) добавьте параметр и активируйте в нем опцию **Разрешить использовать в настройке источника**. Доступные типы значений: [Целое число](./data-types.md#integer), [Дробное число](./data-types.md#float), [Строка](./data-types.md#string), [Дата](./data-types.md#date), [Дата и время](./data-types.md#datetime).
1. При определении датасета используйте кнопку **Вставить параметр**.


   
{% include [clickhouse-disclaimer](../../_includes/clickhouse-disclaimer.md) %}