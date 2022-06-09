# Column Width

Column widths can be defined in the following ways:
- **No Width** If no width is specified for the column, it means the column is scalable and has a flexible size. A Grid will distribute available space among the scalable columns according to their weight. By default, all columns are equally weighted. Columns with fixed widths are not included in the distribution.
- **Minimum Width** The minimum width can be defined using the `minWidth` property. It is used when a column is scalable. It limits the column width to not go lower than the specified value.
- **Fixed Width** Width can be defined as an integer on the `width` property. The width of the column is fixed in pixel units.
- **Proportional Width** You can specify a weight to the scalable column, so the column will be resized according to its weight. First, set `scalable` property to true. Then, `width` property will be treated as a weight for the column.

To fit the column width to the column content, please use the [Column Resizing Extension](../extensions/tr-grid-column-resizing.md).

> Note: once a column is resized it will automatically have a fixed width.

## Preserving Grid's size

After column resizing if the total columns' width is less than Grid' size, there will be empty space next to last column. In contrast the horizontal scrollbar will be shown. To prevent Grid from this kind of cases the preserving Grid's size mode must be enabled, please see [Column Resizing Extension](../extensions/tr-grid-column-resizing.md) for configuration document.

## Default Grid width with default column width

```live
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 5 });
	var configObj = {
		columns: [
			{title: "Company", field: fields[0]},
			{title: "Market", field: fields[1]},
			{title: "Last", field: fields[2]},
			{title: "Net. Chng", field: fields[3]},
			{title: "Industry", field: fields[4]}
		],
		staticDataRows: records
	};
	
	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

## Fixed Grid width with default column width

```live
<style>
	atlas-blotter {
		width: 400px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>
<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 5 });
	var configObj = {
		columns: [
			{title: "Company", field: fields[0]},
			{title: "Market", field: fields[1]},
			{title: "Last", field: fields[2]},
			{title: "Net. Chng", field: fields[3]},
			{title: "Industry", field: fields[4]}
		],
		staticDataRows: records
	};
	
	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

## Fixed Grid width with fixed column width

```live
<style>
	atlas-blotter {
		width: 400px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>
<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 5 });
	var configObj = {
		columns: [
			{title: "Company", field: fields[0], width: 200},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 80},
			{title: "Net. Chng", field: fields[3], width: 80},
			{title: "Industry", field: fields[4], width: 200}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

## Default Grid width with fixed column width

```live
<atlas-blotter id="grid"></atlas-blotter>
<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 5 });
	var configObj = {
		autoHideScrollbar: false,
		columns: [
			{title: "Company", field: fields[0], width: 200},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 80},
			{title: "Net. Chng", field: fields[3], width: 80},
			{title: "Industry", field: fields[4], width: 200}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

## Fixed column width with proportional column width

```live
<atlas-blotter id="grid"></atlas-blotter>
<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 5 });
	var configObj = {
		autoHideScrollbar: false,
		columns: [
			{title: "Company", field: fields[0], width: 200},
			{title: "Market", field: fields[1], width: 1.5, scalable: true},
			{title: "Last", field: fields[2], width: 1, scalable: true},
			{title: "Net. Chng", field: fields[3], width: 1, scalable: true},
			{title: "Industry", field: fields[4], width: 1.5, scalable: true}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

## Pinning right columns

```live
<style>
	atlas-blotter {
		width: 400px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>
<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 5 });
	var configObj = {
		autoHideScrollbar: false,
		pinnedRightColumns: 1,
		columns: [
			{title: "Company", field: fields[0], width: 200},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 80},
			{title: "Net. Chng", field: fields[3], width: 80},
			{title: "Industry", field: fields[4], width: 150}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

## Pinning both sides

```live
<style>
	atlas-blotter {
		width: 500px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>
<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 5 });
	var configObj = {
		autoHideScrollbar: false,
		freezeColumn: 0,
		pinnedRightColumns: 1,
		columns: [
			{title: "Company", field: fields[0], width: 200},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 80},
			{title: "Net. Chng", field: fields[3], width: 80},
			{title: "Industry", field: fields[4], width: 150}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

## Delayed initialization (after 5 seconds)

```live
<style>
	#container {
		height: 200px;
	}
	atlas-blotter {
		width: 500px;
	}
</style>
<div id="container"></div>
<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 5 });
	var configObj = {
		freezeColumn: 0,
		pinnedRightColumns: 1,
		columns: [
			{title: "Company", field: fields[0], width: 200},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 80},
			{title: "Net. Chng", field: fields[3], width: 80},
			{title: "Industry", field: fields[4], width: 150}
		],
		staticDataRows: records
	};
	var grid = null;
	setTimeout(function() {
		grid = document.createElement("atlas-blotter");
		grid.config = configObj;
		document.getElementById("container").appendChild(grid);
	}, 5000);
</script>
```
