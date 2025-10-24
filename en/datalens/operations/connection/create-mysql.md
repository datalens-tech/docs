---
title: How to create a {{ MY }} connection in {{ datalens-full-name }}
description: In this tutorial, you will learn how to connect to {{ MY }} in {{ datalens-full-name }}.
---

# Creating a {{ MY }} connection



To create a {{ MY }} connection:

1. Go to the [workbook](../../workbooks-collections/index.md) page or create a new one.
1. In the top-right corner, click **Create** → **Connection**.
1. Select a **{{ MY }}** connection.
1. Specify the connection parameters for the external {{ MY }} database:

   {% include [datalens-db-connection-parameters-mysql](../../../_includes/datalens/datalens-db-connection-parameters-mysql.md) %}

1. (Optional) Test the connection. To do this, click **Check connection**.
1. Click **Create connection**.
1. Enter a name for the connection and click **Create**.


## Additional settings {#additional-settings}

You can specify additional connection settings in the **Advanced connection settings** section:

* **TLS**: Indicates whether TLS is required. When this option is enabled, the connection requires using SSL.
* **CA Certificate**: To upload a certificate, click **Attach file** and specify the certificate file. When the certificate is uploaded, the field shows the file name.
* {% include [datalens-db-connection-export-settings-item](../../../_includes/datalens/operations/datalens-db-connection-export-settings-item.md) %}
