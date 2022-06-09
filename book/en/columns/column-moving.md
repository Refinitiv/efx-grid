# Column Moving

Columns can be moved using the `grid.api.moveColumn(from, to)` API, which allows you to specify a column index or an array of column indices to be moved, and the target index position.

## Example

```live
<style>
	atlas-blotter {
		height: 200px;
	}
</style>
<button id="move_1">Move Index 0 -&gt; 2</button>
<button id="move_2">Move Index 3,4 -&gt; 1</button>
<br>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 5 });
	var configObj = {
		rowHighlight: true,
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

	document.getElementById('move_1').addEventListener('click', function() {
		grid.api.moveColumn(0, 2);
	});

	document.getElementById('move_2').addEventListener('click', function() {
		grid.api.moveColumn([3,4], 1);
	});
</script>
```
