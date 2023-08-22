# Coral Button Formatter

This formatter creates a button without a margin. By default the text inside the button will be data from the column's field.

## Specific options

| Name   | Type   | Attributes | Description                                               |
|------- | ------ | ---------- | --------------------------------------------------------- |
| label  | string | optional   | Text inside the button, default text is the value from the column's field  |

## Example

```live(formatters)
<style>
	atlas-blotter {
		height: 320px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["word", "id", "float_1"];
	var records = tr.DataGenerator.generateRecords(fields, 30);
	var configObj = {
		columns: [
			{ 
				name: "Button",
				field: fields[0],
				alignment: "center",
				binding: tr.CoralButtonFormatter.create({
					label: "More Info",
					events: {
						click: function(event, context) {
							alert(
								"clicked at row: " + 
								context.rowIndex + 
								", column: " + 
								context.colIndex + 
								", data: " + 
								context.getData(context.field)
							);
						}
					}
				})
			},
			{ 
				name: "Column 2",
				field: fields[0],
				alignment: "center"
			},
			{ 
				name: "Column 3",
				field: fields[1],
				alignment: "center"
			},
			{ 
				name: "Column 4",
				field: fields[2],
				alignment: "center"
			}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```