# Hide/remove Column

You can choose to hide a column in the column definition by toggling the property `visible` between *true* and *false*. Columns can be hidden/removed dynamically at runtime. You can remove multiple columns in one method call to boost performance.

Use the `hideColumn()` method to set the visibility of the specified column (that is, hide or show the column).

Use the `removeColumn()`, `removeColumns()` or `removeAllColumns()` methods to remove the specified column(s).

## Example

```live
<style>
	atlas-blotter {
		height: 200px;
	}
</style>
<button id="hideColumnButton">Hide Column 0</button>
<button id="showColumnButton">Show Column 0</button>
<button id="showColumn5Button">Show Column 5</button>
<button id="removeColumnButton">Remove Column 0</button>
<button id="removeAllColumns">Remove All Columns</button>
<br><br>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["id" ];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 6 });
	var configObj = {
		columns: [
			{name: "Column 0", field: fields[0]},
			{name: "Column 1", field: fields[0]},
			{name: "Column 2", field: fields[0]},
			{name: "Column 3", field: fields[0]},
			{name: "Column 4", field: fields[0]},
			{name: "Column 5", field: fields[0], visible: false}
		],
		staticDataRows: records
	};

	var grid = document.getElementsByTagName("atlas-blotter")[0];
	grid.config = configObj;

	document.getElementById("hideColumnButton").addEventListener("click", function() {
		grid.api.hideColumn(0);
	});

	document.getElementById("showColumnButton").addEventListener("click", function() {
		grid.api.hideColumn(0, false);
	});

	document.getElementById("showColumn5Button").addEventListener("click", function() {
		grid.api.hideColumn(5, false);
	});

	document.getElementById("removeColumnButton").addEventListener("click", function() {
		grid.api.removeColumn(0);
	});

	document.getElementById("removeAllColumns").addEventListener("click", function() {
		grid.api.removeAllColumns();
	});
</script>
```
