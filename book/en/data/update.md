# Updating Data

The row order can be shifted by data manipulation, such as sorting and filtering. So, the **row index** is not good for referencing or storing/saving operations. A **RowDefinition** object needs to be obtained, in order to update data at a later stage. Once you can refer to the row, then we can use `setRowData()` method to update the data. 

## Updating a row

Use `getRowDefinition(rowRef)` method to retrieve RowDefinition object from Grid.

Use `setRowData(rowData)` method from RowDefinition object to update the data.

> Note: `insertRow` method also returns reference of newly created RowDefinition object

```js
var records = [
	{"field1": "a", "field2": 1, "field3": null},
	{"field1": "b", "field2": 5, "field3": {"someKey": 10}},
	{"field1": "c", "field2": 7, "field3": [1, 2, 3]},
	{"field1": "c", "field4": "some value"}
];
var rows = records.map(function toRowOption(record) {
	return { values: record };
});
grid.api.insertRows(rows);
var rowDef = grid.api.getRowDefinition(2); // Get a reference for the third row

console.log(rowDef.getData("field2"));

rowDef.setRowData({"field2": 33, "field1": "aa"}); // Update the third row

console.log(rowDef.getData("field2"));

setTimeout(function(){
	rowDef.setRowData({"field2": 44});

	console.log(rowDef.getData("field2"));
}, 1000);
```

## Example

The following example use object to map between RIC (text) and RowDefinition created from `insertRow` method.

```live
<style>
	efx-grid {
		height: 230px;
		margin-bottom: 40px;
	}
	html hr {
		margin: 5px;
	}
</style>
<button id="realtime_btn">Toggle Real-time Update</button>
<button id="eur_btn">Update EUR=</button>
<button id="jpy_btn">Update JPY=</button>
<hr>
<efx-grid id="grid"></efx-grid>

<script>
var fields = ["RIC", "CF_LAST", "PCTCHNG", "CF_NETCHNG", "CF_CLOSE"];
var ricList = ["EUR=", "GBP=", "THB=", "JPY=", "AUD="];
var rowDefMap = {}; // Object for mapping
var realtimeInterval = 0;

document.getElementById("realtime_btn").addEventListener("click", function(e) {
	if (realtimeInterval) {
		clearInterval(realtimeInterval);
		realtimeInterval = 0;
	} else {
		realtimeInterval = setInterval(onRealtimeUpdate, 1200); // Simulate real-time update
		onRealtimeUpdate(); // Update data immediately after click
	}
});
document.getElementById("eur_btn").addEventListener("click", function(e) {
	updateGridData(getRowUpdate("EUR="));
});
document.getElementById("jpy_btn").addEventListener("click", function(e) {
	updateGridData(getRowUpdate("JPY="));
});

function onRealtimeUpdate() {
	updateGridData(getRowUpdates());
}

function updateGridData(rowUpdates) {
	for(var ric in rowUpdates) {
		var rowDef = rowDefMap[ric];
		if(!rowDef) { // Check if rowDef has been created for the updated ric 
			rowDef = rowDefMap[ric] = grid.api.insertRow({}); // Use ric as key for mapping
		}
		rowDef.setRowData(rowUpdates[ric]); // Update the data
	}
}

function getFieldUpdate(dataObj) {
	// Simulate data updates for multiple field
	if (!dataObj) {
		dataObj = {};
	}
	var fieldCount = fields.length;
	for (var i = 1; i < fieldCount; ++i) {
		if (randInt(0, 10) < 6) {
			var field = fields[i];
			dataObj[field] = round(randFloat(-100, 100));
		}
	}
	return dataObj;
}
function getRowUpdate(ric, rowUpdates) {
	// Simulate data updates for a single row
	if (!ric) {
		ric = ricList[randInt(0, ricList.length)];
	}
	if (!rowUpdates) {
		rowUpdates = {};
	}
	var dataObj = getFieldUpdate(rowUpdates[ric]);
	dataObj[fields[0]] = ric;

	rowUpdates[ric] = dataObj;
	return rowUpdates;
}
function getRowUpdates() {
	// Simulate data updates for multiple rows
	var ricCount = ricList.length;
	var rowUpdates = {};
	for (var i = 0; i < ricCount; ++i) {
		if (randInt(0, 10) < 4) {
			getRowUpdate(ricList[i], rowUpdates);
		}
	}
	return rowUpdates;
}

function randInt(min, exclusive_max) {
	return Math.floor(randFloat(min, exclusive_max));
}
function randFloat(min, exclusive_max) {
	return Math.random() * (exclusive_max - min) + min;
}
function round(num) {
	return Math.round(num * 100) / 100;
}

var configObj = {
	sorting: {
		sortableColumns: true
	},
	columns: [
		{ name: "RIC", field: fields[0], width: 70 },
		{ name: "Last", field: fields[1], alignment: "right", blinking: true},
		{ name: "Pct. Chng", field: fields[2], alignment: "right", blinking: true },
		{ name: "Net. Chng", field: fields[3], alignment: "right", blinking: true },
		{ name: "Close", field: fields[4], alignment: "right", blinking: true }
	]
};

	var grid = document.getElementById("grid");
	grid.config = configObj;
</script>
```
