# Get Sorting States/Reset All

The `getSortedColumns()` method returns an array of the currently applied sorting states (with the `colIndex` and `sortOrder` properties).

Additionally, the `clearSortState()` method resets the current sorting states to their default neutral state.

A list of all sorting-related events can be found in the **Events Handling** section.

```js
var sort = grid.api.getCoreGrid().getPlugin("SortableTitle");
var states = sort.getSortedColumns(); // Return an array of the current active sorting states

sort.clearSortState(); // Reset all sorting states to neutral
```

## Example

```live
<style>
	atlas-blotter {
		height: 200px;
	}
	textarea {
		width: 100%;
		height: 50px;
		margin: 10px 0;
	}
</style>
<button id="get_btn">Get Current States</button>
<button id="reset_btn">Clear All Sorting</button>
<textarea id="output_ta" placeholder="Click at the grid header to sort"></textarea>
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
			{title: "Market", field: fields[1], width: 120},
			{title: "Last", field: fields[2], width: 100},
			{title: "Net. Chng", field: fields[3], width: 100},
			{title: "Industry", field: fields[4]}
		],
		dataModel: {
			data: records
		}
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;

	document.getElementById("get_btn").addEventListener("click", function() {
		// Return an array of the current active sorting states
		var sort = grid.api.getCoreGrid().getPlugin("SortableTitle");
		var states = sort.getSortedColumns();

		var ta = document.getElementById('output_ta');
		ta.value = JSON.stringify(states, 2, null) + "\n" + ta.value;
	});

	document.getElementById("reset_btn").addEventListener("click", function() {
		var sort = grid.api.getCoreGrid().getPlugin("SortableTitle");
		sort.clearSortState();
	});

</script>
```
