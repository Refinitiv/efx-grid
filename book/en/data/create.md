# Creating and Adding Data

Grid can be created with data by providing `staticDataRows` in the grid configuration object as described on [the Initializing Data page](../general_concept/initializing-data.md). However, `staticDataRows` is entirely optional. You can add additional data to Grid at runtime by using Grid's [APIs](../apis/README.md). Adding data after initialization can be useful when you have some data from real-time sources or servers.

> Note: **row index** is not good for referencing as the row index will be shifted by various operations such as sorting, filtering, adding, and so on. It's recommended that you should use RowDefinition object for referencing, so that you can reference them later in a situation where you have some real-time data. 

Static data will be defined in `values` property of row configuration object.

Use `insertRows(rows)` method to add multiple rows at once. The parameter is defined as an array of row configuration objects as shown below:  

```js
var rows = [
	{values: {"field1": "a", "field2": 1, "field3": null}},
	{values: {"field1": "b", "field2": 5, "field3": {"someKey": 10}}},
	{values: {"field1": "c", "field2": 7, "field3": [1, 2, 3]}},
	{values: {"field1": "c", "field4": "some value"}}, // Data don't need to be in uniform structure
];

grid.api.insertRows(rows); // 4 rows are added
```

Use `insertRow(row)` to add a single row to the bottom.

```js
grid.api.insertRow({values: {"field1": "a", "field2": 1, "field3": null}});
```

Use `insertRow(row, rowIndex)` if you want to add a row to a specific position. 

```js
grid.api.insertRow({values: {"field1": "a", "field2": 1}, 2); // Add a new row as the third row to the top (row index #2)
```

All available row options can be found [here](../apis/rt_grid/RowDefinition.md)

All available APIs can be found [here](../apis/rt_grid/Grid.md)

## Example

```live
<style>
	efx-grid {
		height: 400px;
		margin-bottom: 20px;
	}
	html hr {
		margin: 5px;
	}
</style>
<button id="multi_add_btn">Add 5 Rows at once</button>
<button id="add_btn">Add Row at the Bottom</button>
<button id="add_top_btn">Add a row at the Top</button>
<hr>
<efx-grid id="grid"></efx-grid>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var configObj = {
		columns: [
			{title: "Company", field: fields[0]},
			{title: "Market", field: fields[1], width: 100},
			{title: "Last", field: fields[2], width: 80},
			{title: "Net. Chng", field: fields[3], width: 80},
			{title: "Industry", field: fields[4]}
		]
		// staticDataRows property is entirely optional 
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;
	
	document.getElementById("multi_add_btn").addEventListener("click", function(e) {
		var records = DataGenerator.generateRecords(fields, 5);
		var rows = records.map(function toRowOption(record) {
			return { values: record };
		});
		grid.api.insertRows(rows); 
	});
	
	document.getElementById("add_btn").addEventListener("click", function(e) {
		var record = DataGenerator.generateRecord(fields);
		grid.api.insertRow({values: record});
	});
	
	document.getElementById("add_top_btn").addEventListener("click", function(e) {
		var record = DataGenerator.generateRecord(fields);
		grid.api.insertRow({values: record}, 0); 
	});
</script>
```
