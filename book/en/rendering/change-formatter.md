# Changing Formatter at Runtime

Sometimes you might want to change a custom rendering at runtime. This can be achieved by using  `setColumnFormatter` method.

> APIs for Grid and the `setColumnFormatter()` method description can be found [here](../apis/rt_grid/Grid.md).

```js
var grid = document.getElementsByTagName("efx-grid")[0];

// formatter can be a function
var formatter = function(e) {
	var value = e.grid.getRowData(e.rowIndex)[e.field];
	e.cell.setContent(value);
};

/*
// or can be an object.
var formatter = {
	binding: function(e) {
		var value = e.grid.getRowData(e.rowIndex)[e.field];
		e.cell.setContent(value);
	}
};
// or can be a predefined formatter
var formatter = SimpleLinkFormatter.create()
*/

function handleChangeFormatter() {
	grid.api.setColumnFormatter(0 /* Column Index */, formatter);
}
```