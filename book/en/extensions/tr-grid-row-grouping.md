<link rel="stylesheet" href="../resources/styles/elf-template.css">

## Row Grouping

The Row Grouping Extension uses categorization based on column field. Each group will have arrow button for expansion and collapsing of its members.

```live
<style>
	atlas-blotter {
		height: 225px;
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>

<script>
	tr.DataGenerator.addFieldInfo("companyName", {
		type: "set",
		members: ["Kunze LLC", "Rohan-Kohler", "Bosco-Terry", "Prohaska", "Ziemann Group"]
	});
	tr.DataGenerator.addFieldInfo("industry", {
		type: "set",
		members: ["Chemicals", "Auto", "Finance", "Electric", "Biotechnology"]
	});
	var fields = ["companyName", "market", "industry", "CF_NETCHNG", "date1"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 20 });
	var configObj = {
		columns: [
			{ name: "Company", field: fields[0] },
			{ name: "Industry", field: fields[2] },
			{ name: "Net. Chng", field: fields[3], width: 100, alignment: "right" },
			{ name: "Updated", field: fields[4] }
		],
		staticDataRows: records,
		rowGrouping: {
			groupBy: fields[1]
		},
		extensions: [
			new tr.RowGroupingExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Installation and how to import to a project

Installation examples and details of how to import the extension to a project are available on the [Overview](README.md) page.

### Basic usage

To group your data together, You can specify `groupBy` option under `rowGrouping`. The value can be either a string or an array of column field. If input as an array, the Grid will display as a nested group.

By default, there will be an extra row display as a header of each group.

```js
var config = {
	// any other grid's options
	columns: [{
		{ id: 'c1', name: 'Column 1', field: 'col1' },
		// more column options
	}],
	rowGrouping: {
		groupBy: 'col1' // Or ['col2', 'col3', ...]
	},
};
```

### Initial collapsing state

The initial groups created by the extension are expanded by default. To initially collapse all groups by default, set `defaultCollapse` property to `true`

```live
<style>
	atlas-blotter {
		height: 225px;
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>

<script>
	tr.DataGenerator.addFieldInfo("companyName", {
		type: "set",
		members: ["Kunze LLC", "Rohan-Kohler", "Bosco-Terry", "Prohaska", "Ziemann Group"]
	});
	tr.DataGenerator.addFieldInfo("industry", {
		type: "set",
		members: ["Chemicals", "Auto", "Finance", "Electric", "Biotechnology"]
	});
	var fields = ["companyName", "market", "industry", "CF_NETCHNG", "date1"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 20 });
	var configObj = {
		columns: [
			{ name: "Company", field: fields[0] },
			{ name: "Industry", field: fields[2] },
			{ name: "Net. Chng", field: fields[3], width: 100, alignment: "right" },
			{ name: "Updated", field: fields[4] }
		],
		staticDataRows: records,
		rowGrouping: {
			defaultCollapse: true,
			groupBy: fields[1]
		},
		extensions: [
			new tr.RowGroupingExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Data sorting

This extension can work with the [Sorting Extension](../sorting/sorting.md) out-of-the-box. But only the data within the group will be sorted, not the columns which are grouped.

> Note: Try clicking on column header

```live
<style>
	atlas-blotter {
		height: 225px;
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>

<script>
	tr.DataGenerator.addFieldInfo("companyName", {
		type: "set",
		members: ["Kunze LLC", "Rohan-Kohler", "Bosco-Terry", "Prohaska", "Ziemann Group"]
	});
	tr.DataGenerator.addFieldInfo("industry", {
		type: "set",
		members: ["Chemicals", "Auto", "Finance", "Electric", "Biotechnology"]
	});
	var fields = ["companyName", "market", "industry", "CF_NETCHNG", "date1"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 20 });
	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{ name: "Company", field: fields[0] },
			{ name: "Industry", field: fields[2] },
			{ name: "Net. Chng", field: fields[3], width: 100, alignment: "right" },
			{ name: "Updated", field: fields[4] }
		],
		staticDataRows: records,
		rowGrouping: {
			groupBy: fields[1]
		},
		extensions: [
			new tr.RowGroupingExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Group sorting

In some case you might want to prioritize some group over another. We provide a way to sort the group with `groupSortLogic` option. If so, you can sort a group using the `groupSortLogic` option. It receives the same compare function as [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

```js
var config = {
	// any other grid's options
	rowGrouping: {
		groupSortLogic: function(grp1, grp2) { // Sort in ascending order (A -> Z)
			if(grp1 < grp2) return -1;
			if(grp1 > grp2) return 1;
			return 0;
		},
		groupBy: 'col1' // Or ['col2', 'col3', ...]
	},
};
```

You can now see that `DJI` has more priority over `HKEX`.

```live
<style>
	atlas-blotter {
		height: 225px;
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>

<script>
	tr.DataGenerator.addFieldInfo("companyName", {
		type: "set",
		members: ["Kunze LLC", "Rohan-Kohler", "Bosco-Terry", "Prohaska", "Ziemann Group"]
	});
	tr.DataGenerator.addFieldInfo("industry", {
		type: "set",
		members: ["Chemicals", "Auto", "Finance", "Electric", "Biotechnology"]
	});
	var fields = ["companyName", "market", "industry", "CF_NETCHNG", "date1"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 20 });
	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{ name: "Company", field: fields[0] },
			{ name: "Industry", field: fields[2] },
			{ name: "Net. Chng", field: fields[3], width: 100, alignment: "right" },
			{ name: "Updated", field: fields[4] }
		],
		staticDataRows: records,
		rowGrouping: {
			groupBy: fields[1],
			groupSortLogic: function(grp1, grp2) { // Sort in ascending order (A -> Z)
				if(grp1 < grp2) return -1;
				if(grp1 > grp2) return 1;
				return 0;
			}
		},
		extensions: [
			new tr.RowGroupingExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Nested group

This is achieved by setting `groupBy` options with array of fields.

```js
var config = {
	// any other grid's options
	rowGrouping: {
		groupBy: ["group", "c1"]
	},
};
```

```live
<style>
	atlas-blotter {
		height: 225px;
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>

<script>
	tr.DataGenerator.addFieldInfo("companyName", {
		type: "set",
		members: ["Kunze LLC", "Rohan-Kohler", "Bosco-Terry", "Prohaska", "Ziemann Group"]
	});
	tr.DataGenerator.addFieldInfo("industry", {
		type: "set",
		members: ["Chemicals", "Auto", "Finance", "Electric", "Biotechnology"]
	});
	var fields = ["companyName", "market", "industry", "CF_NETCHNG", "date1"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 20 });
	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{ name: "Company", field: fields[0] },
			{ name: "Industry", field: fields[2] },
			{ name: "Net. Chng", field: fields[3], width: 100, alignment: "right" },
			{ name: "Updated", field: fields[4] }
		],
		staticDataRows: records,
		rowGrouping: {
			groupBy: [fields[1], fields[2]]
		},
		extensions: [
			new tr.RowGroupingExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Rendering group header rows

By default, group header rows are rendered by their group value. To override default rendering, you need to define `groupHeaderBinding` and `nonGroupBinding` methods in the configuration. `groupHeaderBinding` will be executed for every group header rows and is used for custom rendering. `nonGroupBinding` is used to cleared any special styles set in `groupHeaderBinding`, since the same cell are re-used for both group header rows and non-group header rows (content rows). 

By default, group header rows are displayed as a single cell that spans across multiple columns. It works by stretching existing cells from the first column to fill entire grid's width. You can turn off cell spanning by setting `headerSpanning` to false in the configuration. The option can be useful, if you want to show some content, such as statistics, on group header rows for every column. You can also specify which cells to be stretched by setting `displayColumn` to other column (default is the first column).

#### Example custom style in group header rows
In the example below, we demonstrate how to customize the style of group header rows. With this customization, you can add elements to the group header rows and include additional information from your side.

If you want to use the `predefinedColors` option and specify a `groupId` using the `groupColors` property, there are certain limitations to be aware of. Specifically, you need to be aware of the group ID, as you've already set the `groupColor` within the grid configuration. This implies that you won't be able to alter the `groupColors` during runtime. 

However, if your intention is to modify individual groups during runtime, you can achieve this by using the `setGroupColor` method. By providing the group ID and the color as arguments to this method to change the tag colors. If you want to add a new group to the grid and set its color using this API, we recommend listening for the `groupAdded` event and use `setGroupColor` method to set group color when the group is added as show you in example below.

```live
<style>
	hr {
	margin: 5px;
	}

	atlas-blotter {
		height: 600px;
	}
</style>

	<atlas-blotter id="grid"></atlas-blotter>

<script>
	tr.DataGenerator.addFieldInfo("industry", {
			type: "set",
			members: ["Chemicals", "Auto", "Finance", "Electric", "Biotechnology"]
		});

		tr.DataGenerator.addFieldInfo("status", {
			type: "set",
			members: ["GROUP_1", "GROUP_2", "GROUP_3", "GROUP_4", "GROUP_5", "GROUP_6"]
		});
		var rowGrouping = new tr.RowGroupingExtension();
		var fields = ["industry", "words", "PRICECLOSE", "PRICELAST", "status", "id"];

		var predefinedColorsSet = {
			yellow: {
				backgroundColor: "#FF9900"
			},
			red: {
				backgroundColor: "#FF0000"
			},
			green: {
				backgroundColor: "#00FF00"
			}
		};

		// Application should be manage your group object in your application
		var currentCountGroup = 6;
		var statusMapping = {
			// Pending
			GROUP_1: {
				statusName: "Pending Register",
				detail: "Buy TASLA.O 5,000 @ 145.11 (gs)",
				color: predefinedColorsSet["yellow"].backgroundColor,
				icon: "info",
				colorClass: "yellow",
				status: "pending"
			},
			GROUP_2: {
				statusName: "Pending Send",
				detail: "Buy TASLA.O 5,000 @ 145.11 (gs)",
				color: predefinedColorsSet["yellow"].backgroundColor,
				icon: "info",
				colorClass: "yellow",
				status: "pending"
			},

			// Denined
			GROUP_3: {
				statusName: "Denined Amend",
				detail: "Buy TASLA.O 5,000 @ 145.11 (gs)",
				color: predefinedColorsSet["red"].backgroundColor,
				icon: "warning-circle",
				colorClass: "red",
				status: "denined"
			},
			GROUP_4: {
				statusName: "Denined Register",
				detail: "Buy TASLA.O 5,000 @ 145.11 (gs)",
				color: predefinedColorsSet["red"].backgroundColor,
				icon: "warning-circle",
				colorClass: "red",
				status: "denined"
			},

			// Approved
			GROUP_5: {
				statusName: "Approved Register",
				detail: "Buy TASLA.O 5,000 @ 145.11 (gs)",
				color: predefinedColorsSet["green"].backgroundColor,
				status: "approved",
				colorClass: "green",
				icon: "info",
			},
			GROUP_6: {
				statusName: "Approved Send",
				detail: "Buy TASLA.O 5,000 @ 145.11 (gs)",
				color: predefinedColorsSet["green"].backgroundColor,
				status: "approved",
				colorClass: "green",
				icon: "info",

			}
		};

		// Approved 
		function onContinueClicked(groupId, e) {
			var rowIds = grid.api.getDataView().getGroup(groupId).getAllRowIds();
			var groupStatus = statusMapping[groupId];
			var nextStatus = groupStatus.statusName;
			var statusObj = {
				statusName: "Approved Send",
				detail: "Buy TASLA.O 5,000 @ 145.11 (gs)",
				color: predefinedColorsSet["green"].backgroundColor,
				status: "approved",
				icon: "info",
				colorClass: "green"
			};
			var newGroupId = "GROUP_" + ++currentCountGroup;
			statusMapping[newGroupId] = statusObj;
			for (var i = 0; i < rowIds.length; i++) {
				var rowId = rowIds[i];
				var rowDef = grid.api.getRowDefinition(rowId);
				rowDef.setData("status", newGroupId);
			}
			currentCountGroup++;

			e.stopPropagation(); // Prevent collapsing/expanding grouop when click header
		}

		function onAbortClicked(groupId, e) {
			var rowIds = grid.api.getDataView().getGroup(groupId).getAllRowIds();
			var groupStatus = statusMapping[groupId];
			var nextStatus = groupStatus.statusName;
			var statusObj = {
				statusName: "Denined Register",
				detail: "Buy TASLA.O 5,000 @ 145.11 (gs)",
				color: predefinedColorsSet["red"].backgroundColor,
				status: "denied",
				icon: "info",
				colorClass: "red"
			};
			var newGroupId = "GROUP_" + ++currentCountGroup;
			statusMapping[newGroupId] = statusObj;
			for (var i = 0; i < rowIds.length; i++) {
				var rowId = rowIds[i];
				var rowDef = grid.api.getRowDefinition(rowId);
				rowDef.setData("status", newGroupId);
			}
			currentCountGroup++;

			e.stopPropagation(); // Prevent collapsing/expanding grouop when click header
		}

		function onGroupAdded(e) {
			var newGroup = e.newGroup;
			var groupId = newGroup.getGroupId();
			var groupStatus = statusMapping[groupId];
			rowGrouping.setGroupColor(groupId, statusMapping[groupId].colorClass);
		}

		function onGroupBinding(e) {
			// row header binding only called when cell colIndex = 0 (so for another column we need to  loop colCount to set another cell)
			var groupId = e.groupId;
			var cell = e.cell;

			var content = cell.getContent();
			if (!content || !content._customHeader) {
				content = document.createElement("div");
				content._customHeader = content;

				var iconEl = document.createElement("coral-icon");
				iconEl.style.paddingRight = "6px";
				content._icon = iconEl;

				var statusEl = document.createElement("span");
				statusEl.style.alignSelf = "center";
				content._statusName = statusEl;

				var descriptionEl = document.createElement("span");
				descriptionEl.style.alignSelf = "center";
				descriptionEl.style.paddingLeft = "24px";
				content._description = descriptionEl;

				var divButtonEl = document.createElement("div");
				var continueButtonEl = document.createElement("coral-button");
				continueButtonEl.textContent = "CONTINUE";
				content._continueButton = continueButtonEl;

				var abortButtonEl = document.createElement("coral-button");
				abortButtonEl.textContent = "ABORT";
				abortButtonEl.style.marginLeft = "12px";
				content._abortButton = abortButtonEl;

				divButtonEl.appendChild(continueButtonEl);
				divButtonEl.appendChild(abortButtonEl);

				content.style.display = "flex";
				content.style.alignItems = "center";
				content.style.justifyContent = "space-between";

				var leftDiv = document.createElement("div");
				leftDiv.style.display = "flex";

				leftDiv.appendChild(iconEl);
				leftDiv.appendChild(statusEl);
				leftDiv.appendChild(descriptionEl);

				var rightDiv = document.createElement("div");
				rightDiv.appendChild(divButtonEl);

				content.appendChild(leftDiv);
				content.appendChild(rightDiv);
			}

			content._icon.icon = statusMapping[groupId].icon; // All icon for elf element https://elf.int.refinitiv.com/styles/icons.html for another icon you can use .src to ref svg file
			content._icon.style.color = statusMapping[groupId].color;
			content._icon.style.display = statusMapping[groupId].status !== "approved" ? "block" : "none";

			content._statusName.textContent = statusMapping[groupId].statusName;
			content._statusName.style.color = statusMapping[groupId].color;

			content._description.textContent = statusMapping[groupId].detail;

			content._continueButton.addEventListener(
				"click",
				onContinueClicked.bind(this, groupId)
			);
			content._abortButton.addEventListener(
				"click",
				onAbortClicked.bind(this, groupId)
			);

			cell.setContent(content);
		}

		var records = tr.DataGenerator.generateRecords(fields, { seed: 3, numRows: 12 });
		var configObj = {
			rowGrouping: {
				groupBy: fields[4],
				headerSpanning: true,
				groupHeaderBinding: onGroupBinding,
				predefinedColors: predefinedColorsSet,
				groupSortLogic: groupSortingASC,
				autoGroupRemoval: true,
				groupAdded: onGroupAdded
			},
			columns: [{
				name: "Industry",
				field: fields[0],
				statistics: "label"
			},
			{
				name: "Describe",
				field: fields[1]
			},
			{
				name: "Price Close",
				field: fields[2],
				alignment: "right",
				binding: currencyBinding,
				statistics: "currencyStat"
			},
			{
				name: "Price Last",
				field: fields[3],
				alignment: "center",
				binding: currencyBinding,
				statistics: "currencyStat"
			}
			],
			staticDataRows: records,
			extensions: [rowGrouping]
		};

		var grid = document.getElementById("grid");
		grid.config = configObj;

		grid.addEventListener("beforeContentBinding", onBeforeContentBinding);

		function onBeforeContentBinding(e) {
			if (!e.actualUpdate) {
				return;
			}
			var rows = grid.api.getAllRowDefinitions();
			console.log(rows);
		}

		function currencyBinding(e) {
			var cell = e.cell;
			var data = e.data;
			cell.setContent(addSymbol(data));
		}

		function addSymbol(data) {
			var symbol = "$";
			return symbol + data;
		}

		function groupSortingASC(grp1, grp2) {
			// Sort in ascending order (A -> Z)
			if (grp1 < grp2) return -1;
			if (grp1 > grp2) return 1;
			return 0;
		}
</script>
```
#### Example summation row in group header rows
In the example below, we demonstrate how to calculate the summation of row data for each column and display it in the group header rows.
```live
<style>
	atlas-blotter {
		height: 225px;
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>

<script>
	tr.DataGenerator.addFieldInfo("companyName", {
		type: "set",
		members: ["Kunze LLC", "Rohan-Kohler"]
	});
	tr.DataGenerator.addFieldInfo("industry", {
		type: "set",
		members: ["Chemicals", "Auto", "Finance", "Electric", "Biotechnology"]
	});
	tr.DataGenerator.addFieldInfo("market", {
		type: "set",
		members: ["NASDAQ", "DJI", "NIKKEI"]
	});
	var fields = ["companyName", "industry", "CF_NETCHNG", "integer", "market"];
	var records = tr.DataGenerator.generateRecords(fields, { seed: 1, numRows: 7 });
	
	function onGroupHeaderBinding(e) {
		// Calculate Summation
		var colCount = e.api.getColumnCount();
		var fields = e.api.getColumnFields();
		var rows = e.api.getMultipleRowData(e.dataSource);
		var rowCount = rows.length;
		var stats = [];
		for (var c = 0; c < colCount; ++c) {
			var sum = 0;
			var valid = false;
			var field = fields[c];
			for (var r = 0; r < rowCount; ++r) {
				var row = rows[r];
				var val = row ? row[field] : null;
				if (typeof val === "number") {
					sum += val;
					valid = true;
				}
			}
			if(valid) {
				stats[c] = sum;
			}
		}

		// Render cells
		var section = e.section;
		for (var c = 0; c < colCount; ++c) {
			var cell = section.getCell(c, e.rowIndex);
			if (c === 0) {
				cell.setContent("Group " + e.groupId + " (" + rowCount + ")");
			} else {
				cell.setContent(stats[c]);
			}
		}
	}

	var configObj = {
		columnReorder: false,
		columnSelection: true,
		sorting: {
			sortableColumns: true,
			initialSort: {
				colIndex: 2,
				order: "d"
			}
		},
		rowGrouping: {
			groupBy: fields[0],
			headerSpanning: false,
			groupHeaderBinding: onGroupHeaderBinding,
			nonGroupBinding: function (e) {}
		},
		columns: [
			{ name: "Company", field: fields[0] },
			{ name: "Industry", field: fields[1] },
			{ name: "Net. Chng", field: fields[2], alignment: "center" },
			{ name: "Integer", field: fields[3], alignment: "right" },
			{ name: "Market", field: fields[4]},
		],
		staticDataRows: records,
		extensions: [
			new tr.RowGroupingExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Null/undefined group hiding

In many cases, a group of data might contain an `undefined` or `null` value. This may display an unexpected grouped title.

#### Example with null/undefined group

```live
<style>
	atlas-blotter {
		height: 225px;
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>

<script>
	tr.DataGenerator.addFieldInfo("companyName", {
		type: "set",
		members: ["Kunze LLC", "Rohan-Kohler", "Bosco-Terry", "Prohaska", "Ziemann Group"]
	});
	tr.DataGenerator.addFieldInfo("industry", {
		type: "set",
		members: ["Chemicals", "Auto", "Finance", "Electric", "Biotechnology", null]
	});
	tr.DataGenerator.addFieldInfo("market", {
		type: "set",
		members: ["NASDAQ", "DJI", "NIKKEI"]
	});
	var fields = ["companyName", "market", "industry", "CF_NETCHNG", "date1"];
	var records = tr.DataGenerator.generateRecords(fields, { seed: 0, numRows: 16 });
	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{ name: "Company", field: fields[0] },
			{ name: "Industry", field: fields[2] },
			{ name: "Net. Chng", field: fields[3], width: 100, alignment: "right" },
			{ name: "Updated", field: fields[4] }
		],
		staticDataRows: records,
		rowGrouping: {
			groupSortLogic: function(grpId1, grpId2, grpView1, grpView2) { // Move undefined or null group to the top
				var grpVal1 = grpView1.getGroupValue();
				var grpVal2 = grpView2.getGroupValue();
				if(!grpVal1) {
					if(grpVal2) {
						return -1;
					}
					return 0; // both grpVal1 and grpVal2 is null or undefined group
				} else if(!grpVal2) {
					return 1;
				}
				
				if(grpId1 < grpId2) return -1;
				if(grpId1 > grpId2) return 1;
				return 0;
			},
			groupBy: fields[2]
		},
		extensions: [
			new tr.RowGroupingExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

Turn on an `autoGroupHiding` option to hide all the group header that display as `null` or `undefined`. The rows of data that are in a `null` group will still show and are distinct from the group above them by different indentation. 

```js
var config = {
	// any other grid's options
	rowGrouping: {
		autoGroupHiding: true
	},
};
```

#### Example with hidden null/undefined group

```live
<style>
	atlas-blotter {
		height: 225px;
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>

<script>
	tr.DataGenerator.addFieldInfo("companyName", {
		type: "set",
		members: ["Kunze LLC", "Rohan-Kohler", "Bosco-Terry", "Prohaska", "Ziemann Group"]
	});
	tr.DataGenerator.addFieldInfo("industry", {
		type: "set",
		members: ["Chemicals", "Auto", "Finance", "Electric", "Biotechnology", null]
	});
	 tr.DataGenerator.addFieldInfo("market", {
		type: "set",
		members: ["NASDAQ", "DJI", "NIKKEI"]
	});
	var fields = ["companyName", "market", "industry", "CF_NETCHNG", "date1"];
	var records = tr.DataGenerator.generateRecords(fields, { seed: 0, numRows: 16 });
	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{ name: "Company", field: fields[0] },
			{ name: "Industry", field: fields[2] },
			{ name: "Net. Chng", field: fields[3], width: 100, alignment: "right" },
			{ name: "Updated", field: fields[4] }
		],
		staticDataRows: records,
		rowGrouping: {
			autoGroupHiding: true,
			groupSortLogic: function(grpId1, grpId2, grpView1, grpView2) { // Move undefined or null group to the top
				var grpVal1 = grpView1.getGroupValue();
				var grpVal2 = grpView2.getGroupValue();
				if(!grpVal1) {
					if(grpVal2) {
						return -1;
					}
					return 0; // both grpVal1 and grpVal2 is null or undefined group
				} else if(!grpVal2) {
					return 1;
				}
				
				if(grpId1 < grpId2) return -1;
				if(grpId1 > grpId2) return 1;
				return 0;
			},
			groupBy: fields[2]
		},
		extensions: [
			new tr.RowGroupingExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Rows in multiple groups

In the case that data used for grouping is an array, the data row will be added to multiple groups according to the array's member. See the following example for an illustration.

```live
<style>
	atlas-blotter {
		height: 225px;
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>

<script>
	tr.DataGenerator.addFieldInfo("companyName", {
		type: "set",
		members: ["Kunze LLC", "Rohan-Kohler", "Bosco-Terry", "Prohaska", "Ziemann Group"]
	});
	tr.DataGenerator.addFieldInfo("industry", {
		type: "set",
		members: ["Chemicals", "Finance", "Electric", ["Auto", "Electric"], ["Chemicals", "Biotechnology"]]
	});
	var fields = ["companyName", "market", "industry", "CF_NETCHNG", "date1", "id"];
	var records = tr.DataGenerator.generateRecords(fields, { seed: 1, numRows: 12});
	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{ name: "ID", field: fields[5], width: 80 },
			{ name: "Company", field: fields[0] },
			{ name: "Industry", field: fields[2] },
			{ name: "Net. Chng", field: fields[3], width: 100, alignment: "right" },
			{ name: "Updated", field: fields[4] }
		],
		staticDataRows: records,
		rowGrouping: {
			groupBy: fields[2]
		},
		extensions: [
			new tr.RowGroupingExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Content as a header

In this mode, the header of the nested group will be hidden while the data row will act as a header instead. The first level group header expand/collapse button will be disabled by default.

To turn on this mode, set `contentAsHeader` to true.

> Note: This mode currently supports at most 2 levels of grouping.

```js
var config = {
	// any other grid's options
	rowGrouping: {
		contentAsHeader: true,
		groupBy: ['col1', 'col2'] // Support at most 2 levels of grouping if contentAsHeader is enabled.
	},
};
```

```live
<style>
	html hr {
		margin: 5px;
	}
	atlas-blotter {
		height: 225px;
	}
</style>
<button id="group_btn1">Clear grouping</button>
<button id="group_btn2">Group by company name</button>
<button id="group_btn3">Group by market and then company name</button>
<hr>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var rgExt = new tr.RowGroupingExtension();
	
	group_btn1.addEventListener("click", function(e) {
		rgExt.groupBy(null);
	});
	group_btn2.addEventListener("click", function(e) {
		rgExt.groupBy(fields[0]);
		rgExt.collapseAll();
	});
	group_btn3.addEventListener("click", function(e) {
		rgExt.groupBy([fields[1], fields[0]]);
		rgExt.collapseAll();
	});
	
	tr.DataGenerator.addFieldInfo("companyName", {
		type: "set",
		members: ["Kunze LLC", "Prohaska", "Ziemann Group"]
	});
	tr.DataGenerator.addFieldInfo("industry", {
		type: "set",
		members: ["Chemicals", "Auto", "Finance", "Electric", "Biotechnology"]
	});
	tr.DataGenerator.addFieldInfo("market", {
		type: "set",
		members: ["NASDAQ", "DJI", "NIKKEI"]
	});
	var fields = ["companyName", "market", "industry", "CF_NETCHNG", "date1"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 14 });
	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{ name: "Company", field: fields[0] },
			{ name: "Industry", field: fields[2] },
			{ name: "Net. Chng", field: fields[3], width: 100, alignment: "right" },
			{ name: "Updated", field: fields[4] }
		],
		staticDataRows: records,
		rowGrouping: {
			groupBy: [fields[1], fields[0]],
			contentAsHeader: true
		},
		extensions: [
			rgExt
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Predefined color

The extension supports color from the predefined colors. To do this you need to assign predefined class object to the `predefinedColors` property then specify group ID and color mapping object to the `groupColors` property.

```live
<style>
	html hr {
		margin: 5px;
	}
	atlas-blotter {
		height: 300px;
	}
	.example-container {
		display: inline;
	}
	.example-color {
		width: 50px;
		height: 24px;
		margin: 4px;
		display: inline-block;
		vertical-align: middle;
		line-height: 24px;
		color: #333;
		text-align: center;
	}
	button {
		vertical-align: middle;
	}
</style>

<div>
	Predefined color #1
	<div id="set1" class="example-container"></div>
	<button id="apply_btn1">Apply</button>
</div>
<div>
	Predefined color #2
	<div id="set2" class="example-container"></div>
	<button id="apply_btn2">Apply</button>
</div>

<hr>

<atlas-blotter id="grid"></atlas-blotter>

<script>
	var predefinedColorsSet1 = {
		"color-1": {
			backgroundColor: "#e41a1c"
		},
		"color-2": {
			backgroundColor: "#377eb8"
		},
		"color-3": {
			backgroundColor: "#4daf4a"
		},
		"color-4": {
			backgroundColor: "#984ea3"
		},
		"color-5": {
			backgroundColor: "#ff7f00"
		},
		"color-6": {
			backgroundColor: "#ffff33"
		},
		"color-7": {
			backgroundColor: "#a65628"
		}
	};

	var predefinedColorsSet2 = {
		"color-1": {
			backgroundColor: "#8dd3c7"
		},
		"color-2": {
			backgroundColor: "#ffffb3"
		},
		"color-3": {
			backgroundColor: "#bebada"
		},
		"color-4": {
			backgroundColor: "#fb8072"
		},
		"color-5": {
			backgroundColor: "#80b1d3"
		},
		"color-6": {
			backgroundColor: "#fdb462"
		},
		"color-7": {
			backgroundColor: "#b3de69"
		}
	};

	var color, el;
	var parent = document.getElementById("set1");
	var div = document.createElement("div");
	for (color in predefinedColorsSet1) {
		el = div.cloneNode();
		el.textContent = color;
		el.classList.add("example-color");
		el.style.backgroundColor = predefinedColorsSet1[color].backgroundColor;
		parent.appendChild(el);
	}

	parent = document.getElementById("set2");
	for (color in predefinedColorsSet2) {
		el = div.cloneNode();
		el.textContent = color;
		el.classList.add("example-color");
		el.style.backgroundColor = predefinedColorsSet2[color].backgroundColor;
		parent.appendChild(el);
	}

	tr.DataGenerator.addFieldInfo("companyName", {
		type: "set",
		members: ["Kunze LLC", "Rohan-Kohler", "Bosco-Terry", "Prohaska", "Ziemann Group"]
	});
	tr.DataGenerator.addFieldInfo("industry", {
		type: "set",
		members: ["Chemicals", "Auto", "Finance", "Electric", "Biotechnology"]
	});

	var fields = ["companyName", "market", "industry", "CF_NETCHNG", "date1"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 20 });
	var ext = new tr.RowGroupingExtension();
	var configObj = {
		columns: [
			{ name: "Company", field: fields[0] },
			{ name: "Industry", field: fields[2] },
			{ name: "Net. Chng", field: fields[3], width: 100, alignment: "right" },
			{ name: "Updated", field: fields[4] }
		],
		staticDataRows: records,
		rowGrouping: {
			predefinedColors: predefinedColorsSet1,
			groupColors: {
					NYSE: "color-1",
					NASDAQ: "color-2",
					SET: "color-3",
					DJI: "color-4",
					HSCEI: "color-5",
					HKEX: "color-6",
					NIKKEI: "color-7"
			},
			groupBy: fields[1]
		},
		extensions: [
			ext
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;

	document.getElementById("apply_btn1").addEventListener("click", function(e) {
		ext.setPredefinedColors(predefinedColorsSet1);
	});

	document.getElementById("apply_btn2").addEventListener("click", function(e) {
		ext.setPredefinedColors(predefinedColorsSet2);
	});
</script>

```

### Statistic Calculation with Row Grouping

The Row Grouping Extension offers comprehensive support for statistic calculation with row grouping, allowing users to customize binding for header and footer rows seamlessly.

In the example below, we demonstrate how to leverage the power of row grouping to perform detailed statistical analysis within the grid. By incorporating both header and footer rows, users can easily access relevant group statistics. We achieve optimal performance by utilizing the `beforeContentBinding` event, which triggers whenever there are data changes. This approach ensures efficient row virtualization, displaying only the necessary data visible to the user. As a result, the application's speed and responsiveness are significantly improved, especially when working with large datasets.

Additionally, the `beforeContentBinding` feature plays a crucial role in optimizing performance. Whenever there are changes in the underlying data, this event is triggered, allowing you to perform necessary calculations or updates before the content is rendered. This approach enhances efficiency and provides real-time updates, ensuring that users always have access to the most accurate and up-to-date information.

```live(test-resource)
<style> 
	html body {
	padding: 20px;
	box-sizing: border-box;
	}
	hr {
	margin: 5px;
	}

	efx-grid {
	height: 400px;
	}
</style>

<fieldset>
  <legend> Operations </legend>
  <span> Position (rowIndex) : </span> <input value="1" id="rowIndex_txt">
  <button id="add_row"> Add row </button>
  <button id="remove_row"> Remove row </button>
  <button id="update_row"> Change row data </button>
  <button id="change_group"> Change Group </button>
</fieldset>
<hr>  
<atlas-blotter id="grid"></atlas-blotter>

<script> 


var rowGrouping= new tr.RowGroupingExtension();
var statisticRows = new tr.StatisticsRowExtension();

tr.DataGenerator.addFieldInfo("industry", {
  type: "set",
  members: ["Chemicals", "Auto", "Finance", "Electric", "Biotechnology"]
});

var fields = ["industry", "words", "PRICECLOSE", "PRICELAST"];
const SUMMATIONFIELDS = ["PRICECLOSE", "PRICELAST"];
const GROUPFIELD = "industry";

function onGroupBinding(e) {
  // row header binding only called when cell colIndex = 0 (so for another column we need to  loop colCount to set another cell)
  var groupId = e.groupId;
  var rows = e.dataSource.getAllRowData();
  var rowCount = rows.length;
  var colCount = e.api.getColumnCount();
  var section = e.section;
  var footerRow = e.footerRow;
  for (let c = 0; c < colCount; c++) {
    var field = e.api.getColumnField(c);

    if (field === GROUPFIELD) {
      var cell = section.getCell(c, e.rowIndex);
      var prefix = footerRow ? "FOOTER: " : "HEADER: ";
      cell.setContent(prefix + groupId + " (" + rowCount + ")");
    }

    if (SUMMATIONFIELDS.indexOf(field) >= 0) {
      var cell = section.getCell(c, e.rowIndex);
      var statData = stats[field][groupId];
      cell.setContent(addSymbol(statData || 0));
    }
  }
}

var records = tr.DataGenerator.generateRecords(fields, { seed: 0, numRows: 6 });
var configObj = {
  rowGrouping: {
    groupBy: fields[0],
    headerSpanning: false,
    groupHeaderBinding: onGroupBinding,
    groupFooterBinding: onGroupBinding,
    nonGroupBinding: function (e) {}
  },
  columns: [
    {
      name: "Industry",
      field: fields[0],
      statistics: "label"
    },
    {
      name: "Describe",
      field: fields[1]
    },
    {
      name: "Price Close",
      field: fields[2],
      alignment: "right",
      binding: currencyBinding,
      statistics: "currencyStat"
    },
    {
      name: "Price Last",
      field: fields[3],
      alignment: "center",
      binding: currencyBinding,
      statistics: "currencyStat"
    }
  ],
  staticDataRows: records,
  extensions: [rowGrouping, statisticRows],
  statisticsRow: {
    rows: [{ statistic: "currencyStat", label: "Footer Summation" }],
    postCalculation: postCalculationCurrency
  }
};

var grid = (window.grid = document.getElementById("grid"));
grid.config = configObj;

grid.addEventListener("configured", function (e) {
  grid.api.listen("beforeContentBinding", onBeforeContentBinding);
});

var stats = (window.stats = {});
var summationFieldLen = SUMMATIONFIELDS.length;
initializeStates();

function initializeStates() {
  for (let f = 0; f < summationFieldLen; f++) {
    var field = SUMMATIONFIELDS[f];
    if (!stats[field]) {
      stats[field] = {};
    }
  }
}

function onBeforeContentBinding(e) {
  if (!e.actualUpdate) {
    return;
  }
  var rows = grid.api.getAllRowDefinitions();

  var len = rows.length;

  for (let c = 0; c < summationFieldLen; c++) {
    var field = SUMMATIONFIELDS[c];
    stats[field] = {}; // Assign new values
    for (let r = 0; r < len; r++) {
      var rowDef = rows[r];
      var rowData = rowDef.getRowData();
      var groupId = rowData[GROUPFIELD];
      var sum = rowData[field] || 0; // for row doens't contains the summation field
      stats[field][groupId] = (stats[field][groupId] || 0) + sum;
    }
  }
}

function postCalculationCurrency(e) {
  e.statistics[2].currencyStat = addSymbol(e.statistics[2]["sum"]);
  e.statistics[3].currencyStat = addSymbol(e.statistics[3]["sum"]);
}

function currencyBinding(e) {
  var cell = e.cell;
  var data = e.data;
  cell.setContent(addSymbol(data));
}

function addSymbol(data) {
  var symbol = "$";
  return symbol + data;
}

document.getElementById("change_group").addEventListener("click", function (e) {
  var rowIndex = +document.getElementById("rowIndex_txt").value;
  var rowDef = grid.api.getRowDefinition(rowIndex);
  if (rowDef) {
    rowDef.updateRowData({ industry: "Electric" });
  }
});

document.getElementById("add_row").addEventListener("click", function (e) {
  var rowIndex = +document.getElementById("rowIndex_txt").value;
  var record = tr.DataGenerator.generateRecord(fields);
  record["industry"] = "Chemicals";
  grid.api.insertRow({ values: record }, rowIndex);
});

document.getElementById("remove_row").addEventListener("click", function (e) {
  var rowIndex = +document.getElementById("rowIndex_txt").value;
  grid.api.removeRow(rowIndex);
});

document.getElementById("update_row").addEventListener("click", function (e) {
  var rowIndex = +document.getElementById("rowIndex_txt").value;
  var record = tr.DataGenerator.generateRecord(fields);
  record["industry"] = "Chemicals"; // FORCE assign to Chemicals
  var rowDef = grid.api.getRowDefinition(rowIndex);
  if (rowDef) {
    rowDef.updateRowData(record);
  }
});



</script>

```

<div></div>

<h2 style="margin-bottom:5px" id="api-refs">API Reference</h2>
<div id="elf-api-container"><div id="main-template" class="elf-template">    <section><article>                                                                        <h3 class="subsection-title">Type Definitions</h3>                        <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~GroupCriteria">GroupCriteria</h4><div class="description">    GroupCriteria can be one of the following values: <br><b>null</b> input will clear all existing grouping criteria <br><b>string</b> input is treat as column/field name in the data table <br><b>Function</b> input is for custom criteria <br><b>Array</b> input will create multiple groups in tree like manner (nested group criteria)</div>    <h5>Type:</h5>    <span class="param-type">string</span> | <span class="param-type">Array.&lt;(string|function())&gt;</span><div class="details">                                                            </div></div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~GroupingState">GroupingState</h4><div class="description">    state of groupings or JSON String</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>collapsed</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                                </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>groupId</code></td>                        <td class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last"></td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">                                <div class="item-type">typedef</div>                        <h4 class="name" id="~GroupSortLogic"><span class="type-signature"></span>GroupSortLogic<span class="signature">(grpValA, grpValB, grpDataViewA<span class="signature-attributes">opt</span>, grpDataViewB<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {number}</span></h4>                            <div class="description">        Method parameters provided by `groupSortLogic` callback    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">grpValA</div>                        <div class="type">                            <span class="param-type">*</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    Group value of the group in left hand side                </div>                    </div>                <div class="param">                            <div class="name">grpValB</div>                        <div class="type">                            <span class="param-type">*</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    Group value of the group in right hand side                </div>                    </div>                <div class="param">                            <div class="name">grpDataViewA</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    DataView of the group in left hand side                </div>                    </div>                <div class="param">                            <div class="name">grpDataViewB</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    DataView of the group in right hand side                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div>                </div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Options">Options</h4><div class="description">    The options can be specified by `rowGrouping` property of the main grid's options</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>autoGroupRemoval</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">Remove group that has no row member.</td>        </tr>            <tr>                            <td class="name"><code>autoGroupHiding</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">Hide "null" or "undefined" group headers, while keeping the group's items intact.</td>        </tr>            <tr>                            <td class="name"><code>predefinedGroups</code></td>                        <td class="type">                            <span class="param-type">Array</span> | <span class="param-type">Array.&lt;Array&gt;</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Add groups without content rows. Use 2D array for multi-level grouping.</td>        </tr>            <tr>                            <td class="name"><code>groupBy</code></td>                        <td class="type">                            <span class="param-type"><a href="#~GroupCriteria">RowGroupingPlugin~GroupCriteria</a></span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">GroupCriteria can be string, function, or array of string.</td>        </tr>            <tr>                            <td class="name"><code>groupCriteria</code></td>                        <td class="type">                            <span class="param-type"><a href="#~GroupCriteria">RowGroupingPlugin~GroupCriteria</a></span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Alias to `groupBy`.</td>        </tr>            <tr>                            <td class="name"><code>displayColumn</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    0                                </td>                        <td class="description last">Column Index for group header rendering.</td>        </tr>            <tr>                            <td class="name"><code>fixedDisplayColumn</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">If enabled, displayColumn will remain in the same index, even if columns are shifted by insertion or removal.</td>        </tr>            <tr>                            <td class="name"><code>noCollapsible</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">If enabled, arrows will be hidden and cell is not clickable. This flag takes precedence over `clickableCell` and `hiddenArrow`.</td>        </tr>            <tr>                            <td class="name"><code>clickableCell</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    true                                </td>                        <td class="description last">If disabled, clicking at cell will not expand that group</td>        </tr>            <tr>                            <td class="name"><code>hiddenArrow</code></td>                        <td class="type">                            <span class="param-type">boolean</span> | <span class="param-type">number</span> | <span class="param-type">Array.&lt;number&gt;</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Specify header levels which is a single number start from 1 or an array of number that want to hide arrow icon. If specify true all arrows will be hidden.</td>        </tr>            <tr>                            <td class="name"><code>contentAsHeader</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">If enabled, second level group header rows are hidden, the first content rows become a header, cells are not be clickable, and arrows are hidden.</td>        </tr>            <tr>                            <td class="name"><code>headerSpanning</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    true                                </td>                        <td class="description last">If disabled, every cell on the group header row is displayed</td>        </tr>            <tr>                            <td class="name"><code>footerSpanning</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">If enabled, only cells from the first column will be shown, spanning over other cells</td>        </tr>            <tr>                            <td class="name"><code>groupSortLogic</code></td>                        <td class="type">                            <span class="param-type"><a href="#~GroupSortLogic">RowGroupingPlugin~GroupSortLogic</a></span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Logic for group sorting. There is no sorting by default (i.e. groups are placed in order of their creation time)</td>        </tr>            <tr>                            <td class="name"><code>autoGroupSorting</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">If enabled, group sorting will be performed after each `groupAdded` event</td>        </tr>            <tr>                            <td class="name"><code>indentSize</code></td>                        <td class="type">                            <span class="param-type">boolean</span> | <span class="param-type">number</span> | <span class="param-type">Array.&lt;number&gt;</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Use array to define indent for each group level. Use boolean to turn on or off indentation. Use number to define incremental step.</td>        </tr>            <tr>                            <td class="name"><code>colorTag</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">If not specified, the color tag will be disabled when using extension without halo theme.</td>        </tr>            <tr>                            <td class="name"><code>predefinedColors</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Predefined color object map for color tag</td>        </tr>            <tr>                            <td class="name"><code>groupColors</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">The object map of group ID and predefined color.</td>        </tr>            <tr>                            <td class="name"><code>defaultCollapse</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">Collapsing groups by default when a group is created</td>        </tr>            <tr>                            <td class="name"><code>clicked</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Event handler when user clicks on arrows or cells</td>        </tr>            <tr>                            <td class="name"><code>groupAdded</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Event handler</td>        </tr>            <tr>                            <td class="name"><code>beforeGroupAdded</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Event handler</td>        </tr>            <tr>                            <td class="name"><code>groupHeaderBinding</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Logic that will be executed on each group header row</td>        </tr>            <tr>                            <td class="name"><code>groupFooterBinding</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Once defined, footer row will be added on each group</td>        </tr>            <tr>                            <td class="name"><code>headerBinding</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Shorthand for `groupHeaderBinding`</td>        </tr>            <tr>                            <td class="name"><code>footerBinding</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Shorthand for `groupFooterBinding`</td>        </tr>            <tr>                            <td class="name"><code>nonGroupBinding</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">This is used to clear any custom styling defined in groupHeaderBinding or groupFooterBinding</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <h3 class="subsection-title">Methods</h3>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="beforeProcessOption"><span class="type-signature"></span>beforeProcessOption<span class="signature">(optionName, optionVal)</span><span class="type-signature"> → {*}</span></h4>                            <div class="description">        Convert built-in grid config to extension config    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">optionName</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>                <div class="param">                            <div class="name">optionVal</div>                        <div class="type">                            <span class="param-type">*</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">*</span>    </div><div class="sub-content-desc">    The transformed value of the option</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="collapse"><span class="type-signature"></span>collapse<span class="signature">(groupRowId, opt_collapsed<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">groupRowId</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">opt_collapsed</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="collapseAll"><span class="type-signature"></span>collapseAll<span class="signature">(opt_collapsed<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_collapsed</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="config"><span class="type-signature"></span>config<span class="signature">(options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Grid configuration object                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="disableClicking"><span class="type-signature"></span>disableClicking<span class="signature">(opt_disabled<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_disabled</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="enableFixedDisplayColumn"><span class="type-signature"></span>enableFixedDisplayColumn<span class="signature">(opt_enabled<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                            <div class="description">        Fixed display column to stay at the same position even though the column has been moved, or shifted by removing and inserting column    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_enabled</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="enableFooterRow"><span class="type-signature"></span>enableFooterRow<span class="signature">(opt_num<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_num</div>                        <div class="type">                            <span class="param-type">boolean</span> | <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="expand"><span class="type-signature"></span>expand<span class="signature">(groupRowId, opt_expanded<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">groupRowId</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">opt_expanded</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="expandAll"><span class="type-signature"></span>expandAll<span class="signature">(opt_expanded<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_expanded</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getColumnMenu"><span class="type-signature"></span>getColumnMenu<span class="signature">(colIndex, config)</span><span class="type-signature"> → {Object}</span></h4>                            <div class="description">        Function for ColumnMenuExtension to collect config of column menu    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Column index                </div>                    </div>                <div class="param">                            <div class="name">config</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    Column Menu configuration                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getConfigObject"><span class="type-signature"></span>getConfigObject<span class="signature">(gridOptions<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Object}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">gridOptions</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getDataView"><span class="type-signature"></span>getDataView<span class="signature">()</span><span class="type-signature"> → {Object}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div><div class="sub-content-desc">    DataView instance</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getDefaultCollapse"><span class="type-signature"></span>getDefaultCollapse<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getFooterRowCount"><span class="type-signature"></span>getFooterRowCount<span class="signature">()</span><span class="type-signature"> → {number}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getGroupingCriteria"><span class="type-signature"></span>getGroupingCriteria<span class="signature">()</span><span class="type-signature"> → {Array.&lt;string&gt;}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;string&gt;</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getGroupingStates"><span class="type-signature"></span>getGroupingStates<span class="signature">()</span><span class="type-signature"> → {Array.&lt;<a href="#~GroupingState">RowGroupingPlugin~GroupingState</a>&gt;}</span></h4>                            <div class="description">        Returns an array of states (collapsed or expanded)    </div>                        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;<a href="#~GroupingState">RowGroupingPlugin~GroupingState</a>&gt;</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getGroupSortingLogic"><span class="type-signature"></span>getGroupSortingLogic<span class="signature">()</span><span class="type-signature"> → {function}</span></h4>                            <div class="description">        Get the current group sort function. If none specified by setGroupSortingLogic() return <br>standard string sort function.    </div>                        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">function</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getName"><span class="type-signature"></span>getName<span class="signature">()</span><span class="type-signature"> → {string}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="groupBy"><span class="type-signature"></span>groupBy<span class="signature">(criteria)</span><span class="type-signature"></span></h4>                            <div class="description">        Alias for <a href="#setGroupingCriteria">RowGroupingPlugin#setGroupingCriteria</a>    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">criteria</div>                        <div class="type">                            <span class="param-type"><a href="#~GroupCriteria">RowGroupingPlugin~GroupCriteria</a></span>                        </div>                                            </div>            </div>        <div class="details">                                                            <dt class="tag-see">See:</dt>    <dd class="tag-see">        <ul>            <li><a href="#setGroupingCriteria">RowGroupingPlugin#setGroupingCriteria</a></li>        </ul>    </dd>        </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hasGroupingCriteria"><span class="type-signature"></span>hasGroupingCriteria<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hasMultiTableSupport"><span class="type-signature"></span>hasMultiTableSupport<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Plugin that has multi-table support means that it can have multiple hosts/tables and share its states across those hosts/tables.    </div>                        <div class="details">                <dt class="inherited-from">Inherited From:</dt>    <dd class="inherited-from">        <a href="">GridPlugin#hasMultiTableSupport</a>    </dd>                                                    </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="initialize"><span class="type-signature"></span>initialize<span class="signature">(host, options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    core grid object                </div>                    </div>                <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setDefaultCollapse"><span class="type-signature"></span>setDefaultCollapse<span class="signature">(collapse)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">collapse</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                                                    <div class="description">                    Predefined color object map                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setGroupColor"><span class="type-signature"></span>setGroupColor<span class="signature">(groupRef, groupColor)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">groupRef</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>                <div class="param">                            <div class="name">groupColor</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                                    <div class="description">                    color name from predefinedColors                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setGroupingCriteria"><span class="type-signature"></span>setGroupingCriteria<span class="signature">(criteria)</span><span class="type-signature"></span></h4>                            <div class="description">        Each duplicate values in the given columns will be grouped together. Number of generated groups will equal to number of unique values in the given columns.    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">criteria</div>                        <div class="type">                            <span class="param-type"><a href="#~GroupCriteria">RowGroupingPlugin~GroupCriteria</a></span>                        </div>                                                    <div class="description">                    &lt;br&gt;Null input will clear all existing grouping criteria. &lt;br&gt;String input is treat as column name in data table &lt;br&gt;Array input will create mutilple groups in tree like manner (nested group criteria) &lt;br&gt;Any previous given values will be cleared out after calling this method                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setGroupingStates"><span class="type-signature"></span>setGroupingStates<span class="signature">(states)</span><span class="type-signature"></span></h4>                            <div class="description">        Set state for groups    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">states</div>                        <div class="type">                            <span class="param-type">Array.&lt;<a href="#~GroupingState">RowGroupingPlugin~GroupingState</a>&gt;</span> | <span class="param-type">string</span>                        </div>                                                    <div class="description">                    Array state of groupings or JSON String                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setGroupSortingLogic"><span class="type-signature"></span>setGroupSortingLogic<span class="signature">(sortFunction)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">sortFunction</div>                        <div class="type">                            <span class="param-type"><a href="#~GroupSortLogic">RowGroupingPlugin~GroupSortLogic</a></span>                        </div>                                                    <div class="description">                    Comparer function for comparing the order of 2 groups. The function should take at least 2 parameters. &lt;br&gt;The function should return -1 if the first parameter should comes first, 1 for the other way, and 0 if they are equal. &lt;br&gt;The two first parameters passed to the function are group value that separates group. &lt;br&gt;The two last parameters passed to the function are data views of corresponding group.                </div>                    </div>            </div>        <div class="details">                                                            </div>                                            <h5>Example:</h5>            <pre><code>var compare = function(grpA, grpB, dataViewA, dataViewB) {
  return (grpA &lt;= grpB) ? -1 : 1;
}
var dstp = new RowGroupingExtension();
dstp.setGroupSortingLogic(compare);</code></pre>    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setPredefinedColors"><span class="type-signature"></span>setPredefinedColors<span class="signature">(predefinedColors)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">predefinedColors</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    Predefined color object map                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setPredefinedGroups"><span class="type-signature"></span>setPredefinedGroups<span class="signature">(predefinedGroups)</span><span class="type-signature"></span></h4>                            <div class="description">        Specify empty group in case of grouping values are known prior to requesting data    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">predefinedGroups</div>                        <div class="type">                            <span class="param-type">Array</span> | <span class="param-type">Array.&lt;Array&gt;</span>                        </div>                                                    <div class="description">                    &lt;br&gt;Values in the given array should be matched the value coming from a data table, or else no content is added to the group &lt;br&gt;Use null value to clear all predefined groups. &lt;br&gt;Use 2D array to specify nested groups. &lt;br&gt;Any previous given values will be cleared out after calling this method                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="sortGroups"><span class="type-signature"></span>sortGroups<span class="signature">()</span><span class="type-signature"></span></h4>                            <div class="description">        Trigger group sorting logic -- re-sort the existing groups. This will not continuously apply to each data update.    </div>                        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="unload"><span class="type-signature"></span>unload<span class="signature">(host<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    core grid object                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="updateHeaders"><span class="type-signature"></span>updateHeaders<span class="signature">()</span><span class="type-signature"></span></h4>                                            <div class="details">                                                            </div>                                    </div>                        <h3 class="subsection-title">Events</h3>                    <div class="item">                                <div class="item-type">event</div>                        <h4 class="name" id="event:beforeGroupAdded">beforeGroupAdded</h4>                            <div class="description">        Fired each time before group added. Set property `cancel` to true to cancel adding of the new group    </div>                    <h5>Type:</h5>        <span class="param-type">Object</span>                    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>dataView</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">DataView instance</td>        </tr>            <tr>                            <td class="name"><code>newGroupId</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>newGroupValue</code></td>                        <td class="type">                            <span class="param-type">*</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>newGroupRowId</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                                    <td class="description last">Unique row Id given for the group</td>        </tr>        </tbody></table></div><div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">event</div>                        <h4 class="name" id="event:clicked">clicked</h4>                            <div class="description">        Fired when users click on UIs that trigger expanding or collapsing a group    </div>                    <h5>Type:</h5>        <span class="param-type">Object</span>                    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>rowIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>expanded</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>group</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Data view that represents currently clicked group header row</td>        </tr>        </tbody></table></div><div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">event</div>                        <h4 class="name" id="event:groupAdded">groupAdded</h4>                                                <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>dataView</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Parent DataView that create the new group</td>        </tr>            <tr>                            <td class="name"><code>newGroup</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Child DataView that is newly created</td>        </tr>        </tbody></table></div><div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">event</div>                        <h4 class="name" id="event:groupFooterBinding">groupFooterBinding</h4>                            <div class="description">        Fired when footer of each group is rendered    </div>                    <h5>Type:</h5>        <span class="param-type">Object</span>                    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>rowData</code></td>                        <td class="type">                            <span class="param-type">object</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>colIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>rowIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>rowId</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>footerIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>groupId</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>footerRow</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>cell</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Grid cell instance</td>        </tr>            <tr>                            <td class="name"><code>section</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">VirtualizedLayoutGrid</td>        </tr>            <tr>                            <td class="name"><code>dataSource</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Parent DataView of group</td>        </tr>        </tbody></table></div><div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">event</div>                        <h4 class="name" id="event:groupHeaderBinding">groupHeaderBinding</h4>                            <div class="description">        Fired when header of each group is rendered    </div>                    <h5>Type:</h5>        <span class="param-type">Object</span>                    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>rowData</code></td>                        <td class="type">                            <span class="param-type">object</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>colIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>rowIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>rowId</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>footerIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>groupId</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>footerRow</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>cell</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Grid cell instance</td>        </tr>            <tr>                            <td class="name"><code>section</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">VirtualizedLayoutGrid</td>        </tr>            <tr>                            <td class="name"><code>dataSource</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Parent DataView of group</td>        </tr>        </tbody></table></div><div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">event</div>                        <h4 class="name" id="event:nonGroupBinding">nonGroupBinding</h4>                            <div class="description">        Fired for each normal content row rendering    </div>                    <h5>Type:</h5>        <span class="param-type">Object</span>                    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>rowData</code></td>                        <td class="type">                            <span class="param-type">object</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>colIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>rowIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>rowId</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>cell</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Grid cell instance</td>        </tr>            <tr>                            <td class="name"><code>section</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">VirtualizedLayoutGrid</td>        </tr>            <tr>                            <td class="name"><code>dataSource</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Root DataView of all group</td>        </tr>            <tr>                            <td class="name"><code>noIndent</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                                    <td class="description last">set this property to true to prevent cell add indent</td>        </tr>        </tbody></table></div><div class="details">                                                            </div>                                    </div>            </article></section></div></div>