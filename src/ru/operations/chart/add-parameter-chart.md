# Добавление параметра в чарт

{% note info %}

* Параметры, добавленные на уровне чарта, доступны только в этом чарте.
* Если в датасете есть параметр с таким же именем, то параметр из чарта игнорируется.

{% endnote %}

Чтобы добавить [параметр](../../concepts/parameters.md) в чарт:

1. На странице навигации найдите чарт, у которого необходимо добавить параметр.
1. В левой части экрана под датасетом нажмите значок ![image](../../_assets/plus-sign.svg) и выберите **Параметр**.
1. В окне **Добавление параметра** введите:
   
   * **Название**. Задает название параметра.
   * **Тип**. Определяет тип данных параметра: **Дата**, **Дата и время**, **Дробное число**, **Логический**, **Строка** или **Целое число**.
   * **Значение по умолчанию**. Заполняется обязательно. Используется в случаях, когда значение параметра не определено на дашборде, в URL чарта или в настройках самого чарта.

1. Нажмите **Добавить**.

## Изменение значения по умолчанию {#change-value}

На уровне чарта можно менять значение по умолчанию параметра из датасета:

1. Нажмите значок слева от названия параметра.
1. В окне **Редактирование параметра** введите новое значение параметра.
1. Нажмите кнопку **Сохранить**.

## Сброс значения по умолчанию {#to-default}

Чтобы вернуть значение параметра по умолчанию к исходному значению из датасета:

1. Нажмите значок слева от названия параметра.
1. В окне **Редактирование параметра** нажмите кнопку **Исходное значение**. Значение параметра по умолчанию вернется к исходному значению из датасета.
1. Нажмите кнопку **Сохранить**.

Также вы можете создать параметры [на уровне датасета](../dataset/add-parameter-dataset.md).