# Showcase


```live(formatters)
<fieldset>
	<legend>Operation</legend>
	<span>
		<coral-button id="select_column_btn">Select Columns</coral-button>
		Data Size:
		<coral-select id="dataSize">
			<coral-item value="10">10 Rows</coral-item>
			<coral-item value="100" selected>100 Rows</coral-item>
			<coral-item value="1000">1,000 Rows</coral-item>
			<coral-item value="10000">10,000 Rows</coral-item>
			<coral-item value="100000">100,000 Rows</coral-item>
		</coral-select>
	</span>
	<hr>
	<span>
		<label for="search_input">Filter: </label>
		<input id="search_input" type="search" placeholder="Filter any column">
	</span>
	<hr>
	<div id="grouping">
		<coral-select id="column_grouping_selector" placeholder="Group By"></coral-select>
	</div>
</fieldset>
<hr>

<atlas-blotter id="preview"></atlas-blotter>
<emerald-popup-menu id="popup_menu"></emerald-popup-menu>
<script>

	var checkboxExt = new tr.CheckboxExtension();
	var rowGroupingExt = new tr.RowGroupingExtension();
	var conditionalColoringExt = new tr.ConditionalColoringExtension();
	var columnGroupingExt = new tr.ColumnGroupingExtension();
	var cellSelectionExt = new tr.CellSelectionExtension();
	var filterInputExt = new tr.FilterInputExtension();
	var columnResizingExt = new tr.ColumnResizingExtension();
	var textFormattingExt = new tr.TextFormattingExtension();
	var heatMapExt = new tr.HeatMapExtension();
	var inCellEditingExt = new tr.InCellEditingExtension();
	var percentBarExt = new tr.PercentBarExtension();
	var filterExt = new tr.RowFilteringExtension();
	var rowColoring = new tr.RowColoringExtension();
	var contextMenuExt = new tr.ContextMenuExtension();
	var columnFitterExt = new tr.ColumnFitterExtension();
	var columnStackExt = new tr.ColumnStackExtension();
	var rangeBarExt = new tr.RangeBarExtension();
	var generator = tr.DataGenerator;
	var dateTimePicker = tr.EmeraldDateTimePickerFormatter ? tr.EmeraldDateTimePickerFormatter  : EFDateTimePickerFormatter; // WORKAROUND: for datetime picker in v6

	var grid = window.grid = document.getElementsByTagName("atlas-blotter")[0];
	var dataSizeSelect = document.getElementById("dataSize");
	var selectColumnBtn = document.getElementById("select_column_btn");

	var userList = [
		"Amanda Herrera",
		"Josh Robertson",
		"Abbie Parker",
		"Christopher Washington",
		"Casey Alvarez",
		"Joshua Castillo",
		"Skye Wilson",
		"Tommy Medina",
		"Vincent Smith",
		"Jackson Garcia",
		"Lisa Alexander",
		"Holly Brooks",
		"Zara Marshall",
		"Kiera Shaw"
	];
	const userListEntries = userList.map(function (item) {
		return {
			label: item,
			value: item
		};
	});

	var codeList = {
		"FRA": "France",
		"GBR": "United Kingdom",
		"ISL": "Iceland",
		"ITA": "Italy",
		"PRT": "Protugal",
		"SWE": "Sweden",
		"GRC": "Greece",
		"DEU": "Germany",
		"NOR": "Norway",
		"IND": "India",
		"CHN": "China"
	};

	var languageList = ["French", "English", "German", "Italian", "Portuguese", "Chinese"];

	const languageEntries = languageList.map(function (item) {
		return {
			label: item,
			value: item
		};
	});

	generator.addFieldInfo("userList", {
		type: "set",
		members: userList
	})

	generator.addFieldInfo("languageList", {
		type: "set",
		members: languageList
	});

	generator.addFieldInfo("countryList", {
		type: "set",
		members: ["FRA", "GBR", "ISL", "ITA", "PRT", "SWE", "GRC", "DEU", "NOR", "GBR", "IND", "FRA", "DEU", "CHN"
		]
	})


	generator.addFieldInfo("CF_CLOSE", {
		type: "number",
		min: 0,
		max: 1000,
		prec: 2
	});

	generator.addFieldInfo("TR.TSVWAP", {
		type: "number",
		min: 0,
		max: 1000,
		prec: 2
	});

	generator.addFieldInfo("Jan", {
		type: "number",
		min: -100,
		max: 100,
		prec: 2
	});

	generator.addFieldInfo("Feb", {
		type: "number",
		min: -100,
		max: 100,
		prec: 2
	});

	generator.addFieldInfo("Mar", {
		type: "number",
		min: -100,
		max: 100,
		prec: 2
	});

	generator.addFieldInfo("changed", {
		type: "number",
		min: -100,
		max: 100,
		prec: 2
	});

	var dateConditions = [
		{
			expression: ["GT", 60],
			backgroundColor: "#b9f6ca66"
		},
		{
			expression: ["LT", 20],
			backgroundColor: "#ff80ab66"
		},
	];

	var dataTypeFields = [
		"id",
		"userList",
		"languageList",
		"countryList",
		"boolean", // Bought
		"TR.Volume", // Bank Balance
		"changed", // Rating
		"CFLOW",
		"CF_LAST",
		"CFHIGH",
		"CF_TICK",
		"CF_CLOSE",
		"TR.TSVWAP",
		"ISODate",
		"Jan",
		"Feb",
		"Mar"
	];
	var dataRows = generator.generateRecords(dataTypeFields, { seed: 0, numRows: 100 });

	var allAvailableColumns = [
		{
			checkboxColumn: true,
			leftPinned: true
		},
		{
			field: "userList",
			name: "Name",
			id: "userList",
			filterInput: {
				type: "multiselect",
				entries: userListEntries
			},
			minWidth: 150,
			width: 165,
			editableContent: true
		},
		{
			field: "TR.Volume",
			name: "Bank Balance",
			id: "TR.Volume",
			width: 90,
			noFitting: true,
			textAlign: "right",
			heatMap: {
				midPoint: 40
			},
			inCellEditing: {
				type: "number"
			},
			filterInput: {
				type: "number"
			},
			editableContent: true,
			formatType: {
				type: "number",
				separator: true,
				decimalPlaces: 0
			}
		},
		{
			field: "CF_CLOSE",
			id: "CF_CLOSE",
			sortable: false,
			name: "Price Graph",
			filterInput: false,
			minWidth: 120,
			rangeBar: {
				low: "CFLOW",
				high: "CFHIGH",
				last: "CF_LAST",
				close: "CF_CLOSE",
				vwap: "TR.TSVWAP",
				tick: "CF_TICK",
			},
		},
		{
			field: "CF_LAST",
			id: "CF_LAST",
			sortable: false,
			name: "Year High Low Range",
			minWidth: 150,
			filterInput: false,
			rangeBar: {
				low: "CFLOW",
				high: "CFHIGH",
				last: "CF_LAST"
			}
		},
		{
			field: "changed",
			id: "changed",
			name: "Pct. Chng",
			fieldDataType: "number",
			filterInput: false,
			percentBar: {
				alignment: "c"
			},
			editableContent: true,
			noFitting: true,
			minWidth: 150
		},
		{
			field: "id",
			name: "Order",
			noFitting: true,
			id: "id",
			filterInput: {
				type: "number"
			},
			width: 40,
			filterInput: false,
		},
		{
			field: "CF_TICK",
			name: "Tick",
			id: "CF_TICK",
			noFitting: true,
			width: 40,
			filterInput: false,
			binding: onTickBinding
		},
		{
			field: "boolean",
			name: "Bought",
			id: "boolean",
			filterInput: false,
			noFitting: true,
			width: 40,
			textAlign: "center",
			binding: tr.CoralIconFormatter.create({
				icon: {
					true: "tick",
					false: "cross"
				}
			}),
			inCellEditing: {
				type: "checkbox"
			},
			editableContent: true
		},
		{
			field: "ISODate",
			id: "ISODate",
			name: "Date",
			fieldDataType: "datetime",
			filterInput: {
				type: "date"
			},
			noFitting: true,
			binding: dateTimePicker.create({
				styles: {
					width: 180
				}
			}),
			width: 180,
			alignment: "c"
		},
		{
			field: "languageList",
			id: "languageList",
			name: "Language",
			editableContent: true,
			inCellEditing: {
				type: "select",
				entries: languageEntries
			},
			filterInput: {
				type: "select",
				entries: languageEntries
			},
			minWidth: 120
		},
		{
			field: "countryList",
			id: "countryList",
			name: "Country",
			filterInput: false,
			textAlign: "c",
			binding: tr.CoralButtonFormatter.create({
				events: {
					click: function (event, context) {
						var value = context.getData(context.field);
						alert(codeList[value]);
					}
				}
			}),
			minWidth: 80
		},
		{
			field: "Jan",
			id: "Jan",
			name: "Jan",
			filterInput: {
				type: "number"
			},
			conditions: dateConditions,
			alignment: "c",
			formatType: "percent",
			minWidth: 80, // Equal to fit content
			stackId: "stack1"
		},
		{
			field: "Feb",
			name: "Feb",
			id: "Feb",
			filterInput: {
				type: "number"
			},
			conditions: dateConditions,
			alignment: "c",
			formatType: "percent",
			minWidth: 80,
			stackId: "stack1"
		}, {
			field: "Mar",
			name: "Mar",
			id: "Mar",
			filterInput: {
				type: "number"
			},
			conditions: dateConditions,
			alignment: "c",
			formatType: "percent",
			minWidth: 80,
			stackId: "stack1"
		}

	];

	function onTickBinding(e) {
		var cell = e.cell;
		var data = e.data;
		var content = cell.getContent();
		if (!content) {
			content = document.createElement("coral-icon");
		}
		content.icon = data === 1 ? "arrow-down-fill" : "arrow-up-fill";
		content.style.color = data === 1 ? "rgb(245, 71, 91)" : "rgb(57, 196, 110)";
		cell.setContent(content);
	};

	// generate dynamic data and assign to "atlas-blotter"
	dataSizeSelect.addEventListener("value-changed", function (e) {
		var dataRows = generator.generateRecords(dataTypeFields, { seed: 0, numRows: e.detail.value });
		grid.data = dataRows;
	});

	// set up row Filter Extension
	search_input.addEventListener("keyup", function (e) {
		const input = e.currentTarget;

		if (input._prevValue !== input.value) {
			input._prevValue = input.value;
			filterExt.refresh(); // Force filter triggering
		}
	});

	var filterFunc = function (rowData, rowId, context) {
		var str = "";
		var val = context.input.value.toLowerCase();
		var record = rowData["ROW_DEF"].getRowData();
		for (var key in record) {
			str += record[key] + " ";
		}
		return str.toLowerCase().indexOf(val) > -1;
	};

	var context = {
		input: search_input
	};

	filterExt.addGridFilter(filterFunc, context);

	// Prepare model for context-menu
	const contextMenuModel = {
		items: {
			FILTER: {
				text: "Filter",
				callback: function (e) {
					filterExt.openDialog(e.colIndex, {
						sortUI: true, // Show Sort area
						filterUI: true, // Show Filter area
						sortState: "d", // "a" for ascending or "d" for descending
						filterChanged: function (e) { // Filter changed handler
							console.log(e.detail);
						},
						sortChanged: function (e) { // Sort changed handler
							console.log(e.detail);
						}
					});
				}
			},
			ROW_COLORING: {
				text: "Set Row Color",
				items: [
					{ text: "Red", value: "#FF0000" },
					{ text: "Green", value: "#00FF00" },
					{ text: "Blue", value: "#0000FF" },
					{ type: "separator" },
					{ text: "Default", value: "" }
				],
				callback: function (e) {
					const { rowIndex, item: { value } } = e;
					rowColoring.setRowColor(rowIndex, value);
				}
			}
		},
		onMenu: function (e) {
			var context = e.context;
			var menu = e.menu;
			if (context === "header") {
				menu.addItems("FILTER");
			} else if (context === "content") {
				menu.addItems(["ROW_COLORING", "FILTER"]);
			}
		}
	};

	contextMenuExt.listen("contextmenu", function (e) {
		// contextmenu event argument provides info about the right click position within the core grid
		console.log(e);
	});

	// set up "column-selection-dialog"
	var dialog = null;
	var selectionDialogConfirmed = function (e) {
		var columnCommited = e.detail.data;
		columnCommited = columnCommited.map(function (column) {
			return {
				...column, // Clone object to retain format
				field: nameToField[column.name]
			}
		})
		grid.api.restoreColumns(columnCommited);
	};

	var nameToField = {
		"Name": "userList",
		"Order": "id",
		"Bought": "boolean",
		"Tick": "CF_TICK",
		"Bank Balance": "TR.Volume",
		"Price Graph": "CF_CLOSE",
		"Year High Low Range": "CF_LAST",
		"Pct. Chng": "changed",
		"Date": "ISODate",
		"Country": "countryList",
		"Language": "languageList",
		"Jan": "Jan",
		"Feb": "Feb",
		"Mar": "Mar"
	};

	selectColumnBtn.addEventListener("click", function () {
		if (!dialog) {
			dialog = document.createElement("column-selection-dialog");
			dialog.addEventListener("confirm", selectionDialogConfirmed);
		}

		var columns = grid.api.getConfigObject().columns;
		var visibleColumns = columns.filter(function (column) {
			return column.checkboxColumn !== true;
		});

		var allColumns = allAvailableColumns.filter(function (column) {
			return column.checkboxColumn !== true;
		});

		var columnObj = allColumns.map(function (column) {
			return {
				...column, // Clone object to retain format
				field: column.name,
				id: nameToField[column.name]
			}
		});
		visibleColumns = visibleColumns.map(function (column) {
			return {
				...column, // Clone object to retain format
				field: column.name,
				id: column.id
			}
		});
		dialog.init({
			data: columnObj.slice(),
			visibleItems: visibleColumns.slice()
		});
		dialog.show();
	});

	var blotterConfig = {
		scrollbar: true,
		autoHideScrollbar: false,
		linearWheelScrolling: true,
		stepScroll: true,
		columnGrouping: [
		{
			id: "g1",
			name: "Account Profile",
			alignment: "center",
			children: ["userList", "TR.Volume"]
		},	
		{
			id: "g2",
			name: "Transaction Details",
			alignment: "center",
			children: ["id", "CF_TICK", "boolean"]
		},
		{
			id: "g3",
			name: "Financial Overview",
			alignment: "center",
			children: ["CF_CLOSE", "CF_LAST", "changed"]
		},
		{
			id: "g4",
			name: "Localization Information",
			children: ["ISODate", "languageList", "countryList"]
		}],
		extensions: [
			columnGroupingExt,
			checkboxExt,
			rowGroupingExt,
			conditionalColoringExt,
			cellSelectionExt,
			filterInputExt,
			columnResizingExt,
			textFormattingExt,
			heatMapExt,
			inCellEditingExt,
			percentBarExt,
			filterExt,
			contextMenuExt,
			rowColoring,
			columnFitterExt,
			columnStackExt,
			rangeBarExt,
		],
		inCellEditing: {
			type: "input",
			contentSource: "field",
			autoCommitText: true,
			beforeCommit: function (e) {
				// console.log("beforeCommit", e)
			}
		},
		contextMenu: contextMenuModel,
		columnStack: {
			menuElement: document.getElementById("popup_menu")
		},
		columnFitting: {
			title: false,
			autoAdjust: true,
			paddingSize: 20
		}
	};

	grid.columns = allAvailableColumns;
	grid.config = blotterConfig;
	grid.data = dataRows;

	column_grouping_selector.addEventListener("opened-changed", function (e) {
		if (!this.opened) {
			var columns = [{
				field: "userList",
				name: "Name"
			}, {
				field: "languageList",
				name: "Language",
			}, {
				field: "countryList",
				name: "Country",
			}];
			var filtered = columns.filter(function (column) {
				return column.checkboxColumn !== true;
			});
			var data = filtered.map(function (column) {
				return {
					label: column.name,
					value: column.field
				}
			});
			var criteria = rowGroupingExt.getGroupingCriteria();
			var selectorData = data.filter(function (item) {
				return criteria.indexOf(item.value) < 0;
			});

			column_grouping_selector.data = selectorData;
		}
	});

	function onPillRemove(e) {
		// Remove Pill
		var pill = e.target;
		pill.parentElement.removeChild(pill._arrow);
		pill.parentElement.removeChild(pill);
		var field = pill.value;

		// Update grouping criteria
		var criteria = rowGroupingExt.getGroupingCriteria().slice(0);
		criteria.splice(criteria.indexOf(field), 1);
		rowGroupingExt.setGroupingCriteria(criteria);
	}

	column_grouping_selector.addEventListener("value-changed", function (e) {
		var value = e.detail.value;
		var label = this.label;

		// Insert Pill
		var pill = document.createElement("coral-pill");

		var arrow = document.createElement("coral-icon");
		arrow.className = "arrow";
		arrow.setAttribute('icon', 'right');

		pill._arrow = arrow;
		pill.setAttribute("clears", "");
		pill.innerText = label;
		pill.value = value;
		pill.addEventListener("clear", onPillRemove);

		var container = document.getElementById("grouping");
		container.appendChild(pill);
		container.appendChild(arrow);

		this.value = "";

		// Update grouping criteria
		var criteria = rowGroupingExt.getGroupingCriteria();
		var criteria = criteria.concat([value]);
		rowGroupingExt.setGroupingCriteria(criteria);
	});

</script>

<style>
	body {
		padding: 24px;
	}

	atlas-blotter {
		height: 600px;
	}

	#grouping .arrow {
		color: red;
		margin: 0 5px;
		vertical-align: middle;
	}

	#grouping .arrow:last-child {
		display: none;
	}

	coral-pill {
		margin: auto;
	}

	#column_grouping_selector {
		margin-right: 5px;
	}

	hr {
		margin: 8px;
	}
</style>
```
As seen above, the showcase includes a combination of features and extensions which allow Grid to support any data types as well as data visualization.

The most commonly used features have been included in this showcase, such as sorting, filtering, and column moving. 

The extensions show how they can leverage Grid so it can support many use cases. The following offers a brief explanation about some of their usage:

1. `In-cell Editing Extension` allows the data manipulation to be made, under the 'Name' and 'Bought' columns, any row-data in any type can be changed.
2. By clicking on the button under the 'Country' column, will a dialog box pops up, showing the full country name using the `Formatter`.
3. `Heat Map Extension` uses in the 'Bank Balance' column to provide the coloring for the columns field to present the balance health.
4. `Percent Bar Extension` uses in the 'Rating' column allow the showcase to render the data in the bar.
5. By scrolling to the right panel of the Grid, `Conditional Coloring Extension` applies to differentiate the percentage values making it easy to analyze the data.
6. The 'Group By' dropdown option utilizes an additional UI customization with the Grid's API extension in this showcase resulting an useful UI feature as a coral-pill.
7. The total data size option for the data rendering can also be adjusted to see the performance of the `row virtualization` feature.

The showcase includes all the following Grid features and extensions:

- `Conditional Coloring Extension`,
- `Column Grouping Extension`,
- `Checkbox Extension`,
- `Cell Selection Extension`,
- `Filter Input Extension`,
- `Column Resizing Extension`,
- `Text Formatting Extension`,
- `Heat Map Extension`,
- `In Cell Editing Extension`,
- `Percent Bar Extension`,
- `Row Filtering Extension`,
- `Context Menu Extension`,
- `Row Coloring Extension`,
- `Column Fitter Extension`,
- `Column Stack Extension`,
- `Range Bar Extension`,
- `Coral Button Formatter`,
- `Coral Icon Formatter`,
- `Custom Formatter`,
- `Date Time Formatter`
- `column-selection-dialog`,
- `filter-dialog`
