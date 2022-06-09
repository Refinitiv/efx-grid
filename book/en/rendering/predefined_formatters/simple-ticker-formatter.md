# Simple Ticker Formatter

This formatter creates a ticker column.

## Specific options

| Name   | Type   | Attributes | Description	|
| ------ | ------ | ---------- | -------------- |
| negativeColor   | string | optional   | Color code		  |
| positiveColor   | string | optional   | Color code		  |

## Example

```live
<style>
	efx-grid {
		height: 320px;
	}
</style>
<efx-grid id="grid"></efx-grid>

<script>
	var fields = ["last", "changes", "percent", "tick_1"];
	var records = new Array(40);
	for(var i = 0; i < 40; ++i) {
		var changes = i * (i % 7) - i % 13;
		var last = 5 + i % 13;
		var percent = (changes / last) * 100;
		var tick;
		if (percent > 0) {
			tick = 1;
		} else if (percent < 0) {
			tick = -1;
		} else {
			tick = 0;
		}
		var record = records[i] = {};
		record[fields[0]] = last;
		record[fields[1]] = changes;
		record[fields[2]] = percent.toFixed(2);
		record[fields[3]] = tick;
	}
	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{ 
				title: "Last",
				field: fields[0],
				alignment: "c"
			},
			{ 
				title: "Changes",
				field: fields[1],
				alignment: "c",
			},
			{ 
				title: "Changes %",
				field: fields[2],
				alignment: "c",
			},
			{ 
				title: "Default",
				field: fields[3],
				alignment: "c",
				binding: SimpleTickerFormatter.create()
			},
			{ 
				title: "Custom",
				field: fields[3],
				alignment: "c",
				binding: SimpleTickerFormatter.create({
					negativeColor: "#FF6333",
					positiveColor: "#607EFF",
				})
			}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```