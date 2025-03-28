---
title: Как добавить алиас в {{ datalens-full-name }}
description: Следуя данной инструкции, вы сможете добавить алиас для виджетов в {{ datalens-full-name }}.
---

# Создание алиаса


Чтобы добавить [алиас](../../dashboard/link.md#alias) для пары виджетов:


1. На панели слева нажмите ![image](../../../_assets/console-icons/layout-cells-large.svg) **Дашборды** и выберите нужный дашборд. Если у вас нет дашборда, [создайте его](create.md).
1. В верхней части страницы нажмите кнопку **Редактировать**.
1. Справа от виджета, для которого требуется установить связь, нажмите значок ![image](../../../_assets/datalens/links.svg).

   1. В списке для виджета, с которым устанавливается связь, выберите тип связи.

      ![image](../../../_assets/datalens/concepts/link-type.png)

   1. В открывшемся окне для обоих виджетов выберите из списка поля, для которых создается алиас. Поля должны быть одного и того же типа.

      ![image](../../../_assets/datalens/concepts/alias-add.png)

   1. Нажмите значок ![image](../../../_assets/datalens/check.svg).
   1. Нажмите кнопку **Применить**.

      {% note warning %}

      Нельзя создать алиасы для полей одного датасета или для полей с одинаковыми идентификаторами из разных датасетов.

      {% endnote %}

   1. Внизу окна **Связи** нажмите кнопку **Применить**.

1. В правом верхнем углу дашборда нажмите кнопку **Сохранить**.

{% cut "Пример установления связей" %}

Чарт **tutorial — Линейная диаграмма** построен на основе датасета **tutorial**, а чарт **tutorial 2 — Таблица** — на основе датасета **tutorial 2**.

![image](../../../_assets/datalens/concepts/charts-1.png)

1\. Добавим на дашборд селектор **tutorial — Date** с типом **На основе датасета**. В параметрах селектора выберем датасет `tutorial` и поле `Date`. Связь между селектором и чартом **tutorial — Линейная диаграмма** установится автоматически, потому что они созданы на основе одного датасета.

   ![image](../../../_assets/datalens/concepts/selector-1.png)

2\. Добавим на дашборд селектор **tutorial 2 — Ручной ввод** с типом **Ручной ввод**. В параметрах селектора выберем тип элемента **Календарь** и имя поля `Дата`.

   ![image](../../../_assets/datalens/concepts/selector-2.png)

3\. Установим связь между селектором **tutorial 2 — Ручной ввод** и чартом **tutorial 2 — Таблица** с помощью алиаса. При создании алиаса выберем поле `Дата` в селекторе и поле `Date 2` в датасете `tutorial 2`.

   ![image](../../../_assets/datalens/concepts/alias-date-1.png)

Теперь селектор **tutorial — Date** фильтрует чарт **tutorial — Линейная диаграмма**, а селектор **tutorial 2 — Ручной ввод** — чарт **tutorial 2 — Таблица**.

   ![image](../../../_assets/datalens/concepts/charts-2.png)

4\. Установим связь между селектором **tutorial 2 — Ручной ввод** и чартом **tutorial — Линейная диаграмма** с помощью алиаса. При создании алиаса выберем поле `Дата` в селекторе и поле `Date` в датасете `tutorial`.

   ![image](../../../_assets/datalens/concepts/alias-date-2.png)

Установка связи между селектором **tutorial 2 — Ручной ввод** и чартом **tutorial — Линейная диаграмма** приводит к тому, что селекторы **tutorial 2 — Ручной ввод** и **tutorial — Date** связываются между собой. Это происходит потому, что чарт **tutorial — Линейная диаграмма** и селектор **tutorial — Date** построены на основе одного датасета. Теперь любой селектор приводит к автоматической установке соответствующих значений в другом селекторе и фильтрации обоих чартов. Чтобы отменить связь селекторов, нужно задать между ними тип связи **Не связаны**.

{% endcut %}

При добавлении алиаса убедитесь, что поле, по которому фильтрует селектор, есть в датасете, по которому построен чарт. В противном случае связь работать не будет.