<link rel="stylesheet" href="../resources/styles/elf-template.css">

## Row Segmenting

The Row Segmenting Extension provides a way to group row content based on row index. By specifying a row index, the row becomes a group header. Any row below the group header can then be added as a group member. This provides more flexibility in how you define a group, unlike Row Grouping Extension where groups are based on strictly defined criteria. 

```live
<style>
	html hr {
		margin: 5px;
	}
</style>

<button id="set_btn1">Toggle Row 3</button>
<button id="set_btn2">Toggle Row 6</button>
<button id="set_btn3">Toggle Row 9</button>
<button id="unset_btn">Remove All Separators</button>
<hr>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var rowSegmentingExt = new tr.RowSegmentingExtension();
	var rowDraggingExt = new tr.RowDraggingExtension();
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 10 });
	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{ name: "Company", field: fields[0] },
			{ name: "Market", field: fields[1], width: 120 },
			{ name: "Last", field: fields[2], width: 100 },
			{ name: "Net. Chng", field: fields[3], width: 100 },
			{ name: "Industry", field: fields[4] }
		],
		staticDataRows: records,
		extensions: [
			rowSegmentingExt,
			rowDraggingExt
		]
	};

	var grid = document.getElementById("grid");
	grid.addEventListener("configured", function() {
		rowSegmentingExt.setSegmentSeparator(2);
		rowSegmentingExt.setSegmentSeparator(5);
		rowSegmentingExt.setSegmentSeparator(8);
		rowSegmentingExt.fillSegments();
	});
	grid.config = configObj;

	document.getElementById("set_btn1").addEventListener("click", function(e) {
		rowSegmentingExt.removeAllSegmentChildren();
		rowSegmentingExt.setSegmentSeparator(2, !rowSegmentingExt.isSegmentSeparator(2));
		rowSegmentingExt.fillSegments();
	});
	document.getElementById("set_btn2").addEventListener("click", function(e) {
		rowSegmentingExt.removeAllSegmentChildren();
		rowSegmentingExt.setSegmentSeparator(5, !rowSegmentingExt.isSegmentSeparator(5));
		rowSegmentingExt.fillSegments();
	});
	document.getElementById("set_btn3").addEventListener("click", function(e) {
		rowSegmentingExt.removeAllSegmentChildren();
		rowSegmentingExt.setSegmentSeparator(8, !rowSegmentingExt.isSegmentSeparator(8));
		rowSegmentingExt.fillSegments();
	});
	document.getElementById("unset_btn").addEventListener("click", function(e) {
		rowSegmentingExt.unsetAllSegmentSeparators();
	});
</script>

```

### Installation and how to import to a project

Installation examples and details of how to import the extension to a project are available on the [Overview](README.md) page.

## Differences between Row Segmenting Extension and Row Grouping Extension

Both extensions produce very similar looking results, but there are some key differences in behaviors and functionalities. 

### Group header (segment separator)

The group headers in Row Segmenting Extension have their own data/content, whereas those in Row Grouping Extension have no data. Group headers in Row Segmenting Extension are actually normal row with a separator mark on it. This means you can perform sorting and filtering on the group headers.

The group headers in the Row Grouping Extension have no data because they are automatically generated based on the specified criteria. So they have no place to hold their data and you will need to have a separate place to hold it. Because of this extra place to manage, it's more difficult to perform sorting and filtering on these group headers.

### Dragging group header

The group headers in Row Segmenting Extension can be moved by dragging, if we use Row Dragging Extension. Moving group header is the same as moving row content. After moving, group headers will also move their row members along with them.

The group headers in Row Grouping Extension cannot be moved freely. They can only moved or ordered by sorting operation. This is because they are automatically generated and constantly added or removed according to data updates. 

> Note: dragging behaviors for group headers have not yet finalized and are subject to change.

### Grouping criteria

Specifying a group header in Row Segmenting Extension is a bit more difficult. Each group header has to be set manually through the extension's APIs. Use the `setSegmentSeparator()` method to specify group header. Group members need to be manually added to the new groups by `addSegmentChild()` or `addSegmentChildren()` methods. Any row added to the group will be moved below the group header position. Rows that are already a group member cannot be added to another group. 

Grouping in Row Grouping Extension are based on row content. So, you can add or remove a group by just changing content of a row. A row can be moved between different groups by changing content of the row as well. 

> More APIs will be implemented to accommodate adding or removing member in the future updates.

### Segment Classification (multi-level/nested grouping)

With Row Segmenting Extension, you can specify classfication on individual segment to add nested segments. The criteria can be defined by using `setSegmentClassification` method with array of fields as its parameter. 

```live
<style>
	html hr {
		margin: 5px;
	}
	atlas-blotter {
		height: 300px;
	}
</style>
<button id="set_btn1">Classify by market</button>
<button id="set_btn2">Classify by industry</button>
<button id="set_btn3">Classify by market and industry</button>
<button id="set_btn4">Unclassify</button>
<hr>
<button id="data_btn1">Set row 6 market to NASDAQ</button>
<button id="data_btn2">Set row 6 market to DJI</button>
<button id="data_btn3">Set row 6 industry to Investment Managers</button>
<button id="data_btn4">Set row 6 industry to Paper</button>
<hr>
<atlas-blotter></atlas-blotter>

<script type="module">
	var segmentIdx = 1;
	set_btn1.addEventListener("click", function(e) {
		rowSegmentingExt.setSegmentClassification(segmentIdx, ["market"]);
	});
	set_btn2.addEventListener("click", function(e) {
		rowSegmentingExt.setSegmentClassification(segmentIdx, ["industry"]);
	});
	set_btn3.addEventListener("click", function(e) {
		rowSegmentingExt.setSegmentClassification(segmentIdx, ["market", "industry"]);
	});
	set_btn4.addEventListener("click", function(e) {
		rowSegmentingExt.setSegmentClassification(segmentIdx, null);
	});
	
	data_btn1.addEventListener("click", function(e) {
		grid.api.setStaticData(row5, "market", "NASDAQ");
	});
	data_btn2.addEventListener("click", function(e) {
		grid.api.setStaticData(row5, "market", "DJI");
	});
	data_btn3.addEventListener("click", function(e) {
		grid.api.setStaticData(row5, "industry", "Investment Managers");
	});
	data_btn4.addEventListener("click", function(e) {
		grid.api.setStaticData(row5, "industry", "Paper");
	});
	
	var row5 = null;
	var rowSegmentingExt = new tr.RowSegmentingExtension();
	var fields = ["companyName", "id", "market", "industry", "number_2", "float_1"];
	var columnMap = {};
	var columns = fields.map(function(f) {
		var column = {
			name: f,
			field: f
		};
		columnMap[f] = column;
		return column;
	});
	columnMap["companyName"].width = 200;
	columnMap["id"].width = 60;

	var records = tr.DataGenerator.generateRecords(fields, {seed: 0, rowCount: 20});
	var configObj = {
		columns: columns,
		extensions: [
			rowSegmentingExt
		]
	};

	var grid = window.grid = document.getElementsByTagName("atlas-blotter")[0];
	grid.addEventListener("configured", function(e) {
		row5 = e.detail.api.getRowDefinition(6);
		rowSegmentingExt.setSegmentSeparator(segmentIdx);
		rowSegmentingExt.addSegmentChildren(segmentIdx, [2, 3, 4, 5, 6, 7]);
		
		rowSegmentingExt.setSegmentSeparator(10);
		rowSegmentingExt.addSegmentChildren(10, [11, 12, 13]);
	});
	grid.config = configObj;
	grid.data = records;
</script>
```

### Group sorting

Row segmenting can be sorted manually through an API `sortSeparators` from `SortableTitlePlugin`. The method accept a sorting function as parameter. If no parameter is passed to the function, the segments will be sorted according to the current sorting states of the grid.

> Note:
> - When clearing the grid sorting state, the segments will not return to its original order. To make it return to  original position, `sortSeparators` need to be called with a custom sorting function.
> - Sorting segment operation only swap position between segments, therefore the content rows between the segments will not be moved to stick together at top of the grid. 

```live
<style>
	html hr {
		margin: 5px;
	}
</style>

<button id="clear_sort">Clear sorting states</button>
<button id="original_sort_segment">Sort segments to original order</button>
<hr>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var rowSegmentingExt = new tr.RowSegmentingExtension();
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 15 });
	var segmentId = "SegmentId";
	records[2]["segmentOrder"] = 1;
	records[2][segmentId] = "1";
	records[3][segmentId] = "1";
	records[4][segmentId] = "1";

	records[5]["segmentOrder"] = 2;
	records[5][segmentId] = "2";
	records[6][segmentId] = "2";
	records[7][segmentId] = "2";

	records[10]["segmentOrder"] = 3;
	records[10][segmentId] = "3";
	records[11][segmentId] = "3";
	records[12][segmentId] = "3";

	var originalSortFunc = function(rowA, rowB){
		var segmentOrderA = rowA["ROW_DEF"].getData("segmentOrder");
		var segmentOrderB = rowB["ROW_DEF"].getData("segmentOrder");
		if(segmentOrderA < segmentOrderB) {
			return -1;
		}
		if(segmentOrderB < segmentOrderA) {
			return 1;
		}
		return 0;
	}

	var configObj = {
		sorting: {
			sortableColumns: true,
			// After regular rows are sorted
			// Sort segments by current grid sorting states
			columnSorted: function (e) {
				e.sender.sortSeparators();
			}
		},
		rowSegmenting: {
			segmentIdField: segmentId
		},
		columns: [
			{ name: "Company", field: fields[0] },
			{ name: "Market", field: fields[1], width: 120 },
			{ name: "Last", field: fields[2], width: 100 },
			{ name: "Net. Chng", field: fields[3], width: 100 },
			{ name: "Industry", field: fields[4] }
		],
		staticDataRows: records,
		extensions: [
			rowSegmentingExt
		]
	};
	var grid = window.grid = document.getElementsByTagName("atlas-blotter")[0];
	grid.config = configObj;
	document.getElementById("clear_sort").addEventListener("click", function(e) {
		var stPlugin = grid.api.getCoreGrid().getPlugin("SortableTitlePlugin");
		stPlugin.clearSortState();
	});
	document.getElementById("original_sort_segment").addEventListener("click", function(e) {
		var stPlugin = grid.api.getCoreGrid().getPlugin("SortableTitlePlugin");
		stPlugin.sortSeparators(originalSortFunc);
	});
</script>

```

### Content sorting

Row content is sorted within its own group. The behavior is the same for both Row Segmenting and Row Grouping Extension.

## Row Segmenting Extension features

### Predefined color on the color tags

The extension supports color from the predefined colors. To do this you need to assign predefined class object to the `predefinedColors` property then specify field name of the `cssField` property.

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
<div>
	Change color of 6th row
	<button id="set_color_btn1">color #1</button>
	<button id="set_color_btn2">color #2</button>
	<button id="set_color_btn3">color #3</button>
</div>
<hr>

<atlas-blotter></atlas-blotter>

<script type="module">
	var predefinedColorsSet1 = {
		"color-1": {
			backgroundColor: "#FF2848"
		},
		"color-2": {
			backgroundColor: "#FFB27B"
		},
		"color-3": {
			backgroundColor: "#EEF3B4"
		}
	};

	var predefinedColorsSet2 = {
		"color-1": {
			backgroundColor: "#64864A"
		},
		"color-2": {
			backgroundColor: "#F56093"
		},
		"color-3": {
			backgroundColor: "#FFCCCD"
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
	
	var ext = new tr.RowSegmentingExtension();
	var fields = ["companyName", "CF_NETCHNG", "CF_VOLUME"];
	var columns = fields.map(function(f) {
		return {
			name: f,
			field: f
		};
	});

	columns.push({
		name: "color",
		field: "TAG_CSS_CLASS"
	});

	var records = tr.DataGenerator.generateRecords(fields, {seed: 1, rowCount: 20});

	records[2]["TAG_CSS_CLASS"] = "color-1";
	records[5]["TAG_CSS_CLASS"] = "color-2";
	records[8]["TAG_CSS_CLASS"] = "color-3";

	var configObj = {
		rowSegmenting: {
			cssField: "TAG_CSS_CLASS",
			predefinedColors: predefinedColorsSet1
		},
		columns: [
			{
				field: fields[0],
				name: "companyName"
			},
			{
				field: fields[1],
				name: "Net. Chng"
			},
			{
				field: fields[2],
				name: "Volume"
			}
		],
		extensions: [
			ext
		]
	};
	var grid = document.getElementsByTagName("atlas-blotter")[0];
	grid.addEventListener("configured", function(e) {
		ext.setSegmentSeparator(2);
		ext.setSegmentSeparator(5);
		ext.setSegmentSeparator(8);
		ext.fillSegments();
	});
	grid.config = configObj;
	grid.data = records;

	document.getElementById("apply_btn1").addEventListener("click", function(e) {
		ext.setPredefinedColors(predefinedColorsSet1);
	});

	document.getElementById("apply_btn2").addEventListener("click", function(e) {
		ext.setPredefinedColors(predefinedColorsSet2);
	});

	document.getElementById("set_color_btn1").addEventListener("click", function(e) {
		grid.api.setStaticData(5, "TAG_CSS_CLASS", "color-1");
	});

	document.getElementById("set_color_btn2").addEventListener("click", function(e) {
		grid.api.setStaticData(5, "TAG_CSS_CLASS", "color-2");
	});

	document.getElementById("set_color_btn3").addEventListener("click", function(e) {
		grid.api.setStaticData(5, "TAG_CSS_CLASS", "color-3");
	});

</script>
```

### Saving and loading segments

In atlas-blotter with Row Segmenting Extension we have spanningField, predefinedColor, segmentId can be implement save/load grid config,
We provide the user to set those properties with `setStaticRowData` or `setStaticData`.
When you set static data to pass grid API. It will be applied API in Row Segmenting Extension too. Such as, setPredefiniedColor can be set static value with grid.api.setStaticData(0,"TAG_CSS_CLASS", "color1") in runtime mode.
And also, in the initialization grid, it will get values from rows or staticDataRows, which is static data.

The example of set static data, which edits values in runtime,
we provide the use case save/load config from the grid.
You can get the config from the grid and use this config in another grid.

You can follow in below example for implement save/load functionality.
The first example it will be grid that can be change data with click "Save config". 
And then you can paste this config on the example 2 and click "Start Grid" and both grids look the same. 

#### Example 1: saving segment configuration from grid

```live

<style>
	html body {
		padding: 20px;
		box-sizing: border-box;
	}

	html hr {
		margin: 5px;
	}

	atlas-blotter {
		height: 300px;
	}
	
	#copy_success {
		color: green;
	}

	input[type="number"] {
		width: 40px;
	}
</style>

<span>Row Index</span>
<input value="1" type="number" id="row_index">
<hr>
<span> Set segment color</span>
<button id="set_segment_color_1"> Segment color 1 </button>
<button id="set_segment_color_2"> Segment color 2 </button>
<button id="set_segment_color_3"> Segment color 3 </button>
<button id="unset_segment_color"> Unset Segment Color</button>
<hr>
<span> Toggle Spanning </span>
<button id="spanning_segment_separator"> Toggle </button>
<hr>
<span> Save grid config for restore </span>
<button id="save_config"> Save config </button>
<span id="copy_success"> </span>
<atlas-blotter></atlas-blotter>

<script type="module">
	var rowSegmentingExt = window.rowSegmentingExt = new tr.RowSegmentingExtension();

	var fields = ["companyName", "industry", "CF_NETCHNG", "PCTCHNG", "CF_VOLUME"];

	var records = tr.DataGenerator.generateRecords(fields, { seed: 1, rowCount: 12 });

	// Initialize grid with segment separators
	records[1].segmentId = "1";
	records[2].segmentId = "1";
	records[3].segmentId = "1";

	records[4].segmentId = "3";
	records[5].segmentId = "3";
	records[6].segmentId = "3";

	records[7].segmentId = "2";
	records[8].segmentId = "2";
	records[9].segmentId = "2";
	
	// Set colors to each segment
	records[1].rowSegmentingColoringClass = "color-1";
	records[4].rowSegmentingColoringClass = "color-2";
	records[7].rowSegmentingColoringClass = "color-3";
	
	records[4].customGroup = "Custom Group 1";
	records[4].spanning = true;
	records[7].spanning = 2;


	var predefinedColorsSet1 = {
		"color-1": {
			backgroundColor: "#FF2848"
		},
		"color-2": {
			backgroundColor: "#FFB27B"
		},
		"color-3": {
			backgroundColor: "#EEF3B4"
		}
	};

	var configObj = {
		columns: [
			{
				name: "Company Name",
				field: fields[0],
				width: 120
			},
			{
				name: "Industry",
				field: fields[1]
			},
			{
				name: "Net. Chng",
				field: fields[2]
			},
			{
				name: "Price. Chng",
				field: fields[3]
			},
			{
				name: "Volume",
				field: fields[4]
			}
		],
		extensions: [rowSegmentingExt],
		rowSegmenting: {
			cssField: "rowSegmentingColoringClass",
			predefinedColors: predefinedColorsSet1,
			rowSpanningField: "spanning",
			segmentIdField: "segmentId",
			segmentSeparatorBinding: function (e) {
				if (e.rowData["customGroup"]) {
					e.cell.setTextContent(e.rowData["customGroup"]);
				} else {
					e.cell.setTextContent(e.rowData["companyName"]);
				}
			}
		},
		staticDataRows: records,
	};

	var grid = window.grid = document.getElementsByTagName("atlas-blotter")[0];
	grid.config = configObj;
	window.grid = grid;

	// listening Click Events

	set_segment_color_1.addEventListener("click", function (e) {
		var rowIndex = + row_index.value;
		grid.api.setStaticData(rowIndex, "rowSegmentingColoringClass", "color-1");
	});

	set_segment_color_2.addEventListener("click", function (e) {
		var rowIndex = + row_index.value;
		grid.api.setStaticData(rowIndex, "rowSegmentingColoringClass", "color-2");
	});

	set_segment_color_3.addEventListener("click", function (e) {
		var rowIndex = + row_index.value;
		grid.api.setStaticData(rowIndex, "rowSegmentingColoringClass", "color-3");
	});

	unset_segment_color.addEventListener("click", function (e) {
		var rowIndex = + row_index.value;
		grid.api.setStaticData(rowIndex, "rowSegmentingColoringClass", null);
	});


	spanning_segment_separator.addEventListener("click", function (e) {
		var rowIndex = + row_index.value;
		var rowSpanning = grid.api.getRowData(rowIndex).spanning;

		var rowDef = grid.api.getRowDefinition(rowIndex);
		rowDef.setStaticData("spanning", !rowSpanning);

	});

	save_config.addEventListener("click", function(e) {
		var config = grid.api.getConfigObject();
		var configStr = JSON.stringify(config, null, 2);
		copyToClipboard(configStr);
		copy_success.textContent = "Copied grid config to clipboard success";
		setTimeout(function(e) { copy_success.textContent = "" }, 5000); // clear alert user
	});

	function copyToClipboard(val) {
		// tmpInput for copy text
		var tmpInput = document.getElementById("tmp_input");
		if(!tmpInput) {
			tmpInput = document.createElement("textarea");
			tmpInput.id = "tmp_input";
			document.body.appendChild(tmpInput);
		}
		tmpInput.style.visibility = "visible";
		tmpInput.value = val;
		tmpInput.select();
		document.execCommand("copy");
		tmpInput.style.visibility = "hidden";

	}

</script>
```

#### Example 2: restoring segments

```live
<style>
	html body {
		padding: 20px;
		box-sizing: border-box;
	}

	html hr {
		margin: 5px;
	}

	atlas-blotter {
		height: 300px;
	}

	#area_config {
		width: 100%;
		height: 100px;
	}
</style>
<span> You can load the grid config with pase in below text area and then click "Start Grid" </span>
<hr>
<button id="start_grid"> Start Grid </button>
<hr>
<textarea id="area_config" placeholder="Patse grid config and click Start Grid"></textarea>
<hr>
<atlas-blotter></atlas-blotter>

<script type="module">
	var fields = ["companyName", "industry", "CF_NETCHNG", "PCTCHNG", "CF_VOLUME"];

	function onSeparatorBinding(e) {
		if (e.rowData["customGroup"]) {
			e.cell.setTextContent(e.rowData["customGroup"]);
		} else {
			e.cell.setTextContent(e.rowData["companyName"]);
		}
	}

	start_grid.addEventListener("click", function (e) {
		var grid = window.grid = window.grid = document.getElementsByTagName("atlas-blotter")[0];

		var valueConfig = JSON.parse(area_config.value);
		var configObj = valueConfig;
		if(configObj.rowSegmenting) {
			configObj.rowSegmenting["segmentSeparatorBinding"] = onSeparatorBinding;
		}
		grid.config = configObj;
	});

</script>
```

### SegmentId field

If you intend to apply a segment separator using the `segmentId` field during runtime, whenever the row data is updated, it is necessary to call the `requestSeparatorRefresh` function to forcefully render the user interface (UI). This step ensures that the changes are reflected in the UI, allowing for an accurate representation of the updated segment separators.

Currently, you can set the segment separator for the grid in two ways. The first method is by using the grid API through the `setSegmentSeparator` function. The second method involves setting the `segmentId` field in the row data. However, we strongly advise against using both methods simultaneously. Please choose one approach that suits your needs, keeping in mind that the user interface will appear similar regardless of the method chosen.

### Empty segment filtering and separator filtering

By default, segment header cannot be filtered out. However, Row Filtering Extension has `emptySegmentFiltering` option that allows empty segment to be filtered out. With the option turned on, any segment whose all of its members are not present by filtering will also be hidden. Empty segment will still be visible, if there is no active filter. Collapsing of the segment does not count as having an active filter.

`separatorFiltering` option from Row Filtering Extension also allow separator rows to be filtered as if they were a normal row. Note that the separator rows can be filtered out, while their child rows may ramain visible.  

```live
<style>
	html hr {
		margin: 5px;
	}
	atlas-blotter {
		height: 300px;
	}
	i:empty {
		padding-right: 20px;
	}
</style>
<label>Empty segment filtering: <input id="empty_segment_chk" type="checkbox" checked></label>
<i></i>
<label>Separator filtering: <input id="separator_chk" type="checkbox" checked></label>
<hr>
<atlas-blotter></atlas-blotter>

<script type="module">
	var chkBox = document.getElementById("empty_segment_chk");
	chkBox.addEventListener("change", function (e) {
		var checked = e.currentTarget.checked;
		rfExt.enableEmptySegmentFiltering(checked); // Changing mode at runtime
	});
	chkBox = document.getElementById("separator_chk");
	chkBox.addEventListener("change", function (e) {
		var checked = e.currentTarget.checked;
		rfExt.enableSeparatorFiltering(checked); // Changing mode at runtime
	});

	var fields = ["id", "companyName", "index4", "percent", "market"];
	var columns = fields.map(function (f, idx) {
		return {
			name: "Column " + idx,
			field: f
		};
	});
	columns[0].width = 80;

	var segmentId = "SegmentId";
	var records = tr.DataGenerator.generateRecords(fields, { seed: 0, rowCount: 15 });
	records[1][segmentId] = "0"; // To illustrate empty segment
	
	records[3][segmentId] = "1";
	records[4][segmentId] = "1";
	records[5][segmentId] = "1";
	records[6][segmentId] = "1";

	records[8][segmentId] = "2";
	records[9][segmentId] = "2";
	records[10][segmentId] = "2";
	records[11][segmentId] = "2";

	var fiExt = new tr.FilterInputExtension();
	var rfExt = new tr.RowFilteringExtension();
	var configObj = {
		columns: columns,
		rowFiltering: {
			emptySegmentFiltering: true,
			separatorFiltering: true
		},
		rowSegmenting: {
			segmentIdField: segmentId
		},
		staticDataRows: records,
		extensions: [rfExt, fiExt]
	};

	var grid = document.getElementsByTagName("atlas-blotter")[0];
	grid.config = configObj;
</script>
```

<div></div>

<h2 style="margin-bottom:5px" id="api-refs">API Reference</h2>
<div id="elf-api-container"><div id="main-template" class="elf-template">    <section><article>                                                                        <h3 class="subsection-title">Type Definitions</h3>                        <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Options">Options</h4><div class="description">    The options can be specified by `rowSegmenting` property of the main grid's options</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>spanning</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    true                                </td>                        <td class="description last">If disabled, segment separator rows will not be spanned/stretched across multiple cells</td>        </tr>            <tr>                            <td class="name"><code>colorTag</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">If not specified, the color tag will be disabled when using extension without halo theme.</td>        </tr>            <tr>                            <td class="name"><code>cssField</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    "TAG_CSS_CLASS"                                </td>                        <td class="description last">Apply CSS class based on the given field</td>        </tr>            <tr>                            <td class="name"><code>predefinedColors</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Predefined color object map for color tag</td>        </tr>            <tr>                            <td class="name"><code>clicked</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Event handler when user clicks on arrows or cells</td>        </tr>            <tr>                            <td class="name"><code>headerMenuClicked</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Event handler when user clicks on menu icon. The menu icon will be displayed if spanning option is true.</td>        </tr>            <tr>                            <td class="name"><code>segmentSeparatorBinding</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Logic that will be executed on each segment separator row</td>        </tr>            <tr>                            <td class="name"><code>nonSegmentSeparatorBinding</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Logic that will be executed for all non segment separator row</td>        </tr>            <tr>                            <td class="name"><code>sortingLogic</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Logic to be used by sortSegments method</td>        </tr>            <tr>                            <td class="name"><code>rowSpanningField</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    "ROW_SPANNING"                                </td>                        <td class="description last">selected field for apply row spanning in row separator</td>        </tr>            <tr>                            <td class="name"><code>segmentIdField</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    "SEGMENT_ID"                                </td>                        <td class="description last">selected field for set segment separator row</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">                                <div class="item-type">typedef</div>                        <h4 class="name" id="~SortingLogic"><span class="type-signature"></span>SortingLogic<span class="signature">(rowDataA, rowDataB)</span><span class="type-signature"> → {number}</span></h4>                            <div class="description">        Comparer function for comparing the order of 2 segment separator rows. The function takes at least 2 parameters. <br> The function should return -1 if the first parameter should comes first, 1 for the other way, and 0 if they are equal.    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowDataA</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    Row data of the segment separator row                </div>                    </div>                <div class="param">                            <div class="name">rowDataB</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    Row data of the segment separator row                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div>                </div>                            <h3 class="subsection-title">Methods</h3>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="addSegmentChild"><span class="type-signature"></span>addSegmentChild<span class="signature">(segmentRef, rowRef)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">segmentRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id or row index                </div>                    </div>                <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id, row index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="addSegmentChildren"><span class="type-signature"></span>addSegmentChildren<span class="signature">(segmentRef, rowRefs)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">segmentRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id or row index                </div>                    </div>                <div class="param">                            <div class="name">rowRefs</div>                        <div class="type">                            <span class="param-type">Array.&lt;(string|number)&gt;</span>                        </div>                                                    <div class="description">                    Array of row ids or row indices.  If null is given, no child will be removed.                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="collapseSegment"><span class="type-signature"></span>collapseSegment<span class="signature">(rowRef, collapsed<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Hide all members in the segment    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    Row id or row index of the segment separator                </div>                    </div>                <div class="param">                            <div class="name">collapsed</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div><div class="sub-content-desc">    Return true if there is any change</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="config"><span class="type-signature"></span>config<span class="signature">(options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Grid configuration object                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="expandAllSegments"><span class="type-signature"></span>expandAllSegments<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div><div class="sub-content-desc">    Return true if there is any change</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="expandSegment"><span class="type-signature"></span>expandSegment<span class="signature">(rowRef, expanded<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {boolean}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    Row id or row index                </div>                    </div>                <div class="param">                            <div class="name">expanded</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div><div class="sub-content-desc">    Return true if there is any change</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="fillSegment"><span class="type-signature"></span>fillSegment<span class="signature">(segmentRef)</span><span class="type-signature"></span></h4>                            <div class="description">        Remove existing segment children and fill the segments with all contnet rows before the next segment separator    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">segmentRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id or row index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="fillSegments"><span class="type-signature"></span>fillSegments<span class="signature">()</span><span class="type-signature"></span></h4>                            <div class="description">        Remove all existing segment children in each segment and fill the segments with all contnet rows before the next segment separator    </div>                        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getConfigObject"><span class="type-signature"></span>getConfigObject<span class="signature">(gridOptions<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Object}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">gridOptions</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getName"><span class="type-signature"></span>getName<span class="signature">()</span><span class="type-signature"> → {string}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getRowConfigObject"><span class="type-signature"></span>getRowConfigObject<span class="signature">(rowData, rowId)</span><span class="type-signature"> → {Object}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowData</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    row config object                </div>                    </div>                <div class="param">                            <div class="name">rowId</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div><div class="sub-content-desc">    return row config object with update special field data</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getSegmentChildIds"><span class="type-signature"></span>getSegmentChildIds<span class="signature">(segmentRef)</span><span class="type-signature"> → {Array.&lt;string&gt;}</span></h4>                            <div class="description">        Get row ids of all children from the specified segment    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">segmentRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id or row index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;string&gt;</span>    </div><div class="sub-content-desc">    Returns array of row ids. Returns null if there is no child or no segment separator found</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getSegmentIds"><span class="type-signature"></span>getSegmentIds<span class="signature">()</span><span class="type-signature"> → {Array.&lt;string&gt;}</span></h4>                            <div class="description">        Get row ids of all segment separator    </div>                        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;string&gt;</span>    </div><div class="sub-content-desc">    Return null if there is no segment separator</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getSegmentParentRowId"><span class="type-signature"></span>getSegmentParentRowId<span class="signature">(rowRef)</span><span class="type-signature"> → {string}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row Id or row index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div><div class="sub-content-desc">    parent row id of this segmentation. If the parent row id for this segmentation cannot be found, return ""</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hasMultiTableSupport"><span class="type-signature"></span>hasMultiTableSupport<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Plugin that has multi-table support means that it can have multiple hosts/tables and share its states across those hosts/tables.    </div>                        <div class="details">                <dt class="inherited-from">Inherited From:</dt>    <dd class="inherited-from">        <a href="">GridPlugin#hasMultiTableSupport</a>    </dd>                                                    </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hasSegmentation"><span class="type-signature"></span>hasSegmentation<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Check if there is at least one segment separator in the data view    </div>                        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="initialize"><span class="type-signature"></span>initialize<span class="signature">(host, options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    core grid instance                </div>                    </div>                <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="isSegmentCollapsed"><span class="type-signature"></span>isSegmentCollapsed<span class="signature">(rowRef)</span><span class="type-signature"> → {boolean}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id or row index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div><div class="sub-content-desc">    Return true if only the given row is a collapsed segment separator</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="isSegmentSeparator"><span class="type-signature"></span>isSegmentSeparator<span class="signature">(rowRef)</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Check if the specified row is a segment separator    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id or row index (not recommended for usage)                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="removeAllSegmentChildren"><span class="type-signature"></span>removeAllSegmentChildren<span class="signature">()</span><span class="type-signature"></span></h4>                                            <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="removeSegmentChild"><span class="type-signature"></span>removeSegmentChild<span class="signature">(segmentRef, rowRef)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">segmentRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id or row index                </div>                    </div>                <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id, row index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="removeSegmentChildren"><span class="type-signature"></span>removeSegmentChildren<span class="signature">(segmentRef, rowRefs)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">segmentRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id or row index                </div>                    </div>                <div class="param">                            <div class="name">rowRefs</div>                        <div class="type">                            <span class="param-type">Array.&lt;(string|number)&gt;</span>                        </div>                                                    <div class="description">                    Array of row ids or row indices                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="requestSeparatorRefresh"><span class="type-signature"></span>requestSeparatorRefresh<span class="signature">()</span><span class="type-signature"></span></h4>                            <div class="description">        request to set the segment separator with the segment ID field in row data    </div>                        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setPredefinedColors"><span class="type-signature"></span>setPredefinedColors<span class="signature">(predefinedColors)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">predefinedColors</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    Predefined color object map                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setSegmentClassification"><span class="type-signature"></span>setSegmentClassification<span class="signature">(rowRef, fields)</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Set classification for the specified segment    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id or row index                </div>                    </div>                <div class="param">                            <div class="name">fields</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">Array.&lt;string&gt;</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setSegmentCollapsingLogic"><span class="type-signature"></span>setSegmentCollapsingLogic<span class="signature">(func)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">func</div>                        <div class="type">                            <span class="param-type">function</span>                        </div>                                                    <div class="description">                    By default, all row members are hidden in a collapsed segment                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setSegmentSeparator"><span class="type-signature"></span>setSegmentSeparator<span class="signature">(rowRef, enabled<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Set specified row as a segment separator    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    Row id or row index                </div>                    </div>                <div class="param">                            <div class="name">enabled</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div><div class="sub-content-desc">    Return true if there is any change</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setSortingLogic"><span class="type-signature"></span>setSortingLogic<span class="signature">(sortFunction)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">sortFunction</div>                        <div class="type">                            <span class="param-type"><a href="#~SortingLogic">RowSegmentingPlugin~SortingLogic</a></span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="sortSegments"><span class="type-signature"></span>sortSegments<span class="signature">(sortFunction<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">sortFunction</div>                        <div class="type">                            <span class="param-type"><a href="#~SortingLogic">RowSegmentingPlugin~SortingLogic</a></span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="spanSegmentSeparator"><span class="type-signature"></span>spanSegmentSeparator<span class="signature">(rowRef, spanning)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                                                    <div class="description">                    rowIndex or rowId                </div>                    </div>                <div class="param">                            <div class="name">spanning</div>                        <div class="type">                            <span class="param-type">boolean</span> | <span class="param-type">null</span>                        </div>                                                    <div class="description">                    if set true when rowRef is row separator, then span that row                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="unload"><span class="type-signature"></span>unload<span class="signature">(host<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    core grid instance                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="unsetAllSegmentSeparators"><span class="type-signature"></span>unsetAllSegmentSeparators<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Clear all segment separator rows    </div>                        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div><div class="sub-content-desc">    Return true if there is any change</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="updateHeaders"><span class="type-signature"></span>updateHeaders<span class="signature">()</span><span class="type-signature"></span></h4>                                            <div class="details">                                                            </div>                                    </div>                </article></section></div></div>