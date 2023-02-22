# Server-side Sorting

In manual sorting mode, clicking on the column title will change the sorting status, but no actual sorting is done on the grid data.

One use case is, if you want to do server-side sorting, you can use manual sorting mode in conjunction with the `columnSorted` event and the [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) method.

To turn manual sorting on, set `indicatorOnly` to `true`.

```js
var config = {
	// any other grid's options
	sorting: {
		sortableColumns: true,
		indicatorOnly: true
	}
}
```

You also need to listen to `columnSorted` event in order to trigger server-side sorting. The event can be listened from the shortcut in `sorting` config or through the built-in plugin.

```js
function onColumnSorted (evtArg) {
	var sortingStates = grid.api.getSortingStates();
	var sortingState = sortingStates[0];
	var sortOrder = sortingState.order;
	// At this point, you may request sorted data from the server.
}

var config = {
	// any other grid's options
	sorting: {
		columnSorted: onColumnSorted
	}
};

// Alternatively you can listen to the event directly from the built-in plugin
grid.addEventListener("configured", function(e) {
	var core = e.detail.api.getCoreGrid();
	var plugin = core.getPlugin("SortableTitle");
	// plugin.listen("columnSorted", onColumnSorted);
});
```

You can see all possible values for the sort order [here](../apis/composite_grid/tr.grid.SortableTitlePlugin.html#~SortOrder).

## Example

```live
<style>
	html hr {
		margin: 5px;
	}
	atlas-blotter {
		height: 200px;
	}
	textarea {
		width: 100%;
		height: 50px;
		margin-bottom: 30px;
	}
</style>
<button id="sort_btn1">Sort Column 1</button>
<button id="sort_btn2">Sort Column 2</button>
<hr>
<atlas-blotter id="grid"></atlas-blotter>
<hr>
<textarea id="output_ta" placeholder="Click at the grid header to sort"></textarea>

<script>
	document.getElementById("sort_btn1").addEventListener("click", function(e){
		grid.api.sortColumn(0); // Cycle through sorting sequence
	});
	document.getElementById("sort_btn2").addEventListener("click", function(e){
		grid.api.sortColumn(1); // Cycle through sorting sequence
	});

	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 10 });
	var configObj = {
		sorting: {
			sortableColumns: true,
			indicatorOnly: true,
			columnSorted: function(evtArg) {
				var core = grid.api.getCoreGrid();
				var plugin = core.getPlugin("SortableTitle");
				var objs = plugin.getSortedColumns();
				var obj = objs[0];
				var field = grid.api.getColumnField(obj.colIndex);
				var sortOrder = (obj.sortOrder === "a") ? "ascending" : "decending";
				
				var ta = document.getElementById("output_ta");
				ta.value = "Field " + field + " is sorted in " + sortOrder + " order\n" + ta.value;

				// At this point, you may request sorted data from the server.
			}
		},
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

<br><br>
