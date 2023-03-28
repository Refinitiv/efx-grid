<link rel="stylesheet" href="../resources/styles/elf-template.css">

## Range Bar

The Range Bar Extension provides graphical bar for last value ranking visualization based on low and high value.

### Installation and how to import to a project

Installation examples and details of how to import the extension to a project are available on the [Overview](README.md) page.

### Additional dependencies

Details of additional dependencies for this extension are available on the [Overview](README.md) page.

```live
<style>
	atlas-blotter {
		height: 208px;
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>

<script>

	var fields = ["id", "CFLOW", "CF_LAST", "CFHIGH", "percent"];
	var records = [];

	var rangeBarExt = new tr.RangeBarExtension();

	var id = 0;
	for (let i = -150; i < 151; i += 10) {
		records.push({
			id: id++,
			CFLOW: -100,
			CF_LAST: i,
			CFHIGH: 100,
			percent: i
		});
	}

	// N/A Case and without top value
	records.push({
		id: records.length,
		CFLOW: undefined,
		CF_LAST: undefined,
		CFHIGH: undefined,
		percent: undefined
	});

	records.push({
		id: records.length,
		CFLOW: 1,
		CF_LAST: undefined, // without middle value
		CFHIGH: 50,
		percent: undefined
	});

	records.push({
		id: records.length,
		CFLOW: undefined,
		CF_LAST: 5,
		CFHIGH: 50,
		percent: 5
	});

	records.push({
		id: records.length,
		CFLOW: 3,
		CF_LAST: 5,
		CFHIGH: undefined,
		percent: 5
	});

	records.push({
		id: records.length,
		CFLOW: undefined,
		CF_LAST: 5,
		CFHIGH: undefined,
		percent: 5
	});

	// Low_value <High_value
	records.push({
		id: records.length,
		CFLOW: 1,
		CF_LAST: 50,
		CFHIGH: 99,
		percent: 50
	});

	records.push({
		id: records.length,
		CFLOW: 50,
		CF_LAST: 1,
		CFHIGH: 99,
		percent: 1
	});

	records.push({
		id: records.length,
		CFLOW: 1,
		CF_LAST: 99,
		CFHIGH: 50,
		percent: 99
	});

	// High<Low
	records.push({
		id: records.length,
		CFLOW: 99,
		CF_LAST: 50,
		CFHIGH: 1,
		percent: 50
	});

	records.push({
		id: records.length,
		CFLOW: 99,
		CF_LAST: 1,
		CFHIGH: 50,
		percent: 1
	});

	records.push({
		id: records.length,
		CFLOW: 50,
		CF_LAST: 99,
		CFHIGH: 1,
		percent: 99
	});

	// Two equal
	records.push({
		id: records.length,
		CFLOW: 1,
		CF_LAST: 50,
		CFHIGH: 1,
		percent: 50
	});

	records.push({
		id: records.length,
		CFLOW: 50,
		CF_LAST: 1,
		CFHIGH: 50,
		percent: 1
	});

	records.push({
		id: records.length,
		CFLOW: 1,
		CF_LAST: 1,
		CFHIGH: 50,
		percent: 1
	});

	records.push({
		id: records.length,
		CFLOW: 50,
		CF_LAST: 50,
		CFHIGH: 1,
		percent: 50
	});

	records.push({
		id: records.length,
		CFLOW: 50,
		CF_LAST: 1,
		CFHIGH: 1,
		percent: 1
	});

	records.push({
		id: records.length,
		CFLOW: 1,
		CF_LAST: 50,
		CFHIGH: 50,
		percent: 50
	});

	// Three equal 
	records.push({
		id: records.length,
		CFLOW: 1,
		CF_LAST: 1,
		CFHIGH: 1,
		percent: 1
	});

	var configObj = {
		scrollbar: true,
		columns: [{
			title: "ID",
			field: fields[0],
			width: 60
		},
		{
			title: "Low",
			field: fields[1],
			width: 60
		},
		{
			title: "Last",
			field: fields[2],
			width: 60
		},
		{
			title: "High",
			field: fields[3],
			width: 60
		},
		{
			title: "Range (Low, Last, High)",
			field: fields[2],
			alignment: "c",
			rangeBar: {
			low: "CFLOW",
			high: "CFHIGH",
			last: "CF_LAST"
			}
		},
		{
			title: "Percent",
			field: fields[4],
			width: 60
		},
		{
			title: "Percent (Without low, last, high)",
			field: fields[4],
			rangeBar: {
				field: fields[4]
			}
		},
		{
			title: "Percent (start 30, end 70)",
			field: fields[4],
			rangeBar: {
			field: fields[4],
			start: 30, // default 0
			end: 70 // default 100
			}
		}],
		staticDataRows: records,
		extensions: [ rangeBarExt ]
	};

	var grid = window.grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### With Custom Tooltip
If you want to use a customized tooltip for the range bar, you can use it with `disabled` the rangeBar default tooltip with option and adding a tooltip condition. 
For adding condition of tooltip you can import `addConditionTooltip` from the tooltip dependency and use it with pass `condition` and `renderer` function, following in the example below.

```live
<style>
	atlas-blotter {
		height: 208px;
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>

<script>

	var fields = ["id", "CFLOW", "CF_LAST", "CFHIGH", "percent"];
	var records = [];

	var rangeBarExt = new tr.RangeBarExtension();

	var id = 0;
	for (let i = -150; i < 151; i += 10) {
		records.push({
			id: id++,
			CFLOW: -100,
			CF_LAST: i,
			CFHIGH: 100,
			percent: i
		});
	}

	// N/A Case and without top value
	records.push({
		id: records.length,
		CFLOW: undefined,
		CF_LAST: undefined,
		CFHIGH: undefined,
		percent: undefined
	});

	records.push({
		id: records.length,
		CFLOW: 1,
		CF_LAST: undefined, // without middle value
		CFHIGH: 50,
		percent: undefined
	});

	records.push({
		id: records.length,
		CFLOW: undefined,
		CF_LAST: 5,
		CFHIGH: 50,
		percent: 5
	});

	records.push({
		id: records.length,
		CFLOW: 3,
		CF_LAST: 5,
		CFHIGH: undefined,
		percent: 5
	});

	records.push({
		id: records.length,
		CFLOW: undefined,
		CF_LAST: 5,
		CFHIGH: undefined,
		percent: 5
	});

	// Low_value <High_value
	records.push({
		id: records.length,
		CFLOW: 1,
		CF_LAST: 50,
		CFHIGH: 99,
		percent: 50
	});

	records.push({
		id: records.length,
		CFLOW: 50,
		CF_LAST: 1,
		CFHIGH: 99,
		percent: 1
	});

	records.push({
		id: records.length,
		CFLOW: 1,
		CF_LAST: 99,
		CFHIGH: 50,
		percent: 99
	});

	// High<Low
	records.push({
		id: records.length,
		CFLOW: 99,
		CF_LAST: 50,
		CFHIGH: 1,
		percent: 50
	});

	records.push({
		id: records.length,
		CFLOW: 99,
		CF_LAST: 1,
		CFHIGH: 50,
		percent: 1
	});

	records.push({
		id: records.length,
		CFLOW: 50,
		CF_LAST: 99,
		CFHIGH: 1,
		percent: 99
	});

	// Two equal
	records.push({
		id: records.length,
		CFLOW: 1,
		CF_LAST: 50,
		CFHIGH: 1,
		percent: 50
	});

	records.push({
		id: records.length,
		CFLOW: 50,
		CF_LAST: 1,
		CFHIGH: 50,
		percent: 1
	});

	records.push({
		id: records.length,
		CFLOW: 1,
		CF_LAST: 1,
		CFHIGH: 50,
		percent: 1
	});

	records.push({
		id: records.length,
		CFLOW: 50,
		CF_LAST: 50,
		CFHIGH: 1,
		percent: 50
	});

	records.push({
		id: records.length,
		CFLOW: 50,
		CF_LAST: 1,
		CFHIGH: 1,
		percent: 1
	});

	records.push({
		id: records.length,
		CFLOW: 1,
		CF_LAST: 50,
		CFHIGH: 50,
		percent: 50
	});

	// Three equal 
	records.push({
		id: records.length,
		CFLOW: 1,
		CF_LAST: 1,
		CFHIGH: 1,
		percent: 1
	});

	var configObj = {
		scrollbar: true,
		columns: [{
			title: "ID",
			field: fields[0],
			width: 60
		},
		{
			title: "Low",
			field: fields[1],
			width: 60
		},
		{
			title: "Last",
			field: fields[2],
			width: 60
		},
		{
			title: "High",
			field: fields[3],
			width: 60
		},
		{
			title: "Range (Low, Last, High)",
			field: fields[2],
			alignment: "c",
			rangeBar: {
			low: "CFLOW",
			high: "CFHIGH",
			last: "CF_LAST"
			}
		},
		{
			title: "Percent",
			field: fields[4],
			width: 60
		},
		{
			title: "Percent (Without low, last, high)",
			field: fields[4],
			rangeBar: {
				field: fields[4]
			}
		},
		{
			title: "Percent (start 30, end 70)",
			field: fields[4],
			rangeBar: {
			field: fields[4],
			start: 30, // default 0
			end: 70 // default 100
			}
		}],
		staticDataRows: records,
		extensions: [ rangeBarExt ]
	};

	var grid = window.grid = document.getElementById("grid");
	grid.config = configObj;

	// Create tooltip container section, we reused element for avoid create element multiple times
	// This container will be show the user
	var LEDTooltipUI = document.createElement("div");
	LEDTooltipUI.style.textTransform = "capitalize"; // To title case
	var keys = ["low", "last", "high"];
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var elem = document.createElement("div");
		LEDTooltipUI[key] = elem;
		LEDTooltipUI.appendChild(elem);
	}
	// End tooltip container creation

	// in application side need to import addTooltipCondition from tooltip component
	// For example import { addTooltipCondition } from "@elf/coral-tooltip"; // for elf v4
	// import { addTooltipCondition } from '@refinitiv-ui/elements/tooltip'; // for elf v6
	tr.addTooltipCondition(LEDGuageTooltipCondition, LEDGuageTooltipRenderer);

	function LEDGuageTooltipCondition(target, paths) {
		var relPos = grid.api.getRelativePosition(target);
		if (!relPos.hit) {
			return false;
		}
		if (relPos.sectionType !== "content") {
			return false;
		}
		if (rangeBarExt.isRangeBarColumn(relPos.colIndex)) {
			LEDTooltipUI._relPos = relPos; // We need to cache the relative position in the container element for use when renderer in the tooltip to avoid calling getRelativePosition multiple times.
			return true;
		}
		return false;
	}

	function LEDGuageTooltipRenderer(target) {
		var relPos = LEDTooltipUI._relPos;
		var colIndex = relPos.colIndex;
		var lowLastHigh = rangeBarExt.getValue(colIndex, relPos["rowIndex"]);
		if (lowLastHigh) {
			// update value into tooltip UI
			LEDTooltipUI["low"].textContent = "Low: " + (lowLastHigh["low"] != null ? lowLastHigh["low"] : "--");
			LEDTooltipUI["last"].textContent = "Last: " + (lowLastHigh["last"] != null ? lowLastHigh["last"] : "--");
			LEDTooltipUI["high"].textContent = "High: " + (lowLastHigh["high"] != null ? lowLastHigh["high"] : "--");
		}
		// else {} // Currenlty, we don't have the rangeBar field that can't getValue, even if the N/A case getValue will be return object (with undefiend value)
		return LEDTooltipUI;
	}

</script>
```

<div></div>

<h2 style="margin-bottom:5px" id="api-refs">API Reference</h2>
<div id="elf-api-container"><div id="main-template" class="elf-template">    <section><article>                                                                        <h3 class="subsection-title">Type Definitions</h3>                        <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~ColumnOptions">ColumnOptions</h4><div class="description">    Extension column options that can be specified on each individual grid's column option:</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>rangeBar</code></td>                        <td class="type">                            <span class="param-type"><a href="#~RangeDefinition">RangeBarPlugin~RangeDefinition</a></span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Range definition object</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Options">Options</h4><div class="description">    RangeBarPlugin options that can be specified from `percentBar` property of the main grid's options</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>tooltip</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    true                                </td>                        <td class="description last">If disabled, it will be doesn't show tooltip when mouse hover sapphire-led-gauge</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~RangeDefinition">RangeDefinition</h4><div class="description">    Available options describing `rangeBar` object specified in grid's column option</div>    <h5>Type:</h5>    <span class="param-type">Object</span> | <span class="param-type">boolean</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>field</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    THIS_COLUMN                                </td>                        <td class="description last">Field used as percentage. If specified, `low`, `high`, and `last` fields will be ignored.</td>        </tr>            <tr>                            <td class="name"><code>start</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    0                                </td>                        <td class="description last">minimum value used with percentage `field`</td>        </tr>            <tr>                            <td class="name"><code>end</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    100                                </td>                        <td class="description last">maximum value used with percentage `field`</td>        </tr>            <tr>                            <td class="name"><code>low</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    ""                                </td>                        <td class="description last">Field used as minimum range</td>        </tr>            <tr>                            <td class="name"><code>high</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    ""                                </td>                        <td class="description last">Field used as maximum range</td>        </tr>            <tr>                            <td class="name"><code>last</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    ""                                </td>                        <td class="description last">Field used as current absolute value (white bar)</td>        </tr>            <tr>                            <td class="name"><code>vwap</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    ""                                </td>                        <td class="description last">Field used as volume weighted average price (VWAP)</td>        </tr>            <tr>                            <td class="name"><code>close</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    ""                                </td>                        <td class="description last">Field used as close price</td>        </tr>            <tr>                            <td class="name"><code>tick</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    ""                                </td>                        <td class="description last">Field used as tick color</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <h3 class="subsection-title">Methods</h3>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="config"><span class="type-signature"></span>config<span class="signature">(options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getColumnConfigObject"><span class="type-signature"></span>getColumnConfigObject<span class="signature">(colIndex, out_obj<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Object}</span></h4>                            <div class="description">        Get a column percent bar options from column index    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">out_obj</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getConfigObject"><span class="type-signature"></span>getConfigObject<span class="signature">(out_obj<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Object}</span></h4>                            <div class="description">        Get a current state of grid and extension config    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">out_obj</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getName"><span class="type-signature"></span>getName<span class="signature">()</span><span class="type-signature"> → {string}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getTooltipText"><span class="type-signature"></span>getTooltipText<span class="signature">(colRef, rowRef)</span><span class="type-signature"> → {string}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colRef</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                                            </div>                <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div><div class="sub-content-desc">    text tooltip of cell, otherwise empty string ""</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getValue"><span class="type-signature"></span>getValue<span class="signature">(colRef, rowRef)</span><span class="type-signature"> → {Object}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colRef</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                                            </div>                <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hasMultiTableSupport"><span class="type-signature"></span>hasMultiTableSupport<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Plugin that has multi-table support means that it can have multiple hosts/tables and share its states across those hosts/tables.    </div>                        <div class="details">                <dt class="inherited-from">Inherited From:</dt>    <dd class="inherited-from">        <a href="">GridPlugin#hasMultiTableSupport</a>    </dd>                                                    </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="initialize"><span class="type-signature"></span>initialize<span class="signature">(host, options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    core grid object                </div>                    </div>                <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="isRangeBarColumn"><span class="type-signature"></span>isRangeBarColumn<span class="signature">(colIndex)</span><span class="type-signature"> → {boolean}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="unload"><span class="type-signature"></span>unload<span class="signature">(host)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    core grid object                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                </article></section></div></div>