<link rel="stylesheet" href="../resources/styles/elf-template.css">

## Filter Dialog

The Filter Dialog is a user-friendly interface for filtering and sorting.

### Features

* Allow users to filter grid column values
* Allow users to sort grid column values

### Demo

`Right-click` on each column header to see the dialog.

```live(test-resource)
<style>
	textarea {
		width: 100%;
		height: 100px;
	}
	efx-grid {
		min-height: 500px;
	}
	html hr {
		margin: 5px;
	}
</style>
Language:
<select id="lang_selector">
	<option value="en">English</option>
	<option value="ja">Japanese</option>
	<option value="de">German</option>
	<option value="zh">Simplified Chinese</option>
	<option value="zh-Hant">Traditional Chinese</option>
</select>
<hr>
<efx-grid id="grid"></efx-grid>
<script>
	var rowFilteringExt = new RowFiltering();
	var contextMenuExt = new ContextMenu();

	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "ISODate"];
	var records = DataGenerator.generateRecords(fields, { numRows: 10 });
	var configObj = {
		columns: [
			{title: "Company", field: fields[0], sortable: true, dataType: 'text'},
			{title: "Market", field: fields[1], width: 100, sortable: true, dataType: 'text'},
			{title: "Last", field: fields[2], width: 100, sortable: true, dataType: 'number'},
			{title: "Net. Chng", field: fields[3], width: 100, sortable: true, dataType: 'number'},
			{title: "IPO Date", field: fields[4], sortable: true, dataType: 'datetime'}
		],
		dataModel: {
			data: records
		},
		contextMenu: {
			items: {
				MENU_1: {
					text: 'Filter',
					callback: function (e) {
						var colIndex = e.colIndex;
						var lang = document.getElementById("lang_selector").value;
						var options = {
							sortUI: true, // Show sorting section
							filterUI: true, // Show filtering section
							lang: lang,
							fieldDataType: grid.api.getColumnDataType(colIndex)
						};
						rowFilteringExt.openDialog(colIndex, options);
					}
				},
			},
			onMenu: function (e) {
				e.menu.addItem('MENU_1');
			}
		},
		extensions: [
			rowFilteringExt,
			contextMenuExt
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Setup guide

```js
 // efx-grid
import '@refinitiv-ui/efx-grid';
import '@refinitiv-ui/efx-grid/themes/halo/light';

// Extensions
import { RowFiltering } from '@refinitiv-ui/efx-grid/extensions';

// Filter Dialog module
import '@refinitiv-ui/efx-grid/filter-dialog';
import '@refinitiv-ui/efx-grid/filter-dialog/themes/halo/light';  // !Important. Theme must be imported.

```

Create a new Row Filtering Extension instance and push it to an `extensions` configuration.

```js
var rfe = new RowFiltering();

var configObj = {
	extensions: [
		rfe,
	],
	columns: columns, // Columns config
	dataModel: { // Data config
		fields: fields,
		data: dataRows
	},
};

var grid = document.getElementById("grid");
grid.config = configObj;
```

To open the dialog, you need to call `openDialog()` method on the extension object.

```js
var filterChanged = function(e) {
	console.log('filterChanged', e.detail);
}

var confirm = function(e) {
	console.log('confirm', e.detail);
}

var sortChanged = function(e) {
	console.log('sortChanged', e.detail);
}
rfe.openDialog(0); // Change "0" to any column index.
```

### Changing Language

Please follow this [Link](https://ui.refinitiv.com/intl/internationalization)

You can change the language of this component in 2 ways,

1. By specify `lang` attribute in the root html tag.

```html
<html lang="en">

</html>
```

2. By specify `lang` property of the dialog element directly.

```js
var dialog = document.getElementByTagName("filter-dialog")[0];
dialog.lang = "en";
```

> Note: Currently, the following languages are supported: en, ja, de, zh, zh-Hant

## Using with the [Context Menu Extension](../extensions/tr-grid-contextmenu.md)

For most cases, you will want the dialog button to appear when the user right-clicks on the column header (known as the context menu).

To do this simply import the `Context Menu` extension and its configurations.

```js
import {
  ContextMenu,
  RowFiltering
} from '@refinitiv-ui/efx-grid/extensions';

var rfe = new RowFiltering();

var configObj = {
	extensions: [
		rfe,
		new ContextMenu(),
	],
	columns: columns, // Columns config
	dataModel: { // Data config
		fields: fields,
		data: dataRows
	},
	contextMenu: {
		items: {
			MENU_1: {
				text: "Format",
				callback: function (e) {
					// Open the dialog when click on the "Format" menu
					rfe.openDialog(e.colIndex);
				}
			},
		},
		onMenu: function (e) {
				e.menu.addItem("MENU_1");
		}
	},
};

var grid = document.getElementById("grid");
grid.config = configObj;
```

And that's it!


<div></div>

<div id="elf-api-container"><h2 style="margin-bottom:5px" id="api-refs">API Reference</h2><div id="main-template" class="elf-template">    <section><article>                                                <h3 class="subsection-title">Type Definitions</h3>                        <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Config">Config</h4>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>data</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                            <td class="attributes">                                                </td>                                    <td class="description last">Column data</td>        </tr>            <tr>                            <td class="name"><code>sortState</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">"a" for ascending or "d" for descending</td>        </tr>            <tr>                            <td class="name"><code>sortUI</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Show Sort area</td>        </tr>            <tr>                            <td class="name"><code>filterUI</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Show Filter area</td>        </tr>            <tr>                            <td class="name"><code>filterChanged</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Filter changed handler</td>        </tr>            <tr>                            <td class="name"><code>confirm</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Alias of filterChanged</td>        </tr>            <tr>                            <td class="name"><code>cancel</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Alias of dialog cancel</td>        </tr>            <tr>                            <td class="name"><code>sortChanged</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Sort changed handler</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <h3 class="subsection-title">Methods</h3>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hide"><span class="type-signature"></span>hide<span class="signature">()</span><span class="type-signature"></span></h4>                            <div class="description">        Hide the dialog    </div>                        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hideSortUI"><span class="type-signature"></span>hideSortUI<span class="signature">(val)</span><span class="type-signature"></span></h4>                            <div class="description">        Hide Sort UI block    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">val</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                                                    <div class="description">                    value                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="init"><span class="type-signature"></span>init<span class="signature">(options)</span><span class="type-signature"></span></h4>                            <div class="description">        Initialize dialog    </div>                            <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type"><a href="FilterDialog.html#~Config">FilterDialog~Config</a></span>                        </div>                                                    <div class="description">                    initial data                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="setSortState"><span class="type-signature"></span>setSortState<span class="signature">(val)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">val</div>                        <div class="type">                            <span class="param-type">string</span>                        </div>                                                    <div class="description">                    Sorting state "d" or "a"                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="show"><span class="type-signature"></span>show<span class="signature">()</span><span class="type-signature"></span></h4>                            <div class="description">        Show the dialog as a popup    </div>                        <div class="details">                                                            </div>                                    </div>                </article></section></div></div>