# Создание QL-чарта


Для QL-чартов доступны те же [общие настройки](../../concepts/chart/settings.md#common-settings) и [настройки секций](../../concepts/chart/settings.md#section-settings), что и для чартов на основе датасета. Для полей чарта доступны только некоторые [настройки показателей](../../concepts/chart/settings.md#indicator-settings).

Чтобы создать QL-чарт:

1. Перейдите к уже созданному подключению БД.
1. Убедитесь, что в подключении активирована настройка **Уровень доступа SQL-запросов** → **Разрешить подзапросы в датасетах и запросы из чартов**.
1. В правом верхнем углу нажмите **Создать QL-чарт**.
1. На вкладке **Запрос** укажите запрос, используя SQL-диалект БД, к которой вы обращаетесь.
1. В левом нижнем углу нажмите кнопку **Запустить**.

После выполнения запроса появится визуализация на основе ваших данных.

{% include [datalens-sql-ch-example](../../../_includes/datalens/datalens-sql-ch-example.md) %}




## Добавление параметров селектора {#selector-parameters}

Для [QL-чартов](../../concepts/chart/index.md#sql-charts) в области редактирования чарта на вкладке **Параметры** можно управлять параметрами селектора, а на вкладке **Запрос** указывать переменную в самом запросе в формате `not_var{{variable}}`.

Чтобы добавить параметр:

1. Перейдите на вкладку **Параметры** при создании чарта.
1. Нажмите **Добавить параметр**.
1. Установите тип значения для параметра. Например, `date-interval`.
1. Задайте имя параметру. Например, `interval`.
1. Установите значения по умолчания. Например, `2017-01-01 — 2019-12-31`.

   ![image](../../../_assets/datalens/parameters/date-interval.png =450x167)

### Интервалы {#params-interval}

Параметры типа `date-interval` и `datetime-interval` можно использовать в коде запроса только с постфиксами `_from` и `_to`. Например, для параметра `interval` со значением `2017-01-01 — 2019-12-31` нужно указать:

* `interval_from` — для получения начала интервала (`2017-01-01`);
* `interval_to` — для получения конца интервала (`2019-12-31`).

{% cut "Пример запроса" %}

```sql
SELECT toDate(Date) as datedate, count ('Oreder ID')
FROM samples.SampleLite
WHERE not_var{{interval_from}} < datedate AND datedate < not_var{{interval_to}}
GROUP BY datedate
ORDER BY datedate
```

{% endcut %}

### Подстановка параметра в запрос QL-чарта {#params-in-select}

Значения для параметра из селектора в QL-чарт приходят в виде:

* единичного значения — если выбран один элемент;
* кортежа ([tuple](https://docs.python.org/3/library/stdtypes.html#tuples)) — если выбрано несколько элементов.

Если в тексте запроса перед параметром указан оператор `in`, то подставляемое значение всегда преобразовывается в кортеж. Такой запрос отработает корректно, если выбрано одно или несколько значений.

{% cut "Пример запроса с оператором `in`" %}

```sql
SELECT sum (Sales) as Sales, Category
FROM samples.SampleLite
WHERE Category in not_var{{category}} 
GROUP BY Category
ORDER BY Category
```

{% endcut %}

Если в тексте запроса перед параметром указан оператор `=`, запрос отработает корректно, только если будет выбрано одно значение.

{% cut "Пример запроса с оператором `=`" %}

```sql
SELECT sum (Sales) as Sales, Category
FROM samples.SampleLite
WHERE Category = not_var{{category}} 
GROUP BY Category
ORDER BY Category
```

{% endcut %}

### Пустой выбор в селекторе и параметры {#empty-selector}

Если в селекторе не выбрано ни одного значения и для параметра не задано значение по умолчанию, то в запрос передается пустое значение. В [чартах на основе датасета](../../concepts/chart/dataset-based-charts.md) в этом случае выбираются все значения, а в генерации запроса фильтр по соответствующему столбцу пропадает.

Чтобы обеспечить аналогичное поведение в QL-чартах, можно использовать в запросе конструкцию вида:

```sql
AND
CASE
    WHEN LENGTH(not_var{{param}}::VARCHAR)=0 THEN TRUE
    ELSE column IN not_var{{param}}
END
```