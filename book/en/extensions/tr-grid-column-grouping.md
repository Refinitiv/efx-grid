<link rel="stylesheet" href="../resources/styles/elf-template.css">

## Column Grouping

The Column Grouping Extension is a categorization based on the column field. Columns can be grouped and put under a spanned header cell. Groups can be defined hierarchically, with an unlimited number of levels in the structure. Grouped columns can be dragged together to reorder columns without breaking the group structure.

A group header can be formatted using a formatter just like a normal cell.

```live
<style>
	atlas-blotter {
		height: 200px;
	}
</style>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 6 });
	var configObj = {
		columnReorder: true,
		columns: [
			{id: "c1", title: "Company", field: fields[0]},
			{id: "c2", title: "Market", field: fields[1], width: 100},
			{id: "c3", title: "Last", field: fields[2], width: 80},
			{id: "c4", title: "Net. Chng", field: fields[3], width: 80},
			{id: "c5", title: "Industry", field: fields[4]}
		],
		staticDataRows: records,
		columnGrouping: [
			{
				id: "g1",
				title: "Company Info",
				alignment: "center",
				children: ["c1", "c2"]
			},
			{
				id: "g2",
				title: "Price",
				alignment: "center",
				children: ["c3", "c4"]
			},
			{
				id: "g4",
				title: "Top 6 Companies",
				alignment: "center",
				children: ["g1", "g2"],
				render: function(e) {
					var cell = e.cell;
					var colIndex = e.colIndex;
					var groupNode = e.groupNode;
					cell.setStyle("color", "orange");
					cell.setContent(groupNode.title);
				}
			}
		],
		extensions: [
			new tr.ColumnGroupingExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Installation and how to import to a project

Installation examples and details of how to import the extension to a project are available on the [Overview](README.md) page.

### Default usage

```js
var gridConfig = {
	columns: [
		{ id: "c1", title: "Column 1" },
		{ id: "c2", title: "Column 2" },
		{ id: "c3", title: "Column 3" },
		{ id: "c4", title: "Column 4" },
	],
	columnGrouping: [
		{ id: "g1", title: "Group 1", children: ["c1", "c2"] },
		{ id: "g2", title: "Group 2", children: ["c3"] },
		{ id: "g3", title: "Group 3", children: ["c4", "g1", "g2"] },
	]
}
```
You can also assign a nested `columnGrouping` object in the children.

```js
var gridConfig = {
	columns: [
		{ id: "c1", title: "Column 1" },
		{ id: "c2", title: "Column 2" },
		{ id: "c3", title: "Column 3" },
		{ id: "c4", title: "Column 4" },
	],
	columnGrouping: [
		{
			id: "g3", title: "Group 3", children: [
				"c4",
				{ id: "g2", title: "Group 2", children: ["c3"] },
				{ id: "g1", title: "Group 1", children: ["c1", "c2"] },
			]
		},
	]
}
```

### Custom render the group header

To custom render the group header, you can pass the `render` configuration as a function to receive `e` as an argument. Then you can use `e.cell` to customize cell properties.

```js
var gridConfig = {
	columns: [
		{ id: "c1", title: "Column 1" },
		{ id: "c2", title: "Column 2" },
		{ id: "c3", title: "Column 3" },
		{ id: "c4", title: "Column 4" },
	],
	columnGrouping: [
		{
			id: "g1",
			title: "Group 1",
			children: ["c1", "c2"],
			render: function(e) {
				e.cell.setStyle("color", "red");
			}
		},
		{ id: "g2", title: "Group 2", children: ["c3"] },
		{ id: "g3", title: "Group 3", children: ["c4", "g1", "g2"] },
	]
}
```

### Migrating from built-in column grouping 

Due to the built-in libraries being migrated out from the `Core Grid` to extensions, built-in column grouping will be deprecated and will no longer be maintained.

The differences between the legacy (built-in) version of column grouping and the new extension can be seen in the examples below.

> **Note:** The Column Grouping Extension is backward compatible with the old built-in. But we suggest still moving to our new implementation.

#### Built-in

```js
var gridConfig = {
	columns: [
		{ id: "c1", title: "Column 1", columnGroup: "g1" },
		{ id: "c2", title: "Column 2", columnGroup: "g1" },
		{ id: "c3", title: "Column 3", columnGroup: "g2" },
	],
	columnGroups: [
		{ id: "g1", title: "Group 1", parent: "g3" },
		{ id: "g2", title: "Group 2", parent: "g3" },
		{
			id: "g3",
			title: "Group 3",
			formatter: {
				render: function(colIndex, cell, groupDefinition) {
					cell.setStyle("color", "red");
				}
			}
		},
	]
}
```
As seen above, in the legacy version of Column Grouping you needed to specify the mandatory options in both `columns` and `columnGroups`, which can be confusing.

#### New extension

```js
var gridConfig = {
	columns: [
		{ id: "c1", title: "Column 1" },
		{ id: "c2", title: "Column 2" },
		{ id: "c3", title: "Column 3" },
		{ id: "c4", title: "Column 4" },
	],
	columnGrouping: [
		{ id: "g1", title: "Group 1", children: ["c1", "c2"] },
		{ id: "g2", title: "Group 2", children: ["c3"] },
		{
			id: "g3",
			title: "Group 3",
			children: ["c4", "g1", "g2"],
			render: function(e) {
				e.cell.setStyle("color", "red");
			}
		},
	]
}
```

For the new implementation, the new `children` option is used and you can specify an array of either `Group or Column ID` for how you want it to be grouped.

Also, note that the `render` config has moved out of the formatter config and receives only `e` as an argument.


### Column Moving

```live
<style>
	atlas-blotter {
		height: 200px;
	}
	html hr {
		margin: 5px;
	}
	select {
		width:50px;	 
	}
	#input_group, #input_grp {
		width: 100px;
	}
</style>
<button id="move_to_group">Move Column</button>&nbsp;&nbsp;
<label>From Index: </label>
<select	id="input_column">
	<option value="0">0</option>
	<option value="1">1</option>
	<option value="2">2</option>
	<option value="3">3</option>
	<option value="4">4</option>
	<option value="5">5</option>
</select>&nbsp;&nbsp;
<label>To Index: </label>
<select	id="input_dest">
	<option value="">null</option>
	<option value="0">0</option>
	<option value="1">1</option>
	<option value="2">2</option>
	<option value="3">3</option>
	<option value="4">4</option>
	<option value="5">5</option>
</select>&nbsp;&nbsp;
<label>Group: </label>
<select	id="input_group">
	<option value="">null</option>
	<option value="g1">Group 1</option>
	<option value="g2">Group 2</option>
	<option value="g3">Group 3</option>
</select><br>
<hr>
<button id="set_parent">Set Group</button>&nbsp;&nbsp;
<label>Column Index: </label>
<select	id="input_col">
	<option value="0">0</option>
	<option value="1">1</option>
	<option value="2">2</option>
	<option value="3">3</option>
	<option value="4">4</option>
	<option value="5">5</option>
</select>&nbsp;&nbsp;
<label>Group: </label>
<select	id="input_grp">
	<option value="">null</option>
	<option value="g1">Group 1</option>
	<option value="g2">Group 2</option>
	<option value="g3">Group 3</option>
</select><br>
<hr>
<atlas-blotter id="grid"></atlas-blotter>
<script>
	var ext = new tr.ColumnGroupingExtension();
	var fields = ["companyName", "industry", "CF_LAST", "CF_NETCHNG", "market", "boolean"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 6 });
	var configObj = {
		columnReorder: true,
		columns: [
			{id: "c1", title: "Company Name", field: fields[0]},
			{id: "c2", title: "Industry", field: fields[1], width: 100},
			{id: "c3", title: "Last", field: fields[2], width: 80},
			{id: "c4", title: "Net. Chng", field: fields[3], width: 80},
			{id: "c5", title: "Market", field: fields[4]},
			{id: "c6", title: "Status", field: fields[5]}
		],
		staticDataRows: records,
		columnGrouping: [
			{
				id: "g1",
				title: "Group 1",
				alignment: "center",
				children: ["c1", "c2"]
			},
			{
				id: "g2",
				title: "Group 2",
				alignment: "center",
				children: ["c4", "c5"]
			},
			{
				id: "g3",
				title: "Group 3",
				alignment: "center",
				children: ["g1","c3", "g2"],
			}
		],
		extensions: [
			ext
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;

	document.getElementById("move_to_group").addEventListener("click", function() {
		var fromIndex = parseInt(document.getElementById("input_column").value);
		var from = Number.isNaN(fromIndex) ? document.getElementById("input_column").value : fromIndex;
		var to = parseInt(document.getElementById("input_dest").value) || 0;
		var groupId = document.getElementById("input_group").value;
		ext.moveColumnIntoGroup(from, to, groupId);
	});
	document.getElementById("set_parent").addEventListener("click", function() {
		var fromIndex = parseInt(document.getElementById("input_col").value);
		var from = Number.isNaN(fromIndex) ? document.getElementById("input_col").value : fromIndex;
		var groupId = document.getElementById("input_grp").value || null;
		ext.setColumnParent(from, groupId);
	});
</script>
```

In order to move column between group, it is recommended to use extension's column moving api instead of built-in `moveColumn`.
For moving column between group or adding to a group, either `setColumnParent` and	`moveColumnIntoGroup` can be used to move a column to specific group.

> Note: If group is not specified when using `setColumnParent`, the column would be removed from current group and move the column to the last column of the grid.

### Adding or removing group child at runtime

```live
<style>
	html hr {
		margin: 5px;
	}
	button {
		margin: 2px;
	}
</style>
<fieldset>
	<legend>Setting Group</legend>
	<div id="set_buttons"></div>
</fieldset>
<fieldset>
	<legend>Adding child</legend>
	<div id="add_buttons"></div>
</fieldset>
<fieldset>
	<legend>Removing child</legend>
	<div id="remove_buttons"></div>
</fieldset>
<hr>
<atlas-blotter id="grid"></atlas-blotter>
<script>
	var ext = new tr.ColumnGroupingExtension();
	var groupDef = {
		id: "g1",
		name: "Group 1"
	};
	var fields = ["companyName", "industry", "CF_LAST", "CF_NETCHNG", "market", "boolean"];
	var columns = fields.map(function(f, idx) {
		var id =  "c" + idx;
		return {
			id: id,
			field: f,
			name: id
		};
	});
	columns[1].width = 100;
	columns[2].width = 80;
	columns[3].width = 80;
	
	columns.forEach(function(col) {
		var btn = document.createElement("button");
		btn.textContent = col.id;
		btn.colId = col.id;
		btn.addEventListener("click", onClickAddChild);
		add_buttons.appendChild(btn);
		
		btn = document.createElement("button");
		btn.textContent = col.id;
		btn.colId = col.id;
		btn.addEventListener("click", onClickRemoveChild);
		remove_buttons.appendChild(btn);
	});
	var groupSets = [
		["c1", "c3"],
		["c5", "c2", "c4"],
		[]
	];
	groupSets.forEach(function(groupSet) {
		var btn = document.createElement("button");
		btn.childIds = groupSet;
		var str = groupSet.join(", ");
		btn.textContent = str ? "Group " + str : "Ungroup";
		btn.addEventListener("click", onClickSetGroup);
		set_buttons.appendChild(btn);
	});

	function onClickAddChild(e) {
		var btn = e.currentTarget;
		var colId = btn.colId;
		
		ext.addGroupChild(groupDef.id, colId);
	}
	function onClickRemoveChild(e) {
		var btn = e.currentTarget;
		var colId = btn.colId;
		
		ext.removeGroupChild(groupDef.id, colId);
	}
	function onClickSetGroup(e) {
		var btn = e.currentTarget;
		groupDef.children = btn.childIds.slice();
		
		ext.setGroupDefinition(groupDef.id, groupDef);
	}
	
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 5 });
	var configObj = {
		columns: columns,
		staticDataRows: records,
		extensions: [ ext ]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```


<div></div>

<h2 style="margin-bottom:5px" id="api-refs">API Reference</h2>
<div id="elf-api-container"><div id="main-template" class="elf-template">    <section><article>                                                                        <h3 class="subsection-title">Type Definitions</h3>                        <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~GroupDefinition">GroupDefinition</h4><div class="description">    Definition object that defined relationship of its children and how to render its content</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>id</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Group id</td>        </tr>            <tr>                            <td class="name"><code>name</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Display group name</td>        </tr>            <tr>                            <td class="name"><code>tooltip</code></td>                        <td class="type">                            <span class="param-type">boolean</span> | <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    true                                </td>                        <td class="description last">Show tooltip in column's header</td>        </tr>            <tr>                            <td class="name"><code>children</code></td>                        <td class="type">                            <span class="param-type">Array.&lt;string&gt;</span>                        </td>                            <td class="attributes">                                                </td>                                        <td class="default">                                </td>                        <td class="description last">Child member in this group</td>        </tr>            <tr>                            <td class="name"><code>alignment</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">eg. left, center, right</td>        </tr>            <tr>                            <td class="name"><code>render</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                </td>                        <td class="description last">render function handler</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~GroupDefinitions">GroupDefinitions</h4><div class="description">    A collection of group definition objects</div>    <h5>Type:</h5>    <span class="param-type">Array.&lt;<a href="#~GroupDefinition">ColumnGroupingPlugin~GroupDefinition</a>&gt;</span><div class="details">                                                            </div></div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Options">Options</h4><div class="description">    This options can be specified by `columnGrouping` property of the main grid's options or extension options.</div>    <h5>Type:</h5>    <span class="param-type">Array.&lt;<a href="#~GroupDefinition">ColumnGroupingPlugin~GroupDefinition</a>&gt;</span><div class="details">                                                            </div></div>                            <h3 class="subsection-title">Methods</h3>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id=".getObjectId"><span class="type-signature"></span>getObjectId<span class="signature">(column)</span><span class="type-signature"> → {string}</span></h4>                            <div class="description">        Get column id from column object    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">column</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id=".getObjectIndex"><span class="type-signature"></span>getObjectIndex<span class="signature">(column)</span><span class="type-signature"> → {number}</span></h4>                            <div class="description">        Get column index from column object    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">column</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="addColumnGrouping"><span class="type-signature"></span>addColumnGrouping<span class="signature">(groupDef)</span><span class="type-signature"></span></h4>                            <div class="description">        Deprecated. Use addGroup() method instead    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">groupDef</div>                        <div class="type">                            <span class="param-type"><a href="#~GroupDefinition">ColumnGroupingPlugin~GroupDefinition</a></span>                        </div>                                                    <div class="description">                    Group definition object                </div>                    </div>            </div>        <div class="details">                                        <dt class="important tag-deprecated">Deprecated:</dt><dd class="yes-def tag-deprecated">Yes</dd>                                <dt class="tag-see">See:</dt>    <dd class="tag-see">        <ul>            <li><a href="#addGroup">ColumnGroupingPlugin#addGroup</a></li>        </ul>    </dd>        </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="addColumnToGroup"><span class="type-signature"></span>addColumnToGroup<span class="signature">(column, groupId, colIndex)</span><span class="type-signature"></span></h4>                            <div class="description">        Deprecated. Column should be directly added through grid APIs.    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">column</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    Grid's Column definition object                </div>                    </div>                <div class="param">                            <div class="name">groupId</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>                <div class="param">                            <div class="name">colIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                                    <div class="description">                    Column index                </div>                    </div>            </div>        <div class="details">                                        <dt class="important tag-deprecated">Deprecated:</dt><dd class="yes-def tag-deprecated">Yes</dd>                                </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="addGroup"><span class="type-signature"></span>addGroup<span class="signature">(groupDef)</span><span class="type-signature"> → {string}</span></h4>                            <div class="description">        Add new group definition to existing group structure. Existing group with the same id will be replaced.    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">groupDef</div>                        <div class="type">                            <span class="param-type"><a href="#~GroupDefinition">ColumnGroupingPlugin~GroupDefinition</a></span>                        </div>                                                    <div class="description">                    Group definition object                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div><div class="sub-content-desc">    Return group ID</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="addGroupChild"><span class="type-signature"></span>addGroupChild<span class="signature">(parentId, childRef)</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        If a column is added as a new child in a group, the column will be moved to the last position in the group. If the column is already a child of the group, nothing happens.    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">parentId</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>                <div class="param">                            <div class="name">childRef</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                                                    <div class="description">                    Column index, column id, group id to be added                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="beforeProcessOption"><span class="type-signature"></span>beforeProcessOption<span class="signature">(optionName, optionValue)</span><span class="type-signature"> → {*}</span></h4>                            <div class="description">        Prevent built-in config    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">optionName</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>                <div class="param">                            <div class="name">optionValue</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">*</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="config"><span class="type-signature"></span>config<span class="signature">(options)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getCellInfo"><span class="type-signature"></span>getCellInfo<span class="signature">(e)</span><span class="type-signature"> → {Object}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">e</div>                        <div class="type">                            <span class="param-type">Element</span> | <span class="param-type">Event</span> | <span class="param-type">MouseEvent</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getChildColumnIndices"><span class="type-signature"></span>getChildColumnIndices<span class="signature">(groupId)</span><span class="type-signature"> → {Array.&lt;number&gt;}</span></h4>                            <div class="description">        Return all column indices under the given group id    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">groupId</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;number&gt;</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getConfigObject"><span class="type-signature"></span>getConfigObject<span class="signature">(gridOptions<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Object}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">gridOptions</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getGroupChildren"><span class="type-signature"></span>getGroupChildren<span class="signature">(groupId)</span><span class="type-signature"> → {Array.&lt;string&gt;}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">groupId</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;string&gt;</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getGroupDefinition"><span class="type-signature"></span>getGroupDefinition<span class="signature">(groupId)</span><span class="type-signature"> → {<a href="#~GroupDefinition">ColumnGroupingPlugin~GroupDefinition</a>}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">groupId</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type"><a href="#~GroupDefinition">ColumnGroupingPlugin~GroupDefinition</a></span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getGroupDefinitions"><span class="type-signature"></span>getGroupDefinitions<span class="signature">()</span><span class="type-signature"> → {<a href="#~GroupDefinitions">ColumnGroupingPlugin~GroupDefinitions</a>}</span></h4>                            <div class="description">        Get a shallow copy of all existing group definitions    </div>                        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type"><a href="#~GroupDefinitions">ColumnGroupingPlugin~GroupDefinitions</a></span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getGroupIds"><span class="type-signature"></span>getGroupIds<span class="signature">(colRef)</span><span class="type-signature"> → {Array.&lt;string&gt;}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colRef</div>                        <div class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;string&gt;</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getGroupLevel"><span class="type-signature"></span>getGroupLevel<span class="signature">(groupId)</span><span class="type-signature"> → {number}</span></h4>                            <div class="description">        Return row index of the given group id    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">groupId</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getMaxGroupLevel"><span class="type-signature"></span>getMaxGroupLevel<span class="signature">()</span><span class="type-signature"> → {number}</span></h4>                            <div class="description">        Return deepest row index of column headers    </div>                        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getName"><span class="type-signature"></span>getName<span class="signature">()</span><span class="type-signature"> → {string}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getValidDestinationIndex"><span class="type-signature"></span>getValidDestinationIndex<span class="signature">(id, destCol)</span><span class="type-signature"> → {number}</span></h4>                            <div class="description">        Get a valid index for moving group/column to specific index.    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">id</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                                    <div class="description">                    group id or column id                </div>                    </div>                <div class="param">                            <div class="name">destCol</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                                                    <div class="description">                    destination column index / id                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div><div class="sub-content-desc">    destination index</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hasMultiTableSupport"><span class="type-signature"></span>hasMultiTableSupport<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Plugin that has multi-table support means that it can have multiple hosts/tables and share its states across those hosts/tables.    </div>                        <div class="details">                    <dt class="tag-overrides">Overrides:</dt>    <dd class="tag-overrides">        <a href="">GridPlugin#hasMultiTableSupport</a>    </dd>                                                </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="initialize"><span class="type-signature"></span>initialize<span class="signature">(host, options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    core grid object                </div>                    </div>                <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="moveColumnById"><span class="type-signature"></span>moveColumnById<span class="signature">(srcCol, destCol<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Move the specified column to position before the destination    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">srcCol</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    Source column id or index                </div>                    </div>                <div class="param">                            <div class="name">destCol</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Destination column id or index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="moveColumnIntoGroup"><span class="type-signature"></span>moveColumnIntoGroup<span class="signature">(colRef, to, groupId)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colRef</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                                                    <div class="description">                    Column index or id that should be moved                </div>                    </div>                <div class="param">                            <div class="name">to</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>                <div class="param">                            <div class="name">groupId</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="moveGroup"><span class="type-signature"></span>moveGroup<span class="signature">(id, destCol<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                            <div class="description">        Move group or column to left side of the destination column.Group or column can only be moved within the parent group.If the destination is between other column group, the destination will change to the end of  that group instead.    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">id</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    group id or column id                </div>                    </div>                <div class="param">                            <div class="name">destCol</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    destination column index / id                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="pinGroup"><span class="type-signature"></span>pinGroup<span class="signature">(groupId, side<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">groupId</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">side</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Available values are: left|right. If no value is supplied, all columns will be pinned to the left.                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="removeGroup"><span class="type-signature"></span>removeGroup<span class="signature">(groupId)</span><span class="type-signature"> → {boolean}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">groupId</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="removeGroupChild"><span class="type-signature"></span>removeGroupChild<span class="signature">(parentId, childRef)</span><span class="type-signature"> → {boolean}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">parentId</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>                <div class="param">                            <div class="name">childRef</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                                                    <div class="description">                    Column index, column id, group id to be added                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="renderGroups"><span class="type-signature"></span>renderGroups<span class="signature">()</span><span class="type-signature"></span></h4>                            <div class="description">        Render all column group headers without affecting cell spans.    </div>                        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="reorderColumns"><span class="type-signature"></span>reorderColumns<span class="signature">(colList, destCol<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Move and reorder the specified columns to position before the destination    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colList</div>                        <div class="type">                            <span class="param-type">Array.&lt;(number|string)&gt;</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    Column list to be reordered                </div>                    </div>                <div class="param">                            <div class="name">destCol</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Destination column id or index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setColumnParent"><span class="type-signature"></span>setColumnParent<span class="signature">(colRef, groupId)</span><span class="type-signature"> → {boolean}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">colRef</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                                                    <div class="description">                    Column index or id that should be moved                </div>                    </div>                <div class="param">                            <div class="name">groupId</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setGroupChildren"><span class="type-signature"></span>setGroupChildren<span class="signature">(groupId, newChildList)</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Replace and update existing group definition.    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">groupId</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>                <div class="param">                            <div class="name">newChildList</div>                        <div class="type">                            <span class="param-type">Array.&lt;string&gt;</span>                        </div>                                                    <div class="description">                    If null is given, all existing children in the group will be removed                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setGroupDefinition"><span class="type-signature"></span>setGroupDefinition<span class="signature">(groupId, groupDef<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {string}</span></h4>                            <div class="description">        Replace and update existing group definition. New group is added if the given id has no match. Existing group will be removed of no new definition is given.    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">groupId</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">groupDef</div>                        <div class="type">                            <span class="param-type"><a href="#~GroupDefinition">ColumnGroupingPlugin~GroupDefinition</a></span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div><div class="sub-content-desc">    Return group Id. Return empty string if nothing has been changed.</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setGroupDefinitions"><span class="type-signature"></span>setGroupDefinitions<span class="signature">(groupDefs)</span><span class="type-signature"></span></h4>                            <div class="description">        Remove all existing group definitions and replace with the given definitions.    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">groupDefs</div>                        <div class="type">                            <span class="param-type"><a href="#~GroupDefinitions">ColumnGroupingPlugin~GroupDefinitions</a></span>                        </div>                                                    <div class="description">                    Use null or empty array to remove all existing groups                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setGroupName"><span class="type-signature"></span>setGroupName<span class="signature">(groupId, groupName)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">groupId</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>                <div class="param">                            <div class="name">groupName</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="unload"><span class="type-signature"></span>unload<span class="signature">(host)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    core grid object                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="unpinGroup"><span class="type-signature"></span>unpinGroup<span class="signature">(groupId, dest<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">groupId</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">dest</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    The unpinned group will be placed before the destination position after the operation                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="unsetParent"><span class="type-signature"></span>unsetParent<span class="signature">(childRef)</span><span class="type-signature"> → {boolean}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">childRef</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                                                    <div class="description">                    Column index, column id, group id to be removed from its own parent                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                </article></section></div></div>