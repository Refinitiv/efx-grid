# EF Radio Button Formatter

This formatter creates a [ef-radio-button](https://ui.refinitiv.com/elements/radio-button) which will be unchecked by default.

## Specific options

| Name          | Type   | Attributes | Description                                               |
| ------------- | ------ | ---------- | --------------------------------------------------------- |
| initialIndex  | number | optional   | Initial checked row index                                 |

## Example

```live
<style>
	efx-grid {
		height: 320px;
	}
</style>
<efx-grid id="grid"></efx-grid>

<script>
	var fields = ["number", "word"];
	var records = DataGenerator.generateRecords(fields, { seed: 1, numRows: 20 });

	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{
				title: " ",
				alignment: "c",
				field: "radio",
				width: 34,
				binding: EFRadioButtonFormatter.create({
					initialIndex: 0,
					events: {
						"click": function(e) {
							console.log("clicked");
						}
					}
				})
			},
			{
				title: "Number",
				field: fields[0],
				alignment: "c",
			},
			{
				title: "Description",
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