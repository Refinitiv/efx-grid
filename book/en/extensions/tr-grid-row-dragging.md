<link rel="stylesheet" href="../resources/styles/elf-template.css">

## Row Dragging

The Row Dragging Extension allows the user to drag and reorder selected rows.

```live
<style>
	atlas-blotter {
		height: 308px;
	}
	html hr {
		margin: 5px;
	}
</style>

<button id="get_btn">Show Data</button>
<hr>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["id", "companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 10 });
	var configObj = {
		rowHighlight: true,
		columns: [
			{ field: fields[0], width: 30, alignment: "center" },
			{ title: "Company", field: fields[1] },
			{ title: "Market", field: fields[2], width: 120 },
			{ title: "Last", field: fields[3], width: 100 },
			{ title: "Net. Chng", field: fields[4], width: 100 },
			{ title: "Industry", field: fields[5] }
		],
		staticDataRows: records,
		extensions: [
			new tr.RowDraggingExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;

	document.getElementById("get_btn").addEventListener("click", function(e) {
		var rows = grid.api.getMultipleRowData(); // Get all row definitions
		var colData = rows.map(function getIdAndCompanyName(rowData) {
			return rowData["id"] + ": " + rowData["companyName"];
		});
		alert(colData.join("\n"));
	});
</script>
```

### Installation and how to import to a project

Installation examples and details of how to import the extension to a project are available on the [Overview](README.md) page.

### Custom dragbox

This allows users to customize the `dragBox` by providing a `dragBoxRenderer` option. It is not enabled initially.

```js
var gridConfig = {
	...
	columns: [
		{ title: "Column 1", field: "col1" },
		{ title: "Column 2", field: "col2" },
		{ title: "Column 3", field: "col3" },
		{ title: "Column 4", field: "col4" },
	],
	rowDragging: {
		dragBoxRenderer: function(e) {
			e.dragBox.textContent = e.dataRow.col1;
		}
	}
	...
}
```

### Drag and drop content outside grid's area

The Row Dragging Extension can be used together with the `RowSelectionPlugin` to allow users to drag a selected row and drop it to a target outside of a Grid. Then, add `dragEnd` handler to perform content copying of the selected rows as illustrated below:


```live
<style>
	atlas-blotter {
		height: 308px;
	}

	#drop_target {
		width: 100%;
		height: 100px;
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>
<textarea id="drop_target" placeholder="Drop Content Here"></textarea>

<script>
	function onDragEnd(e) {
		var dropTargetEl = document.getElementById("drop_target");
		if (e.dropTarget !== dropTargetEl) {
			return;
		}
		var rowSelectionExt = e.srcGrid.getPlugin("RowSelectionPlugin");
		var rowIndices = rowSelectionExt.getSelectedRows();
		
		var text = "No Selected Row";
		if (rowIndices) {
			var rows = grid.api.getMultipleRowData(rowIndices);
			text = JSON.stringify(rows, function replacer(key, val) {
				if(key === "ROW_DEF") { // Exclude Row definition reference
					return;
				}
				return val;
			}, 2)
		}
		dropTargetEl.value = text;
	}
	
	var fields = ["id", "companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 10 });
	var configObj = {
		rowHighlight: true,
		columns: [
			{ field: fields[0], width: 30, alignment: "center" },
			{ title: "Company", field: fields[1] },
			{ title: "Market", field: fields[2], width: 120 },
			{ title: "Last", field: fields[3], width: 100 },
			{ title: "Net. Chng", field: fields[4], width: 100 },
			{ title: "Industry", field: fields[5] }
		],
		staticDataRows: records,
		rowDragging: {
			autoScroll: false,
			dragEnd: onDragEnd
		},
		extensions: [
			new tr.RowSelectionExtension(), new tr.RowDraggingExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Migrating from built-in column grouping 

Due to the built-in libraries being migrated out from the `Core Grid` to extensions, built-in column grouping will be deprecated and will no longer be maintained.

The differences between the legacy (built-in) version of Row Dragging and the new extension can be seen in the examples below

> Note: The Row Dragging Extension is backward compatible with the old built-in (with some breaking changes). Therefore, the new implementation is recommended.

#### Built-in

```js
var gridConfig = {
	...
	rowReorder: {
		dragBoxRenderer: function (dragEvent, dragBox, dataRows) {
			dragBox.setContent("test");
		}
	},
	...
}
```

#### New extension

```js
var gridConfig = {
	...
	rowDragging: {
		dragBoxRenderer: function (e) {
			// e.dragBox
			// e.dataRows
			e.dragBox.textContent = "test";
		}
	},
	...
}
```

For the new implementation, you need to change to the `rowDragging` option. And the `dragBoxRenderer` receives an `event` only as an argument.


<div></div>

<div id="elf-api-container"><h2 style="margin-bottom:5px" id="api-refs">API Reference</h2><div id="main-template" class="elf-template">    <section><article>                                                                        <h3 class="subsection-title">Type Definitions</h3>                        <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Options">Options</h4><div class="description">    Available options describing `rowDragging` object specified in grid's option</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>dragBox</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">If enabled, information box will be shown during the drag</td>        </tr>            <tr>                            <td class="name"><code>disabled</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">If enabled, dataTransfer and autoScroll will be disabled, and guileline UI will not been shown.</td>        </tr>            <tr>                            <td class="name"><code>mouseInput</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    true                                </td>                        <td class="description last">If disabled, mousemove/mousedown will not trigger the drag operation.</td>        </tr>            <tr>                            <td class="name"><code>dataTransfer</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    true                                </td>                        <td class="description last">If disabled, internal row data will not be moved at the end of the drag operation.</td>        </tr>            <tr>                            <td class="name"><code>autoScroll</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    true                                </td>                        <td class="description last">If disabled, grid will not be verticallly scrolled when mouse is hovering around the edges of the grid.</td>        </tr>            <tr>                            <td class="name"><code>dragBoxRenderer</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Allow user to customize dragBox</td>        </tr>            <tr>                            <td class="name"><code>dragStart</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Function handler for dragStart event</td>        </tr>            <tr>                            <td class="name"><code>drag</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Function handler for drag event</td>        </tr>            <tr>                            <td class="name"><code>dragEnd</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Function handler for dragEnd event</td>        </tr>            <tr>                            <td class="name"><code>dataMoved</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Function handler for dataMoved event</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <h3 class="subsection-title">Methods</h3>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="beforeProcessOption"><span class="type-signature"></span>beforeProcessOption<span class="signature">(optionName, optionValue)</span><span class="type-signature"> → {*}</span></h4>                            <div class="description">        Prevent built-in config    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">optionName</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>                <div class="param">                            <div class="name">optionValue</div>                        <div class="type">                            <span class="param-type">*</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">*</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="cancelDrag"><span class="type-signature"></span>cancelDrag<span class="signature">()</span><span class="type-signature"></span></h4>                                            <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="config"><span class="type-signature"></span>config<span class="signature">(options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Grid model object                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getConfigObject"><span class="type-signature"></span>getConfigObject<span class="signature">(out_obj<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Object}</span></h4>                            <div class="description">        Get a current state of grid and extension config    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">out_obj</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getGuideline"><span class="type-signature"></span>getGuideline<span class="signature">()</span><span class="type-signature"> → {Element}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Element</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getName"><span class="type-signature"></span>getName<span class="signature">()</span><span class="type-signature"> → {string}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hasMultiTableSupport"><span class="type-signature"></span>hasMultiTableSupport<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Plugin can have multiple hosts/tables and share its states across those hosts/tables.    </div>                        <div class="details">                    <dt class="tag-overrides">Overrides:</dt>    <dd class="tag-overrides">        <a href="GridPlugin.html#hasMultiTableSupport">GridPlugin#hasMultiTableSupport</a>    </dd>                                                </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="initialize"><span class="type-signature"></span>initialize<span class="signature">(host, options)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    core grid instance                </div>                    </div>                <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="startDrag"><span class="type-signature"></span>startDrag<span class="signature">(startRef, opt_suppressEvent<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">startRef</div>                        <div class="type">                            <span class="param-type">*</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">opt_suppressEvent</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="stopDrag"><span class="type-signature"></span>stopDrag<span class="signature">()</span><span class="type-signature"></span></h4>                                            <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="unload"><span class="type-signature"></span>unload<span class="signature">(host)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    core grid instance                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                        <h3 class="subsection-title">Events</h3>                    <div class="item">                                <div class="item-type">event</div>                        <h4 class="name" id="event:dataMoved">dataMoved</h4>                            <div class="description">        Fired when rows or data are moved by drag operation.    </div>                    <h5>Type:</h5>        <span class="param-type">Object</span>                <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">event</div>                        <h4 class="name" id="event:drag">drag</h4>                            <div class="description">        Fired on each mousemove or touchmove    </div>                    <h5>Type:</h5>        <span class="param-type">Object</span>                <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">event</div>                        <h4 class="name" id="event:dragEnd">dragEnd</h4>                            <div class="description">        The event will always be fired at the end of the drag operation. This is to allow clearing of any resource used. You can cancel the data moving operation by setting cancel property to true.    </div>                    <h5>Type:</h5>        <span class="param-type">Object</span>                <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">event</div>                        <h4 class="name" id="event:dragInterval">dragInterval</h4>                            <div class="description">        Fired at an interval during drag    </div>                    <h5>Type:</h5>        <span class="param-type">Object</span>                <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">event</div>                        <h4 class="name" id="event:dragStart">dragStart</h4>                            <div class="description">        The event is fired at the beginning of the drag operation. You can cancel the operation by setting cancel property to true.    </div>                    <h5>Type:</h5>        <span class="param-type">Object</span>                <div class="details">                                                            </div>                                            <h5>Example:</h5>            <pre><code>// ...
dragStart: function(e) {
  e.cancel = true; // To cancel the operation
}, // ..</code></pre>    </div>            </article></section></div></div>