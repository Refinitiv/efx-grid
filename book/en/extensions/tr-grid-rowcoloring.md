<link rel="stylesheet" href="../resources/styles/elf-template.css">

## Row Coloring

The Row Coloring Extension provides a way to set text color and background color in each row.

```live
<style>
	atlas-blotter {
		height: 169px;
	}

	input[type=number] {
		width: 30px;
	}

	input[type=color] {
		display: inline-block;
	}
</style>

<button id="set_btn">Set Row Color</button>
Row Index: <input id="row_inp" type="number" value="0">
Color: <input id="color_inp" type="color" value="#cbaacb">
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var rowColoringExt = new tr.RowColoringExtension();
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { seed: 0, numRows: 5 });
	var configObj = {
		columns: [
			{ title: "Company", field: fields[0] },
			{ title: "Market", field: fields[1], width: 120 },
			{ title: "Last", field: fields[2], width: 100 },
			{ title: "Net. Chng", field: fields[3], width: 100 },
			{ title: "Industry", field: fields[4] }
		],
		staticDataRows: records,
		extensions: [
			rowColoringExt
		]
	};

	var grid = document.getElementById("grid");
	grid.addEventListener("configured", function(e) {
		// Set text color and BG color through extension
		rowColoringExt.setRowColor(1, "#ffc5bf", rowColoringExt.getContrastColor("#ffc5bf"));
		rowColoringExt.setRowColor(2, "#97c1a9", rowColoringExt.getContrastColor("#97c1a9"));
		rowColoringExt.setRowColor(3, "#d4f0f0", rowColoringExt.getContrastColor("#d4f0f0"));
	});
	grid.config = configObj;

	document.getElementById("set_btn").addEventListener("click", function(e) {
		var rowIndex = +document.getElementById("row_inp").value;
		var bgColor = document.getElementById("color_inp").value || "black";
		rowColoringExt.toggleRowColor(rowIndex, bgColor, rowColoringExt.getContrastColor(bgColor));
	});
</script>
```

### Installation and how to import to a project

Installation examples and details of how to import the extension to a project are available on the [Overview](README.md) page.

### User fields

The extension supports text color and background color from the `dataTable`. To do this you need to set the `bgColorField` and `textColorField` properties in the `rowColoring` options with your specified field names.


```live
<style>
	atlas-blotter {
		height: 169px;
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>

<script>
	var rowColoringExt = new tr.RowColoringExtension();
	tr.DataGenerator.addFieldInfo("color", {
		type: "set",
		members: ["#c6dbda", "#fee1e8", "#fed7c3", "#f6eac2", "#ecd5e3", "", "", "", "", "", "", "", "", ""]
	});
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry", "color"];
	var records = tr.DataGenerator.generateRecords(fields, { seed: 0, numRows: 5 });
	var configObj = {
		columns: [
			{ title: "Company", field: fields[0] },
			{ title: "Market", field: fields[1], width: 120 },
			{ title: "Last", field: fields[2], width: 100 },
			{ title: "Net. Chng", field: fields[3], width: 100 },
			{ title: "Industry", field: fields[4] }
		],
		staticDataRows: records,
		rowColoring: {
			bgColorField: "color",
		},
		extensions: [
			rowColoringExt
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Predefined color mode

The extension also supports text color and background color from the predefined colors. To do this you need to assign predefined class object to the `predefinedColors` property then set `predefinedColoring` properties to true and specify field name of the `cssField` property.

```live
<style>
	atlas-blotter {
		height: 169px;
	}
	input[type="number"] {
		width: 40px;
	}
	.control-group {
		margin: 10px 0;
	}
	.control-group button {
		vertical-align: middle;
	}
	#btn_group {
		display: inline;
		margin-right: 15px;
	}
</style>

<div class="control-group">
	Row index <input type="number" value="3" id="row_index">
</div>
<div class="control-group">
	Set color
	<div id="btn_group">
	</div>
	<button id="reset">Reset</button>
</div>
<div class="control-group">
	Predefiend color
	<button id="extend_color">Extend</button>
	<button id="shrink_color">Shrink</button>
</div>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var predefinedColorsSet1 = {
		"c-yellow": {
			backgroundColor: "#FFFF00"
		},
		"c-blue": {
			backgroundColor: "#00FFFF"
		},
		"c-green": {
			backgroundColor: "#80FF80"
		},
		"c-red": {
			backgroundColor: "#FF8080"
		}
	};

	var predefinedColorsSet2 = {
		"h-dark-red": {
			backgroundColor: "#520804",
			color: "#C2C2C2"
		},
		"h-dark-green": {
			backgroundColor: "#01433C",
			color: "#C2C2C2"
		},
		"h-dark-blue": {
			backgroundColor: "#003D5A",
			color: "#C2C2C2"
		},
		"h-cyan": {
			backgroundColor: "#2FB4C8",
			color: "#C2C2C2"
		},
		"h-yellow": {
			backgroundColor: "#FFE433",
			color: "#C2C2C2"
		},
		"h-orange": {
			backgroundColor: "#FA4C11",
			color: "#C2C2C2"
		}
	};

	// prepare button for color setting
	function setRowColor(e) {
		var btn = e.currentTarget;
		var colorName = btn._colorName;
		var rowIndex = parseInt(row_index.value);
		rowColoringExt.setRowPredefinedColor(rowIndex, colorName);
	}

	function updateButtons() {
		var btnGroup = document.getElementById("btn_group");
		btnGroup.innerHTML = "";
		var colors = rowColoringExt.getPredefinedColors();
		for(var name in colors) {
			var styles = colors[name];
			var btn = document.createElement("button");
			btn.textContent = name;
			btn.style.backgroundColor = styles.backgroundColor || "";
			btn.style.color = styles.color || "";
			btn._colorName = name;
			btn.addEventListener("click", setRowColor);
			btnGroup.appendChild(btn);
		}
	}

	var rowColoringExt = new tr.RowColoringExtension();
	var conditionalColoringExt = new tr.ConditionalColoringExtension();
	tr.DataGenerator.addFieldInfo("coloringClass", {
		type: "set",
		members: ["c-yellow", "c-blue", "c-green", "c-red", "", "", "", "", "", ""]
	});
	var randIndex = tr.DataGenerator.randIndex;
	var randBetween = tr.DataGenerator.randBetween;
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry", "id", "coloringClass"];
	var records = tr.DataGenerator.generateRecords(fields, { seed: 0, numRows: 10 });
	var configObj = {
		columns: [
			{
				title: "Index",
				field: fields[5],
				width: 50,
				alignment: "center"
			},
			{
				title: "Company",
				field: fields[0]
			},
			{
				title: "Market",
				field: fields[1],
				width: 120
			},
			{
				title: "Last",
				field: fields[2],
				width: 100
			},
			{
				title: "Net. Chng",
				field: fields[3],
				width: 100,
				blinking: true,
				conditions: [
					{
						backgroundColor: "",
						color: "green",
						expression: "[number] > 0"
					},
					{
						backgroundColor: "",
						color: "red",
						expression: "[number] < 0"
					},
					{
						backgroundColor: "",
						color: "blue",
						expression: "[number] == 0"
					}
				]
			},
			{
				title: "Industry",
				field: fields[4]
			}
		],
		staticDataRows: records,
		rowColoring: {
			predefinedColors: predefinedColorsSet1,
			predefinedColoring: true,
			cssField: "coloringClass"
		},
		extensions: [
			rowColoringExt, conditionalColoringExt
		]
	};

	var grid = document.getElementById("grid");
	grid.addEventListener("configured", updateButtons);
	grid.config = configObj;
	
	setInterval(function simulateUpdates() {
		if(grid.api) {
			var rowDef = grid.api.getRowDefinition(randIndex(10))
			rowDef.setRowData({
				"CF_NETCHNG": randBetween(-100, 100)
			});
		}
	}, 300);

	document.getElementById("reset").addEventListener("click", function(e) {
		var rowIndex = parseInt(row_index.value);
		rowColoringExt.setRowPredefinedColor(rowIndex, null);
	});

	document.getElementById("extend_color").addEventListener("click", function(e) {
		var colors = rowColoringExt.getPredefinedColors();
		var newColors = {};
		Object.assign(newColors, colors, predefinedColorsSet2);
		rowColoringExt.setPredefinedColors(newColors);
		updateButtons();
	});

	document.getElementById("shrink_color").addEventListener("click", function(e) {
		var colors = rowColoringExt.getPredefinedColors();
		var newColors = {};
		Object.assign(newColors, colors);
		for (var name in predefinedColorsSet2) {
			delete newColors[name];
		}
		rowColoringExt.setPredefinedColors(newColors);
		updateButtons();
	});
</script>
```



<div></div>

<h2 style="margin-bottom:5px" id="api-refs">API Reference</h2>
<div id="elf-api-container"><div id="main-template" class="elf-template">    <section><article>                                                                        <h3 class="subsection-title">Type Definitions</h3>                        <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Options">Options</h4><div class="description">    The options can be specified by `rowColoring` property of the main grid's options:</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>bgColoring</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    true                                </td>                        <td class="description last">If disabled, background color will not be applied to the row</td>        </tr>            <tr>                            <td class="name"><code>textColoring</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    true                                </td>                        <td class="description last">If disabled, text color will not be applied to the row</td>        </tr>            <tr>                            <td class="name"><code>bgColorField</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    "BG_COLOR"                                </td>                        <td class="description last">Apply background color based on the given field</td>        </tr>            <tr>                            <td class="name"><code>textColorField</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    "TEXT_COLOR"                                </td>                        <td class="description last">Apply text color based on the given field</td>        </tr>            <tr>                            <td class="name"><code>cssField</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    "CSS_CLASS"                                </td>                        <td class="description last">Apply CSS class based on the given field</td>        </tr>            <tr>                            <td class="name"><code>cssRangeField</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    ""                                </td>                        <td class="description last">Apply CSS class only on the given range field, which range will be array 2 element, the first element is start column used colour and the second one is the length of column applied</td>        </tr>            <tr>                            <td class="name"><code>altCssField</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    ""                                </td>                        <td class="description last">Apply alternative CSS class based on the given field which not in range field</td>        </tr>            <tr>                            <td class="name"><code>predefinedColors</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Predefined color object map</td>        </tr>            <tr>                            <td class="name"><code>predefinedColoring</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">If enabled, predefined colors will be used instead of inline styling. The bgColoring and textColoring will be turned off.</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <h3 class="subsection-title">Methods</h3>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id=".getContrastColor"><span class="type-signature"></span>getContrastColor<span class="signature">(hexColor)</span><span class="type-signature"> → {string}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">hexColor</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div><div class="sub-content-desc">    color in CSS hex format (e.g. #FF00FF)</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="config"><span class="type-signature"></span>config<span class="signature">(options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="disableBgColoring"><span class="type-signature"></span>disableBgColoring<span class="signature">(opt_bool<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_bool</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="disableRowColoring"><span class="type-signature"></span>disableRowColoring<span class="signature">(disabled<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">disabled</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="disableTextColoring"><span class="type-signature"></span>disableTextColoring<span class="signature">(opt_bool<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">opt_bool</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="forceUpdateRowColor"><span class="type-signature"></span>forceUpdateRowColor<span class="signature">()</span><span class="type-signature"></span></h4>                                            <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getConfigObject"><span class="type-signature"></span>getConfigObject<span class="signature">(gridOptions<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Object}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">gridOptions</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getContrastColor"><span class="type-signature"></span>getContrastColor<span class="signature">(hexColor)</span><span class="type-signature"> → {string}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">hexColor</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div><div class="sub-content-desc">    color in CSS hex format (e.g. #FF00FF)</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getName"><span class="type-signature"></span>getName<span class="signature">()</span><span class="type-signature"> → {string}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getPredefinedColors"><span class="type-signature"></span>getPredefinedColors<span class="signature">()</span><span class="type-signature"> → {Object}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div><div class="sub-content-desc">    Return predefined color object map</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getRowColor"><span class="type-signature"></span>getRowColor<span class="signature">(rowRef)</span><span class="type-signature"> → {string}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id in the data table or row index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div><div class="sub-content-desc">    bgColor</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hasMultiTableSupport"><span class="type-signature"></span>hasMultiTableSupport<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Plugin that has multi-table support means that it can have multiple hosts/tables and share its states across those hosts/tables.    </div>                        <div class="details">                <dt class="inherited-from">Inherited From:</dt>    <dd class="inherited-from">        <a href="">GridPlugin#hasMultiTableSupport</a>    </dd>                                                    </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="initialize"><span class="type-signature"></span>initialize<span class="signature">(host, options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    core grid instance                </div>                    </div>                <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="removeRowColor"><span class="type-signature"></span>removeRowColor<span class="signature">(rowRef)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Row id in the data table or row index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setPredefinedColors"><span class="type-signature"></span>setPredefinedColors<span class="signature">(predefinedColors)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">predefinedColors</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    Predefined color object map                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setRowColor"><span class="type-signature"></span>setRowColor<span class="signature">(rowRef, bgColor<span class="signature-attributes">opt</span>, txtColor<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    Row id in the data table or row index                </div>                    </div>                <div class="param">                            <div class="name">bgColor</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">null</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>                <div class="param">                            <div class="name">txtColor</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">null</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setRowPredefinedColor"><span class="type-signature"></span>setRowPredefinedColor<span class="signature">(rowRef, color<span class="signature-attributes">opt</span>, range<span class="signature-attributes">opt</span>, altColor<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                            <div class="description">        Set predefined color into row reference    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    Row id in the data table or row index                </div>                    </div>                <div class="param">                            <div class="name">color</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">null</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Predefined color being applied to row                </div>                    </div>                <div class="param">                            <div class="name">range</div>                        <div class="type">                            <span class="param-type">Array.&lt;number&gt;</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Range of column applied colour which array 2 element, the first element is start column used colour and the second one is the length of column applied, it doesn't provide a range, the columns will apply the colour all columns in row reference                </div>                    </div>                <div class="param">                            <div class="name">altColor</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">null</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Alternative predefined color being applied to row if the column doesn't in the rage                </div>                    </div>            </div>        <div class="details">                                                            </div>                                            <h5>Example:</h5>            <pre><code>rowColoringExt.setRowPredefinedColor(2, "c-red") // set predefined color into row index 2 all row.
rowColoringExt.setRowPredefinedColor(2, "c-red", [2, 5]) // set predefined color into row index 2 and applied since column 2 and next 5 columns
rowColoringExt.setRowPredefinedColor(2, "c-red", [2]) // if pass only 1 element into rage parameter, the row will be applied since 2 to last column
rowColoringExt.setRowPredefinedColor(2, "c-red", [2, 5], "c-yellow") // set predefined color into row index 2 and applied since column 2 and next 5 columns and another column will be set color c-yellow</code></pre>    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="toggleRowColor"><span class="type-signature"></span>toggleRowColor<span class="signature">(rowRef, bgColor<span class="signature-attributes">opt</span>, txtColor<span class="signature-attributes">opt</span>, state<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {boolean}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    Row id in the data table or row index                </div>                    </div>                <div class="param">                            <div class="name">bgColor</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">null</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>                <div class="param">                            <div class="name">txtColor</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">null</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>                <div class="param">                            <div class="name">state</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Specify this flag to force the color state                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div><div class="sub-content-desc">    Return current color state (after execution)</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="unload"><span class="type-signature"></span>unload<span class="signature">(host)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    core grid instance                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                </article></section></div></div>