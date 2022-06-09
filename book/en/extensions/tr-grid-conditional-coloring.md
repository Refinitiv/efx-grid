<link rel="stylesheet" href="../resources/styles/elf-template.css">

## Conditional Coloring

The Conditional Coloring Extension provides a conditional coloring for a column's field, which will be triggered when a condition is met. For example, fill green when the value is more than zero.

```live
<style>
	atlas-blotter {
		height: 208px;
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>

<script>
	var records = [
		{"c1":  10, "c2": -10,    "c3": 4},
		{"c1":   2, "c2": 10,     "c3": 1},
		{"c1":   0, "c2": -50,    "c3": 2},
		{"c1":  -1, "c2": 0,      "c3": 9},
		{"c1":  -5, "c2": 123.23, "c3": 3},
		{"c1":  40, "c2": 0,      "c3": 5},
		{"c1": 500, "c2": -509.1, "c3": -1},
		{"c1": 120, "c2": 20.9,   "c3": -2},
		{"c1":  20, "c2": -40.8,  "c3": -8},
		{"c1": -70, "c2": 2.7,    "c3": 0},
		{"c1": -40, "c2": 1.3,    "c3": 0},
		{"c1": 100, "c2": -0.1,   "c3": 0}
	];
	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{
				title: "Value > 0",
				field: "c1",
				conditions: [{
					backgroundColor: "green",
					color: "white",
					expression: "[c1] > 0"
				}]
			},
			{
				title: "Multiple Conditions",
				field: "c2",
				conditions: [{
					backgroundColor: "",
					color: "green",
					expression: "[c2] > 0"
				}, {
					backgroundColor: "",
					color: "red",
					expression: "[c2] < 0"
				}, {
					backgroundColor: "",
					color: "blue",
					expression: "[c2] == 0"
				}]
			},
			{
				title: "Range between -3 and 3",
				field: "c3",
				conditions: [{
					backgroundColor: "lightskyblue",
					color: "",
					expression: "[c3] >= -3 && [c3] <= 3"
				}]
			}
		],
		staticDataRows: records,
		extensions: [
			new tr.ConditionalColoringExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Installation and how to import to a project

Installation examples and details of how to import the extension to a project are available on the [Overview](README.md) page.

### Blinking feature

For required scenarios, there are features to deal with real-time data. For example, stock market data changes all the time, and a user needs to know that the data has changed. The `Blinking` feature was created to deal with scenarios like this. See the `Blinking's typedef` section for more details on this feature.

```live
<style>
	atlas-blotter {
		height: 208px;
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>

<script>
	var conditionalColoringExt = new tr.ConditionalColoringExtension();
	
	var charA = ("A").charCodeAt(0);
	var charZ = ("Z").charCodeAt(0);
	
	var DataGenerator = tr.DataGenerator;
	var randBetween = DataGenerator.randBetween;
	DataGenerator.addFieldInfo("num1", { type: "number", min: -10, max: 11 });
	DataGenerator.addFieldInfo("num2", { type: "number", min: -1, max: 11 });
	DataGenerator.addFieldInfo("num3", { type: "number", min: -10, max: 3 });
	DataGenerator.addFieldInfo("num4", { type: "number", min: -1, max: 3 });
	DataGenerator.addFieldInfo("num5", { type: "number", min: -5000, max: 5001 });
	DataGenerator.addFieldInfo("char", function() {
		return randBetween(charA, charZ);
	});

	var fields = ["num1", "num2", "num3", "num4", "num5", "char"];
	var records = DataGenerator.generateRecords(fields, 15);

	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{ 
				title: "Blink with Theme Color",
				field: "num1",
				blinking: true 
			},
			{
				title: "Blink on Top of Condtional Coloring",
				field: "num2",
				blinking: true,
				conditions: [{
					backgroundColor: "green",
					color: "white",
					expression: "[num2] > 0"
				}, {
					backgroundColor: "red",
					color: "white",
					expression: "[num2] < 0"
				}]
			},
			{
				title: "Blinking Border",
				field: "num3",
				blinking: {
					border: true
				},
				conditions: [{
					backgroundColor: "",
					color: "green",
					expression: "[num3] > 0"
				}, {
					backgroundColor: "",
					color: "red",
					expression: "[num3] < 0"
				}, {
					backgroundColor: "",
					color: "blue",
					expression: "[num3] == 0"
				}]
			},
			{
				title: "Custom Blinking Color",
				field: "num4",
				blinking: {
					up: "#aaDD88",
					down: "#ff33cc",
					level: "#111111"
				},
				conditions: [{
					backgroundColor: "lightskyblue",
					color: "",
					expression: "[num4] >= -3 && [num4] <= 3"
				}]
			},
			{
				title: "Blinking Border with Custom Color",
				field: "num5",
				blinking: {
					border: true,
					up: "blue",
					down: "#ffff00"
				},
				conditions: [{
					backgroundColor: "salmon",
					color: "white",
					expression: "[num2] > 0"
				}]
			},
			{
				title: "Blink Only Specific States",
				field: "char",
				binding: function(e) {
					e.cell.setContent(String.fromCharCode(e.data));
				},
				blinking: {
					down: "#EE00EE"
				},
				colorText: "num3" // Color the text based on another field
			}
		],
		staticDataRows: records,
		extensions: [
			conditionalColoringExt
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;

	setInterval(function() { // Slow Update for testing
		var record = DataGenerator.generateRecord(fields);
		grid.api.setRowData(0, record);
	}, 2000);

	setInterval(function() { // Fast Updates
		var record = DataGenerator.generateRecord(fields);

		// remove some fields randomly
		for(var key in record) {
			if(randBetween(0, 10) > 3) {
				delete record[key];
			}
		}

		var rowCount = grid.api.getRowCount();
		var at = randBetween(1, rowCount);
		grid.api.setRowData(at, record);
	}, 200);

</script>
```

### Updating the movement color theme

Call the ```reloadThemeColor``` function to update the theme color after the movement color theme has changed.


<div></div>

<div id="elf-api-container"><h2 style="margin-bottom:5px" id="api-refs">API Reference</h2><div id="main-template" class="elf-template">    <section><article>                                                                        <h3 class="subsection-title">Type Definitions</h3>                        <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Blinking">Blinking</h4><div class="description">    Available options describing `blinking` object. Additionally if specify blinking as string of field, blinking will base on the field. <br>If specified true, field from column definition will be used.</div>    <h5>Type:</h5>    <span class="param-type">string</span> | <span class="param-type">boolean</span> | <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>border</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">If enabled, border will be blinked instead of background</td>        </tr>            <tr>                            <td class="name"><code>field</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">If not specified, field from column definition will be used</td>        </tr>            <tr>                            <td class="name"><code>up</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">CSS color (e.g. #00ff00, green)</td>        </tr>            <tr>                            <td class="name"><code>down</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">CSS color (e.g. #ff0000, red)</td>        </tr>            <tr>                            <td class="name"><code>level</code></td>                        <td class="type">                            <span class="param-type">string</span> | <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">CSS color (e.g. #33333, grey). If false value is specified, blinking for level color is disabled.</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~ColumnOptions">ColumnOptions</h4><div class="description">    Extension column options that can be specified on each individual grid's column option:</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>conditions</code></td>                        <td class="type">                            <span class="param-type">Array.&lt;<a href="ConditionalColoringPlugin.html#~Condition">ConditionalColoringPlugin~Condition</a>&gt;</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">List of condition options</td>        </tr>            <tr>                            <td class="name"><code>colorText</code></td>                        <td class="type">                            <span class="param-type">string</span> | <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">A shorthand for specifying default condition based on the field.</td>        </tr>            <tr>                            <td class="name"><code>tickColor</code></td>                        <td class="type">                            <span class="param-type">string</span> | <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Alias of colorText.</td>        </tr>            <tr>                            <td class="name"><code>blinking</code></td>                        <td class="type">                            <span class="param-type"><a href="ConditionalColoringPlugin.html#~Blinking">ConditionalColoringPlugin~Blinking</a></span> | <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Blink Options. If specified, the cell will be blinked on data change.</td>        </tr>            <tr>                            <td class="name"><code>field</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last"></td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Condition">Condition</h4><div class="description">    Available options describing `condition` object</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>expression</code></td>                        <td class="type">                            <span class="param-type">string</span> | <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Expression could be `[FIELD_1] &gt; 0`</td>        </tr>            <tr>                            <td class="name"><code>backgroundColor</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    ""                                </td>                        <td class="description last">CSS color (e.g. #ffffff, black)</td>        </tr>            <tr>                            <td class="name"><code>color</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">CSS="" color (e.g. #000000, white)</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <h3 class="subsection-title">Methods</h3>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id=".cleanUpPrevRows"><span class="type-signature"></span>cleanUpPrevRows<span class="signature">()</span><span class="type-signature"></span></h4>                                            <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id=".setThemeColors"><span class="type-signature"></span>setThemeColors<span class="signature">(colors)</span><span class="type-signature"></span></h4>                            <div class="description">        Deprecated:: Should use reloadThemeColors instead    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colors</div>                        <div class="type">                            <span class="param-type">Object.&lt;string, string&gt;</span>                        </div>                                                    <div class="description">                    Name/Value pair object                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="applyColor"><span class="type-signature"></span>applyColor<span class="signature">(colIndex, cell, rowData<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                            <div class="description">        Apply color to a cell base on input column index    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    Coloring condition from this column index will be used                </div>                    </div>                <div class="param">                            <div class="name">cell</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    Target grid cell to apply color to                </div>                    </div>                <div class="param">                            <div class="name">rowData</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    A row data which will be used to determine a color together with a colIndex                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="beforeProcessOption"><span class="type-signature"></span>beforeProcessOption<span class="signature">(optionName, optionVal)</span><span class="type-signature"> → {*}</span></h4>                            <div class="description">        Remove redundant built-in feature    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">optionName</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>                <div class="param">                            <div class="name">optionVal</div>                        <div class="type">                            <span class="param-type">*</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">*</span>    </div><div class="sub-content-desc">    The transformed value of the option</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="blinkRow"><span class="type-signature"></span>blinkRow<span class="signature">(rowIndex, blinkSignal, host<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">blinkSignal</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    core grid object                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="config"><span class="type-signature"></span>config<span class="signature">(options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getColumnColoring"><span class="type-signature"></span>getColumnColoring<span class="signature">(colIndex, out_obj<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Object}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">out_obj</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getColumnPainter"><span class="type-signature"></span>getColumnPainter<span class="signature">(colIndex)</span><span class="type-signature"> → {CellPainter}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">CellPainter</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getConfigObject"><span class="type-signature"></span>getConfigObject<span class="signature">(gridOptions<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Object}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">gridOptions</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getName"><span class="type-signature"></span>getName<span class="signature">()</span><span class="type-signature"> → {string}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hasMultiTableSupport"><span class="type-signature"></span>hasMultiTableSupport<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Plugin that has multi-table support means that it can have multiple hosts/tables and share its states across those hosts/tables.    </div>                        <div class="details">                    <dt class="tag-overrides">Overrides:</dt>    <dd class="tag-overrides">        <a href="GridPlugin.html#hasMultiTableSupport">GridPlugin#hasMultiTableSupport</a>    </dd>                                                </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="initialize"><span class="type-signature"></span>initialize<span class="signature">(host, options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    core grid object                </div>                    </div>                <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="reloadThemeColors"><span class="type-signature"></span>reloadThemeColors<span class="signature">()</span><span class="type-signature"> → {Promise.&lt;Object&gt;}</span></h4>                            <div class="description">        Reload theme colors and change colors for all instances of CellPainter, Should call after MovementColor changed.    </div>                        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Promise.&lt;Object&gt;</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setColumnBlinking"><span class="type-signature"></span>setColumnBlinking<span class="signature">(colIndex, blinkingOptions<span class="signature-attributes">opt</span>, field<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">blinkingOptions</div>                        <div class="type">                            <span class="param-type"><a href="ConditionalColoringPlugin.html#~Blinking">ConditionalColoringPlugin~Blinking</a></span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>                <div class="param">                            <div class="name">field</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    If not specified, column field will be used                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setColumnColoring"><span class="type-signature"></span>setColumnColoring<span class="signature">(colIndex, columnOptions)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>                <div class="param">                            <div class="name">columnOptions</div>                        <div class="type">                            <span class="param-type"><a href="ConditionalColoringPlugin.html#~ColumnOptions">ConditionalColoringPlugin~ColumnOptions</a></span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                            <h5>Example:</h5>            <pre><code>var colDef = {
  "conditions": [{ // Array.&lt;Object&gt; Condition Object Properties
    "expression": "[column0] &gt; 0", // string
    "backgroundColor": "", // Optional string e.g. #ffffff, black
    "color": "" // Optional string e.g. #000000, white
  }]
};
var colDef2 = {
  "field": "string",
  "colorText": true // string as Field or boolean for text coloring mode
};</code></pre>    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="unload"><span class="type-signature"></span>unload<span class="signature">(host)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    core grid object                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                </article></section></div></div>