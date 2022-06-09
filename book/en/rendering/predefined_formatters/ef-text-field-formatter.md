# EF Text Field Formatter

This formatter creates a [ef-text-field](https://ui.refinitiv.com/elements/text-field) without a margin and 100% width. By default the input's value will be the column's field.

## Example

```live
<style>
	efx-grid {
		height: 320px;
	}
</style>
<efx-grid id="grid"></efx-grid>

<script>
	var fields = ["number_1", "word"];
	var records = DataGenerator.generateRecords(fields, { seed: 1, numRows: 20 });

	var configObj = {
		columns: [
			{ 
				name: "Word",
				field: fields[1],
				sort: fields[1]
			},
			{ 
				name: "Simplest",
				field: fields[1],
				sort: fields[1],
				alignment: "c",
				binding: EFTextFieldFormatter.create()
			},
			{ 
				name: "Identified field",
				field: fields[0],
				sort: fields[0],
				alignment: "c",
				binding: EFTextFieldFormatter.create({
					field: fields[1]
				})
			},
			{
				name: "Some options",
				field: fields[1],
				sort: fields[1],
				alignment: "c",
				binding: EFTextFieldFormatter.create({
					attributes: {
						icon: "edit"
					},
					events: {
						"value-changed": function(e) {
							// console.log("value changed: " + e.detail.value);
						}
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