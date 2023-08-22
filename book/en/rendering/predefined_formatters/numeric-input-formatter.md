# Numeric Input Formatter

This formatter creates a numeric input without a margin and 100% width. By default the input's value will be the column's field.

> Note: Using the formatter with ELF v4 the input element is `coral-number-field`, but with ELF v3 the input element is `coral-input`.

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
	var fields = ["number_2", "boolean"];
	var records = tr.DataGenerator.generateRecords(fields, { seed: 1, numRows: 100 });

	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{
				name: "Number",
				alignment: "c",
				field: fields[0]
			},
			{
				name: "Numeric Input",
				field: fields[0],
				alignment: "c",
				binding: tr.NumericInputFormatter.create({
					events: {
						"click": function(e) {
						}
					}
				})
			},
			{
				name: "Disabled",
				field: fields[0],
				alignment: "c",
				binding: tr.NumericInputFormatter.create({
					disablingField: fields[1]
				})
			},
			{
				name: "Readonly",
				field: fields[0],
				alignment: "c",
				binding: tr.NumericInputFormatter.create({
					onElementRendered: function(element, ctx) {
						var field = "boolean";
						var bool = ctx.getData(field);
						if(bool) {
							element.setAttribute("readonly", "");
						} else {
							element.removeAttribute("readonly");
						}
					}
				})
			},
			{
				name: "Boolean",
				field: fields[1],
				alignment: "c"
			}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
