# Default Sort

You can sort data in the grid automatically after initialization by specifying the `initialSort` option, which receives the following two options: `colIndex` and `sortOrder`.

The possible values of `sortOrder` are:
- *a* for Ascending
- *d* for Descending
- *n* for Neutral

You can see all possible values for the sort order [here](../apis/composite_grid/tr.grid.SortableTitlePlugin.html#~SortOrder).

```js
var config = {
	// any other grid's options
	sorting: {
		sortableColumns: true,
		initialSort: {
			colIndex: 0,
			sortOrder: "d"
		}
	}
}
```

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
			initialSort: {
				colIndex: 0, // Column index
				sortOrder: "d"
			}
		},
		rowHighlight: true,
		columns: [
			{title: "Company", field: fields[0]},
			{title: "Market", field: fields[1], width: 120},
			{title: "Last", field: fields[2], width: 100},
			{title: "Net. Chng", field: fields[3], width: 100},
			{title: "Industry", field: fields[4]}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
