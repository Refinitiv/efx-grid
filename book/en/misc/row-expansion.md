# General Concepts and Row Expansion APIs

Row expansion is an extra row that is extended directly from a normal row. It's a great place to show extra information which cannot normally be shown on a single row. 

It looks just like a normal row but, unlike a normal row, it has no data from the main data table associated with it. This means that the states or data of the row expansion have to come from the expanded row. Grid will not perform sorting or filtering on the row expansion, as it has no data. 

In effect, row expansion is completely different from row grouping, where rows are grouped based on their data. Row expansion is tightly connected to the expanded row and cannot be separated. When the expanded row is moved, the row expansion is also moved. So, be aware that operations like sorting, filtering, or pagination can still have an impact on how row expansion is displayed.

To add a row expansion, call `addRowExpansion(rowId)` or `toggleRowExpansion(rowId)` from Grid's data view. `rowId` is the row ID of the row to be expanded. 

To remove all row expansions at once, use `removeAllRowExpansions()`. 

To get existing rows with an expansion, use `getRowsWithExpansion()`.

To render content on the row expansion, define `renderer` property of `rowExpansion` on the grid configuration object, like so:

```js
var configObj = {
	//...
	rowExpansionBinding: function (e) {
		var rowIndex = e["rowIndex"];
		var section = e["section"];
		
		if(e.rowExpansion) {
			// render
			var rowData = e.originalRowData;
			var cell = section.stretchCell(0, rowIndex);
			var str = "expanded from row \"" + rowData["col1"] + ", " + rowData["col2"] + ", " + rowData["col3"] + "\"";
			cell.setContent(str);
			cell.setStyle("background-color", "lightblue");
		} else {
			//dispose
			var cell = section.stretchCell(0, rowIndex, false);
			cell.setStyle("background-color", "");
		}
	},
	//...
};
```

> Note: the same cell element is used for both normal row and row expansion due to the virtualization technique. Any custom style has to be removed using the `dispose` part.

The example below shows how to create row expansion when clicking on a normal row. It also shows how to save and load row expansion states.

```live
<style>
	atlas-blotter {
		height: 200px;
	}
	html hr {
		margin: 5px;
	}
</style>

<button id="save_states">Save</button>
<button id="load_states">Load</button>
<button id="clear_row_expan">Clear all row expansions</button>
<hr>
<atlas-blotter id="grid"></atlas-blotter>
<hr>
<pre id="msg"></pre>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { seed: 1, numRows: 10 });
	
	function onCellCliked(e) {
		var pos = grid.api.getRelativePosition(e);
		if (pos.sectionType === "content") { // Prevent clicking on header section
			var dv = grid.api.getDataView();
			dv.toggleRowExpansion(pos.rowIndex);
		}
	}

	document.getElementById("save_states").addEventListener("click", function () {
		var dv = grid.api.getDataView();
		var rowWithExpansions = dv.getRowsWithExpansion();
		var rowIds = rowWithExpansions.filter(function (id) {
			return id;
		});

		msg.textContent = "Row Ids saved:\n" + JSON.stringify(rowIds, null, 4);
		sessionStorage.setItem("row_expansion_data", JSON.stringify(rowIds));
	});

	document.getElementById("load_states").addEventListener("click", function () {
		// Initial row expansion from rowId
		var dv = grid.api.getDataView();
		var data = sessionStorage.getItem("row_expansion_data");
		msg.textContent = "Data loaded: " + data;
		const rowIds = JSON.parse(data);
		dv.removeAllRowExpansions();
		for (var rowId of rowIds) {
			dv.addRowExpansion(rowId);
		}
	});

	document.getElementById("clear_row_expan").addEventListener("click", function () {
		var dv = grid.api.getDataView();
		dv.removeAllRowExpansions();
		msg.textContent = "Row expansions are cleared";
	});

	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 120},
			{name: "Last", field: fields[2], width: 100},
			{name: "Net. Chng", field: fields[3], width: 100},
			{name: "Industry", field: fields[4]}
		],
		rowExpansionBinding: function(e) {
			var rowIndex = e["rowIndex"];
			var section = e["section"];
			var colCount = section.getColumnCount();
			if (e.rowExpansion) {
				for (var c = 0; c < colCount; ++c) {
					var cell = section.getCell(c, rowIndex);
					cell.setContent("Row Expansion_" + c);
					cell.setStyle("backgroundColor", "mistyrose");
				}
			} else {
				for (var c = 0; c < colCount; ++c) {
					var cell = section.getCell(c, rowIndex);
					cell.setStyle("backgroundColor", "");
				}
			}
		},
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;

	grid.addEventListener("click", onCellCliked);
</script>
```

## Managing states for row expansion

Since row expansion has no row data to hold its state, the data has to be stored on the expanded row. The example below shows how you can have two different types of content based on the button being clicked.

```live
<style>
	atlas-blotter {
		height: 200px;
	}
	html hr {
		margin: 5px;
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 10 });
	
	var buttonFormatter = function (e) {
		var cell = e["cell"];
		var content = cell.getContent();
		if (!content || !cell._buttons) {
			var buttonsContainer = (cell._buttons = document.createElement("div"));
			var firstButton = document.createElement("coral-button");
			firstButton.icon = "edit";
			firstButton.addEventListener("click", onFirstClickButton);

			var secondButton = document.createElement("coral-button");
			secondButton.icon = "filter";
			secondButton.addEventListener("click", onSecondClickButton);
			buttonsContainer.appendChild(firstButton);
			buttonsContainer.appendChild(secondButton);
		}
		cell.setContent(cell._buttons);
	};

	var onFirstClickButton = function (e) {
		var pos = grid.api.getRelativePosition(e);
		var dv = grid.api.getDataView();

		// Save the state to the expanded row
		dv.setDataAt(pos.rowIndex, "My_Clicked_Button", 1);

		dv.toggleRowExpansion(pos.rowIndex);
	};

	var onSecondClickButton = function (e) {
		var pos = grid.api.getRelativePosition(e);
		var dv = grid.api.getDataView();

		// Save the state to the expanded row
		dv.setDataAt(pos.rowIndex, "My_Clicked_Button", 2);

		dv.toggleRowExpansion(pos.rowIndex);
	};

	var configObj = {
		columns: [
			{
				name: "Buttons",
				field: "btnClicked",
				binding: buttonFormatter,
				width: 80,
				alignment: "center"
			},
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 120},
			{name: "Last", field: fields[2], width: 100},
			{name: "Net. Chng", field: fields[3], width: 100},
			{name: "Industry", field: fields[4]}
		],
		rowExpansionBinding: function(e) {
			var rowIndex = e["rowIndex"];
			var section = e["section"];
			if (e.rowExpansion) {
				// render
				var cell = section.stretchCell(0, rowIndex, true);
				var rowData = e.originalRowData;
				if (rowData["My_Clicked_Button"] === 1) {
					cell.setContent("First button was clicked");
				} else {
					cell.setContent("Second button was clicked");
				}
				cell.setStyle("backgroundColor", "mistyrose");
				cell.setStyle("textAlign", "left");
			} else {
				// dispose
				var cell = section.stretchCell(0, rowIndex, false);
				cell.setStyle("backgroundColor", "");
				cell.setStyle("textAlign", "");
			}
		},
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

## Multiple row expansions from a single row

You can specify the number of row expansions to be added on a single row by passing the number as the third parameter for `toggleRowExpansion(rowId, null, numRows)`. 

> Note that row expansion has no row data. So the entire data set for multiple row expansions have to be stored on the expanded row. Luckily, any data structure can be stored on the row data. For instance, you can have an array of objects representing states of row expansions, like so:

```js
dv.setData(rowId, "My_Row_Expansion_States", [ 
	{name: "Row 1", value: 1},
	{name: "Row 2", value: 2},
	// ...
]);
```

## Handling asynchronous content

Rows can be shifted and data can be updated during the asynchronous process, such as waiting for a response from a server. It is a good idea to always use the row ID for referencing a row and **not** assume that rows or elements stay in the same place. 

The example below shows how to render custom content with asynchronous data. The row ID is retrieved and used for referencing after the server response.



```live
<style>
	atlas-blotter {
		height: 200px;
	}
	html hr {
		margin: 5px;
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>
<hr>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 10 });

	var onRowExpansionBinding = function(e) {
		var rowData = e.originalRowData;
		var rowIndex = e["rowIndex"];
		var section = e["section"];
		if (e.rowExpansion && rowData) {
			// render
			var cell = section.stretchCell(0, rowIndex, true);
			cell.setStyle("backgroundColor", "mistyrose");
			section.setRowHeight(rowIndex, 72); // Customized height

			var expContent = cell.getContent();
			if (!expContent || !expContent._myExpansion) {
				expContent = document.createElement("div");
				expContent._myExpansion = true;

				var firstLine = expContent._firstLine = document.createElement("div");
				var secondLine = expContent._secondLine = document.createElement("div");
				var loader = expContent._loader = document.createElement("amber-loader");
				var button = document.createElement("button");
				button.textContent = "Column & Row Index";
				button.addEventListener("click", function (e) {
					var pos = grid.api.getRelativePosition(e);
					alert(pos.colIndex + ", " + pos.rowIndex);
				});

				secondLine.appendChild(button);

				expContent.appendChild(firstLine);
				expContent.appendChild(secondLine);
				expContent.appendChild(loader);
			}

			var rowData = e.originalRowData;
			if (rowData["My_Expansion_Status"] === "loading") {
				expContent._firstLine.style.display = "none";
				expContent._secondLine.style.display = "none";
				expContent._loader.style.display = "";
			} else {
				expContent._firstLine.style.display = "";
				expContent._secondLine.style.display = "";
				expContent._loader.style.display = "none";
			}
			cell.setContent(expContent);
		} else {
			// dispose
			var cell = section.stretchCell(0, rowIndex, false);
			cell.setStyle("backgroundColor", "");
			section.setRowHeight(rowIndex, section.getDefaultRowHeight()); // Default height
		}
	}

	var onCellCliked = function(e) {
		var pos = grid.api.getRelativePosition(e);
		if (pos.sectionType === "content") { // Prevent clicking on header section
			var rowIndex = pos.rowIndex;
			var rowDef = grid.api.getRowDefinition(rowIndex);
			if (rowDef) { // Prevent clicking on expanded row
				var rowId = rowDef.getRowId();
				var dv = grid.api.getDataView();
				if (!dv.isRowExpansion(rowId)) {
					if (rowDef.getData("My_Expansion_Status") == null) {
						rowDef.setData("My_Expansion_Status", "loading");
						// Simulate delay from data request
						setTimeout(onServerResponse.bind(null, dv, rowDef), 3000); // Asynchronous
					}
					dv.toggleRowExpansion(pos.rowIndex);
				}
			}
		}
	};
	var onServerResponse = function(dv, rowDef) {
		if (!dv.isRowExpansion(rowDef.getRowId())) {
			rowDef.setData("My_Expansion_Status", "data received");
		}
		grid.api.getCoreGrid().requestRowRefresh(); // WORKAROUND: Force re-rendering
	};
	
	var configObj = {
		columnReorder: true,
		sorting: {
			sortableColumns: true
		},
		columns: [
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 120},
			{name: "Last", field: fields[2], width: 100},
			{name: "Net. Chng", field: fields[3], width: 100},
			{name: "Industry", field: fields[4]}
		],
		rowExpansionBinding: onRowExpansionBinding,
		staticDataRows: records
	};
	
	var grid = document.getElementById("grid");
	grid.config = configObj;
	
	grid.addEventListener("click", onCellCliked);
</script>
```