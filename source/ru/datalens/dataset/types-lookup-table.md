---
title: "Таблица соответствий типов данных"
description: "При создании датасета DataLens приводит данные из источника в свой тип для оптимизации. Это позволяет DataLens унифицировать работу с данными из разных источников."
__system: {"dislikeVariants":["Нет ответа на мой вопрос","Рекомендации не помогли","Содержание не соответствует заголовку","Другое"]}
---

# Таблица соответствий типов данных

При создании датасета DataLens приводит данные из источника в свой тип для оптимизации.
Это позволяет DataLens унифицировать работу с данными из разных источников.

Ниже приведена таблица соответствий типов баз данных и внутренних типов DataLens.

DataLens | ClickHouse | PostgreSQL |
----- | ----- | ----- |
**Логический** | boolean | boolean |
**Дата** | date | date |
**Дата и время** | datetime | timestamp |
**Дробное число** | float<br/>float32<br/>float64<br/>decimal<sup>*</sup> | real<br/>double precision<br/>numeric |
**Целое число** | integer<br/>int8<br/>int16<br/>int32<br/>int64<br/>uint8<br/>uint16<br/>uint32<br/>uint64 | smallint<br/>integer<br/>bigint |
**Строка** | string<br/>enum8<br/>enum16 | char<br/>varchar<br/>text<br/>citext<br/> |
**Геоточка** | Задается формулой в DataLens | Задается формулой в DataLens |
**Геополигон** | Задается формулой в DataLens | Задается формулой в DataLens |
**Массив целых чисел** | Array(integer)<br/> Array(int8)<br/>Array(int16)<br/>Array(int32)<br/>Array(int64)<br/>Array(uint8)<br/>Array(uint16)<br/>Array(uint32)<br/>Array(uint64) | Array(smallint)<br/>Array(integer)<br/>Array(bigint) |
**Массив дробных чисел** | Array(float32)<br/>Array(float64) | Array(real)<br/>Array(double)<br/>Array(precision)<br/>Array(numeric)|
**Массив строк** | Array(string) | Array(char)<br/>Array(varchar)<br/>Array(text) |

<sup>*</sup> Возможна потеря точности при конвертации данных.
