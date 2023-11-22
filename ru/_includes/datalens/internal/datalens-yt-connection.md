Чтобы создать подключение к CHYT:


1. Перейдите на [страницу подключений](https://datalens.yandex.ru/connections).
1. Нажмите кнопку **Создать подключение**.
1. Выберите подключение **CHYT**.


1. Укажите параметры подключения:
   
   * **Токен YTsaurus**. Укажите вручную OAuth-токен для работы с YTsaurus. Подробнее см. в [документации YTsaurus](https://ytsaurus.tech/docs/ru/user-guide/storage/auth).
   * **Имя хоста**. Укажите адрес прокси серверов YTsaurus.
   * **Порт**. Укажите порт подключения к CHYT.
   * **Клика**. Укажите алиас запущенной клики. По умолчанию используется публичная клика `*ch_public`.
   * **Время жизни кеша в секундах**. Укажите время жизни кеша или оставьте значение по умолчанию. Рекомендованное значение — 300 секунд (5 минут).
   * **Уровень доступа SQL запросов**. Выберите уровень доступа к SQL-запросам для пользователя.


1. Нажмите кнопку **Создать подключение**.
1. Укажите название подключения и нажмите кнопку **Создать**.

{% include [datalens-check-host](../../../_includes/datalens/operations/datalens-check-host.md) %}


## Дополнительные настройки {#additional-settings}

{% include [datalens-db-connection-export-settings](../../../_includes/datalens/operations/datalens-db-connection-export-settings.md) %}