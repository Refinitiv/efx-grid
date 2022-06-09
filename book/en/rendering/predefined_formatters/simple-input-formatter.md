# Simple Input Formatter

This formatter creates an input without a margin and 100% width. By default the input's value will be the column's field.

## Example

```live
<style>
	efx-grid {
		height: 320px;
	}
</style>
<efx-grid id="grid"></efx-grid>

<script>
	var fields = ["number_1", "float_1"];
	var records = DataGenerator.generateRecords(fields, 40);

	var configObj = {
		columns: [
			{ 
				title: "Column 1",
				field: fields[0],
				alignment: "center"
			},
			{ 
				title: "Column 2",
				field: fields[1],
				alignment: "center"
			},
			{ 
				title: "Input",
				field: fields[0],
				alignment: "center",
				binding: SimpleInputFormatter.create()
			}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
