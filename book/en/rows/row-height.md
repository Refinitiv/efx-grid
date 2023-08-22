# Row - Row Height

The height of content rows can be adjusted using the `rowHeight` property. Since Grid uses a row virtualization rendering technique, all of the rows must have the same height by default.

```live
<style>
	atlas-blotter {
		height: 200px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 6 });
	var configObj = {
		rowHeight: 60,
		columns: [
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 100},
			{name: "Last", field: fields[2], width: 80},
			{name: "Net. Chng", field: fields[3], width: 80},
			{name: "Industry", field: fields[4]}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

## Variable row height

If you want to wrap long text content in the grid's cell, use the [Content Wrap Extension](../extensions/tr-grid-content-wrap.md). The extension will wrap text content that exceeds the cell width, making Grid act as if it is a native table.

However, text wrapping is resource-intensive, so it is turned off by default. To specify the column to be wrapped, set `contentWrap` to true in the column configuration.

```live
<style>
	atlas-blotter {
		height: 200px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 6 });
	var configObj = {
		columns: [
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 100},
			{name: "Last", field: fields[2], width: 80},
			{name: "Net. Chng", field: fields[3], width: 80},
			{name: "Industry", field: fields[4], width: 100, contentWrap: true}
		],
		staticDataRows: records,
		extensions: [
			new tr.ContentWrapExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
