<link rel="stylesheet" href="../resources/styles/elf-template.css">

## Context Menu

The Context Menu Extension provides the capability to display a customized contextual menu when a user right-clicks on the grid. The menu items to be displayed are totally customizable based on the position of the mouse, the data, and also any customized logic of your application.

```live
<style>
	atlas-blotter {
		height: 169px;
	}
</style>

<span id="text"></span>
<atlas-blotter id="grid"></atlas-blotter>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 5 });
	var configObj = {
		columns: [
			{ name: "Company", field: fields[0] },
			{ name: "Market", field: fields[1], width: 120 },
			{ name: "Last", field: fields[2], width: 100 },
			{ name: "Net. Chng", field: fields[3], width: 100 },
			{ name: "Industry", field: fields[4] }
		],
		staticDataRows: records,
		contextMenu: {
			items: {
				HEADER: {text: 'Header 1', value: '1', callback: function (e) {
					document.getElementById("text").textContent = "Column: " + (e.colIndex + 1) + ", " + e.item.text + " Clicked!";
				}},
				MENU_1: {text: 'Menu 1', value: '1', callback: function (e) {
					document.getElementById("text").textContent = "Column: " + (e.colIndex + 1) + ", " + e.item.text + " Clicked!";
				}},
				MENU_2: {text: 'Menu 2', value: '2', callback: function (e) {
					document.getElementById("text").textContent = "Column: " + (e.colIndex + 1) + ", " + e.item.text + " Clicked!";
				}},
				MENU_3: {text: 'Menu 3', value: '3', callback: function (e) {
					document.getElementById("text").textContent = "Column: " + (e.colIndex + 1) + ", " + e.item.text + " Clicked!";
				}}
			},
			onMenu: function (e) {
				if (e.context === 'header') {
					e.menu.addItem('HEADER');
				}
				if (e.context === 'content') {
					e.menu.addItem('MENU_1');
					e.menu.addItem('MENU_2');
					e.menu.addSeparator();
					e.menu.addItem('MENU_3');
				}
			}
		},
		extensions: [
			new tr.ContextMenuExtension()
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```

### Installation and how to import to a project

Installation examples and details of how to import the extension to a project are available on the [Overview](README.md) page.

### Basic menu display

To show the menu, you need to define menu items in the grid's configuration object. Each menu item is assigned to a name so it can be referenced later at the display time in the `onMenu()` event handler. `onMenu()` is an event handler triggered when a user right-clicks at an area on the grid. You can choose to display the menu only at a specific place on the grid by checking the value of `e.context`.

```js
var config = {
		//...any other grid's options...
	contextMenu: {
		items: {
			HEADER: {text: 'Header 1', value: '1', callback: function (e) {
				// Do something
				console.log(e.item);
			}},
			MENU_1: {text: 'Menu 1', value: '1', callback: function (e) {
				// Do something
				console.log(e.item);
			}},
			MENU_2: {text: 'Menu 2', value: '2', callback: function (e) {
				// Do something
				console.log(e.item);
			}},
			MENU_3: {text: 'Menu 3', value: '3', callback: function (e) {
				// Do something
				console.log(e.item);
			}}
		},
		onMenu: function (e) {
			if (e.context === 'header') {
				e.menu.addItem('HEADER');
			}
			if (e.context === 'content') {
				e.menu.addItem('MENU_1');
				e.menu.addItem('MENU_2');
				e.menu.addSeparator();
				e.menu.addItem('MENU_3');
			}
		}
	}
};
```

### Custom menu display

To use the context menu with other UIs, this extension exposes the 'contextmenu' event and provide related information to the event argument for integration. See the example below:

```js
var config = {
	//...any other grid's options...
	contextMenu: true, // Default UI is disabled
};
var cme = new ContextMenu();
cme.listen("contextmenu", function(e) { 
	console.log(e); 
	// Create your custom pop up menu here
});
```

Or you can define the context menu event handler directly (see below), which is equivalent to the codes above:

```js
var config = {
	//...any other grid's options...
	contextMenu: function(e) {
		console.log(e); 
	},
};
```

### Group menu display

Several menu items can be grouped together under a name and can be inserted only once into the menu. From the snippet below, all three menus–`SORT_ASCENDING`, `SORT_DESCENDING`, and `SORT_ORIGINAL`–are inserted together.

```js
var config = {
	//...any other grid's options...
	contextMenu: {
		items: {
			SORT_ASCENDING: {text: 'Sort Ascending', value: 's'},
			SORT_DESCENDING: {text: 'Sort Descending', value: 'd'},
			SORT_ORIGINAL: {text: 'Original Order', value: 'n'},
			SORTING: [
				'SORT_ASCENDING',
				'SORT_DESCENDING',
				'SORT_ORIGINAL',
			]
		},
		onMenu: function (e) {
			if (e.context === 'content') {
				//Insert the whole group in 1 statement
				e.menu.addItem('SORTING');
			}
		}
	}
};
```

### Runtime menu disabling

You may find you want to disable or hide a menu item for a specific condition. You can do this by adding your condition inside the `onMenu()` event handler. The event argument of `onMenu()` contains a reference called `items` which is pointing back to the menu item definitions in the configuration object. So, you can set a property like `isDisabled` or `isVisible` to each menu item before the menu is rendered.

In the example below, the menu 'Hide Column' is disabled for the first column of the grid.

```js
var config = {
	//...any other grid's options...
	contextMenu: {
		items: {
			HIDE_COLUMN: {text: 'Hide Column', value: 'hide'},
			SHOW_ALL_COLUMNS: {text: 'Show All Columns', value: 'show'}
		},
		onMenu: function (e) {
			if (e.context === 'header') {
				//isDisabled is `true` when column index is 0
				e.items.HIDE_COLUMN.isDisabled = (e.colIndex === 0);

				e.menu.addItem('HIDE_COLUMN');
				e.menu.addItem('SHOW_ALL_COLUMNS');
			}
		}
	}
};
```

### Submenu

A multi-level submenu can be added to an item using the `items` property. With a submenu you can also handle a menu click event at the parent level, to simplify your code.

```js
var config = {
	//...any other grid's options...
	contextMenu: {
		items: {
			SET_ROW_COLOR: {text: 'Set Row Color', items: [
				{text: 'Red', value: '#FF0000'},
				{text: 'Green', value: '#00FF00'},
				{text: 'Blue', value: '#0000FF'},
				{isSeparator: true},
				{text: 'Clear Color', value: ''}
			], callback: function (e) {
				//Single place of callback handling for all sub-menu item clicking
				console.log(e.item.getValue());
			}},
		},
		onMenu: function (e) {
			if (e.context === 'header') {
				//isDisabled is `true` when column index is 0
				e.items.HIDE_COLUMN.isDisabled = (e.colIndex === 0);

				e.menu.addItem('HIDE_COLUMN');
				e.menu.addItem('SHOW_ALL_COLUMNS');
			}
		}
	}
};
```


<div></div>

<h2 style="margin-bottom:5px" id="api-refs">API Reference</h2>
<div id="elf-api-container"><div id="main-template" class="elf-template">    <section><article>                                                                        <h3 class="subsection-title">Type Definitions</h3>                        <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Context">Context</h4><div class="description">    All available context types for the extension</div>    <h5>Type:</h5>    <span class="param-type">"header"</span> | <span class="param-type">"content"</span> | <span class="param-type">"footer"</span> | <span class="param-type">"filterRow"</span><div class="details">                                                            </div></div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~MenuItem">MenuItem</h4>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>text</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Text to diplay at the item</td>        </tr>            <tr>                            <td class="name"><code>value</code></td>                        <td class="type">                            <span class="param-type">string</span> | <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Value attached to the item</td>        </tr>            <tr>                            <td class="name"><code>isDisabled</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">If true the item will be disabled, default is false</td>        </tr>            <tr>                            <td class="name"><code>isVisible</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">If false the item will not be displayed, default is true</td>        </tr>            <tr>                            <td class="name"><code>isSeparator</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">If true the item is rendered as an item separator</td>        </tr>            <tr>                            <td class="name"><code>items</code></td>                        <td class="type">                            <span class="param-type">Array.&lt;<a href="#~MenuItem">ContextMenuPlugin~MenuItem</a>&gt;</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Array of sub-menu items</td>        </tr>            <tr>                            <td class="name"><code>renderer</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Callback function to do custom rendering of the item, see more information in later section</td>        </tr>            <tr>                            <td class="name"><code>callback</code></td>                        <td class="type">                            <span class="param-type"><a href="#~MenuItemEventCallback">ContextMenuPlugin~MenuItemEventCallback</a></span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Menu item clicked handler function</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~MenuItemEvent">MenuItemEvent</h4>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>altKey</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                                    <td class="description last">Flag to indicate if ALT key is pressed when the mouse is clicked</td>        </tr>            <tr>                            <td class="name"><code>cell</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Cell object at the mouse clicked position</td>        </tr>            <tr>                            <td class="name"><code>colIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last">Index number of the column that the mouse clicked on</td>        </tr>            <tr>                            <td class="name"><code>columnDef</code></td>                        <td class="type">                            <span class="param-type">object</span>                        </td>                                    <td class="description last">Column Definition of the column that the mouse clicked on</td>        </tr>            <tr>                            <td class="name"><code>context</code></td>                        <td class="type">                            <span class="param-type"><a href="#~Context">ContextMenuPlugin~Context</a></span>                        </td>                                    <td class="description last">Area of the grid that the mouse clicked on</td>        </tr>            <tr>                            <td class="name"><code>ctrlKey</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                                    <td class="description last">Flag to indicate if CTRL key is pressed when the mouse is clicked</td>        </tr>            <tr>                            <td class="name"><code>item</code></td>                        <td class="type">                            <span class="param-type"><a href="#~MenuItem">ContextMenuPlugin~MenuItem</a></span>                        </td>                                    <td class="description last">The item the mouse is clicked on</td>        </tr>            <tr>                            <td class="name"><code>items</code></td>                        <td class="type">                            <span class="param-type">Object.&lt;string, <a href="#~MenuItem">ContextMenuPlugin~MenuItem</a>&gt;</span>                        </td>                                    <td class="description last">Object reference to the menu items under items option</td>        </tr>            <tr>                            <td class="name"><code>menu</code></td>                        <td class="type">                            <span class="param-type"><a href="MenuEventAPI.html">MenuEventAPI</a></span>                        </td>                                    <td class="description last">API for adding menu items to be rendered</td>        </tr>            <tr>                            <td class="name"><code>rowIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last">Index number of the row the mouse clicked on</td>        </tr>            <tr>                            <td class="name"><code>section</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Wrapper(ILayoutGrid) Object of the grid's area the mouse clicked on</td>        </tr>            <tr>                            <td class="name"><code>shiftKey</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                                    <td class="description last">Flag to indicate if SHIFT key is pressed when the mouse is clicked</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">                                <div class="item-type">typedef</div>                        <h4 class="name" id="~MenuItemEventCallback"><span class="type-signature"></span>MenuItemEventCallback<span class="signature">(e)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">e</div>                        <div class="type">                            <span class="param-type"><a href="#~MenuItemEvent">ContextMenuPlugin~MenuItemEvent</a></span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~OnMenuEvent">OnMenuEvent</h4>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>cell</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Grid cell object at the mouse clicked position</td>        </tr>            <tr>                            <td class="name"><code>colIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last">Index number of the column that the mouse clicked on</td>        </tr>            <tr>                            <td class="name"><code>field</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                                    <td class="description last">Field of the column that the mouse clicked on</td>        </tr>            <tr>                            <td class="name"><code>colId</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                                    <td class="description last">Column ID of the column that the mouse clicked on</td>        </tr>            <tr>                            <td class="name"><code>context</code></td>                        <td class="type">                            <span class="param-type"><a href="#~Context">ContextMenuPlugin~Context</a></span>                        </td>                                    <td class="description last">Area of the grid that the mouse clicked on</td>        </tr>            <tr>                            <td class="name"><code>items</code></td>                        <td class="type">                            <span class="param-type">object</span>                        </td>                                    <td class="description last">Object reference to the menu items under items option</td>        </tr>            <tr>                            <td class="name"><code>menu</code></td>                        <td class="type">                            <span class="param-type"><a href="MenuEventAPI.html">MenuEventAPI</a></span>                        </td>                                    <td class="description last">API for adding menu items to be rendered</td>        </tr>            <tr>                            <td class="name"><code>rowIndex</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                                    <td class="description last">Index number of the row the mouse clicked on</td>        </tr>            <tr>                            <td class="name"><code>section</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                                    <td class="description last">Wraper(ILayoutGrid) Object of the grid's area the mouse clicked on</td>        </tr>            <tr>                            <td class="name"><code>selectedColumns</code></td>                        <td class="type">                            <span class="param-type">Array.&lt;number&gt;</span>                        </td>                                    <td class="description last">Array of selected indices. Return null, if no selection</td>        </tr>            <tr>                            <td class="name"><code>selectedRows</code></td>                        <td class="type">                            <span class="param-type">Array.&lt;number&gt;</span>                        </td>                                    <td class="description last">Array of selected indices. Return null, if no selection</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">                                <div class="item-type">typedef</div>                        <h4 class="name" id="~OnMenuEventCallback"><span class="type-signature"></span>OnMenuEventCallback<span class="signature">(e)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">e</div>                        <div class="type">                            <span class="param-type"><a href="#~OnMenuEvent">ContextMenuPlugin~OnMenuEvent</a></span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Options">Options</h4><div class="description">    Available options describing `contextMenu` object specified in grid's option</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>items</code></td>                        <td class="type">                            <span class="param-type">Object.&lt;string, <a href="#~MenuItem">ContextMenuPlugin~MenuItem</a>&gt;</span>                        </td>                            <td class="attributes">                                                </td>                                    <td class="description last"></td>        </tr>            <tr>                            <td class="name"><code>onMenu</code></td>                        <td class="type">                            <span class="param-type"><a href="#~OnMenuEventCallback">ContextMenuPlugin~OnMenuEventCallback</a></span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">@ @property {Function=} contextmenu</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <h3 class="subsection-title">Methods</h3>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="config"><span class="type-signature"></span>config<span class="signature">(options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">ContextMenuPlugin.Options</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getConfigObject"><span class="type-signature"></span>getConfigObject<span class="signature">(gridOptions<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Object}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">gridOptions</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getMenuModel"><span class="type-signature"></span>getMenuModel<span class="signature">()</span><span class="type-signature"> → {Object}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="getName"><span class="type-signature"></span>getName<span class="signature">()</span><span class="type-signature"> → {string}</span></h4>                                            <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">string</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hasMultiTableSupport"><span class="type-signature"></span>hasMultiTableSupport<span class="signature">()</span><span class="type-signature"> → {boolean}</span></h4>                            <div class="description">        Plugin that has multi-table support means that it can have multiple hosts/tables and share its states across those hosts/tables.    </div>                        <div class="details">                <dt class="inherited-from">Inherited From:</dt>    <dd class="inherited-from">        <a href="">GridPlugin#hasMultiTableSupport</a>    </dd>                                                    </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">boolean</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="initialize"><span class="type-signature"></span>initialize<span class="signature">(host, options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    core grid object                </div>                    </div>                <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="unload"><span class="type-signature"></span>unload<span class="signature">(host)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">host</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    core grid object                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                </article></section></div></div>