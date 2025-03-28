---
title: Инструкция по созданию подключения к {{ MY }} в {{ datalens-full-name }}
description: Из статьи вы узнаете, как подключиться к {{ MY }} в {{ datalens-full-name }}.
---

# Создание подключения к {{ MY }}



Чтобы создать подключение к {{ MY }}:

1. Перейдите на страницу [воркбука](../../workbooks-collections/index.md) или создайте новый.
1. В правом верхнем углу нажмите **Создать** → **Подключение**.
1. Выберите подключение **{{ MY }}**.
1. Укажите параметры подключения для внешней БД {{ MY }}:

   {% include [datalens-db-connection-parameters-mysql](../../../_includes/datalens/datalens-db-connection-parameters-mysql.md) %}

1. (опционально) Проверьте работоспособность подключения. Для этого нажмите кнопку **Проверить подключение**.
1. Нажмите кнопку **Создать подключение**.
1. Укажите название подключения и нажмите кнопку **Создать**.


## Дополнительные настройки {#additional-settings}



{% include [datalens-db-connection-export-settings](../../../_includes/datalens/operations/datalens-db-connection-export-settings.md) %}
