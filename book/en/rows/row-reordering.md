# Row - Reordering

To allow the user to drag and reorder selected rows, add Row Dragging Extension instance to `extensions` property. The visual content of the dragged row can be rendered using the renderer function provided in the property `dragBoxRenderer` of the `rowDragging` option object. For more details, see [Row Dragging Extension](../extensions/tr-grid-row-dragging.md).
## Example

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
		rowDragging: {
			dragBoxRenderer: function(e) {
				e.dragBox.textContent = e.dataRow[fields[0]];
			}
		},
		columns: [
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 100},
			{name: "Last", field: fields[2], width: 80},
			{name: "Net. Chng", field: fields[3], width: 80},
			{name: "Industry", field: fields[4]}
		],
		staticDataRows: records,
		extensions: [ new tr.RowDraggingExtension() ]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
