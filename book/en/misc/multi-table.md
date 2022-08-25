# Multi-table feature

Multiple grids can be created within a single page. They are independent from each other. A change made to one grid won't affect on the other grids. Sometimes, you want multiple instances of the same grid to make more room for displaying data. MultiTableManager is created to support such case. MultiTableManager will create multiple instances of the same grid and syncronize any column related change across all those instances. Each grid created by MultiTableManager will always have the same column configuration and the extensions. You can have different different row content on each grid. 

> Note that MultiTableManager is just a helper class object. It is not a Grid extension which is tied to single grid instance. It can be viewed as another wrapper that manages multiple Grid instances. 

## Support features

MultiTableManager is still in development and support only some basic features as listed below:
- Each table will have the same width and become inline-block element.
- Each table will have the same number of rows and columns.
- Column Selection will be displayed on each table.
- Column Resizing will be applied on each table.
- Column Fitting will be applied on each table.
- Row Selection can be moved across multiple grids through keyboard navigation. Row selection can be only active for one grid at any time.
 

## Usage 

To use multi-table feature, you need to import MultiTableManager, a helper, from our utility package. Then, initialize the helper by supplying Grid element. The element will be used as primary table for creating another table. Lastly, initialize the Grid element by using `setGridConfig` method from the helper to specify configuration. 

To adjust number of tables, use `setTableCount` method. 

To get Grid element, use `getTable` method.

The basic setup process is shown in the example below:

```js
import MultiTableManager from "../node_modules/tr-grid-util/es6/MultiTableManager.js";

var gridElement = document.getElementById("grid");
var mgr = new MultiTableManager(gridElement);

var configObj = {
	/* grid configuration */
};
mgr.setGridConfig(configObj);

mgr.setTableCount(3); // Or any other number
```

### Multi-table Example

```live
<style>
	html hr {
		margin: 5px;
	}
	atlas-blotter {
		margin: 0 5px 5px;
		vertical-align: top;
	}
	#h_scrollbar_host {
		height: 400px;
	}
</style>

<button id="table_btn1">Table Count 1</button>
<button id="table_btn2">Table Count 2</button>
<button id="table_btn3">Table Count 3</button>
<button id="table_btn4">Table Count 4</button>
<hr>
<div id="v_scrollbar_host">
	<div id="h_scrollbar_host">
		<atlas-blotter id="grid"></atlas-blotter>
	</div>
</div>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 5 });
	
	var configObj = {
		columns: [
			{title: "Company", field: fields[0], width: 100},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 100}
		],
		staticDataRows: records,
		extensions: [
			new tr.RowSelectionExtension(),
			new tr.ColumnSelectionExtension(),
			new tr.ColumnResizingExtension(),
			new tr.ColumnFitterExtension(),
			new tr.ColumnDraggingExtension()
		]
	};

	var grid = document.getElementById("grid");
	var mgr = new tr.MultiTableManager(grid);
	// You can place grids side by side by using the following commands
	// var vScrollbarHost = document.getElementById("v_scrollbar_host");
	// var hScrollbarHost = document.getElementById("h_scrollbar_host");
	// tr.MultiTableManager.synchronizeVScrollbar(vScrollbarHost, hScrollbarHost, grid);

	mgr.setGridConfig(configObj);
	mgr.setTableCount(3);
	
	document.getElementById("table_btn1").addEventListener("click", function(e) {
		mgr.setTableCount(1);
	});
	document.getElementById("table_btn2").addEventListener("click", function(e) {
		mgr.setTableCount(2);
	});
	document.getElementById("table_btn3").addEventListener("click", function(e) {
		mgr.setTableCount(3);
	});
	document.getElementById("table_btn4").addEventListener("click", function(e) {
		mgr.setTableCount(4);
	});
	setInterval(function simulateDataUpdate() {
		if(!grid.api) {
			return;
		}
		var rowCount = mgr.getRowCount();
		for(var i = 0; i < 4; ++i) {
			var tbl = mgr.getTable(i);
			if(!tbl) {
				break;
			}
			for(var r = 0; r < rowCount; ++r) {
				if(!tr.DataGenerator.randInt(0, 4)) {
					var record = tr.DataGenerator.generateRecord(fields);
					tbl.api.setRowData(r, record);
				}
			}
		}
	}, 500);
</script>
```

## Positioning grids side by side with vertical scrollbar syncronization

You can display multiple grids side by side using CSS as shown in the above example. However, it does not work when you want to have a single vertical scrollbar for multiple grids. If normal native scrollbar is used, all rows in a grid have to be displayed and cannot be virtualized. Large number of rows in each grid can introduce performance problem. You can use Grid's scrollbars instead of native scrollbars to enable row virtualization and improve the performance. 

To link multiple grids together and have only one single vertical scrollbar, use `MultiTableManager.synchronizeVScrollbar` method. The method requires two elements to host the scrollbars and array of Grid elements. The first element is for hosting Grid vertical scrollbar. The second element is for hosting native horizontal scrollbar and Grid elements. The vertical scrollbar requires separated host element because it has to be float over view and not moved when horizontal scrolling occurs. The setup for element structure is shown below:

```html
<div id="v_scrollbar_host">
	<div id="h_scrollbar_host">
		<atlas-blotter></atlas-blotter>
		<atlas-blotter></atlas-blotter>
	</div>
</div>
```

The height for the grid can be specified on the vertical scrollbar host. If so, make sure that the height of horizontal scrollbar host is set to `100%`. The width of the grid can be set on the element itself or on every column of the grid.

### Side by side Grids Example

```live
<style>
	atlas-blotter+atlas-blotter {
		margin-left: 5px;
	}
	#v_scrollbar_host {
		height: 300px;
	}
	#h_scrollbar_host {
		height: 100%;
	}
	#grid_2 {
		width: 500px;
	}
</style>

<div id="v_scrollbar_host">
	<div id="h_scrollbar_host">
		<atlas-blotter id="grid_1"></atlas-blotter>
		<atlas-blotter id="grid_2"></atlas-blotter>
	</div>
</div>
<hr>

<script>
	var gen = tr.DataGenerator;
	var fields = ["companyName","percent", "number_2", "bid", "ask"];

	var records1 = gen.generateRecords(fields, {seed: 1, rowCount: 20});
	var records2 = gen.generateRecords(fields, {seed: 100, rowCount: 20});
	
	var configObj1 = {
		defaultColumnOptions: {
			width: 100
		},
		sorting: {
			initialSort: {
				colIndex: 3,
				sortOrder: "d"
			}
		},
		columns: [
			{title: fields[0], field: fields[0], width: 120},
			{title: fields[1], field: fields[1]},
			{title: fields[2], field: fields[2], colorText: true},
			{title: "Bid", field: "bid"}
		],
		staticDataRows: records1
	};
	var configObj2 = {
		sorting: {
			initialSort: {
				colIndex: 0,
				sortOrder: "a"
			}
		},
		columns: [
			{title: "Ask", field: "ask"},
			{title: fields[2], field: fields[2], colorText: true},
			{title: fields[1], field: fields[1]},
			{title: fields[0], field: fields[0]}
		],
		staticDataRows: records2
	};

	var grid1 = document.getElementById("grid_1");
	var grid2 = document.getElementById("grid_2");
	
	grid1.config = configObj1;
	grid2.config = configObj2;
	
	tr.MultiTableManager.synchronizeVScrollbar(
		document.getElementById("v_scrollbar_host"),
		document.getElementById("h_scrollbar_host"),
		[grid1, grid2]
	);
</script>
```