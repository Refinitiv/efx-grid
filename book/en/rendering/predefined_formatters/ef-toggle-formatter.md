# EF Toggle Formatter

This formatter creates a [ef-toggle](https://ui.refinitiv.com/elements/toggle). The toggle will be off by default.

## Example

```live
<style>
	efx-grid {
		height: 320px;
	}
</style>
<efx-grid id="grid"></efx-grid>

<script>
	var fields = ["boolean"];
	var records = DataGenerator.generateRecords(fields, { seed: 1, numRows: 20 });

	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{
				name: " ",
				field: fields[0],
				sort: fields[0],
				alignment: "c",
				width: 100,
				binding: EFToggleFormatter.create({
					events: {
						"click": function(e) {
							// blotter.api.getDataView().log();
						}
					}
				})
			},
			{
				name: "Label",
				field: fields[0],
				sort: fields[0],
				alignment: "c",
				width: 100,
				binding: EFToggleFormatter.create({
					events: {
						"checked-changed": function(e) {

						}
					},
					styles: {
						width: "54px"
					},
					attributes: {
						label: "OFF",
						"checked-label": "ON"
					}
				})
			},
			{
				name: "Checked",
				field: fields[0],
				sort: fields[0],
				alignment: "c"
			}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
