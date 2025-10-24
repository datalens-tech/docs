---
title: How to create an AppMetrica connection in {{ datalens-full-name }}
description: Follow this guide to create an AppMetrica connection.
---

# Creating an AppMetrica connection

To create an AppMetrica connection:



1. Go to the [workbook](../../workbooks-collections/index.md) page or create a new one.
1. In the top-right corner, click **Create** → **Connection**.
1. Select **AppMetrica** as the connection type.
1. Configure the connection as follows:
   * **OAuth token**. Specify the OAuth token to access Yandex Metrica data.
   * **App**. Specify the application ID.

   {% include [datalens-get-token](../../../_includes/datalens/datalens-change-account-note.md) %}

1. Click **Create connection**.
1. Enter a name for the connection and click **Create**.

{% include [datalens-appmetrica-note](../../../_includes/datalens/datalens-appmetrica-note.md) %}

For datasets based on AppMetrica connections, the following groups of metrics are available:

- Installations
- Audience
- Client events
- Push campaigns
- Audience + social demographic 


