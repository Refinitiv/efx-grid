# Row - Show/Hide

Content rows can be hidden and shown based on their row ID, and an additional API unhides all currently hidden rows.

> **Note:** In most cases, the row ID is not equivalent to the row index. It can, however, be retrieved if you know the index (refer to the JavaScript section in the demo).

Both the `showRows()` and `hideRows()` APIs accept either an individual value (string or integer) or an array of values.  This kind of state is independent of the programmatic filtering of content, and will correctly reclassify hidden rows on sorting/grouping.

## Example

```live
<style>
	atlas-blotter {
		height: 200px;
	}
</style>
<button id="hide_btn">Hide First 3 Rows</button>
<button id="show_btn">Show Rows</button>
<button id="clear_btn">Unhide All</button>
<br><br>
<atlas-blotter id="grid"></atlas-blotter>
<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 10 });
	var configObj = {
		columns: [
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 100},
			{name: "Last", field: fields[2], width: 80},
			{name: "Net. Chng", field: fields[3], width: 80},
			{name: "Industry", field: fields[4]}
		],
		dataModel: {
			data: records
		}
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
	var rowId1, rowId2, rowId3;
	document.getElementById("hide_btn").addEventListener("click", function() {
			// Hide rows at index 0 and 1 (rowIds are "0" and "1" respectively since rows haven"t been sorted/filtered)
			var dataView = grid.api.getDataView();
			rowId1 = dataView.getRowId(0);
			rowId2 = dataView.getRowId(1)
			rowId3 = dataView.getRowId(2)
			grid.api.hideRows([rowId1, rowId2, rowId3]);
	});
	
	document.getElementById("show_btn").addEventListener("click", function() {
			grid.api.showRows([rowId1, rowId2]);
	});
	
	document.getElementById("clear_btn").addEventListener("click", function() {
			// Unhide all currently hidden rows
			grid.api.unhideAllRows();
	});
</script>
```
