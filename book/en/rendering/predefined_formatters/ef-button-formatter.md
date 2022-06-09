# EF Button Formatter

This formatter creates a [ef-button](https://ui.refinitiv.com/elements/button) without a margin. By default the text inside the button will be data from the column's field.

## Specific options

| Name   | Type   | Attributes | Description                                               |
|------- | ------ | ---------- | --------------------------------------------------------- |
| label  | string | optional   | Text inside the button, default text is the value from the column's field  |

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
				name: "Data",
				field: fields[0],
				sort: fields[0],
				alignment: "c"
			},
			{ 
				name: "Simplest",
				field: fields[0],
				sort: fields[0],
				alignment: "c",
				binding: EFButtonFormatter.create()
			},
			{ 
				name: "Some options",
				field: fields[0],
				sort: fields[0],
				alignment: "c",
				binding: EFButtonFormatter.create({
					label: "",
					attributes: {
						icon: "cross"
					},
					styles: {
						width: "23px"
					},
					events: {
						"click": function(e) {
							console.log("clicked");
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