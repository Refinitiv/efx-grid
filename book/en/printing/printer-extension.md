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

var grid = document.getElementById('grid');
grid.config = config;
```

### 2. Adjust the grid's resolution

Adjust the grid's resolution to reflect the paper size (for example, A3, A4, A5).

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

```live(formatters)
<style>
	atlas-blotter {
		height: 300px;
	}
</style>
<button id="print">print</button>
<atlas-blotter id="grid"></atlas-blotter>
<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 20 });
	var configObj = {
		rowHighlight: true,
		columns: [
			{title: "Company", field: fields[0]},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 80},
			{title: "Net. Chng", field: fields[3], width: 80},
			{title: "Industry", field: fields[4]}
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

### Traditional usage

To use the utility as an external static library, install it from npm.

```bash
npm install tr-grid-printer
```

Then, include the `script` in your HTML page. The path may vary depending on your project structure.

```html
<head>
  <script src="node_modules/tr-grid-printer/dist/tr-grid-printer.min.js"></script>
</head>
<body>
  <atlas-blotter id="grid"></atlas-blotter>
</body>
```

Finally, add the utility to the configuration object.

```js
var config = {
    // ... See column options for available options
};

var grid = document.getElementById('grid');
grid.config = config;

GridPrinter.print(grid);
```

### ES6 module usage

To use the utility this way, install it from npm and deduplicate the installed packages.

```bash
npm install tr-grid-printer
npm dedupe
```

Then, use `import` syntax for importing the utility into your app.

```js
import GridPrinter from 'tr-grid-printer/es6';
```

Or use default import from the utility file.

```js
import GridPrinter from 'tr-grid-printer/es6/GridPrinter.js';
```

Or use import from the utility file with full file path (this is good to use for direct importing in browsers).

```js
import { GridPrinter } from './node_modules/tr-grid-printer/es6/GridPrinter.js';
```

Finally, add the utility to the configuration object.

```js
var config = {
    // ... See column options for available options
};

var grid = document.getElementById('grid');
grid.config = config;

GridPrinter.print(grid);
```