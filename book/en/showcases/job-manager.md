# Job Manager

```live(formatters)
	<input id="search_input" placeholder="Search Anything..." type="search">
	<hr>
	<atlas-blotter id="grid"></atlas-blotter>
<script>

	tr.DataGenerator.addFieldInfo("status", {
		type: "set",
		members: ["Success", "Fail", "Partial Success"]
	});

	tr.DataGenerator.addFieldInfo("jobName", {
		type: "set",
		members: [
			"Docs_Conv_021123_2",
			"UPLD_Documents_031123_3",
			"ConvUpld_Files_041123_1",
			"Upload_Batch_051123_4",
			"Files_Upld_061123_5",
			"Upld_Conversion_071123",
			"Documents_Upload_081123_1",
			"Conv_Uploads_091123_2",
			"Upload_Files_101123_3",
			"Upld_Doc_111123_4",
			"Conversion_Upload_121123_5",
			"Uploads_Docs_131123_1",
			"Docs_Conversion_141123_2",
			"Upld_Batch_151123_3",
			"Conversion_Batch_161123_4",
			"Batch_Upload_171123_5",
			"Upld_Documents_181123_1",
			"Upload_Conv_191123_2",
			"Conversion_Docs_201123_3",
			"Upld_Files_211123_4"
		]
	});

	var rowSelection = new tr.RowSelectionExtension();
	var inCellEditing = new tr.InCellEditingExtension();
	var rowFiltering = new tr.RowFilteringExtension();
	// Extensions
	var fields = ["jobName", "status"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 50, seed: 0 });
	var config1 = {
		columns: [
			{
				title: "Job Name",
				field: fields[0],
				editableContent: true
			},
			{
				title: "Status",
				field: fields[1],
				width: 100
			},
			{
				name: "Action", field: fields[1],
				width: 150,
				titleAlignment: "center",
				binding: onActionBinding
			}
		],
		staticDataRows: records,
		rowFiltering: {
			iconActivation: "onHover"
		},
		extensions: [rowSelection, inCellEditing, rowFiltering]
	};

	function onActionBinding(e) {
		var data = e.data;
		var cell = e.cell;
		var content = cell.getContent();
		if (!content) {
			content = document.createElement("div");

			var editIcon = document.createElement("coral-icon");
			editIcon.icon = "edit";
			editIcon.style.cursor = "pointer";
			editIcon.style.verticalAlign = "middle";
			editIcon.addEventListener("click", onEditClicked);

			var deleteIcon = document.createElement("coral-icon");
			deleteIcon.icon = "trash";
			deleteIcon.style.cursor = "pointer";
			deleteIcon.style.verticalAlign = "middle";
			deleteIcon.addEventListener("click", onRemoveClicked);

			var runButton = document.createElement("coral-button");
			runButton.textContent = "Run";
			runButton.style.verticalAlign = "middle";
			runButton.addEventListener("click", onRunClicked);

			content.appendChild(editIcon);
			content.appendChild(deleteIcon);
			content.appendChild(runButton);
		}
		cell.setContent(content);
	}

	function onRunClicked(e) {
		var button = e.currentTarget;
		var pos = grid.api.getRelativePosition(e);
		var rowIndex = pos.rowIndex;
		alert("Click :" + rowIndex);
	}
	function onRemoveClicked(e) {
		var button = e.currentTarget;
		var pos = grid.api.getRelativePosition(e);
		var rowIndex = pos.rowIndex;
		grid.api.removeRow(rowIndex);
	}
	function onEditClicked(e) {
		var button = e.currentTarget;
		var pos = grid.api.getRelativePosition(e);
		var rowIndex = + pos.rowIndex;
		inCellEditing.openEditor(0, rowIndex);
	}

	var grid = window.grid = document.getElementById("grid");
	grid.config = config1;

	var searchInput = document.getElementById("search_input");
	searchInput.addEventListener("keyup", function (e) {
		var input = e.currentTarget;
		if (input._prevValue !== input.value) {
			input._prevValue = input.value;
			rowFiltering.refresh(); // Force filter triggering
		}
	});

	function filterFunc(rowData, rowId, context) {
		var str = "";
		var val = context.input.value.toLowerCase();
		for (var key in rowData) {
			str += rowData[key] + " ";
		}
		return str.toLowerCase().indexOf(val) > -1;
	};

	var context = {
		input: searchInput
	};
	rowFiltering.addGridFilter(filterFunc, context);
</script>

<style>
	body {
		padding: 24px;
	}

	atlas-blotter {
		height: 300px;
	}

	hr {
		margin: 8px;
	}
	#search_input {
		width: 100%;
	}
</style>
```


In the example above, we show how to create a grid for managing data. This grid lets users filter, add, edit, and remove data in the grid itself. We used three main features: row filtering, in cell editing, and row selection.

Row filtering lets users type in a box to search and filter data across all columns in the grid. Row selection allows users to pick one or more rows in the grid.

In cell editing is about changing the data in the grid directly. For our example, we changed the "Job Name" using this feature.