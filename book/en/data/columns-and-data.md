# Columns and Data Properties

Grid provides `columns` and `data` properties that allow clearing and setting new data/column set at runtime.

> **Note:** The properties will only work after Grid's `config` property has been set.
> The properties do **not support two-way binding**. Meaning, any change within the internal structure will not reflect or synchronize back to the property value. This means, regardless of any change in Grid, the property will remain the same. 

## Resetting data

###	Data property

`data` property supports only an array of objects, with each object representing a field and its corresponding value within Grid, as demonstrated below:

```js
grid.data = [
  {"Field 1": 1, "Field 2": 0},
  {"Field 1": 3, "Field 2": 4, "Field 3": 5}
];
```

In this code snippet, `grid.data` property accepts an array of objects, where each object represents a field and its associated value within Grid.

### Columns property

`columns` property takes the same type of input as the columns property in the grid configuration object (`grid.config`). The data and grid configuration will not be affected by this property. 

To change a new set of columns and keep the current settings and data, do the following:

```js
grid.columns = newColumns; // Clear all existing columns and set entirely new set of columns

grid.columns = null; // Clear all existing columns. All data stored in grid stays intact.
```

You can keep the current set of columns and change the current settings by leaving out the columns property from the `config` object.

```js
grid.columns = newColumns;
grid.config = {

}; // current columns are kept
```

## Clearing data

To clear all existing data, set `data` property to null. This is a quick way to remove all data. It is equivalent to calling `removeAllRows()` API.

```js
grid.data = null; // Clear all existing data
```

## Columns and data property example
```live
<style>
	atlas-blotter {
		height: 200px;
	}
	hr {
		margin: 5px;
	}
</style>
<fieldset>
	<legend>Setting Columns</legend>
	<button id="column_btn1">Column Set 1</button>
	<button id="column_btn2">Column Set 2</button>
	<button id="column_btn3">Clear All Columns</button>
</fieldset>
<fieldset>
	<legend>Setting Data</legend>
	<button id="data_btn1">Data Set 1</button>
	<button id="data_btn2">Data Set 2</button>
	<button id="data_btn3">Clear All Data</button>
</fieldset>
<hr>
<atlas-blotter id="grid"></atlas-blotter>
<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 4, seed: 0 });
	var records1 = tr.DataGenerator.generateRecords(fields, { numRows: 5, seed: 10 });
	var records2 = tr.DataGenerator.generateRecords(fields, { numRows: 3, seed: 20 });
	var configObj = {
		columns: [
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 100},
			{name: "Last", field: fields[2], width: 80},
			{name: "Net. Chng", field: fields[3], width: 80},
			{name: "Industry", field: fields[4]}
		],
		dataModel: {
			data: records
		}
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;

	document.getElementById("column_btn1").addEventListener('click', function () {
		grid.columns = [
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 100},
			{name: "Industry", field: fields[4]}
		];
	});
	document.getElementById("column_btn2").addEventListener('click', function () {
		grid.columns = [
			{name: "Company", field: fields[0]},
			{name: "Last", field: fields[2], width: 80},
			{name: "Net. Chng", field: fields[3], width: 80}
		];
	});
	document.getElementById("column_btn3").addEventListener('click', function () {
		grid.columns = null;
	});

	document.getElementById("data_btn1").addEventListener('click', function () {
		grid.data = records1;
	});
	document.getElementById("data_btn2").addEventListener('click', function () {
		grid.data = records2;
	});
	document.getElementById("data_btn3").addEventListener('click', function () {
		grid.data = null;
	});

</script>

```

# Resetting and updating data in Grid

As there are more states and options for each row in Grid, `rows` property is provided as a way to set those options. Setting `rows` property will change number of rows and reset existing data and data requests. Changing `rows` property will always remove existing rows, so you should use this for changing to completely new set of rows. 

You can also use `data` property to manage rows within Grid including removal, insertion, and updating of rows in Grid. When you update `data` property, it compares the existing data with the new data based on row indices with following:
- If the new data contains more rows than the existing rows, the additional rows will be inserted into Grid.
- If the new data contains fewer rows than the existing rows, the excess rows will be removed from Grid.
- If the new data contains the same number of rows as the existing data, the row count will remain unchanged, and the data will be updated with the new values.

As demonstrated below:
```js
// 1. Begin by assigning three rows of data. Grid displaying 3 rows.
grid.data = [
    {"f1": 1},
    {"f1": 2},
    {"f1": 3}
];

// 2. Grid displaying 1 row.
grid.data = [
    {"f1": 1} 
];

// 3. Grid display 5 rows.
grid.data = [
    {"f1": 1},
    {"f1": 2},
    {"f1": 3},
    {"f1": 4},
    {"f1": 5}
];

// 4. Grid displaying 5 rows with re-ordered positions.
grid.data = [
    {"f1": 3},
    {"f1": 1},
    {"f1": 4},
    {"f1": 2},
    {"f1": 5}
];

```

However, if either `rows` or `data` property is set to null, all rows and data will be removed.

> Note: you should not use `rows` property for adding new rows because it is not very efficient (i.e., existing data will be cleared and re-requested). You should use provided APIs for dynamically adding new rows. 

## Rows and data property example
```live
<style>
	atlas-blotter {
		height: 200px;
	}
	hr {
		margin: 5px;
	}
</style>
<fieldset>
	<legend>Setting Rows</legend>
	<button id="row_btn1">Row Set 1 (3 Rows)</button>
	<button id="row_btn2">Row Set 2 (4 Rows)</button>
	<button id="row_btn3">Row Set 3 (5 Rows)</button>
	<button id="row_btn4">Clear All Rows</button>
</fieldset>
<fieldset>
	<legend>Updating Data</legend>
	<button id="data_btn1">Data Set 1 (3 Rows) </button>
	<button id="data_btn2">Data Set 2 (4 Rows) </button>
	<button id="data_btn3">Data Set 3 (5 Rows) </button>
	<button id="data_btn4">Clear All Data</button>
</fieldset>
<hr>
<atlas-blotter id="grid"></atlas-blotter>
<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = tr.DataGenerator.generateRecords(fields, { numRows: 4, seed: 0 });
	// For data property
	var records1 = tr.DataGenerator.generateRecords(fields, { numRows: 3, seed: 10 });
	var records2 = tr.DataGenerator.generateRecords(fields, { numRows: 4, seed: 20 });
	var records3 = tr.DataGenerator.generateRecords(fields, { numRows: 5, seed: 30 });
	// For rows property
	var records4 = tr.DataGenerator.generateRecords(fields, { numRows: 3, seed: 40 });
	var records5 = tr.DataGenerator.generateRecords(fields, { numRows: 4, seed: 50 });
	var records6 = tr.DataGenerator.generateRecords(fields, { numRows: 5, seed: 60 });
	
	var configObj = {
		columns: [
			{name: "Company", field: fields[0]},
			{name: "Market", field: fields[1], width: 100},
			{name: "Last", field: fields[2], width: 80},
			{name: "Net. Chng", field: fields[3], width: 80},
			{name: "Industry", field: fields[4]}
		],
		staticDataRows: records
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;

	document.getElementById("row_btn1").addEventListener('click', function () {
		grid.rows = records4.map(function(data, idx) {
			return {
				ric: "RIC_" + idx,
				values: data
			};
		});
	});
	document.getElementById("row_btn2").addEventListener('click', function () {
		grid.rows = records5.map(function(data, idx) {
			return {
				ric: "RIC_" + idx,
				values: data
			};
		});
	});
	document.getElementById("row_btn3").addEventListener('click', function () {
		grid.rows = records6.map(function(data, idx) {
			return {
				ric: "RIC_" + idx,
				values: data
			};
		});
	});
	document.getElementById("row_btn4").addEventListener('click', function () {
		grid.rows = null;
	});

	document.getElementById("data_btn1").addEventListener('click', function () {
		grid.data = records1;
	});
	document.getElementById("data_btn2").addEventListener('click', function () {
		grid.data = records2;
	});
	document.getElementById("data_btn3").addEventListener('click', function () {
		grid.data = records3;
	});
	document.getElementById("data_btn4").addEventListener('click', function () {
		grid.data = null;
	});

</script>

```
