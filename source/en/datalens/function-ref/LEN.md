---
editable: false
sourcePath: en/_api-ref/datalens/function-ref/LEN.md
__system: {"dislikeVariants":["There's no answer to my question","Recommendations aren't helpful","Content does not match the title","Other"]}
---

# LEN



#### Syntax {#syntax}


```
LEN( value )
```

#### Description {#description}
Returns the number of characters in the string or items in array `value`.

**Argument types:**
- `value` — `Array of fractional numbers | Array of integers | Array of strings | String`


**Return type**: `Integer`

#### Example {#examples}

```
LEN("Computer") = 8
```


#### Data source support {#data-source-support}

`ClickHouse 21.8`, `Microsoft SQL Server 2017 (14.0)`, `MySQL 5.6`, `Oracle Database 12c (12.1)`, `PostgreSQL 9.3`, `YDB`.
