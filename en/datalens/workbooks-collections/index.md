---
title: '{{ datalens-full-name }} workbooks and collections'
description: In this tutorial, you will learn about {{ datalens-full-name }} workbooks and collections, their features, and how to start using them.
---

# {{ datalens-full-name }} workbooks and collections



{{ datalens-short-name }} entities are stored in special containers:

* A **workbook** stores [connections](../concepts/connection.md), [datasets](../dataset/index.md), [charts](../concepts/chart/index.md), and [dashboards](../concepts/dashboard.md). Entities within a workbook may only refer to each other.
* A **collection** is a container used for grouping workbooks and other collections.

For more information about how to create a workbook or collection, see [{#T}](./workbooks-collections-create.md).


## Viewing linked objects {#related-objects}

You can look up where the object is used or which objects are used by it. Do it by clicking ![image](../../_assets/console-icons/ellipsis.svg) → ![image](../../_assets/console-icons/code-trunk.svg) **Linked objects** on the workbook page or object editing window. For example, this can give you a clue as to the sources used to build a dashboard or the charts based on a certain dataset.

{% cut "Linked object window" %}

![image](../../_assets/datalens/workbooks-collections/related-objects.png)

{% endcut %}

If you get an error when opening the linked object window, click **Retry**.