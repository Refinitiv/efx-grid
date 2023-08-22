# Simple Toggle Formatter

This formatter creates a toggle column with a default "eye" icon.

## Example

```live
<style>
	efx-grid {
		height: 320px;
	}
</style>
<efx-grid id="grid"></efx-grid>

<script>
	var fields = ["toggle", "number_1"];
	var records = new Array(40);
	for(var i = 0; i < 40; ++i) {
		var record = records[i] = {};
		record[fields[0]] = i % 2 === 0;
		record[fields[1]] = i;
	}
	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{ 
				name: "",
				field: fields[0],
				alignment: "c",
				binding: SimpleToggleFormatter.create()
			},
			{ 
				name: "Column 2",
				field: fields[1],
				alignment: "c",
			}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```