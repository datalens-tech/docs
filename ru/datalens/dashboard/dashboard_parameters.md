---
title: Параметры дашборда
description: Из статьи вы узнаете, что такое параметры дашборда, ознакомитесь с параметрами для дашборда, чарта и специальными параметрами, узнаете про ограничения и порядок применения параметров.
---

# Параметры дашборда

Параметр дашборда — это переменная, которая используется для фильтрации виджетов на дашборде при его открытии. Параметры позволяют более гибко применять возможности визуализации, адаптировать использование одних и тех же чартов и дашбордов для разных целей. Использование параметров может быть полезно, например, в следующих ситуациях:

* Вы хотите где-то разместить ссылку на дашборд с примененным фильтром: в таблице на другом дашборде, на странице в {{ wiki-full-name }} или в другом месте.
* Вы хотите разместить один и тот же чарт с разными фильтрами на одной вкладке дашборда.

Можно добавлять параметры как для всего [дашборда](#params-dash), так и для [отдельного чарта](#params-chart) на дашборде. Параметры дашборда применяются ко всем чартам, которые на нем расположены, а параметры чарта — к отдельному виджету.

Примеры использования параметров можно посмотреть в [записи](https://www.youtube.com/watch?v=fx0BR_RnLNs) на YouTube-канале {{ yandex-cloud }}.

## Параметры для дашборда {#params-dash}

Параметры дашборда подставляются во все виджеты (в частности чарты и селекторы) в момент их загрузки. При открытии такого дашборда, данные на нем будут отфильтрованы с учетом заданных значений параметров. [Добавить параметры](../operations/dashboard/add-parameters.md) можно в настройках дашборда. Для каждого параметра задается имя (ключ) и значение. Имя параметра должно совпадать с названием поля в датасете, по которому фильтруются данные.

{% note info %}

В некоторых случаях в качестве имени параметра следует использовать ID поля:

* если название поля задано на русском или состоит из двух слов;
* если вы хотите использовать значение параметра в селекторе на основе датасета.

При изменении ID поля имя параметра также надо актуализировать. Подробнее см. [инструкцию](../operations/chart/add-guid.md).

{% endnote %}

Вы также можете указать значения параметров в ссылке на дашборд. Тогда при переходе по ссылке откроется дашборд с примененным фильтром.

{% note info %}

Чтобы при переходе по ссылке значение параметра подставлялось в селектор на основе датасета, укажите ID поля и в качестве имени параметра, и в ссылке на дашборд.

{% endnote %}

Первый параметр в ссылке отделяется от пути до дашборда символом `?`, а остальные параметры — символом `&`. Например, в ссылке `{{ link-datalens-main }}/test-dashboard?tab=test&OrderID=123456789` указаны значения для параметров `tab` и `OrderID`.

Значения параметров в ссылке будут приоритетными. Например, если в настройках дашборда для параметра `region` задано значение `RU`, а в ссылке на дашборд указано `?region=KZ`, то в виджеты будет подставлено значение `KZ`.


## Параметры для чарта {#params-chart}

Параметры чарта применяются только к нему самому. Это позволяет отобразить на одной вкладке дашборда один и тот же чарт с разными фильтрами. [Добавить параметры для чарта](../operations/chart/add-parameters.md) можно в его настройках на дашборде.

Передать значение параметра в визардный чарт можно с помощью ID поля ([см. инструкцию](../operations/chart/add-guid.md)).

{% include [datalens-chart-parameters-example](../../_includes/datalens/datalens-chart-parameters-example.md) %}

## Специальные параметры {#special-parameters}

### Относительная дата {#relativedate}

Параметр позволяет указать смещение относительно текущего момента времени и задается в одном из форматов:

* `__relative_<знак><количество><единица_измерения>`
* `__relative_<знак><количество><единица_измерения>_<тип_приведения><единица_измерения>`

Где:

* `<знак>`: `+` или `-`
* `<единица_измерения>`:
  * `y` — год
  * `Q` — квартал
  * `M` — месяц
  * `w` — неделя
  * `d` — день
  * `h` — час
  * `m` — минута
  * `s` — секунда
  * `ms` — миллисекунда
* `<тип_приведения>`:
  * `s` — к началу
  * `e` — к концу

Например, если время на данный момент `2020-03-24T23:30:39.874Z`, то:

* `__relative_-7d`— семь дней назад — ` 2020-03-17T00:00:00.000Z`
* `__relative_+30m` — через 30 минут — ` 2020-03-25T00:00:39.874Z`
* `__relative_-0d` — сегодня — `2020-03-24T00:00:00.000Z`
* `__relative_-0h` — сейчас — `2020-03-24T23:30:39.874Z`
* `__relative_-3M_sQ` — минус 3 месяца (`2019-12-24T00:00:00.000Z`), приведенные к началу квартала — `2019-10-01T00:00:00.000Z`
* `__relative_+15s_em` — плюс 15 секунд (`2020-03-24T23:30:54.874Z`), приведенные к концу минуты — `2020-03-24T23:30:59.999Z`

{% note info %}

Если не указаны приведения, то для единиц измерения от дня и выше время приводится к началу дня, т.е. `00:00:00.000`, а для единиц измерения меньше дня используется текущее время.

{% endnote %}

### Интервал {#interval}

Параметр позволяет указать временной интервал и задается в формате `__interval_<начало>_<конец>`, где `начало`/`конец` — [относительная дата](#relativedate) или [ISO дата](https://ru.wikipedia.org/wiki/ISO_8601).

Например, если время на данный момент `2020-03-24T23:30:39.874Z`, то:

* `__interval_2019-03-11T09:35:48_2019-12-28T09:35:48` — с `2019-03-11T09:35:48` по `2019-12-28T09:35:48`
* `__interval_2019-01-17T09:35:48___relative_+0d` — с `2019-01-17T09:35:48` по сегодня (`2020-03-24T23:59:59.999Z`)
* `__interval___relative_-2w_sM___relative_+1d` — от двух недель назад (`2020-03-10T00:00:00.000Z`), приведенных к началу месяца — `2020-03-01T00:00:00.000Z` до завтра (`2020-03-25T23:59:59.999Z`)

## Порядок применения параметров {#params-applying}

Для виджетов на дашборде параметры применяются в следующем порядке (значения из последующих пунктов переопределяют предыдущие):

1. Для чартов в визарде и QL-чартов — фильтры, для чартов в Editor — параметры, указанные на вкладке .
1. [Параметры чартов](#params-chart) из настроек дашборда.
1. [Параметры дашборда](#params-dash).
1. Значения [селекторов](./selector.md) на дашборде.
1. Параметры, указанные в ссылке на дашборд, например, `{{ link-datalens-main }}/test-dashboard?OrderID=123456789`.
1. Значения из параметра `state` в ссылке на дашборд. {{ datalens-short-name }} запоминает настройки селекторов и записывает их в специальный параметр `state`, который фиксируется в адресной строке браузера. Чтобы поделиться текущим состоянием дашборда, достаточно скопировать получившуюся ссылку. Таким образом можно сразу показать дашборд с нужными данными вместо описания настроек фильтрации.

   {% note info %}

   При изменении настроек дашборда параметр `state` в ссылке не обновляется — записанные в нем настройки теряют актуальность. Чтобы получить ссылку с актуальными настройками, скопируйте ее заново из адресной строки браузера.

   {% endnote %}

## Ограничения {#params-restrictions}

При использовании параметров существуют следующие ограничения:

* Зарезервированные ключи, которые нельзя использовать:

  * `tab`
  * `state`
  * `mode`
  * `focus`
  * `grid`
  * `scale`
  * `tz`
  * `timezone`
  * `date`
  * `datetime`
  * `_action_params`
  * `_autoupdate`
  * `_opened_info`
  * `report_page`
  * `preview_mode`

  Параметры с такими ключами будут проигнорированы и не будут сохранены.

* В ссылках могут быть использованы только те параметры, которые заданы в настройках дашборда. В противном случае они будут проигнорированы. Например, если в ссылке будет указано `?product=Furniture`, но в настройках дашборда не будет задан параметр `product` (даже с пустым значением), то такой параметр будет проигнорирован.
* Параметры дашборда в любом случае будут применены к виджетам, что может привести к ошибкам в запросах данных.
* Параметры не могут быть использованы при создании связей. Для создания связи вы можете добавить ручной селектор с нужным ключом параметра, сделать связи с ним по нужным параметрам, а потом удалить его. Например, для параметра дашборда `parameter`:

  1. [Добавьте](../operations/dashboard/add-selector.md) на дашборд ручной селектор, указав в **Имя поля или параметра** `parameter`.
  1. [Установите](../operations/dashboard/create-alias.md) исходящую связь нового селектора с необходимыми виджетами на дашборде.
  1. Удалите добавленный селектор с дашборда.

  Теперь значение параметра дашборда `parameter` будет применено ко всем виджетам, с которыми была установлена связь удаленного селектора.
  
