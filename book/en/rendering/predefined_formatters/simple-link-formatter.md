# Simple Link Formatter

This formatter creates a link with text from the column's field by default.

## Specific options

| Name      | Type   | Attributes | Description                    |
| --------- | ------ | ---------- | ------------------------------ |
| urlField  | string | optional   | Field used for href attribute  |

## Example

```live
<style>
	efx-grid {
		height: 320px;
	}
</style>
<efx-grid id="grid"></efx-grid>

<script>
	var href = "https://www.refinitiv.com/#";

	var fields = ["id", "url"];
	var records = new Array(40);
	for(var i = 0; i < 40; ++i) {
		var record = records[i] = {};
		record[fields[0]] = i;
		record[fields[1]] = "https://www.refinitiv.com/#" + i;
	}
	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{ 
				name: "Data",
				field: fields[0],
				alignment: "c"
			},
			{ 
				name: "Simplest",
				field: fields[0],
				alignment: "c",
				binding: SimpleLinkFormatter.create({
					attributes: {
						href: "https://www.refinitiv.com"
					}
				})
			},
			{ 
				name: "Some options",
				field: fields[0],
				alignment: "c",
				binding: SimpleLinkFormatter.create({
					label: "click here",
					attributes: {
						href: "https://www.refinitiv.com"
					},
					styles: {
						color: "red"
					},
					events: {
						"click": function(e) {
							console.log("clicked");
							e.preventDefault();
						}
					}
				})
			},
			{ 
				name: "Dynamic URL",
				field: fields[0],
				alignment: "c",
				binding: SimpleLinkFormatter.create({
					label: "see URL",
					urlField: fields[1]
				})
			}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```