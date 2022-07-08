# Handling 50,000 Rows

Grid utilizes a virtual rendering technique that renders a range of visible rows and uses/shares the same cells across multiple rows. This allows you to display an extraordinarily large number of rows on the grid, as shown in the example below.

> Note that by default, the grid's wheel scrolling behavior will skip multiple rows based on the total number of rows, to avoid small and tiresome scrolling. Use the `linearWheelScrolling` flag to enable native wheel scrolling behavior.

## Example

```live
<style>
	atlas-blotter {
		height: 500px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	tr.DataGenerator.addFieldInfo("rowNumber", {
		type: "function",
		generate: function(info, seed) {
			return ++info.count;
		},
		count: 0,
	});
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry", "rowNumber"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 5000 });
	var configObj = {
		linearWheelScrolling: true,
		columns: [
			{name: "ID", field: fields[5], alignment: "center", width: 80},
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 120},
			{name: "Last", field: fields[2], width: 100},
			{name: "Net. Chng", field: fields[3], width: 100},
			{name: "Industry", field: fields[4]}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
