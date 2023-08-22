# Accessing Grid data

Grid has its own data store, but you cannot directly change or get the data from the `staticDataRows` property defined in the configuration object. This is because Grid needs to perform data transformations such as sorting, filtering, grouping, and so on. Data content, row index, or references can be changed but will not be reflected back to the data in the `staticDataRows`. So, all data manipulation and accessing must be done through [APIs](../apis/README.md). 

The following are some of the commonly used APIs:

## Getters

`logDV()` and `logDT()` are used to see all visible data in a table format on the developer tool console.

```js
	grid.api.logDV(); // Log rows in the current view (i.e., rows after sorting and filtering applied)
	
	grid.api.logDT(); // Log rows in their original order
```

`getMultipleRowData()` is used to get all rows.

```js
	var rows = grid.api.getMultipleRowData();
	console.log(rows);
```

`getMultipleRowData(rowIndices)` is used to get multiple row data from specific row indices at once.

```js
	grid.api.getMultipleRowData([0, 2, 4]);
```

`getRowData(rowIndex)` is used to get row data from the specified row index.

```js
	grid.api.getRowData(rowIndex);
	
	var rowDef = grid.api.getRowDefinition(rowIndex);
	rowDef.getRowData(); // Alternatively, data can be retrieved from RowDefinition object
```

## Setters

`setRowData(rowRef, values)` is used to set multiple field values into a row at once. 

```js
	grid.api.setRowData(0, {"Field 1": 3, "Field 2": 5});
	
	var rowDef = grid.api.getRowDefinition(0);
	rowDef.setRowData({"Field 3": 7}); // Alternatively, data can be set through RowDefinition object
```

`insertRow(rowOption, rowRef)` is used for inserting a row at a specified position.

```js
	grid.api.insertRow({}, 0); // Insert an empty row as the first row
	
	grid.api.insertRow({values: {"Field 1": 3, "Field 2": 5}}); Insert a row with initial static data as the last row
```

`removeRow(rowRef)`, `removeRows(rowRefs)` and `removeAllRows()` are used to remove a single row or multiple rows.

```js	
	grid.api.removeRow(0); // Remove the first row
```

For all available APIs see this [document](../apis/README.md).

## Example

```live
<style>
	efx-grid {
		height: 169px;
	}
	html hr {
		margin: 5px;
	}
	#msg_div {
		height: 50px;
	}
</style>
<button id="insert_btn">Insert Top Row</button>
<button id="update_btn">Update Top Row</button>
<button id="print_btn">Get Top Row</button>
<hr>
<efx-grid id="grid"></efx-grid>
<hr>
<div id="msg_div"></div>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = DataGenerator.generateRecords(fields, { numRows: 5 });
	var configObj = {
		columns: [
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 120},
			{name: "Last", field: fields[2], width: 100},
			{name: "Net. Chng", field: fields[3], width: 100},
			{name: "Industry", field: fields[4]}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;

	document.getElementById("update_btn").addEventListener("click", function() {
			var record = DataGenerator.generateRecord(fields);
			grid.api.setRowData(0, record);
	});

	document.getElementById("insert_btn").addEventListener("click", function() {
		var record = DataGenerator.generateRecord(fields);
		grid.api.insertRow({values: record}, 0);
	});

	document.getElementById("print_btn").addEventListener("click", function() {
		var row = grid.api.getRowData(0);
		msg_div.textContent = row ? JSON.stringify(row, function replacer(key, value) {
			if(key === "ROW_DEF") {
				return undefined;
			}
			return value;
		}) : "";
	});
</script>
```