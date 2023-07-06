<link rel="stylesheet" href="../resources/styles/elf-template.css">

# Native HTML table

Sometimes you only need a simple table for your app. Native [HTML table](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table) could be used in place of Grid component for quick and easy table layout. The main advantages of native HTML table is simplicity, flexibility, and style customization. However, manipulating HTML element directly could be tedious and cumbersome. `Table` class from our utility package can help managing native [HTML table](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table) with ease.

> Note that `Table` class only provides JavaScript logic for HTML element manipulation. Styles and CSS are not provided by Grid utility package.

## Table initialization

`Table` class takes two parameters for its constructor. The first parameter is a placeholder element. It is used for positioning the table in the HTML document. The second parameter is a table configuration object, where you can define various parameters and options (e.g., number of columns, number of rows, width, height). For all available options, see Table API Reference section.

```live
<style>
	html hr {
		margin-top: 5px;
		margin-bottom: 10px;
	}
</style>
<big>Table with default column size</big>
<div id="table_div1"></div>
<hr>
<big>Table with fixed column size and header section</big>
<div id="table_div2"></div>

<script>
	var tableDiv1 = document.getElementById("table_div1");
	var tbl1 = new tr.Table(tableDiv1, {
		colCount: 4,
		rowCount: 5,
		cellHeight: 30
	});
	var tableDiv2 = document.getElementById("table_div2");
	var tbl2 = new tr.Table(tableDiv2, {
		colCount: 4,
		rowCount: 5,
		cellWidth: 100,
		cellHeight: 30,
		header: 1
	});
	tbl2.getHeader().getCellsInRow(0).forEach(function(cell, idx) {
		cell.textContent = "Header " + (idx + 1);
	});
</script>
```

## Table structure

`Table` class generates HTML elements and table structure based on the given configuration. The general structure created by the class will look like the code snippet below:

```html
<div>
	<table>
		<colgroup>
			<col>
			...
		</colgroup>
		<thead>
			<tr>
				<th></th>
				...
			<tr>
			...
		</thead>
		<tbody>
			<tr>
				<td></td>
				...
			</tr>
			...
		</tbody>
	</table>
</div>
```

`Table` class instance itself represent the placeholder element (root element) and not the table element. The table below shows how to get corresponding element from the `Table` instance. 

| Element             | API                                                        |
| ------------------- | ---------------------------------------------------------- |
| Placeholder element | Table.getElement()                                         |
| table               | Table.getTableElement()                                    |
| tbody               | Table.getBody().getElement()                               |
| thead               | Table.getHeader().getElement()                             |
| tfoot               | Table.getFooter().getElement()                             |
| tr                  | Table.getRow(r), Table.getBody().getRow(r)                 |
| td (tbody)          | Table.getCell(c, r), Table.getBody().getCell(c, r)         |
| th (thead)          | Table.getHeaderCell(c, r), Table.getHeader().getCell(c, r) |
| td (tfoot)          | Table.getFooterCell(c, r), Table.getFooter().getCell(c, r) |

## Table manipulation

With `Table` class, you can add and remove rows and columns at runtime. For changing content and styles, you need to retrieve the element from `Table` instance, and then manipulate the element properties directly.

To change number of rows, use `addRows` and `removeRows` methods.
 
To change number of columns, use `addColumns` and `removeColumns` methods. 

The example below also shows how to change row height of each row in the table.

```live
<style>
	html hr {
		margin: 5px;
	}
	i:empty {
		padding-left: 20px;
	}
	.compact td, .compact th {
		padding-top: 2px;
		padding-bottom: 2px;
	}
	td:nth-child(1), th:nth-child(1) {
		text-align: center;
	}
	#table_div {
		height: 300px;
	}
</style>

<button id="add_row_btn">Add row</button>
<button id="rem_row_btn">Remove row</button>
<i></i>
<label for="set_row_in">Set row count:</label>
<input id="set_row_in" type="number" value="6">
<hr>
<button id="add_col_btn">Add column</button>
<button id="rem_col_btn">Remove column</button>
<i></i>
<label for="set_col_in">Set col count:</label>
<input id="set_col_in" type="number" value="6">
<hr>
<button id="row_height_btn1">Compact row height</button>
<button id="row_height_btn2">Regular row height</button>
<button id="row_height_btn3">Spacious row height</button>
<i></i>
<label for="col_width_in">Set 1st column width:</label>
<input id="col_width_in" type="number" value="150">
<hr>
<div id="table_div"></div>

<script>
	var rowId = 0;

	var tbl = new tr.Table(document.getElementById("table_div"), {
		colCount: 4,
		rowCount: 7,
		cellWidth: 100,
		rowHeight: 30,
		header: 1
	});
	var cells = tbl.getCellsInColumn(0);
	cells.forEach(function(cell) {
		cell.textContent = "" + (rowId++);
	});
	tbl.getHeader().getCellsInRow(0).forEach(function(cell, idx) {
		cell.textContent = "Header " + (idx + 1);
	});
	tbl.getHeaderCell(0, 0).textContent = "Row id";
	
	document.getElementById("add_row_btn").addEventListener("click", function(e) { 
		var ary = tbl.addRows();
		var trElem = ary[0];
		var cell = trElem.cells[0];
		cell.textContent = "" + (rowId++);
	});
	document.getElementById("rem_row_btn").addEventListener("click", function(e) { 
		tbl.removeRows(1);
	});
	document.getElementById("set_row_in").addEventListener("change", function(e) { 
		var rowCount = +e.currentTarget.value;
		if(rowCount !== rowCount) {
			return; // Cannot process NaN value;
		}
		tbl.setRowCount(rowCount);
	});
	
	document.getElementById("add_col_btn").addEventListener("click", function(e) {
		var colCount = tbl.getColumnCount();
		tbl.addColumns();
		tbl.getHeaderCell(colCount, 0).textContent = "Header " + (colCount + 1);
	});
	document.getElementById("rem_col_btn").addEventListener("click", function(e) { 
		tbl.removeColumns(1);
	});
	document.getElementById("set_col_in").addEventListener("change", function(e) { 
		var colCount = +e.currentTarget.value;
		if(colCount !== colCount) {
			return; // Cannot process NaN value;
		}
		tbl.setColumnCount(colCount);
	});
	
	document.getElementById("row_height_btn1").addEventListener("click", function(e) { 
		tbl.setDefaultRowHeight(24);
		tbl.getElement().classList.add("compact");
	});
	document.getElementById("row_height_btn2").addEventListener("click", function(e) { 
		tbl.setDefaultRowHeight(30);
		tbl.getElement().classList.remove("compact");
	});
	document.getElementById("row_height_btn3").addEventListener("click", function(e) { 
		tbl.setDefaultRowHeight(36);
		tbl.getElement().classList.remove("compact");
	});
	
	document.getElementById("col_width_in").addEventListener("change", function(e) { 
		var width = +(e.currentTarget.value);
		if(!width) {
			width = 100;
		}
		tbl.setColMinWidths(width, 0);
	});
</script>
```

## Cell manipulation

`Table` class does not provide APIs for modifying its cells. However, you can get cell elements through various Table APIs.

To get a single cell element from the body section of the table, use `getCell` method.

To get all cell elements in a single column from the body section of the table, use `getCellsInColumn` method.

To get all cell elements in a single row from the body section of the table, use `getCellsInRow` method.

To set colSpan or rowSpan on a cell, use `spanBlock` method

Event listeners can be added on `Table` instance and its sub table (i.e., body section) for all native events. To add an event listener to `Table` instance, use `addEventListener` method.

The example below shows how to set cell span and get cell position from a `mousemove` event.

```live
<style>
	html hr {
		margin: 5px;
	}
	i:empty {
		padding-left: 20px;
	}
	input[type="number"] {
		width: 50px;
	}
	td:nth-child(1), th:nth-child(1) {
		text-align: center;
	}
	
	#table_div {
		display: inline-block;
	}
	#msg_ta {
		height: 260px;
		width: 100px;
		vertical-align: top;
	}
</style>

<button id="span_btn">Span cells</button>
<button id="reset_btn">Clear cell span</button>
<hr>
<span>Starting from:</span>
<input id="from_col_in" type="number" value="0">
<input id="from_row_in" type="number" value="0">
<i></i>
<span>Span size:</span>
<input id="col_span_in" type="number" value="2">
<input id="row_span_in" type="number" value="2">
<hr>
<div>
	<div id="table_div"></div>
	<textarea id="msg_ta"></textarea>
</div>

<script>
	var fields = ["id", "companyName", "market", "industry", "CF_LAST"];
	var colCount = fields.length;
	var rowCount = 10;
	var records = tr.DataGenerator.generateRecords(fields, rowCount);
	var tbl = new tr.Table(document.getElementById("table_div"), {
		colCount: colCount,
		rowCount: rowCount,
		rowHeight: 30,
		header: 1
	});
	tbl.setColumnWidths([60, 150, 100, 200, 100]);
	var cells = tbl.getAllHeaderCells();
	var cell;
	var record;
	cells.forEach(function(cell, idx) {
		cell.textContent = fields[idx];
	});
	for(var r = 0; r < rowCount; ++r) {
		record = records[r];
		cells = tbl.getCellsInRow(r);
		for(var c = 0; c < colCount; ++c) {
			cell = cells[c];
			cell.textContent = record[fields[c]];
		}
	}
	
	var bodyTbl = tbl.getBody();
	var headTbl = tbl.getHeader();
	bodyTbl.addEventListener("mousemove", onMouseMoveOverBody);
	
	function onMouseMoveOverBody(e) {
		var colIndex = bodyTbl.getColumnIndex(e);
		var rowIndex = bodyTbl.getRowIndex(e);
		var cell = bodyTbl.getCell(colIndex, rowIndex);
		var cellContent = cell ? cell.textContent : null;
		
		var lines = [
			"Column index: " + colIndex,
			"Row index: " + rowIndex,
			"Cell content: " + cellContent
		];
		msg_ta.value = lines.join("\n");
	}
	
	var fromColIn = document.getElementById("from_col_in");
	var fromRowIn = document.getElementById("from_row_in");
	var colSpanIn = document.getElementById("col_span_in");
	var rowSpanIn = document.getElementById("row_span_in");
	document.getElementById("span_btn").addEventListener("click", function(e) {
		var c1 = +fromColIn.value;
		var r1 = +fromRowIn.value;
		
		var colSpan = +colSpanIn.value;
		var rowSpan = +rowSpanIn.value;
		var c2 = c1 + colSpan - 1;
		var r2 = r1 + rowSpan - 1;
		
		tbl.spanBlock(c1, c2, r1, r2);
	});
	document.getElementById("reset_btn").addEventListener("click", function(e) {
		var c1 = +fromColIn.value;
		var r1 = +fromRowIn.value;
		tbl.spanBlock(c1, c1, r1, r1);
	});
</script>
```

## QuoteLine example

You are free to customize the table in any way you like. `Table` class is just a utility that helps you create HTML table and provide some APIs for accessing some part of the table.

```live
<style>
	html hr {
		margin: 5px;
	}
	#table_div {
		display: inline-block;
	}
	
	td.no-border-right, .no-border-right td {
		border-right-width: 0;
	}
	td.no-border-left, .no-border-left td {
		border-left-width: 0;
	}
	
	.big-font {
		font-size: 2em;
	}
	.big-font td {
		padding-top: 0;
		padding-bottom: 0;
	}
	.blue-font-color {
		color: blue;
	}
	.red-font-color {
		color: red;
	}
	.red-bg-color {
		background-color: red;
	}
	.green-font-color {
		color: green;
	}
	.align-center {
		text-align: center;
	}
</style>

<div id="table_div"></div>

<script>
	var tbl = new tr.Table(table_div, {
		colCount: 9,
		rowCount: 8,
		cellWidth: 100,
		rowHeight: 30,
		header: 1
	});
	tbl.setColMinWidths(30, 6);
	tbl.setColMinWidths(110, 7);
	tbl.setColMinWidths(110, 8);
	var cellTexts = [
		["", "GBP=", "", "", "", "1.1926", "/", "1.1930", "0.71%"],
		["UK Pound Sterling/US Dollar FX Spot Rate", "", "", "", "", "SANTANDER", "", "HKG", "SAHK"],
		["Change Summary", "", "Daily View", "", "", "Weekly", "", "Monthly", "Yearly"],
		["MTD %", "-0.78 %", "O", 1.1843, "High", 1.2065, "", 1.2088, 1.2447],
		["3M %", "-2.68 %", "H", 1.1936, "H Date", "01-Mar-2023", "", "01-Mar-2023", "23-Jan-2023"],
		["6M %", "2.93 %", "L", 1.1832, "Low ", 1.1805, "", 1.1805, 1.1805],
		["YTD %", "1.41 %", "C", 1.1842, "L Date", "08-Mar-2023", "", "08-Mar-2023", "08-Mar-2023"],
		["Latest Trade", "", "09-Mar-2023 15:33", "", "", "", "", "", ""]
	];

	hideMiddleBorders(0, 1);
	hideMiddleBorders(2, 3);
	hideMiddleBorders(4, 5);
	
	spanColumn(1, 0, 3);
	spanColumn(2, 0, 1);
	spanColumn(2, 2, 3);
	spanColumn(7, 0, 1);
	spanColumn(7, 2, 5);
	
	tbl.getRow(0).classList.add("big-font");
	tbl.getRow(2).classList.add("blue-font-color");
	
	tbl.getCellsInColumn(6).forEach(addClass.bind(null, "align-center"));
	tbl.getCellsInColumn(0).slice(2).forEach(addClass.bind(null, "blue-font-color"));
	tbl.getCellsInColumn(2).slice(2).forEach(addClass.bind(null, "blue-font-color"));
	tbl.getCellsInColumn(4).slice(2).forEach(addClass.bind(null, "blue-font-color"));
	
	addClass("red-font-color", tbl.getCell(1, 3));
	addClass("red-font-color", tbl.getCell(1, 4));
	addClass("green-font-color", tbl.getCell(1, 5));
	addClass("green-font-color", tbl.getCell(1, 6));
	tbl.getCellsInRow(0).slice(5, 8).forEach(addClass.bind(null, "green-font-color"));
	
	var colCount = tbl.getColumnCount();
	var rowCount = tbl.getRowCount();
	for(var r = 0; r < rowCount; ++r) {
		var rowText = cellTexts[r];
		for(var c = 0; c < colCount; ++c) {
			var cellText = rowText[c];
			var cell = tbl.getCell(c, r);
			cell.textContent = cellText;
		}
	}
	
	var newsIcon = document.createElement("coral-icon");
	newsIcon.icon = "news";
	addClass("blue-font-color", newsIcon);
	tbl.getCell(0, 0).appendChild(newsIcon);
	
	var downIcon = document.createElement("coral-icon");
	downIcon.icon = "hollow-arrow-down";
	addClass("red-font-color", downIcon);
	tbl.getCell(2, 0).appendChild(downIcon);
	
	addClass("red-bg-color", tbl.getCell(8, 0));
	
	function spanColumn(rowIndex, c1, c2) {
		tbl.spanBlock(c1, c2, rowIndex, rowIndex);
	}
	function hideMiddleBorders(c1, c2) {
		var rowCount = tbl.getRowCount();
		for(var r = 0; r < rowCount; ++r) {
			var cell1 = tbl.getCell(c1, r);
			var cell2 = tbl.getCell(c2, r);
			cell1.classList.add("no-border-right");
			cell2.classList.add("no-border-left");
		}
	}
	function addClass(classStr, elem) {
		elem.classList.add(classStr);
	}
</script>
```

<div></div>

<h2 style="margin-bottom:5px" id="api-refs">Table API Reference</h2>
<div id="elf-api-container"><div id="main-template" class="elf-template">    <section><article>                                                                        <h3 class="subsection-title">Type Definitions</h3>                        <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Options">Options</h4><div class="description">    Options for Table initialization</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>colCount</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    0                                </td>                        <td class="description last">Number of columns</td>        </tr>            <tr>                            <td class="name"><code>rowCount</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    0                                </td>                        <td class="description last">Number of rows in content table (tbody)</td>        </tr>            <tr>                            <td class="name"><code>cellWidth</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Default cell width of each column</td>        </tr>            <tr>                            <td class="name"><code>cellHeight</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Default cell height of each row</td>        </tr>            <tr>                            <td class="name"><code>width</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Total width of the table. If it is specified, it will override cellWidth</td>        </tr>            <tr>                            <td class="name"><code>height</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Total height of the table. If it is specified, it will override cellHeight</td>        </tr>            <tr>                            <td class="name"><code>header</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    0                                </td>                        <td class="description last">Number of header rows</td>        </tr>            <tr>                            <td class="name"><code>footer</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    0                                </td>                        <td class="description last">Number of footer rows</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <h3 class="subsection-title">Methods</h3>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="addColumns"><span class="type-signature"></span>addColumns<span class="signature">(count<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Array.&lt;Element&gt;}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">count</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                        <div class="default">                                   [default: 1]                                </div>                                </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;Element&gt;</span>    </div><div class="sub-content-desc">    Array of col elements (not td or cell)</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="addFooterRows"><span class="type-signature"></span>addFooterRows<span class="signature">(opt_count<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Array.&lt;Element&gt;}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_count</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;Element&gt;</span>    </div><div class="sub-content-desc">    Array of tr (HTMLTableRowElement) elements</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="addHeaderRows"><span class="type-signature"></span>addHeaderRows<span class="signature">(opt_count<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Array.&lt;Element&gt;}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_count</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;Element&gt;</span>    </div><div class="sub-content-desc">    Array of tr (HTMLTableRowElement) elements</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="addListener"><span class="type-signature"></span>addListener<span class="signature">(obj, type)</span><span class="type-signature"></span></h4>                            <div class="description">        A shorthand to retrieve function from an object and add it as an Eventlistener    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">obj</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    Object that contains a handler with the same name as the given `type`                </div>                    </div>                <div class="param">                            <div class="name">type</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                                    <div class="description">                    Event name                </div>                    </div>            </div>        <div class="details">                <dt class="inherited-from">Inherited From:</dt>    <dd class="inherited-from">        <a href="EventDispatcher.html#addListener">EventDispatcher#addListener</a>    </dd>                                                    </div>                                            <h5>Example:</h5>            <pre><code>var obj = {"mouseUp": function(e) { console.log(e); }};
plugin.addListener(obj, "mouseUp");
plugin.addListener(obj, "mouseDown");</code></pre>    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="addRows"><span class="type-signature"></span>addRows<span class="signature">(count<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Array.&lt;Element&gt;}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">count</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                        <div class="default">                                   [default: 1]                                </div>                                </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;Element&gt;</span>    </div><div class="sub-content-desc">    Array of tr (HTMLTableRowElement) elements</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="cloak"><span class="type-signature"></span>cloak<span class="signature">(tblElem)</span><span class="type-signature"></span></h4>                            <div class="description">        This will change size of the table    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">tblElem</div>                        <div class="type">                            <span class="param-type">Element</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="distributeColumnWidth"><span class="type-signature"></span>distributeColumnWidth<span class="signature">()</span><span class="type-signature"></span></h4>                            <div class="description">        Distribute columns based on their textContent length    </div>                        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="fixateTableWidth"><span class="type-signature"></span>fixateTableWidth<span class="signature">(opt_bool<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                            <div class="description">        Try to make table to have fixed size. Table may not have a fixed size, if one of its column has no width (dynamic width).    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_bool</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getAllCells"><span class="type-signature"></span>getAllCells<span class="signature">()</span><span class="type-signature"> → {Array.&lt;Element&gt;}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;Element&gt;</span>    </div><div class="sub-content-desc">    Array of td (HTMLTableCellElement) elements</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getAllFooterCells"><span class="type-signature"></span>getAllFooterCells<span class="signature">()</span><span class="type-signature"> → {Array.&lt;Element&gt;}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;Element&gt;</span>    </div><div class="sub-content-desc">    Array of td (HTMLTableCellElement) elements</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getAllHeaderCells"><span class="type-signature"></span>getAllHeaderCells<span class="signature">()</span><span class="type-signature"> → {Array.&lt;Element&gt;}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;Element&gt;</span>    </div><div class="sub-content-desc">    Array of td (HTMLTableCellElement) elements</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getAllRows"><span class="type-signature"></span>getAllRows<span class="signature">()</span><span class="type-signature"> → {Array.&lt;Element&gt;}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;Element&gt;</span>    </div><div class="sub-content-desc">    Array of tr (HTMLTableRowElement) elements</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getBody"><span class="type-signature"></span>getBody<span class="signature">()</span><span class="type-signature"> → {<a href="Sub">SubTable</a>}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type"><a href="Sub">SubTable</a></span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getBoundingClientRect"><span class="type-signature"></span>getBoundingClientRect<span class="signature">()</span><span class="type-signature"> → {Object}</span></h4>                                            <div class="details">                <dt class="inherited-from">Inherited From:</dt>    <dd class="inherited-from">        <a href="ElementWrapper.html#getBoundingClientRect">ElementWrapper#getBoundingClientRect</a>    </dd>                                                    </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getCell"><span class="type-signature"></span>getCell<span class="signature">(c, r)</span><span class="type-signature"> → {Element}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">c</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>                <div class="param">                            <div class="name">r</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Element</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getCellPosition"><span class="type-signature"></span>getCellPosition<span class="signature">(cell, ret_obj<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Object}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">cell</div>                        <div class="type">                            <span class="param-type">Element</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">ret_obj</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div><div class="sub-content-desc">    Object with x and y property</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getCellsInColumn"><span class="type-signature"></span>getCellsInColumn<span class="signature">(c)</span><span class="type-signature"> → {Array.&lt;Element&gt;}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">c</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;Element&gt;</span>    </div><div class="sub-content-desc">    Array of td (HTMLTableCellElement) elements</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getCellsInRow"><span class="type-signature"></span>getCellsInRow<span class="signature">(r)</span><span class="type-signature"> → {Array.&lt;Element&gt;}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">r</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;Element&gt;</span>    </div><div class="sub-content-desc">    Array of td (HTMLTableCellElement) elements</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getCellTextContent"><span class="type-signature"></span>getCellTextContent<span class="signature">(c, r)</span><span class="type-signature"> → {string}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">c</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>                <div class="param">                            <div class="name">r</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getColumnCount"><span class="type-signature"></span>getColumnCount<span class="signature">()</span><span class="type-signature"> → {number}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getColumnIndex"><span class="type-signature"></span>getColumnIndex<span class="signature">(e)</span><span class="type-signature"> → {number}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">e</div>                        <div class="type">                            <span class="param-type">Event</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getColumnLeft"><span class="type-signature"></span>getColumnLeft<span class="signature">(colIndex, rowIndex<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {number}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">rowIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getColumnTextContent"><span class="type-signature"></span>getColumnTextContent<span class="signature">(c)</span><span class="type-signature"> → {string}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">c</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getElement"><span class="type-signature"></span>getElement<span class="signature">()</span><span class="type-signature"> → {Element}</span></h4>                                            <div class="details">                <dt class="inherited-from">Inherited From:</dt>    <dd class="inherited-from">        <a href="ElementWrapper.html#getElement">ElementWrapper#getElement</a>    </dd>                                                    </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Element</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getFooter"><span class="type-signature"></span>getFooter<span class="signature">()</span><span class="type-signature"> → {<a href="Sub">SubTable</a>}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type"><a href="Sub">SubTable</a></span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getFooterCell"><span class="type-signature"></span>getFooterCell<span class="signature">(c, r)</span><span class="type-signature"> → {Element}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">c</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>                <div class="param">                            <div class="name">r</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Element</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getHeader"><span class="type-signature"></span>getHeader<span class="signature">()</span><span class="type-signature"> → {<a href="Sub">SubTable</a>}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type"><a href="Sub">SubTable</a></span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getHeaderCell"><span class="type-signature"></span>getHeaderCell<span class="signature">(c, r)</span><span class="type-signature"> → {Element}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">c</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>                <div class="param">                            <div class="name">r</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Element</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getListener"><span class="type-signature"></span>getListener<span class="signature">(type, idx<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {function}</span></h4>                            <div class="description">        Get event listener (function handler) from the specified event.    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">type</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                            <div class="attributes">                                                                </div>                                        <div class="default">                                </div>                                        <div class="description">                    Event name                </div>                    </div>                <div class="param">                            <div class="name">idx</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                        <div class="default">                                   [default: 0]                                </div>                                        <div class="description">                    Index of the listener to be retrieved. This is used when there are multiple event listeners                </div>                    </div>            </div>        <div class="details">                <dt class="inherited-from">Inherited From:</dt>    <dd class="inherited-from">        <a href="EventDispatcher.html#getListener">EventDispatcher#getListener</a>    </dd>                                                    </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">function</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getMousePosition"><span class="type-signature"></span>getMousePosition<span class="signature">(e, retObj<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Object}</span></h4>                            <div class="description">        Get mouse position relative to this element    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">e</div>                        <div class="type">                            <span class="param-type">Event</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    MouseEvent should be given                </div>                    </div>                <div class="param">                            <div class="name">retObj</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                <dt class="inherited-from">Inherited From:</dt>    <dd class="inherited-from">        <a href="ElementWrapper.html#getMousePosition">ElementWrapper#getMousePosition</a>    </dd>                                                    </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getRow"><span class="type-signature"></span>getRow<span class="signature">(r)</span><span class="type-signature"> → {Element}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">r</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Element</span>    </div><div class="sub-content-desc">    Array of tr (HTMLTableRowElement) elements</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getRowCount"><span class="type-signature"></span>getRowCount<span class="signature">()</span><span class="type-signature"> → {number}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getRowIndex"><span class="type-signature"></span>getRowIndex<span class="signature">(e)</span><span class="type-signature"> → {number}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">e</div>                        <div class="type">                            <span class="param-type">Event</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getRows"><span class="type-signature"></span>getRows<span class="signature">()</span><span class="type-signature"> → {Array.&lt;Element&gt;}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;Element&gt;</span>    </div><div class="sub-content-desc">    Array of tr (HTMLTableRowElement) elements</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getRowTextContent"><span class="type-signature"></span>getRowTextContent<span class="signature">(r)</span><span class="type-signature"> → {string}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">r</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getRowTop"><span class="type-signature"></span>getRowTop<span class="signature">(rowRef)</span><span class="type-signature"> → {number}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">Element</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getTableElement"><span class="type-signature"></span>getTableElement<span class="signature">()</span><span class="type-signature"> → {Element}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Element</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getTableTextContent"><span class="type-signature"></span>getTableTextContent<span class="signature">()</span><span class="type-signature"> → {string}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getTextContents"><span class="type-signature"></span>getTextContents<span class="signature">()</span><span class="type-signature"> → {Array.&lt;Array.&lt;string&gt;&gt;}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;Array.&lt;string&gt;&gt;</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hasListener"><span class="type-signature"></span>hasListener<span class="signature">(type)</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Check whether the specified event has a function handler.    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">type</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                                    <div class="description">                    Event name                </div>                    </div>            </div>        <div class="details">                <dt class="inherited-from">Inherited From:</dt>    <dd class="inherited-from">        <a href="EventDispatcher.html#hasListener">EventDispatcher#hasListener</a>    </dd>                                                    </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="init"><span class="type-signature"></span>init<span class="signature">(options)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type"><a href="#~Options">Table~Options</a></span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="log"><span class="type-signature"></span>log<span class="signature">(opt_rowLimit<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_rowLimit</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="loosenTableWidth"><span class="type-signature"></span>loosenTableWidth<span class="signature">(opt_bool<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                            <div class="description">        Opposite of <a href="#fixateTableWidth">Table#fixateTableWidth</a>    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_bool</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="removeAllColumns"><span class="type-signature"></span>removeAllColumns<span class="signature">()</span><span class="type-signature"></span></h4>                                            <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="removeAllEventListeners"><span class="type-signature"></span>removeAllEventListeners<span class="signature">()</span><span class="type-signature"></span></h4>                            <div class="description">        Remove all function handlers from all events.    </div>                        <div class="details">                <dt class="inherited-from">Inherited From:</dt>    <dd class="inherited-from">        <a href="EventDispatcher.html#removeAllEventListeners">EventDispatcher#removeAllEventListeners</a>    </dd>                                                    </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="removeAllRows"><span class="type-signature"></span>removeAllRows<span class="signature">()</span><span class="type-signature"></span></h4>                                            <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="removeColumns"><span class="type-signature"></span>removeColumns<span class="signature">(opt_count<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_count</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="removeFooterRows"><span class="type-signature"></span>removeFooterRows<span class="signature">(opt_count<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_count</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="removeHeaderRows"><span class="type-signature"></span>removeHeaderRows<span class="signature">(opt_count<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_count</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="removeRows"><span class="type-signature"></span>removeRows<span class="signature">(count<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">count</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Number of rows to be removed. If count is not specified, all rows are removed                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setCellSize"><span class="type-signature"></span>setCellSize<span class="signature">(defaultWidth, defaultHeight)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">defaultWidth</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>                <div class="param">                            <div class="name">defaultHeight</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setColBackgroundColors"><span class="type-signature"></span>setColBackgroundColors<span class="signature">(val, colIndex<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">val</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">Array.&lt;string&gt;</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Column index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setColBGColors"><span class="type-signature"></span>setColBGColors<span class="signature">(val, colIndex<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">val</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">Array.&lt;string&gt;</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Column index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setColBorders"><span class="type-signature"></span>setColBorders<span class="signature">(val, colIndex<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">val</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span> | <span class="param-type">Array.&lt;(number|string)&gt;</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Column index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setColMinWidths"><span class="type-signature"></span>setColMinWidths<span class="signature">(val, colIndex<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">val</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span> | <span class="param-type">Array.&lt;(string|number)&gt;</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Column index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setColumnCount"><span class="type-signature"></span>setColumnCount<span class="signature">(val)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">val</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setColumnWidths"><span class="type-signature"></span>setColumnWidths<span class="signature">(val, colIndex<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">val</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span> | <span class="param-type">Array.&lt;(string|number)&gt;</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Column index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setCRWH"><span class="type-signature"></span>setCRWH<span class="signature">(col, row, width, height)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">col</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>                <div class="param">                            <div class="name">row</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>                <div class="param">                            <div class="name">width</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>                <div class="param">                            <div class="name">height</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setDefaultColumnWidth"><span class="type-signature"></span>setDefaultColumnWidth<span class="signature">(val<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">val</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">null</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setDefaultRowHeight"><span class="type-signature"></span>setDefaultRowHeight<span class="signature">(val<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">val</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">null</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setParent"><span class="type-signature"></span>setParent<span class="signature">(parent)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">parent</div>                        <div class="type">                            <span class="param-type">Node</span> | <span class="param-type"><a href="ElementWrapper.html">ElementWrapper</a></span>                        </div>                                            </div>            </div>        <div class="details">                <dt class="inherited-from">Inherited From:</dt>    <dd class="inherited-from">        <a href="ElementWrapper.html#setParent">ElementWrapper#setParent</a>    </dd>                                                    </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setRowCount"><span class="type-signature"></span>setRowCount<span class="signature">(val)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">val</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setSize"><span class="type-signature"></span>setSize<span class="signature">(width, height)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">width</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>                <div class="param">                            <div class="name">height</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="spanBlock"><span class="type-signature"></span>spanBlock<span class="signature">(c1, c2, r1, r2)</span><span class="type-signature"> → {Element}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">c1</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Starting column index                </div>                    </div>                <div class="param">                            <div class="name">c2</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Destination column index                </div>                    </div>                <div class="param">                            <div class="name">r1</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Starting row index                </div>                    </div>                <div class="param">                            <div class="name">r2</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Destination row index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Element</span>    </div><div class="sub-content-desc">    Top left cell element</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="spanHorizontally"><span class="type-signature"></span>spanHorizontally<span class="signature">(r, bool)</span><span class="type-signature"> → {Element}</span></h4>                            <div class="description">        Horizontally span the cell from the first column to cover the entire row. This is useful for creating header row    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">r</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>                <div class="param">                            <div class="name">bool</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Element</span>    </div><div class="sub-content-desc">    Top left cell element</div>                </div>                </article></section></div></div>