# Basic Sorting

Grid support sorting out of the box. By default, sorting is turned off for all columns. To turn it on, set `sortableCoumns` to `true`. This allow users to click at the Grid header section to sort the clicked column.

```js
var config = {
	// any other grid's options
	sorting: {
		sortableColumns: true,
	}
}
```

To turn the sorting on or off for a specific column, the `sortable` option is available in the column option.

```js
var config = {
	// any other grid's options
	columns: [
		{ name: "Column 1", field: "field1", sortable: true },
		{ name: "Column 2", field: "field2" },
	],
}
```

In some use cases, you may want to turn on sorting for a particular column based on another field. If so, you can set `sortBy` in the column option to any column field.

```js
var config = {
	// any other grid's options
	sorting: {
		sortableColumns: true,
	},
	columns: [
		{ name: "Column 1", field: "field1" },
		{ name: "Column 2", field: "field2", sortBy: "field1" },
	],
}
```

## Sorting programmatically

Use `sortColumn` from Grid `api` instance to sort the specified column without user interaction. If the second parameter is not defined, Grid will cycle through column sorting sequence defined in its settings. 

```js
var grid = document.getElementById("grid");
grid.api.sortColumn(0, "a"); // Sort column index 0 in ascending order.
grid.api.sortColumn(1); // Sort column index 1 and cycle through its sorting sequence.
```

For all available sorting options and APIs, please visit [SortableTitlePlugin](../apis/composite_grid/tr.grid.SortableTitlePlugin.md)

## Example

```live
<style>
	html hr {
		margin: 5px;
	}
	atlas-blotter {
		height: 200px;
	}
</style>
<button id="sort_btn1">Sort Column 1</button>
<button id="sort_btn2">Sort Column 2</button>
<hr>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	document.getElementById("sort_btn1").addEventListener("click", function(e){
		grid.api.sortColumn(0);
	});
	document.getElementById("sort_btn2").addEventListener("click", function(e){
		grid.api.sortColumn(1);
	});
	
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 10 });
	var configObj = {
		sorting: {
			sortableColumns: true,
		},
		columns: [
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 120},
			{name: "Last", field: fields[2], width: 100},
			{name: "Net. Chng", field: fields[3], width: 100},
			{name: "Industry", field: fields[4]}
		],
		dataModel: {
			data: records
		}
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
