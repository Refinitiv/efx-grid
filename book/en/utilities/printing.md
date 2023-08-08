<link rel="stylesheet" href="../resources/styles/elf-template.css">

# Printing

You can print Grid using the Printing Utility or the native printer feature within a browser. The native printer is more difficult to use, however.

## Using a native printer

Since content can scroll inside Grid, native printers do not work well with it, as the final print preview truncates any components that are not currently visible on the screen.

To solve this, you need to update the grid's configuration to show all hidden information before you preview it. See the steps below.

### 1. Initialize Grid

```js
var config = {
  // ... See column options for available options
};

var grid = document.getElementById("grid");
grid.config = config;
```

### 2. Adjust the Grid's resolution

Adjust the Grid's resolution to reflect the paper size (for example, A3, A4, A5).

> `@media print` CSS properties cannot be used to adjust Grid's style, as Grid will not re-render itself with CSS properties. They can only be used to adjust the layout before the print preview.

```js
function beforePrint() {
  grid.style.width = "180mm"; // A4 width
  grid.style.height = "unset";
}
```

### 3. Delayed `window.print`

Grid needs approximately 300ms to recalculate and re-render itself. So you need to make sure Grid has enough time to update its state before the print preview appears.

```js
function print() {
  beforePrint();
  setTimeout(function () {
    window.print();
  }, 500); // Grid needs at least 300ms  to recalculate and repaint itself.
}
```

### 4. After printing

Lastly, the grid's configuration needs to be restored to its initial state. For this, the `window.onafterprint` hook will be triggered once printing is finished.

```js
window.onafterprint = function () {
  grid.style.width = "100%";
  grid.style.height = "500px";
}
```

## Using the Printing Utility

Unlike the native printer above, the Printing Utility has been created to help print the grid without other components. Rows and columns will not be truncated when using the utility.

Basically, the utility creates a new grid DOM dynamically and copies its data into this newly created grid. It will be destroyed automatically when printing is finished.

```live(formatters,printer)
<style>
	atlas-blotter {
		height: 300px;
	}
</style>
<button id="print">print</button>
<atlas-blotter id="grid"></atlas-blotter>
<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry", "icon"];
	DataGenerator.addFieldInfo("icon", {
		type: "set",
		members: ["up", "down", "phone", "calendar", "flame"]
	});
	var records = DataGenerator.generateRecords(fields, { numRows: 20 });
	var configObj = {
		columns: [
			{title: "Company", field: fields[0]},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 80},
			{title: "Net. Chng", field: fields[3], width: 80},
			{title: "Industry", field: fields[4]},
			{title: "Icon", field: fields[5], binding: EFIconFormatter.create()}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;

	document.getElementById("print").addEventListener("click", function() {
		GridPrinter.print(grid);
  });
</script>
```

First, install package from npm.

```bash
npm install @refinitiv-ui/efx-grid
```

Then, use `import` syntax for importing the utility into your app.

```js
import { GridPrinter } from "@refinitiv-ui/efx-grid/utils";
```

Finally, send Grid into the GridPrinter utility.

```js
var config = {
	// ... See column options for available options
};

var grid = document.getElementById("grid");
grid.config = config;

GridPrinter.print(grid);
```

<div></div>

<h2 style="margin-bottom:5px" id="api-refs">GridPrinter API Reference</h2>
<div id="elf-api-container"><div id="main-template" class="elf-template">    <section><article>                                                <h3 class="subsection-title">Type Definitions</h3>                        <div class="item">            <div class="item-type">typedef</div>    <h4 class="name" id="~Options">Options</h4><div class="description">    Configuration object for customizing priting behavior can be passed through `GridPrinter.setPrintOptions` method</div>    <h5>Type:</h5>    <span class="param-type">Object</span>    <h5>Properties:</h5>    <div class="props"><table>    <thead>    <tr>                <th>Name</th>                <th>Type</th>                <th>Attributes</th>                        <th class="last">Description</th>    </tr>    </thead>    <tbody>            <tr>                            <td class="name"><code>pageWidth</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Paper width in pixel. This limits number of columns to be shown on a single page</td>        </tr>            <tr>                            <td class="name"><code>pageHeight</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Paper height in pixel. This limits number of rows to be shown on a single page</td>        </tr>            <tr>                            <td class="name"><code>primaryColumn</code></td>                        <td class="type">                            <span class="param-type">number</span>                        </td>                            <td class="attributes">                                    &lt;optional&gt;<br>                                                </td>                                    <td class="description last">Column index that will be placed as the first column on each page.</td>        </tr>        </tbody></table></div><div class="details">                                                            </div></div>                            <h3 class="subsection-title">Methods</h3>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id=".createPrintElement"><span class="type-signature"></span>createPrintElement<span class="signature">(grid, options<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Element}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">grid</div>                        <div class="type">                            <span class="param-type">*</span>                        </div>                            <div class="attributes">                                                                </div>                                                    <div class="description">                    grid element, currently supports atlas-blotter, emerald-grid, tr.CompositeGrid, rt.Grid and Core                </div>                    </div>                <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Element</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id=".enableDebugMode"><span class="type-signature"></span>enableDebugMode<span class="signature">(bool<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">bool</div>                        <div class="type">                            <span class="param-type">boolean</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id=".getPreFlightInfo"><span class="type-signature"></span>getPreFlightInfo<span class="signature">(grid, options<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Object}</span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">grid</div>                        <div class="type">                            <span class="param-type">tr.Grid</span>                        </div>                            <div class="attributes">                                                                </div>                                            </div>                <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">Object</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                            </div>            </div>        <div class="details">                                                            </div>                                <h5>Returns:</h5>                    <div class="sub-content">        <span class="param-type">Object</span>    </div>                </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id=".observe"><span class="type-signature"></span>observe<span class="signature">(iFrameElement<span class="signature-attributes">opt</span>)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">iFrameElement</div>                        <div class="type">                            <span class="param-type">HTMLIFrameElement</span>                        </div>                            <div class="attributes">                                    &lt;optional&gt;                                                                </div>                                                    <div class="description">                    If not specified, current window is used instead. Specify null to un-observe existing window object.                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id=".print"><span class="type-signature"></span>print<span class="signature">(grid)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">grid</div>                        <div class="type">                            <span class="param-type">*</span>                        </div>                                                    <div class="description">                    grid element, currently supports efx-grid, atlas-blotter, emerald-grid, tr.CompositeGrid, rt.Grid and Core                </div>                    </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id=".setPrintOptions"><span class="type-signature"></span>setPrintOptions<span class="signature">(options)</span><span class="type-signature"></span></h4>                                                <h5>Parameters:</h5>        <div class="params">        <div class="param">                            <div class="name">options</div>                        <div class="type">                            <span class="param-type">GridPrinter.Options</span>                        </div>                                            </div>            </div>        <div class="details">                                                            </div>                                    </div>                    <div class="item">                                <div class="item-type">function</div>                        <h4 class="name" id=".unobserve"><span class="type-signature"></span>unobserve<span class="signature">()</span><span class="type-signature"></span></h4>                                            <div class="details">                                                            </div>                                    </div>                </article></section></div></div>