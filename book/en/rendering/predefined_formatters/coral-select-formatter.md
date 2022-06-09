# Coral Select Formatter

This formatter creates `coral-select` without margin. Its options come from passed `options.data`.

## Specific options

| Name   | Type   | Attributes | Description                                             |
| ------ | ------ | ---------- | ------------------------------------------------------- |
| data   | Array  | required   | List of items, similar format to [coral-list](https://elf.int.refinitiv.com/elements/coral-list.html)  |

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
				binding: tr.CoralSelectFormatter.create({
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