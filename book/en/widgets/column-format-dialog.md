<link rel="stylesheet" href="../resources/styles/elf-template.css">

## Column Format Dialog

The Column Format Dialog is a user-friendly interface for column display customization. It can format a column's value display from `General` to `Number`, `Scaled`, `Percent` or `Datetime`, and so on.

### Features

- Value formatting: number, scaled, date and time, and FX formats
- Heatmap
- Conditional coloring
- Colored texts and background

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
  var columnFormattingExt = new ColumnFormatting();
  var contextMenuExt = new ContextMenu();

  var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "CF_VOLUME", "TR.IPODate"];
  var records = DataGenerator.generateRecords(fields, { numRows: 10 });
  var configObj = {
    columns: [
      {title: "Company", field: fields[0]},
      {title: "Market", field: fields[1], width: 100},
      {title: "Last", field: fields[2], width: 80, alignment: "right"},
      {title: "Net. Chng", field: fields[3], width: 80, alignment: "right"},
      {title: "Volume", field: fields[4], alignment: "right"},
      {title: "IPO date", field: fields[5], width: 100}
    ],
    dataModel: {
      data: records
    },
    contextMenu: {
      items: {
        MENU_1: {
          text: 'Format',
          callback: function (e) {
            var lang = document.getElementById("lang_selector").value;
            columnFormattingExt.openDialog(e.colIndex, {
              lang: lang
            });
          }
        }
      },
      onMenu: function (e) {
        e.menu.addItem('MENU_1');
      }
    },
    extensions: [
      columnFormattingExt,
      contextMenuExt
    ]
  };

  var grid = document.getElementById("grid");
  grid.config = configObj;
</script>
```

> For more information about the extension see the [Column Formatting Extension](../extensions/tr-grid-column-formatting.md) page.

### Setup guide

First, let's import the modules.

```js
// efx-grid
import '@refinitiv-ui/efx-grid';
import '@refinitiv-ui/efx-grid/themes/halo/light';

// extensions
import {
  ConditionalColoring,
  HeatMap,
  TextFormatting,
  ColumnFormatting
 } from '@refinitiv-ui/efx-grid/extensions';

// Column Formatting Dialog module
import '@refinitiv-ui/efx-grid/column-format-dialog';
import '@refinitiv-ui/efx-grid/column-format-dialog/themes/halo/light';
```

Create a new Column Formatting Extension instance and push it to an `extensions` configuration.

```js
var cfe = new ColumnFormatting();

var configObj = {
  extensions: [
    cfe,
    new TextFormatting(),
    new HeatMap(),
    new ConditionalColoring()
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
cfe.openDialog(0); // Change "0" to any column index.

// Or open the dialog with specific configuration.
cfe.openDialog(0, {
  supportDisplayStyleOptions: {
    fx: true,
  },
  supportValueFormatOptions: {
    fx: true
  }
  supportHighlightApplyToSwitch: true,
  data: {
    'fieldList': [{'value': 'col1'}, {'value': 'col2'}, {'value': 'col3'}, {'value': 'col4'}, {'value': 'col5'}],
    'valueFormatTab': {'formatType': 'general'},
    'colorTextTab': {'colorText': {'field': 'col2'}},
    'displayStyleTab': {'general': {'alignment': 'center'}, 'mode': 'general'},
    'fieldDataType': 'general'
  },
  fields: ["intCol", "strCol", "boolCol", "floatCol", "dateCol"],
});
```

### Changing Language

For more information about internationalization and how is it applied in different contexts see [Language Support](language-support.md).

### Using with [Context Menu Extension](../extensions/tr-grid-contextmenu.md)

For most cases, you will want the dialog button to appear when the user right-clicks on the column header (known as the context menu).

To do this, simply import `Context Menu` extension and its configurations.

```js
import {
  ContextMenu,
  ColumnFormatting,
  TextFormatting,
  HeatMap,
  ConditionalColoring
} from '@refinitiv-ui/efx-grid/extensions';

var cfe = new ColumnFormatting();

var configObj = {
  extensions: [
    cfe,
    new ContextMenu(),
    new TextFormatting(),
    new HeatMap(),
    new ConditionalColoring()
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
          cfe.openDialog(e.colIndex);
        }
      },
    },
    onMenu: function (e) {
      e.menu.addItem("MENU_1");
    }
  },
};
```

And that's it!


<div></div>

<div id="elf-api-container"><h2 style="margin-bottom:5px" id="api-refs">API Reference</h2><div id="main-template" class="elf-template">    <section><article>                                                <h3 class="subsection-title">Type Definitions</h3>                        <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Config">Config</h4>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>data</code></td>                        <td class="type">                            <span class="param-type">Object</span>                        </td>                            <td class="attributes">                                                </td>                                    <td class="description last">Context object indicating current states of the column</td>        </tr>            <tr>                            <td class="name"><code>supportHighlightApplyToSwitch</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">support HighlightApplyToSwitch</td>        </tr>            <tr>                            <td class="name"><code>supportValueFormatOptions</code></td>                        <td class="type">                            <span class="param-type"><a href="ColumnFormatDialog.html#~SupportValueFormatOptions">ColumnFormatDialog~SupportValueFormatOptions</a></span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Support FxFormat</td>        </tr>            <tr>                            <td class="name"><code>supportDisplayStyleOptions</code></td>                        <td class="type">                            <span class="param-type"><a href="ColumnFormatDialog.html#~SupportDisplayStyleOptions">ColumnFormatDialog~SupportDisplayStyleOptions</a></span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Support items in "Display Style" dropdown</td>        </tr>            <tr>                            <td class="name"><code>fields</code></td>                        <td class="type">                            <span class="param-type">Array.&lt;string&gt;</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">List of available fields to be shown in the dialog</td>        </tr>            <tr>                            <td class="name"><code>confirm</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Confirm event callback</td>        </tr>            <tr>                            <td class="name"><code>cancel</code></td>                        <td class="type">                            <span class="param-type">function</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Cancel event callback</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~SupportDisplayStyleOptions">SupportDisplayStyleOptions</h4>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>bar</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                                    <td class="description last">support "bar"</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~SupportValueFormatOptions">SupportValueFormatOptions</h4>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>fx</code></td>                        <td class="type">                            <span class="param-type">boolean</span>                        </td>                                    <td class="description last">support "fx"</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <h3 class="subsection-title">Methods</h3>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="hide"><span class="type-signature"></span>hide<span class="signature">()</span><span class="type-signature"></span></h4>                            <div class="description">        Hide the dialog    </div>                        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="init"><span class="type-signature"></span>init<span class="signature">(userConfig<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">userConfig</div>                        <div class="type">                            <span class="param-type"><a href="ColumnFormatDialog.html#~Config">ColumnFormatDialog~Config</a></span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    Configuration object used to initialize dialog and populate data                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="show"><span class="type-signature"></span>show<span class="signature">()</span><span class="type-signature"></span></h4>                            <div class="description">        Show the dialog    </div>                        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id="updateDataWithAutosuggest"><span class="type-signature"></span>updateDataWithAutosuggest<span class="signature">(selectedItem, autoSuggest)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">selectedItem</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    autosuggest selection                </div>                    </div>                <div class="param">                            <div class="name">autoSuggest</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                                                    <div class="description">                    source autosuggest element                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                </article></section></div></div>