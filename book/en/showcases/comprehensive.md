# Showcase


```live(formatters)
<div>
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
	<span>
		<label for="search_input">Filter: </label>
		<input id="search_input" type="search" placeholder="Filter any column">
	</span>
</div>
<div id="grouping">
	<coral-select id="column_grouping_selector" placeholder="Group By"></coral-select>
</div>
<atlas-blotter id="preview"></atlas-blotter>

<script>
	var grid = document.getElementsByTagName("atlas-blotter")[0];
	var dataSizeSelect = document.getElementById("dataSize");
	var selectColumnBtn = document.getElementById("select_column_btn");

	// Extensions
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

	var languageList = [
		"French",
		"English",
		"German",
		"Italian",
		"Portuguese",
		"Chinese",
		"French",
		"German",
		"English",
		"English",
		"English",
		"French",
		"German",
		"Chinese"
	];

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
	}

	var countryList = [
		"FRA",
		"GBR",
		"ISL",
		"ITA",
		"PRT",
		"SWE",
		"GRC",
		"DEU",
		"NOR",
		"GBR",
		"IND",
		"FRA",
		"DEU",
		"CHN"
	];

	var gameList = [
		"Overhold", "Cardify", "Alphazap", "Toughjoyfax", "Voltsillam", 
		"Home Ing", "Otcom", "Solarbreeze", "Alpha", "Cooker run",
		"Stronghold", "Tresom", "Andalax", "Rank", "King of plant",
		"Alphazap", "Viva", "Mat Lam Tam", "Wrapsafe", "Gembucket"
	];

	tr.DataGenerator.addFieldInfo("game", {
		type: "set",
		members: gameList
	});

	tr.DataGenerator.addFieldInfo("user_id", {
		type: "number",
		min: 0,
		max: userList.length,
		prec: 0
	});

	var fields = [
		"Name",
		"Language",
		"Country",
		"Game Name",
		"Bought",
		"Bank Balance",
		"Rating",
		"Total Winnings",
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];

	var conditionsArr = fields.map(function(field) {
		return [{
			backgroundColor: "#b9f6ca66",
			expression: "[" + field + "] > 60"
		}, {
			backgroundColor: "#ff80ab66",
			expression: "[" + field + "] < 20"
		}];
	});

	// Custom Capitalize Formatter
	const capitalizeFormatter = {
		render: function() {},
		bind: function(rowIndex, colIndex, value, cell) {
			console.log("value", value);
			cell.setContent(value.toString()
				.toUpperCase());
		}
	};

	var dataTypeFields = [
		"user_id",
		"game",
		"boolean", // Bought
		"TR.Volume", // Bank Balance
		"index100", // Rating
		"YRHIGH", // Total Winnings
	];

	var randNumber = tr.DataGenerator.randNumber;

	var seed = Math.round(Math.random()*100);
	var mapRow = function(row) {
		var userId = row[0];
		return [false, userList[userId], languageList[userId], countryList[userId],
			row[1], row[2].toString(), row[3], row[4], row[5], 
			randNumber(0, 100, 2, ++seed),
			randNumber(0, 100, 2, ++seed),
			randNumber(0, 100, 2, ++seed),
			randNumber(0, 100, 2, ++seed),
			randNumber(0, 100, 2, ++seed),
			randNumber(0, 100, 2, ++seed),
			randNumber(0, 100, 2, ++seed),
			randNumber(0, 100, 2, ++seed),
			randNumber(0, 100, 2, ++seed),
			randNumber(0, 100, 2, ++seed),
			randNumber(0, 100, 2, ++seed),
			randNumber(0, 100, 2, ++seed)
		];
	};

	var dataRows = tr.DataGenerator.generate(dataTypeFields, { seed: seed, numRows: 100 })
		.map(mapRow);

	const entries = languageList.map(function(item) {
		return {
			label: item,
			value: item
		};
	});

	var allAvailableColumns = [
		{
			checkboxColumn: true,
			leftPinned: true
		},
		{
			id: "c0",
			name: fields[0],
			field: fields[0],
			width: 200,
			editableContent: true
		},
		{
			id: "c1",
			name: fields[1],
			field: fields[1],
			editableContent: true,
			inCellEditing: {
				type: "select",
				entries: entries
			},
			filterInput: {
				type: "select",
				entries: entries
			},
			width: 200
		},
		{
			id: "c2",
			name: fields[2],
			field: fields[2],
			filterInput: false,
			minWidth: 100,
			textAlign: "c",
			binding: tr.CoralButtonFormatter.create({
				events: {
					click: function(event, context) {
						var value = context.getData(context.field);
						alert(codeList[value]);
					}
				}
			})
		},
		{
			id: "c3",
			name: fields[3],
			field: fields[3],
			filterInput: false,
			binding: capitalizeFormatter,
			width: 120
		},
		{
			id: "c4",
			name: fields[4],
			field: fields[4],
			filterInput: false,
			minWidth: 100,
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
			id: "c5",
			name: fields[5],
			field: fields[5],
			minWidth: 120,
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
			id: "c6",
			name: fields[6],
			field: fields[6],
			filterInput: false,
			percentBar: {
				alignment: "l"
			},
			editableContent: true,
			noFitting: true,
			width: 120

		},
		{
			id: "c7",
			name: fields[7],
			field: fields[7],
			noFitting: true,
			minWidth: 100,
			textAlign: "right",
			formatType: {
				type: "number",
				separator: true,
				decimalPlaces: 0
			}
		},
		{
			id: "c8",
			name: fields[8],
			field: fields[8],
			conditions: conditionsArr[8],
			textAlign: "right",
			formatType: "percent",
			width: 120
		},
		{
			id: "c9",
			name: fields[9],
			field: fields[9],
			conditions: conditionsArr[9],
			textAlign: "right",
			formatType: "percent",
			width: 120
		},
		{
			id: "c10",
			name: fields[10],
			field: fields[10],
			conditions: conditionsArr[10],
			textAlign: "right",
			formatType: "percent",
			width: 120
		}, {
			id: "c11",
			name: fields[11],
			field: fields[11],
			conditions: conditionsArr[11],
			textAlign: "right",
			formatType: "percent",
			width: 120
		}, {
			id: "c12",
			name: fields[12],
			field: fields[12],
			conditions: conditionsArr[12],
			textAlign: "right",
			formatType: "percent",
			width: 120
		}, {
			id: "c13",
			name: fields[13],
			field: fields[13],
			conditions: conditionsArr[13],
			textAlign: "right",
			formatType: "percent",
			width: 120
		},
		{
			id: "c14",
			name: fields[14],
			field: fields[14],
			conditions: conditionsArr[14],
			textAlign: "right",
			formatType: "percent",
			width: 120
		},
		{
			id: "c15",
			name: fields[15],
			field: fields[15],
			conditions: conditionsArr[15],
			textAlign: "right",
			formatType: "percent",
			width: 120
		},
		{
			id: "c16",
			name: fields[16],
			field: fields[16],
			conditions: conditionsArr[16],
			textAlign: "right",
			formatType: "percent",
			width: 120
		},
		{
			id: "c17",
			name: fields[17],
			field: fields[17],
			conditions: conditionsArr[17],
			textAlign: "right",
			formatType: "percent",
			width: 120,

		},
		{
			id: "c18",
			name: fields[18],
			field: fields[18],
			conditions: conditionsArr[18],
			textAlign: "right",
			formatType: "percent",
			width: 120
		},
		{
			id: "c19",
			name: fields[19],
			field: fields[19],
			conditions: conditionsArr[19],
			textAlign: "right",
			formatType: "percent",
			width: 120,
			editableContent: true
		}
	];

	// generate dynamic data and assign to "atlas-blotter"
	dataSizeSelect.addEventListener("value-changed", function(e) {
		var seed = Math.round(Math.random()*100);
		var dataRows = tr.DataGenerator.generate(dataTypeFields, { seed: seed, numRows: e.detail.value })
			.map(mapRow);
		grid.api.removeAllRows();
		grid.data = dataRows;
	});

	// set up row Filter Extension
	search_input.addEventListener("keyup", function(e) {
		const input = e.currentTarget;

		if(input._prevValue !== input.value) {
			input._prevValue = input.value;
			filterExt.refresh(); // Force filter triggering
		}
	});

	var filterFunc = function(rowData, rowId, context) {
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
				callback: function(e) {
					filterExt.openDialog(e.colIndex, {
						sortUI: true, // Show Sort area
						filterUI: true, // Show Filter area
						sortState: "d", // "a" for ascending or "d" for descending
						filterChanged: function(e) { // Filter changed handler
							console.log(e.detail);
						},
						sortChanged: function(e) { // Sort changed handler
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
				callback: function(e) {
					const { rowIndex, item: { value } } = e;
					rowColoring.setRowColor(rowIndex, value);
				}
			}
		},
		onMenu: function(e) {
			var context = e.context;
			var menu = e.menu;
			if(context === "header") {
				menu.addItems("FILTER");
			} else if(context === "content") {
				menu.addItems(["ROW_COLORING", "FILTER"]);
			}
		}
	};

	contextMenuExt.listen("contextmenu", function(e) {
		// contextmenu event argument provides info about the right click position within the core grid
		console.log(e);
	});

	// set up "column-selection-dialog"
	var dialog = null;
	var confirmChanged = function(e) {
		grid.columns = e.detail.data;
	};

	selectColumnBtn.addEventListener("click", function() {
		if(!dialog) {
			dialog = document.createElement("column-selection-dialog");
			dialog.addEventListener("confirm", confirmChanged);
		}

		var visibleColumns = grid.columns.filter(function(column) {
			return column.checkboxColumn !== true;
		});

		var allColumns = allAvailableColumns.filter(function(column) {
			return column.checkboxColumn !== true;
		});

		dialog.init({
			data: allColumns.slice(),
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
				name: "Participant",
				alignment: "center", 
				children: ["c0", "c1", "c2"] 
			},
			{ 
				id: "g2",
				name: "Game of Choice",
				alignment: "center",
				children: ["c3", "c4"] 
			},
			{ 
				id: "g3",
				name: "Performance",
				children: ["c5"]
			},
			{
				id: "g4",
				name: "Monthly Breakdown",
				alignment: "left",
				children: ["c8", "c9", "c10", "c11", "c12", "c13", "c14", "c15", "c16", "c17", "c18", "c19"]
			}
		],
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
			columnFitterExt
		],
		inCellEditing: {
			type: "input",
			contentSource: "field",
			autoCommitText: true,
			beforeCommit: function(e) {
				// console.log("beforeCommit", e)
			}
		},
		contextMenu: contextMenuModel,
		columnFitting: {
			title: false,
			autoAdjust: true,
			paddingSize: 20
		}
	};

	grid.columns = allAvailableColumns;
	grid.config = blotterConfig;
	grid.data = dataRows;

	column_grouping_selector.addEventListener("opened-changed", function(e) {
		if (!this.opened) {
			var columns = grid.columns;
			var filtered = columns.filter(function(column) {
				return column.checkboxColumn !== true;
			});
			var data = filtered.map(function(column) {
				return {
					label: column.name,
					value: column.field
				}
			});
			var criteria = rowGroupingExt.getGroupingCriteria();
			var selectorData = data.filter(function(item) {
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

	column_grouping_selector.addEventListener("value-changed", function(e) {
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
- `Coral Button Formatter`,
- `Coral Icon Formatter`,
- `Custom Formatter`,
- `column-selection-dialog`,
- `filter-dialog`
