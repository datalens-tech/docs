---
editable: false
sourcePath: en/_api-ref/datalens/function-ref/IMAGE.md
---

# IMAGE



#### Syntax {#syntax}


```
IMAGE( src [ , width [ , height [ , alt ] ] ] )
```

#### Description {#description}
Enables inserting an image located at the `src` address to the table. The `width` and `height` values are provided in pixels. If one of the dimensions is `NULL`, it will be calculated automatically in proportion to the other. If both dimensions are `NULL`, the image will be inserted with the original width and height. In case there are issues when uploading the image, the function will display the `alt` text.




**Argument types:**
- `src` — `String`
- `width` — `Integer`
- `height` — `Integer`
- `alt` — `String`


**Return type**: `Markup`

#### Examples {#examples}



```
IMAGE('https://********/nature-01.jpg', 250, 150, 'alt-text-1')
```

```
IMAGE('https://********/nature-02.jpg', NULL, NULL, 'alt-text-2')
```



#### Data source support {#data-source-support}

`ClickHouse 21.8`, `Microsoft SQL Server 2017 (14.0)`, `MySQL 5.7`, `Oracle Database 12c (12.1)`, `PostgreSQL 9.3`, `YDB`.
