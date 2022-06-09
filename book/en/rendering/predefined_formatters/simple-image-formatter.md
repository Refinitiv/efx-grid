# Simple Image Formatter

This formatter creates an image from the column's field by default.

## Example

```live(formatters,mock-jet)
<style>
	efx-grid {
		height: 320px;
	}
</style>
<efx-grid id="grid"></efx-grid>

<script>
	var fields = ["image", "s_image"];
	var records = new Array(40);
	for(var i = 0; i < 40; ++i) {
		var record = records[i] = {};
		record[fields[0]] = "https://dummyimage.com/40x40&text=" + i;
		record[fields[1]] = "https://dummyimage.com/15x15&text=" + i;
	}
	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{
				title: "Image",
				field: fields[0],
				alignment: "c",
				binding: SimpleImageFormatter.create()
			},
			{
				title: "Small Image",
				field: fields[1],
				alignment: "c",
				binding: SimpleImageFormatter.create()
			}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```