# EF Combo Box Formatter

This formatter creates a [ef-combo-box](https://ui.refinitiv.com/elements/combo-box) without margin. Its options come from passed `options.data`.

## Specific options

| Name   | Type   | Attributes | Description                                             |
| ------ | ------ | ---------- | ------------------------------------------------------- |
| data   | array  | required   | List of items, see [ef-combo-box](https://ui.refinitiv.com/elements/combo-box) for more detail. |

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
	DataGenerator.addFieldInfo("currency", { type: "set", members: currencies });

	var fields = ["number_1", "boolean", "currency"];
	var records = DataGenerator.generateRecords(fields, { seed: 1, numRows: 20 });
	
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
				title: "Select",
				field: fields[2],
				alignment: "center",
				binding: EFComboBoxFormatter.create({
					data: currencies
				})
			}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```