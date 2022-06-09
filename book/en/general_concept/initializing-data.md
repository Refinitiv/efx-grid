# Initializing data

Grid accepts various data formats for initializing data. Note that Grid has its own internal data structure and its own data table for performing various kinds of data transformations and operations. The formats are ways to help you initially pass the data to Grid's internal data table. 

Once the data is passed through the grid, the data in the configuration object will no longer have an effect on Grid's internal data. Do not try to modify the data from the configuration once the data applied. There is no two-way binding or property observer in the native JSON object. To modify and access the data, you must use Grid's APIs. This provides better overall performance for data manipulation. 

Data in Grid can be initialized in `rows` or `arrays` format. Data will be defined through `staticDataRows` property. Grid will automatically detect the types from the given data.

## Data format – rows

The `rows` format is an array of an object map. This is a data structure recommended for general use cases. The data object can contain any number of fields. `Fields` are not required for this format.

```js
var configObj = {
	//...
	staticDataRows: [
		{"Field 1": 1, "Field 2": 2}, // First row
		{"Field 1": 3, "Field 2": 4}, // Second row
		//...
	],
	//...
};
```

## Array of object example

```live
<efx-grid></efx-grid>

<script>
	var fields = ["f1", "f2", "f3", "f4"];
	var configObj = {
		columns: [
			{title: "Column 1", field: fields[0]},
			{title: "Column 2", field: fields[1]},
			{title: "Column 3", field: fields[2]},
			{title: "Column 4", field: fields[3]}
		],
		staticDataRows: [
			{f1: 1, f2: 2, f3: 3, f4: "Some String"},
			{f1: 1, f4: "Some String"}, // There is no need to have the same field each row
			{f1: 1, f2: 2, f3: 3, f4: "Some String", f5: "Extra Field Can be Added"},
			{f1: 1, f2: 2, f3: 3, f4: "Some String"},
			{f1: 1, f2: 2, f3: 3, f4: "Some String"},
			{f1: 1, f2: 2, f3: 3, f4: "Some String"}
		]
	};
	var grid = document.getElementsByTagName("efx-grid")[0];
	grid.config = configObj;
</script>
```

## Data format – array

Use the `array` format if you want to specify the initial data in a two-dimensional array format. This format is the shortest way to write, and makes it easier to populate the data from the code. Grid will map the data to the the `field` property of the column configuration objects with order corresponding to the column order.

```js
var configObj2 = {
	//...
	columns: [
		{ field: "Field 1" },
		{ field: "Field 2" },
		// ...
	],
	//...
	staticDataRows: [
		[1, 2], // Fields will be taken from column configuration
		[3, 4],
		//...
	],
	//...
};
```

## 2D data example

```live
<efx-grid></efx-grid>

<script>
	var fields = ["f1", "f2", "f3", "f4"];
	var configObj = {
		columns: [
			{title: "Column 1", field: fields[0]},
			{title: "Column 2", field: fields[1]},
			{title: "Column 3", field: fields[2]},
			{title: "Column 4", field: fields[3]}
		],
		staticDataRows: [
			[1, 2, 3, "Some String"],
			[1, 2, 3, "Some String"],
			[1, 2, 3, "Some String"],
			[1, 2, 3, "Some String"],
			[1, 2, 3, "Some String"]
		]
	};
	var grid = document.getElementsByTagName("efx-grid")[0];
	grid.config = configObj;
</script>
```

# Initializing data for real-time rows

Static data can also be defined in `values` property in the row configuration object. This is useful when we want to merge real-time data with the static data. 

```js
var configObj = {
	//...
	rows: [
		{ ric: "ABC", values: {"Field 1": 1, "Field 2": 2}},
		{ ric: "ABC", values: {"Field 1": 3, "Field 2": 4}},
	],
	//...
};
```
