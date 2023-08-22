# Coral Combo Box Formatter

This formatter creates a `coral-combo-box` without margin. Its options come from passed `options.data`.

## Specific options

| Name   | Type   | Attributes | Description                                             |
| ------ | ------ | ---------- | ------------------------------------------------------- |
| data   | array  | required   | List of items, similar format to [coral-list](https://elf.int.refinitiv.com/elements/coral-list.html)  |

## Example

```live(formatters)
<style>
	atlas-blotter {
		height: 320px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var currencies = ["THB", "AUD", "USD", "YEN", "TWD"];
	tr.DataGenerator.addFieldInfo("currency", { type: "set", members: currencies});

	var fields = ["number_1", "boolean", "currency"];
	var records = tr.DataGenerator.generateRecords(fields, {
		numRows: 40,
		seed: 1
	});
	
	var selectorData = currencies.map(function(data) {
		return {
			label: data,
			value: data
		};
	});

	var configObj = {
		columns: [
			{ 
				name: "Column 1",
				field: fields[0],
				alignment: "center"
			},
			{
				name: "Column 2",
				field: fields[1],
				alignment: "center"
			},
			{
				name: "Select",
				field: fields[2],
				alignment: "center",
				binding: tr.CoralComboBoxFormatter.create({
					data: selectorData
				})
			}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```