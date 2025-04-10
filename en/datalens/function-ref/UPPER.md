---
editable: false
sourcePath: en/_api-ref/datalens/function-ref/UPPER.md
---

# UPPER



#### Syntax {#syntax}


```
UPPER( string )
```

#### Description {#description}
Returns the string `string` in uppercase.

**Argument types:**
- `string` — `String`


**Return type**: `String`

#### Examples {#examples}

```
UPPER("Lorem ipsum") = "LOREM IPSUM"
```

```
UPPER("Карл у Клары") = "КАРЛ У КЛАРЫ"
```


#### Data source support {#data-source-support}

`ClickHouse 21.8`, `Files`, `Google Sheets`, `Microsoft SQL Server 2017 (14.0)`, `MySQL 5.7`, `Oracle Database 12c (12.1)`, `PostgreSQL 9.3`, `Yandex Documents`, `YDB`.
