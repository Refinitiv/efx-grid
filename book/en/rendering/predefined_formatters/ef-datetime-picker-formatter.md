# EF DateTime Picker Formatter

This formatter creates [ef-datetime-picker](https://ui.refinitiv.com/elements/datetime-picker) without margin. 

## Example

```live
<style>
	efx-grid {
		height: 320px;
	}
</style>
<efx-grid id="grid"></efx-grid>

<script>
	var fields = ["date"];
	var records = DataGenerator.generateRecords(fields, { seed: 1, numRows: 20 });

	var configObj = {
		columns: [
			{ 
				name: "Data",
				field: fields[0],
				sortBy: fields[0],
				alignment: "c",
				binding: function(e) {
					var value = e["data"];
					var cell = e["cell"];
					cell.setContent(value.toDateString());
				}
			},
			{ 
				name: "Simplest",
				field: fields[0],
				sortBy: fields[0],
				alignment: "c",
				binding: EFDateTimePickerFormatter.create()
			},
			{
				name: "Some options",
				field: fields[0],
				sortBy: fields[0],
				alignment: "c",
				binding: EFDateTimePickerFormatter.create({
					attributes: {
						format: "yyyy-MM-dd"
					},
					styles: {
						width: "120px"
					},
					events: {
						"value-changed": function(e) {
							// console.log("value changed: " + e.detail.value);
						}
					}
				})
			}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```