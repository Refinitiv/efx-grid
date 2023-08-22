# Deleting or Removing Data

Use `removeRow(rowRef)` to remove the specified row. 

```js
grid.api.insertRows([
	{values: {"field1": "a", "field2": 1, "field3": null}},
	{values: {"field1": "b", "field2": 5, "field3": {"someKey": 10}}},
	{values: {"field1": "c", "field2": 7, "field3": [1, 2, 3]}},
	{values: {"field1": "c", "field4": "some value"}}
]);

grid.api.logDV();

grid.api.removeRow(2); // Remove the third row
grid.api.logDV();
```

Use `removeRows()` to remove multiple rows at once.

Use `removeAllRows()` methods to remove all rows.

All available APIs can be found [here](../apis/rt_grid/Grid.md)

## Example

```live
<style>
	efx-grid {
		height: 230px;
	}
	html hr {
		margin: 5px;
	}
</style>
<button id="remove_top_btn">Remove Top Row</button>
<button id="remove_all_btn">Remove All Rows</button>
<button id="add_5_btn">Add 5 Rows</button>
<hr>
<efx-grid id="grid"></efx-grid>

<script>
	var fields = ["companyName", "market", "CF_LAST", "CF_NETCHNG", "industry"];
	var records = DataGenerator.generateRecords(fields, { numRows: 5 });
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
	
	document.getElementById("remove_top_btn").addEventListener("click", function(e){
		grid.api.removeRow(0);
	});
	
	document.getElementById("remove_all_btn").addEventListener("click", function(e){
		grid.api.removeAllRows();
	});
	
	document.getElementById("add_5_btn").addEventListener("click", add5Rows);
	
	function add5Rows() {
		var records = DataGenerator.generateRecords(fields, 5);
		var rows = records.map(function toRowOption(record) {
			return { values: record };
		});
		grid.api.insertRows(rows);
	}
</script>
```
