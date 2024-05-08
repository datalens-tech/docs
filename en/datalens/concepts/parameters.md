# Parameters in {{ datalens-full-name }}

A parameter is a variable that can substitute constant values in calculated fields. You can create parameters both at the [dataset level](../operations/dataset/add-parameter-dataset.md) and at the [chart level](../operations/chart/add-parameter-chart.md).

Dataset parameters are available in all charts created based on this dataset, while chart parameters are only available in the chart they are created in. The default value for a dataset parameter can be [overridden](../operations/chart/add-parameter-chart.md#change-value) at the chart level.

## Using parameters {#using-params}

With dataset or chart parameters, you can manage formulas and change visualization in a chart.
The saved dataset parameters are propagated to all charts based on this dataset when they are uploaded.

You can edit parameter values on dashboards using selectors with manual input. However, you cannot do the following:

* Use the **Multiple choice** option.
* Choose an operation in a selector (leave a dash in the selection field of the **Operation** drop-down list).
* When using a selector based on a dataset parameter, you must unlink the selector from any others on the dashboard tab (set **Ignore** as your [link](../dashboard/link.md) type).

You can also specify parameter values in chart links. To do this, add `?` at the end of a URL, write the parameter name without spaces after the URL, put `=`, and specify the parameter value without spaces. You can list multiple parameters in a URL using `&` as a separator. 

To use a chart with a parameter:

1. Add a parameter to a [dataset](../operations/dataset/add-parameter-dataset.md) or [chart](../operations/chart/add-parameter-chart.md).
1. [Place your chart](../operations/dashboard/add-chart.md) on a dashboard.
1. [Add a selector](../operations/dashboard/add-selector.md) to the dashboard to manage the chart parameter:

   * Select **Manual input**.
   * In the **Field or parameter name** field, enter the name of the parameter from the chart.
   * Leave a dash in the selection field of the **Operation** drop-down list.
   * In the **Default value** field, specify the value to propagate in the chart parameter.
   * Enter the selector **Name** to display on the dashboard.

   By changing selector values, you can customize visualization in the chart through the parameter.


## Limitations {#restrictions-params}

When using parameters, keep in mind the following parameter naming restrictions:

* A parameter name may only contain Latin letters (both uppercase and lowercase), numbers, hyphens (`-`), and underscores (`_`).
* The name may not be longer than 36 characters.
* It may not start with an underscore: `_name`.
* The following parameter names are reserved and cannot be used: `tab`, `state`, `mode`, `focus`, `grid`, `tz`, `from`, and `to`.
* Parameter names are case-sensitive, which means `Test` and `test` are two different parameters.
* Parameter names cannot be the same as dataset field names.
* After adding a parameter to a dataset, make sure to save charts in the wizard again.
* If a dataset and a chart have parameters with the same name, the parameter from the chart is ignored.

#### See also {#see-also}

* [{#T}](../operations/dataset/add-parameter-dataset.md)
* [{#T}](../operations/chart/add-parameter-chart.md)
