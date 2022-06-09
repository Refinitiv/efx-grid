# Filtering - Programmatic

Rows can be filtered programmatically using the [Row Filtering Extension](../extensions/tr-grid-row-filtering.md) through the `extension.setColumnFilter(colIndex, expression, context)` API, which accepts a filter expression string or a filter function.

**Filter expression**

The expression format is a boolean statement. The supported functions are similar to those found in Excel, so you can refer to Excel functions of the same name. The expression, however, is evaluated only on each row, unlike in Excel where you can refer to any cell in the table. The data in each field can be referenced using `[columnName]`.

```js
// Col1 - Rank > 10
rowFilterExt.setColumnFilter(0, '[rank] > 10');
```

**Filter function**

The custom filter function helps you to fine-tune the filtering logic. The function takes three parameters: `rowData`, `rowId` and `context`. The function is called against each row in the grid. If the function returns true the row is included, or false otherwise.

```js
// Col2 - Countries start with 'A'
rowFilterExt.setColumnFilter(1, function(rowData, rowId, ctx) {
	var country = rowData.country.toLowerCase();
	return /^a/.test(country);
});
```

## Example

```live
<style>
	atlas-blotter {
		height: 448px;
	}
	input[type=button] {
		margin: 5;
	}
</style>
<input id="rank_rather_10" type="button" value="Col1 - Rank > 10">
<input id="start_with_a" type="button" value="Col2 - Countries start with 'A'">
<input id="small_countries" type="button" value="Col3 - Small countries">
<input id="clear" type="button" value="Clear Filters">
<br><br>
<atlas-blotter id="grid"></atlas-blotter>
<script>
	var rowFilterExt = new tr.RowFilteringExtension();
	var textFormatExt = new tr.TextFormattingExtension();
	var configObj = {
		rowHighlight: true,
		columns: [
			{ title: "Rank", field: "rank", sortBy: "rank" },
			{ title: "Country", field: "country", sortBy: "country" },
			{
				title: "GDP (Millions of USD)",
				field: "gdp",
				sortBy: "gdp",
				alignment: "right",
				formatType: {
					type: "number",
					separator: 1,
					decimalPlaces: 3
				}
			}
		],
		rowFiltering: {
			disabledUI: true
		},
		extensions: [
			rowFilterExt,
			textFormatExt
		]
	};

	var grid = document.getElementById("grid");
	grid.config = configObj;

	// Fetch data from gdp.json
	fetch('../resources/scripts/data/gdp.json').then(o => o.json()).then(response => {
		response = response.map(function(data) {
				return {
					rank: data[0],
					country: data[1],
					gdp: data[2]
				}
			});
		grid.api.addStaticDataRows(response);
	});

	document.getElementById('rank_rather_10').addEventListener('click', function() {
		rowFilterExt.addColumnFilter(0, "[rank] > 10");
	});

	document.getElementById('start_with_a').addEventListener('click', function() {
		rowFilterExt.addColumnFilter(1, function(rowData, rowId, ctx) {
		let country = rowData.country.toLowerCase();
		return /^a/.test(country);
		});
	});

	document.getElementById('small_countries').addEventListener('click', function() {
		rowFilterExt.addColumnFilter(2, function (rowData, rowId, ctx) {
		return rowData.gdp <= 1000;
		});
	});

	document.getElementById('clear').addEventListener('click', function() {
		rowFilterExt.removeAllFilters();
	});
</script>
```
