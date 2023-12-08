# Inconsistent aggregation among operands

`ERR.DS_API.FORMULA.VALIDATION.AGG.INCONSISTENT`

Происходит, когда аргументами одной и той же функции (или операндами одного оператора) являются одновременно агрегированное и неагрегированное выражения.

При вычислении агрегированного значения происходит преобразование большого набора строк в единственное значение. Для этого применяются специальные [агрегатные функции](../../../datalens/function-ref/aggregation-functions.md). Наиболее часто применяются функции `SUM`, `MIN`, `MAX`, `AVG` и `COUNT`. Агрегатные функции рассчитывают и возвращают одно результирующее значение для всех строк запроса. Если используется группировка, то рассчитываются и возвращаются значения отдельно для каждой группы, на которые разбивается результат запроса.

В {{ datalens-short-name }} вы не можете использовать в одном выражении агрегированные и неагрегированные значения. Нельзя использовать в одном выражении [показатели](../../concepts/dataset/data-model.md#field) (отображаются в датасете и в визарде синим цветом) и [измерения](../../concepts/dataset/data-model.md#field) (отображаются в датасете и в визарде зеленым цветом).

Примеры:

- `[Sales] / SUM([Sales])`. Для данного выражения можно рассчитать агрегированное значение (показатель) `SUM([Sales])`. Это будет единственное значение для всех строк запроса. Но поле `Sales` не является ни агрегацией, ни измерением в рамках группы. Оно не имеет фиксированного значения — в каждой строке оно может быть разным. Поэтому невозможно определить, какое конкретно значение поля `Sales` должно быть выбрано при вычислении выражения `[Sales] / SUM([Sales])`. Это выражение вычислить невозможно. В подобных случаях возникает ошибка. Чтобы избежать ошибки, в данном случае можно указать тип агрегации для поля `Sales`. Тогда это поле станет показателем и исходная формула будет корректной. Например: `AVG([Sales]) / SUM([Sales])`.
- `[Total Sales] - [Profit]`. Где поле `Total Sales` — агрегированное выражение (показатель), а поле `Profit` — неагрегированное выражение. Здесь появляется ошибка, потому что подобное выражение невозможно вычислить: `[Total Sales]` — результат комбинирования всех записей группы, а выражение `[Profit]` имеет разное значение для каждой записи, а для группы не понятно, какое значение нужно брать. Такое выражение лишено смысла. В данной ситуации скорее всего пользователь имеет в виду `[Total Sales] - SUM([Profit])`.

Еще ошибка может появиться, когда у оконной функции в разделе `WITHIN` есть поля, не являющиеся ни агрегацией, ни измерением в чарте.