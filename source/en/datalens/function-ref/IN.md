---
editable: false
sourcePath: en/_api-ref/datalens/function-ref/IN.md
__system: {"dislikeVariants":["There's no answer to my question","Recommendations aren't helpful","Content does not match the title","Other"]}
---

# IN



#### Syntax {#syntax}


```
item [ NOT ] IN (<list>)
```

#### Description {#description}
Checks whether the value matches at least one of the values listed in `IN(...)`.

The option `item NOT IN (<`list`>)` returns the opposite value.

**Argument types:**
- `item` — `Array of fractional numbers | Array of integers | Array of strings | Boolean | Date | Datetime | Fractional number | Geopoint | Geopolygon | Integer | String | UUID`
- `list` — `Array of fractional numbers | Array of integers | Array of strings | Boolean | Date | Datetime | Fractional number | Geopoint | Geopolygon | Integer | String | UUID`


**Return type**: `Boolean`

#### Examples {#examples}

```
3 IN (23, 5, 3, 67) = TRUE
```

```
3 NOT IN (23, 5, 3, 67) = FALSE
```


#### Data source support {#data-source-support}

`ClickHouse 21.8`, `Yandex Metrica`, `Microsoft SQL Server 2017 (14.0)`, `MySQL 5.6`, `Oracle Database 12c (12.1)`, `PostgreSQL 9.3`, `YDB`.
