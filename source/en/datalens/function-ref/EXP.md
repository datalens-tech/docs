---
editable: false
sourcePath: en/_api-ref/datalens/function-ref/EXP.md
__system: {"dislikeVariants":["There's no answer to my question","Recommendations aren't helpful","Content does not match the title","Other"]}
---

# EXP



#### Syntax {#syntax}


```
EXP( number )
```

#### Description {#description}
Returns the result of raising the number 'e' to the power of `number`.

**Argument types:**
- `number` — `Fractional number | Integer`


**Return type**: `Fractional number`

#### Examples {#examples}

```
EXP(0) = 1.0
```

```
EXP(1) = 2.718282
```

```
EXP(3) = 20.08553
```


#### Data source support {#data-source-support}

`ClickHouse 21.8`, `Microsoft SQL Server 2017 (14.0)`, `MySQL 5.6`, `Oracle Database 12c (12.1)`, `PostgreSQL 9.3`, `YDB`.
