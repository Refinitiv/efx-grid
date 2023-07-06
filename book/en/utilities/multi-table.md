<link rel="stylesheet" href="../resources/styles/elf-template.css">

# Multi-table feature

Multiple grids can be created within a single page. They are independent from each other. A change made to one grid won't affect on the other grids. Sometimes, you want multiple instances of the same grid to make more room for displaying data. MultiTableManager is created to support such case. MultiTableManager will create multiple instances of the same grid and syncronize any column related change across all those instances. Each grid created by MultiTableManager will always have the same column configuration and the extensions. You can have different different row content on each grid. 

> Note that MultiTableManager is just a helper class object. It is not a Grid extension which is tied to single grid instance. It can be viewed as another wrapper that manages multiple Grid instances. 

## Support features

MultiTableManager is still in development and support only some basic features as listed below:
- Each table will have the same width and become inline-block element.
- Each table will have the same number of rows and columns.
- Column selection will be displayed on each table.
- Column resizing will be applied on each table.
- Column fitting will be applied on each table.
- Column insertion, removal, and reordering will be applied on each table.
- Row selection can be moved across multiple grids through keyboard navigation. Row selection can be only active for one grid at any time.
 

## Usage 

To use multi-table feature, you need to import `MultiTableManager`, a helper, from package. Then, initialize the helper by supplying Grid element. The element will be used as a primary table for creating another table. Lastly, initialize the Grid element by using `setGridConfig` method from the helper to specify configuration. 

To adjust number of tables, use `setTableCount` method. 

To get Grid element, use `getTable` method.

The basic setup process is shown in the example below:

```js
import MultiTableManager from "@refinitiv-ui/efx-grid/utils";

var gridElement = document.getElementById("grid");
var mgr = new MultiTableManager(gridElement);

var configObj = {
	/* grid configuration */
};
mgr.setGridConfig(configObj);

mgr.setTableCount(3); // Or any other number
```

### Multi-table example

```live
<style>
	html hr {
		margin: 5px;
	}
	efx-grid {
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
		<efx-grid id="grid"></efx-grid>
	</div>
</div>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = DataGenerator.generateRecords(fields, { numRows: 5 });
	
	var configObj = {
		columns: [
			{title: "Company", field: fields[0], width: 100},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 100}
		],
		staticDataRows: records,
		extensions: [
			new RowSelection(),
			new ColumnSelection(),
			new ColumnResizing(),
			new ColumnFitter(),
			new ColumnDragging()
		]
	};

	var grid = document.getElementById("grid");
	var mgr = new MultiTableManager(grid);
	// You can place grids side by side by using the following commands
	// var vScrollbarHost = document.getElementById("v_scrollbar_host");
	// var hScrollbarHost = document.getElementById("h_scrollbar_host");
	// MultiTableManager.synchronizeVScrollbar(vScrollbarHost, hScrollbarHost, grid);

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
				if(!DataGenerator.randInt(0, 4)) {
					var record = DataGenerator.generateRecord(fields);
					tbl.api.setRowData(r, record);
				}
			}
		}
	}, 500);
</script>
```

### Multi-table: wrap mode example

In wrap mode, a single table will be used as a primary table and wrapped by specified number of rows. After wrapping, multiple secondary tables will be created with specified number of rows to represent the rows from the primary table. The main difference between wrap mode and multi-table mode is that content rows, in wrap mode, of each table are based on a single primary table. Any change on a row from the primary table will also apply to corresponding row on one of the secondary tables, and vice versa. In multi-table mode, rows in one table are independent from rows in other tables. 

To enable wrap mode, use `wrapTable` method with number of wrapping rows as its parameter. 

To disable wrap mode, use `wrapTable` method with 0 as its parameter.

If you are in multi-table mode, `wrapTable` method will automatically remove any existing table and  switch to wrap mode.

If you are in wrap mode, `setTableCount` method will automatically disable wrap-mode and  switch to multi-table mode.

> Note that original table is still kept intact after the wrapping, even though it is hidden from view. `getTable(0)` will return the original table. 

```live
<style>
	html hr {
		margin: 5px;
	}
	efx-grid {
		margin: 0 5px 5px;
		vertical-align: top;
	}
	#h_scrollbar_host {
		height: 250px;
	}
</style>

<button id="wrap_btn1">Wrap 3 rows</button>
<button id="wrap_btn2">Wrap 4 rows</button>
<button id="wrap_btn3">Wrap 5 rows</button>
<button id="wrap_btn4">Disable wrap mode</button>
<hr>
<button id="set_btn1">Set Data on the second table</button>
<button id="set_btn2">Set Data on the third table</button>
<button id="add_row_btn">Add row</button>
<button id="remove_row_btn">Remove row</button>
<hr>
<button id="add_col_btn">Add Column</button>
<button id="remove_col_btn">Remove Column</button>
<hr>
<div id="v_scrollbar_host">
	<div id="h_scrollbar_host">
		<efx-grid id="grid"></efx-grid>
	</div>
</div>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = DataGenerator.generateRecords(fields, { numRows: 10 });
	
	var configObj = {
		sorting: {
			sortableColumns: true
		},
		defaultColumnOptions: {
			minWidth: 24
		},
		columns: [
			{title: fields[0], width: 100, field: fields[0]},
			{title: fields[2], width: 100, field: fields[2], formatType: "number", colorText: true },
			{title: fields[3], width: 100, field: fields[3], formatType: "percent", blinking: true }
		],
		staticDataRows: records,
		extensions: [
			new RowSelection(),
			new ColumnSelection(),
			new ColumnResizing(),
			new ColumnFitter(),
			new ColumnDragging()
		]
	};

	var grid = document.getElementById("grid");
	var mgr = new MultiTableManager(grid);
	mgr.setGridConfig(configObj);
	
	wrap_btn1.addEventListener("click", function() {
		mgr.wrapTable(3);
	});
	wrap_btn2.addEventListener("click", function() {
		mgr.wrapTable(4);
	});
	wrap_btn3.addEventListener("click", function() {
		mgr.wrapTable(5);
	});
	wrap_btn4.addEventListener("click", function() {
		mgr.wrapTable(0);
	});
	add_row_btn.addEventListener("click", function() {
		mgr.insertRow({});
	});
	remove_row_btn.addEventListener("click", function() {
		mgr.removeRow();
	});
	add_col_btn.addEventListener("click", function() {
		mgr.insertColumn({field: "industry", width: 80});
	});
	remove_col_btn.addEventListener("click", function() {
		mgr.removeColumn(mgr.getColumnCount() - 1);
	});
	set_btn1.addEventListener("click", function() {
		randomlySetData(mgr.getTable(1));
	});
	set_btn2.addEventListener("click", function() {
		randomlySetData(mgr.getTable(2));
	});
	
	setInterval(function simulateDataUpdate() {
		var tblCount = mgr.getTableCount();
		
		for(var i = 0; i < tblCount; ++i) {
			if(Math.random() > 0.6) {
				randomlySetData(mgr.getTable(i));
			}
		}
	}, 500);
	
	function randomlySetData(tbl) {
		if(!tbl || !tbl.api) {
			return;
		}
		var rowCount = mgr.getRowCount();
		for(var i = 0; i < rowCount; ++i) {
			if(Math.random() > 0.7) {
				var rowDef = tbl.api.getRowDefinition(i);
				if(rowDef) {
					rowDef.setRowData(DataGenerator.generateRecord(fields));
				}
			}
		}
	}
</script>
```

## Positioning grids side by side with vertical scrollbar syncronization

You can display multiple grids side by side using CSS as shown in the above example. However, it does not work when you want to have a single vertical scrollbar for multiple grids. If normal native scrollbar is used, all rows in a grid have to be displayed and cannot be virtualized. Large number of rows in each grid can introduce performance problem. You can use Grid's scrollbars instead of native scrollbars to enable row virtualization and improve the performance. 

To link multiple grids together and have only one single vertical scrollbar, use `MultiTableManager.synchronizeVScrollbar` method. The method requires two elements to host the scrollbars and array of Grid elements. The first element is for hosting Grid vertical scrollbar. The second element is for hosting native horizontal scrollbar and Grid elements. The vertical scrollbar requires separated host element because it has to be float over view and not moved when horizontal scrolling occurs. The setup for element structure is shown below:

```html
<div id="v_scrollbar_host">
	<div id="h_scrollbar_host">
		<efx-grid></efx-grid>
		<efx-grid></efx-grid>
	</div>
</div>
```

The height for the grid can be specified on the vertical scrollbar host. If so, make sure that the height of horizontal scrollbar host is set to `100%`. The width of the grid can be set on the element itself or on every column of the grid.

### Side by side Grids Example

```live
<style>
	efx-grid+efx-grid {
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
		<efx-grid id="grid_1"></efx-grid>
		<efx-grid id="grid_2"></efx-grid>
	</div>
</div>
<hr>

<script>
	var gen = DataGenerator;
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
	
	MultiTableManager.synchronizeVScrollbar(
		document.getElementById("v_scrollbar_host"),
		document.getElementById("h_scrollbar_host"),
		[grid1, grid2]
	);
</script>
```

<div></div>

<h2 style="margin-bottom:5px" id="api-refs">MultiTableManager API Reference</h2>
<div id="elf-api-container"><div id="main-template" class="elf-template">    <section><article>                                                    <h3 class="subsection-title">Methods</h3>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id=".synchronizeVScrollbar"><span class="type-signature"></span>synchronizeVScrollbar<span class="signature">(vScrollbarHost, hScrollbarHost, gridElems)</span><span class="type-signature"> → {Promise.&lt;Array&gt;}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">vScrollbarHost</div>                        <div class="type">                            <span class="param-type">Element</span>                        </div>                                                    <div class="description">                    Host element for the vertical scrollbar.                </div>                    </div>                <div class="param">                            <div class="name">hScrollbarHost</div>                        <div class="type">                            <span class="param-type">Element</span>                        </div>                                                    <div class="description">                    Host element for the horizontal scrollbar. This element must be a child of the vScrollbarHost element.                </div>                    </div>                <div class="param">                            <div class="name">gridElems</div>                        <div class="type">                            <span class="param-type">Array.&lt;Element&gt;</span>                        </div>                                                    <div class="description">                    Array of grid elements. The first element will be treated as primary grid.                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Promise.&lt;Array&gt;</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="dispose"><span class="type-signature"></span>dispose<span class="signature">()</span><span class="type-signature"></span></h4>                                            <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getColumnCount"><span class="type-signature"></span>getColumnCount<span class="signature">()</span><span class="type-signature"> → {number}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getRowCount"><span class="type-signature"></span>getRowCount<span class="signature">()</span><span class="type-signature"> → {number}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getTable"><span class="type-signature"></span>getTable<span class="signature">(at<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Element}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">at</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Element</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getTableCount"><span class="type-signature"></span>getTableCount<span class="signature">()</span><span class="type-signature"> → {number}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="insertColumn"><span class="type-signature"></span>insertColumn<span class="signature">(columnOption, idx<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">columnOption</div>                        <div class="type">                            <span class="param-type">*</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    String will be treated as field, while object is treated as the column options                </div>                    </div>                <div class="param">                            <div class="name">idx</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="insertRow"><span class="type-signature"></span>insertRow<span class="signature">(rowOption<span class="signature-attributes">opt</span>, at<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowOption</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>                <div class="param">                            <div class="name">at</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="removeColumn"><span class="type-signature"></span>removeColumn<span class="signature">(colRef)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colRef</div>                        <div class="type">                            <span class="param-type">*</span>                        </div>                                                    <div class="description">                    Column reference                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="removeRow"><span class="type-signature"></span>removeRow<span class="signature">(at<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">at</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setGridConfig"><span class="type-signature"></span>setGridConfig<span class="signature">(configObj<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">configObj</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setTableCount"><span class="type-signature"></span>setTableCount<span class="signature">(num)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">num</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Number of tables. Number cannot be less than one.                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="wrapTable"><span class="type-signature"></span>wrapTable<span class="signature">(rowCount)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowCount</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Number of row per table. Set number to zero to turn off wrap mode.                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                </article></section></div></div>