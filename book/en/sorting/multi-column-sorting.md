# Multi-column/Three-state Sorting

Sorting can be done on several columns together. You need to add the `sorting` property with two sub-properties: `multiColumn` and `threeStateSorting`.

The property `threeStatesSorting` allows the column to be reset to the neutral state at every third click. Turning on `threeStatesSorting` makes multi-column sorting easier to use.

```js
var config = {
	// ... other config
	sorting: {
		sortableColumns: true,
		multiColumn: true,
		threeStatesSorting: true
	}
}
```

## Initial Sort for Multiple Column

It is possible to set the initial sort with `multiColumn` enabled. We can use `initialSort` to define an array of [SortableTitlePlugin.InitialSort](../apis/composite_grid/tr.grid.SortableTitlePlugin.html#~InitialSort).

> If `multiColumn` is not enabled, the `initialSort` will only take the first object of an array into consideration.

```js
var config = {
	// any other grid's options
	sorting: {
		sortableColumns: true,
		multiColumn: true,
		initialSort: [{
			colIndex: 0,
			sortOrder: "d"
		}, {
			colIndex: 1,
			sortOrder: "d"
		}]
	}
}
```

## Multiple Column Sort with API

```js
var grid = document.getElementById("grid");
var sort = grid.api.getCoreGrid().getPlugin("SortableTitle");
sort.sortColumns([
	{
		colIndex: 0, // Column index 0 with order descending.
		sortOrder: "d"
	}, {
		colIndex: 1, // Column index 1 with order descending
		sortOrder: "d"
	}
]);
```

For all available options and APIs, please visit [SortableTitlePlugin](../apis/composite_grid/tr.grid.SortableTitlePlugin.md)

## Example

```live
<style>
	atlas-blotter {
		height: 200px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 10 });
	var configObj = {
		sorting: {
			sortableColumns: true,
			multiColumn: true,
			threeStatesSorting: true
		},
		rowHighlight: true,
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
</script>
```
