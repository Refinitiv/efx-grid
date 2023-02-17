<link rel="stylesheet" href="../resources/styles/elf-template.css">

## Column Fitter

The Column Fitter provides an automatically adjusting column width that fits a column's content or title.

```live
<style>
	atlas-blotter {
		height: 169px;
	}
	html hr {
		margin: 5px;
	}
</style>

<button id="toggle_btn">Toggle Column Fitting</button>
<hr>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var columnFitterExt = new tr.ColumnFitterExtension();
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { seed: 0, numRows: 5 });
	var configObj = {
		columns: [
			{title: "Company", field: fields[0]},
			{title: "Market", field: fields[1], width: 120},
			{title: "Last", field: fields[2], width: 100},
			{title: "Net. Chng", field: fields[3], width: 100},
			{title: "Industry", field: fields[4]}
		],
		staticDataRows: records,
		extensions: [
			columnFitterExt
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;

	document.getElementById("toggle_btn").addEventListener("click", function(e) {
		var btn = e.currentTarget;
		if (btn.adjusted) {
			columnFitterExt.resetAllColumns();
		} else {
			columnFitterExt.adjustAllColumns();
		}
		btn.adjusted = !btn.adjusted;
	});
</script>
```

### Installation and how to import to a project

Installation examples and details of how to import the extension to a project are available on the [Overview](README.md) page.

### Automatic adjusting

The live demo below shows how to adjust a column's width when the data are changed – use the extension's API to adjust it manually or use the `autoAdjust` property for automatic adjusting.

> By default, the size of column can only be expanded by the extension. Set `shrinkable` flag to true to allow column size to be shrunk.

```js
var grid = document.getElementById("grid");
grid.config = {
	// any other grid"s options
	columnFitting: {
		autoAdjust: 1000
	}
};
```

```live
<style>
	atlas-blotter {
		height: 169px;
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>

<script>
	var columnFitterExt = new tr.ColumnFitterExtension();
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { seed: 0, numRows: 5 });

	var configObj = {
		columns: [
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 120},
			{name: "Last", field: fields[2], width: 100},
			{name: "Industry", field: fields[4]},
			{name: "Net. Chng", field: fields[3], width: 100}
		],
		staticDataRows: records,
		columnFitting: {
			title: true,
			autoAdjust: 800,
			shrinkable: true
		},
		extensions: [
			columnFitterExt
		]
	};

	var grid = document.getElementById("grid");
	grid.addEventListener("configured", function(e) {
		var api = e.detail.api;
		setInterval(function() {
			var record = tr.DataGenerator.generateRecord(["industry"]);
			var randRow = tr.DataGenerator.randInt(0, api.getRowCount());
			api.setRowData(randRow, record);
		}, 500);
	});
	grid.config = configObj;
</script>
```

### Columns with custom content/elements

Normally, this extension will only use the text format inside the cell to calculate the optimal width. Unfortunately, for a cell with custom content, users may want to insert some other elements rather than text format inside the cell (for example, div).

To support custom content, set `contentFitting: true` in the column option.

```js
var grid = document.getElementById("grid");
grid.config = {
	// other grid"s option
	columns: [
		// other columns
		{
			title: "Custom format",
			field: "someField",
			binding: customFormatter,
			contentFitting: true // Turn this on
		}
	],
};
```

```live
<style>
	atlas-blotter {
		height: 169px;
	}
	html hr {
		margin: 5px;
	}
</style>

<button id="toggle_btn">Toggle Column Fitting</button>
<hr>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var columnFitterExt = new tr.ColumnFitterExtension();
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { seed: 0, numRows: 5 });

	var onRenderStars = function (e) {
		var content = e.cell.getContent();
		if (!content || !content._stars) {
			content = document.createElement("div");
			var main = content._main = document.createElement("span");
			var stars = content._stars = document.createElement("span");
			stars.textContent = " ★★★";
			content.appendChild(main);
			content.appendChild(stars);
		}
		
		content._main.textContent = e.data;
		e.cell.setContent(content);
	};

	var configObj = {
		columns: [
			{title: "Company", field: fields[0], binding: onRenderStars, contentFitting: true},
			{title: "Market", field: fields[1], width: 120},
			{title: "Last", field: fields[2], width: 100},
			{title: "Net. Chng", field: fields[3], width: 100},
			{title: "Industry", field: fields[4]}
		],
		staticDataRows: records,
		extensions: [
			columnFitterExt
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;

	document.getElementById("toggle_btn").addEventListener("click", function(e) {
		var btn = e.currentTarget;
		if (btn.adjusted) {
			columnFitterExt.resetAllColumns();
		} else {
			columnFitterExt.adjustAllColumns();
		}
		btn.adjusted = !btn.adjusted;
	});
</script>
```


<div></div>

<h2 style="margin-bottom:5px" id="api-refs">API Reference</h2>
<div id="elf-api-container"><div id="main-template" class="elf-template">    <section><article>                                                                        <h3 class="subsection-title">Type Definitions</h3>                        <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~ColumnOptions">ColumnOptions</h4><div class="description">    Extension column options that can be specified on each individual grid's column option:</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>noFitting</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">If enabled, the given column will not be included in the calculation</td>        </tr>            <tr>                            <td class="name"><code>contentFitting</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">By default, fitting extension only calculate text content. Enable this option to support custom rendering fitting for a specified column</td>        </tr>            <tr>                            <td class="name"><code>minWidth</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Minimum width of the column</td>        </tr>            <tr>                            <td class="name"><code>maxWidth</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Maximum width of the column</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Options">Options</h4><div class="description">    The options can be specified by `columnFitting` property of the main grid's options</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>proportion</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">Proportionally expand columns, if there is enough space</td>        </tr>            <tr>                            <td class="name"><code>constraint</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">Prevents column width to go lower than its content size</td>        </tr>            <tr>                            <td class="name"><code>autoAdjust</code></td>                        <td class="type">                            <span class="param-type">boolean</span> | <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">Automatic column width adjusting on each data update</td>        </tr>            <tr>                            <td class="name"><code>autoAdjusting</code></td>                        <td class="type">                            <span class="param-type">boolean</span> | <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">Alias to `autoAdjust`</td>        </tr>            <tr>                            <td class="name"><code>title</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">Include title section in the fitting calculation</td>        </tr>            <tr>                            <td class="name"><code>paddingSize</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    2                                </td>                        <td class="description last">Additional padding from existing cell padding. This will add extra space (in pixel) to the right of the longest text.</td>        </tr>            <tr>                            <td class="name"><code>shrinkable</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">Allow column width to be shrunken during autoAdjust enabled</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <h3 class="subsection-title">Methods</h3>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="adjustAllColumns"><span class="type-signature"></span>adjustAllColumns<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Force update and calculation on all columns    </div>                        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div><div class="sub-content-desc">    True if there is any change, otherwise false</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="adjustColumns"><span class="type-signature"></span>adjustColumns<span class="signature">(colIndices<span class="signature-attributes">opt</span>, force<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Force update and calculation on specific columns    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndices</div>                        <div class="type">                            <span class="param-type">Array.&lt;number&gt;</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                        <div class="default">                                </div>                                        <div class="description">                    Column indices                </div>                    </div>                <div class="param">                            <div class="name">force</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                        <div class="default">                                   [default: true]                                </div>                                        <div class="description">                    Force adjust the columns regardless of noFitting flag                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div><div class="sub-content-desc">    True if there is any change, otherwise false</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="adjustColumnWidth"><span class="type-signature"></span>adjustColumnWidth<span class="signature">(colIndex<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Force update and calculation on a single column. It is not recommended to be used multiple time successively    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">Array.&lt;number&gt;</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Column indices                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div><div class="sub-content-desc">    True if there is any change, otherwise false</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="calculateColumnWidth"><span class="type-signature"></span>calculateColumnWidth<span class="signature">(colIndex)</span><span class="type-signature"> → {number}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="config"><span class="type-signature"></span>config<span class="signature">(options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type"><a href="#~Options">ColumnFitterPlugin~Options</a></span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getAdjustedColumnWidth"><span class="type-signature"></span>getAdjustedColumnWidth<span class="signature">(colIndex)</span><span class="type-signature"> → {number}</span></h4>                            <div class="description">        This is for backward compatability with old ColumnWidthAdjustingPlugin. The method is an alias of <a href="#calculateColumnWidth">ColumnFitterPlugin#calculateColumnWidth</a>    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getColumnMenu"><span class="type-signature"></span>getColumnMenu<span class="signature">(colIndex, config)</span><span class="type-signature"> → {Object}</span></h4>                            <div class="description">        Function for ColumnMenuExtension to collect config of column menu    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Column index                </div>                    </div>                <div class="param">                            <div class="name">config</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    Column Menu configuration                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getConfigObject"><span class="type-signature"></span>getConfigObject<span class="signature">(gridOptions<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Object}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">gridOptions</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getName"><span class="type-signature"></span>getName<span class="signature">()</span><span class="type-signature"> → {string}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hasMultiTableSupport"><span class="type-signature"></span>hasMultiTableSupport<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Plugin that has multi-table support means that it can have multiple hosts/tables and share its states across those hosts/tables.    </div>                        <div class="details">                    <dt class="tag-overrides">Overrides:</dt>    <dd class="tag-overrides">        <a href="">GridPlugin#hasMultiTableSupport</a>    </dd>                                                </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="initialize"><span class="type-signature"></span>initialize<span class="signature">(host, options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    core grid object                </div>                    </div>                <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="resetAllColumns"><span class="type-signature"></span>resetAllColumns<span class="signature">()</span><span class="type-signature"></span></h4>                            <div class="description">        Set all column widths to percentage width    </div>                        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="unload"><span class="type-signature"></span>unload<span class="signature">(host)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    core grid object                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                </article></section></div></div>