# Row Span

Setting row span on a cell can be done through Core Grid API (e.g., `setCellRowSpan`). Cell with row span will simply be expanded on top of cells below it.

## Row virtualization mode

Grid does not support row span in row virtualization mode. The row virtualization mode can be set using `rowVirtualization: false` in the configs.

### Example

```live
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["id", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { seed: 0, numRows: 15 });
	var configObj = {
		rowVirtualization: false,
		columns: [
			{name: "Row Index", field: fields[0]},
			{name: "Market", field: fields[1], width: 120},
			{name: "Last", field: fields[2], width: 100},
			{name: "Net. Chng", field: fields[3], width: 100},
			{name: "Industry", field: fields[4]}
		],
		dataModel: {
			data: records
		},
		whenDefined: function(e) {
			var core = e.api.getCoreGrid();
			var section = core.getSection('content');
			// section.setCellRowSpan(colIndex, rowIndex, spanSlot);
			section.setCellRowSpan(1, 0, 2);
			section.setCellRowSpan(4, 4, 3);
			section.setCellRowSpan(0, 4, 4);
		}
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
