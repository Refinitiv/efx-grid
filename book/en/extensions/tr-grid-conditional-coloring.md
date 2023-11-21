<link rel="stylesheet" href="../resources/styles/elf-template.css">

## Conditional Coloring

The Conditional Coloring Extension provides a conditional coloring for a column's field, which will be triggered when a condition is met. Use `conditions` property to define how styles will be applied to a cell by what condition. The following code snippet shows how `conditions` might be defined:

```js
var conditions = [ // For example, fill green when the value is more than zero. 
	{ // If a field value is greater than 0, set text color to green
		expression: ["GT", 0], 
		color: "green"
	},
	{ // If a field value is less than 0, set cell background color to red
		expression: ["LT", 0], 
		backgroundColor: "red"
	},
	{ // If a field value contains "inc" text, set the given CSS to the cell 
		expression: ["CONT", "inc"], 
		cssClass: "predefinedColors"
	}
];
```

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
				name: "Value > 0",
				field: "c1",
				conditions: [{
					backgroundColor: "green",
					color: "white",
					expression: "[c1] > 0"
				}]
			},
			{
				name: "Multiple Conditions",
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
				name: "Range between -3 and 3",
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
	
	var randBetween = tr.DataGenerator.randBetween;
	
	tr.DataGenerator.addFieldInfo("num1", { type: "number", min: -10, max: 11 });
	tr.DataGenerator.addFieldInfo("num2", { type: "number", min: -1, max: 11 });
	tr.DataGenerator.addFieldInfo("num3", { type: "number", min: -10, max: 3 });
	tr.DataGenerator.addFieldInfo("num4", { type: "number", min: -1, max: 3 });
	tr.DataGenerator.addFieldInfo("num5", { type: "number", min: -5000, max: 5001 });
	tr.DataGenerator.addFieldInfo("char", function() {
		return randBetween(charA, charZ);
	});

	var fields = ["num1", "num2", "num3", "num4", "num5", "char"];
	var records = tr.DataGenerator.generateRecords(fields, 15);

	var configObj = {
		sorting: {
			sortableColumns: true
		},
		columns: [
			{ 
				name: "Blink with Theme Color",
				field: "num1",
				blinking: true 
			},
			{
				name: "Blink on Top of Condtional Coloring",
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
				name: "Blinking Border",
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
				name: "Custom Blinking Color",
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
				name: "Blinking Border with Custom Color",
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
				name: "Blink Only Specific States",
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
		var record = tr.DataGenerator.generateRecord(fields);
		grid.api.setRowData(0, record);
	}, 2000);

	setInterval(function() { // Fast Updates
		var record = tr.DataGenerator.generateRecord(fields);

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

### Predefined color mode

The extension also allows you select text and background colors from a set of predefined colors. To do so, add a preset color object to the `predefinedColors` property and then set the condition object's `cssClass` properties to the color name rather than the background and color value.

```live
<style>
	atlas-blotter {
		height: 169px;
	}
	fieldset {
		margin:  10px 0;
		line-height: 16px;
	}
	fieldset * {
		vertical-align: middle;
	}
	label {
		vertical-align: middle;
		text-align: center;
		margin-right: 5px;
		height: 20px;
		width: 50px;
		display: inline-block;
		line-height: 20px;
		margin-left: 5px;
	}
</style>

<fieldset><legend>Apply color</legend>
	<div class="">
		<button id="set_color_1_btn">Set #1</button>
		<label style="background-color: #FF2848;"> > 40 </label>
		<label style="background-color: #FFB27B;"> > 0 </label>
		<label style="background-color: #EEF3B4;"> < 0 </label>
	</div>
	<div class="">
		<button id="set_color_2_btn">Set #2</button>
		<label style="background-color: #64864A; color: #FFFFFF;"> > 40 </label>
		<label style="background-color: #F56093;"> > 0 </label>
		<label style="background-color: #FFCCCD;"> < 0 </label>
	</div>
</fieldset>
<hr>
<atlas-blotter id="grid"></atlas-blotter>

<script>
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
			color: "#FFFFFF",
			backgroundColor: "#64864A"
		},
		"color-2": {
			backgroundColor: "#F56093"
		},
		"color-3": {
			backgroundColor: "#FFCCCD"
		}
	};

	var conditions = [{
		expression: "[CF_NETCHNG] > 40",
		cssClass: "color-1"
	},{
		expression: "[CF_NETCHNG] > 0",
		cssClass: "color-2"
	}, {
		expression: "[CF_NETCHNG] < 0",
		cssClass: "color-3"
	}];

	var conditionalColoringExt = new tr.ConditionalColoringExtension();
	
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry", "id"];
	var records = tr.DataGenerator.generateRecords(fields, { seed: 10, numRows: 10 });
	var configObj = {
		columns: [
			{
				name: "Company",
				field: fields[0]
			},
			{
				name: "Market",
				field: fields[1],
				width: 120
			},
			{
				name: "Last",
				field: fields[2],
				width: 100
			},
			{
				name: "Net. Chng",
				field: fields[3],
				width: 100,
				blinking: true,
				conditions: conditions
			},
			{
				name: "Industry",
				field: fields[4]
			}
		],
		staticDataRows: records,
		conditionalColoring: {
			predefinedColors: predefinedColorsSet1
		},
		extensions: [
			conditionalColoringExt
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
	
	document.getElementById("set_color_1_btn").addEventListener("click" , function(e) {
		conditionalColoringExt.setPredefinedColors(predefinedColorsSet1);
	});

	document.getElementById("set_color_2_btn").addEventListener("click" , function(e) {
		conditionalColoringExt.setPredefinedColors(predefinedColorsSet2);
	});
</script>
```

### Defining coloring condition as an array expression

The expression can take form of an Array or two dimentional Array for defining multiple conditions. However, the array has to be in specific format for extension to parse it. The array must contains two or three items. The first item is operator id. The second item is a operand value. The third item is a connector which can be either "AND" or "OR" connector. The connector is optional, if there is only one coloring condition.

This array form is useful for constructing a complex condition as there can be unlimited number of conditions in a single expression. It can also be serialized as a text which is good for saving and restoring. 

The following operator ids are supported in the array format:

- "EQ" - Equal to
- "NEQ" - Not equal to
- "NUMEQ" - Number equal to
- "NUMNEQ" - Number not equal to
- "GT" - Greater than
- "GTE" - Greater than or equal to
- "LT" - Less than
- "LTE" - Less than or equal to
- "BEGIN" - Begin with
- "NBEGIN" - Not begin with
- "END" - End with
- "NEND" - Not end with
- "CONT" - Contain
- "NCONT" - Not contain
- "EQ_BLANK" - Equal to blank value
- "EQ_NBLANK" - Equal to non blank value
- "DT" - Date is
- "DTA" - Date is after
- "DTB" - Date is before

The following array expressions can be parsed by the extension:

```js
var expression1 = ["GT", 10];

// The below condition will be satisfied when a value is greater than or equal to 10 and less than or equal to 20
var expression2 = [ 
	["GTE", 10, "AND"],
	["LTE", 20]
];
```


### Defining coloring condition as a text expression

Since there are security risks associate with parsing text into a JavaScript function, Conditional Coloring Extension supports parsing a text expression with only simple arithematic and logical operators. The following operators are supported by the extension:

- `+`
- `-`
- `*`
- `/`
- `%`
- `<`
- `>`
- `<=`
- `>=`
- `==`
- `!=`
- `&&`
- `||`
- `!`

The following text expressions can be parsed by the extension:

```js
"[field 1] >= 0 && [field 1] <= 1"
"([field 1] + [field 2]) / 2 >= 0"
"[field 1] == 'text'"
"![field 1]" // The value can be used as the condition
```

Native JavaScript functions or non number or string values can not be parsed by the extension. The following text expressions are considered invalid:

```js
"Number([field 1]) > 0" // Native JavaScript class cannot be parsed
'[field 1].indexOf("text") >= 0' // Native JavaScript method cannot be parsed
"[field 1] === undefined" // undefined, null, true, and false values are not supported
"[field 1] + ()" // insufficient parameter
```

### Defining coloring condition as a function (complex expression)

Since text expression support is very limited, the extension allows the expression to be defined by a function. The expression function takes one parameter which is row data object, and should return boolean value. The code snippet below shows how to define expression in a function form:

```js
var invalidExpression = "[field1] != null"; // This kind of expression is not supported

var validExpression = function(rowData) {
	return rowData["field1"] != null;
};
```

### Updating the movement color theme

Call the ```reloadThemeColor``` function to update the theme color after the movement color theme has changed.


<div></div>

<h2 style="margin-bottom:5px" id="api-refs">API Reference</h2>
<div id="elf-api-container"><div id="main-template" class="elf-template">    <section><article>                                                                        <h3 class="subsection-title">Type Definitions</h3>                        <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Blinking">Blinking</h4><div class="description">    Available options describing `blinking` object. Additionally if specify blinking as string of field, blinking will base on the field. <br>If specified true, field from column definition will be used.</div>    <h5>Type:</h5>    <span class="param-type">string</span> | <span class="param-type">boolean</span> | <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>border</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">If enabled, border will be blinked instead of background</td>        </tr>            <tr>                            <td class="name"><code>field</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">If not specified, field from column definition will be used</td>        </tr>            <tr>                            <td class="name"><code>up</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">CSS color (e.g. #00ff00, green)</td>        </tr>            <tr>                            <td class="name"><code>down</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">CSS color (e.g. #ff0000, red)</td>        </tr>            <tr>                            <td class="name"><code>level</code></td>                        <td class="type">                            <span class="param-type">string</span> | <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">CSS color (e.g. #33333, grey). If false value is specified, blinking for level color is disabled.</td>        </tr>            <tr>                            <td class="name"><code>duration</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">If specified, this will override blinking duration from extension option. Blinking duration in milliseconds</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~ColorText">ColorText</h4><div class="description">    Available options describing `colorText` object. Additionally if specify colorText as string of field, colorText will base on the field. <br>If specified true, field from column definition will be used.</div>    <h5>Type:</h5>    <span class="param-type">string</span> | <span class="param-type">boolean</span> | <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>field</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">If not specified, field from column definition will be used</td>        </tr>            <tr>                            <td class="name"><code>upClass</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">CSS class name.</td>        </tr>            <tr>                            <td class="name"><code>downClass</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">CSS class name.</td>        </tr>            <tr>                            <td class="name"><code>levelClass</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">CSS class name.</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~ColumnOptions">ColumnOptions</h4><div class="description">    Extension column options that can be specified on each Grid column configuration object</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>conditions</code></td>                        <td class="type">                            <span class="param-type">Array.&lt;<a href="#~Condition">ConditionalColoringPlugin~Condition</a>&gt;</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">List of condition options</td>        </tr>            <tr>                            <td class="name"><code>colorText</code></td>                        <td class="type">                            <span class="param-type">string</span> | <span class="param-type">boolean</span> | <span class="param-type"><a href="#~ColorText">ConditionalColoringPlugin~ColorText</a></span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">A shorthand for specifying default condition based on the field.</td>        </tr>            <tr>                            <td class="name"><code>tickColor</code></td>                        <td class="type">                            <span class="param-type">string</span> | <span class="param-type">boolean</span> | <span class="param-type"><a href="#~ColorText">ConditionalColoringPlugin~ColorText</a></span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Alias of colorText.</td>        </tr>            <tr>                            <td class="name"><code>blinking</code></td>                        <td class="type">                            <span class="param-type">string</span> | <span class="param-type">boolean</span> | <span class="param-type"><a href="#~Blinking">ConditionalColoringPlugin~Blinking</a></span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Blink Options. If specified, the cell will be blinked on data change.</td>        </tr>            <tr>                            <td class="name"><code>field</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Field for Grid column configuration object</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Condition">Condition</h4><div class="description">    Properties defining colors and conditioning</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>expression</code></td>                        <td class="type">                            <span class="param-type">string</span> | <span class="param-type">function</span> | <span class="param-type">Array</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">The expression can be in the following forms: text, function, and 2 dimentional array</td>        </tr>            <tr>                            <td class="name"><code>backgroundColor</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    ""                                </td>                        <td class="description last">CSS color (e.g. #ffffff, black)</td>        </tr>            <tr>                            <td class="name"><code>color</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">CSS="" color (e.g. #000000, white)</td>        </tr>            <tr>                            <td class="name"><code>cssClass</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">cssClass="" Predefined color class name</td>        </tr>            <tr>                            <td class="name"><code>field</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Field to be used for this specific condition, overriding the field defined in ConditionalColoringOptions</td>        </tr>        </tbody></table></div><div class="details">                                                            </div>    <h5>Example:</h5>        <pre><code>let conditions1 = [ // Add cssClass for any value that is greater than or equal to 10, and less than or equal to 20
  {expression: [["GTE", 10, "AND"], ["LTE", 20]], cssClass: "predefinedColors"}
];
let conditions2 = [ // Add background color for any fieldA value that is not blank value (e.g., null, undefined, 0, false, empty string)
  {
    expression: function(rowData) {
      return rowData["fieldA"] ? true : false;
    },
    backgroundColor: "blue",
    field: "fieldA"
  }
];
let conditions3 = [ // Add text color for any fieldA value that is not equal to 10
  {expression: "[fieldA] != 10", color: "red"}
];</code></pre></div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~ConditionalColoringOptions">ConditionalColoringOptions</h4><div class="description">    Available options for changing conditional coloring at runtime</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>conditions</code></td>                        <td class="type">                            <span class="param-type">Array.&lt;<a href="#~Condition">ConditionalColoringPlugin~Condition</a>&gt;</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">List of condition options</td>        </tr>            <tr>                            <td class="name"><code>colorText</code></td>                        <td class="type">                            <span class="param-type">string</span> | <span class="param-type">boolean</span> | <span class="param-type"><a href="#~ColorText">ConditionalColoringPlugin~ColorText</a></span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">A shorthand for specifying default condition based on the field.</td>        </tr>            <tr>                            <td class="name"><code>tickColor</code></td>                        <td class="type">                            <span class="param-type">string</span> | <span class="param-type">boolean</span> | <span class="param-type"><a href="#~ColorText">ConditionalColoringPlugin~ColorText</a></span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Alias of colorText</td>        </tr>            <tr>                            <td class="name"><code>field</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Field to be used for all conditions, overriding the field defined in ColumnOptions</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Options">Options</h4><div class="description">    The options can be specified by `conditionalColoring` property of the main grid's options</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>predefinedColors</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Predefined color object map for conditional coloring</td>        </tr>            <tr>                            <td class="name"><code>blinkingDuration</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    250                                </td>                        <td class="description last">Blinking duration in milliseconds</td>        </tr>            <tr>                            <td class="name"><code>insertionBlinking</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">Blinking when a row is added to a grid</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <h3 class="subsection-title">Methods</h3>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id=".cleanUpPrevRows"><span class="type-signature"></span>cleanUpPrevRows<span class="signature">()</span><span class="type-signature"></span></h4>                                            <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id=".setThemeColors"><span class="type-signature"></span>setThemeColors<span class="signature">(colors)</span><span class="type-signature"></span></h4>                            <div class="description">        Deprecated:: Should use reloadThemeColors instead    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colors</div>                        <div class="type">                            <span class="param-type">Object.&lt;string, string&gt;</span>                        </div>                                                    <div class="description">                    Name/Value pair object                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="applyColor"><span class="type-signature"></span>applyColor<span class="signature">(colIndex, cell, rowData<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                            <div class="description">        Apply color to a cell base on input column index    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    Coloring condition from this column index will be used                </div>                    </div>                <div class="param">                            <div class="name">cell</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    Target grid cell to apply color to                </div>                    </div>                <div class="param">                            <div class="name">rowData</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    A row data which will be used to determine a color together with a colIndex                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="beforeProcessOption"><span class="type-signature"></span>beforeProcessOption<span class="signature">(optionName, optionVal)</span><span class="type-signature"> → {*}</span></h4>                            <div class="description">        Remove redundant built-in feature    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">optionName</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>                <div class="param">                            <div class="name">optionVal</div>                        <div class="type">                            <span class="param-type">*</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">*</span>    </div><div class="sub-content-desc">    The transformed value of the option</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="blinkRow"><span class="type-signature"></span>blinkRow<span class="signature">(rowIndex, blinkSignal, host<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">blinkSignal</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    core grid object                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="config"><span class="type-signature"></span>config<span class="signature">(options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getColumnColoring"><span class="type-signature"></span>getColumnColoring<span class="signature">(colIndex, options<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {<a href="#~ColumnOptions">ConditionalColoringPlugin~ColumnOptions</a>}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type"><a href="#~ColumnOptions">ConditionalColoringPlugin~ColumnOptions</a></span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getColumnPainter"><span class="type-signature"></span>getColumnPainter<span class="signature">(colIndex)</span><span class="type-signature"> → {CellPainter}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">CellPainter</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getConfigObject"><span class="type-signature"></span>getConfigObject<span class="signature">(gridOptions<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Object}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">gridOptions</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getName"><span class="type-signature"></span>getName<span class="signature">()</span><span class="type-signature"> → {string}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hasMultiTableSupport"><span class="type-signature"></span>hasMultiTableSupport<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Plugin that has multi-table support means that it can have multiple hosts/tables and share its states across those hosts/tables.    </div>                        <div class="details">                    <dt class="tag-overrides">Overrides:</dt>    <dd class="tag-overrides">        <a href="">GridPlugin#hasMultiTableSupport</a>    </dd>                                                </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="initialize"><span class="type-signature"></span>initialize<span class="signature">(host, options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    core grid object                </div>                    </div>                <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="reloadThemeColors"><span class="type-signature"></span>reloadThemeColors<span class="signature">()</span><span class="type-signature"> → {Promise.&lt;Object&gt;}</span></h4>                            <div class="description">        Reload theme colors and change colors for all instances of CellPainter.Should call after the overwriting css variables for MovementColor without changing movement-color-profile attribute.    </div>                        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Promise.&lt;Object&gt;</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setColumnBlinking"><span class="type-signature"></span>setColumnBlinking<span class="signature">(colIndex, blinkingOptions<span class="signature-attributes">opt</span>, field<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">blinkingOptions</div>                        <div class="type">                            <span class="param-type">boolean</span> | <span class="param-type"><a href="#~Blinking">ConditionalColoringPlugin~Blinking</a></span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>                <div class="param">                            <div class="name">field</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    If not specified, column field will be used                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setColumnColoring"><span class="type-signature"></span>setColumnColoring<span class="signature">(colIndex, columnOptions<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                            <div class="description">        To define coloring for columns, conditions or colorText or tickColor need to be specified.  To enable cell blinking the blinking option need to be defined.<br>  Coloring options and blinking options can be applied to a column at the same time.<br>  The blinking or coloring abilities will be removed if the correspondent options are not given.<br>  If columnOptions is undefined or null, both coloring and blinking will be removed.    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">columnOptions</div>                        <div class="type">                            <span class="param-type"><a href="#~ColumnOptions">ConditionalColoringPlugin~ColumnOptions</a></span> | <span class="param-type">null</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            <dt class="tag-see">See:</dt>    <dd class="tag-see">        <ul>            <li>ConditionalColoringPlugin.setConditionalColoring</li>                    <li>ConditionalColoringPlugin.setColumnBlinking</li>        </ul>    </dd>        </div>                                            <h5>Example:</h5>            <pre><code>let columnOptions1 = {
  "field": "string",
  "conditions": [{ // Array.&lt;Object&gt; Condition Object Properties
    "expression": "[column0] &gt; 0", // string
    "backgroundColor": "", // Optional string e.g. #ffffff, black
    "color": "" // Optional string e.g. #000000, white
  }]
};
let columnOptions2 = {
  "field": "string",
  "colorText": true, // string as Field or boolean for text coloring mode
  "blinking": true
};</code></pre>    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setConditionalColoring"><span class="type-signature"></span>setConditionalColoring<span class="signature">(colIndex, coloringOptions<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">coloringOptions</div>                        <div class="type">                            <span class="param-type"><a href="#~ConditionalColoringOptions">ConditionalColoringPlugin~ConditionalColoringOptions</a></span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setInsertionBlinking"><span class="type-signature"></span>setInsertionBlinking<span class="signature">(blinking)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">blinking</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                                                    <div class="description">                    enable blinking on row insertion                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setPredefinedColors"><span class="type-signature"></span>setPredefinedColors<span class="signature">(predefinedColors)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">predefinedColors</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    Predefined color object map                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="unload"><span class="type-signature"></span>unload<span class="signature">(host)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    core grid object                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                </article></section></div></div>