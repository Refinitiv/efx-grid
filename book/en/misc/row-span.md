# Row Span

Setting row span on a cell can be done through Core Grid API (e.g., `setCellRowSpan`). A cell with row span will simply be expanded on top of cells below it. Cells are not actually merged by row span, but appeared as if they are merged together.

Since cells in grid are reused across multiple rows by default, `rowVirtualization` need to be turned off for row span to work properly.

## Row virtualization mode

Grid does not support row span in row virtualization mode. The row virtualization mode can be set using `rowVirtualization: false` in the configs.

### Example 1: setting row span after initialization

```live
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["id", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { seed: 0, numRows: 10 });
	var configObj = {
		rowVirtualization: false,
		columns: [
			{name: "Row Index", field: fields[0], width: 60},
			{name: "Market", field: fields[1], width: 120},
			{name: "Last", field: fields[2], width: 100},
			{name: "Net. Chng", field: fields[3], width: 100},
			{name: "Industry", field: fields[4]}
		],
		staticDataRows: records,
		whenDefined: function(e) {
			var core = e.api.getCoreGrid();
			var section = core.getSection('content');
			section.setCellRowSpan(1, 0, 2);
			section.setCellRowSpan(4, 4, 3);
			section.setCellRowSpan(0, 4, 4);
		}
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Example 2: setting row span in data binding

```live
<style>
atlas-blotter {
	height: 300px;
	margin-bottom: 40px;
}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["id", "companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { seed: 0, numRows: 20 });
	
	var onCustomBinding = function(e) {
		if(e.rowIndex % 2 === 0) {
			e.section.setCellRowSpan(e.colIndex, e.rowIndex, 2);
		}
		e.cell.setContent(e.data);
	};
	
	var configObj = {
		rowVirtualization: false,
		columns: [
			{name: "Row Index", field: fields[0], width: 60},
			{name: "Company Name", field: fields[1], width: 120, binding: onCustomBinding},
			{name: "Market", field: fields[2], width: 120, binding: onCustomBinding},
			{name: "Last", field: fields[3], width: 100},
			{name: "Net. Chng", field: fields[4], width: 100},
			{name: "Industry", field: fields[5]}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
