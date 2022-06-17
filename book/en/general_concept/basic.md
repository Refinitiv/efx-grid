# Basic Grid creation

To initialize Grid you can put the element tag on the HTML page, just like any other native element. The element works as if it were a div element (that is, an element with 100% width and the same height as its content). 

```html
<efx-grid></efx-grid>
```

Or you can dynamically create the element at runtime by using a standard native method like `document.createElement("efx-grid")`.

```js
var grid = document.createElement("efx-grid");

document.body.appendChild(grid);
```

The element is used for positioning and sizing the grid in the document. Anything else should be done by passing a configuration object to the grid. 

> See all available configuration options for [efx-grid here](../apis/rt_grid/Grid.md)

To define how the grid renders its layout and content use the `columns` property, as shown below:

```js
var configObj = {
	columns: [
		{name: "Header Text", field: "For Mapping Data"},
		{name: "Column 2", field: "Field 2"}
	] // Two columns will be shown
};
```

To define initial or static data for rendering use the `staticDataRows` property, as shown below:

```js
var configObj = {
	staticDataRows: [
		{"Field 1": "a", "Field 2": "b", "Field 3": "c"},
		{"ABC": "d", "Field 2": "e", "XYZ": "f"}
	] // Two rows will be shown
};
```

Each column definition should have a link to the data through the `field` property for rendering. Doing it this way separates the UI from the data. The data can have any number of fields, regardless of the actual number of columns being displayed in the grid. This means extra information can be stored, such as row metadata, display states, and so on. The same field can also be used to display multiple columns. 

The basic Grid configuration object is usually something like the following: 

```js
var fields = ["intCol", "strCol", "floatCol", "dateCol"];
var records = [
	{"intCol": 1, "strCol": "Sample data", "floatCol": 1.1, "dateCol": new Date("2014-10-01")},
	{"intCol": 2, "strCol": "Sample data", "floatCol": 2.2, "dateCol": new Date("2014-10-02")},
	{"intCol": 3, "strCol": "Sample data", "floatCol": 3.3, "dateCol": new Date("2014-10-03")},
	{"intCol": 4, "strCol": "Sample data", "floatCol": 4.4, "dateCol": new Date("2014-10-04")},
	{"intCol": 5, "strCol": "Sample data", "floatCol": 5.5, "dateCol": new Date("2014-10-05")}
];
var configObj = {
	rowHeight: 40, // Grid level option
	columns: [
		{name: "Column 1", field: fields[0]},
		{name: "Column 2", field: fields[1]},
		{name: "Column 3", field: fields[2]},
		{name: "Column 4", field: fields[3]}
	],
	staticDataRows: records
};
```

> For further change at runtime, it is recommended to use Grid's APIs through `api` property instead of changing `config` property. Changing `config` property will result in re-creation of the entire grid and could impact the performance. 

## Example

> Note: you can see JavaScript details from the live example below by clicking the lower right button.

```live
<efx-grid id="grid"></efx-grid>

<script>
	var fields = ["intCol", "strCol", "floatCol", "dateCol"];
	var records = [
		{"intCol": 1, "strCol": "Sample data", "floatCol": 1.1, "dateCol": new Date("2014-10-01")},
		{"intCol": 2, "strCol": "Sample data", "floatCol": 2.2, "dateCol": new Date("2014-10-02")},
		{"intCol": 3, "strCol": "Sample data", "floatCol": 3.3, "dateCol": new Date("2014-10-03")},
		{"intCol": 4, "strCol": "Sample data", "floatCol": 4.4, "dateCol": new Date("2014-10-04")},
		{"intCol": 5, "strCol": "Sample data", "floatCol": 5.5, "dateCol": new Date("2014-10-05")}
	];
	var configObj = {
		rowHeight: 40,
		columns: [
			{name: "Column 1", field: fields[0]},
			{name: "Column 2", field: fields[1]},
			{name: "Column 3", field: fields[2]},
			{name: "Column 4", field: fields[3]}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
