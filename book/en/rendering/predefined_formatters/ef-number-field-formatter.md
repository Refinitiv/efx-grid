# EF Number Field Formatter

This formatter creates a [ef-number-field](https://ui.refinitiv.com/elements/number-field) without a margin and 100% width. By default the input's value will be the column's field.

## Example

```live
<style>
	efx-grid {
		height: 320px;
	}
</style>
<efx-grid id="grid"></efx-grid>

<script>
	var fields = ["number_1"];
	var records = DataGenerator.generateRecords(fields, { seed: 1, numRows: 20 });

	var configObj = {
		columns: [
			{ 
				name: "Number",
				field: fields[0],
				sort: fields[0],
				alignment: "c"
			},
			{ 
				name: "Simplest",
				field: fields[0],
				sort: fields[0],
				binding: EFNumberFieldFormatter.create()
			},
			{
				name: "Some options (Step)",
				field: fields[0],
				sort: fields[0],
				binding: EFNumberFieldFormatter.create({
					attributes: {
						step: 100
					}
				})
			}
		],
		extensions: [],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```