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
			{ title: "Company", field: fields[0] },
			{ title: "Industry", field: fields[2] },
			{ title: "Net. Chng", field: fields[3], width: 100, alignment: "right" },
			{ title: "Updated", field: fields[4] }
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
		{ id: 'c1', title: 'Column 1', field: 'col1' },
		// more column options
	}],
	rowGrouping: {
		groupBy: 'col1' // Or ['col2', 'col3', ...]
	},
};
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
			{ title: "Company", field: fields[0] },
			{ title: "Industry", field: fields[2] },
			{ title: "Net. Chng", field: fields[3], width: 100, alignment: "right" },
			{ title: "Updated", field: fields[4] }
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
			{ title: "Company", field: fields[0] },
			{ title: "Industry", field: fields[2] },
			{ title: "Net. Chng", field: fields[3], width: 100, alignment: "right" },
			{ title: "Updated", field: fields[4] }
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
			{ title: "Company", field: fields[0] },
			{ title: "Industry", field: fields[2] },
			{ title: "Net. Chng", field: fields[3], width: 100, alignment: "right" },
			{ title: "Updated", field: fields[4] }
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
			{ title: "Company", field: fields[0] },
			{ title: "Industry", field: fields[1] },
			{ title: "Net. Chng", field: fields[2], alignment: "center" },
			{ title: "Integer", field: fields[3], alignment: "right" },
			{ title: "Market", field: fields[4]},
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
			{ title: "Company", field: fields[0] },
			{ title: "Industry", field: fields[2] },
			{ title: "Net. Chng", field: fields[3], width: 100, alignment: "right" },
			{ title: "Updated", field: fields[4] }
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
			{ title: "Company", field: fields[0] },
			{ title: "Industry", field: fields[2] },
			{ title: "Net. Chng", field: fields[3], width: 100, alignment: "right" },
			{ title: "Updated", field: fields[4] }
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
			{ title: "ID", field: fields[5], width: 80 },
			{ title: "Company", field: fields[0] },
			{ title: "Industry", field: fields[2] },
			{ title: "Net. Chng", field: fields[3], width: 100, alignment: "right" },
			{ title: "Updated", field: fields[4] }
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
			{ title: "Company", field: fields[0] },
			{ title: "Industry", field: fields[2] },
			{ title: "Net. Chng", field: fields[3], width: 100, alignment: "right" },
			{ title: "Updated", field: fields[4] }
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


<div></div>

<div id="elf-api-container"><h2 style="margin-bottom:5px" id="api-refs">API Reference</h2><div id="main-template" class="elf-template">    <section><article>                                                                        <h3 class="subsection-title">Type Definitions</h3>                        <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~GroupCriteria">GroupCriteria</h4><div class="description">    GroupCriteria can be one of the following values: <br><b>null</b> input will clear all existing grouping criteria <br><b>string</b> input is treat as column/field name in the data table <br><b>Function</b> input is for custom criteria <br><b>Array</b> input will create multiple groups in tree like manner (nested group criteria)</div>    <h5>Type:</h5>    <span class="param-type">string</span> | <span class="param-type">Array.&lt;(string|function())&gt;</span><div class="details">                                                            </div></div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~GroupingState">GroupingState</h4><div class="description">    state of groupings or JSON String</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>collapsed</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                                </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>groupId</code></td>                        <td class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last"></td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">                                <div class="item-type">typedef</div>                        <h4 class="name" id="~GroupSortLogic"><span class="type-signature"></span>GroupSortLogic<span class="signature">(grpValA, grpValB, grpDataViewA<span class="signature-attributes">opt</span>, grpDataViewB<span class="signature-attributes">opt</span>)</span><span class="type-signature"> ??? {number}</span></h4>                            <div class="description">        Method parameters provided by `groupSortLogic` callback    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">grpValA</div>                        <div class="type">                            <span class="param-type">*</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    Group value of the group in left hand side                </div>                    </div>                <div class="param">                            <div class="name">grpValB</div>                        <div class="type">                            <span class="param-type">*</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    Group value of the group in right hand side                </div>                    </div>                <div class="param">                            <div class="name">grpDataViewA</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    DataView of the group in left hand side                </div>                    </div>                <div class="param">                            <div class="name">grpDataViewB</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    DataView of the group in right hand side                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div>                </div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Options">Options</h4><div class="description">    The options can be specified by `rowGrouping` property of the main grid's options</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>autoGroupRemoval</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">Remove group that has no row member.</td>        </tr>            <tr>                            <td class="name"><code>autoGroupHiding</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">Hide "null" or "undefined" group headers, while keeping the group's items intact.</td>        </tr>            <tr>                            <td class="name"><code>predefinedGroups</code></td>                        <td class="type">                            <span class="param-type">Array</span> | <span class="param-type">Array.&lt;Array&gt;</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Add groups without content rows. Use 2D array for multi-level grouping.</td>        </tr>            <tr>                            <td class="name"><code>groupBy</code></td>                        <td class="type">                            <span class="param-type"><a href="RowGroupingPlugin.html#~GroupCriteria">RowGroupingPlugin~GroupCriteria</a></span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">GroupCriteria can be string, function, or array of string.</td>        </tr>            <tr>                            <td class="name"><code>groupCriteria</code></td>                        <td class="type">                            <span class="param-type"><a href="RowGroupingPlugin.html#~GroupCriteria">RowGroupingPlugin~GroupCriteria</a></span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Alias to `groupBy`.</td>        </tr>            <tr>                            <td class="name"><code>displayColumn</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    0                                </td>                        <td class="description last">Column Index for group header rendering.</td>        </tr>            <tr>                            <td class="name"><code>fixedDisplayColumn</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">If enabled, displayColumn will remain in the same index, even if columns are shifted by insertion or removal.</td>        </tr>            <tr>                            <td class="name"><code>noCollapsible</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">If enabled, arrows will be hidden and cell is not clickable. This flag takes precedence over `clickableCell` and `hiddenArrow`.</td>        </tr>            <tr>                            <td class="name"><code>clickableCell</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    true                                </td>                        <td class="description last">If disabled, clicking at cell will not expand that group</td>        </tr>            <tr>                            <td class="name"><code>hiddenArrow</code></td>                        <td class="type">                            <span class="param-type">boolean</span> | <span class="param-type">number</span> | <span class="param-type">Array.&lt;number&gt;</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Specify header levels which is a single number start from 1 or an array of number that want to hide arrow icon. If specify true all arrows will be hidden.</td>        </tr>            <tr>                            <td class="name"><code>contentAsHeader</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">If enabled, second level group header rows are hidden, the first content rows become a header, cells are not be clickable, and arrows are hidden.</td>        </tr>            <tr>                            <td class="name"><code>headerSpanning</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    true                                </td>                        <td class="description last">If disabled, every cell on the group header row is displayed</td>        </tr>            <tr>                            <td class="name"><code>footerSpanning</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">If enabled, only cells from the first column will be shown, spanning over other cells</td>        </tr>            <tr>                            <td class="name"><code>groupSortLogic</code></td>                        <td class="type">                            <span class="param-type"><a href="RowGroupingPlugin.html#~GroupSortLogic">RowGroupingPlugin~GroupSortLogic</a></span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Logic for group sorting. There is no sorting by default (i.e. groups are placed in order of their creation time)</td>        </tr>            <tr>                            <td class="name"><code>autoGroupSorting</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">If enabled, group sorting will be performed after each `groupAdded` event</td>        </tr>            <tr>                            <td class="name"><code>indentSize</code></td>                        <td class="type">                            <span class="param-type">boolean</span> | <span class="param-type">number</span> | <span class="param-type">Array.&lt;number&gt;</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Use array to define indent for each group level. Use boolean to turn on or off indentation. Use number to define incremental step.</td>        </tr>            <tr>                            <td class="name"><code>colorTag</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">If not specified, the color tag will be disabled when using extension without halo theme.</td>        </tr>            <tr>                            <td class="name"><code>clicked</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Event handler when user clicks on arrows or cells</td>        </tr>            <tr>                            <td class="name"><code>groupAdded</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Event handler</td>        </tr>            <tr>                            <td class="name"><code>beforeGroupAdded</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Event handler</td>        </tr>            <tr>                            <td class="name"><code>groupHeaderBinding</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Logic that will be executed on each group header row</td>        </tr>            <tr>                            <td class="name"><code>groupFooterBinding</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Once defined, footer row will be added on each group</td>        </tr>            <tr>                            <td class="name"><code>headerBinding</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Shorthand for `groupHeaderBinding`</td>        </tr>            <tr>                            <td class="name"><code>footerBinding</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Shorthand for `groupFooterBinding`</td>        </tr>            <tr>                            <td class="name"><code>nonGroupBinding</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">This is used to clear any custom styling defined in groupHeaderBinding or groupFooterBinding</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <h3 class="subsection-title">Methods</h3>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="beforeProcessOption"><span class="type-signature"></span>beforeProcessOption<span class="signature">(optionName, optionVal)</span><span class="type-signature"> ??? {*}</span></h4>                            <div class="description">        Convert built-in grid config to extension config    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">optionName</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>                <div class="param">                            <div class="name">optionVal</div>                        <div class="type">                            <span class="param-type">*</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">*</span>    </div><div class="sub-content-desc">    The transformed value of the option</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="collapse"><span class="type-signature"></span>collapse<span class="signature">(groupRowId, opt_collapsed<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">groupRowId</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">opt_collapsed</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="collapseAll"><span class="type-signature"></span>collapseAll<span class="signature">(opt_collapsed<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_collapsed</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="config"><span class="type-signature"></span>config<span class="signature">(options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Grid configuration object                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="disableClicking"><span class="type-signature"></span>disableClicking<span class="signature">(opt_disabled<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_disabled</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="enableFixedDisplayColumn"><span class="type-signature"></span>enableFixedDisplayColumn<span class="signature">(opt_enabled<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                            <div class="description">        Fixed display column to stay at the same position even though the column has been moved, or shifted by removing and inserting column    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_enabled</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="enableFooterRow"><span class="type-signature"></span>enableFooterRow<span class="signature">(opt_num<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_num</div>                        <div class="type">                            <span class="param-type">boolean</span> | <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="expand"><span class="type-signature"></span>expand<span class="signature">(groupRowId, opt_expanded<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">groupRowId</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">opt_expanded</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="expandAll"><span class="type-signature"></span>expandAll<span class="signature">(opt_expanded<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_expanded</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getColumnMenu"><span class="type-signature"></span>getColumnMenu<span class="signature">(colIndex, config)</span><span class="type-signature"> ??? {Object}</span></h4>                            <div class="description">        Function for ColumnMenuExtension to collect config of column menu    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Column index                </div>                    </div>                <div class="param">                            <div class="name">config</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    Column Menu configuration                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getConfigObject"><span class="type-signature"></span>getConfigObject<span class="signature">(gridOptions<span class="signature-attributes">opt</span>)</span><span class="type-signature"> ??? {Object}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">gridOptions</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getDataView"><span class="type-signature"></span>getDataView<span class="signature">()</span><span class="type-signature"> ??? {Object}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div><div class="sub-content-desc">    DataView instance</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getGroupingCriteria"><span class="type-signature"></span>getGroupingCriteria<span class="signature">()</span><span class="type-signature"> ??? {Array.&lt;string&gt;}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;string&gt;</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getGroupingStates"><span class="type-signature"></span>getGroupingStates<span class="signature">()</span><span class="type-signature"> ??? {Array.&lt;<a href="RowGroupingPlugin.html#~GroupingState">RowGroupingPlugin~GroupingState</a>&gt;}</span></h4>                            <div class="description">        Returns an array of states (collapsed or expanded)    </div>                        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;<a href="RowGroupingPlugin.html#~GroupingState">RowGroupingPlugin~GroupingState</a>&gt;</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getGroupSortingLogic"><span class="type-signature"></span>getGroupSortingLogic<span class="signature">()</span><span class="type-signature"> ??? {function}</span></h4>                            <div class="description">        Get the current group sort function. If none specified by setGroupSortingLogic() return <br>standard string sort function.    </div>                        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">function</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getName"><span class="type-signature"></span>getName<span class="signature">()</span><span class="type-signature"> ??? {string}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="groupBy"><span class="type-signature"></span>groupBy<span class="signature">(criteria)</span><span class="type-signature"></span></h4>                            <div class="description">        Alias for <a href="RowGroupingPlugin.html#setGroupingCriteria">RowGroupingPlugin#setGroupingCriteria</a>    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">criteria</div>                        <div class="type">                            <span class="param-type"><a href="RowGroupingPlugin.html#~GroupCriteria">RowGroupingPlugin~GroupCriteria</a></span>                        </div>                                            </div>            </div>        <div class="details">                                                            <dt class="tag-see">See:</dt>    <dd class="tag-see">        <ul>            <li><a href="RowGroupingPlugin.html#setGroupingCriteria">RowGroupingPlugin#setGroupingCriteria</a></li>        </ul>    </dd>        </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hasGroupingCriteria"><span class="type-signature"></span>hasGroupingCriteria<span class="signature">()</span><span class="type-signature"> ??? {boolean}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hasMultiTableSupport"><span class="type-signature"></span>hasMultiTableSupport<span class="signature">()</span><span class="type-signature"> ??? {boolean}</span></h4>                            <div class="description">        Plugin that has multi-table support means that it can have multiple hosts/tables and share its states across those hosts/tables.    </div>                        <div class="details">                    <dt class="tag-overrides">Overrides:</dt>    <dd class="tag-overrides">        <a href="GridPlugin.html#hasMultiTableSupport">GridPlugin#hasMultiTableSupport</a>    </dd>                                                </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="initialize"><span class="type-signature"></span>initialize<span class="signature">(host, options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    core grid object                </div>                    </div>                <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setGroupingCriteria"><span class="type-signature"></span>setGroupingCriteria<span class="signature">(criteria)</span><span class="type-signature"></span></h4>                            <div class="description">        Each duplicate values in the given columns will be grouped together. Number of generated groups will equal to number of unique values in the given columns.    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">criteria</div>                        <div class="type">                            <span class="param-type"><a href="RowGroupingPlugin.html#~GroupCriteria">RowGroupingPlugin~GroupCriteria</a></span>                        </div>                                                    <div class="description">                    &lt;br&gt;Null input will clear all existing grouping criteria. &lt;br&gt;String input is treat as column name in data table &lt;br&gt;Array input will create mutilple groups in tree like manner (nested group criteria) &lt;br&gt;Any previous given values will be cleared out after calling this method                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setGroupingStates"><span class="type-signature"></span>setGroupingStates<span class="signature">(states)</span><span class="type-signature"></span></h4>                            <div class="description">        Set state for groups    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">states</div>                        <div class="type">                            <span class="param-type">Array.&lt;<a href="RowGroupingPlugin.html#~GroupingState">RowGroupingPlugin~GroupingState</a>&gt;</span> | <span class="param-type">string</span>                        </div>                                                    <div class="description">                    Array state of groupings or JSON String                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setGroupSortingLogic"><span class="type-signature"></span>setGroupSortingLogic<span class="signature">(sortFunction)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">sortFunction</div>                        <div class="type">                            <span class="param-type"><a href="RowGroupingPlugin.html#~GroupSortLogic">RowGroupingPlugin~GroupSortLogic</a></span>                        </div>                                                    <div class="description">                    Comparer function for comparing the order of 2 groups. The function should take at least 2 parameters. &lt;br&gt;The function should return -1 if the first parameter should comes first, 1 for the other way, and 0 if they are equal. &lt;br&gt;The two first parameters passed to the function are group value that separates group. &lt;br&gt;The two last parameters passed to the function are data views of corresponding group.                </div>                    </div>            </div>        <div class="details">                                                            </div>                                            <h5>Example:</h5>            <pre><code>var compare = function(grpA, grpB, dataViewA, dataViewB) {
  return (grpA &lt;= grpB) ? -1 : 1;
}
var dstp = new RowGroupingExtension();
dstp.setGroupSortingLogic(compare);</code></pre>    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setPredefinedGroups"><span class="type-signature"></span>setPredefinedGroups<span class="signature">(predefinedGroups)</span><span class="type-signature"></span></h4>                            <div class="description">        Specify empty group in case of grouping values are known prior to requesting data    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">predefinedGroups</div>                        <div class="type">                            <span class="param-type">Array</span> | <span class="param-type">Array.&lt;Array&gt;</span>                        </div>                                                    <div class="description">                    &lt;br&gt;Values in the given array should be matched the value coming from a data table, or else no content is added to the group &lt;br&gt;Use null value to clear all predefined groups. &lt;br&gt;Use 2D array to specify nested groups. &lt;br&gt;Any previous given values will be cleared out after calling this method                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="sortGroups"><span class="type-signature"></span>sortGroups<span class="signature">()</span><span class="type-signature"></span></h4>                            <div class="description">        Trigger group sorting logic -- re-sort the existing groups. This will not continuously apply to each data update.    </div>                        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="unload"><span class="type-signature"></span>unload<span class="signature">(host<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    core grid object                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="updateHeaders"><span class="type-signature"></span>updateHeaders<span class="signature">()</span><span class="type-signature"></span></h4>                                            <div class="details">                                                            </div>                                    </div>                        <h3 class="subsection-title">Events</h3>                    <div class="item">                                <div class="item-type">event</div>                        <h4 class="name" id="event:beforeGroupAdded">beforeGroupAdded</h4>                            <div class="description">        Fired each time before group added. Set property `cancel` to true to cancel adding of the new group    </div>                    <h5>Type:</h5>        <span class="param-type">Object</span>                    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>dataView</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">DataView instance</td>        </tr>            <tr>                            <td class="name"><code>newGroupId</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>newGroupValue</code></td>                        <td class="type">                            <span class="param-type">*</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>newGroupRowId</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                                    <td class="description last">Unique row Id given for the group</td>        </tr>        </tbody></table></div><div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">event</div>                        <h4 class="name" id="event:clicked">clicked</h4>                            <div class="description">        Fired when users click on UIs that trigger expanding or collapsing a group    </div>                    <h5>Type:</h5>        <span class="param-type">Object</span>                    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>rowIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>expanded</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>group</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Data view that represents currently clicked group header row</td>        </tr>        </tbody></table></div><div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">event</div>                        <h4 class="name" id="event:groupAdded">groupAdded</h4>                                                <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>dataView</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Parent DataView that create the new group</td>        </tr>            <tr>                            <td class="name"><code>newGroup</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Child DataView that is newly created</td>        </tr>        </tbody></table></div><div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">event</div>                        <h4 class="name" id="event:groupFooterBinding">groupFooterBinding</h4>                            <div class="description">        Fired when footer of each group is rendered    </div>                    <h5>Type:</h5>        <span class="param-type">Object</span>                    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>rowData</code></td>                        <td class="type">                            <span class="param-type">object</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>colIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>rowIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>rowId</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>footerIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>groupId</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>footerRow</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>cell</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Grid cell instance</td>        </tr>            <tr>                            <td class="name"><code>section</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">VirtualizedLayoutGrid</td>        </tr>            <tr>                            <td class="name"><code>dataSource</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Parent DataView of group</td>        </tr>        </tbody></table></div><div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">event</div>                        <h4 class="name" id="event:groupHeaderBinding">groupHeaderBinding</h4>                            <div class="description">        Fired when header of each group is rendered    </div>                    <h5>Type:</h5>        <span class="param-type">Object</span>                    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>rowData</code></td>                        <td class="type">                            <span class="param-type">object</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>colIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>rowIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>rowId</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>footerIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>groupId</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>footerRow</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>cell</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Grid cell instance</td>        </tr>            <tr>                            <td class="name"><code>section</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">VirtualizedLayoutGrid</td>        </tr>            <tr>                            <td class="name"><code>dataSource</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Parent DataView of group</td>        </tr>        </tbody></table></div><div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">event</div>                        <h4 class="name" id="event:nonGroupBinding">nonGroupBinding</h4>                            <div class="description">        Fired for each normal content row rendering    </div>                    <h5>Type:</h5>        <span class="param-type">Object</span>                    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>rowData</code></td>                        <td class="type">                            <span class="param-type">object</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>colIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>rowIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>rowId</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>cell</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Grid cell instance</td>        </tr>            <tr>                            <td class="name"><code>section</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">VirtualizedLayoutGrid</td>        </tr>            <tr>                            <td class="name"><code>dataSource</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Root DataView of all group</td>        </tr>            <tr>                            <td class="name"><code>noIndent</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                                    <td class="description last">set this property to true to prevent cell add indent</td>        </tr>        </tbody></table></div><div class="details">                                                            </div>                                    </div>            </article></section></div></div>