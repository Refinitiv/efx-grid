# Custom Sort Logic

There are several cases where the data stored in each field in the data model is not a primitive type. Sorting this data requires a special approach with custom sorting logic.

> Note: comparison functions receive the same argument as `Array.prototype.sort`.

To set custom sort logic for each column, do the following:

```js
var config = {
	// any other grid's options
	columns: [
		{ name: "Column 1", field: "field1", sortLogic: function(a, b, order) {/* Some compare function */} },
		{ name: "Column 2", field: "field2" },
	],
}
```

The callback will also receive extra information about the column being sorted from the fourth parameter.

```js
var myCustomSorting = function(valA, valB, order, contextObj) {
	// contextObj provide more information about the column being sorted such as colIndex and field
	// ...
	return valA - valB;
};

var config = {
	// any other grid's options
	columns: [
		{ name: "Column 1", field: "field1", sortLogic: myCustomSorting},
		{ name: "Column 2", field: "field2" },
	],
}
```

You can enable `rowSorting` to use RowDefinition object for sorting comparison. This is useful when we want to compare data other than the data from the column being sorted.

```js
var myCustomSorting = function(rowDefA, rowDefB, order, contextObj) {
	// Now we can access any data within a row from the RowDefinition object
	var valA = rowDefA.getData(contextObj.field);
	var valB = rowDefB.getData(contextObj.field);
	var extraInfoA = rowDefA.getData("some other field");
	var extraInfoB = rowDefB.getData("some other field");
	// ...
	return number;
};

var config = {
	// any other grid's options
	columns: [
		{ name: "Column 1", field: "field1", rowSorting: true, sortLogic: myCustomSorting},
		{ name: "Column 2", field: "field2" },
	],
}
```

> For `notRealTimeField` column, the default comparison method is row sorting. If you still want to sort by data instead of RowDefinition object, set `rowSorting` to false to override the default behavior.

## Example

```live
<style>
	efx-grid {
		height: 300px;
	}
</style>
<efx-grid></efx-grid>

<script>
	function sortTextAsNumber(valA, valB, order, contextObj) {
		var numA = +valA; // Convert string to number
		var numB = Number(valB); // Another way to convert string to number
		if(numA !== numA) { // Fastest way to check for NaN value
			if(isNaN(numB)) { // Traditional and slower way to check for NaN value
				return 0;
			} else {
				return 1; // Always put NaN value at the bottom
			}
		} else if(numB !== numB) {
			return -1; // Always put NaN value at the bottom
		}
		if(numA < numB) {
			return -order;
		}
		if(numB < numA) {
			return order;
		}
		
		return 0;
	}

	// Initial data set
	var records = [
		{ col1: "A", num1: 40, text: "100" },
		{ col1: "B", num1: 22, text: "200" },
		{ col1: "C", num1: 55, text: "-10" },
		{ col1: "D", num1: 11, text: "This is Text" },
		{ col1: "E", num1: 33, text: "120" },
		{ col1: "F", num1: 66, text: "-20" },
		{ col1: "G", num1: 44, text: "N/A" },
		{ col1: "H", num1: 22, text: "110" },
		{ col1: "I", num1: 11, text: "240" },
		{ col1: "J", num1: 10, text: "100" }
	];
	var configObj = {
		sorting: {
			multiColumn: true,
			threeStatesSorting: true
		},
		columns: [
			{
				name: "Column 1",
				field: "col1",
				width: 100
			},
			{
				name: "Default Sorting",
				field: "num1",
				textAlign: "right"
			},
			{
				name: "Custom Sorting",
				field: "text",
				sortingLogic: sortTextAsNumber
			},
			{
				name: "Not Sortable",
				field: "Some Field",
				sortable: false,
				width: 150
			}
		],
		extensions: [],
		staticDataRows: records
	};

	var grid = document.getElementsByTagName("efx-grid")[0];
	grid.config = configObj;
</script>
```