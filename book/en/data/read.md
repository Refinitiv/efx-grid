# Reading or Getting Data

As Grid may need to display and store tons of rows, Grid does not provide two-way data binding or a way to directly reference the stored data. All data manipulations, such as sorting, grouping, or filtering, must be done through APIs. To access data stored inside Grid, we need to use Grid's [APIs](../apis/README.md).

## APIs

Use `getRowData(rowIndex)` to get data of the specified row.

```js
console.log(grid.api.getRowData(2));
```

Use `getMultipleRowData()` to retrieve all rows

```js
console.log(grid.api.getMultipleRowData());
```

`getMultipleRowData(rowIndices)` to get multiple row data from specific row indices at once.

```js
	grid.api.getMultipleRowData([0, 2, 4]);
```

Use `logDV()` or `logDT()` to quickly log data in **table format** to developer console

```js
console.log("=== Data View ===");
grid.api.logDV(); // Rows after sorting and filtering

console.log("=== Data Table ===");
grid.api.logDT(); // Rows in original order
```

## Example

```live
<style>
	efx-grid {
		margin-bottom: 40px;
	}
	html hr {
		margin: 5px;
	}
</style>
<button id="top_row_btn">Get Top Row Data</button>
<button id="col_btn">Get Data from Column</button>
<button id="all_btn">Get All Data</button>
<hr>
<efx-grid id="grid"></efx-grid>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = DataGenerator.generateRecords(fields, { numRows: 5 });
	var configObj = {
		columns: [
			{title: "Company", field: fields[0]},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 80},
			{title: "Net. Chng", field: fields[3], width: 80},
			{title: "Industry", field: fields[4]}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
	
	document.getElementById("top_row_btn").addEventListener("click", function(e) {
		var rowData = grid.api.getRowData(0);
		alert(JSON.stringify(rowData, function replacer(key, value) {
			if(key === "ROW_DEF") {
				return undefined;
			}
			return value;
		}));
	});
	document.getElementById("col_btn").addEventListener("click", function(e) {
		var allRowData = grid.api.getMultipleRowData();
		var columnData = allRowData.map(function toCompanyName(rowData) {
			return rowData["companyName"];
		});
		alert(JSON.stringify(columnData));
	});
	document.getElementById("all_btn").addEventListener("click", function(e) {
		var allRowData = grid.api.getMultipleRowData();
		alert(JSON.stringify(
			allRowData, 
			function replacer(key, value) {
				if(key === "ROW_DEF") {
					return undefined;
				}
				return value;
			},
			2
		));
	});
</script>
```