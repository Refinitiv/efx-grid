# EF Checkbox Formatter

This formatter creates a [ef-checkbox](https://ui.refinitiv.com/elements/checkbox) which will be unchecked by default.

## Example

```live
<style>
	efx-grid {
		height: 320px;
	}
</style>
<efx-grid id="grid"></efx-grid>

<script>
	var fields = ["word"];
	var records = DataGenerator.generateRecords(fields, { seed: 1, numRows: 20 });

	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{
				alignment: "c",
				field: "myCheckBoxState",
				width: 34,
				binding: EFCheckboxFormatter.create({
					events: {
						"click": function(e) {
							console.log("clicked");
						}
					}
				})
			},
			{
				name: "Grid Checkbox State",
				field: "myCheckBoxState",
				alignment: "c",
			},
			{
				name: "Text",
				field: fields[0],
				alignment: "c",
			}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Checkbox with a label

```live
<style>
	efx-grid {
		height: 320px;
	}
</style>
<efx-grid id="grid"></efx-grid>

<script>
	var fields = ["word", "words"];
	var records = DataGenerator.generateRecords(fields, { seed: 1, numRows: 20 });

	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{
				alignment: "l",
				field: "myCheckBoxState",
				width: 150,
				binding: EFCheckboxFormatter.create({
					events: {
						"click": function(e) {
							console.log("clicked");
						}
					},
					labelField: "word"
				})
			},
			{
				name: "Grid Checkbox State",
				field: "myCheckBoxState",
				alignment: "c",
			},
			{
				name: "Text",
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
