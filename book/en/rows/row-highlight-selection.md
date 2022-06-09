# Row - Highlight and Selection

Row highlighting can be turned on/off by setting the options for `rowHighlighting` to *true* and *false* respectively. Row highlighting will be turn on by default.

All related row selection functionalities can be added through the [Row Selection Extension](../extensions/tr-grid-row-selection.md).


## Example

```live
<style>
	atlas-blotter {
		height: 200px;
	}
	html hr {
		margin: 5px;
	}
</style>
<big>Hover mouse over Grid to see row highlighting</big>
<hr>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 6 });
	var configObj = {
		rowHighlighting: true, // Add This Property to turn on/off
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
