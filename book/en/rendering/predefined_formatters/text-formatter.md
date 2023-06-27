# Text Formatter

This formatter creates a simple div element with text from the column's field by default. The div element can be modified in the handler (for example, `onElementRendered`) and passed through configuration object for multiple use cases. 

## Specific options

The purpose of this formatter is creating a generic element for further modifications, so there are no specific options.

## Example

```live
<style>
	efx-grid {
		height: 320px;
	}
</style>
<efx-grid id="grid"></efx-grid>

<script>
	var fields = ["number_1", "word", "float_1"];
	var records = DataGenerator.generateRecords(fields, 40);
	
	var configObj = {
		columns: [
			{ 
				title: "Column 1",
				field: fields[0],
				alignment: "right",
				binding: TextFormatter.create()
			},
			{ 
				title: "Column 2",
				field: fields[1],
				alignment: "center",
				binding: TextFormatter.create({
					styles: {
						"backgroundColor": "thistle"
					}
				})
			},
			{ 
				title: "Big Text",
				field: fields[2],
				binding: TextFormatter.create({
					styles: {
						"fontSize": "1.5em"
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
## Formatting predefined formatter using Text Formatting Extension

When using Text Formatting Extension, by default, predefined formatter will be overwritten due to the need for rendering a formatted text by the extension. To format the text inside predefined formatter and avoid the overriding, you will need to instruct the extension on how and where to do the formatting. See [this page](../../extensions/tr-grid-textformatting.md) for more information.

In this case, you can use `onElementRendered` and Text Formatting Extension to do the formatting.

<br>
<br>
<br>
