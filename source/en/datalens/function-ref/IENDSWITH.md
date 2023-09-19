---
editable: false
sourcePath: en/_api-ref/datalens/function-ref/IENDSWITH.md
__system: {"dislikeVariants":["There's no answer to my question","Recommendations aren't helpful","Content does not match the title","Other"]}
---

# IENDSWITH



#### Syntax {#syntax}


```
IENDSWITH( string, substring )
```

#### Description {#description}
Case-insensitive version of [ENDSWITH](ENDSWITH.md). Returns `TRUE` if `string` ends in `substring`.

**Argument types:**
- `string` — `Boolean | Date | Datetime | Fractional number | Geopoint | Geopolygon | Integer | String | UUID`
- `substring` — `String`


**Return type**: `Boolean`

#### Examples {#examples}

```
IENDSWITH("PETROV IVAN", "Ivan") = TRUE
```

```
IENDSWITH("Lorem ipsum", "SUM") = TRUE
```

```
IENDSWITH("Lorem ipsum", "abc") = FALSE
```


#### Data source support {#data-source-support}

`ClickHouse 21.8`, `Microsoft SQL Server 2017 (14.0)`, `MySQL 5.6`, `Oracle Database 12c (12.1)`, `PostgreSQL 9.3`, `YDB`.
