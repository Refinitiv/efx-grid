# Event handling and event listeners in formatter

If your custom formatter contains some input elements or controls, it's important to bind data back to Grid's internal data source when users input new data through the UI from your custom formatter. Remember, the same element will be used on different rows due to the row virtualization mechanic. If the data is changed by user actions, you need to update the change back to Grid's data source, or else the binding mechanism will replace what the user has changed with the data stored from the Grid's internal source. 

In short, data should be updated after users interact with the UI input. `getRelativePosition()` method should be used to resolve current positions relative to the grid element.

> APIs for data manipulation can be found [here](../data/update.md). APIs for Grid and `getRelativePosition()` method description can be found [here](../apis/rt_grid/Grid.md).

## The 'reverted' problem

When we don't set data back, row virtualization will not work properly and content will not be rendered properly. Suppose that we have a dropdown element in one of the grid columns. Any change that is done to the dropdown box will be reverted if we don't update the data.

In the live example below, try the following steps to produce the problem:
1. Change the selected option from the dropdown box on the first row. Remember the new selected option
2. Scroll down to the bottom of the grid
3. Scroll back up to the top of the grid

```live
<style>
	atlas-blotter {
		height: 200px;
		margin-bottom: 40px;
	}
</style>
<atlas-blotter></atlas-blotter>

<script>
	var fields = ["id", "dropdownVal", "boolean", "text"];
	// For static data initialization
	var records = [];
	for (var i = 0; i < 50; i++) {
		var record = {};
		record[fields[0]] = i;
		record[fields[1]] = i % 4; 
		record[fields[2]] = i & 1 ? true : false;
		record[fields[3]] = i + " Some Texts";
		records.push(record);
	}

	var dropdownFormatter = function(e) {
		var cell = e.cell;
		var dropdown = cell.getContent();
		if (!dropdown || !dropdown._myDropdown) {
			dropdown = document.createElement("select");
			dropdown._myDropdown = true;
			[0, 1, 2, 3].forEach(function(val) {
				var option = document.createElement("option");
				option.value = val;
				option.textContent = "Value " + val;
				dropdown.appendChild(option);
			});
		}
		
		dropdown.selectedIndex = e.data;
		cell.setContent(dropdown);
	};

	var configObj = {
		columns: [
			{ title: "Row Index", field: fields[0], width: 80 },
			{ title: "Dropdown", field: fields[1], binding: dropdownFormatter },
			{ title: "Dropdown Value", field: fields[1] },
			{ title: "Column 3", field: fields[2], alignment: "center" },
			{ title: "Column 4", field: fields[3] }
		],
		staticDataRows: records
	};

	var grid = document.getElementsByTagName("atlas-blotter")[0];
	grid.config = configObj;
</script>
```

You will see that the selected option is reverted back to the original option.

## The fix

To avoid the problem, we have to add an event listener to our custom formatter for binding the change from users. You have added `dropdownChangeHandler` to fix the problem as shown below:

```live
<style>
	atlas-blotter {
		height: 200px;
		margin-bottom: 40px;
	}
</style>
<atlas-blotter></atlas-blotter>

<script>
	var fields = ["id", "dropdownVal", "boolean", "text"];
	// For static data initialization
	var records = [];
	for (var i = 0; i < 50; i++) {
		var record = {};
		record[fields[0]] = i;
		record[fields[1]] = i % 4; 
		record[fields[2]] = i & 1 ? true : false;
		record[fields[3]] = i + " Some Texts";
		records.push(record);
	}

	// Show how to render custom content with an event listener
	var dropdownFormatter = function(e) {
		var cell = e.cell;
		var dropdown = cell.getContent();
		if (!dropdown || !dropdown._myDropdown) {
			dropdown = document.createElement("select");
			dropdown._myDropdown = true;
			[0, 1, 2, 3].forEach(function(val) {
				var option = document.createElement("option");
				option.value = val;
				option.textContent = "Value " + val;
				dropdown.appendChild(option);
			});
			
			dropdown.addEventListener("change", dropdownChangeHandler);
		}
		dropdown.selectedIndex = e.data;
		cell.setContent(dropdown);
	};
	// Show how to set data based on interaction from custom content
	var dropdownChangeHandler = function(e) {
		var dropdown = e.currentTarget;
		var selectedIndex = +(dropdown.options[dropdown.selectedIndex].value);

		var pos = grid.api.getRelativePosition(e);
		var rowDef = grid.api.getRowDefinition(pos.rowIndex);
		rowDef.setData(grid.api.getColumnField(pos.colIndex), selectedIndex);
	};

	var configObj = {
		columns: [
			{ title: "Row Index", field: fields[0], width: 80 },
			{ title: "Dropdown", field: fields[1], binding: dropdownFormatter },
			{ title: "Dropdown Value", field: fields[1] },
			{ title: "Column 3", field: fields[2], alignment: "center" },
			{ title: "Column 4", field: fields[3] }
		],
		staticDataRows: records
	};

	var grid = document.getElementsByTagName("atlas-blotter")[0];
	grid.config = configObj;
</script>
```

## Writing event listeners

Since the same element will be used on different rows, you cannot use closure variables that are created or given from the event arguments. Row index, column index, or cell reference must be resolved at runtime inside the event listener. You can resolve the position by using Grid's `getRelativePosition()` method.

```js
	var dropdownChangeHandler = function(e) {
		var dropdown = e.currentTarget;
		var selectedIndex = +(dropdown.options[dropdown.selectedIndex].value);

		var pos = grid.api.getRelativePosition(e);
		var rowDef = grid.api.getRowDefinition(pos.rowIndex);
		rowDef.setData(grid.api.getColumnField(pos.colIndex), selectedIndex);
	};
```

* `currentTarget` property will always give an element attached by the event listener
* `getRelativePosition()` method resolves the position when the dropdown value is changed

> See [this page](../data/update.md) on how to update data.