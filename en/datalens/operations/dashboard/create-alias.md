---
title: How to add aliases in {{ datalens-full-name }}
description: Follow this guide to add an alias for widgets in {{ datalens-full-name }}.
---

# Creating an alias


To add an [alias](../../dashboard/link.md#alias) for a pair of widgets:


1. In the left-hand panel, click ![image](../../../_assets/console-icons/layout-cells-large.svg) **Dashboards** and select the dashboard you need. If you do not have a dashboard, [create one](create.md).
1. At the top of the page, click **Edit**.
1. To the right of the widget to add a link for, click ![image](../../../_assets/datalens/links.svg).

   1. Select a link type in the list for the widget you are going to link.

      ![image](../../../_assets/datalens/concepts/link-type.png)

   1. In the window that opens, for both widgets, select from the list the fields for which you are creating the alias. The fields must be of the same type.

      ![image](../../../_assets/datalens/concepts/alias-add.png)

   1. Click ![image](../../../_assets/datalens/check.svg).
   1. Click **Apply**.

      {% note warning %}

      Please note that you cannot create aliases for fields from the same dataset or fields with the same IDs from different datasets.

      {% endnote %}

   1. At the bottom of the **Links** window, click **Apply**.

1. In the top-right corner of the dashboard, click **Save**.

{% cut "Example of linking" %}

A chart named **tutorial — Line chart** is based on the **tutorial** dataset and a chart named **tutorial 2 — Table** is based on the **tutorial 2** dataset.

![image](../../../_assets/datalens/concepts/charts-1.png)

1\. Let's add a **tutorial — Date** selector of the **Based on datasets** type to the dashboard. In the selector parameters, select the `tutorial` dataset and the `Date` field. A link between the selector and the **tutorial — Line chart** chart is established automatically, since they are based on the same dataset.

   ![image](../../../_assets/datalens/concepts/selector-1.png)

2\. Let's add a **tutorial 2 — Manual input** selector of the **Manual input** type to the dashboard. In the selector parameters, select the **Calendar** element type and the `Date` field.

   ![image](../../../_assets/datalens/concepts/selector-2.png)

3\. Let's establish a link between the **tutorial 2 — Manual input** selector and the **tutorial 2 — Table** chart using an alias. When creating an alias, select the `Date` field in the selector and the `Date 2` field in the `tutorial 2` dataset.

   ![image](../../../_assets/datalens/concepts/alias-date-1.png)

As a result, the **tutorial — Date** selector filters the **tutorial — Line chart** chart, and the **tutorial 2 — Manual input** selector filters the **tutorial 2 — Table** chart.

   ![image](../../../_assets/datalens/concepts/charts-2.png)

4\. Let's establish a link between the **tutorial 2 — Manual input** selector and the **tutorial 2 — Line chart** chart using an alias. When creating an alias, select the `Date` field in the selector and the `Date` field in the `tutorial` dataset.

   ![image](../../../_assets/datalens/concepts/alias-date-2.png)

Setting a link between the **tutorial 2 — Manual input** selector and the **tutorial — Line chart** chart links the **tutorial 2 — Manual input** and **tutorial — Date** selectors. This happens because the **tutorial — Line chart** chart and the **tutorial — Date** selector are based on the same dataset. As a result, any selector causes the appropriate values to be set automatically in the other selector and both charts' filters. To unlink the selectors, set their link type to **Not linked**.

{% endcut %}

When adding an alias, make sure the field the selector uses for filtering is included in the dataset used to build the chart. Otherwise, the link will not work.