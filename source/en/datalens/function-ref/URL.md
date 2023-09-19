---
editable: false
sourcePath: en/_api-ref/datalens/function-ref/URL.md
__system: {"dislikeVariants":["There's no answer to my question","Recommendations aren't helpful","Content does not match the title","Other"]}
---

# URL



#### Syntax {#syntax}


```
URL( address, text )
```

#### Description {#description}
Wraps `text` into a hyperlink to URL `address`.

**Argument types:**
- `address` — `String`
- `text` — `Markup | String`


**Return type**: `Markup`

#### Example {#examples}

```
URL('https://example.com/?value=' + [value], [value])
```


#### Data source support {#data-source-support}

`ClickHouse 21.8`, `Microsoft SQL Server 2017 (14.0)`, `MySQL 5.6`, `Oracle Database 12c (12.1)`, `PostgreSQL 9.3`, `YDB`.
