<link rel="stylesheet" href="../resources/styles/elf-template.css">

## Column Selection Dialog

The Column Selection Dialog is a widget that can be used to manage Grid's columns.

### Features

* Allow users to show/hide columns and change order of the visible columns
* Allow users to search columns by name to show/hide

### Demo

Click on `Open Dialog` button to see the dialog.

```live(test-resource)
<style>
  html hr {
    margin: 5px;
  }

  efx-grid {
    height: 450px;
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
<ef-button id="open_btn">Open Dialog</ef-button>
<hr>
<efx-grid id="grid"></efx-grid>

<script>
  var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry", "CF_VOLUMN", "date", "PCTCHNG2"];
  var records = DataGenerator.generateRecords(fields, { numRows: 6 });

  var allColumns = [
    {title: "Company", field: fields[0], disabled: true},
    {title: "Market", field: fields[1], width: 100},
    {title: "Last", field: fields[2], width: 80, alignment: "right"},
    {title: "Net. Chng", field: fields[3], width: 80, alignment: "right"},
    {title: "Industry", field: fields[4]},
    {title: "Volumn", field: fields[5], alignment: "right"},
    {title: "IPO Date", field: fields[6]},
    {title: "Pct. Chng", field: fields[7], alignment: "right"}
  ];

  var configObj = {
    dataModel: {
      data: records
    }
  };

  var grid = document.getElementById("grid");
  grid.config = configObj;

  grid.columns = [
    allColumns[0],
    allColumns[1],
    allColumns[2],
    allColumns[3],
    allColumns[4]
  ];

  var dialog = document.createElement("column-selection-dialog");
  dialog.config = {
    data: allColumns,
    defaultItems: grid.columns
  };
  dialog.addEventListener("confirm", function (e) {
      grid.columns = e.detail.value;
  });

  document.getElementById("open_btn").addEventListener("click", function () {
    var lang = document.getElementById("lang_selector").value;
    dialog.lang = lang;
    dialog.visibleItems = grid.columns;
    dialog.show();
  });
</script>
```

### Setup guide

```js
// efx-grid
import '@refinitiv-ui/efx-grid';
import '@refinitiv-ui/efx-grid/themes/halo/light';

// Column Selection Dialog module
import '@refinitiv-ui/efx-grid/column-selection-dialog';
import '@refinitiv-ui/efx-grid/column-selection-dialog/themes/halo/light';
```

Create a `column-selection-dialog` using the `document.createElement` method. This way, the column-selection-dialog DOM instance will not be mounted initially.

```js
var dialog = document.createElement("column-selection-dialog");
```

Then you need to subscribe to `confirm` event which will be fired when the user has confirmed their changes. It is also required to directly manipulate `grid.columns` with the `e.detail.value` like below.

```js
dialog.addEventListener("confirm", function (e) {
  var grid = document.getElementById("grid");
  grid.columns = e.detail.value;
});
```

By default, once users click `Done` the dialog will automatically hide. In order to prevent the dialog from closing (eg. Validate something before closing), use `beforeConfirm` event and set `e.cancel` to true.

```js
dialog.addEventListener("beforeConfirm", function (e) {
  if (/*Some logic*/) {
    e.cancel = true;
    window.alert("Don't hide the dialog");
  }
});
```

Then set initial data using the `init(configObj)` method. This takes a configuration object consisting of two properties, `data` and `visibleItems`. Alternatively, the same configuration can be set through `config` property. For example, dialog.config = configObj;

```js
var columns = [/* Grid Column Option */];
var grid = document.getElementsByTagName("efx-grid")[0];
grid.config = {/* Grid Option */};
grid.columns = columns; // Explicitly set columns, otherwise it will be undefined

dialog.config = {
  data: columns, // All columns
  visibleItems: grid.columns // Currently visible columns
};
```

> Note: `grid.columns` needs to be set explicitly due to limitations of the Grid.

Finally, to open the dialog you need to call `dialog.show()` method on dialog element.

```js
dialog.show();
```

### Changing Language

For more information about internationalization and how is it applied in different contexts see [Language Support](language-support.md).

### Multi Level with Column Selection

```live(test-resource)
<style>
  html hr {
    margin: 5px;
  }

  efx-grid {
    height: 450px;
  }
</style>

<ef-button id="open_btn">Open Dialog</ef-button>
<hr>
<efx-grid id="grid"></efx-grid>

<script>
  var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry", "CF_VOLUMN", "date", "PCTCHNG2"];
  var records = DataGenerator.generateRecords(fields, { numRows: 10 });

  var allColumns = [
    {title: "Company", field: fields[0], disabled: true},
    {title: "Market", field: fields[1], width: 100},
    {title: "Last", field: fields[2], width: 80, alignment: "right"},
    {title: "Net. Chng", field: fields[3], width: 80, alignment: "right"},
    {title: "Industry", field: fields[4]},
    {title: "Volumn", field: fields[5], alignment: "right"},
    {title: "IPO Date", field: fields[6]},
    {title: "Pct. Chng", field: fields[7], alignment: "right"}
  ];

  var configObj = {
    dataModel: {
      data: records
    }
  };

  var grid = document.getElementById("grid");
  grid.config = configObj;

  grid.columns = [
    allColumns[0],
    allColumns[1],
    allColumns[2],
    allColumns[3],
    allColumns[4]
  ];

  var columnTree = [
    allColumns[0],
    {
      label: 'Basic Info',
      items: [
        allColumns[1],
        allColumns[4],
        allColumns[6]
      ]
    },
    {
      label: 'Trading Info',
      items: [
        {
          label: 'Net.',
          items: [
            allColumns[2],
            allColumns[3],
            allColumns[5]
          ]
        },
        {
          label: 'Percent',
          items: [
            allColumns[7]
          ]
        }
      ]
    }
  ];

  var dialog = document.createElement("column-selection-dialog");
  dialog.data = columnTree;
  dialog.addEventListener("confirm", function (e) {
      grid.columns = e.detail.value;
  });

  document.getElementById("open_btn").addEventListener("click", function () {
    dialog.visibleItems = grid.columns;
    dialog.show();
  });
</script>
```

### Disabled column

In case you do not want specific columns to move out of the grid, you can set the flag as disabled for that specific column, as the example below:

```js
var columns = [/* Grid Column Option */];
var grid = document.getElementById("grid");
grid.config = {/* Grid Option */};
grid.columns = columns; // Explicitly set columns, otherwise it will be undefined

columns[1].disabled = true; // To prevent this column from moving between the lists
dialog.config = {
  data: columns, // All columns
  visibleItems: columns// Currently visible columns
};
```

### Hide Columns in Visible Columns

There is a use case where you might not want some columns to be moved. You can disable the number of columns in the visible columns using `excludedLeftColumns` config.

```js
dialog.config = {
  // Other dialog config
  excludedLeftColumns: 2, // This will make 2 of left columns hidden in the Visible Columns.
  excludedRightColumns: 2, // This will make 2 of right columns hidden in the Visible Columns.
};
```

### Default Columns

The "RESTORE DEFAULT" button will show only when defaultItems has been set. This button will reset all visible columns to default.

```js
var allColumns = [
	{title: "Company", field: fields[0], disabled: true},
	{title: "Market", field: fields[1], width: 100},
	{title: "Last", field: fields[2], width: 80, alignment: "right"},
	{title: "Net. Chng", field: fields[3], width: 80, alignment: "right"},
	{title: "Industry", field: fields[4]},
	{title: "Volumn", field: fields[5], alignment: "right"},
	{title: "IPO Date", field: fields[6]},
	{title: "Pct. Chng", field: fields[7], alignment: "right"}
];

grid.columns = [
	allColumns[0],
	allColumns[1],
	allColumns[2],
	allColumns[3],
	allColumns[4]
];

dialog.config = {
	// Other dialog config
	defaultItems: grid.columns
};
```

> Note: `availableItems` is deprecated.


<div></div>

<div id="elf-api-container"><h2 style="margin-bottom:5px" id="api-refs">API Reference</h2><div id="main-template" class="elf-template">    <section><article>                                                <h3 class="subsection-title">Type Definitions</h3>                        <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Config">Config</h4>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>data</code></td>                        <td class="type">                            <span class="param-type">Array.&lt;Object&gt;</span>                        </td>                            <td class="attributes">                                                </td>                                    <td class="description last">All possible columns for selection.</td>        </tr>            <tr>                            <td class="name"><code>visibleItems</code></td>                        <td class="type">                            <span class="param-type">Array.&lt;Object&gt;</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Column list that is in existing Grid.</td>        </tr>            <tr>                            <td class="name"><code>defaultItems</code></td>                        <td class="type">                            <span class="param-type">Array.&lt;Object&gt;</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Column list that is default.</td>        </tr>            <tr>                            <td class="name"><code>confirm</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Confirm event callback.</td>        </tr>            <tr>                            <td class="name"><code>cancel</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Cancel event callback.</td>        </tr>            <tr>                            <td class="name"><code>excludedColumns</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Deprecated, Alias wigh excludedLeftColumns.</td>        </tr>            <tr>                            <td class="name"><code>excludedLeftColumns</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Number of columns on the left side that should be hidden from Visible Columns.</td>        </tr>            <tr>                            <td class="name"><code>excludedRightColumns</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Number of columns on the right side that should be hidden from Visible Columns.</td>        </tr>            <tr>                            <td class="name"><code>unmovableColumns</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Depricated, Alias with stationary column option. Number of columns that is unmovable in Visible Columns.</td>        </tr>            <tr>                            <td class="name"><code>descriptionBox</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Show description box</td>        </tr>            <tr>                            <td class="name"><code>middleSeparator</code></td>                        <td class="type">                            <span class="param-type">string</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Field of column which used as middle separator to divide grid into two sides</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <h3 class="subsection-title">Methods</h3>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hide"><span class="type-signature"></span>hide<span class="signature">()</span><span class="type-signature"></span></h4>                            <div class="description">        Hide the dialog    </div>                        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="init"><span class="type-signature"></span>init<span class="signature">(options<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type"><a href="ColumnSelectionDialog.html#~Config">ColumnSelectionDialog~Config</a></span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="show"><span class="type-signature"></span>show<span class="signature">()</span><span class="type-signature"></span></h4>                            <div class="description">        Show the dialog    </div>                        <div class="details">                                                            </div>                                    </div>                </article></section></div></div>