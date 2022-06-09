# Predefined Formatter

## The basics

The simplest way to get the basic formatter is by calling `create()` without options, for example `SimpleInputFormatter.create()`. Then pass it to Grid using configuration, as shown below:

```js
var config = {
	columns: [{
		name: "Company Info",
		field: "info",
		binding: SimpleInputFormatter.create()
	}, {
		name: "Currency",
		field: "currency",
		binding: EFSelectFormatter.create()
	}, {
		name: "DatePicker",
		field: "date",
		binding: EFDateTimePickerFormatter.create()
	}]
}
```

Formatter with default options supports basic functioning and can be used for general usage. For input formatters, like `SimpleInputFormatter`, `EFTextFieldFormatter`, `EFComboBoxFormatter`, and so on, when the value has changed the new value will be saved to the `dataTable` of Grid. See basic formatters in the below example:

```live
<style>
	efx-grid {
		height: 320px;
	}
</style>
<efx-grid id="grid"></efx-grid>

<script>
	var currencies = ["THB", "AUD", "USD", "YEN", "TWD"];
	DataGenerator.addFieldInfo("currency", { type: "set", members: currencies});

	var fields = ["number_1", "currency", "CF_NETCHNG"];
	var records = DataGenerator.generateRecords(fields, { seed: 1, numRows: 20 });
	var configObj = {
		columns: [
			{
				name: "SimpleLink",
				field: fields[0],
				alignment: "center",
				binding: SimpleLinkFormatter.create()
			},
			{
				name: "Input",
				field: fields[0],
				alignment: "center",
				binding: EFNumberFieldFormatter.create()
			},
			{
				name: "Select",
				field: fields[1],
				alignment: "center",
				binding: EFSelectFormatter.create({
					data: currencies
				})
			},
			{
				name: "PercentBar",
				field: fields[2],
				alignment: "center",
				binding: PercentBarFormatter.create()
			}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

## Advance usage

Customizations are allowed through various options, as detailed in the following sections.

### Common options

There are some options that are available for all formatters, see the below table for more details.

| Name              | Type     | Attributes | Description |
| ----------------- | -------- | ---------- | ---------   |
| attributes        | Object   | optional   | List of attributes name and values  |
| styles            | Object   | optional   | List of inline styles for the element |
| events            | Object   | optional   | List of event names and listeners |
| disablingField    | string   | optional   | Field to be used for representing disabled attribute of the element |
| errorField        | string   | optional   | Field to be used for representing error attribute of the element |
| onElementRendered | Function | optional   | Event handler after default rendering. It is useful for additional styling |

> Note: The available value for each option is dependent on the type of element. In the case of the EF element, more information about attributes and events can be found [here](https://ui.refinitiv.com).

Below is an example of showing a button with a label, icon, light coral background color, and listen for click and active-changed event.

```js
var config = {
	columns: [{
		name: "Number",
		field: "number",
		binding: EFButtonFormatter.create({
			label: "More detail",
			attributes: {
				"icon": "info"
			},
			styles: {
				"background": "lightcoral"
			},
			events: {
				"active-changed": function(e, context) { // Custom event exposed by the element

				},
				"click": function(e, context) { // Native events are also supported

				}
			},
			onElementRendered: function(element, context) {

			}
		})
	}]
}
```

### Event listener's parameters

Available parameters for all listeners are described below:

| Name        | Type   | Description |
| ----------- | ------ | ----------- |
| event       | Event  | Native event argument object |
| context	    | Object | Context object, contains all kind of information and methods |

> Context object also contains information about the position of the element (the same information from [getRelativePosition](../apis/rt_grid/Grid.md) method).

### Context object methods

Context object also provides helper methods as shown below:

| Name                  | Description |
| -----------           | ----------- |
| getData(field)        | Get field value from the current row |
| setData(field, value) | Set field value to the current row |
| isElementDisabled()   | Get data from the disablingField of the current row |
| disableElement(bool)  | Set data to the disablingField of the current row |
| getError()            | Get data from the errorField of the current row |
| setError(value)       | Set data to the errorField of the current row |

### Specific Options

The specific options for each formatters are separately described on each formatter page.
