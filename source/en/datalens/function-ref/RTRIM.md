---
editable: false
sourcePath: en/_api-ref/datalens/function-ref/RTRIM.md
__system: {"dislikeVariants":["There's no answer to my question","Recommendations aren't helpful","Content does not match the title","Other"]}
---

# RTRIM



#### Syntax {#syntax}


```
RTRIM( string )
```

#### Description {#description}
Returns the string `string` without spaces at the end of the string.

**Argument types:**
- `string` — `String`


**Return type**: `String`

#### Example {#examples}

```
RTRIM("Computer ") = "Computer"
```


#### Data source support {#data-source-support}

`ClickHouse 21.8`, `Microsoft SQL Server 2017 (14.0)`, `MySQL 5.6`, `Oracle Database 12c (12.1)`, `PostgreSQL 9.3`.
