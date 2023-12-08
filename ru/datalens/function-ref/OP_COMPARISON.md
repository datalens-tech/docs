---
editable: false
sourcePath: ru/_api-ref/datalens/function-ref/OP_COMPARISON.md
---

# Сравнение



#### Синтаксис {#syntax}

Равенство
```
value_1 = value_2
```
Неравенство
```
value_1 != value_2
```
Меньше
```
value_1 < value_2
```
Меньше или равно
```
value_1 <= value_2
```
Больше
```
value_1 > value_2
```
Больше или равно
```
value_1 >= value_2
```

#### Описание {#description}
Сравнивают значение `value_1` со значением `value_2`.

**Типы аргументов:**
- `value_1` — `Массив дробных чисел | Массив целых числел | Массив строк | Логический | Дата | Дата и время | Дробное число | Геоточка | Геополигон | Целое число | Строка | UUID`
- `value_2` — `Массив дробных чисел | Массив целых числел | Массив строк | Логический | Дата | Дата и время | Дробное число | Геоточка | Геополигон | Целое число | Строка | UUID`


**Возвращаемый тип**: `Логический`

{% note info %}

Из-за особенностей реализации типа `Дробное число` в источниках `ClickHouse` рекомендуется для этого типа использовать функцию [COMPARE](COMPARE.md) вместо операторов сравнения.

{% endnote %}


#### Примеры {#examples}

```
1 = 1 = TRUE
```

```
7 > 2 > 1 = TRUE
```


#### Поддержка источников данных {#data-source-support}

`ClickHouse 21.8`, `Yandex Metrica`, `Microsoft SQL Server 2017 (14.0)`, `MySQL 5.7`, `Oracle Database 12c (12.1)`, `PostgreSQL 9.3`, `YDB`.