---
title: Data type mapping table
description: When you create a dataset, {{ datalens-short-name }} converts the source data to its own type for streamlined data processing. This helps {{ datalens-short-name }} unify the operations with data from different sources.
---

# Data type mapping table

When you create a dataset, {{ datalens-short-name }} converts the source data to its own type for streamlined data processing.
This helps {{ datalens-short-name }} unify the operations with data from different sources.

The table below shows how data types of different databases and {{ datalens-short-name }} internal data types map.

DataLens | {{ CH }} | PostgreSQL |
----- | ----- | ----- |
**Boolean** | boolean | boolean |
**Date** | date | date |
**Date and time** | datetime | timestamp |
**Fractional number** | float<br/>float32<br/>float64<br/>decimal<sup>*</sup> | real<br/>double precision<br/>numeric |
**Integer** | integer<br/>int8<br/>int16<br/>int32<br/>int64<br/>uint8<br/>uint16<br/>uint32<br/>uint64 | smallint<br/>integer<br/>bigint |
**String** | string<br/>enum8<br/>enum16 | char<br/>varchar<br/>text<br/>citext<br/> |
**Geopoint** | Set by a formula in {{ datalens-short-name }} | Set by a formula in {{ datalens-short-name }} |
**Geopolygon** | Set by a formula in {{ datalens-short-name }} | Set by a formula in {{ datalens-short-name }} |
**Array of integers** | Array(integer)<br/> Array(int8)<br/>Array(int16)<br/>Array(int32)<br/>Array(int64)<br/>Array(uint8)<br/>Array(uint16)<br/>Array(uint32)<br/>Array(uint64) | Array(smallint)<br/>Array(integer)<br/>Array(bigint) |
**Float array** | Array(float32)<br/>Array(float64) | Array(real)<br/>Array(double)<br/>Array(precision)<br/>Array(numeric)|
**Array of strings** | Array(string) | Array(char)<br/>Array(varchar)<br/>Array(text) |

<sup>*</sup> There may be a loss of accuracy when converting data.

{% include [clickhouse-disclaimer](../../_includes/clickhouse-disclaimer.md) %}
