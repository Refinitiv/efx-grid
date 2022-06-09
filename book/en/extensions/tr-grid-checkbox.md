<link rel="stylesheet" href="../resources/styles/elf-template.css">

## Checkbox Column

The Checkbox Extension adds a column with checkboxes to Grid for selecting single or multiple rows. 

```live
<style>
	atlas-blotter {
		height: 200px;
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 5 });
	var configObj = {
		rowHighlight: true,
		columns: [
			{title: "Company", field: fields[0]},
			{title: "Market", field: fields[1], width: 120},
			{title: "Last", field: fields[2], width: 100},
			{title: "Net. Chng", field: fields[3], width: 100},
			{title: "Industry", field: fields[4]}
		],
		staticDataRows: records,
		extensions: [
			new tr.CheckboxExtension()
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

### Default display

There is no specific option required by default.

```js
var config = {
	// any other grid's options
	extensions: [
		new CheckboxExtension()
	]
};
```

### Using with Row Grouping Extension

The Checkbox Extension works out-of-the-box with Row Grouping Extension.

```js
var config = {
	// any other grid's options
	rowGrouping: {
		groupBy: ['col1', 'col2']
	},
	extensions: [
		new CheckboxExtension(),
		new RowGroupingExtension()
	]
};
```

### Using with Pagination Extension

The Checkbox Extension works out-of-the-box with the Pagination Extension. But there are some behaviors that are slightly different from the normal configuration.

The Select All (Check All) action will only perform `checked` to the data on the current page. For example, if you perform `Select All` on the first page, the data on the other pages will not be selected or deselected.

```live
<style>
	atlas-blotter {
		height: 169px;
	}
</style>

<atlas-blotter id="grid"></atlas-blotter>
<emerald-pagination id="paging_ui"></emerald-pagination>
<hr>

<script>
	var paging = document.getElementById('paging_ui');
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 15 });
	var configObj = {
		rowHighlight: true,
		columns: [
			{title: "Company", field: fields[0]},
			{title: "Market", field: fields[1], width: 120},
			{title: "Last", field: fields[2], width: 100},
			{title: "Net. Chng", field: fields[3], width: 100},
			{title: "Industry", field: fields[4]}
		],
		staticDataRows: records,
		pagination: {
			element: paging,
			pageSize: 5
		},
		extensions: [
			new tr.CheckboxExtension(),
			new tr.PaginationExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
```

```js
var config = {
	// any other grid's options
	pagination: {
		pageSize: 5
	},
	extensions: [
		new CheckboxExtension(),
		new PaginationExtension()
	]
};
```

### Binding state example

In this example, the "boolean" field is bound as a state for the checkboxes in the checkbox column.

```live
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry", "boolean"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 6 });
	var configObj = {
		rowHighlight: true,
		columns: [
			{title: "Company", field: fields[0]},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 80},
			{title: "Net. Chng", field: fields[3], width: 80},
			{title: "Industry", field: fields[4]}
		],
		staticDataRows: records,
		checkbox: {
			field: "boolean" // Optional
		},
		extensions: [
			new tr.CheckboxExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Using a checkbox for row selection

If you want to select the column based on the checkbox state. just turn on the flag `rowSelection` under the `checkbox` option.

```live
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry", "boolean"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 6 });
	var configObj = {
		rowHighlight: true,
		columns: [
			{title: "Company", field: fields[0]},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 80},
			{title: "Net. Chng", field: fields[3], width: 80},
			{title: "Industry", field: fields[4]}
		],
		staticDataRows: records,
		checkbox: {
			rowSelection: true,
			field: "boolean" // Optional
		},
		extensions: [
			new tr.CheckboxExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Checkbox behavior

#### Please note:

1. `items in view` means only row items that show in view, including the overflowed row, and rows that are hidden in collapsed groups that show in view. It excludes rows in other pages (so when using the pagination plugin), filtered rows, group header rows, and rows in header or footer sections.

2. A checkbox in Atlas-Blotter normally has three states: `checked`, `unchecked`, `partial`.

3. The top header and group header will automatically change their state according to their group member. See information below under `Top checkbox` and `Group checkbox`.

4. When a user clicks/unchecks the top-checkbox/group-checkbox, all childs `in view` will change their state.

#### Top checkbox

This is the checkbox that appears in the header section. It has the following behaviors:

1. Auto checked when all rows items `in view` are checked.
2. Auto unchecked when all `rows in view` are unchecked.
3. Auto partial when some `rows in view` are checked.

#### Group checkbox

This is the checkbox that appears in the group header row under the content section. It has the following behaviors:

1. Auto checked when all filtered group items are checked.
2. Auto unchecked when all filtered group items are unchecked.
3. Auto partial when some filtered group items are unchecked.
4. Group checkbox can move state from `partial` to `checked` even when not all grouped items have been checked.

#### APIs Summary

| Method                                                                | Collapsed | Other page | Filtered | Disabled |
|-----------------------------------------------------------------------|:---------:|:----------:|:--------:|:--------:|
| getCheckbox(sectionRef, rowIndex)                                     |   Cannot  |   Cannot   |  Cannot  |    Can   |
| getAllCheckedIndices(sectionRef, state)                               |   Cannot  |   Cannot   |  Cannot  |    Can   |
| setAllCheckStates(checked)                                            |  Included |  Included  | Included | Included |
| getAllSelectedData(field)                                             |  Included |  Included  | Included | Included |
| getFilteredSelectedData(field)                                        |  Included |  Excluded  | Excluded | Excluded |
| selectAll()  (equivalent to clicking at checkbox in  top header)      |  Included |  Excluded  | Excluded | Excluded |
| deselectAll() (equivalent to clicking at checkbox in  top header)     |  Included |  Excluded  | Excluded | Excluded |
| checkAll(checked) (equivalent to clicking at checkbox in  top header) |  Included |  Excluded  | Excluded | Excluded |


<div></div>

<div id="elf-api-container"><h2 style="margin-bottom:5px" id="api-refs">API Reference</h2><div id="main-template" class="elf-template">    <section><article>                                                                <h3 class="subsection-title">Members</h3>                    <div class="item">            <div class="item-type">member</div>    <h4 class="name" id="getSelectedRowData"><span class="type-signature"></span>getSelectedRowData<span class="type-signature"></span></h4><div class="description">    Alias of <a href="CheckboxPlugin.html#getAllSelectedData">CheckboxPlugin#getAllSelectedData</a></div><div class="details">                                                            </div></div>                            <h3 class="subsection-title">Type Definitions</h3>                        <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~ColumnOptions">ColumnOptions</h4>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>checkboxColumn</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">If enabled, the correspondence column will use as checkbox column.</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Options">Options</h4><div class="description">    Available options describing `checkbox` object specified in grid's option</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th>Default</th>                <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>rowSelection</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    false                                </td>                        <td class="description last">If enabled, grid row will be selected as checkbox is checked.</td>        </tr>            <tr>                            <td class="name"><code>field</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    "CHECK_BOX"                                </td>                        <td class="description last">Field that will be used for storing check state</td>        </tr>            <tr>                            <td class="name"><code>disablingField</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    "CHECK_BOX_DISABLED"                                </td>                        <td class="description last">Field that will be used for storing disabling state</td>        </tr>            <tr>                            <td class="name"><code>checkboxCreated</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Function handler for checkboxCreated event</td>        </tr>            <tr>                            <td class="name"><code>checkboxBinding</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Function handler for checkboxBinding event</td>        </tr>            <tr>                            <td class="name"><code>clicked</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    null                                </td>                        <td class="description last">Function handler for checkbox clicked event</td>        </tr>            <tr>                            <td class="name"><code>width</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                        <td class="default">                                    34                                </td>                        <td class="description last">Width for checkbox column</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <h3 class="subsection-title">Methods</h3>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="beforeProcessOption"><span class="type-signature"></span>beforeProcessOption<span class="signature">(optionName, optionVal)</span><span class="type-signature"> → {*}</span></h4>                            <div class="description">        Remove redundant built-in feature    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">optionName</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                            </div>                <div class="param">                            <div class="name">optionVal</div>                        <div class="type">                            <span class="param-type">*</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">*</span>    </div><div class="sub-content-desc">    The transformed value of the option</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="checkAll"><span class="type-signature"></span>checkAll<span class="signature">(checked)</span><span class="type-signature"></span></h4>                            <div class="description">        This is equivalent to clicking the checkbox at the top header section of the grid. <br>Use <a href="CheckboxPlugin.html#setAllCheckStates">CheckboxPlugin#setAllCheckStates</a> to set all states regardless of filtering and pagination    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">checked</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                                                    <div class="description">                    Truthy or Falsy value                </div>                    </div>            </div>        <div class="details">                                                            <dt class="tag-see">See:</dt>    <dd class="tag-see">        <ul>            <li><a href="CheckboxPlugin.html#setAllCheckStates">CheckboxPlugin#setAllCheckStates</a></li>        </ul>    </dd>        </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="config"><span class="type-signature"></span>config<span class="signature">(options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="deselectAll"><span class="type-signature"></span>deselectAll<span class="signature">(check)</span><span class="type-signature"></span></h4>                            <div class="description">        Deselect all checkboxes that are not affected by filtering and pagination logics. This is equivalent to un-ticking the checkbox at the top header section of the grid    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">check</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="disableCheckbox"><span class="type-signature"></span>disableCheckbox<span class="signature">(rowRef, disabled)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                                                    <div class="description">                    Row id in the data table or row index                </div>                    </div>                <div class="param">                            <div class="name">disabled</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                                                    <div class="description">                    Truthy or Falsy value                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="enableCheckbox"><span class="type-signature"></span>enableCheckbox<span class="signature">(rowRef)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">rowRef</div>                        <div class="type">                            <span class="param-type">number</span> | <span class="param-type">string</span>                        </div>                                                    <div class="description">                    Row id in the data table or row index                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getAllCheckedIndices"><span class="type-signature"></span>getAllCheckedIndices<span class="signature">(sectionRef, state<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Array.&lt;number&gt;}</span></h4>                            <div class="description">        WARNING: Index is not reliable when use with row grouping due to dynamic nature of the features (e.g. expanding and collapsing of the group). <br>Please use <a href="CheckboxPlugin.html#getSelectedRowData">CheckboxPlugin#getSelectedRowData</a> instead. <br>Current behavior is to get selected index from un-filtered rows.    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">sectionRef</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    Grid SectionReference object                </div>                    </div>                <div class="param">                            <div class="name">state</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Specifies state for searching. Default is "checked"                </div>                    </div>            </div>        <div class="details">                                                            <dt class="tag-see">See:</dt>    <dd class="tag-see">        <ul>            <li><a href="CheckboxPlugin.html#getSelectedRowData">CheckboxPlugin#getSelectedRowData</a></li>        </ul>    </dd>        </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array.&lt;number&gt;</span>    </div><div class="sub-content-desc">    the indices are relative to the specified section</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getAllSelectedData"><span class="type-signature"></span>getAllSelectedData<span class="signature">(field<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Array}</span></h4>                            <div class="description">        Returns all selected rows, even if the rows are filtered or hidden due to group collapsing or pagination. <br>Note that the results are NOT shown in order of the current appearance (i.e. sorting has no impact).    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">field</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                        <div class="default">                                   [default: ""]                                </div>                                        <div class="description">                    When field is not provided, entire rowData is returned. If field is specified, field values will be returned. Use "ROW_ID" as the field for retrieving internal row ids.                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array</span>    </div><div class="sub-content-desc">    Returns selected rows</div>                        <h5>Example:</h5>            <pre><code>var chkBoxExtension = new CheckboxExtension();
chkBoxExtension.getSelectedRowData(); // Get all selected row data in this format [{}, {}, ... RowData objects, {}]
chkBoxExtension.getSelectedRowData("field"); // Get all field values from selected row data in this format [value1, value2, ... values, valueN]</code></pre>    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getCheckbox"><span class="type-signature"></span>getCheckbox<span class="signature">(sectionRef, rowIndex)</span><span class="type-signature"> → {Element}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">sectionRef</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    Grid SectionReference object                </div>                    </div>                <div class="param">                            <div class="name">rowIndex</div>                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Element</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getCheckboxColumnIndex"><span class="type-signature"></span>getCheckboxColumnIndex<span class="signature">()</span><span class="type-signature"> → {number}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div><div class="sub-content-desc">    Return negative number if the column not found</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getConfigObject"><span class="type-signature"></span>getConfigObject<span class="signature">(gridOptions<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Object}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">gridOptions</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getDisplayColumn"><span class="type-signature"></span>getDisplayColumn<span class="signature">()</span><span class="type-signature"> → {number}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                        <div class="type">                            <span class="param-type">number</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">number</span>    </div><div class="sub-content-desc">    Return negative number if the column not found</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getFilteredSelectedData"><span class="type-signature"></span>getFilteredSelectedData<span class="signature">(field<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Array}</span></h4>                            <div class="description">        Return selected rows, excluding rows that are filtered or hidden due to pagination.    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">field</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                        <div class="default">                                   [default: ""]                                </div>                                        <div class="description">                    When field is not provided, entire rowData is returned. If field is specified, field values will be returned. Use "ROW_ID" as the field for retrieving internal row ids.                </div>                    </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Array</span>    </div><div class="sub-content-desc">    Returns selected rows</div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getName"><span class="type-signature"></span>getName<span class="signature">()</span><span class="type-signature"> → {string}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hasMultiTableSupport"><span class="type-signature"></span>hasMultiTableSupport<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Plugin that has multi-table support means that it can have multiple hosts/tables and share its states across those hosts/tables.    </div>                        <div class="details">                    <dt class="tag-overrides">Overrides:</dt>    <dd class="tag-overrides">        <a href="GridPlugin.html#hasMultiTableSupport">GridPlugin#hasMultiTableSupport</a>    </dd>                                                </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="initialize"><span class="type-signature"></span>initialize<span class="signature">(host, options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    core grid object                </div>                    </div>                <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="selectAll"><span class="type-signature"></span>selectAll<span class="signature">()</span><span class="type-signature"></span></h4>                            <div class="description">        Select all checkboxes that are not affected by filtering and pagination logics. This is equivalent to ticking the checkbox at the top header section of the grid    </div>                        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setAllCheckStates"><span class="type-signature"></span>setAllCheckStates<span class="signature">(checked)</span><span class="type-signature"></span></h4>                            <div class="description">        Set state for all checkboxes regardless of filtering and pagination    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">checked</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                                                    <div class="description">                    Truthy or Falsy value                </div>                    </div>            </div>        <div class="details">                                                            <dt class="tag-see">See:</dt>    <dd class="tag-see">        <ul>            <li><a href="CheckboxPlugin.html#checkAll">CheckboxPlugin#checkAll</a></li>        </ul>    </dd>        </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="unload"><span class="type-signature"></span>unload<span class="signature">(host)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    core grid object                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                        <h3 class="subsection-title">Events</h3>                    <div class="item">                                <div class="item-type">event</div>                        <h4 class="name" id="event:checkboxBinding">checkboxBinding</h4>                            <div class="description">        Fired on each rendering of checkbox element    </div>                            <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>checkbox</code></td>                        <td class="type">                            <span class="param-type">Element</span>                        </td>                                    <td class="description last">Checkbox element</td>        </tr>            <tr>                            <td class="name"><code>rowData</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>rowIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>        </tbody></table></div><div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">event</div>                        <h4 class="name" id="event:checkboxCreated">checkboxCreated</h4>                            <div class="description">        Fired on each creation of checkbox element    </div>                            <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>input</code></td>                        <td class="type">                            <span class="param-type">Element</span>                        </td>                                    <td class="description last">Checkbox element that is an alias to `checkbox`</td>        </tr>            <tr>                            <td class="name"><code>checkbox</code></td>                        <td class="type">                            <span class="param-type">Element</span>                        </td>                                    <td class="description last">Checkbox element</td>        </tr>            <tr>                            <td class="name"><code>cell</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Grid Cell object</td>        </tr>            <tr>                            <td class="name"><code>section</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Grid ILayoutGrid object</td>        </tr>            <tr>                            <td class="name"><code>grid</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Core Grid object</td>        </tr>            <tr>                            <td class="name"><code>colIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>rowIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>        </tbody></table></div><div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">event</div>                        <h4 class="name" id="event:clicked">clicked</h4>                                                <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>checkbox</code></td>                        <td class="type">                            <span class="param-type">Element</span>                        </td>                                    <td class="description last">element</td>        </tr>            <tr>                            <td class="name"><code>rowIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>checked</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>checkState</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                                    <td class="description last"></td>        </tr>        </tbody></table></div><div class="details">                                                            </div>                                    </div>            </article></section></div></div>