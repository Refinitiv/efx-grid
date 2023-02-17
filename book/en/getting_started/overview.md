## EFX Grid

EFX Grid is a [custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements), providing simple ways to display and manipulate data in table layout. All HTML native properties and events are available in EFX Grid. It can be easily created by just writing the tag and setting the configuration as shown below:

```html
<body>
	<efx-grid></efx-grid>

	<script>
		var grid = document.getElementsByTagName("efx-grid")[0];
		grid.config = {
			/* See the API Doc for all available options */
		};
	</script>
</body>
```

> For more available properties in EFX Grid element, see [Columns and Data Properties](../data/columns-and-data.html).

## Grid APIs

`api` property from the grid element represents JavaScript-based Grid instance. The `api` property is an access point for all Grid APIs and for making change at runtime. The `api` property will be available only after the `config` is set and initialized. To use `api` immediately after grid has been initialized, you can listen to `configured` event as shown below:

```js
var grid = document.getElementsByTagName("efx-grid")[0];
grid.addEventListener("configured", function (e) {
	var api = e.detail.api;
	var gridElem = e.detail.element;
	
	var core = api.getCoreGrid();

	console.log("Grid has been configured.");
});

console.log(grid.api); // api instance will not be available immediately after configuration is set.
```

> The document for the API instance can be found in the [Grid APIs page](../apis/rt_grid/Grid.html).

## Core Grid

As Grid grows in complexity, Core Grid is created to maintain and manage UIs for table and data display. It contains mostly low-level APIs. Any advanced features and user interactions have been moved out to the API instance and Grid extensions. In some specific cases, you may want to access Core Grid, such as managing scrollbars. To get Core Grid instance, use `getCoreGrid()` method from the `api` property as shown below:

```js
var grid = document.getElementsByTagName("efx-grid")[0];
grid.addEventListener("configured", function (e) {
	var api = e.detail.api;
	var core = api.getCoreGrid();
	var section = core.getSection("content"); // Content section
	var vScrollbar = core.getVScrollbar(); // Vertical scrollbar
});
```

> The document for the Core Grid can be found in the [Core APIs page](../apis/core/Grid.html).

## Example

```live()
<style>
	efx-grid {
		height: 300px;
	}
</style>

<efx-grid id="grid"></efx-grid>
<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "date1", "industry"];
	var records = DataGenerator.generateRecords(fields, { numRows: 200 });
	var configObj = {
		freezeColumn: 0,
		columns: [
			{title: "Company", field: fields[0], width: 300},
			{title: "Market", field: fields[1], width: 150},
			{title: "Last", field: fields[2], width: 120},
			{
				title: "Pct. Chng", 
				field: fields[3], 
				width: 200, 
				formatter: PercentBarFormatter.create({
					textHidden: true
				})
			},
			{title: "IPO Date", field: fields[4], width: 180, alignment: "center", formatType: "dateTime"},
			{title: "Industry", field: fields[5], width: 250}
		],
		staticDataRows: records,
		extensions: [new TextFormatting()]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
