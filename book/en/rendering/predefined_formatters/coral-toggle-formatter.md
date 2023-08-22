# Coral Toggle Formatter

This formatter creates a toggle. The toggle will be off by default.

> Note: the `coral-toggle` element is available in ELF v4 only, so CoralToggleFormatter will only work when using with ELF v4.

## Specific options

There are no specific options for this formatter.

## Example

```live(formatters)
<style>
	atlas-blotter {
		height: 320px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["boolean"];
	var records = tr.DataGenerator.generateRecords(fields, { seed: 1, numRows: 100 });

	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{
				name: "No Label",
				alignment: "c",
				field: fields[0],
				width: 100,
				binding: tr.CoralToggleFormatter.create({
					events: {
						"click": function(e) {
						}
					}
				})
			},
			{
				name: "With Label",
				alignment: "c",
				field: fields[0],
				width: 100,
				binding: tr.CoralToggleFormatter.create({
					attributes: {
						"label": "OFF",
						"checked-label": "ON"
					}
				})
			},
			{
				name: "Checked",
				field: fields[0],
				alignment: "c"
			}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
