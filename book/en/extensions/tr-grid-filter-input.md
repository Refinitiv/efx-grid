<link rel="stylesheet" href="../resources/styles/elf-template.css">

## Filter Input

The Filter Input Extension provides a search tool for each column that supports text search and custom functions.

```live
<style>
	atlas-blotter {
		height: 200px;
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>

<script>
	tr.DataGenerator.addFieldInfo("rowNumber", {
		type: "function",
		generate: function(info, seed) {
			return ++info.count;
		},
		count: 0,
	});
	var markets = ["NYSE", "NASDAQ", "SET", "DJI", "HSCEI", "HKEX", "NIKKEI"];
	var fields = ["rowNumber", "companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 40 });
	var configObj = {
		columns: [
			{
				field: fields[0],
				filterInput: false,
				width: 40
			},
			{
				title: "Company",
				field: fields[1]
			},
			{
				title: "Market",
				field: fields[2],
				width: 120,
				filterInput: { 
					type: "select",
					entries: markets
				}
			},
			{
				title: "Last",
				field: fields[3],
				width: 100,
				filterInput: { 
					type: "number" 
				}
			},
			{
				title: "Net. Chng",
				field: fields[4],
				width: 100,
				filterInput: { 
					type: "number" 
				}
			},
			{
				title: "Industry",
				field: fields[5]
			}
		],
		rowFiltering: {
			disabledUI: true
		},
		staticDataRows: records,
		extensions: [
			new tr.FilterInputExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Installation and how to import to a project

Installation examples and details of how to import the extension to a project are available on the [Overview](README.md) page.

### Additional dependencies

Details of additional dependencies for this extension are available on the [Overview](README.md) page.


<div></div>

<div id="elf-api-container"><h2 style="margin-bottom:5px" id="api-refs">API Reference</h2><div id="main-template" class="elf-template">    <section><article>                                                                        <h3 class="subsection-title">Type Definitions</h3>                        <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~ColumnOptions">ColumnOptions</h4><div class="description">    FilterInputPlugin options available in "filterInput" property on grid's column</div>    <h5>Type:</h5>    <span class="param-type">Object</span> | <span class="param-type">boolean</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>defaultLogic</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Logic for filtering</td>        </tr>            <tr>                            <td class="name"><code>filterLogic</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Alias to `defaultLogic`</td>        </tr>            <tr>                            <td class="name"><code>disabled</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">Disable UI</td>        </tr>            <tr>                            <td class="name"><code>placeholder</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    ""                                </td>                        <td class="description last">Placeholder text inside the input</td>        </tr>            <tr>                            <td class="name"><code>type</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    "text"                                </td>                        <td class="description last">Type of UI. Available types are "number", "select", "dropdown", "date"</td>        </tr>            <tr>                            <td class="name"><code>entries</code></td>                        <td class="type">                            <span class="param-type">Array</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Entries of dropdown filters when type is "select"</td>        </tr>            <tr>                            <td class="name"><code>trigger</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    "keyup"                                </td>                        <td class="description last">Available types of trigger are `false | ""` (no trigger) , `"keyup"` (default) , `"enter"` (on enter key *only available for text type)</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">                                <div class="item-type">typedef</div>                        <h4 class="name" id="~FilterLogic"><span class="type-signature"></span>FilterLogic<span class="signature">()</span><span class="type-signature"></span></h4>                            <div class="description">        Logic used to filter in/out on each row    </div>                            <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>e</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Object contains all related information provided by the extension                <h6>Properties</h6><div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>inputText</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Text for filter</td>        </tr>            <tr>                            <td class="name"><code>input</code></td>                        <td class="type">                            <span class="param-type">Element</span>                        </td>                            <td class="attributes">                                                </td>                                    <td class="description last">Input element</td>        </tr>            <tr>                            <td class="name"><code>field</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                                </td>                                    <td class="description last">Field of the column being filtered</td>        </tr>        </tbody></table></div>            </td>        </tr>            <tr>                            <td class="name"><code>rowData</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Row Data of the filtered row</td>        </tr>        </tbody></table></div><div class="details">                                                            </div>                                    </div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~GridColumn">GridColumn</h4><div class="description">    FilterInputPlugin options available in each individual grid's column</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>filterInput</code></td>                        <td class="type">                            <span class="param-type"><a href="FilterInputPlugin.html#~ColumnOptions">FilterInputPlugin~ColumnOptions</a></span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last"></td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Options">Options</h4><div class="description">    FilterInputPlugin options available in main grid configuration under `filterInput` property</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>inputCreated</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Handler executed after filter input is created</td>        </tr>            <tr>                            <td class="name"><code>trigger</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    "keyup"                                </td>                        <td class="description last">Available types of trigger are `false | ""` (no trigger) , `"keyup"` (default) , `"enter"` (on enter key *only available for text type)</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <h3 class="subsection-title">Methods</h3>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="config"><span class="type-signature"></span>config<span class="signature">(options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="filterColumn"><span class="type-signature"></span>filterColumn<span class="signature">(colIndex, text)</span><span class="type-signature"></span></h4>                            <div class="description">        Force filtering for a single column by changing filtering text    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>                <div class="param">                            <div class="name">text</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getColumnInput"><span class="type-signature"></span>getColumnInput<span class="signature">(colIndex)</span><span class="type-signature"> → {Element}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Element</span>    </div><div class="sub-content-desc">    Input element</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getConfigObject"><span class="type-signature"></span>getConfigObject<span class="signature">(out_obj<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Object}</span></h4>                            <div class="description">        Get a current state of grid and extension config    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">out_obj</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getName"><span class="type-signature"></span>getName<span class="signature">()</span><span class="type-signature"> → {string}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hasMultiTableSupport"><span class="type-signature"></span>hasMultiTableSupport<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Plugin that has multi-table support means that it can have multiple hosts/tables and share its states across those hosts/tables.    </div>                        <div class="details">                    <dt class="tag-overrides">Overrides:</dt>    <dd class="tag-overrides">        <a href="GridPlugin.html#hasMultiTableSupport">GridPlugin#hasMultiTableSupport</a>    </dd>                                                </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="initialize"><span class="type-signature"></span>initialize<span class="signature">(host, options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    core grid object                </div>                    </div>                <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="refresh"><span class="type-signature"></span>refresh<span class="signature">(delayMs<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                            <div class="description">        Force filtering for every column    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">delayMs</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                        <div class="default">                                   [default: 0]                                </div>                                        <div class="description">                    Set delay in millisecond to avoid repeatedly filtering                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="removeColumnFilter"><span class="type-signature"></span>removeColumnFilter<span class="signature">(colIndex<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                            <div class="description">        Alias to <a href="FilterInputPlugin.html#removeColumnFilters">FilterInputPlugin#removeColumnFilters</a> Clear input UI and remove all filters from the specified column    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">null</span> | <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                        <div class="default">                                   [default: null]                                </div>                                        <div class="description">                    clear filter input at specific colIndex, if null then all input will be clear.                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="removeColumnFilters"><span class="type-signature"></span>removeColumnFilters<span class="signature">(colIndex<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                            <div class="description">        Clear input UI and remove all filters from the specified column    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">null</span> | <span class="param-type">number</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                        <div class="default">                                   [default: null]                                </div>                                        <div class="description">                    clear filter input at specific colIndex, if null then all input will be clear.                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setFilterLogic"><span class="type-signature"></span>setFilterLogic<span class="signature">(colIndex, func, ctx<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                            <div class="description">        Change filter logic or context    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">func</div>                        <div class="type">                            <span class="param-type">function</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">ctx</div>                        <div class="type">                            <span class="param-type">*</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Context object that will be provided as the first parameter of the filter function                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="unload"><span class="type-signature"></span>unload<span class="signature">(host)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    core grid object                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                        <h3 class="subsection-title">Events</h3>                    <div class="item">                                <div class="item-type">event</div>                        <h4 class="name" id="event:inputCreated">inputCreated</h4>                            <div class="description">        `inputCreated` fired on each creation of filter input    </div>                    <h5>Type:</h5>        <span class="param-type">Object</span>                    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>input</code></td>                        <td class="type">                            <span class="param-type">Element</span>                        </td>                                    <td class="description last">Input element</td>        </tr>            <tr>                            <td class="name"><code>cell</code></td>                        <td class="type">                            <span class="param-type">Element</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>colIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>colId</code></td>                        <td class="type">                            <span class="param-type">number</span> | <span class="param-type">null</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>rowIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>grid</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">core grid object</td>        </tr>            <tr>                            <td class="name"><code>section</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Section(ILayoutGrid) contains all of the filter inputs</td>        </tr>        </tbody></table></div><div class="details">                                                            </div>                                    </div>            </article></section></div></div>