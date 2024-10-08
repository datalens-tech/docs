# Селекторы

Селектор — это фильтр, который влияет на результаты запросов на связанных с ним [виджетах](./widget.md).


Селектор может быть связан с чартом или другим селектором. Подробнее в разделе [{#T}](./link.md).

В одном виджете можно [объединить в группу](../operations/dashboard/add-selector.md) несколько селекторов. Каждый из них будет работать в пределах одной вкладки дашборда. Особенности работы с группой селекторов:
* В виджет с группой селекторов можно добавить кнопки **Применить** и **Сбросить**.
* Чтобы зафиксировать селекторы внутри виджета, для каждого из них укажите точную ширину в пикселях или в виде процента от ширины виджета.
* Чтобы разместить селекторы друг под другом, для каждого из них укажите в качестве ширины `100%`.
* Селекторы можно копировать и вставлять в группу.

В {{ datalens-short-name }} поддерживается несколько типов селекторов:

* **Список** — позволяет выбрать одно или несколько значений из списка.
* **Поле ввода** — в поле вводится значение вручную.
* **Календарь** — для ввода значений с типом `Дата` или `Дата и время`.
* **Чекбокс** — позволяет выбрать одно из двух значений с типом `Логический` — `True` или `False`. Чтобы выбрать сразу два варианта логических значений, используйте тип селектора **Список**.


При добавлении селектора на дашборд учитывайте его влияние на фильтры чарта:

* На дашборде без селекторов чарт отображается с внутренним набором фильтров, если они есть.
* При добавлении селектора по полю на дашборд фильтры, добавленные на уровне чарта, перестают применяться к графику на дашборде.
* Если в селекторе не выбрано ни одного значения (`Нет выбранных значений`), чарт отображается без фильтрации по этому полю, даже если фильтр по этому полю есть на уровне чарта.

Чтобы применить к полю двойную фильтрацию (через селектор и фильтр чарта), создайте в чарте дубликат этого поля. Тогда к дубликату можно применить фильтрацию внутри чарта, а на дашборд добавить селектор по исходному полю.

Фильтры, примененные к чарту с помощью селектора, отображаются в секции **Фильтры с дашборда**. Она доступна, если открыть чарт на редактирование из дашборда. Для очистки всех фильтров с дашборда в левом верхнем углу секции нажмите значок ![image](../../_assets/console-icons/trash-bin.svg).

#### См. также {#see-also}

* [{#T}](../operations/dashboard/add-selector.md)
