* **Имя хоста**. Укажите путь до [хоста-мастера](https://www.postgresql.org/docs/16/runtime-config-replication.html#RUNTIME-CONFIG-REPLICATION-PRIMARY) или IP-адрес хоста-мастера {{ PG }}. Вы можете указать несколько хостов через запятую. Если к первому хосту подключиться не получится, {{ datalens-short-name }} выберет следующий из списка.
* **Порт**. Укажите порт подключения к {{ PG }}. В {{ datalens-short-name }} по умолчанию используется порт 6432.
* **Путь к базе данных**. Укажите имя подключаемой базы данных.
* **Имя пользователя**. Укажите имя пользователя для подключения к {{ PG }}.
* **Пароль**. Укажите пароль для пользователя.
* **Время жизни кеша в секундах**. Укажите время жизни кеша или оставьте значение по умолчанию. Рекомендованное значение — 300 секунд (5 минут).
* **Уровень доступа SQL запросов**. Позволяет использовать произвольный SQL-запрос для [формирования датасета](../../datalens/dataset/settings.md#sql-request-in-datatset).
