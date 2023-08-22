# Percent Bar Formatter

This formatter creates a percent bar.

## Specific options

| Name | Type | Attributes | Default | Description |
| --- | --- | --- | --- | --- |
| alignment | string | optional | "left" | Possible values are l, r, c, left, right, and center |
| movementColor | boolean | optional | true | If disabled, percent bar will not use up and down colors |
| barColor | string | optional | "" | Custom color for bar element | This will override the movemoveColor |
| textHidden | boolean | optional | false | If enabled, text label will not be shown |
| textWidth | number or string | optional | 56 | Number of pixel or percentage width |


## Example

```live
<style>
	efx-grid {
		height: 320px;
	}
</style>
<efx-grid id="grid"></efx-grid>

<script>
	var fields = ["myPercent", "word"];
	var num = -100;
	DataGenerator.addFieldInfo("myPercent", function(e) {
		return num += 5;
	});
	
	var records = DataGenerator.generateRecords(fields, { seed: 1, numRows: 40 });
	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{
				name: "Percent bar (Default)",
				field: fields[0],
				alignment: "c", 
				binding: PercentBarFormatter.create()
			},
			{
				name: "Center alignment + No Movement Color",
				field: fields[0],
				alignment: "c",
				binding: PercentBarFormatter.create({
					alignment: "c",
					movementColor: false
				})
			},
			{
				name: "No Label + Custom Color",
				field: fields[0],
				alignment: "c",
				binding: PercentBarFormatter.create({
					alignment: "r",
					textHidden: true,
					barColor: "purple"
				})
			}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```