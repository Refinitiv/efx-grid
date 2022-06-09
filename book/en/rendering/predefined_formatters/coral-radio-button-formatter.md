# Coral Radio Button Formatter

This formatter creates a radio button which will be  unchecked by default.

## Specific options

| Name          | Type   | Attributes | Description                                               |
| ------------- | ------ | ---------- | --------------------------------------------------------- |
| initialIndex  | number | optional   | Initial checked row index                                 |

## Example

```live(formatters)
<style>
	atlas-blotter {
		height: 320px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["number", "word"];
	var records = tr.DataGenerator.generateRecords(fields, { seed: 1, numRows: 100 });

	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{
				alignment: "c",
				field: "radio",
				width: 34,
				binding: tr.CoralRadioButtonFormatter.create({
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