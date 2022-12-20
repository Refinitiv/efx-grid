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
			{ title: "Company", field: fields[0] },
			{ title: "Market", field: fields[1], width: 120 },
			{ title: "Last", field: fields[2], width: 100 },
			{ title: "Net. Chng", field: fields[3], width: 100 },
			{ title: "Industry", field: fields[4] }
		],
		staticDataRows: records,
		extensions: [
			rowSegmentingExt,
			rowDraggingExt
		],
		whenDefined: function(e) {
			rowSegmentingExt.setSegmentSeparator(2);
			rowSegmentingExt.setSegmentSeparator(5);
			rowSegmentingExt.setSegmentSeparator(8);
			rowSegmentingExt.fillSegments();
		}
	};

	var grid = document.getElementById("grid");
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

### Differences between Row Segmenting and Row Grouping Extensions

Both extensions produce very similar looking results, but there are some key differences in behaviors and functionalities. 

#### Group header (segment separator)

The group headers in Row Segmenting Extension have their own data/content, whereas those in Row Grouping Extension have no data. Group headers in Row Segmenting Extension are actually normal row with a separator mark on it. This means you can perform sorting and filtering on the group headers.

The group headers in the Row Grouping Extension have no data because they are automatically generated based on the specified criteria. So they have no place to hold their data and you will need to have a separate place to hold it. Because of this extra place to manage, it's more difficult to perform sorting and filtering on these group headers.

#### Dragging group header

The group headers in Row Segmenting Extension can be moved by dragging, if we use Row Dragging Extension. Moving group header is the same as moving row content. After moving, group headers will also move their row members along with them.

The group headers in Row Grouping Extension cannot be moved freely. They can only moved or ordered by sorting operation. This is because they are automatically generated and constantly added or removed according to data updates. 

> Note: dragging behaviors for group headers have not yet finalized and are subject to change.

#### Grouping criteria

Specifying a group header in Row Segmenting Extension is a bit more difficult. Each group header has to be set manually through the extension's APIs. Use the `setSegmentSeparator()` method to specify group header. Group members need to be manually added to the new groups by `addSegmentChild()` or `addSegmentChildren()` methods. Any row added to the group will be moved below the group header position. Rows that are already a group member cannot be added to another group. 

Grouping in Row Grouping Extension are based on row content. So, you can add or remove a group by just changing content of a row. A row can be moved between different groups by changing content of the row as well. 

> More APIs will be implemented to accommodate adding or removing member in the future updates.

#### Multi-level grouping

Multi-level grouping is not supported by Row Segmenting Extension at the moment. The feature is stil in development. 

#### Group sorting

sorting at the group level is not supported by Row Segmenting Extension at the moment. The feature is stil in development. 

#### Content sorting

Row content is sorted within its own group. The behavior is the same for both Row Segmenting and Row Grouping extension.

#### Predefined color

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
			title: f,
			field: f
		};
	});

	columns.push({
		title: "color",
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
			},
		
		],
		extensions: [
			ext
		],
		whenDefined: function(e) {
			ext.setSegmentSeparator(2);
			ext.setSegmentSeparator(5);
			ext.setSegmentSeparator(8);
			ext.fillSegments();
		}
	};
	var grid = document.getElementsByTagName("atlas-blotter")[0];
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

#### Save/Load grid config

In atlas-blotter with row segmenting extension we have spanningField, predefinedColor, segmentId can be implement save/load grid config,
We provide the user to set those properties with `setStaticRowData` or `setStaticData`.
When you set static data to pass grid API. It will be applied API in row segment extension too. Such as, setPredefiniedColor can be set static value with grid.api.setStaticData(0,"TAG_CSS_CLASS", "color1") in runtime mode.
And also, in the initialization grid, it will get values from rows or staticDataRows, which is static data.

The example of set static data, which edits values in runtime,
we provide the use case save/load config from the grid.
You can get the config from the grid and use this config in another grid.

You can follow in below example for implement save/load functionality.
The first example it will be grid that can be change data with click "Save config". 
And then you can paste this config on the example 2 and click "Start Grid" and both grids look the same. 

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
	
	<!--  Set predifined color with api  -->
    <h4>Example 1 save data from grid</h4>
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

		// Initial grid with set segment separator 
		records[1].segmentId = 1;
		records[1].rowSegmentingColoringClass = "color-1";
		records[2].segmentId = 1;
		records[3].segmentId = 1;

		records[4].segmentId = 3;
		records[4].rowSegmentingColoringClass = "color-2";
		records[4].spanning = true;
		records[4].customGroup = "Custom Group 1";
		records[5].segmentId = 3;
		records[6].segmentId = 3;

		records[7].segmentId = 2;
		records[7].rowSegmentingColoringClass = "color-3";
		records[7].spanning = 2;
		records[8].segmentId = 2;
		records[9].segmentId = 2;
		// end set segment separator


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

- - -


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

	<!-- For restore config to grid -->
    <h4>Example 2 load data to grid</h4>
	<span> You can load the grid config with pase in below text area and then click "Start Grid" </span>
	<hr>
	<button id="start_grid"> Start Grid </button>
	<hr>
	<textarea id="area_config" placeholder="Patse grid config and click Start Grid"></textarea>
	<hr>
	<atlas-blotter></atlas-blotter>

	<script type="module">

		var rowSegmentingExt = (window.rowSegmentingExt = new tr.RowSegmentingExtension());

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
			configObj.extensions = [rowSegmentingExt];
			grid.config = configObj;
		});

	</script>

```

<div></div>

<div id="elf-api-container"><h2 style="margin-bottom:5px" id="api-refs">API Reference</h2><div id="main-template" class="elf-template">    <section><article>                                                                        <h3 class="subsection-title">Type Definitions</h3>                        <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Options">Options</h4><div class="description">    The options can be specified by `rowSegmenting` property of the main grid's options</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>spanning</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    true                                </td>                        <td class="description last">If disabled, segment separator rows will not be spanned/stretched across multiple cells</td>        </tr>            <tr>                            <td class="name"><code>colorTag</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">If not specified, the color tag will be disabled when using extension without halo theme.</td>        </tr>            <tr>                            <td class="name"><code>cssField</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    "TAG_CSS_CLASS"                                </td>                        <td class="description last">Apply CSS class based on the given field</td>        </tr>            <tr>                            <td class="name"><code>predefinedColors</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Predefined color object map for color tag</td>        </tr>            <tr>                            <td class="name"><code>clicked</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Event handler when user clicks on arrows or cells</td>        </tr>            <tr>                            <td class="name"><code>headerMenuClicked</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Event handler when user clicks on menu icon. The menu icon will be displayed if spanning option is true.</td>        </tr>            <tr>                            <td class="name"><code>segmentSeparatorBinding</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Logic that will be executed on each segment separator row</td>        </tr>            <tr>                            <td class="name"><code>nonSegmentSeparatorBinding</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Logic that will be executed for all non segment separator row</td>        </tr>            <tr>                            <td class="name"><code>sortingLogic</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Logic to be used by sortSegments method</td>        </tr>            <tr>                            <td class="name"><code>rowSpanningField</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    "ROW_SPANNING"                                </td>                        <td class="description last">selected field for apply row spanning in row separator</td>        </tr>            <tr>                            <td class="name"><code>segmentIdField</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    "SEGMENT_ID"                                </td>                        <td class="description last">selected field for set segment separator row</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">                                <div class="item-type">typedef</div>                        <h4 class="name" id="~SortingLogic"><span class="type-signature"></span>SortingLogic<span class="signature">(rowDataA, rowDataB)</span><span class="type-signature"> → {number}</span></h4>                            <div class="description">        Comparer function for comparing the order of 2 segment separator rows. The function takes at least 2 parameters. <br> The function should return -1 if the first parameter should comes first, 1 for the other way, and 0 if they are equal.    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowDataA</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    Row data of the segment separator row                </div>                    </div>                <div class="param">                            <div class="name">rowDataB</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    Row data of the segment separator row                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div>                </div>                            <h3 class="subsection-title">Methods</h3>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="addSegmentChild"><span class="type-signature"></span>addSegmentChild<span class="signature">(segmentRef, rowRef)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">segmentRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id or row index                </div>                    </div>                <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id, row index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="addSegmentChildren"><span class="type-signature"></span>addSegmentChildren<span class="signature">(segmentRef, rowRefs)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">segmentRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id or row index                </div>                    </div>                <div class="param">                            <div class="name">rowRefs</div>                        <div class="type">                            <span class="param-type">Array.&lt;(string|number)&gt;</span>                        </div>                                                    <div class="description">                    Array of row ids or row indices.  If null is given, no child will be removed.                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="collapseSegment"><span class="type-signature"></span>collapseSegment<span class="signature">(rowRef, collapsed<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Hide all members in the segment    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    Row id or row index of the segment separator                </div>                    </div>                <div class="param">                            <div class="name">collapsed</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div><div class="sub-content-desc">    Return true if there is any change</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="config"><span class="type-signature"></span>config<span class="signature">(options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Grid configuration object                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="expandAllSegments"><span class="type-signature"></span>expandAllSegments<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div><div class="sub-content-desc">    Return true if there is any change</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="expandSegment"><span class="type-signature"></span>expandSegment<span class="signature">(rowRef, expanded<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {boolean}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    Row id or row index                </div>                    </div>                <div class="param">                            <div class="name">expanded</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div><div class="sub-content-desc">    Return true if there is any change</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="fillSegment"><span class="type-signature"></span>fillSegment<span class="signature">(segmentRef)</span><span class="type-signature"></span></h4>                            <div class="description">        Remove existing segment children and fill the segments with all contnet rows before the next segment separator    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">segmentRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id or row index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="fillSegments"><span class="type-signature"></span>fillSegments<span class="signature">()</span><span class="type-signature"></span></h4>                            <div class="description">        Remove all existing segment children in each segment and fill the segments with all contnet rows before the next segment separator    </div>                        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getConfigObject"><span class="type-signature"></span>getConfigObject<span class="signature">(gridOptions<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Object}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">gridOptions</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getName"><span class="type-signature"></span>getName<span class="signature">()</span><span class="type-signature"> → {string}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getRowConfigObject"><span class="type-signature"></span>getRowConfigObject<span class="signature">(rowData, rowId)</span><span class="type-signature"> → {Object}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowData</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    row config object                </div>                    </div>                <div class="param">                            <div class="name">rowId</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div><div class="sub-content-desc">    return row config object with update special field data</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getSegmentChildIds"><span class="type-signature"></span>getSegmentChildIds<span class="signature">(segmentRef)</span><span class="type-signature"> → {Array.&lt;string&gt;}</span></h4>                            <div class="description">        Get row ids of all children from the specified segment    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">segmentRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id or row index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;string&gt;</span>    </div><div class="sub-content-desc">    Returns array of row ids. Returns null if there is no child or no segment separator found</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getSegmentIds"><span class="type-signature"></span>getSegmentIds<span class="signature">()</span><span class="type-signature"> → {Array.&lt;string&gt;}</span></h4>                            <div class="description">        Get row ids of all segment separator    </div>                        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;string&gt;</span>    </div><div class="sub-content-desc">    Return null if there is no segment separator</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getSegmentParentRowId"><span class="type-signature"></span>getSegmentParentRowId<span class="signature">(rowRef)</span><span class="type-signature"> → {string}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row Id or row index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div><div class="sub-content-desc">    parent row id of this segmentation. If the parent row id for this segmentation cannot be found, return ""</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hasMultiTableSupport"><span class="type-signature"></span>hasMultiTableSupport<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Plugin that has multi-table support means that it can have multiple hosts/tables and share its states across those hosts/tables.    </div>                        <div class="details">                <dt class="inherited-from">Inherited From:</dt>    <dd class="inherited-from">        <a href="GridPlugin.html#hasMultiTableSupport">GridPlugin#hasMultiTableSupport</a>    </dd>                                                    </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hasSegmentation"><span class="type-signature"></span>hasSegmentation<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Check if there is at least one segment separator in the data view    </div>                        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="initialize"><span class="type-signature"></span>initialize<span class="signature">(host, options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    core grid instance                </div>                    </div>                <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="isSegmentCollapsed"><span class="type-signature"></span>isSegmentCollapsed<span class="signature">(rowRef)</span><span class="type-signature"> → {boolean}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id or row index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div><div class="sub-content-desc">    Return true if only the given row is a collapsed segment separator</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="isSegmentSeparator"><span class="type-signature"></span>isSegmentSeparator<span class="signature">(rowRef)</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Check if the specified row is a segment separator    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id or row index (not recommended for usage)                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="removeAllSegmentChildren"><span class="type-signature"></span>removeAllSegmentChildren<span class="signature">()</span><span class="type-signature"></span></h4>                                            <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="removeSegmentChild"><span class="type-signature"></span>removeSegmentChild<span class="signature">(segmentRef, rowRef)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">segmentRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id or row index                </div>                    </div>                <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id, row index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="removeSegmentChildren"><span class="type-signature"></span>removeSegmentChildren<span class="signature">(segmentRef, rowRefs)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">segmentRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id or row index                </div>                    </div>                <div class="param">                            <div class="name">rowRefs</div>                        <div class="type">                            <span class="param-type">Array.&lt;(string|number)&gt;</span>                        </div>                                                    <div class="description">                    Array of row ids or row indices                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setPredefinedColors"><span class="type-signature"></span>setPredefinedColors<span class="signature">(predefinedColors)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">predefinedColors</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    Predefined color object map                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setSegmentClassification"><span class="type-signature"></span>setSegmentClassification<span class="signature">(rowRef, fields)</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Set classification for the specified segment    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id or row index                </div>                    </div>                <div class="param">                            <div class="name">fields</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">Array.&lt;string&gt;</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setSegmentCollapsingLogic"><span class="type-signature"></span>setSegmentCollapsingLogic<span class="signature">(func)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">func</div>                        <div class="type">                            <span class="param-type">function</span>                        </div>                                                    <div class="description">                    By default, all row members are hidden in a collapsed segment                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setSegmentSeparator"><span class="type-signature"></span>setSegmentSeparator<span class="signature">(rowRef, enabled<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Set specified row as a segment separator    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    Row id or row index                </div>                    </div>                <div class="param">                            <div class="name">enabled</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div><div class="sub-content-desc">    Return true if there is any change</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setSortingLogic"><span class="type-signature"></span>setSortingLogic<span class="signature">(sortFunction)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">sortFunction</div>                        <div class="type">                            <span class="param-type"><a href="RowSegmentingPlugin.html#~SortingLogic">RowSegmentingPlugin~SortingLogic</a></span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="sortSegments"><span class="type-signature"></span>sortSegments<span class="signature">(sortFunction<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">sortFunction</div>                        <div class="type">                            <span class="param-type"><a href="RowSegmentingPlugin.html#~SortingLogic">RowSegmentingPlugin~SortingLogic</a></span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="spanSegmentSeparator"><span class="type-signature"></span>spanSegmentSeparator<span class="signature">(rowRef, spanning)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                                                    <div class="description">                    rowIndex or rowId                </div>                    </div>                <div class="param">                            <div class="name">spanning</div>                        <div class="type">                            <span class="param-type">boolean</span> | <span class="param-type">null</span>                        </div>                                                    <div class="description">                    if set true when rowRef is row separator, then span that row                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="unload"><span class="type-signature"></span>unload<span class="signature">(host<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    core grid instance                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="unsetAllSegmentSeparators"><span class="type-signature"></span>unsetAllSegmentSeparators<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Clear all segment separator rows    </div>                        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div><div class="sub-content-desc">    Return true if there is any change</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="updateHeaders"><span class="type-signature"></span>updateHeaders<span class="signature">()</span><span class="type-signature"></span></h4>                                            <div class="details">                                                            </div>                                    </div>                </article></section></div></div>