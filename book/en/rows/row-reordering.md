# Row - Reordering

> **Note:** Built-in row reordering is deprecated in favor of the [Row Dragging Extension](../extensions/README.md). In terms of both functionalities and UIs, the extension provides more control and flexibility over the current APIs.

To allow the user to drag and reorder selected rows, turn on the `rowReorder` property. The possible values are a boolean *true* or an object that provides more options. The visual content of the dragged row can be rendered using the renderer function provided in the property `dragBoxRenderer` of the options object.

## Example

```live
<style>
	emerald-grid {
		height: 200px;
	}
</style>
<emerald-grid id="grid"></emerald-grid>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 6 });
	var configObj = {
		rowSelection: true,
		rowReorder: {
			dragBoxRenderer: function (dragEvent, dragBox, dataRows) {
				var content = document.createElement("div");
				var value;
				for (var i = 0; i < dataRows.length; i++) {
					value = dataRows[i][fields[0]];
					content.append(value);
					content.appendChild(document.createElement("br"));
				}

				dragBox.setContent(content);
			}
		},
		columns: [
			{title: "Company", field: fields[0]},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 80},
			{title: "Net. Chng", field: fields[3], width: 80},
			{title: "Industry", field: fields[4]}
		],
		dataModel: {
			data: records
		}
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
