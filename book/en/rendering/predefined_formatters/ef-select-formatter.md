# EF Select Formatter

This formatter creates [ef-select](https://ui.refinitiv.com/elements/select) without margin. Its options come from passed `options.data`.

## Specific options

| Name   | Type   | Attributes | Description                                             |
| ------ | ------ | ---------- | ------------------------------------------------------- |
| data   | Array  | required   | List of items, see [ef-select](https://ui.refinitiv.com/elements/select) for more detail. |

## Example

```live
<style>
	efx-grid {
		height: 320px;
	}
</style>
<efx-grid id="grid"></efx-grid>

<script>
	var currencies = ["THB", "AUD", "USD", "YEN", "TWD"];
	DataGenerator.addFieldInfo("currency", { type: "set", members: currencies});

	var fields = ["currency"];
	var records = DataGenerator.generateRecords(fields, { seed: 1, numRows: 20	});
	
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
				binding: EFSelectFormatter.create({
					entries: currencies
				})
			},
			{ 
				name: "Some options",
				field: fields[0],
				sort: fields[0],
				alignment: "c",
				binding: EFSelectFormatter.create({
					data: currencies,
					attributes: {

					},
					styles: {
						width: "80px"
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