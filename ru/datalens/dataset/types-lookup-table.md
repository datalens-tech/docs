---
title: "Таблица соответствий типов данных"
description: "При создании датасета {{ datalens-short-name }} приводит данные из источника в свой тип для оптимизации. Это позволяет {{ datalens-short-name }} унифицировать работу с данными из разных источников."
---

# Таблица соответствий типов данных

При создании датасета {{ datalens-short-name }} приводит данные из источника в свой тип для оптимизации.
Это позволяет {{ datalens-short-name }} унифицировать работу с данными из разных источников.

Ниже приведена таблица соответствий типов баз данных и внутренних типов {{ datalens-short-name }}.

DataLens | {{ CH }} | PostgreSQL |
----- | ----- | ----- |
**Логический** | boolean | boolean |
**Дата** | date | date |
**Дата и время** | datetime | timestamp |
**Дробное число** | float<br/>float32<br/>float64<br/>decimal<sup>*</sup> | real<br/>double precision<br/>numeric |
**Целое число** | integer<br/>int8<br/>int16<br/>int32<br/>int64<br/>uint8<br/>uint16<br/>uint32<br/>uint64 | smallint<br/>integer<br/>bigint |
**Строка** | string<br/>enum8<br/>enum16 | char<br/>varchar<br/>text<br/>citext<br/> |
**Геоточка** | Задается формулой в {{ datalens-short-name }} | Задается формулой в {{ datalens-short-name }} |
**Геополигон** | Задается формулой в {{ datalens-short-name }} | Задается формулой в {{ datalens-short-name }} |
**Массив целых чисел** | Array(integer)<br/> Array(int8)<br/>Array(int16)<br/>Array(int32)<br/>Array(int64)<br/>Array(uint8)<br/>Array(uint16)<br/>Array(uint32)<br/>Array(uint64) | Array(smallint)<br/>Array(integer)<br/>Array(bigint) |
**Массив дробных чисел** | Array(float32)<br/>Array(float64) | Array(real)<br/>Array(double)<br/>Array(precision)<br/>Array(numeric)|
**Массив строк** | Array(string) | Array(char)<br/>Array(varchar)<br/>Array(text) |

<sup>*</sup> Возможна потеря точности при конвертации данных.

{% include [clickhouse-disclaimer](../../_includes/clickhouse-disclaimer.md) %}