# Insert Column

Columns can be inserted dynamically at runtime. The definition of the column to be inserted is the same as in the column array specified at initialization.

Use the `insertColumn()` methods to insert a column with its configuration.

## Example

```live
<style>
	atlas-blotter {
		height: 200px;
	}
</style>
<button id="insert_col_btn">Insert Column</button>
<br><br>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["id"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 6 });
	var configObj = {
		columns: [
			{title: "Column 1", minWidth: 100, field: fields[0]},
			{title: "Column 2", minWidth: 100, field: fields[0]}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;

	var idRunner = 2;

	addingStyles = {
		backgroundColor: "#32ab60",
		color: "white"
	};

	insertingStyles = {
		backgroundColor: "#db4052",
		color: "white"
	};

	document.getElementById("insert_col_btn").addEventListener("click", function() {
		idRunner++;
		var lastIndex = grid.api.getColumnCount - 1;
		grid.api.insertColumn({title: "Column "+idRunner, minWidth: 100, field: fields[0], styles: insertingStyles}, lastIndex);
	});
</script>
```
